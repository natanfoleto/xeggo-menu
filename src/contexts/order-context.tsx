import { createContext, type ReactNode, useContext } from 'react'

import { useStorage } from '@/hooks/use-storage'

export interface BagComplement {
  id: string
  name: string
  quantity: number
  priceInCents: number
}

interface BagItem {
  id: string
  productId: string
  productName: string
  productPhotoUrl: string | null
  quantity: number
  priceInCents: number
  observations: string
  complements: BagComplement[]
}

interface OrderContextData {
  bagItems: BagItem[]
  bagTotal: number
  bagItemsCount: number
  paymentMethods: string[]
  addToBag: (item: Omit<BagItem, 'id'>) => void
  removeFromBag: (itemId: string) => void
  updateItemQuantity: (itemId: string, quantity: number) => void
  clearBag: () => void
  setPaymentMethods: (methods: string[]) => void
  resetOrder: () => void
}

const OrderContext = createContext<OrderContextData | undefined>(undefined)

interface OrderProviderProps {
  children: ReactNode
}

export function OrderProvider({ children }: OrderProviderProps) {
  const [bagItems, setBagItems] = useStorage<BagItem[]>('bag-items', [])
  const [paymentMethods, setPaymentMethods] = useStorage<string[]>(
    'payment-methods',
    [],
  )

  const bagTotal = bagItems.reduce((total, item) => {
    const itemTotal = item.priceInCents * item.quantity
    const complementsTotal = item.complements.reduce(
      (sum, comp) => sum + comp.priceInCents * comp.quantity,
      0,
    )
    return total + itemTotal + complementsTotal * item.quantity
  }, 0)

  const bagItemsCount = bagItems.reduce(
    (count, item) => count + item.quantity,
    0,
  )

  const addToBag = (item: Omit<BagItem, 'id'>) => {
    const newItem: BagItem = {
      ...item,
      id: `${item.productId}-${Date.now()}-${Math.random()}`,
    }

    setBagItems((prev) => [...prev, newItem])
  }

  const removeFromBag = (itemId: string) => {
    setBagItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBag(itemId)
      return
    }

    setBagItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
    )
  }

  const clearBag = () => {
    setBagItems([])
  }

  const resetOrder = () => {
    clearBag()
    setPaymentMethods([])
  }

  return (
    <OrderContext.Provider
      value={{
        bagItems,
        bagTotal,
        bagItemsCount,
        paymentMethods,
        addToBag,
        removeFromBag,
        updateItemQuantity,
        clearBag,
        setPaymentMethods,
        resetOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)

  if (!context) {
    throw new Error('useOrder must be used within OrderProvider')
  }

  return context
}
