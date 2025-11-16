import { api } from '@/lib/axios'

export interface UpdateAddressRequest {
  addressId: string
  zipCode?: string
  street?: string
  number?: string
  complement?: string | null
  neighborhood?: string
  city?: string
  state?: string
}

export async function updateAddress({
  addressId,
  zipCode,
  street,
  number,
  complement,
  neighborhood,
  city,
  state,
}: UpdateAddressRequest) {
  await api.customer.put(`/addresses/${addressId}`, {
    zipCode,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
  })
}
