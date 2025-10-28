import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'
import { formatCurrency } from '@/utils/format-currency'

export function CheckoutChangeFor() {
  const { changeForInCents } = useOrder()

  if (!changeForInCents) return null

  return (
    <div className="flex items-center justify-between border-t py-4">
      <div className="space-y-2">
        <h2 className="text-muted-foreground text-sm">Precisa de troco para</h2>
        <p className="text-sm">{formatCurrency(changeForInCents / 100)}</p>
      </div>

      <NavLink to="/bag">
        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
          Alterar
        </Button>
      </NavLink>
    </div>
  )
}
