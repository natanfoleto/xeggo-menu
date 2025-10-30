import { Helmet } from 'react-helmet-async'

import { Branding } from '@/components/branding'
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
      <Helmet title={restaurant.name} />

      <div>
        <PageHeader title="Perfil do restaurante" />
        <RestaurantData />
        <RestaurantAddress />
        <RestaurantOpeningHours />
        <RestaurantPaymentMethods />

        <div className="px-4 pt-6">
          <NavLink to="/menu">
            <Button
              variant="outline"
              size="lg"
              className="not-dark:border-muted-foreground text-foreground w-full"
            >
              Voltar para o cardápio
            </Button>
          </NavLink>
        </div>

        <div className="pt-6 pb-4">
          <Branding />
        </div>
      </div>
    </>
  )
}
