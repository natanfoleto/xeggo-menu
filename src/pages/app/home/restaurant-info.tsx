import { RestaurantBadges } from '@/components/restaurant-badges'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitialsName } from '@/utils/get-initials-name'

interface RestaurantInfoProps {
  restaurant: {
    name: string
    description: string | null
    primaryColor: string | null
    avatarUrl: string | null
    isOpen: boolean
    segments: string[]
  }
}

export function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  return (
    <div>
      <div className="relative">
        <div
          className="bg-muted h-24 w-full sm:h-32"
          style={{ backgroundColor: restaurant.primaryColor ?? '' }}
        />

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
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

      <div className="container mx-auto max-w-2xl space-y-6 px-4 pt-12">
        <div className="space-y-1 text-center">
          <h1 className="text-xl font-bold sm:text-3xl">{restaurant.name}</h1>

          {restaurant.description && (
            <p className="text-muted-foreground text-sm sm:text-base">
              {restaurant.description}
            </p>
          )}
        </div>

        <RestaurantBadges
          isOpen={restaurant.isOpen}
          segments={restaurant.segments}
          className="justify-center"
        />
      </div>
    </div>
  )
}
