import { ChevronRight, DollarSign, ShoppingBasket } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { BottomNavigation } from '@/components/bottom-navigation'
import { RestaurantBadges } from '@/components/restaurant-badges'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRestaurant } from '@/contexts/restaurant-context'
import { formatCurrency } from '@/utils/format-currency'
import { formatPaymentMethods } from '@/utils/format-payment-methods'
import { getInitialsName } from '@/utils/get-initials-name'

export function Menu() {
  const { restaurant } = useRestaurant()

  if (!restaurant) return null

  return (
    <>
      <Helmet title={restaurant.name} />

      <div className="min-h-screen">
        <div className="bg-muted h-24 w-full bg-gradient-to-br sm:h-40" />

        <div className="relative space-y-6 p-4">
          <ChevronRight className="absolute top-4 right-4 size-5" />

          <div className="flex items-start gap-4">
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
              <h1 className="text-xl font-bold sm:text-3xl">
                {restaurant.name}
              </h1>

              <RestaurantBadges
                isOpen={restaurant.isOpen}
                segments={restaurant.segments}
              />
            </div>
          </div>

          <div className="space-y-1">
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

        <div className="bg-muted h-32"></div>
      </div>

      <BottomNavigation />
    </>
  )
}
