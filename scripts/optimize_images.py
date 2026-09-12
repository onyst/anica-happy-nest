#!/usr/bin/env python3
"""
Batch-clean and web-optimize client photos.

For each image: fixes orientation, removes burned-in text captions/price
labels via OCR-guided inpainting (privacy stickers like emoji/heart overlays
are left untouched since they aren't text), upscales or downscales to a
web-friendly resolution, denoises + sharpens, then exports WebP (and
optionally AVIF).

Usage:
    python3 scripts/optimize_images.py client-images/raw optimized-web-images
    python3 scripts/optimize_images.py client-images/raw optimized-web-images --avif
"""
import argparse
import os
import time
from pathlib import Path
from concurrent.futures import ProcessPoolExecutor, as_completed

import numpy as np
import cv2
import pytesseract
from PIL import Image, ImageOps, ImageEnhance, ImageFilter

import pillow_heif
pillow_heif.register_heif_opener()

try:
    import pillow_avif  # noqa: F401 (registers AVIF plugin with Pillow)
    AVIF_AVAILABLE = True
except ImportError:
    AVIF_AVAILABLE = False

SUPPORTED_EXT = {".jpg", ".jpeg", ".png", ".heic", ".heif", ".webp", ".bmp", ".tif", ".tiff"}


def detect_text_mask(gray, conf_threshold=90, min_chars=2, pad_ratio=0.18,
                      ocr_max_dim=700, max_mask_area_frac=0.25):
    """OCR-locate legible caption/price-label text and return a dilated mask.

    Notes on what this can and can't catch (see README in this folder):
    - Tesseract's legacy engine hangs on these photos, so this forces
      LSTM-only mode (--oem 1) with a bounded timeout, on a small
      downscaled copy for speed (boxes are mapped back to full res).
    - On busy outdoor photos (foliage, thatch, tires) Tesseract hallucinates
      dozens of garbage "words" out of texture. Measured on this photo set,
      real rendered caption text consistently scores conf >= 90-96, while
      texture noise mostly lands below ~86 (with rare exceptions) - so a
      conf_threshold of 90 plus a minimum word length reliably separates
      them. A first version of this script used a much looser threshold
      (40) and it caused cv2.inpaint to wipe out huge swaths of real photo
      content, not just the caption. The max_mask_area_frac cap below is a
      second, independent safety net: a real multi-line caption can
      legitimately cover ~10-15% of the frame, so this is set loose enough
      not to reject those, while still refusing to touch an image if
      detection goes wildly wrong and proposes covering a huge fraction of
      the frame - that's itself evidence of a bad detection, so the whole
      image is left untouched rather than partially "fixed".
    - This only removes text Tesseract can actually *read*. Stylized/
      colored watermark text over busy backgrounds (e.g. a bold colored
      "brand" stamp over grass/thatch) often isn't legible to OCR at all,
      and a scene-text detector (tried: OpenCV's EAST model) produced too
      many false positives on this photo set's textured surfaces to safely
      auto-inpaint. Those cases are left alone rather than risking damage,
      and are worth a manual crop/touch-up pass.
    """
    h_full, w_full = gray.shape[:2]
    ocr_scale = min(1.0, ocr_max_dim / max(h_full, w_full))
    small = cv2.resize(gray, (max(1, round(w_full * ocr_scale)), max(1, round(h_full * ocr_scale))))

    try:
        data = pytesseract.image_to_data(small, config="--oem 1 --psm 6",
                                          output_type=pytesseract.Output.DICT, timeout=15)
    except RuntimeError:
        return np.zeros((h_full, w_full), dtype=np.uint8), False

    mask = np.zeros((h_full, w_full), dtype=np.uint8)
    found = False
    inv_scale = 1.0 / ocr_scale
    for i in range(len(data["text"])):
        txt = data["text"][i].strip()
        try:
            conf = int(float(data["conf"][i]))
        except ValueError:
            conf = -1
        if len(txt) < min_chars or conf < conf_threshold:
            continue
        x, y, w, bh = data["left"][i], data["top"][i], data["width"][i], data["height"][i]
        x, y, w, bh = [v * inv_scale for v in (x, y, w, bh)]
        pad = int(bh * pad_ratio) + 6
        x0, y0 = max(int(x - pad), 0), max(int(y - pad), 0)
        x1, y1 = min(int(x + w + pad), w_full), min(int(y + bh + pad), h_full)
        mask[y0:y1, x0:x1] = 255
        found = True

    if not found:
        return mask, False

    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.dilate(mask, kernel, iterations=2)

    mask_area_frac = float(np.count_nonzero(mask)) / (h_full * w_full)
    if mask_area_frac > max_mask_area_frac:
        # Safety net tripped: treat as a bad detection, don't touch the image.
        return np.zeros((h_full, w_full), dtype=np.uint8), False

    return mask, True


def remove_text(bgr):
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    mask, found = detect_text_mask(gray)
    if not found:
        return bgr, False
    inpainted = cv2.inpaint(bgr, mask, inpaintRadius=10, flags=cv2.INPAINT_TELEA)
    return inpainted, True


def resize_smart(img, target_max_dim):
    """Downscale big photos to a web-friendly size, upscale small/low-res ones."""
    w, h = img.size
    long_side = max(w, h)
    if long_side == target_max_dim:
        return img, False
    scale = target_max_dim / long_side
    new_size = (max(1, round(w * scale)), max(1, round(h * scale)))
    resized = img.resize(new_size, Image.LANCZOS)
    return resized, scale > 1.0


def enhance_quality(bgr, upscaled):
    denoised = cv2.bilateralFilter(bgr, d=5, sigmaColor=45, sigmaSpace=45)
    img = Image.fromarray(cv2.cvtColor(denoised, cv2.COLOR_BGR2RGB))
    img = ImageOps.autocontrast(img, cutoff=1)
    img = ImageEnhance.Color(img).enhance(1.06)
    sharpen_amount = 90 if upscaled else 60  # compensate for upscale softness
    img = img.filter(ImageFilter.UnsharpMask(radius=1.6, percent=sharpen_amount, threshold=2))
    return img


def process_one(args):
    src_path, out_dir, target_max_dim, webp_quality, make_avif, avif_quality, skip_text_removal = args
    src_path = Path(src_path)
    out_dir = Path(out_dir)
    try:
        img = Image.open(src_path)
        img = ImageOps.exif_transpose(img).convert("RGB")

        img, upscaled = resize_smart(img, target_max_dim)
        bgr = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

        text_removed = False
        if not skip_text_removal:
            bgr, text_removed = remove_text(bgr)

        final_img = enhance_quality(bgr, upscaled)

        stem = src_path.stem
        webp_path = out_dir / f"{stem}.webp"
        final_img.save(webp_path, "WEBP", quality=webp_quality, method=6)

        result = {
            "file": src_path.name,
            "text_removed": text_removed,
            "upscaled": upscaled,
            "out_webp": str(webp_path),
            "webp_size": webp_path.stat().st_size,
            "src_size": src_path.stat().st_size,
        }

        if make_avif:
            if AVIF_AVAILABLE:
                avif_path = out_dir / f"{stem}.avif"
                final_img.save(avif_path, "AVIF", quality=avif_quality)
                result["out_avif"] = str(avif_path)
                result["avif_size"] = avif_path.stat().st_size
            else:
                result["avif_error"] = "pillow-avif-plugin not installed"

        return result
    except Exception as e:
        return {"file": src_path.name, "error": str(e)}


def main():
    parser = argparse.ArgumentParser(description="Batch-clean, enhance, and web-optimize client photos.")
    parser.add_argument("input_dir")
    parser.add_argument("output_dir")
    parser.add_argument("--max-dim", type=int, default=2000,
                         help="Target long-edge size in px (default 2000): downsizes larger photos, upscales smaller ones.")
    parser.add_argument("--webp-quality", type=int, default=82)
    parser.add_argument("--avif", action="store_true", help="Also export AVIF copies (slower to encode).")
    parser.add_argument("--avif-quality", type=int, default=55)
    parser.add_argument("--no-text-removal", action="store_true", help="Skip OCR-based caption/text removal.")
    parser.add_argument("--workers", type=int, default=os.cpu_count() or 4)
    args = parser.parse_args()

    in_dir = Path(args.input_dir)
    out_dir = Path(args.output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    files = sorted(p for p in in_dir.iterdir() if p.suffix.lower() in SUPPORTED_EXT)
    if not files:
        print(f"No supported images found in {in_dir}")
        return

    print(f"Processing {len(files)} images -> {out_dir} "
          f"(max-dim={args.max_dim}, webp_q={args.webp_quality}, avif={args.avif})")

    tasks = [(str(p), out_dir, args.max_dim, args.webp_quality, args.avif, args.avif_quality, args.no_text_removal)
             for p in files]

    t0 = time.time()
    results = []
    with ProcessPoolExecutor(max_workers=args.workers) as ex:
        futures = [ex.submit(process_one, t) for t in tasks]
        for i, fut in enumerate(as_completed(futures), 1):
            res = fut.result()
            results.append(res)
            if "error" in res:
                print(f"[{i}/{len(files)}] FAILED {res['file']}: {res['error']}")
            else:
                saved_pct = 100 * (1 - res["webp_size"] / res["src_size"]) if res["src_size"] else 0
                flag = "text-removed" if res["text_removed"] else "no-text"
                print(f"[{i}/{len(files)}] {res['file']} -> {Path(res['out_webp']).name} "
                      f"({res['src_size']/1024:.0f}KB -> {res['webp_size']/1024:.0f}KB, "
                      f"{saved_pct:.0f}% smaller, {flag})")

    elapsed = time.time() - t0
    ok = [r for r in results if "error" not in r]
    errs = [r for r in results if "error" in r]
    text_removed_count = sum(1 for r in ok if r.get("text_removed"))
    total_src = sum(r["src_size"] for r in ok)
    total_webp = sum(r["webp_size"] for r in ok)

    print("\n--- Summary ---")
    print(f"Processed: {len(ok)} / {len(files)}  ({len(errs)} failed)")
    print(f"Text/caption overlays removed on: {text_removed_count} images")
    if total_src:
        print(f"Total size: {total_src/1024/1024:.1f}MB -> {total_webp/1024/1024:.1f}MB "
              f"({100*(1-total_webp/total_src):.0f}% smaller)")
    print(f"Elapsed: {elapsed:.1f}s")


if __name__ == "__main__":
    main()
