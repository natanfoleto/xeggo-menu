import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

export function RestaurantActions() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col justify-between space-y-6 px-4 py-6">
      <div className="space-y-2">
        <NavLink to="/menu">
          <Button className="w-full">Ver cardápio</Button>
        </NavLink>

        <NavLink to="/about">
          <Button className="w-full">Ver restaurante</Button>
        </NavLink>
      </div>

      {isAuthenticated && (
        <div className="space-y-2">
          <NavLink to="/orders" disablePrefix>
            <Button className="w-full">Meus pedidos</Button>
          </NavLink>

          <NavLink to="/profile" disablePrefix>
            <Button className="w-full">Minha conta</Button>
          </NavLink>

          <Button onClick={logout} className="w-full">
            Sair
          </Button>
        </div>
      )}
    </div>
  )
}
