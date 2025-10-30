import { Helmet } from 'react-helmet-async'

import { BottomNavigation } from '@/components/bottom-navigation'
import { useRestaurant } from '@/contexts/restaurant-context'

import { ProductsCatalog } from './products-catalog'
import { RestaurantInfo } from './restaurant-info'

export function Menu() {
  const { restaurant } = useRestaurant()

  if (!restaurant) return null

  return (
    <>
      <Helmet title={restaurant.name} />

      <div className="flex min-h-screen flex-col pb-16">
        <RestaurantInfo restaurant={restaurant} />
        <ProductsCatalog />
      </div>

      <BottomNavigation />
    </>
  )
}
