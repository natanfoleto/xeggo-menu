import { api } from '@/lib/axios'

import type { Address } from './get-address'

export interface GetAddressesResponse {
  addresses: Address[]
}

export async function getAddresses() {
  const response = await api.customer.get<GetAddressesResponse>('/addresses')

  return response.data.addresses
}
