import { api } from '@/lib/axios'

export interface UpdateCustomerAddressRequest {
  addressId: string
  zipCode?: string
  street?: string
  number?: string
  complement?: string | null
  neighborhood?: string
  city?: string
  state?: string
}

export async function updateCustomerAddress({
  addressId,
  ...data
}: UpdateCustomerAddressRequest) {
  await api.auth.put(`/addresses/${addressId}/customer`, data)
}
