import { SectionHead } from './SectionHead'

const AMENITIES = [
  {
    title: 'Balsa & life vests',
    desc: 'Free use of the raft on the lake.',
    path: 'M3 18h18M5 18V9l7-5 7 5v9',
  },
  {
    title: 'Bonfire pit & griller',
    desc: 'Bring your own food, we bring the fire.',
    path: 'M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0 M12 3v4M8 5l2 2M16 5l-2 2',
  },
  {
    title: '4 toilets, 3 showers',
    desc: 'Clean facilities on site.',
    path: 'M4 4h16v16H4z M4 10h16',
  },
  {
    title: 'Free parking',
    desc: 'Onsite parking area included.',
    path: 'M3 20l6-16 6 16M7 14h4 M15 20l4-10 2 10',
  },
  {
    title: 'Sari-sari store',
    desc: "Forgot something? It's onsite.",
    path: 'M4 8h16M4 8v11h16V8M9 8V5a3 3 0 016 0v3',
  },
  {
    title: 'Strong signal',
    desc: 'Smart & Globe both reach the site.',
    path: 'M2 12a10 10 0 0120 0M6 12a6 6 0 0112 0M10 12a2 2 0 014 0',
  },
]

export function Amenities() {
  return (
    <section className="bg-forest text-paper">
      <div className="mx-auto max-w-[1080px] px-7 py-22">
        <SectionHead kicker="Included, free" title="What's already covered." dark />
      </div>
      <div className="mx-auto max-w-[1080px]">
        <div className="grid grid-cols-2 gap-px border border-paper/[0.14] bg-paper/[0.14] sm:grid-cols-3">
          {AMENITIES.map((item) => (
            <div key={item.title} className="bg-forest px-5.5 py-6.5">
              <svg
                className="mb-3.5 h-6.5 w-6.5"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#DD8B3C"
                strokeWidth="1.6"
              >
                <path d={item.path} />
              </svg>
              <h3 className="mb-1 text-[15px] font-semibold text-white">{item.title}</h3>
              <p className="text-[13px] text-[#B9C7BC]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
