import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'

import { NavLink } from '@/components/nav-link'
import { OrderStatus } from '@/components/order-status'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/format-currency'
import { getInitialsName } from '@/utils/get-initials-name'

interface OrderCardProps {
  order: {
    orderId: string
    createdAt: string
    restaurant: {
      name: string
      slug: string
      avatarUrl: string | null
    }
    products: {
      name: string
      quantity: number
    }[]
    totalItemsQuantity: number
    total: number
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  }
}

export function OrderCard({ order }: OrderCardProps) {
  const [showAllProducts, setShowAllProducts] = useState(false)

  const hasMoreProducts = order.products.length > 1

  const displayedProducts = showAllProducts
    ? order.products
    : order.products.slice(0, 1)

  return (
    <NavLink
      to={`/orders/${order.orderId}`}
      className="border-t first:border-t-0"
      disablePrefix
    >
      <div className="hover:bg-muted/50 w-full cursor-pointer space-y-3 p-4 transition-colors">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-8">
            <AvatarImage
              src={order.restaurant.avatarUrl || ''}
              alt={order.restaurant.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-muted text-muted-foreground rounded-lg text-xs">
              {getInitialsName(order.restaurant.name)}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-foreground flex-1 truncate text-sm">
            {order.restaurant.name}
          </h2>

          <div className="text-right">
            <p className="text-muted-foreground text-xs">
              {formatDistanceToNow(new Date(order.createdAt), {
                locale: ptBR,
                addSuffix: true,
              })}
            </p>

            <p className="text-foreground text-sm">
              {formatCurrency(order.total / 100)}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div>
            {displayedProducts.map((product, index) => (
              <p
                key={`${product.name}-${index}`}
                className="text-muted-foreground text-xs"
              >
                {product.quantity}x {product.name}
              </p>
            ))}

            {hasMoreProducts && !showAllProducts && (
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs"
                onClick={(e) => {
                  e.preventDefault()
                  setShowAllProducts(true)
                }}
              >
                Ver mais {order.products.length - 1}{' '}
                {order.products.length - 1 === 1 ? 'item' : 'itens'}
              </Button>
            )}

            {hasMoreProducts && showAllProducts && (
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs"
                onClick={(e) => {
                  e.preventDefault()
                  setShowAllProducts(false)
                }}
              >
                Ver menos
              </Button>
            )}
          </div>

          <OrderStatus status={order.status} className="text-xs" />
        </div>
      </div>
    </NavLink>
  )
}
