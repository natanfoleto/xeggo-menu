import { useState } from 'react'

import { FormPriceInput } from '@/components/form/form-price-input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useOrder } from '@/contexts/order-context'
import { formatCurrency } from '@/utils/format-currency'

export function ChangeFor() {
  const { paymentMethods, changeForInCents, setChangeForInCents } = useOrder()

  const [inputValue, setInputValue] = useState(changeForInCents ?? 0)
  const [open, setOpen] = useState(false)

  const hasCashPayment = paymentMethods.includes('cash')

  if (!hasCashPayment) return null

  const handleConfirm = () => {
    setChangeForInCents(inputValue)
    setOpen(false)
  }

  return (
    <div className="space-y-2 border-t p-4">
      <div>
        <h2 className="text-sm">Troco para</h2>
        <p className="text-muted-foreground text-xs">
          Informe o valor da nota/dinheiro que você vai entregar
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={changeForInCents ? 'default' : 'outline'}
            size="sm"
            className="text-xs font-normal"
          >
            {changeForInCents && changeForInCents > 0
              ? `${formatCurrency(changeForInCents / 100)}`
              : 'Configurar troco'}
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Troco para quanto?</DialogTitle>
            <DialogDescription>
              Caso não precise de troco, deixe o campo zerado
            </DialogDescription>
          </DialogHeader>

          <FormPriceInput
            value={inputValue}
            onChange={setInputValue}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleConfirm()
            }}
            className="text-sm"
          />

          <DialogFooter>
            <Button onClick={handleConfirm}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
