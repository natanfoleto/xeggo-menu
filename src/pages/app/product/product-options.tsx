import { Minus, Plus } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { formatCurrency } from '@/utils/format-currency'

interface ProductOptionsProps {
  complementGroups: {
    id: string
    name: string
    mandatory: boolean
    min: number
    max: number
    complements: {
      id: string
      name: string
      priceInCents: number | null
      description: string | null
    }[]
  }[]
  selectedComplements: Record<string, number>
  observations: string
  onComplementChange: (complementId: string, quantity: number) => void
  onObservationsChange: (value: string) => void
}

export function ProductOptions({
  complementGroups,
  selectedComplements,
  observations,
  onComplementChange,
  onObservationsChange,
}: ProductOptionsProps) {
  const getGroupSelectedCount = (
    complements: {
      id: string
      name: string
      priceInCents: number | null
      description: string | null
    }[],
  ) => {
    return complements.reduce((sum, complement) => {
      return sum + (selectedComplements[complement.id] || 0)
    }, 0)
  }

  return (
    <div className="bg-muted pb-24">
      {complementGroups.length > 0 && (
        <div className="bg-background divide-y">
          {complementGroups.map((group) => {
            const selectedCount = getGroupSelectedCount(group.complements)

            return (
              <div key={group.id}>
                <div className="bg-muted flex items-center justify-between p-4">
                  <div className="space-y-0.5">
                    <h2 className="font-semibold">{group.name}</h2>

                    <p className="text-muted-foreground text-xs">
                      <b>{selectedCount}</b> de <b>{group.max}</b>
                    </p>
                  </div>

                  {group.mandatory && (
                    <Badge variant="default" className="text-xs">
                      OBRIGATÓRIO
                    </Badge>
                  )}
                </div>

                <div>
                  {group.complements.map((complement) => {
                    const quantity = selectedComplements[complement.id] || 0
                    const canAdd = selectedCount < group.max

                    return (
                      <div
                        key={complement.id}
                        className="flex items-center justify-between border-b p-4 last:border-0"
                      >
                        <div className="flex-1">
                          <p>{complement.name}</p>

                          {complement.description && (
                            <p className="text-muted-foreground text-xs">
                              {complement.description}
                            </p>
                          )}

                          {complement.priceInCents &&
                            complement.priceInCents > 0 && (
                              <p className="text-muted-foreground text-sm">
                                +{' '}
                                {formatCurrency(complement.priceInCents / 100)}
                              </p>
                            )}
                        </div>

                        {quantity === 0 ? (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-10"
                            onClick={() => onComplementChange(complement.id, 1)}
                            disabled={!canAdd}
                          >
                            <Plus className="size-4" />
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-10"
                              onClick={() =>
                                onComplementChange(complement.id, quantity - 1)
                              }
                            >
                              <Minus className="size-4" />
                            </Button>

                            <span className="text-sm">{quantity}</span>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="size-10"
                              onClick={() =>
                                onComplementChange(complement.id, quantity + 1)
                              }
                              disabled={!canAdd}
                            >
                              <Plus className="size-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="bg-muted space-y-2 border-t px-4 py-8">
        <Label htmlFor="observations" className="text-md font-normal">
          Observações
        </Label>

        <Textarea
          id="observations"
          placeholder="Sem cebola, ponto da carne, etc..."
          value={observations}
          onChange={(e) => onObservationsChange(e.target.value)}
          rows={4}
          maxLength={180}
          className="bg-background h-24 text-sm"
        />
      </div>
    </div>
  )
}
