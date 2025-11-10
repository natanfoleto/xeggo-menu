import { api } from '@/lib/axios'

export interface SetActiveAddressRequest {
  addressId: string
}

export async function setActiveAddress({ addressId }: SetActiveAddressRequest) {
  await api.customer.patch(`/addresses/${addressId}/active`)
}
