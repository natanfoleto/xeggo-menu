import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

export function RestaurantActions() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <div className="space-y-4 px-4">
      <div className="space-y-1">
        <NavLink to="/menu">
          <Button className="w-full">Ver cardápio</Button>
        </NavLink>

        <NavLink to="/info">
          <Button className="w-full">Ver restaurante</Button>
        </NavLink>
      </div>

      {isAuthenticated && (
        <Button onClick={logout} className="w-full">
          Sair
        </Button>
      )}
    </div>
  )
}
