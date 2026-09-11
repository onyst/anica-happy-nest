import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

const CLUSTERS = [
  {
    title: 'Quiet and courtesy',
    items: [
      { title: 'Quiet hours from 9 PM', desc: 'No speakers or loud music after 9, out of courtesy to other campers.' },
      { title: 'Strays roam free', desc: "Dogs and cats live onsite. Don't approach or feed them, for everyone's safety." },
      { title: 'Keep food covered', desc: 'Store or cover meals before sleeping so strays can’t get to them.' },
    ],
  },
  {
    title: 'Cleanup and safety',
    items: [
      { title: 'Trash goes in the bag provided', desc: '₱500 cleanup fee per group if the pitching area is left with loose trash.' },
      { title: 'Motorcycles stay parked', desc: 'No in-and-out riding through the campsite. Leave it in the parking area.' },
      { title: 'Borrowed items, ₱100 hold', desc: 'Raft, water containers, and similar items. Waived back if returned clean and intact.' },
    ],
  },
  {
    title: 'Check-in and check-out',
    items: [
      { title: 'Early check-in is ₱200/pax', desc: 'We keep this rare, out of courtesy to campers already booked in.' },
      { title: 'No check-out before dawn', desc: 'To avoid disturbing campers still asleep.' },
    ],
  },
]

export function Rules() {
  return (
    <section id="rules" className="py-22">
      <div className="mx-auto max-w-[1160px] px-7">
        <SectionHead kicker="House rules" title="A well-run site, kept that way.">
          Short version below. The reservation form covers the rest in detail.
        </SectionHead>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {CLUSTERS.map((cluster, i) => (
            <Reveal
              key={cluster.title}
              delay={i * 0.08}
              className="rounded-2xl border border-line bg-paper-warm p-6"
            >
              <h3 className="mb-5 text-[13px] font-semibold uppercase tracking-wide text-water-text">
                {cluster.title}
              </h3>
              <div className="flex flex-col gap-5">
                {cluster.items.map((rule) => (
                  <div key={rule.title}>
                    <h4 className="mb-1 text-[14.5px] font-semibold text-forest-deep">
                      {rule.title}
                    </h4>
                    <p className="text-[13.5px] text-moss">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
