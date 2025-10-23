import { createContext, type ReactNode, useContext, useState } from 'react'

interface BagComplement {
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

interface DeliveryAddress {
  zipCode: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

interface OrderContextData {
  bagItems: BagItem[]
  bagTotal: number
  bagItemsCount: number

  deliveryAddress: DeliveryAddress | null
  paymentMethod: string | null

  addToBag: (item: Omit<BagItem, 'id'>) => void
  removeFromBag: (itemId: string) => void
  updateItemQuantity: (itemId: string, quantity: number) => void
  clearBag: () => void

  setDeliveryAddress: (address: DeliveryAddress) => void
  setPaymentMethod: (method: string) => void
  resetOrder: () => void
}

const OrderContext = createContext<OrderContextData | undefined>(undefined)

interface OrderProviderProps {
  children: ReactNode
}

export function OrderProvider({ children }: OrderProviderProps) {
  const [bagItems, setBagItems] = useState<BagItem[]>([])

  const [deliveryAddress, setDeliveryAddress] =
    useState<DeliveryAddress | null>(null)

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)

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
    setDeliveryAddress(null)
    setPaymentMethod(null)
  }

  return (
    <OrderContext.Provider
      value={{
        bagItems,
        bagTotal,
        bagItemsCount,
        deliveryAddress,
        paymentMethod,
        addToBag,
        removeFromBag,
        updateItemQuantity,
        clearBag,
        setDeliveryAddress,
        setPaymentMethod,
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
