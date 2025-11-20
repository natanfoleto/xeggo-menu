import { api } from '@/lib/axios'

export interface GetCustomerOrderDetailsRequest {
  orderId: string
}

export interface CustomerOrderDetails {
  id: string
  createdAt: string
  status:
    | 'pending'
    | 'awaiting_payment'
    | 'payment_failed'
    | 'payment_confirmed'
    | 'processing'
    | 'delivering'
    | 'delivered'
    | 'canceled'
  orderType: 'delivery' | 'pickup'
  totalInCents: number
  deliveryAddress: string | null
  paymentType: string
  paymentMethod: string
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
