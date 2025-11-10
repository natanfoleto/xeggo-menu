import { api } from '@/lib/axios'

export interface GetProfileResponse {
  id: string
  name: string
  email: string
  phone: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await api.customer.get<GetProfileResponse>('/profile')

  return response.data
}
