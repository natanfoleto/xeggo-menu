import { createContext, type ReactNode, useContext } from 'react'

import type { OrderType } from '@/dtos/orders/order-type'
import type { PaymentType } from '@/dtos/orders/payment-type'
import type { PaymentMethod } from '@/dtos/payment-methods/payment-method'
import { useStorage } from '@/hooks/use-storage'
import { compareEqualItems } from '@/utils/compare-equal-items'

import { useRestaurant } from './restaurant-context'

export interface BagComplement {
  id: string
  name: string
  quantity: number
  priceInCents: number
}

export interface BagItem {
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
  bagSubtotal: number
  bagTotal: number
  bagItemsCount: number
  orderType: OrderType
  paymentType: PaymentType | null
  paymentMethod: PaymentMethod | null
  changeForInCents: number | null
  deliveryFeeInCents: number | null
  discountInCents: number | null
  couponCode: string | null
  observations: string | null
  addToBag: (item: Omit<BagItem, 'id'>) => void
  removeFromBag: (itemId: string) => void
  updateItemQuantity: (itemId: string, quantity: number) => void
  clearBag: () => void
  setOrderType: (type: OrderType) => void
  setPaymentType: (type: PaymentType) => void
  setPaymentMethod: (method: PaymentMethod | null) => void
  setChangeForInCents: (value: number | null) => void
  setDiscountInCents: (value: number | null) => void
  setCouponCode: (code: string | null) => void
  setObservations: (obs: string | null) => void
  resetOrder: () => void
}

const OrderContext = createContext<OrderContextData | undefined>(undefined)

interface OrderProviderProps {
  children: ReactNode
}

export function OrderProvider({ children }: OrderProviderProps) {
  const { restaurant } = useRestaurant()

  const [bagItems, setBagItems] = useStorage<BagItem[]>('bag-items', [])

  const [orderType, setOrderType] = useStorage<OrderType>(
    'order-type',
    'delivery',
  )

  const [paymentType, setPaymentType] = useStorage<PaymentType | null>(
    'payment-type',
    null,
  )

  const [paymentMethod, setPaymentMethod] = useStorage<PaymentMethod | null>(
    'payment-method',
    null,
  )

  const [changeForInCents, setChangeForInCents] = useStorage<number | null>(
    'change-for-in-cents',
    null,
  )

  const [discountInCents, setDiscountInCents] = useStorage<number | null>(
    'discount-in-cents',
    null,
  )

  const [couponCode, setCouponCode] = useStorage<string | null>(
    'coupon-code',
    null,
  )

  const [observations, setObservations] = useStorage<string | null>(
    'observations',
    null,
  )

  const deliveryFeeInCents = restaurant?.deliveryFeeInCents ?? 0

  const bagSubtotal = bagItems.reduce((total, item) => {
    const itemTotal = item.priceInCents * item.quantity

    const complementsTotal = item.complements.reduce(
      (sum, comp) => sum + comp.priceInCents * comp.quantity,
      0,
    )

    return total + itemTotal + complementsTotal * item.quantity
  }, 0)

  const bagTotal =
    bagItems.reduce((total, item) => {
      const itemTotal = item.priceInCents * item.quantity

      const complementsTotal = item.complements.reduce(
        (sum, comp) => sum + comp.priceInCents * comp.quantity,
        0,
      )
      return total + itemTotal + complementsTotal * item.quantity
    }, 0) +
    (deliveryFeeInCents || 0) -
    (discountInCents || 0)

  const bagItemsCount = bagItems.reduce(
    (count, item) => count + item.quantity,
    0,
  )

  const addToBag = (item: Omit<BagItem, 'id'>) => {
    setBagItems((prev) => {
      const existingItemIndex = prev.findIndex((bagItem) =>
        compareEqualItems(item, bagItem),
      )

      if (existingItemIndex !== -1) {
        const updatedItems = [...prev]

        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity,
        }

        return updatedItems
      }

      const newItem: BagItem = {
        ...item,
        id: `${item.productId}-${Date.now()}-${Math.random()}`,
      }

      return [...prev, newItem]
    })
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
    setOrderType('delivery')
    setPaymentMethod(null)
    setChangeForInCents(null)
    setDiscountInCents(null)
    setCouponCode(null)
    setObservations(null)
  }

  return (
    <OrderContext.Provider
      value={{
        bagItems,
        bagSubtotal,
        bagTotal,
        bagItemsCount,
        orderType,
        paymentType,
        paymentMethod,
        changeForInCents,
        deliveryFeeInCents,
        discountInCents,
        couponCode,
        observations,
        addToBag,
        removeFromBag,
        updateItemQuantity,
        clearBag,
        setOrderType,
        setPaymentType,
        setPaymentMethod,
        setChangeForInCents,
        setDiscountInCents,
        setCouponCode,
        setObservations,
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
