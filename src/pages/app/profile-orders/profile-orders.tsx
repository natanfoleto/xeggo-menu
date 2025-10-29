import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

import { getCustomerOrders } from '@/api/customers/get-customer-orders'
import { BottomNavigation } from '@/components/bottom-navigation'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'

import { OrderCard } from './order-card'
import { OrderFilters } from './order-filters'
import { OrderSkeleton } from './order-skeleton'

const statusMap: Record<string, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  processing: 'Preparando',
  delivering: 'Em entrega',
  delivered: 'Entregue',
}

export function ProfileOrders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const status = searchParams.get('status')
  const date = searchParams.get('date')
  const restaurantId = searchParams.get('restaurantId')
  const limit = Number(searchParams.get('limit')) || 10

  const { data: result, isLoading } = useQuery({
    queryKey: ['customer-orders', limit, status, date, restaurantId],
    queryFn: () =>
      getCustomerOrders({
        limit,
        status: status as
          | 'pending'
          | 'canceled'
          | 'processing'
          | 'delivering'
          | 'delivered',
        date: date ? new Date(date) : undefined,
        restaurantId: restaurantId || undefined,
      }),
    placeholderData: keepPreviousData,
  })

  function handleLoadMore() {
    setSearchParams((state) => {
      state.set('limit', String(limit + 10))

      return state
    })
  }

  function getEmptyMessage() {
    const hasFilters = status || date

    if (!hasFilters) return 'Nenhum pedido encontrado.'

    const parts: string[] = []

    if (date) {
      const [year, month, day] = date.split('-')
      const formattedDate = `${day}/${month}/${year}`

      parts.push(`data ${formattedDate}`)
    }

    if (status) parts.push(`status ${statusMap[status] || status}`)

    return `Nenhum pedido encontrado na ${parts.join(' com ')}.`
  }

  const hasMore = result && result.orders.length < result.meta.totalCount

  return (
    <>
      <Helmet title="Meus pedidos" />

      <div className="min-h-screen space-y-4 pb-24">
        <PageHeader title="Meus pedidos" />

        <div className="space-y-4 px-4">
          <OrderFilters />

          {isLoading && !result && <OrderSkeleton />}

          {result && (
            <div className="space-y-2">
              <div>
                {result.orders.map((order) => (
                  <OrderCard key={order.orderId} order={order} />
                ))}

                {result.orders.length === 0 && (
                  <div className="p-4">
                    <p className="text-muted-foreground text-center text-sm">
                      {getEmptyMessage()}
                    </p>
                  </div>
                )}
              </div>

              {hasMore && (
                <div className="flex justify-center pt-2">
                  <Button
                    variant="link"
                    className="w-full font-normal"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                  >
                    Carregar mais
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </>
  )
}
