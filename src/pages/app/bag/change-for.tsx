import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

import { FormPriceInput } from '@/components/form/form-price-input'
import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'

export function ChangeFor() {
  const { paymentMethods, changeForInCents, setChangeForInCents } = useOrder()

  const [inputValue, setInputValue] = useState(changeForInCents ?? 0)

  const hasCashPayment = paymentMethods.includes('cash')

  if (!hasCashPayment) return null

  return (
    <div className="space-y-2 border-t p-4">
      <div>
        <h2 className="text-sm">Troco para</h2>

        <p className="text-muted-foreground text-xs">
          Caso não precise de troco, deixe o campo zerado
        </p>
      </div>

      <div className="flex items-center gap-1">
        <FormPriceInput
          value={changeForInCents || inputValue}
          onChange={setInputValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setChangeForInCents(inputValue)
          }}
          className="text-xs"
        />

        <Button
          size="icon"
          onClick={() => setChangeForInCents(inputValue)}
          disabled={changeForInCents === inputValue}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}
