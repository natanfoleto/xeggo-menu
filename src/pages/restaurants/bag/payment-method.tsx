import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'
import { useRestaurant } from '@/contexts/restaurant-context'

const PAYMENT_METHODS: Record<string, string> = {
  cash: 'Dinheiro',
  creditCard: 'Cartão de Crédito',
  debitCard: 'Cartão de Débito',
  pix: 'PIX',
  voucher: 'Voucher',
  bankTransfer: 'Transferência Bancária',
}

export function PaymentMethod() {
  const { restaurant } = useRestaurant()
  const { paymentMethods, setPaymentMethods } = useOrder()

  if (!restaurant?.paymentMethods || restaurant.paymentMethods.length === 0) {
    return null
  }

  const handleTogglePaymentMethod = (method: string) => {
    const currentMethods = paymentMethods || []

    if (currentMethods.includes(method)) {
      setPaymentMethods(currentMethods.filter((m) => m !== method))
    } else {
      setPaymentMethods([...currentMethods, method])
    }
  }

  return (
    <div className="space-y-4 border-t px-4 py-6">
      <div>
        <h2 className="text-sm">Formas de pagamento</h2>
        <p className="text-muted-foreground text-xs">
          Selecione uma ou mais formas de pagamento
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        {restaurant.paymentMethods.map((method) => {
          const isSelected = paymentMethods?.includes(method) || false

          return (
            <Button
              key={method}
              variant={isSelected ? 'default' : 'brand'}
              size="xs"
              onClick={() => handleTogglePaymentMethod(method)}
              className="w-min text-xs font-normal transition-all"
            >
              {PAYMENT_METHODS[method] || method}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
