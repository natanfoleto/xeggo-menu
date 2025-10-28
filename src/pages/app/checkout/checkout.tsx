import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { createOrder } from '@/api/orders/create-order'
import { BottomNavigation } from '@/components/bottom-navigation'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { useOrder } from '@/contexts/order-context'
import { useRestaurant } from '@/contexts/restaurant-context'
import { formatAddress } from '@/utils/format-address'

import { CheckoutAddress } from './checkout-address'
import { CheckoutCouponCode } from './checkout-coupon-code'
import { CheckoutItems } from './checkout-items'
import { CheckoutObservations } from './checkout-observations'
import { CheckoutOrderType } from './checkout-order-type'
import { CheckoutPaymentMethods } from './checkout-payment-methods'
import { CheckoutValues } from './checkout-values'

export function Checkout() {
  const navigate = useNavigate()
  const { restaurant, slug } = useRestaurant()
  const { address } = useAuth()
  const {
    orderType,
    paymentMethods,
    changeForInCents,
    couponCode,
    observations,
    bagItems,
    resetOrder,
  } = useOrder()

  const { mutateAsync: createOrderFn, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success('Pedido realizado com sucesso!')

      resetOrder()

      navigate('/menu')
    },
  })

  async function handleCreateOrder() {
    if (!address) return toast.error('Selecione um endereço de entrega')

    if (paymentMethods.length === 0)
      return toast.error('Selecione ao menos uma forma de pagamento')

    if (bagItems.length === 0) return toast.error('Adicione itens ao carrinho')

    if (!restaurant) return toast.error('Restaurante não encontrado')

    await createOrderFn({
      restaurantId: restaurant.id,
      orderType,
      deliveryAddress: formatAddress(address),
      paymentMethods,
      changeForInCents,
      couponCode,
      observations,
      items: bagItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        observations: item.observations || undefined,
        complements: item.complements.map((comp) => ({
          complementId: comp.id,
          quantity: comp.quantity,
        })),
      })),
    })
  }

  const canSubmit =
    bagItems.length > 0 && paymentMethods.length > 0 && address && !isPending

  if (!restaurant) return null
  if (!restaurant.isOpen) {
    return <Navigate to={`/${slug}/menu`} replace />
  }

  return (
    <>
      <Helmet title="Finalizar pedido" />

      <div className="flex min-h-screen flex-col pb-36">
        <PageHeader title="Finalize seu pedido" />

        <div className="flex flex-1 flex-col gap-0 px-4">
          <CheckoutItems />
          <CheckoutOrderType />
          <CheckoutAddress />
          <CheckoutPaymentMethods />
          <CheckoutCouponCode />
          <CheckoutObservations />
          <CheckoutValues />
        </div>

        <div className="bg-background fixed inset-x-0 bottom-16 border-t p-4">
          <Button
            onClick={handleCreateOrder}
            disabled={!canSubmit}
            className="w-full"
            size="lg"
          >
            {isPending ? 'Finalizando...' : 'Finalizar pedido'}
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </>
  )
}
