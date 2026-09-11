import { SectionHead } from './SectionHead'

interface RateRow {
  name: string
  desc?: string
  price: string
}

const GROUND: RateRow[] = [
  { name: 'Tent Pitching Only', desc: 'Bring your own tent', price: '₱300/pax' },
  { name: 'Carcamping', desc: 'Tent beside your car — includes 3 pax', price: '₱1,500' },
  { name: 'Motocamping', desc: 'Tent beside your motorcycle', price: '₱300/pax' },
]

const COTTAGES: RateRow[] = [
  { name: 'Amingan / Ahouse800', price: '₱300/pax + ₱800' },
  { name: 'Ahouse1000', price: '₱300/pax + ₱1,000' },
  { name: 'Ahouse1500', price: '₱300/pax + ₱1,500' },
  { name: 'Elevated Ahouse', price: '₱300/pax + ₱2,000' },
  { name: 'Big Elevated Ahouse', price: '₱300/pax + ₱2,500' },
  {
    name: 'Pavillion / Green & Blue Kubo',
    desc: 'Kubo units are aircon',
    price: '₱300/pax + ₱3,000',
  },
]

function RateTable({ caption, rows }: { caption: string; rows: RateRow[] }) {
  return (
    <table className="w-full border-collapse">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          <th scope="col" className="sr-only">
            Accommodation
          </th>
          <th scope="col" className="sr-only">
            Rate
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td className="border-b border-line py-3.5 text-[15px]">
              {row.name}
              {row.desc && <span className="mt-0.5 block text-[12.5px] text-moss">{row.desc}</span>}
            </td>
            <td className="whitespace-nowrap border-b border-line py-3.5 pl-3 text-right font-serif font-semibold text-forest-deep">
              {row.price}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function Rates() {
  return (
    <section id="rates" className="py-22">
      <div className="mx-auto max-w-[1080px] px-7">
        <SectionHead kicker="Rates" title="Twelve ways to camp, one base fee.">
          Every stay includes the ₱300/pax camping fee. Cottages and covered spots add a flat
          charge on top.
        </SectionHead>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          <div>
            <h3 className="mb-3.5 text-[15px] font-bold text-water-text">Ground &amp; Vehicle</h3>
            <RateTable caption="Ground & Vehicle rates: accommodation and rate" rows={GROUND} />
          </div>
          <div>
            <h3 className="mb-3.5 text-[15px] font-bold text-water-text">Cottages &amp; Kubo</h3>
            <RateTable caption="Cottages & Kubo rates: accommodation and rate" rows={COTTAGES} />
          </div>
        </div>
        <p className="mt-7 border-l-2 border-ember pl-3.5 text-sm text-moss">
          Reservation fee is ₱100/pax (tent) and/or 50% of the cottage rental — deductible from
          your total, non-refundable but transferable to another date.
        </p>
      </div>
    </section>
  )
}
