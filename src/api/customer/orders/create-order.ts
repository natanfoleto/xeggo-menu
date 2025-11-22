import type { OrderType } from '@/dtos/orders/order-type'
import { api } from '@/lib/axios'

export interface OrderItemComplement {
  complementId: string
  quantity: number
}

export interface OrderItem {
  productId: string
  quantity: number
  observations?: string
  complements?: OrderItemComplement[]
}

export interface CreateOrderRequest {
  restaurantId: string
  customerCpf?: string | null
  customerPhone?: string | null
  orderType: OrderType
  deliveryAddress?: string | null
  paymentType: string
  paymentMethod: string
  changeForInCents?: number | null
  couponCode?: string | null
  observations?: string | null
  items: OrderItem[]
}

export interface CreateOrderResponse {
  orderId: string
  checkoutUrl?: string
}

export async function createOrder({
  restaurantId,
  customerCpf,
  customerPhone,
  orderType,
  deliveryAddress,
  paymentType,
  paymentMethod,
  changeForInCents,
  couponCode,
  observations,
  items,
}: CreateOrderRequest) {
  const response = await api.customer.post<CreateOrderResponse>(
    `/restaurants/${restaurantId}/orders`,
    {
      customerCpf,
      customerPhone,
      orderType,
      deliveryAddress,
      paymentType,
      paymentMethod,
      changeForInCents,
      couponCode,
      observations,
      items,
    },
  )

  return response.data
}
