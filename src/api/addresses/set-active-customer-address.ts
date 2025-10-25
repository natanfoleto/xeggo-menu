import { api } from '@/lib/axios'

export interface SetActiveCustomerAddressRequest {
  addressId: string
}

export async function setActiveCustomerAddress({
  addressId,
}: SetActiveCustomerAddressRequest) {
  await api.auth.patch(`/addresses/${addressId}/customer/active`)
}
