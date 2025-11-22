import type { OrderStatus } from '@/dtos/orders/order-status'
import type { OrderType } from '@/dtos/orders/order-type'
import type { PaymentType } from '@/dtos/orders/payment-type'
import type { PaymentMethod } from '@/dtos/payment-methods/payment-method'
import { api } from '@/lib/axios'

export interface GetCustomerOrderDetailsRequest {
  orderId: string
}

export interface CustomerOrderDetails {
  id: string
  createdAt: string
  status: OrderStatus
  orderType: OrderType
  totalInCents: number
  deliveryAddress: string | null
  paymentType: PaymentType
  paymentMethod: PaymentMethod
  changeForInCents: number | null
  deliveryFeeInCents: number | null
  discountInCents: number | null
  couponCode: string | null
  observations: string | null
  estimatedDeliveryTime: number | null
  cancellationReason: string | null
  paidAt: string | null
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    observations: string | null
    product: {
      name: string
    } | null
    selectedComplements: {
      id: string
      quantity: number
      priceInCents: number
      complement: {
        name: string
      }
    }[]
  }[]
}

export interface GetCustomerOrderDetailsResponse {
  order: CustomerOrderDetails
}

export async function getCustomerOrderDetails({
  orderId,
}: GetCustomerOrderDetailsRequest) {
  const response = await api.customer.get<GetCustomerOrderDetailsResponse>(
    `/orders/${orderId}`,
  )

  return response.data.order
}
