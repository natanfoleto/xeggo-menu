export const WEEK_DAY_MAP = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
} as const

export function getCurrentWeekDay() {
  const dayNumber = new Date().getDay()
  return WEEK_DAY_MAP[dayNumber as keyof typeof WEEK_DAY_MAP]
}

export function getCurrentTimeInMinutes() {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes()
}

export function timeStringToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}
