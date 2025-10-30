import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'

export function CheckoutObservations() {
  const { observations } = useOrder()

  if (!observations) return null

  return (
    <div className="flex items-center justify-between border-t py-4">
      <div className="space-y-2">
        <h2 className="text-muted-foreground text-sm">Observações</h2>
        <p className="text-sm">{observations}</p>
      </div>

      <NavLink to="/bag">
        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
          Alterar
        </Button>
      </NavLink>
    </div>
  )
}
