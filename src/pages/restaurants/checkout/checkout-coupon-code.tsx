import { useQuery } from '@tanstack/react-query'
import { Ticket } from 'lucide-react'

import { checkCoupon } from '@/api/customer/coupons/check-coupon'
import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { useOrder } from '@/contexts/order-context'
import { useRestaurant } from '@/contexts/restaurant-context'
import { formatCurrency } from '@/utils/format-currency'

export function CheckoutCouponCode() {
  const { restaurant } = useRestaurant()
  const { couponCode, bagSubtotal } = useOrder()

  const { data: discount } = useQuery({
    queryKey: ['check-coupon', couponCode],
    queryFn: () =>
      checkCoupon({
        restaurantId: restaurant!.id,
        code: couponCode!,
        orderTotal: bagSubtotal,
      }),
    enabled: !!couponCode && !!restaurant?.id,
  })

  if (!couponCode || !discount) return null

  return (
    <div className="space-y-2 border-t py-4">
      <h2 className="text-muted-foreground text-sm">Cupom de desconto</h2>

      {discount && (
        <div className="bg-muted flex items-center justify-between rounded-md px-4 py-2">
          <div className="flex items-center gap-3">
            <Ticket className="text-muted-foreground size-5" />

            <div className="flex flex-col text-xs">
              <span className="font-medium">
                {discount.type === 'percentage'
                  ? `Cupom de ${discount.value}%`
                  : `Cupom de ${formatCurrency(discount.value / 100)}`}
              </span>

              <span className="text-green-600">Cupom aplicado</span>
            </div>
          </div>

          <NavLink to="/bag">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 text-xs font-normal"
            >
              Trocar
            </Button>
          </NavLink>
        </div>
      )}
    </div>
  )
}
