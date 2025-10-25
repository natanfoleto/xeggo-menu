import { api } from '@/lib/axios'

export interface AuthCheckCustomerResponse {
  authenticated: boolean
}

export async function authCheckCustomer() {
  const response = await api.auth.get<AuthCheckCustomerResponse>(
    '/auth/check/customer',
  )

  return response.data
}
