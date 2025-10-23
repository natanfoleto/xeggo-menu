import { CircleArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'
import { formatCurrency } from '@/utils/format-currency'

export function BagActions() {
  const { bagTotal, bagItems, deliveryAddress, paymentMethod } = useOrder()

  const canSubmit =
    bagItems.length > 0 && deliveryAddress !== null && paymentMethod !== null

  const handleSubmitOrder = () => {
    if (!canSubmit) return

    console.log('Enviar pedido')
  }

  return (
    <div className="bg-background border-t p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium">Total</span>

          <span className="text-lg font-medium">
            {formatCurrency(bagTotal / 100)}
          </span>
        </div>

        <Button
          size="lg"
          className="w-full text-base font-normal"
          onClick={handleSubmitOrder}
          disabled={!canSubmit}
        >
          Enviar pedido
          <CircleArrowRight className="size-5" />
        </Button>

        {!canSubmit && bagItems.length > 0 && (
          <p className="text-muted-foreground text-center text-xs">
            Adicione endereço e forma de pagamento para continuar
          </p>
        )}
      </div>
    </div>
  )
}
