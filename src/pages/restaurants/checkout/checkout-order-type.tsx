import { NavLink } from '@/components/nav-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'

export function CheckoutOrderType() {
  const { orderType } = useOrder()

  return (
    <div className="flex items-center justify-between border-t py-4">
      <div className="space-y-2">
        <h2 className="text-muted-foreground text-sm">Tipo de entrega</h2>

        {orderType === 'delivery' ? (
          <Badge
            variant="outline"
            className="not-dark:border-muted-foreground font-normal"
          >
            Entrega
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="not-dark:border-muted-foreground font-normal"
          >
            Retirada
          </Badge>
        )}
      </div>
      <NavLink to="/bag">
        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
          Alterar
        </Button>
      </NavLink>
    </div>
  )
}
