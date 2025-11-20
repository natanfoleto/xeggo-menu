// src/components/change-for.tsx
import { useState } from 'react'
import { toast } from 'sonner'

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
  const { paymentMethod, changeForInCents, setChangeForInCents, bagTotal } =
    useOrder()

  const [inputValue, setInputValue] = useState(changeForInCents ?? 0)
  const [open, setOpen] = useState(false)

  const isCashPayment = paymentMethod === 'cash'

  if (!isCashPayment) return null

  const handleConfirm = () => {
    if (bagTotal >= inputValue) {
      return toast.warning('Troco precisa ser maior que o valor total')
    }

    setChangeForInCents(inputValue)
    setOpen(false)
  }

  const handleClear = () => {
    setInputValue(0)
    setChangeForInCents(null)
    setOpen(false)
  }

  return (
    <div className="space-y-2 border-t px-4 py-6">
      <div>
        <h2 className="text-sm">Troco para</h2>
        <p className="text-muted-foreground text-xs">
          Informe o valor da nota/dinheiro que você vai entregar
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={changeForInCents ? 'default' : 'brand'}
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

          <DialogFooter className="gap-2">
            {changeForInCents !== null && (
              <Button variant="outline" onClick={handleClear}>
                Limpar
              </Button>
            )}
            <Button onClick={handleConfirm}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
