import { useMutation, useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { RefreshCcw } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { cancelOrder } from '@/api/customer/orders/cancel-order'
import { getCheckoutUrl } from '@/api/customer/orders/get-checkout-url'
import { getCustomerOrderDetails } from '@/api/customer/orders/get-order-details'
import { OrderStatusTag } from '@/components/order-status-tag'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { OrderType } from '@/dtos/orders/order-type'
import type { PaymentType } from '@/dtos/orders/payment-type'
import type { PaymentMethod } from '@/dtos/payment-methods/payment-method'
import { formatCurrency } from '@/utils/format-currency'

import { OrderDetailsSkeleton } from './order-details-skeleton'

const PAYMENT_TYPES: Record<PaymentType, string> = {
  online: 'Pagamento online',
  onDelivery: 'Pagamento na entrega/retirada',
}

const PAYMENT_METHODS: Record<PaymentMethod, string> = {
  cash: 'Dinheiro',
  creditCard: 'Cartão de Crédito',
  debitCard: 'Cartão de Débito',
  pix: 'PIX',
}

const ORDER_TYPES: Record<OrderType, string> = {
  delivery: 'Entrega',
  pickup: 'Retirada',
}

export function OrderDetails() {
  const { orderId } = useParams<{ orderId: string }>()

  const {
    data: order,
    isLoading: isLoadingOrder,
    isFetching: isFetchingOrder,
    refetch,
  } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getCustomerOrderDetails({ orderId: orderId! }),
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
    enabled: !!orderId,
  })

  const { mutate: getCheckoutUrlFn, isPending: isLoadingCheckout } =
    useMutation({
      mutationFn: () => getCheckoutUrl({ orderId: orderId! }),
      onSuccess: (checkoutUrl) => {
        window.location.href = checkoutUrl
      },
      onError: () => {
        toast.error('Não foi possível obter o link de pagamento.')
      },
    })

  const { mutate: cancelOrderFn, isPending: isCanceling } = useMutation({
    mutationFn: () => cancelOrder({ orderId: orderId! }),
    onSuccess: () => {
      toast.success('Pedido cancelado com sucesso!')
      refetch()
    },
  })

  const hasCashPayment = order?.paymentMethod === 'cash'
  const canRetryPayment = order?.status === 'awaiting_payment'
  const canCancel =
    order?.status === 'awaiting_payment' || order?.status === 'pending'

  return (
    <>
      <Helmet title="Acompanhar pedido" />

      <div
        className={`min-h-screen ${(canRetryPayment || canCancel) && 'pb-12'}`}
      >
        <PageHeader title="Acompanhar pedido" />

        <div className="mx-auto max-w-7xl">
          <div className="bg-background sticky top-0 z-10 border-b p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="flex items-center gap-2 text-lg font-semibold">
                  Pedido #{orderId}
                </h1>
                <p className="text-muted-foreground text-sm">
                  Acompanhe seu pedido em tempo real
                </p>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => refetch()}
                disabled={isFetchingOrder}
              >
                <RefreshCcw
                  className={`size-4 ${isFetchingOrder ? 'animate-spin' : ''}`}
                />
              </Button>
            </div>
          </div>

          {isLoadingOrder && <OrderDetailsSkeleton />}

          {order && (
            <div>
              <section className="bg-muted p-4">
                <p className="text-muted-foreground text-xs">
                  Realizado{' '}
                  {formatDistanceToNow(new Date(order.createdAt), {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </p>

                <div className="mt-2 space-y-0.5">
                  <div className="flex justify-between text-sm">
                    <p className="text-muted-foreground">Status do pedido</p>

                    <OrderStatusTag status={order.status} />
                  </div>

                  {order.estimatedDeliveryTime && (
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-muted-foreground">Tempo estimado</p>
                      <p>{order.estimatedDeliveryTime} minutos</p>
                    </div>
                  )}
                </div>
              </section>

              {canRetryPayment && (
                <section className="space-y-1 border-b bg-yellow-50 p-4 text-sm dark:bg-yellow-950/20">
                  <h3 className="font-semibold">Aguardando pagamento</h3>

                  <p className="text-muted-foreground text-xs">
                    Seu pedido foi criado mas ainda não foi pago. Finalize o
                    pagamento para que o restaurante possa processar seu pedido.
                  </p>
                </section>
              )}

              {order.status === 'pending' && (
                <section className="space-y-1 border-b bg-zinc-50 p-4 text-sm dark:bg-zinc-950/20">
                  <h3 className="font-semibold">Aguardando restaurante</h3>

                  <p className="text-muted-foreground text-xs">
                    Aguarde o restaurante aceitar seu pedido
                  </p>
                </section>
              )}

              {order.status === 'payment_confirmed' && (
                <section className="space-y-1 border-b bg-blue-50 p-4 text-sm dark:bg-blue-950/20">
                  <h3 className="font-semibold">Aguardando restaurante</h3>

                  <p className="text-muted-foreground text-xs">
                    Aguarde o restaurante começar a preparar seu pedido
                  </p>
                </section>
              )}

              {order.cancellationReason && (
                <section className="space-y-1 border-b bg-red-50 p-4 text-sm dark:bg-red-950/20">
                  <h3 className="font-semibold">Motivo do cancelamento</h3>

                  <p className="text-muted-foreground text-xs">
                    {order.cancellationReason}
                  </p>
                </section>
              )}

              <section className="space-y-2 border-b p-4">
                <h2 className="font-medium">Tipo de pedido</h2>

                <p className="text-sm">
                  {ORDER_TYPES[order.orderType] || order.orderType}
                </p>
              </section>

              <section className="space-y-2 border-b p-4">
                <h2 className="font-medium">Informações do cliente</h2>

                <div className="space-y-3">
                  <div>
                    <p className="text-muted-foreground text-sm">Nome</p>
                    <p className="text-sm font-medium">{order.customer.name}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm">E-mail</p>
                    <p className="text-sm font-medium">
                      {order.customer.email}
                    </p>
                  </div>

                  {order.customer.phone && (
                    <div>
                      <p className="text-muted-foreground text-sm">Telefone</p>
                      <p className="text-sm font-medium">
                        {order.customer.phone}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {order.deliveryAddress && (
                <section className="space-y-2 border-b p-4">
                  <h2 className="font-medium">Endereço de entrega</h2>

                  <p className="text-muted-foreground text-sm">
                    {order.deliveryAddress}
                  </p>
                </section>
              )}

              <section className="space-y-2 border-b p-4">
                <h2 className="font-medium">Pagamento</h2>

                <div className="space-y-3">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Forma de pagamento — {PAYMENT_TYPES[order.paymentType]}
                    </p>
                    <p className="text-sm font-medium">
                      {PAYMENT_METHODS[order.paymentMethod]}
                    </p>
                  </div>

                  {hasCashPayment && order.changeForInCents && (
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Troco para
                      </p>
                      <p className="text-sm font-medium">
                        {formatCurrency(order.changeForInCents / 100)}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {order.couponCode && (
                <section className="space-y-2 border-b p-4">
                  <h2 className="font-medium">Cupom aplicado</h2>

                  <p className="font-mono text-sm font-medium">
                    {order.couponCode}
                  </p>
                </section>
              )}

              {order.observations && (
                <section className="space-y-2 border-b p-4">
                  <h2 className="font-medium">Observações</h2>

                  <p className="text-sm">{order.observations}</p>
                </section>
              )}

              <section className="space-y-2 p-4">
                <h2 className="font-medium">Itens do pedido</h2>

                <div className="space-y-4">
                  {order.orderItems.map((orderItem) => {
                    const itemSubtotal =
                      orderItem.priceInCents * orderItem.quantity

                    const complementsTotal =
                      orderItem.selectedComplements.reduce(
                        (acc, complement) =>
                          acc + complement.priceInCents * complement.quantity,
                        0,
                      )

                    const totalWithComplements = itemSubtotal + complementsTotal

                    return (
                      <div key={orderItem.id}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-2">
                              <span className="text-muted-foreground text-sm font-medium">
                                {orderItem.quantity}x
                              </span>

                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  {orderItem.product?.name ?? (
                                    <span className="text-muted-foreground italic">
                                      Produto removido
                                    </span>
                                  )}
                                </p>

                                {orderItem.selectedComplements.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    {orderItem.selectedComplements.map(
                                      (complement) => (
                                        <div
                                          key={complement.id}
                                          className="text-muted-foreground flex items-center justify-between gap-2 text-xs"
                                        >
                                          <span>
                                            {complement.quantity}x{' '}
                                            {complement.complement.name}
                                          </span>
                                          <span>
                                            {formatCurrency(
                                              (complement.priceInCents *
                                                complement.quantity) /
                                                100,
                                            )}
                                          </span>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                )}

                                {orderItem.observations && (
                                  <p className="text-muted-foreground mt-2 text-xs">
                                    Obs: {orderItem.observations}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {formatCurrency(totalWithComplements / 100)}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {formatCurrency(orderItem.priceInCents / 100)} un.
                            </p>
                          </div>
                        </div>

                        {orderItem !==
                          order.orderItems[order.orderItems.length - 1] && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>

              <section className="bg-muted p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      {formatCurrency(order.totalInCents / 100)}
                    </span>
                  </div>

                  {order.deliveryFeeInCents !== null &&
                    order.deliveryFeeInCents > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Taxa de entrega
                        </span>
                        <span className="font-medium">
                          {formatCurrency(order.deliveryFeeInCents / 100)}
                        </span>
                      </div>
                    )}

                  {order.discountInCents !== null &&
                    order.discountInCents > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Desconto</span>
                        <span className="font-medium text-green-600">
                          -{formatCurrency(order.discountInCents / 100)}
                        </span>
                      </div>
                    )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total do pedido</span>
                    <span className="text-lg font-medium">
                      {formatCurrency(
                        (order.totalInCents +
                          (order.deliveryFeeInCents || 0) -
                          (order.discountInCents || 0)) /
                          100,
                      )}
                    </span>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {order && (canRetryPayment || canCancel) && (
          <div className="bg-background fixed inset-x-0 bottom-0 border-t p-2">
            <div className="mx-auto flex max-w-7xl gap-2">
              {canRetryPayment && (
                <Button
                  onClick={() => getCheckoutUrlFn()}
                  disabled={isLoadingCheckout || isCanceling}
                  className="flex-1"
                  size="sm"
                >
                  {isLoadingCheckout ? 'Carregando...' : 'Finalizar pagamento'}
                </Button>
              )}

              {canCancel && (
                <Button
                  variant="destructive"
                  onClick={() => cancelOrderFn()}
                  disabled={isCanceling || isLoadingCheckout}
                  className={canRetryPayment ? '' : 'flex-1'}
                  size="sm"
                >
                  {isCanceling ? 'Cancelando...' : 'Cancelar pedido'}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
