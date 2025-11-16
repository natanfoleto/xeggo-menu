import { api } from '@/lib/axios'

export interface Restaurant {
  id: string
  name: string
  slug: string
  avatarUrl: string | null
  deliveryFeeInCents: number | null
  city: string | null
  isOpen: boolean
  segments: string[]
}

export interface GetRestaurantsRequest {
  segments?: string[]
  deliveryFee?: boolean
  open?: boolean
  city?: string
  limit?: number
}

export interface GetRestaurantsResponse {
  restaurants: Restaurant[]
  meta: {
    limit: number
    totalCount: number
  }
}

export async function getRestaurants({
  segments,
  deliveryFee,
  open,
  city,
  limit = 12,
}: GetRestaurantsRequest = {}) {
  const response = await api.public.get<GetRestaurantsResponse>(
    '/restaurants',
    {
      params: {
        segments:
          segments && segments.length > 0 ? segments.join(',') : undefined,
        deliveryFee,
        open,
        city,
        limit,
      },
    },
  )

  return response.data
}
