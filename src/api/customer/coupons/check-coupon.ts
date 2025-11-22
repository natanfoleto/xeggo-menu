import type { CouponType } from '@/dtos/coupons/coupon-type'
import { api } from '@/lib/axios'

export interface Discount {
  type: CouponType
  value: number
  discountAmount: number
}

export interface CheckCouponRequest {
  restaurantId: string
  code: string
  orderTotal: number
}

export interface CheckCouponResponse {
  discount: Discount
}

export async function checkCoupon({
  restaurantId,
  code,
  orderTotal,
}: CheckCouponRequest) {
  const response = await api.customer.post<CheckCouponResponse>(
    `/coupons/check/${restaurantId}`,
    {
      code,
      orderTotal,
    },
  )

  return response.data.discount
}
