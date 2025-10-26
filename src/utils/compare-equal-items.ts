import type { BagComplement, BagItem } from '@/contexts/order-context'

export function compareEqualComplements(
  complements1: BagComplement[],
  complements2: BagComplement[],
): boolean {
  if (complements1.length !== complements2.length) return false

  const sorted1 = [...complements1].sort((a, b) => a.id.localeCompare(b.id))
  const sorted2 = [...complements2].sort((a, b) => a.id.localeCompare(b.id))

  return sorted1.every((comp1, index) => {
    const comp2 = sorted2[index]
    return (
      comp1.id === comp2.id &&
      comp1.quantity === comp2.quantity &&
      comp1.priceInCents === comp2.priceInCents
    )
  })
}

export function compareEqualItems(
  item1: Omit<BagItem, 'id'>,
  item2: BagItem,
): boolean {
  return (
    item1.productId === item2.productId &&
    item1.observations === item2.observations &&
    item1.priceInCents === item2.priceInCents &&
    compareEqualComplements(item1.complements, item2.complements)
  )
}
