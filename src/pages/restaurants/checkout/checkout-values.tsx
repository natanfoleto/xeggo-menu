import { useOrder } from '@/contexts/order-context'
import { formatCurrency } from '@/utils/format-currency'

export function CheckoutValues() {
  const { deliveryFeeInCents, discountInCents, orderType, bagTotal, bagItems } =
    useOrder()

  const subtotal = bagItems.reduce((total, item) => {
    const itemTotal = item.priceInCents * item.quantity

    const complementsTotal = item.complements.reduce(
      (sum, comp) => sum + comp.priceInCents * comp.quantity,
      0,
    )
    return total + itemTotal + complementsTotal * item.quantity
  }, 0)

  return (
    <div className="space-y-2 border-t py-4">
      <h2 className="text-muted-foreground text-sm">Resumo dos valores</h2>

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

        <div className="flex items-center justify-between pt-1">
          <span className="font-medium">Total</span>

          <span className="text-lg font-medium">
            {formatCurrency(bagTotal / 100)}
          </span>
        </div>
      </div>
    </div>
  )
}
