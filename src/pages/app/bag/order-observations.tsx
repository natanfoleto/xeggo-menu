import { Textarea } from '@/components/ui/textarea'
import { useOrder } from '@/contexts/order-context'

export function OrderObservations() {
  const { observations, setObservations } = useOrder()

  return (
    <div className="space-y-2 border-t p-4">
      <h2 className="text-sm">Observações</h2>

      <Textarea
        placeholder="Não tocar a campainha, deixar com o porteiro..."
        value={observations ?? ''}
        onChange={(e) => setObservations(e.target.value)}
        className="min-h-20 resize-none text-xs"
        maxLength={500}
      />
    </div>
  )
}
