import { api } from '@/lib/axios'

export interface UpdateProfileRequest {
  name: string
  cpf: string | null
  phone: string | null
}

export async function updateProfile({
  name,
  cpf,
  phone,
}: UpdateProfileRequest) {
  await api.customer.put('/profile', {
    name,
    cpf,
    phone,
  })
}
