import { Minus, Plus } from 'lucide-react'

import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { useRestaurant } from '@/contexts/restaurant-context'
import { formatCurrency } from '@/utils/format-currency'

interface ProductActionsProps {
  isOpen: boolean
  quantity: number
  totalPrice: number
  onQuantityChange: (quantity: number) => void
  onAddToBag: () => void
}

export function ProductActions({
  isOpen,
  quantity,
  totalPrice,
  onQuantityChange,
  onAddToBag,
}: ProductActionsProps) {
  const { isAuthenticated } = useAuth()
  const { slug } = useRestaurant()

  if (!isAuthenticated) {
    return (
      <div className="bg-background fixed right-0 bottom-0 left-0 border-t">
        <div className="p-4 text-center">
          <p className="font-semibold">Faça login para comprar</p>
          <p className="text-muted-foreground mb-3 text-sm">
            Entre ou crie sua conta para adicionar produtos à sacola.
          </p>

          <NavLink to={`/${slug}`} disablePrefix>
            <Button className="w-full">Entre ou cadastre-se</Button>
          </NavLink>
        </div>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <div className="bg-background fixed right-0 bottom-0 left-0 border-t">
        <div className="p-4 text-center">
          <p className="font-semibold">Fechado no momento</p>
          <p className="text-muted-foreground text-sm">
            No momento não estamos aceitando pedidos.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background fixed right-0 bottom-0 left-0 border-t">
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

          <span className="text-sm">{quantity}</span>

          <Button
            size="icon"
            variant="ghost"
            className="size-10"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            <Plus className="size-4" />
          </Button>
        </div>

        <Button size="lg" className="flex-1" onClick={onAddToBag}>
          Adicionar {formatCurrency(totalPrice / 100)}
        </Button>
      </div>
    </div>
  )
}
