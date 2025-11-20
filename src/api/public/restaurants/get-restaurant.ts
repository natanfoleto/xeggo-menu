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
  createdAt: string
  updatedAt: string
  openingHours: {
    id: string
    weekDay:
      | 'sunday'
      | 'monday'
      | 'tuesday'
      | 'wednesday'
      | 'thursday'
      | 'friday'
      | 'saturday'
    openTime: string
    closeTime: string
  }[]
  segments: (
    | 'restaurant'
    | 'bakery'
    | 'snackBar'
    | 'pizzeria'
    | 'iceCreamShop'
    | 'coffee'
    | 'fastFood'
    | 'barbecue'
    | 'japanese'
    | 'brazilian'
    | 'italian'
    | 'chinese'
    | 'mexican'
    | 'arabic'
    | 'bar'
  )[]
  paymentTypes: ('online' | 'onDelivery')[]
  paymentMethods: ('cash' | 'creditCard' | 'debitCard' | 'pix')[]
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
