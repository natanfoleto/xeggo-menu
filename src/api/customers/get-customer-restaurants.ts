import { api } from '@/lib/axios'

export interface GetCustomerRestaurantsResponse {
  restaurants: {
    id: string
    name: string
    slug: string
  }[]
}

export async function getCustomerRestaurants() {
  const response = await api.auth.get<GetCustomerRestaurantsResponse>(
    '/customers/restaurants',
  )

  return response.data
}
