import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { useRestaurant } from '@/contexts/restaurant-context'

import { RestaurantAddress } from './restaurant-address'
import { RestaurantData } from './restaurant-data'
import { RestaurantOpeningHours } from './restaurant-opening-hours'
import { RestaurantPaymentMethods } from './restaurant-payment-methods'

export function Info() {
  const { restaurant, slug } = useRestaurant()

  if (!restaurant || !slug) return null

  return (
    <>
      <Helmet title={restaurant.name} />

      <div>
        <PageHeader title="Perfil da loja" />
        <RestaurantData />
        <RestaurantAddress />
        <RestaurantOpeningHours />
        <RestaurantPaymentMethods />

        <div className="px-4 py-6">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-foreground w-full"
          >
            <Link to={`/${slug}/menu`}>Voltar para o cardápio</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
