import { api } from '@/lib/axios'

export interface GetCustomerAddressRequest {
  addressId: string
}

export interface GetCustomerAddressResponse {
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

export async function getCustomerAddress({
  addressId,
}: GetCustomerAddressRequest) {
  const response = await api.auth.get<GetCustomerAddressResponse>(
    `/addresses/${addressId}/customer`,
  )

  return response.data
}
