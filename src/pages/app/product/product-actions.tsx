import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/format-currency'

interface ProductActionsProps {
  isOpen: boolean
  quantity: number
  totalPrice: number
  onQuantityChange: (quantity: number) => void
  onAddToCart: () => void
}

export function ProductActions({
  isOpen,
  quantity,
  totalPrice,
  onQuantityChange,
  onAddToCart,
}: ProductActionsProps) {
  return (
    <div className="bg-background fixed right-0 bottom-0 left-0 border-t">
      {isOpen ? (
        <div className="flex items-center gap-3 p-4">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="size-10"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            >
              <Minus className="size-4" />
            </Button>

            <span className="font-semibold">{quantity}</span>

            <Button
              size="icon"
              variant="ghost"
              className="size-10"
              onClick={() => onQuantityChange(quantity + 1)}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <Button size="lg" className="flex-1" onClick={onAddToCart}>
            Adicionar {formatCurrency(totalPrice / 100)}
          </Button>
        </div>
      ) : (
        <div className="p-4 text-center">
          <p className="font-semibold">Fechado no momento</p>
          <p className="text-muted-foreground text-sm">
            No momento não estamos aceitando pedidos.
          </p>
        </div>
      )}
    </div>
  )
}
