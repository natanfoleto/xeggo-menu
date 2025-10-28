import { BookOpen, LogIn, Search, ShoppingBag, User } from 'lucide-react'

import { useAuth } from '@/contexts/auth-context'
import { useOrder } from '@/contexts/order-context'
import { useRestaurant } from '@/contexts/restaurant-context'

import { NavLink } from './nav-link'

export function BottomNavigation() {
  const { restaurant } = useRestaurant()
  const { isAuthenticated } = useAuth()
  const { bagItemsCount } = useOrder()

  const canShowBag = !!(restaurant && restaurant.isOpen)

  return (
    <div className="bg-background fixed right-0 bottom-0 left-0 z-50 border-t">
      <nav className="flex h-16 items-center justify-evenly gap-4 lg:space-x-6">
        <NavLink to={`/menu`}>
          <div className="flex flex-col items-center gap-1">
            <BookOpen className="size-4" />
            <span className="text-xs">Cardápio</span>
          </div>
        </NavLink>

        <NavLink to={`/search`}>
          <div className="flex flex-col items-center gap-1">
            <Search className="size-4" />
            <span className="text-xs">Busca</span>
          </div>
        </NavLink>

        {isAuthenticated && canShowBag && (
          <NavLink to={`/bag`}>
            <div className="relative flex flex-col items-center gap-1">
              <ShoppingBag className="size-4" />

              {bagItemsCount > 0 && (
                <span className="absolute -top-2 right-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {bagItemsCount > 99 ? '99+' : bagItemsCount}
                </span>
              )}

              <span className="text-xs">Sacola</span>
            </div>
          </NavLink>
        )}

        {isAuthenticated ? (
          <NavLink to={`/profile`}>
            <div className="flex flex-col items-center gap-1">
              <User className="size-5" />
              <span className="text-xs">Perfil</span>
            </div>
          </NavLink>
        ) : (
          <NavLink to="">
            <div className="flex flex-col items-center gap-1">
              <LogIn className="size-4" />
              <span className="text-xs">Entrar</span>
            </div>
          </NavLink>
        )}
      </nav>
    </div>
  )
}
