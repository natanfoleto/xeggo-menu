import { NavLink } from '@/components/nav-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'

const PAYMENT_METHODS: Record<string, string> = {
  cash: 'Dinheiro',
  creditCard: 'Cartão de Crédito',
  debitCard: 'Cartão de Débito',
  pix: 'PIX',
  voucher: 'Voucher',
  bankTransfer: 'Transferência Bancária',
}

export function CheckoutPaymentMethods() {
  const { paymentMethods } = useOrder()

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-muted-foreground text-sm">Formas de pagamento</h2>

        <NavLink to="/bag">
          <Button variant="link" size="sm" className="h-auto p-0 text-xs">
            Alterar
          </Button>
        </NavLink>
      </div>

      {paymentMethods.length > 0 ? (
        <div className="space-x-2">
          {paymentMethods.map((method) => (
            <Badge
              key={method}
              variant="outline"
              className="border-muted-foreground font-normal"
            >
              {PAYMENT_METHODS[method] || method}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-xs">
          Nenhuma forma de pagamento selecionada
        </p>
      )}
    </div>
  )
}
