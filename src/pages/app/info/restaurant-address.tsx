import { MapPinned } from 'lucide-react'

import { useRestaurant } from '@/contexts/restaurant-context'
import { formatAddress } from '@/utils/format-address'

export function RestaurantAddress() {
  const { restaurant } = useRestaurant()

  if (!restaurant) return null

  return (
    <div className="space-y-3 border-b px-4 py-6">
      <div className="flex items-center gap-1.5">
        <MapPinned className="text-muted-foreground size-5" />
        <h2 className="font-medium">Endereço</h2>
      </div>

      <p className="text-muted-foreground text-sm">
        {formatAddress({
          city: restaurant.city,
          street: restaurant.street,
          number: restaurant.number,
          state: restaurant.state,
          neighborhood: restaurant.neighborhood,
          complement: restaurant.complement,
        })}
      </p>
    </div>
  )
}
