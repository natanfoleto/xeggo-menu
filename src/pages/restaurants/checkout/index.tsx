import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { createOrder } from '@/api/customer/orders/create-order'
import { BottomNavigation } from '@/components/bottom-navigation'
import { FormCpfCnpjInput } from '@/components/form/form-cpf-cnpj-input'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth-context'
import { useOrder } from '@/contexts/order-context'
import { useRestaurant } from '@/contexts/restaurant-context'
import { formatAddress } from '@/utils/format-address'
import { isValidCPF } from '@/utils/validate-document'

import { CheckoutAddress } from './checkout-address'
import { CheckoutChangeFor } from './checkout-change-for'
import { CheckoutCouponCode } from './checkout-coupon-code'
import { CheckoutItems } from './checkout-items'
import { CheckoutObservations } from './checkout-observations'
import { CheckoutOrderType } from './checkout-order-type'
import { CheckoutPaymentMethods } from './checkout-payment-methods'
import { CheckoutValues } from './checkout-values'

export function Checkout() {
  const navigate = useNavigate()

  const { user, address } = useAuth()
  const { restaurant } = useRestaurant()
  const {
    orderType,
    paymentType,
    paymentMethod,
    changeForInCents,
    couponCode,
    observations,
    bagItems,
    resetOrder,
  } = useOrder()

  const [documentAlert, setDocumentAlert] = useState(false)
  const [cpf, setCpf] = useState(user?.cpf ?? '')
  const [cpfError, setCpfError] = useState<string | null>()

  const { mutateAsync: createOrderFn, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: ({ orderId, checkoutUrl }) => {
      if (checkoutUrl) {
        window.location.href = checkoutUrl
        return
      }

      toast.success('Pedido realizado com sucesso!')
      resetOrder()
      navigate(`/orders/${orderId}`, { replace: true })
    },
    onError: () => {
      toast.error('Erro ao criar pedido. Tente novamente.')
    },
  })

  function handleValidateCpf() {
    setCpfError(null)

    if (!cpf) {
      return setCpfError('CPF é obrigatório')
    }

    if (!isValidCPF(cpf)) {
      return setCpfError('CPF inválido')
    }

    setDocumentAlert(false)
  }

  async function handleCreateOrder() {
    if (!address) {
      return toast.error('Selecione um endereço de entrega.')
    }

    if (!paymentType || !paymentMethod) {
      return toast.error('Selecione uma forma de pagamento.')
    }

    if (bagItems.length === 0) {
      return toast.error('Adicione itens ao carrinho.')
    }

    if (!restaurant) {
      return toast.error('Restaurante não encontrado.')
    }

    if (paymentType === 'online' && !user?.cpf && !cpf) {
      return setDocumentAlert(true)
    }

    await createOrderFn({
      restaurantId: restaurant.id,
      customerCpf: cpf,
      customerPhone: user?.phone,
      orderType,
      deliveryAddress: formatAddress(address),
      paymentType,
      paymentMethod,
      changeForInCents,
      couponCode,
      observations,
      items: bagItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        observations: item.observations || undefined,
        complements: item.complements.map((complement) => ({
          complementId: complement.id,
          quantity: complement.quantity,
        })),
      })),
    })
  }

  function handleOpenChange(open: boolean) {
    if (!open) setCpfError(null)

    setDocumentAlert(open)
  }

  const canSubmit =
    bagItems.length > 0 &&
    address &&
    paymentType !== null &&
    paymentMethod !== null &&
    !isPending

  return (
    <>
      <Helmet title="Finalizar pedido" />

      <div className="flex min-h-screen flex-col pb-36">
        <PageHeader title="Finalize seu pedido" />

        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-1 flex-col gap-0 px-4">
            <CheckoutItems />
            <CheckoutOrderType />
            <CheckoutAddress />
            <CheckoutPaymentMethods />
            <CheckoutChangeFor />
            <CheckoutCouponCode />
            <CheckoutObservations />
            <CheckoutValues />
          </div>

          <div className="bg-background fixed inset-x-0 bottom-16 mx-auto max-w-7xl border-t p-4">
            <Button
              onClick={handleCreateOrder}
              disabled={!canSubmit}
              className="w-full text-base"
              size="lg"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Finalizar pedido'
              )}
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />

      <Dialog open={documentAlert} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>CPF necessário para pagamentos online</DialogTitle>
            <DialogDescription>
              Para finalizar a compra com pagamento online, é obrigatório
              informar o número do seu CPF (Cadastro de Pessoa Física) para a
              emissão da nota fiscal eletrônica.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <FormCpfCnpjInput
              id="cpf"
              value={cpf}
              onChange={(value) => {
                setCpf(value)
                if (cpfError) setCpfError(null)
              }}
              maxLength={14}
              className="text-sm"
              error={cpfError}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button onClick={handleValidateCpf}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
