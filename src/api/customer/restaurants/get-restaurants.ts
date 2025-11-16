import { api } from '@/lib/axios'

export interface GetRestaurantsResponse {
  restaurants: {
    id: string
    name: string
    slug: string
  }[]
}

export async function getRestaurants() {
  const response =
    await api.customer.get<GetRestaurantsResponse>('/restaurants')

  return response.data.restaurants
}
