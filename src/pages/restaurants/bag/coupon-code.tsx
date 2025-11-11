import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { Loader2, Ticket } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { checkCoupon } from '@/api/customer/coupons/check-coupon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useOrder } from '@/contexts/order-context'
import { useRestaurant } from '@/contexts/restaurant-context'
import { formatCurrency } from '@/utils/format-currency'

export function CouponCode() {
  const { restaurant } = useRestaurant()

  const { bagSubtotal, couponCode, setCouponCode, setDiscountInCents } =
    useOrder()

  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)

  const [couponError, setCouponError] = useState<string | null>(null)
  const [couponDetails, setCouponDetails] = useState<{
    type: 'percentage' | 'fixed'
    value: number
    discountAmount: number
  } | null>(null)

  const { mutateAsync: checkCouponFn, isPending } = useMutation({
    mutationFn: checkCoupon,
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || 'Cupom inválido'

      setCouponCode(null)
      setCouponError(message)
    },
  })

  const handleRemoveCoupon = useCallback(() => {
    setInputValue('')
    setCouponCode(null)
    setDiscountInCents(null)
    setCouponDetails(null)
    setCouponError(null)
  }, [setCouponCode, setDiscountInCents])

  const handleApplyCoupon = async () => {
    if (!inputValue) return
    if (!restaurant?.id) return

    setCouponError(null)

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
      setOpen(false)
      setInputValue('')
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
    <div className="space-y-2 border-t px-4 py-6">
      <div>
        <h2 className="text-sm">Cupom de desconto</h2>
        <p className="text-muted-foreground text-xs">
          Use um cupom para receber desconto
        </p>
      </div>

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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="brand" size="sm" className="text-xs font-normal">
              Adicionar cupom
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cupom de desconto</DialogTitle>
              <DialogDescription>
                Digite o código do cupom para aplicar o desconto
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              <Input
                placeholder="Código de cupom"
                value={inputValue}
                onChange={(e) =>
                  setInputValue(e.target.value.trim().toUpperCase())
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyCoupon()
                }}
                disabled={isPending}
                className="text-sm"
              />

              {couponError && (
                <p className="text-center text-xs text-red-600">
                  {couponError}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                onClick={handleApplyCoupon}
                disabled={!inputValue.trim() || isPending}
              >
                {isPending ? <Loader2 className="animate-spin" /> : 'Aplicar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
