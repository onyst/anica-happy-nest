import { useMemo, useState } from 'react'
import {
  CAPPED_TYPES,
  dayStatus,
  generateMockAvailability,
  toKey,
  type DayStatus,
} from '@/lib/availability'

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const STATUS_LABEL: Record<DayStatus, string> = {
  full: 'cottages fully booked',
  limited: 'some cottage types full',
  unknown: 'availability not yet listed',
  open: 'open',
}

const STATUS_DOT: Record<DayStatus, string> = {
  open: 'bg-status-open',
  limited: 'bg-status-limited',
  full: 'bg-status-full',
  unknown: 'bg-line',
}

export function Calendar() {
  const availability = useMemo(() => generateMockAvailability(75), [])

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const bounds = useMemo(() => {
    const keys = Object.keys(availability).sort()
    const lastKey = keys[keys.length - 1]
    const [lastY, lastM] = lastKey.split('-').map(Number)
    return {
      minYear: today.getFullYear(),
      minMonth: today.getMonth(),
      maxYear: lastY,
      maxMonth: lastM - 1,
    }
  }, [availability, today])

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d
  })
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const atMin = year === bounds.minYear && month === bounds.minMonth
  const atMax = year === bounds.maxYear && month === bounds.maxMonth

  const goPrev = () => {
    if (atMin) return
    setViewDate((d) => {
      const next = new Date(d)
      next.setMonth(next.getMonth() - 1)
      return next
    })
  }
  const goNext = () => {
    if (atMax) return
    setViewDate((d) => {
      const next = new Date(d)
      next.setMonth(next.getMonth() + 1)
      return next
    })
  }

  const selectedDetail = useMemo(() => {
    if (!selectedKey) return null
    const day = availability[selectedKey]
    const dateObj = new Date(`${selectedKey}T00:00:00`)
    const label = dateObj.toLocaleDateString('en-PH', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
    return { day, label }
  }, [availability, selectedKey])

  return (
    <div className="grid grid-cols-1 gap-9 rounded-2xl border border-line bg-white p-8 sm:grid-cols-[1.2fr_1fr]">
      <div>
        <div className="mb-4.5 flex items-center justify-between">
          <h3 className="text-[18px]">
            {viewDate.toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-1.5">
            <button
              type="button"
              aria-label="Previous month"
              disabled={atMin}
              onClick={goPrev}
              className="h-9 w-9 rounded-full border border-line bg-white text-[15px] text-forest-deep hover:bg-paper-warm disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white sm:h-[30px] sm:w-[30px]"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next month"
              disabled={atMax}
              onClick={goNext}
              className="h-9 w-9 rounded-full border border-line bg-white text-[15px] text-forest-deep hover:bg-paper-warm disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white sm:h-[30px] sm:w-[30px]"
            >
              ›
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {DOW.map((d, i) => (
            <div key={i} className="pb-1.5 text-center text-[11px] font-semibold text-moss">
              {d}
            </div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {Array.from({ length: firstDow }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = i + 1
            const cellDate = new Date(year, month, d)
            const key = toKey(year, month, d)
            const isPast = cellDate < today
            const status = isPast ? null : dayStatus(availability, key)
            const isSelected = selectedKey === key

            return (
              <div
                key={key}
                role={isPast ? undefined : 'button'}
                tabIndex={isPast ? undefined : 0}
                aria-label={
                  isPast
                    ? undefined
                    : `${cellDate.toLocaleDateString('en-PH', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}, ${STATUS_LABEL[status!]}`
                }
                onClick={isPast ? undefined : () => setSelectedKey(key)}
                onKeyDown={
                  isPast
                    ? undefined
                    : (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedKey(key)
                        }
                      }
                }
                className={`relative flex aspect-square flex-col items-center justify-center rounded-lg text-[13px] ${
                  isPast
                    ? 'cursor-default text-[#C6BFAA]'
                    : `cursor-pointer border border-transparent text-ink hover:border-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-deep focus-visible:outline-offset-2 ${
                        isSelected ? 'bg-forest-deep text-white' : ''
                      }`
                }`}
              >
                <span>{d}</span>
                {!isPast && (
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 h-1.5 w-1.5 rounded-full ${STATUS_DOT[status!]} ${
                      isSelected ? 'outline outline-[1.5px] outline-white' : ''
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-moss">
          <span className="inline-flex items-center gap-1.5">
            <i className="h-[7px] w-[7px] rounded-full bg-status-open" />
            Open
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="h-[7px] w-[7px] rounded-full bg-status-limited" />
            Some types full
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="h-[7px] w-[7px] rounded-full bg-status-full" />
            Cottages fully booked
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-paper-warm p-5.5" aria-live="polite">
        {!selectedDetail ? (
          <div className="py-5 text-[13.5px] text-moss">
            Tap a date to see availability by accommodation type.
          </div>
        ) : !selectedDetail.day ? (
          <>
            <h4 className="mb-1 text-[15px]">{selectedDetail.label}</h4>
            <div className="py-5 text-[13.5px] text-moss">
              Availability for this date isn't listed yet. Message us to check.
            </div>
          </>
        ) : (
          <>
            <h4 className="mb-1 text-[15px]">{selectedDetail.label}</h4>
            <div className="mb-4 text-[12.5px] text-moss">
              Tent, car &amp; motocamping have no fixed cap and are always bookable.
            </div>
            {CAPPED_TYPES.map((type) => {
              const info = selectedDetail.day?.[type]
              if (!info) return null
              const cls =
                info.available === 0
                  ? 'text-status-full-text'
                  : info.available < info.total
                    ? 'text-status-limited-text'
                    : 'text-status-open-text'
              const label = info.available === 0 ? 'Full' : `${info.available} of ${info.total} open`
              return (
                <div
                  key={type}
                  className="flex justify-between border-b border-line py-2 text-[13.5px]"
                >
                  <span>{type}</span>
                  <span className={`font-semibold ${cls}`}>{label}</span>
                </div>
              )
            })}
            <div className="mt-4 text-[12.5px] text-moss">
              Reserve this date via the form below, then send your GCash confirmation.
            </div>
          </>
        )}
      </div>
    </div>
  )
}
