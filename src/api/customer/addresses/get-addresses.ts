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

export interface GetAddressesResponse {
  addresses: Address[]
}

export async function getAddresses() {
  const response = await api.customer.get<GetAddressesResponse>('/addresses')

  return response.data
}
