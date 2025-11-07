import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

import { getRestaurants } from '@/api/restaurants/get-restaurants'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

import { RestaurantCard } from './restaurant-card'
import {
  type RestaurantFilters,
  RestaurantFilters as RestaurantFiltersComponent,
} from './restaurant-filters'
import { RestaurantSkeleton } from './restaurant-skeleton'

export function Home() {
  const { address } = useAuth()

  const [searchParams, setSearchParams] = useSearchParams()

  const filters: RestaurantFilters = {
    segments: searchParams.get('segments')
      ? searchParams.get('segments')!.split(',')
      : [],
    deliveryFee: searchParams.get('deliveryFee') === 'true',
    open: searchParams.get('open') === 'true',
  }

  const handleFiltersChange = (newFilters: RestaurantFilters) => {
    setSearchParams((params) => {
      if (newFilters.segments.length > 0)
        params.set('segments', newFilters.segments.join(','))
      else params.delete('segments')

      if (newFilters.deliveryFee) params.set('deliveryFee', 'true')
      else params.delete('deliveryFee')

      if (newFilters.open) params.set('open', 'true')
      else params.delete('open')

      return params
    })
  }

  const handleClearFilters = () => {
    handleFiltersChange({
      segments: [],
      deliveryFee: false,
      open: false,
    })
  }

  const { data, isLoading } = useQuery({
    queryKey: ['restaurants', filters, address?.city],
    queryFn: () =>
      getRestaurants({
        ...filters,
        city: address?.city || undefined,
        limit: 50,
      }),
    staleTime: 5 * 60 * 1000,
  })

  return (
    <>
      <Helmet title="Delivery de Comida" />

      <div className="flex flex-col">
        <Header />

        <div className="flex-1 space-y-6 p-4">
          <RestaurantFiltersComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          {isLoading && <RestaurantSkeleton />}

          {data?.restaurants && data.restaurants.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}

          {!isLoading && data?.restaurants.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
              <div className="space-y-1">
                <h3>Nenhum resultado encontrado</h3>

                <p className="text-muted-foreground text-xs">
                  Edite ou limpe os filtros para voltar
                </p>
              </div>

              <Button
                variant="link"
                className="font-normal text-violet-700"
                onClick={handleClearFilters}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
