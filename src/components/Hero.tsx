import { motion, useReducedMotion } from 'motion/react'

export function Hero() {
  const reduce = useReducedMotion()

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
      <div className="relative z-[2] mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-10 px-7 pb-20 sm:grid-cols-[1.1fr_0.9fr] sm:pb-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-4 text-[14.5px] font-semibold text-water">Lumot Lake, Cavinti</div>
          <h1 className="text-[42px] leading-[1.02] text-white sm:text-[64px]">
            Wake up to the lake, not your alarm.
          </h1>
          <p className="mt-5 max-w-[420px] text-[17.5px] text-[#D7DED8]">
            Pitch a tent, park your car beside it, or take a cottage on the water. Bonfire, balsa,
            and quiet included.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full bg-ember-deep px-7 py-3.5 text-[15.5px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ember-deep-hover active:translate-y-0 active:scale-[0.98]"
            >
              Check Dates &amp; Reserve
            </a>
            <a
              href="#rates"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-paper/45 px-7 py-3.5 text-[15.5px] font-semibold text-paper transition-all hover:-translate-y-0.5 hover:border-paper hover:bg-paper/[0.08] active:translate-y-0 active:scale-[0.98]"
            >
              See Rates
            </a>
          </div>
        </motion.div>
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-square"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="https://lh3.googleusercontent.com/place-photos/AG9NLjDalgpL-8xi0z6ocgfxP3qPJ_QIZIhjrL1DzUxu_jemEz8tQ7-Xu2PebGBdG_zt0gWc1Ac_WMPOL2zla_uIDgJooRSAG5IsWORur-t4-o13wpXfKWoml1bCskMrgH2jEMzKiKv2i_1qftqsHdQ=s1200"
            alt="AniCa Happy Nest Campsite on Lumot Lake"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/0 to-forest-deep/55" />
          <div className="absolute bottom-2 right-2.5 rounded-full bg-forest-deep/45 px-2.5 py-1 text-[10px] text-paper/75">
            Photo: Astrid Aya Chavez via Google Maps (placeholder, not licensed for live use)
          </div>
        </motion.div>
      </div>
    </header>
  )
}
