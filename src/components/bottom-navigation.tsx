import { BookOpen, LogIn, Search, User } from 'lucide-react'
import { useState } from 'react'

import { useRestaurant } from '@/contexts/restaurant-context'

import { NavLink } from './nav-link'

export function BottomNavigation() {
  const { slug } = useRestaurant()

  const [isAuthenticated] = useState(false)

  if (!slug) return null

  return (
    <div className="bg-background fixed right-0 bottom-0 left-0 z-50 border-t">
      <nav className="flex h-16 items-center justify-evenly gap-4 lg:space-x-6">
        <NavLink to={`/${slug}/menu`}>
          <div className="flex flex-col items-center gap-1">
            <BookOpen className="size-4" />
            <span className="text-xs">Cardápio</span>
          </div>
        </NavLink>

        <NavLink to={`/${slug}/search`}>
          <div className="flex flex-col items-center gap-1">
            <Search className="size-4" />
            <span className="text-xs">Busca</span>
          </div>
        </NavLink>

        {isAuthenticated ? (
          <NavLink to={`/${slug}/profile`}>
            <div className="flex flex-col items-center gap-1">
              <User className="size-4" />
              <span className="text-xs">Perfil</span>
            </div>
          </NavLink>
        ) : (
          <NavLink to={`/${slug}`}>
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
