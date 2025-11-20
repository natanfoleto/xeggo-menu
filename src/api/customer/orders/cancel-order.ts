import { api } from '@/lib/axios'

export interface CancelOrderRequest {
  orderId: string
  reason?: string
}

export interface CancelOrderResponse {
  message: string
}

export async function cancelOrder({ orderId, reason }: CancelOrderRequest) {
  const response = await api.customer.patch<CancelOrderResponse>(
    `/orders/${orderId}/cancel`,
    { reason },
  )

  return response.data.message
}
