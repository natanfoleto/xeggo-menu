import { api } from '@/lib/axios'

export interface GetCustomerOrdersQuery {
  limit?: number
  restaurantId?: string
  status?: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  date?: Date
}

export interface GetCustomerOrdersResponse {
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
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  }[]
  meta: {
    limit: number
    totalCount: number
  }
}

export async function getCustomerOrders({
  limit,
  restaurantId,
  status,
  date,
}: GetCustomerOrdersQuery) {
  const response = await api.auth.get<GetCustomerOrdersResponse>(
    '/customers/orders',
    {
      params: {
        limit,
        restaurantId,
        status,
        date: date?.toISOString(),
      },
    },
  )

  return response.data
}
