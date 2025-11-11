import { Helmet } from 'react-helmet-async'

import { NavLink } from '@/components/nav-link'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { useRestaurant } from '@/contexts/restaurant-context'

import { RestaurantAddress } from './restaurant-address'
import { RestaurantData } from './restaurant-data'
import { RestaurantOpeningHours } from './restaurant-opening-hours'
import { RestaurantPaymentMethods } from './restaurant-payment-methods'

export function About() {
  const { restaurant, slug } = useRestaurant()

  if (!restaurant || !slug) return null

  return (
    <>
      <Helmet title={`${restaurant.name} - Sobre`} />

      <div>
        <PageHeader title="Perfil do restaurante" />

        <div className="mx-auto max-w-7xl">
          <RestaurantData />
          <RestaurantAddress />
          <RestaurantOpeningHours />
          <RestaurantPaymentMethods />

          <div className="px-4 py-6">
            <NavLink to="/menu">
              <Button size="lg" className="w-full">
                Voltar para o cardápio
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}
