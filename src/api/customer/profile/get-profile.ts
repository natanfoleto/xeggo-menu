import { api } from '@/lib/axios'

export interface Profile {
  id: string
  name: string
  email: string
  cpf: string | null
  phone: string | null
  createdAt: Date
  updatedAt: Date
}

export interface GetProfileResponse {
  profile: Profile
}

export async function getProfile() {
  const response = await api.customer.get<GetProfileResponse>('/profile')

  return response.data.profile
}
