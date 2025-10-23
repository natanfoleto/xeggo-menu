import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'

const PAYMENT_METHODS: Record<string, string> = {
  cash: 'Dinheiro',
  creditCard: 'Cartão de Crédito',
  debitCard: 'Cartão de Débito',
  pix: 'PIX',
}

export function PaymentMethod() {
  const { paymentMethod } = useOrder()

  const handleAddPayment = () => {
    console.log('Adicionar forma de pagamento')
  }

  return (
    <div className="space-y-4 border-t p-4">
      <h2 className="text-muted-foreground text-sm">Forma de pagamento</h2>

      {paymentMethod ? (
        <div className="rounded-lg border p-4">
          <p className="font-medium">
            {PAYMENT_METHODS[paymentMethod] || paymentMethod}
          </p>

          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={handleAddPayment}
          >
            Alterar
          </Button>
        </div>
      ) : (
        <Button variant="link" className="w-full" onClick={handleAddPayment}>
          Adicionar forma de pagamento
        </Button>
      )}
    </div>
  )
}
