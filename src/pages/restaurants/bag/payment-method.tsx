import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'
import { useRestaurant } from '@/contexts/restaurant-context'

const PAYMENT_TYPES: Record<string, string> = {
  online: 'Pagamento online',
  onDelivery: 'Pagamento na entrega/retirada',
}

const ONLINE_PAYMENT_METHODS: Record<string, string> = {
  creditCard: 'Cartão de Crédito',
  debitCard: 'Cartão de Débito',
  pix: 'PIX',
}

const DELIVERY_PAYMENT_METHODS: Record<string, string> = {
  cash: 'Dinheiro',
  creditCard: 'Cartão de Crédito',
  debitCard: 'Cartão de Débito',
  pix: 'PIX',
}

export function PaymentMethod() {
  const { restaurant } = useRestaurant()
  const { paymentType, setPaymentType, paymentMethod, setPaymentMethod } =
    useOrder()

  if (!restaurant?.paymentMethods || restaurant.paymentMethods.length === 0) {
    return null
  }

  const handleSelectPaymentMethod = (type: string, method: string) => {
    setPaymentType(type)

    if (paymentType === type && paymentMethod === method) {
      setPaymentMethod(null)
    } else {
      setPaymentMethod(method)
    }
  }

  return (
    <div className="space-y-4 border-t px-4 py-6">
      <div>
        <h2 className="text-sm">Forma de pagamento</h2>

        <p className="text-muted-foreground text-xs">
          Selecione uma forma de pagamento
        </p>
      </div>

      {restaurant.paymentTypes.map((type) => {
        return (
          <div key={type} className="space-y-1.5">
            <h3 className="text-muted-foreground text-xs">
              {PAYMENT_TYPES[type]}
            </h3>

            <div className="flex flex-wrap items-center gap-1">
              {restaurant.paymentMethods.map((method) => {
                const isSelected =
                  paymentType === type && paymentMethod === method

                const PAYMENT_METHODS =
                  type === 'online'
                    ? ONLINE_PAYMENT_METHODS
                    : DELIVERY_PAYMENT_METHODS

                if (type === 'online' && method === 'cash') return null

                return (
                  <Button
                    key={method}
                    variant={isSelected ? 'default' : 'brand'}
                    size="xs"
                    onClick={() => handleSelectPaymentMethod(type, method)}
                    className="w-min text-xs font-normal transition-all"
                  >
                    {PAYMENT_METHODS[method] || method}
                  </Button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
