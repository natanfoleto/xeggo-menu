import { api } from '@/lib/axios'

export interface GetCheckoutUrlRequest {
  orderId: string
}

export interface GetCheckoutUrlResponse {
  checkoutUrl: string
}

export async function getCheckoutUrl({ orderId }: GetCheckoutUrlRequest) {
  const response = await api.customer.get<GetCheckoutUrlResponse>(
    `/orders/${orderId}/checkout-url`,
  )

  return response.data.checkoutUrl
}
