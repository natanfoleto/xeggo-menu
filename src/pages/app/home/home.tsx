import { Helmet } from 'react-helmet-async'

import { Branding } from '@/components/branding'
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

      <div className="flex min-h-screen flex-col space-y-16">
        <RestaurantInfo restaurant={restaurant} />
        <RestaurantAuth />
        <RestaurantActions />

        <div className="bg-muted flex flex-1 items-end justify-center py-6">
          <Branding />
        </div>
      </div>
    </>
  )
}
