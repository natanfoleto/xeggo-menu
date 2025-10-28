import { api } from '@/lib/axios'

export interface CheckCouponRequest {
  restaurantId: string
  code: string
  orderTotal: number
}

export interface CheckCouponResponse {
  discount: {
    type: 'percentage' | 'fixed'
    value: number
    discountAmount: number
  }
}

export async function checkCoupon({
  restaurantId,
  code,
  orderTotal,
}: CheckCouponRequest) {
  const response = await api.auth.post<CheckCouponResponse>(
    `/coupons/check/${restaurantId}`,
    {
      code,
      orderTotal,
    },
  )

  return response.data
}
