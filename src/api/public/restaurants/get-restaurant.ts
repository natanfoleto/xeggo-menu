import type { WeekDay } from '@/dtos/opening-hours/week-day'
import type { PaymentType } from '@/dtos/orders/payment-type'
import type { PaymentMethod } from '@/dtos/payment-methods/payment-method'
import type { Segment } from '@/dtos/segments/segment'
import { api } from '@/lib/axios'

export interface Restaurant {
  id: string
  name: string
  description: string | null
  primaryColor: string | null
  slug: string
  avatarUrl: string | null
  minOrderInCents: number | null
  deliveryFeeInCents: number | null
  zipCode: string | null
  street: string | null
  number: string | null
  complement: string | null
  neighborhood: string | null
  city: string | null
  state: string | null
  isOpen: boolean
  openingHours: {
    id: string
    weekDay: WeekDay
    openTime: string
    closeTime: string
  }[]
  segments: Segment[]
  paymentTypes: PaymentType[]
  paymentMethods: PaymentMethod[]
}

export interface GetRestaurantRequest {
  slug: string
}

export interface GetRestaurantResponse {
  restaurant: Restaurant
}

export async function getRestaurant({ slug }: GetRestaurantRequest) {
  const response = await api.public.get<GetRestaurantResponse>(
    `/restaurants/${slug}`,
  )

  return response.data.restaurant
}
