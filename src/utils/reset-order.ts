export function resetOrder() {
  const orderKeys = [
    'bag-items',
    'order-type',
    'payment-methods',
    'change-for-in-cents',
    'delivery-fee-in-cents',
    'discount-in-cents',
    'coupon-code',
    'observations',
  ]

  orderKeys.forEach((key) => {
    localStorage.removeItem(key)
  })
}
