import { api } from '@/lib/axios'

export interface GetOrdersRequest {
  limit?: number
  restaurantId?: string
  status?:
    | 'awaiting_payment'
    | 'payment_failed'
    | 'payment_confirmed'
    | 'payment_overdue'
    | 'payment_refunded'
    | 'chargeback_requested'
    | 'pending'
    | 'processing'
    | 'delivering'
    | 'delivered'
    | 'canceled'
  date?: Date
}

export interface GetOrdersResponse {
  orders: {
    orderId: string
    createdAt: string
    restaurant: {
      name: string
      slug: string
      avatarUrl: string | null
    }
    products: {
      name: string
      quantity: number
    }[]
    totalItemsQuantity: number
    total: number
    status:
      | 'awaiting_payment'
      | 'payment_failed'
      | 'payment_confirmed'
      | 'payment_overdue'
      | 'payment_refunded'
      | 'chargeback_requested'
      | 'pending'
      | 'processing'
      | 'delivering'
      | 'delivered'
      | 'canceled'
  }[]
  meta: {
    limit: number
    totalCount: number
  }
}

export async function getOrders({
  limit,
  restaurantId,
  status,
  date,
}: GetOrdersRequest) {
  const response = await api.customer.get<GetOrdersResponse>('/orders', {
    params: {
      limit,
      restaurantId,
      status,
      date: date?.toISOString(),
    },
  })

  return response.data
}
