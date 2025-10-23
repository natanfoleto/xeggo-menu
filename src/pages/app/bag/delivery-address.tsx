import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'

export function DeliveryAddress() {
  const { deliveryAddress } = useOrder()

  const handleAddAddress = () => {
    console.log('Adicionar endereço')
  }

  return (
    <div className="space-y-4 border-t p-4">
      <h2 className="text-muted-foreground text-sm">Endereço de entrega</h2>

      {deliveryAddress ? (
        <div className="rounded-lg border p-4">
          <p className="font-medium">
            {deliveryAddress.street}, {deliveryAddress.number}
          </p>

          {deliveryAddress.complement && (
            <p className="text-muted-foreground text-sm">
              {deliveryAddress.complement}
            </p>
          )}

          <p className="text-muted-foreground text-sm">
            {deliveryAddress.neighborhood}, {deliveryAddress.city}/
            {deliveryAddress.state}
          </p>

          <p className="text-muted-foreground text-sm">
            CEP: {deliveryAddress.zipCode}
          </p>

          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={handleAddAddress}
          >
            Alterar endereço
          </Button>
        </div>
      ) : (
        <Button variant="link" className="w-full" onClick={handleAddAddress}>
          Adicionar endereço
        </Button>
      )}
    </div>
  )
}
