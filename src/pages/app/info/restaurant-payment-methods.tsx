import { DollarSign } from 'lucide-react'

import { useRestaurant } from '@/contexts/restaurant-context'
import { formatPaymentMethods } from '@/utils/format-payment-methods'

export function RestaurantPaymentMethods() {
  const { restaurant } = useRestaurant()

  if (!restaurant) return null

  return (
    <div className="space-y-3 border-b px-4 py-6">
      <div className="flex items-center gap-1.5">
        <DollarSign className="text-muted-foreground size-5" />
        <h2 className="font-medium">Formas de pagamento</h2>
      </div>

      <div className="space-y-1">
        <p className="text-muted-foreground text-xs">Pagamento na entrega</p>

        <p className="text-muted-foreground text-sm">
          {formatPaymentMethods(restaurant.paymentMethods)}
        </p>
      </div>
    </div>
  )
}
