import type { PaymentMethod } from '@/dtos/payment-methods/payment-method'

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: 'Dinheiro',
  creditCard: 'Crédito',
  debitCard: 'Débito',
  pix: 'Pix',
}

export function formatPaymentMethods(methods: PaymentMethod[]): string {
  const formattedMethods = methods.map(
    (method) => PAYMENT_METHOD_LABELS[method] || method,
  )

  if (formattedMethods.length === 0) return ''
  if (formattedMethods.length === 1) return formattedMethods[0]
  if (formattedMethods.length === 2) {
    return `${formattedMethods[0]} e ${formattedMethods[1]}`
  }

  const lastMethod = formattedMethods.pop()
  return `${formattedMethods.join(', ')} e ${lastMethod}`
}
