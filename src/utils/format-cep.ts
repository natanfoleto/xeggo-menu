export function formatCEP(value: string) {
  let cep = value.replace(/\D/g, '')

  if (cep.length > 5) {
    cep = value.replace(/(\d{5})(\d{1,3})/, '$1-$2')
  }

  return cep
}
