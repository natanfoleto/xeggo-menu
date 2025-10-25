import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { useRestaurant } from '@/contexts/restaurant-context'

export function RestaurantActions() {
  const { slug } = useRestaurant()
  const { isAuthenticated, logout } = useAuth()

  if (!slug) return null

  return (
    <div className="space-y-4 px-4">
      <div className="space-y-1">
        <Button asChild className="w-full">
          <Link to={`/${slug}/menu`}>Ver cardápio</Link>
        </Button>

        <Button asChild className="w-full">
          <Link to={`/${slug}/info`}>Ver restaurante</Link>
        </Button>
      </div>

      {isAuthenticated && (
        <Button onClick={logout} className="w-full">
          Sair
        </Button>
      )}
    </div>
  )
}
