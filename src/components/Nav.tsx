import { useState } from 'react'

const LINKS = [
  { href: '#stay', label: 'Ways to Stay' },
  { href: '#rates', label: 'Rates' },
  { href: '#book', label: 'Book' },
  { href: '#rules', label: 'House Rules' },
  { href: '#location', label: 'Location' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-forest/96 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1160px] items-center justify-between px-7 py-4">
        <div className="flex items-center gap-2.5 text-paper">
          <img
            src="/logo.png"
            alt="AniCa Happy Nest Campsite logo"
            className="h-[38px] w-[38px] shrink-0"
            width={38}
            height={38}
          />
          <div className="font-display text-[17px] font-semibold">
            AniCa Happy Nest Campsite
            <span className="mt-0.5 block font-sans text-[10.5px] font-medium tracking-wide text-[#B9C7BC]">
              Lumot Lake · Cavinti, Laguna
            </span>
          </div>
        </div>
        <div className="relative flex items-center gap-7">
          <button
            type="button"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-paper/45 text-paper transition-colors hover:border-paper sm:hidden"
            aria-expanded={open}
            aria-controls="navMenu"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
          <ul
            id="navMenu"
            className={`${
              open ? 'flex' : 'hidden'
            } absolute right-0 top-[calc(100%+12px)] min-w-[180px] flex-col gap-4 rounded-2xl border border-paper/[0.14] bg-forest-deep px-5 py-3.5 sm:static sm:flex sm:flex-row sm:gap-7 sm:border-0 sm:bg-transparent sm:p-0`}
          >
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[14.5px] font-medium text-[#DCE4DE] hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#book"
            className="hidden items-center gap-2 rounded-full bg-ember-deep px-6 py-3 text-[15.5px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ember-deep-hover active:translate-y-0 active:scale-[0.98] sm:inline-flex"
          >
            Reserve
          </a>
        </div>
      </div>
    </nav>
  )
}
