import { CarIcon, CellSignalFullIcon, ShowerIcon, StorefrontIcon } from '@phosphor-icons/react'
import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'

const ICON_AMENITIES = [
  { title: '4 toilets, 3 showers', desc: 'Clean facilities on site.', Icon: ShowerIcon },
  { title: 'Free parking', desc: 'Onsite parking area included.', Icon: CarIcon },
  { title: 'Sari-sari store', desc: "Forgot something? It's onsite.", Icon: StorefrontIcon },
  { title: 'Strong signal', desc: 'Smart and Globe both reach the site.', Icon: CellSignalFullIcon },
]

export function Amenities() {
  return (
    <section className="bg-forest text-paper">
      <div className="mx-auto max-w-[1160px] px-7 py-22">
        <SectionHead kicker="Included, free" title="What's already covered." dark />
      </div>
      <div className="mx-auto max-w-[1160px] px-7 pb-22">
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-auto sm:row-span-1">
            <img
              src="https://lh3.googleusercontent.com/place-photos/AG9NLjCpxqLuUNUfpw4jc6B1aVFakwvT0r7B4UmoORz9IkaKP0QV9pK7bVwA0kyJdVx39ksNYrExtra70ogcxClbdfRt84fE5z2MJyAbErYEvAUfyV68Zsnc1OSrZuqC2ONy5TCcu1ZqliWqFfPMJJ0=s800"
              alt="Lake view from the campsite"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="text-[15px] font-semibold text-white">Balsa &amp; life vests</h3>
              <p className="mt-1 text-[13px] text-[#B9C7BC]">Free use of the raft on the lake.</p>
            </div>
          </Reveal>

          <Reveal
            delay={0.05}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-ember-deep to-[#6b2c0f] sm:aspect-auto"
          >
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="text-[15px] font-semibold text-white">Bonfire pit &amp; griller</h3>
              <p className="mt-1 text-[13px] text-white/75">
                Bring your own food, we bring the fire.
              </p>
            </div>
          </Reveal>

          {ICON_AMENITIES.map((item, i) => (
            <Reveal
              key={item.title}
              delay={0.1 + i * 0.05}
              className="rounded-2xl border border-paper/[0.14] p-5.5"
            >
              <item.Icon size={26} weight="light" className="mb-3.5 text-ember" />
              <h3 className="mb-1 text-[15px] font-semibold text-white">{item.title}</h3>
              <p className="text-[13px] text-[#B9C7BC]">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
