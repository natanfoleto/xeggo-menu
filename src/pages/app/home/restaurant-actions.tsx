import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

export function RestaurantActions() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <div className="flex flex-1 flex-col justify-between space-y-4 px-4">
      <div className="space-y-2">
        <NavLink to="/menu">
          <Button
            variant="outline"
            className="border-muted-foreground text-foreground w-full font-normal"
          >
            Ver cardápio
          </Button>
        </NavLink>

        <NavLink to="/info">
          <Button
            variant="outline"
            className="border-muted-foreground text-foreground w-full font-normal"
          >
            Ver restaurante
          </Button>
        </NavLink>

        {isAuthenticated && (
          <NavLink to="/profile/orders">
            <Button
              variant="outline"
              className="border-muted-foreground text-foreground w-full font-normal"
            >
              Meus pedidos
            </Button>
          </NavLink>
        )}
      </div>

      {isAuthenticated && (
        <div className="space-y-2">
          <NavLink to="/profile">
            <Button
              variant="outline"
              className="border-muted-foreground text-foreground w-full font-normal"
            >
              Minha conta
            </Button>
          </NavLink>

          <Button
            onClick={logout}
            variant="outline"
            className="border-muted-foreground text-foreground w-full font-normal"
          >
            Sair
          </Button>
        </div>
      )}
    </div>
  )
}
