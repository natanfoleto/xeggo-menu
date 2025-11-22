import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

import { getOrders } from '@/api/customer/orders/get-orders'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import type { OrderStatus } from '@/dtos/orders/order-status'

import { OrderCard } from './order-card'
import { OrderFilters } from './order-filters'
import { OrderSkeleton } from './order-skeleton'

const orderStatusMap: Record<OrderStatus, string> = {
  awaiting_payment: 'Aguardando pagamento',
  payment_failed: 'Pagamento falhou',
  payment_confirmed: 'Pagamento confirmado',
  payment_overdue: 'Pagamento expirado',
  payment_refunded: 'Pagamento reembolsado',
  chargeback_requested: 'Estorno solicitado',
  pending: 'Pendente',
  canceled: 'Cancelado',
  processing: 'Em preparo',
  delivering: 'Em entrega',
  delivered: 'Entregue',
}

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const status = searchParams.get('status') as OrderStatus
  const date = searchParams.get('date')
  const restaurantId = searchParams.get('restaurantId')
  const limit = Number(searchParams.get('limit')) || 10

  const {
    data: ordersData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['orders', limit, status, date, restaurantId],
    queryFn: () =>
      getOrders({
        limit,
        status: status as OrderStatus,
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

    if (status) parts.push(`status ${orderStatusMap[status] || status}`)

    return `Nenhum pedido encontrado na ${parts.join(' com ')}.`
  }

  const hasMore =
    ordersData && ordersData.orders.length < ordersData.meta.totalCount

  return (
    <>
      <Helmet title="Meus pedidos - Xeggo" />

      <div className="min-h-screen space-y-4">
        <PageHeader title="Meus pedidos" />

        <div className="mx-auto max-w-7xl space-y-4 px-4">
          <OrderFilters />

          {isLoading && !ordersData && <OrderSkeleton />}

          {ordersData && (
            <div className="space-y-2">
              <div>
                {ordersData.orders.map((order) => (
                  <OrderCard key={order.orderId} order={order} />
                ))}

                {ordersData.orders.length === 0 && (
                  <div className="p-4">
                    <p className="text-muted-foreground text-center text-sm">
                      {getEmptyMessage()}
                    </p>
                  </div>
                )}
              </div>

              {hasMore && (
                <div className="flex justify-center pt-2 pb-4">
                  <Button
                    variant="link"
                    className="w-full font-normal"
                    onClick={handleLoadMore}
                    disabled={isFetching}
                  >
                    {isFetching ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      'Carregar mais'
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
