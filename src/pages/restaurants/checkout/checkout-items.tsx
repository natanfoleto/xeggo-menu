import { useOrder } from '@/contexts/order-context'
import { formatCurrency } from '@/utils/format-currency'

export function CheckoutItems() {
  const { bagItems } = useOrder()

  return (
    <div className="space-y-2 py-4">
      <h2 className="text-muted-foreground text-sm">Itens do pedido</h2>

      <div className="space-y-2">
        {bagItems.map((item) => {
          const itemTotal =
            (item.priceInCents +
              item.complements.reduce(
                (sum, comp) => sum + comp.priceInCents * comp.quantity,
                0,
              )) *
            item.quantity

          return (
            <div key={item.id} className="flex justify-between text-sm">
              <div className="flex-1">
                <p className="font-medium">
                  {item.quantity}x {item.productName}
                </p>

                {item.complements.length > 0 && (
                  <p className="text-muted-foreground text-xs">
                    {item.complements
                      .map((c) => `${c.quantity}x ${c.name}`)
                      .join(', ')}
                  </p>
                )}

                {item.observations && (
                  <p className="text-muted-foreground text-xs">
                    Obs: {item.observations}
                  </p>
                )}
              </div>

              <span className="font-medium">
                {formatCurrency(itemTotal / 100)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
