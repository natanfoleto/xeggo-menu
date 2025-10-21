import { LogIn, Search, SquareMenu, User } from 'lucide-react'
import { useState } from 'react'

import { useRestaurant } from '@/contexts/restaurant-context'

import { NavLink } from './nav-link'

export function BottomNavigation() {
  const { slug } = useRestaurant()

  const [isAuthenticated] = useState(false)

  if (!slug) return null

  return (
    <div className="bg-background fixed right-0 bottom-0 left-0 z-50 border-t">
      <nav className="flex h-14 items-center justify-evenly gap-4 lg:space-x-6">
        <NavLink to={`/${slug}/menu`}>
          <SquareMenu className="size-5" />
        </NavLink>

        <NavLink to={`/${slug}/search`}>
          <Search className="size-5" />
        </NavLink>

        {isAuthenticated ? (
          <NavLink to={`/${slug}/profile`}>
            <User className="size-5" />
          </NavLink>
        ) : (
          <NavLink to={`/${slug}`}>
            <LogIn className="size-5" />
          </NavLink>
        )}
      </nav>
    </div>
  )
}
