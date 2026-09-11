export const CAPPED_TYPES = [
  'Pavillion',
  'Amingan',
  'Ahouse800',
  'Ahouse1000',
  'Ahouse1500',
  'Elevated Ahouse',
  'Big Elevated Ahouse',
  'Green Kubo with AirCon',
  'Blue Kubo with AirCon',
] as const

export type CappedType = (typeof CAPPED_TYPES)[number]

export const UNIT_TOTALS: Record<CappedType, number> = {
  Pavillion: 1,
  Amingan: 2,
  Ahouse800: 3,
  Ahouse1000: 2,
  Ahouse1500: 2,
  'Elevated Ahouse': 1,
  'Big Elevated Ahouse': 1,
  'Green Kubo with AirCon': 1,
  'Blue Kubo with AirCon': 1,
}

export interface UnitAvailability {
  total: number
  booked: number
  available: number
}

export type DayAvailability = Partial<Record<CappedType, UnitAvailability>>
export type AvailabilityMap = Record<string, DayAvailability>

/** m is 0-indexed, matching Date.getMonth() */
export function toKey(y: number, m: number, d: number): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${y}-${p(m + 1)}-${p(d)}`
}

/**
 * Shape matches booking-availability-api.gs exactly:
 * { "YYYY-MM-DD": { "TypeName": { total, booked, available } } }
 * Swap this for a real fetch() to the deployed Apps Script URL once it's
 * live. The render logic elsewhere doesn't need to change.
 */
export function generateMockAvailability(daysAhead: number): AvailabilityMap {
  const data: AvailabilityMap = {}
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let d = 0; d < daysAhead; d++) {
    const date = new Date(today)
    date.setDate(date.getDate() + d)
    const key = toKey(date.getFullYear(), date.getMonth(), date.getDate())
    data[key] = {}
    CAPPED_TYPES.forEach((type, i) => {
      const total = UNIT_TOTALS[type]
      // deterministic pseudo-pattern so the demo looks realistic
      const seed = (d * 7 + i * 13) % 11
      let booked = 0
      if (seed < 2) booked = total
      else if (seed < 4) booked = Math.max(0, total - 1)
      data[key][type] = { total, booked, available: Math.max(total - booked, 0) }
    })
  }
  return data
}

export type DayStatus = 'open' | 'limited' | 'full' | 'unknown'

export function dayStatus(availability: AvailabilityMap, dateKey: string): DayStatus {
  const day = availability[dateKey]
  if (!day) return 'unknown'
  const avails = CAPPED_TYPES.map((t) => (day[t] ? day[t]!.available : 1))
  const allFull = avails.every((a) => a === 0)
  const anyFull = avails.some((a) => a === 0)
  if (allFull) return 'full'
  if (anyFull) return 'limited'
  return 'open'
}
