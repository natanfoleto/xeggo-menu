import { Helmet } from 'react-helmet-async'

import { useRestaurant } from '@/contexts/restaurant-context'

import { RestaurantActions } from './restaurant-actions'
import { RestaurantAuth } from './restaurant-auth'
import { RestaurantInfo } from './restaurant-info'

export function Home() {
  const { restaurant } = useRestaurant()

  if (!restaurant) return null

  return (
    <>
      <Helmet title={restaurant.name} />

      <div className="min-h-screen space-y-16">
        <RestaurantInfo restaurant={restaurant} />
        <RestaurantAuth />
        <RestaurantActions />
      </div>
    </>
  )
}
