import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { formatAddress } from '@/utils/format-address'

export function CheckoutAddress() {
  const { address } = useAuth()

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-muted-foreground text-sm">Endereço de entrega</h2>

        <NavLink to="/address">
          <Button variant="link" size="sm" className="h-auto p-0 text-xs">
            Alterar
          </Button>
        </NavLink>
      </div>

      {address ? (
        <p className="text-sm">{formatAddress(address)}</p>
      ) : (
        <p className="text-muted-foreground text-xs">
          Nenhum endereço selecionado
        </p>
      )}
    </div>
  )
}
