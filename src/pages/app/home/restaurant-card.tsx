import type { Restaurant } from '@/api/restaurants/get-restaurants'
import { NavLink } from '@/components/nav-link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatCurrency } from '@/utils/format-currency'
import { getInitialsName } from '@/utils/get-initials-name'

const SEGMENT_LABELS: Record<string, string> = {
  restaurant: 'Restaurante',
  bakery: 'Padaria',
  snackBar: 'Lanchonete',
  pizzeria: 'Pizzaria',
  iceCreamShop: 'Sorveteria',
  coffee: 'Cafeteria',
  fastFood: 'Fast Food',
  barbecue: 'Churrascaria',
  japanese: 'Japonês',
  brazilian: 'Brasileira',
  italian: 'Italiana',
  chinese: 'Chinesa',
  mexican: 'Mexicana',
  arabic: 'Árabe',
  bar: 'Bar',
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <NavLink to={`/${restaurant.slug}`} disablePrefix>
      <div className="text-foreground flex w-full items-center gap-3">
        <Avatar className="size-20 rounded-lg">
          <AvatarImage
            src={restaurant.avatarUrl || ''}
            alt={restaurant.name}
            className="object-cover"
          />

          <AvatarFallback className="bg-muted text-muted-foreground rounded-lg text-xs">
            {getInitialsName(restaurant.name)}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <div className="space-y-0.5">
            <h2>{restaurant.name}</h2>

            {restaurant.segments.length > 0 && (
              <p className="text-muted-foreground truncate text-xs font-light">
                {restaurant.segments
                  .slice(0, 2)
                  .map((segment) => SEGMENT_LABELS[segment] || segment)
                  .join(' • ')}
                {restaurant.segments.length > 2 && ' ...'}
              </p>
            )}
          </div>

          <div className="text-muted-foreground flex gap-1 text-xs font-light">
            <span className="">{restaurant.isOpen ? 'Aberto' : 'Fechado'}</span>

            <span>•</span>

            {restaurant.deliveryFeeInCents ? (
              <span className="text-xs">
                {formatCurrency(restaurant.deliveryFeeInCents / 100)}
              </span>
            ) : (
              <span className="text-xs text-emerald-500">Grátis</span>
            )}
          </div>
        </div>
      </div>
    </NavLink>
  )
}
