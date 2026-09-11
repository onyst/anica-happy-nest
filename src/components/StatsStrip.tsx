import { ClockIcon, CompassIcon, MapPinIcon, StarIcon, TentIcon } from '@phosphor-icons/react'

const STATS = [
  { icon: StarIcon, value: '4.6', label: 'Google rating, 47 reviews' },
  { icon: TentIcon, value: '₱300', label: 'Per pax, tent pitching' },
  { icon: CompassIcon, value: '12', label: 'Ways to stay, tent to kubo' },
]

export function StatsStrip() {
  return (
    <div className="border-y border-line bg-paper-warm">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-6 px-7 py-6">
        <div className="flex flex-wrap gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <stat.icon size={20} weight="fill" className="shrink-0 text-ember-deep" />
              <div>
                <div className="font-display text-lg font-semibold text-forest-deep">
                  {stat.value}
                </div>
                <div className="text-xs text-moss">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-moss">
          <div className="flex items-center gap-2">
            <MapPinIcon size={16} className="shrink-0" />
            <span>
              171 Lumban-Caliraya-Cavinti Rd, Cavinti, Laguna (road access, not tawid-lawa)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon size={16} className="shrink-0" />
            <span>
              Overnight check-in <strong className="text-forest-deep">10 AM</strong>, day tour{' '}
              <strong className="text-forest-deep">7 AM-6 PM</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
