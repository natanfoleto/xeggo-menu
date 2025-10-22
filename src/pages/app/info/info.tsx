import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'

import { RestaurantBadges } from '@/components/restaurant-badges'
import { Button } from '@/components/ui/button'
import { useRestaurant } from '@/contexts/restaurant-context'

import { RestaurantAddress } from './restaurant-address'
import { RestaurantOpeningHours } from './restaurant-opening-hours'
import { RestaurantPaymentMethods } from './restaurant-payment-methods'

export function Info() {
  const { restaurant, slug } = useRestaurant()

  const navigate = useNavigate()

  if (!restaurant || !slug) return null

  return (
    <>
      <Helmet title={restaurant.name} />

      <div>
        <div className="relative flex items-center justify-center border-b p-4">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4"
            aria-label="Voltar"
          >
            <ArrowLeft className="size-5" />
          </button>

          <h1 className="font-medium">Perfil da loja</h1>
        </div>

        <div className="space-y-3 border-b px-4 py-6">
          <h2 className="text-lg font-semibold">{restaurant.name}</h2>

          <RestaurantBadges
            isOpen={restaurant.isOpen}
            segments={restaurant.segments}
          />
        </div>

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
