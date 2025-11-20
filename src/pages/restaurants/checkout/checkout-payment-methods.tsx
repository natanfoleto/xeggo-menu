import { NavLink } from '@/components/nav-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'

const PAYMENT_TYPES: Record<string, string> = {
  online: 'Pagamento online',
  onDelivery: 'Pagamento na entrega/retirada',
}

const PAYMENT_METHODS: Record<string, string> = {
  cash: 'Dinheiro',
  creditCard: 'Cartão de Crédito',
  debitCard: 'Cartão de Débito',
  pix: 'PIX',
}

export function CheckoutPaymentMethods() {
  const { paymentType, paymentMethod } = useOrder()

  return (
    <div className="flex items-center justify-between border-t py-4">
      <div className="space-y-2">
        {paymentType ? (
          <h2 className="text-muted-foreground text-sm">
            Forma de pagamento — {PAYMENT_TYPES[paymentType] || paymentType}
          </h2>
        ) : (
          <h2 className="text-muted-foreground text-sm">Forma de pagamento</h2>
        )}

        {paymentMethod ? (
          <Badge
            variant="outline"
            className="not-dark:border-muted-foreground font-normal"
          >
            {PAYMENT_METHODS[paymentMethod] || paymentMethod}
          </Badge>
        ) : (
          <p className="text-muted-foreground text-xs">
            Nenhuma forma de pagamento selecionada
          </p>
        )}
      </div>

      <NavLink to="/bag">
        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
          Alterar
        </Button>
      </NavLink>
    </div>
  )
}
