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
  deliveryAddress: string
  paymentMethods: string[]
  items: OrderItem[]
}

export interface CreateOrderResponse {
  orderId: string
}

export async function createOrder({
  restaurantId,
  deliveryAddress,
  paymentMethods,
  items,
}: CreateOrderRequest) {
  const response = await api.auth.post<CreateOrderResponse>(
    `/restaurants/${restaurantId}/orders`,
    {
      deliveryAddress,
      paymentMethods,
      items,
    },
  )

  return response.data
}
