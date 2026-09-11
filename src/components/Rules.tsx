import { SectionHead } from './SectionHead'

const RULES = [
  { title: 'Quiet hours from 9 PM', desc: 'No speakers or loud music after 9 — courtesy to other campers.' },
  { title: 'Strays roam free', desc: "Dogs and cats live onsite. Don't approach or feed them — for everyone's safety." },
  { title: 'Keep food covered', desc: 'Store or cover meals before sleeping so strays can’t get to them.' },
  { title: 'Trash goes in the bag provided', desc: '₱500 cleanup fee per group if the pitching area is left with loose trash.' },
  { title: 'Motorcycles stay parked', desc: 'No in-and-out riding through the campsite — leave it in the parking area.' },
  { title: 'Early check-in is ₱200/pax', desc: 'We keep this rare, out of courtesy to campers already booked in.' },
  { title: 'No check-out before dawn', desc: 'To avoid disturbing campers still asleep.' },
  { title: 'Borrowed items, ₱100 hold', desc: 'Raft, water containers, etc. — waived back if returned clean and intact.' },
]

export function Rules() {
  return (
    <section id="rules" className="py-22">
      <div className="mx-auto max-w-[1080px] px-7">
        <SectionHead kicker="House rules" title="A well-run site, kept that way.">
          Short version below — the reservation form covers the rest in detail.
        </SectionHead>
        <div className="columns-1 gap-12 sm:columns-2">
          {RULES.map((rule) => (
            <div key={rule.title} className="break-inside-avoid border-b border-line py-4">
              <h3 className="mb-1 text-[14.5px] font-semibold text-forest-deep">{rule.title}</h3>
              <p className="text-[13.5px] text-moss">{rule.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
