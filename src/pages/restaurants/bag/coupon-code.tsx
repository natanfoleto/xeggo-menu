import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Loader2, Ticket } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { checkCoupon } from '@/api/coupons/check-coupon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useOrder } from '@/contexts/order-context'
import { useRestaurant } from '@/contexts/restaurant-context'
import { formatCurrency } from '@/utils/format-currency'

export function CouponCode() {
  const { restaurant } = useRestaurant()

  const { bagSubtotal, couponCode, setCouponCode, setDiscountInCents } =
    useOrder()

  const [inputValue, setInputValue] = useState('')

  const [couponDetails, setCouponDetails] = useState<{
    type: 'percentage' | 'fixed'
    value: number
    discountAmount: number
  } | null>(null)

  const { mutateAsync: checkCouponFn, isPending } = useMutation({
    mutationFn: checkCoupon,
    onError: () => handleRemoveCoupon(),
  })

  const handleRemoveCoupon = useCallback(() => {
    setInputValue('')
    setCouponCode(null)
    setDiscountInCents(null)
  }, [setCouponCode, setDiscountInCents])

  const handleApplyCoupon = async () => {
    if (!inputValue) return
    if (!restaurant?.id) return

    const data = await checkCouponFn({
      restaurantId: restaurant.id,
      code: inputValue,
      orderTotal: bagSubtotal,
    })

    if (data.discount) {
      setCouponCode(inputValue)
      setDiscountInCents(data.discount.discountAmount)
      setCouponDetails({
        type: data.discount.type,
        value: data.discount.value,
        discountAmount: data.discount.discountAmount,
      })
    }
  }

  useEffect(() => {
    const validateSavedCoupon = async () => {
      if (!couponCode || !restaurant?.id) return

      const data = await checkCouponFn({
        restaurantId: restaurant.id,
        code: couponCode,
        orderTotal: bagSubtotal,
      })

      if (!data.discount) {
        handleRemoveCoupon()
      } else {
        setDiscountInCents(data.discount.discountAmount)
        setCouponDetails({
          type: data.discount.type,
          value: data.discount.value,
          discountAmount: data.discount.discountAmount,
        })
      }
    }

    validateSavedCoupon()
  }, [
    inputValue,
    setDiscountInCents,
    bagSubtotal,
    couponCode,
    restaurant?.id,
    checkCouponFn,
    setCouponCode,
    handleRemoveCoupon,
  ])

  return (
    <div className="space-y-2 border-t p-4">
      <h2 className="text-sm">Cupom de desconto</h2>

      {couponCode && couponDetails ? (
        <div className="bg-muted flex items-center justify-between rounded-md px-4 py-2">
          <div className="flex items-center gap-3">
            <Ticket className="text-muted-foreground size-5" />

            <div className="flex flex-col text-xs">
              <span className="font-medium">
                {couponDetails.type === 'percentage'
                  ? `Cupom de ${couponDetails.value}%`
                  : `Cupom de ${formatCurrency(couponDetails.value / 100)}`}
              </span>

              <span className="text-green-600">Cupom aplicado</span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="p-0 text-xs font-normal"
            onClick={handleRemoveCoupon}
            disabled={isPending}
          >
            Remover
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <Input
            placeholder="Código de cupom"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.trim().toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleApplyCoupon()
            }}
            disabled={isPending}
            className="text-xs"
          />

          <Button
            size="icon"
            onClick={handleApplyCoupon}
            disabled={!inputValue.trim() || isPending}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowRight className="size-4" />
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
