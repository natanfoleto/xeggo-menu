const WEEKDAY_LABELS: Record<string, string> = {
  sunday: 'Domingo',
  monday: 'Segunda-feira',
  tuesday: 'Terça-feira',
  wednesday: 'Quarta-feira',
  thursday: 'Quinta-feira',
  friday: 'Sexta-feira',
  saturday: 'Sábado',
}

interface OpeningHour {
  weekDay: string
  openTime: string
  closeTime: string
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  return `${hours}h${minutes}`
}

export function formatOpeningHours(openingHours: OpeningHour[]) {
  const dayOrder = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ]

  const groupedByDay = openingHours.reduce(
    (acc, hour) => {
      if (!acc[hour.weekDay]) {
        acc[hour.weekDay] = []
      }
      acc[hour.weekDay].push({
        openTime: hour.openTime,
        closeTime: hour.closeTime,
      })
      return acc
    },
    {} as Record<string, { openTime: string; closeTime: string }[]>,
  )

  return dayOrder.map((day) => {
    const daySchedule = groupedByDay[day]

    if (!daySchedule || daySchedule.length === 0) {
      return {
        day: WEEKDAY_LABELS[day] || day,
        times: ['Fechado'],
        isClosed: true,
      }
    }

    return {
      day: WEEKDAY_LABELS[day] || day,
      times: daySchedule.map(
        (time) =>
          `${formatTime(time.openTime)} às ${formatTime(time.closeTime)}`,
      ),
      isClosed: false,
    }
  })
}
