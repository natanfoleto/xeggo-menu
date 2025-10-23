import { Helmet } from 'react-helmet-async'

import { BottomNavigation } from '@/components/bottom-navigation'
import { NavLink } from '@/components/nav-link'
import { PageHeader } from '@/components/page-header'
import { useRestaurant } from '@/contexts/restaurant-context'

import { BagActions } from './bag-actions'
import { BagItems } from './bag-items'
import { DeliveryAddress } from './delivery-address'
import { PaymentMethod } from './payment-method'

export function Bag() {
  const { restaurant, slug } = useRestaurant()

  if (!restaurant || !slug) return null

  return (
    <>
      <Helmet title={`Sacola - ${restaurant.name}`} />

      <div className="min-h-screen pb-16">
        <PageHeader title="Sacola" />

        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-muted-foreground text-sm">Seu pedido em</p>
            <p>{restaurant.name}</p>
          </div>

          <NavLink to={`/${slug}/menu`}>Ver cardápio</NavLink>
        </div>

        <BagItems />
        <DeliveryAddress />
        <PaymentMethod />
        <BagActions />
      </div>

      <BottomNavigation />
    </>
  )
}
