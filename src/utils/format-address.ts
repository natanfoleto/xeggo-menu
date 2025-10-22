interface AddressData {
  street?: string | null
  number?: string | null
  complement?: string | null
  neighborhood?: string | null
  city?: string | null
  state?: string | null
}

export function formatAddress(address: AddressData): string {
  const parts: string[] = []

  if (address.street) {
    const streetPart = address.number
      ? `${address.street}, ${address.number}`
      : address.street
    parts.push(streetPart)
  } else if (address.number) {
    parts.push(address.number)
  }

  if (address.complement) {
    parts.push(address.complement)
  }

  if (address.neighborhood) {
    parts.push(address.neighborhood)
  }

  if (address.city && address.state) {
    parts.push(`${address.city}/${address.state}`)
  } else if (address.city) {
    parts.push(address.city)
  } else if (address.state) {
    parts.push(address.state)
  }

  return parts.join(', ')
}
