import { CircleArrowRight } from 'lucide-react'

import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { useOrder } from '@/contexts/order-context'
import { formatCurrency } from '@/utils/format-currency'

export function BagActions() {
  const { address } = useAuth()
  const { bagTotal, bagItems, paymentMethods } = useOrder()

  const canSubmit =
    bagItems.length > 0 && address !== null && paymentMethods.length > 0

  const handleSubmitOrder = () => {
    if (!canSubmit) return

    console.log('Enviar pedido')
  }

  return (
    <div className="bg-background fixed right-0 bottom-16 left-0 border-t p-4">
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-medium">Total</span>

          <span className="text-lg font-medium">
            {formatCurrency(bagTotal / 100)}
          </span>
        </div>

        <NavLink to="/checkout">
          <Button
            size="lg"
            className="w-full text-base font-normal"
            onClick={handleSubmitOrder}
            disabled={!canSubmit}
          >
            Enviar pedido
            <CircleArrowRight className="size-5" />
          </Button>
        </NavLink>

        {!canSubmit && bagItems.length > 0 && (
          <p className="text-muted-foreground text-center text-xs">
            Adicione endereço e forma de pagamento para continuar
          </p>
        )}
      </div>
    </div>
  )
}
