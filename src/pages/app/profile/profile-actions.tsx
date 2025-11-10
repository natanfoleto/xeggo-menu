import { ChevronRight, MapPin, UserRound, UtensilsCrossed } from 'lucide-react'

import { NavLink } from '@/components/nav-link'

export function ProfileActions() {
  return (
    <div className="flex flex-1 flex-col border-y">
      <NavLink
        to="/customer"
        disablePrefix
        className="hover:bg-muted border-b px-4 py-6"
      >
        <div className="flex w-full items-center gap-4">
          <UserRound className="text-muted-foreground size-5" />

          <div className="flex-1">
            <h2 className="text-foreground text-base">Meus dados</h2>
            <p className="text-muted-foreground text-sm">
              Atualize os dados da sua conta
            </p>
          </div>

          <ChevronRight className="text-muted-foreground size-5" />
        </div>
      </NavLink>

      <NavLink
        to="/address"
        disablePrefix
        className="hover:bg-muted border-b px-4 py-6"
      >
        <div className="flex w-full items-center gap-4">
          <MapPin className="text-muted-foreground size-5" />

          <div className="flex-1">
            <h2 className="text-foreground text-base">Endereços</h2>
            <p className="text-muted-foreground text-sm">
              Endereços salvos na sua conta
            </p>
          </div>

          <ChevronRight className="text-muted-foreground size-5" />
        </div>
      </NavLink>

      <NavLink
        to="/orders"
        disablePrefix
        className="hover:bg-muted border-b px-4 py-6"
      >
        <div className="flex w-full items-center gap-4">
          <UtensilsCrossed className="text-muted-foreground size-5" />

          <div className="flex-1">
            <h2 className="text-foreground text-base">Meus pedidos</h2>
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
