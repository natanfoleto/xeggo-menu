import { RestaurantBadges } from '@/components/restaurant-badges'
import { useRestaurant } from '@/contexts/restaurant-context'

export function RestaurantData() {
  const { restaurant } = useRestaurant()

  if (!restaurant) return null

  return (
    <div className="space-y-3 border-b px-4 py-6">
      <h2 className="text-lg font-semibold">{restaurant.name}</h2>

      <RestaurantBadges
        isOpen={restaurant.isOpen}
        segments={restaurant.segments}
      />
    </div>
  )
}
