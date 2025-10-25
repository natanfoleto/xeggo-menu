import { api } from '@/lib/axios'

export interface CreateCustomerAddressRequest {
  zipCode: string
  street: string
  number: string
  complement?: string | null
  neighborhood: string
  city: string
  state: string
  isActive?: boolean
}

export interface CreateCustomerAddressResponse {
  addressId: string
}

export async function createCustomerAddress(
  data: CreateCustomerAddressRequest,
) {
  const response = await api.auth.post<CreateCustomerAddressResponse>(
    '/addresses/customer',
    data,
  )

  return response.data
}
