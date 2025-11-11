import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'

export function OrderType() {
  const { orderType, setOrderType } = useOrder()

  return (
    <div className="space-y-2 border-t px-4 py-6">
      <h2 className="text-sm">Tipo do pedido</h2>

      <div className="flex gap-2">
        <Button
          variant={orderType === 'delivery' ? 'default' : 'brand'}
          size="xs"
          className="w-min text-xs font-normal transition-all"
          onClick={() => setOrderType('delivery')}
        >
          Entrega
        </Button>

        <Button
          variant={orderType === 'pickup' ? 'default' : 'brand'}
          size="xs"
          className="w-min text-xs font-normal transition-all"
          onClick={() => setOrderType('pickup')}
        >
          Retirada
        </Button>
      </div>
    </div>
  )
}
