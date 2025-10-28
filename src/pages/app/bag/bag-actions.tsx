import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { useOrder } from '@/contexts/order-context'
import { formatCurrency } from '@/utils/format-currency'

export function BagActions() {
  const { address } = useAuth()
  const {
    deliveryFeeInCents,
    discountInCents,
    orderType,
    bagTotal,
    bagItems,
    paymentMethods,
  } = useOrder()

  const subtotal = bagItems.reduce((total, item) => {
    const itemTotal = item.priceInCents * item.quantity

    const complementsTotal = item.complements.reduce(
      (sum, comp) => sum + comp.priceInCents * comp.quantity,
      0,
    )
    return total + itemTotal + complementsTotal * item.quantity
  }, 0)

  const canSubmit =
    bagItems.length > 0 && address !== null && paymentMethods.length > 0

  return (
    <div className="bg-background border-t p-4">
      <div className="w-full space-y-1">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Subtotal</span>
            <span>{formatCurrency(subtotal / 100)}</span>
          </div>

          <div>
            {orderType === 'delivery' &&
              deliveryFeeInCents !== null &&
              deliveryFeeInCents > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">
                    Taxa de entrega
                  </span>

                  <span className="text-sm">
                    {formatCurrency(deliveryFeeInCents / 100)}
                  </span>
                </div>
              )}

            {discountInCents !== null && discountInCents > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">Desconto</span>

                <span className="text-sm text-green-600">
                  -{formatCurrency(discountInCents / 100)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-medium">Total</span>
          <span className="text-lg font-medium">
            {formatCurrency(bagTotal / 100)}
          </span>
        </div>

        <NavLink to="/checkout">
          <Button
            size="lg"
            className="w-full text-base font-normal"
            disabled={!canSubmit}
          >
            Enviar pedido
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
