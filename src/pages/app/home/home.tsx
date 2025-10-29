import { Helmet } from 'react-helmet-async'

import { Branding } from '@/components/branding'
import { useAuth } from '@/contexts/auth-context'
import { useRestaurant } from '@/contexts/restaurant-context'

import { RestaurantActions } from './restaurant-actions'
import { RestaurantAuth } from './restaurant-auth'
import { RestaurantInfo } from './restaurant-info'

export function Home() {
  const { restaurant } = useRestaurant()
  const { isAuthenticated } = useAuth()

  if (!restaurant) return null

  return (
    <>
      <Helmet title={restaurant.name} />

      <div className="flex min-h-screen flex-col space-y-8">
        <RestaurantInfo restaurant={restaurant} />

        {!isAuthenticated && <RestaurantAuth />}

        <RestaurantActions />

        <div className="bg-muted flex items-end justify-center py-6">
          <Branding />
        </div>
      </div>
    </>
  )
}
