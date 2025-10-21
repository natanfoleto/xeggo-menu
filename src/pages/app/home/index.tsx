import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { RestaurantBadges } from '@/components/restaurant-badges'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useRestaurant } from '@/contexts/restaurant-context'
import { getInitialsName } from '@/utils/get-initials-name'

import { RestaurantAuth } from './restaurant-auth'

export function Home() {
  const { restaurant, slug } = useRestaurant()

  if (!restaurant) return null

  return (
    <>
      <Helmet title={restaurant.name} />

      <div className="min-h-screen pb-20">
        <div className="relative">
          <div className="bg-muted h-24 w-full bg-gradient-to-br sm:h-40" />

          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <Avatar className="border-muted size-24 rounded-2xl border-2 shadow-lg sm:h-28 sm:w-28">
              <AvatarImage
                src={restaurant.avatarUrl || ''}
                alt={restaurant.name}
              />

              <AvatarFallback className="bg-background text-muted-foreground rounded-2xl text-xl font-bold">
                {getInitialsName(restaurant.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="container mx-auto max-w-2xl space-y-16 px-4 pt-16">
          <div className="space-y-6">
            <div className="space-y-1 text-center">
              <h1 className="text-xl font-bold sm:text-3xl">
                {restaurant.name}
              </h1>

              {restaurant.description && (
                <p className="text-muted-foreground text-sm sm:text-base">
                  {restaurant.description}
                </p>
              )}
            </div>

            <RestaurantBadges
              isOpen={restaurant.isOpen}
              segments={restaurant.segments}
            />
          </div>

          <RestaurantAuth />

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to={`/${slug}/menu`}>Ver cardápio</Link>
            </Button>

            <div className="text-center">
              <Link
                to={`/${slug}/info`}
                className="text-muted-foreground text-sm underline-offset-4 hover:underline"
              >
                Ver informações do restaurante
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
