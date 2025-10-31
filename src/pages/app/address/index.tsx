import { Plus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { NavLink } from '@/components/nav-link'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

import { AddressCard } from './address-card'

export function Address() {
  const { addresses } = useAuth()

  return (
    <>
      <Helmet title="Endereços" />

      <div className="flex min-h-screen flex-col">
        <PageHeader title="Endereços" />

        <div className="flex-1 space-y-4 p-4">
          <div className="space-y-3">
            {addresses.map((address) => (
              <AddressCard key={address.id} address={address} />
            ))}
          </div>

          <NavLink to="/address/save" disablePrefix>
            <Button variant="secondary" className="w-full border font-normal">
              <Plus />
              Adicionar endereço
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  )
}
