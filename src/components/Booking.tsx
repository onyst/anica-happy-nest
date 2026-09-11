import { Calendar } from './Calendar'
import { SectionHead } from './SectionHead'

const STEPS = [
  {
    no: '01',
    title: 'Check your dates',
    body: 'Use the calendar below to confirm your accommodation type is open.',
  },
  {
    no: '02',
    title: 'Send your reservation fee',
    body: (
      <>
        GCash to <strong>0917&nbsp;871&nbsp;3106</strong> — ₱100/pax and/or 50% of your Ahouse.
      </>
    ),
  },
  {
    no: '03',
    title: 'Fill out the reservation form',
    body: (
      <>
        <a
          href="https://forms.gle/vefG5Lpzq8JWXA5Y7"
          target="_blank"
          rel="noopener"
          className="font-semibold text-ember-deep underline"
        >
          Open the form
        </a>{' '}
        and enter the amount you sent.
      </>
    ),
  },
  {
    no: '04',
    title: 'Send your screenshot',
    body: "Screenshot the form's confirmation and send it to us to lock in your spot.",
  },
]

export function Booking() {
  return (
    <section id="book" className="py-22">
      <div className="mx-auto max-w-[1080px] px-7">
        <SectionHead kicker="How to book" title="Four steps, no back-and-forth.">
          Check the calendar for open dates first — it reflects real bookings, so what you see is
          what's actually available.
        </SectionHead>

        <div className="mb-14 grid grid-cols-1 gap-7 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.no} className="border-t-2 border-forest-deep pt-4">
              <div className="font-serif text-[26px] text-ember-deep">{step.no}</div>
              <h3 className="mb-1.5 mt-2 text-base font-bold text-ink">{step.title}</h3>
              <p className="text-sm text-moss">{step.body}</p>
            </div>
          ))}
        </div>

        <Calendar />
      </div>
    </section>
  )
}
