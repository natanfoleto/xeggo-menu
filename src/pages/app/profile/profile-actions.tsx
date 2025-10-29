import { ChevronRight, MapPin, UserRound, UtensilsCrossed } from 'lucide-react'

import { NavLink } from '@/components/nav-link'

export function ProfileActions() {
  return (
    <div className="flex flex-1 flex-col border-y">
      <NavLink to="/profile/data" className="hover:bg-muted border-b px-4 py-6">
        <div className="flex w-full items-center gap-4">
          <UserRound className="text-muted-foreground size-5" />

          <div className="flex-1">
            <h2 className="text-foreground">Meus dados</h2>
            <p className="text-muted-foreground text-sm">
              Atualize os dados da sua conta
            </p>
          </div>

          <ChevronRight className="text-muted-foreground size-5" />
        </div>
      </NavLink>

      <NavLink
        to="/profile/address"
        className="hover:bg-muted border-b px-4 py-6"
      >
        <div className="flex w-full items-center gap-4">
          <MapPin className="text-muted-foreground size-5" />

          <div className="flex-1">
            <h2 className="text-foreground">Endereços</h2>
            <p className="text-muted-foreground text-sm">
              Endereços salvos na sua conta
            </p>
          </div>

          <ChevronRight className="text-muted-foreground size-5" />
        </div>
      </NavLink>

      <NavLink
        to="/profile/orders"
        className="hover:bg-muted border-b px-4 py-6"
      >
        <div className="flex w-full items-center gap-4">
          <UtensilsCrossed className="text-muted-foreground size-5" />

          <div className="flex-1">
            <h2 className="text-foreground">Meus pedidos</h2>
            <p className="text-muted-foreground text-sm">
              Histórico de pedidos
            </p>
          </div>

          <ChevronRight className="text-muted-foreground size-5" />
        </div>
      </NavLink>
    </div>
  )
}
