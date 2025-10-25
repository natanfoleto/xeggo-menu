import { api } from '@/lib/axios'

export interface GetCustomerProfileResponse {
  id: string
  name: string
  email: string
  phone: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getCustomerProfile() {
  const response =
    await api.auth.get<GetCustomerProfileResponse>('/profile/customer')

  return response.data
}
