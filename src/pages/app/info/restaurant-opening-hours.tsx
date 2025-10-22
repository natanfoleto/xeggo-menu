import { Clock3 } from 'lucide-react'

import { useRestaurant } from '@/contexts/restaurant-context'
import { formatOpeningHours } from '@/utils/format-opening-hours'

export function RestaurantOpeningHours() {
  const { restaurant } = useRestaurant()

  if (!restaurant) return null

  const formattedHours = formatOpeningHours(restaurant.openingHours)

  return (
    <div className="space-y-3 border-b px-4 py-6">
      <div className="flex items-center gap-1.5">
        <Clock3 className="text-muted-foreground size-5" />
        <h2 className="font-medium">Horário de funcionamento</h2>
      </div>

      <div className="space-y-4">
        {formattedHours.map((schedule, index) => (
          <div key={index} className="space-y-1">
            <p>{schedule.day}</p>
            {schedule.times.map((time, timeIndex) => (
              <p
                key={timeIndex}
                className={`text-xs ${
                  schedule.isClosed
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-muted-foreground'
                }`}
              >
                {time}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
