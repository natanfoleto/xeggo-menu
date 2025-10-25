import { api } from '@/lib/axios'

export interface CustomerAddress {
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

export interface GetCustomerAddressesResponse {
  addresses: CustomerAddress[]
}

export async function getCustomerAddresses() {
  const response = await api.auth.get<GetCustomerAddressesResponse>(
    '/addresses/customer',
  )

  return response.data
}
