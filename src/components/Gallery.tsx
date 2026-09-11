import { SectionHead } from './SectionHead'

const PHOTOS = [
  {
    src: 'https://lh3.googleusercontent.com/place-photos/AG9NLjBOrfUAxkbNgbrVDGvmYXqXIbfLFSeglkZRQYjzf-4xGc1lj_gT__ExiOgbTZtkEWIag88Al1e3EkoooTZqiIjq7do3NPtm0JEN3N8JkP7HNLdErCbMwLoNB38F3oLYRrROCWOhzKuMmRZMMA=s800',
    alt: 'Lakeside campsite view',
    credit: 'Photo: Meynard Rillo / Google Maps',
  },
  {
    src: 'https://lh3.googleusercontent.com/place-photos/AG9NLjBoCymp_aiKSHtuvbJ-IR8h3Ueu70xZUNJKiiYyzdsFZTptY8dKAEJTzMCkfQJgtZ-f4Ah123YuIy8p-mDtNxxCgitB_lm1LC_Llbh4iUlaEfY74Dfdogp9-wWGh9TyMgkQWPb59lwrh1QPTKIiMbNI=s800',
    alt: 'Campsite grounds',
    credit: 'Photo: Chris Barja / Google Maps',
  },
  {
    src: 'https://lh3.googleusercontent.com/place-photos/AG9NLjCpxqLuUNUfpw4jc6B1aVFakwvT0r7B4UmoORz9IkaKP0QV9pK7bVwA0kyJdVx39ksNYrExtra70ogcxClbdfRt84fE5z2MJyAbErYEvAUfyV68Zsnc1OSrZuqC2ONy5TCcu1ZqliWqFfPMJJ0=s800',
    alt: 'Lake and mountain view',
    credit: 'Photo: Meynard Rillo / Google Maps',
  },
  {
    src: 'https://lh3.googleusercontent.com/place-photos/AG9NLjAnQ-bG0e2FceA5K0VQPEG6RF_NfT6x5wKmD2gtSNSpMyb_XykO2X8FTAmppKqF85tYBSNH_suLWoiZgS0N33wg-sKiUNF5ryG5n2aJ0okiAWK6GJD_NrS_CB0tPXTZIg__GjbxABszzWwe=s800',
    alt: 'Campsite cottage area',
    credit: 'Photo: Rein Malacas / Google Maps',
  },
]

export function Gallery() {
  return (
    <section className="py-22">
      <div className="mx-auto max-w-[1080px] px-7">
        <SectionHead kicker="On site" title="What campers are waking up to.">
          Placeholder shots pulled from the Google Maps listing, for this visual test only — see
          the note below.
        </SectionHead>
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          {PHOTOS.map((photo) => (
            <figure
              key={photo.src}
              className="relative aspect-[4/5] overflow-hidden rounded bg-paper-warm"
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/75 to-transparent px-2 pb-1.5 pt-4 text-[10px] text-white">
                {photo.credit}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-5.5 rounded border border-[#E8CFA0] bg-[#FBF0DD] px-4 py-3.5 text-[13px] text-[#6B4F24]">
          ⚠️ These are photos individual reviewers uploaded to the Google Maps listing — not
          owned by AniCa Happy Nest, and not licensed for reuse on a commercial site. They're
          here only so you can see the layout with real imagery. Before this page goes live, swap
          these for photos the client actually owns (their own shots, or ones taken with their
          permission).
        </div>
      </div>
    </section>
  )
}
