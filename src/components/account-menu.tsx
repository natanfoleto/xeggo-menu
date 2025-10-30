import {
  CircleUserRound,
  LogOut,
  Map,
  UserRound,
  UtensilsCrossed,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/contexts/auth-context'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  const navigate = useNavigate()

  const { isAuthenticated, user, logout } = useAuth()

  if (!isAuthenticated || !user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="not-dark:border-muted-foreground flex items-center gap-2 select-none"
        >
          <UserRound className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>{user.name}</span>
          <span className="text-muted-foreground text-xs">{user.email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <button
              type="button"
              className="flex w-full items-center gap-2"
              onClick={() => navigate('/customer')}
            >
              <CircleUserRound className="mr-1 size-4" />
              <span>Meus dados</span>
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <button
              type="button"
              className="flex w-full items-center gap-2"
              onClick={() => navigate('/address')}
            >
              <Map className="mr-1 size-4" />
              <span>Meus endereços</span>
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <button
              type="button"
              className="flex w-full items-center gap-2"
              onClick={() => navigate('/orders')}
            >
              <UtensilsCrossed className="mr-1 size-4" />
              <span>Meus pedidos</span>
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
          >
            <button className="w-full" onClick={logout} type="button">
              <LogOut className="mr-1 size-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
