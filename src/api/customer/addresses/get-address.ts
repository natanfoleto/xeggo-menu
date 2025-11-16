import { api } from '@/lib/axios'

export interface Address {
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

export interface GetAddressRequest {
  addressId: string
}

export interface GetAddressResponse {
  address: Address
}

export async function getAddress({ addressId }: GetAddressRequest) {
  const response = await api.customer.get<GetAddressResponse>(
    `/addresses/${addressId}`,
  )

  return response.data.address
}
