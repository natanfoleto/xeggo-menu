import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircleCheck, EllipsisVertical } from 'lucide-react'

import { deleteCustomerAddress } from '@/api/addresses/delete-customer-address'
import type { CustomerAddress } from '@/api/addresses/get-customer-addresses'
import { setActiveCustomerAddress } from '@/api/addresses/set-active-customer-address'
import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface AddressCardProps {
  address: CustomerAddress
}

export function AddressCard({ address }: AddressCardProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: setActiveAddress, isPending: isSettingActive } =
    useMutation({
      mutationFn: setActiveCustomerAddress,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['customer-addresses'] })
      },
    })

  const { mutateAsync: deleteAddress, isPending: isDeleting } = useMutation({
    mutationFn: deleteCustomerAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-addresses'] })
    },
  })

  async function handleSetActive() {
    if (address.isActive) return

    await setActiveAddress({ addressId: address.id })
  }

  async function handleDelete() {
    await deleteAddress({ addressId: address.id })
  }

  return (
    <div className="w-full rounded-md border">
      <div className="flex items-center justify-between gap-2 border-b p-4">
        <div className="flex-1 space-y-0.5">
          <h2 className="text-sm font-medium">
            {address.street}, {address.number}
          </h2>

          <div>
            <p className="text-muted-foreground text-xs">
              {address.complement && `${address.complement} - `}
              {address.neighborhood}
            </p>

            <p className="text-muted-foreground text-xs">
              CEP {address.zipCode} - {address.state} - {address.city}
            </p>
          </div>
        </div>

        {address.isActive && (
          <CircleCheck className="size-4 fill-blue-100 stroke-blue-500" />
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" disabled={isDeleting}>
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <NavLink to={`/address/save?id=${address.id}`}>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </NavLink>

            <DropdownMenuItem
              onClick={handleDelete}
              disabled={address.isActive}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Button
        onClick={handleSetActive}
        disabled={isSettingActive || address.isActive}
        className="bg-muted hover:bg-muted/75 disabled:text-foreground flex w-full justify-start border-none text-xs font-normal text-blue-500 transition-colors"
      >
        {isSettingActive ? 'Definindo...' : 'Definir como principal'}
      </Button>
    </div>
  )
}
