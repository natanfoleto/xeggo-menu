import { api } from '@/lib/axios'

export interface UpdateCustomerProfileRequest {
  name: string
  phone: string | null
}

export async function updateCustomerProfile({
  name,
  phone,
}: UpdateCustomerProfileRequest) {
  await api.auth.put('/customers/profile', {
    name,
    phone,
  })
}
