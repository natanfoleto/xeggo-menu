import { api } from '@/lib/axios'

export interface AuthCheckCustomerResponse {
  authenticated: boolean
}

export async function authCheckCustomer() {
  const response = await api.auth.get<AuthCheckCustomerResponse>(
    '/customers/auth/check',
  )

  return response.data
}
