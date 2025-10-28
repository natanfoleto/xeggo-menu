import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { useOrder } from '@/contexts/order-context'
import { formatAddress } from '@/utils/format-address'

export function CheckoutAddress() {
  const { address } = useAuth()
  const { orderType } = useOrder()

  if (orderType === 'pickup') return null

  return (
    <div className="flex items-center justify-between border-t py-4">
      <div className="space-y-2">
        <h2 className="text-muted-foreground text-sm">Endereço de entrega</h2>
        {address ? (
          <p className="text-sm">{formatAddress(address)}</p>
        ) : (
          <p className="text-muted-foreground text-xs">
            Nenhum endereço selecionado
          </p>
        )}
      </div>

      <NavLink to="/address">
        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
          Alterar
        </Button>
      </NavLink>
    </div>
  )
}
