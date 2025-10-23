import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'
import { useRestaurant } from '@/contexts/restaurant-context'
import { formatCurrency } from '@/utils/format-currency'

export function BagItems() {
  const { bagItems, updateItemQuantity } = useOrder()
  const { slug } = useRestaurant()

  if (bagItems.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground text-sm">Sua sacola está vazia</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 px-4">
      <div>
        {bagItems.map((item) => {
          const itemTotal =
            (item.priceInCents +
              item.complements.reduce(
                (sum, comp) => sum + comp.priceInCents * comp.quantity,
                0,
              )) *
            item.quantity

          return (
            <div key={item.id} className="space-y-2.5 border-t py-4">
              <div className="flex gap-3">
                <div className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold">
                      {item.quantity}x {item.productName}
                    </h3>

                    {item.complements.length > 0 && (
                      <div className="space-y-0.5">
                        {item.complements.map((comp) => (
                          <p
                            key={comp.id}
                            className="text-muted-foreground text-xs"
                          >
                            {comp.quantity}x {comp.name}
                            {comp.priceInCents > 0 &&
                              ` (+${formatCurrency(comp.priceInCents / 100)})`}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {item.observations && (
                    <p className="text-muted-foreground text-xs">
                      Obs: {item.observations}
                    </p>
                  )}
                </div>

                <p className="font-semibold">
                  {formatCurrency(itemTotal / 100)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  className="p-0"
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                >
                  Remover
                </Button>

                <Button
                  variant="ghost"
                  className="p-0"
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <Button variant="link" className="w-full" asChild>
        <Link to={`/${slug}/menu`}>Adicionar mais itens</Link>
      </Button>
    </div>
  )
}
