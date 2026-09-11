const FACTS = [
  { num: '4.6', label: 'Google rating, 47 reviews' },
  { num: '₱300', label: 'Per pax, tent pitching' },
  { num: '12', label: 'Ways to stay, tent to kubo' },
]

export function Hero() {
  return (
    <header className="relative overflow-hidden bg-forest pt-16 text-paper">
      <svg
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.18]"
        aria-hidden="true"
        viewBox="0 0 800 800"
        preserveAspectRatio="none"
      >
        <g fill="none" stroke="#F5F0E3" strokeWidth="1">
          <path d="M-50 650 Q 200 600 400 650 T 850 620" />
          <path d="M-50 600 Q 220 550 400 600 T 850 570" />
          <path d="M-50 550 Q 240 500 400 550 T 850 520" />
          <path d="M-50 700 Q 180 660 400 700 T 850 680" />
        </g>
      </svg>
      <div className="relative z-[2] mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-10 px-7 pb-16 sm:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-3.5 text-[14.5px] font-semibold text-water">
            Tent · Car Camping · Lakeside Cottages
          </div>
          <h1 className="text-[38px] leading-[1.04] text-white sm:text-[58px]">
            Wake up to the lake, not your alarm.
          </h1>
          <p className="mt-5 max-w-[440px] text-[17.5px] text-[#D7DED8]">
            AniCa Happy Nest Campsite sits right on Lumot Lake in Cavinti — pitch a tent, park
            your car beside it, or take a cottage on the water. Bonfire, balsa, and quiet
            included.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-[3px] bg-ember-deep px-[26px] py-3.5 text-[15.5px] font-semibold text-white transition-colors hover:bg-ember-deep-hover"
            >
              Check Dates &amp; Reserve
            </a>
            <a
              href="#rates"
              className="inline-flex items-center gap-2 rounded-[3px] border-[1.5px] border-paper/45 px-[26px] py-3.5 text-[15.5px] font-semibold text-paper transition-colors hover:border-paper hover:bg-paper/[0.08]"
            >
              See Rates
            </a>
          </div>
          <div className="mt-11 flex flex-wrap gap-7">
            {FACTS.map((fact) => (
              <div key={fact.label} className="border-l-2 border-paper/25 pl-3.5">
                <div className="font-serif text-[22px] text-white">{fact.num}</div>
                <div className="mt-0.5 text-[12.5px] text-[#B9C7BC]">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-md sm:aspect-square">
          <img
            src="https://lh3.googleusercontent.com/place-photos/AG9NLjDalgpL-8xi0z6ocgfxP3qPJ_QIZIhjrL1DzUxu_jemEz8tQ7-Xu2PebGBdG_zt0gWc1Ac_WMPOL2zla_uIDgJooRSAG5IsWORur-t4-o13wpXfKWoml1bCskMrgH2jEMzKiKv2i_1qftqsHdQ=s1200"
            alt="AniCa Happy Nest Campsite on Lumot Lake"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/0 to-forest-deep/55" />
          <div className="absolute bottom-2 right-2.5 rounded-[3px] bg-forest-deep/45 px-2 py-0.5 text-[10px] text-paper/75">
            Photo: Astrid Aya Chavez via Google Maps — placeholder, not licensed for live use
          </div>
        </div>
      </div>
    </header>
  )
}
