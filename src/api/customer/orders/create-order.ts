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
  orderType: 'delivery' | 'pickup'
  deliveryAddress?: string | null
  paymentMethods: string[]
  changeForInCents?: number | null
  couponCode?: string | null
  observations?: string | null
  items: OrderItem[]
}

export interface CreateOrderResponse {
  orderId: string
}

export async function createOrder({
  restaurantId,
  orderType,
  deliveryAddress,
  paymentMethods,
  changeForInCents,
  couponCode,
  observations,
  items,
}: CreateOrderRequest) {
  const response = await api.customer.post<CreateOrderResponse>(
    `/restaurants/${restaurantId}/orders`,
    {
      orderType,
      deliveryAddress,
      paymentMethods,
      changeForInCents,
      couponCode,
      observations,
      items,
    },
  )

  return response.data
}
