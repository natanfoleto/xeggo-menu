import { api } from '@/lib/axios'

export interface CreateAddressRequest {
  zipCode: string
  street: string
  number: string
  complement?: string | null
  neighborhood: string
  city: string
  state: string
  isActive?: boolean
}

export interface CreateAddressResponse {
  addressId: string
}

export async function createAddress({
  zipCode,
  street,
  number,
  complement,
  neighborhood,
  city,
  state,
  isActive,
}: CreateAddressRequest) {
  const response = await api.customer.post<CreateAddressResponse>(
    '/addresses',
    {
      zipCode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      isActive,
    },
  )

  return response.data
}
