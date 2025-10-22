import { ArrowLeft, Clock3, DollarSign, MapPinned } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'

import { RestaurantBadges } from '@/components/restaurant-badges'
import { Button } from '@/components/ui/button'
import { useRestaurant } from '@/contexts/restaurant-context'
import { formatAddress } from '@/utils/format-address'
import { formatOpeningHours } from '@/utils/format-opening-hours'
import { formatPaymentMethods } from '@/utils/format-payment-methods'

export function Info() {
  const { restaurant, slug } = useRestaurant()
  const navigate = useNavigate()

  if (!restaurant || !slug) return null

  const formattedHours = formatOpeningHours(restaurant.openingHours)

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
            <ArrowLeft className="size-6" />
          </button>

          <h1 className="text-lg font-medium">Perfil da loja</h1>
        </div>

        <div className="space-y-3 border-b p-4">
          <h2 className="text-lg font-semibold">{restaurant.name}</h2>

          <RestaurantBadges
            isOpen={restaurant.isOpen}
            segments={restaurant.segments}
          />
        </div>

        <div className="space-y-3 border-b p-4">
          <div className="flex items-center gap-1.5">
            <MapPinned className="text-muted-foreground size-5" />
            <h2 className="font-medium">Endereço</h2>
          </div>

          <p className="text-muted-foreground text-sm">
            {formatAddress({
              city: restaurant.city,
              street: restaurant.street,
              number: restaurant.number,
              state: restaurant.state,
              neighborhood: restaurant.neighborhood,
              complement: restaurant.complement,
            })}
          </p>
        </div>

        <div className="space-y-3 border-b p-4">
          <div className="flex items-center gap-1.5">
            <Clock3 className="text-muted-foreground size-5" />
            <h2 className="font-medium">Horário de funcionamento</h2>
          </div>

          <div className="space-y-4">
            {formattedHours.map((schedule, index) => (
              <div key={index} className="space-y-1">
                <p>{schedule.day}</p>
                {schedule.times.map((time, timeIndex) => (
                  <p key={timeIndex} className="text-muted-foreground text-xs">
                    {time}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 border-b p-4">
          <div className="flex items-center gap-1.5">
            <DollarSign className="text-muted-foreground size-5" />
            <h2 className="font-medium">Formas de pagamento</h2>
          </div>

          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">
              Pagamento na entrega
            </p>

            <p className="text-muted-foreground text-sm">
              {formatPaymentMethods(restaurant.paymentMethods)}
            </p>
          </div>
        </div>

        <div className="p-4">
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
