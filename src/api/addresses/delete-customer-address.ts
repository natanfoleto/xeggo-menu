import { api } from '@/lib/axios'

export interface DeleteCustomerAddressRequest {
  addressId: string
}

export async function deleteCustomerAddress({
  addressId,
}: DeleteCustomerAddressRequest) {
  await api.auth.delete(`/addresses/${addressId}/customer`)
}
