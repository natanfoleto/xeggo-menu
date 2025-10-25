import { Plus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { BottomNavigation } from '@/components/bottom-navigation'
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

      <div className="flex min-h-screen flex-col pb-16">
        <PageHeader title="Endereços" />

        <div className="space-y-4 p-4">
          <div className="space-y-3">
            {addresses.map((address) => (
              <AddressCard key={address.id} address={address} />
            ))}
          </div>

          <NavLink to={`/profile/address/save`}>
            <Button className="w-full" variant="secondary">
              <Plus />
              Adicionar novo endereço
            </Button>
          </NavLink>
        </div>
      </div>

      <BottomNavigation />
    </>
  )
}
