import { ShieldCheck } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { Branding } from '@/components/branding'
import { useAuth } from '@/contexts/auth-context'
import { useRestaurant } from '@/contexts/restaurant-context'

import { RestaurantActions } from './restaurant-actions'
import { RestaurantAuth } from './restaurant-auth'
import { RestaurantInfo } from './restaurant-info'

export function Home() {
  const { restaurant } = useRestaurant()
  const { isAuthenticated, user } = useAuth()

  if (!restaurant) return null

  return (
    <>
      <Helmet title={restaurant.name} />

      <div className="flex min-h-screen flex-col space-y-12">
        <RestaurantInfo restaurant={restaurant} />

        {!isAuthenticated ? (
          <RestaurantAuth />
        ) : (
          user && (
            <div className="bg-muted flex flex-col items-center gap-2 py-8">
              <ShieldCheck />

              <div className="text-center">
                <p className="text-sm">{user.name}</p>
                <p className="text-muted-foreground text-xs">{user.email}</p>
              </div>
            </div>
          )
        )}

        <RestaurantActions />

        <div className="bg-muted flex flex-1 items-end justify-center py-6">
          <Branding />
        </div>
      </div>
    </>
  )
}
