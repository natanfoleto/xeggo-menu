import { Outlet } from 'react-router-dom'

import { ErrorPage } from '@/components/error-page'
import { LoadingPage } from '@/components/loading-page'
import { OrderProvider } from '@/contexts/order-context'
import {
  RestaurantProvider,
  useRestaurant,
} from '@/contexts/restaurant-context'

import { RestaurantMiddleware } from '../middlewares/restaurant'

function RestaurantGuard() {
  const { restaurant, isLoading, error, slug } = useRestaurant()

  if (!slug) return <ErrorPage error="Nenhum restaurante encontrado" />

  if (isLoading) return <LoadingPage text="Carregando restaurante..." />

  if (error) return <ErrorPage error={error} />

  if (!restaurant) return <ErrorPage error="Nenhum restaurante encontrado" />

  return <Outlet />
}

function RestaurantContent() {
  return (
    <RestaurantProvider>
      <OrderProvider>
        <RestaurantGuard />
      </OrderProvider>
    </RestaurantProvider>
  )
}

export function RestaurantLayout() {
  return (
    <>
      <RestaurantMiddleware />
      <RestaurantContent />
    </>
  )
}
