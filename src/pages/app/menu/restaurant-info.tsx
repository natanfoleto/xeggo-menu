import { ChevronRight, DollarSign, ShoppingBasket } from 'lucide-react'

import { NavLink } from '@/components/nav-link'
import { RestaurantBadges } from '@/components/restaurant-badges'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatCurrency } from '@/utils/format-currency'
import { formatPaymentMethods } from '@/utils/format-payment-methods'
import { getInitialsName } from '@/utils/get-initials-name'

interface RestaurantInfoProps {
  restaurant: {
    name: string
    avatarUrl: string | null
    isOpen: boolean
    segments: string[]
    minOrderInCents: number | null
    paymentMethods: string[]
  }
}

export function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  return (
    <>
      <div className="bg-muted h-24 w-full bg-gradient-to-br sm:h-40" />

      <div className="relative flex flex-col gap-6 py-6">
        <NavLink to="/info">
          <ChevronRight className="absolute top-6 right-4 size-5" />

          <div className="flex items-start gap-4 px-4">
            <Avatar className="border-muted size-20 rounded-2xl border-2 shadow-lg sm:h-28 sm:w-28">
              <AvatarImage
                src={restaurant.avatarUrl || ''}
                alt={restaurant.name}
              />

              <AvatarFallback className="bg-background text-muted-foreground rounded-2xl text-xl font-bold">
                {getInitialsName(restaurant.name)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h1 className="text-foreground text-xl font-bold sm:text-3xl">
                {restaurant.name}
              </h1>

              <RestaurantBadges
                isOpen={restaurant.isOpen}
                segments={restaurant.segments}
              />
            </div>
          </div>
        </NavLink>

        <div className="space-y-1 px-4">
          {restaurant.minOrderInCents && (
            <div className="text-muted-foreground flex items-center">
              <ShoppingBasket className="mr-2 size-4" />

              <p className="text-muted-foreground text-sm">
                Pedido mínimo:{' '}
                {formatCurrency(restaurant.minOrderInCents / 100)}
              </p>
            </div>
          )}

          {restaurant.paymentMethods.length > 0 && (
            <div className="text-muted-foreground flex items-center">
              <DollarSign className="mr-2 size-4" />

              <p className="text-muted-foreground text-sm">
                Formas de pagamento:{' '}
                {formatPaymentMethods(restaurant.paymentMethods)}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
