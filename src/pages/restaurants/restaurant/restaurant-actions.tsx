import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

export function RestaurantActions() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col justify-between space-y-6 px-4 py-6">
      <div className="space-y-2">
        <NavLink to="/menu">
          <Button
            variant="outline"
            className="not-dark:border-muted-foreground text-foreground w-full font-normal"
          >
            Ver cardápio
          </Button>
        </NavLink>

        <NavLink to="/about">
          <Button
            variant="outline"
            className="not-dark:border-muted-foreground text-foreground w-full font-normal"
          >
            Ver restaurante
          </Button>
        </NavLink>
      </div>

      {isAuthenticated && (
        <div className="space-y-2">
          <NavLink to="/orders" disablePrefix>
            <Button
              variant="outline"
              className="not-dark:border-muted-foreground text-foreground w-full font-normal"
            >
              Meus pedidos
            </Button>
          </NavLink>

          <NavLink to="/profile" disablePrefix>
            <Button
              variant="outline"
              className="not-dark:border-muted-foreground text-foreground w-full font-normal"
            >
              Minha conta
            </Button>
          </NavLink>

          <Button
            onClick={logout}
            variant="outline"
            className="not-dark:border-muted-foreground text-foreground w-full font-normal"
          >
            Sair
          </Button>
        </div>
      )}
    </div>
  )
}
