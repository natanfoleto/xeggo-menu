import { Helmet } from 'react-helmet-async'
import { Navigate } from 'react-router-dom'

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

  if (!restaurant) return null

  if (!restaurant.isOpen) {
    return <Navigate to={`/${slug}/menu`} replace />
  }

  return (
    <>
      <Helmet title={`Sacola - ${restaurant.name}`} />

      <div className="relative min-h-screen pb-52">
        <PageHeader title="Sacola" />

        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-muted-foreground text-sm">Seu pedido em</p>
            <p>{restaurant.name}</p>
          </div>

          <NavLink to={`/menu`}>Ver cardápio</NavLink>
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
