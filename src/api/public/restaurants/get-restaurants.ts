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

export interface GetRestaurantsResponse {
  restaurants: Restaurant[]
  meta: {
    limit: number
    totalCount: number
  }
}

export interface GetRestaurantsParams {
  segments?: string[]
  deliveryFee?: boolean
  open?: boolean
  city?: string
  limit?: number
}

export async function getRestaurants(params?: GetRestaurantsParams) {
  const response = await api.public.get<GetRestaurantsResponse>(
    '/restaurants',
    {
      params: {
        segments:
          params?.segments && params.segments.length > 0
            ? params.segments.join(',')
            : undefined,
        deliveryFee: params?.deliveryFee,
        open: params?.open,
        city: params?.city,
        limit: params?.limit || 12,
      },
    },
  )

  return response.data
}
