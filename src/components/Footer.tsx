export function Footer() {
  return (
    <footer className="bg-forest-deep py-13 pb-7 text-[#C4CDC5]">
      <div className="mx-auto flex max-w-[1160px] flex-wrap justify-between gap-6 px-7">
        <div>
          <div className="font-display text-[19px] text-white">AniCa Happy Nest Campsite</div>
          <p className="mt-2 max-w-[240px] text-[13.5px]">
            Lakeside camping on Lumot Lake, Cavinti, Laguna.
          </p>
        </div>
        <div>
          <h5 className="mb-2.5 text-xs tracking-wide text-[#87947F]">Contact</h5>
          <a href="tel:+639178713106" className="mb-1.5 block text-[13.5px]">
            0917 871 3106
          </a>
          <a
            href="https://forms.gle/vefG5Lpzq8JWXA5Y7"
            target="_blank"
            rel="noopener"
            className="mb-1.5 block text-[13.5px]"
          >
            Reservation form
          </a>
        </div>
        <div>
          <h5 className="mb-2.5 text-xs tracking-wide text-[#87947F]">Visit</h5>
          <p className="mb-1.5 text-[13.5px]">171 Lumban-Caliraya-Cavinti Rd</p>
          <p className="mb-1.5 text-[13.5px]">Cavinti, Laguna</p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1160px] border-t border-paper/10 px-7 pt-5 text-xs text-[#7C8A76]">
        This page is a visual test build. Pricing and rules are pulled directly from AniCa Happy
        Nest's booking channels.
      </div>
    </footer>
  )
}
