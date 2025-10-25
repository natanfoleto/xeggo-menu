import { http, HttpResponse } from 'msw'

import type { GetCustomerProfileResponse } from '../customers/get-customer-profile'

export const getCustomerProfileMock = http.get<
  never,
  never,
  GetCustomerProfileResponse
>('/me', async () => {
  return HttpResponse.json({
    id: 'custom-user-id',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '47828376473',
    role: 'manager',
    createdAt: new Date(),
    updatedAt: null,
  })
})
