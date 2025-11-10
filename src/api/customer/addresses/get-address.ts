import { api } from '@/lib/axios'

export interface GetAddressRequest {
  addressId: string
}

export interface GetAddressResponse {
  id: string
  zipCode: string
  street: string
  number: string
  complement: string | null
  neighborhood: string
  city: string
  state: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export async function getAddress({ addressId }: GetAddressRequest) {
  const response = await api.customer.get<GetAddressResponse>(
    `/addresses/${addressId}`,
  )

  return response.data
}
