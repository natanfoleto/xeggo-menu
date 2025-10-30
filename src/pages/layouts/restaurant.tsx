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
  const { restaurant, isLoading, error } = useRestaurant()

  if (isLoading) return <LoadingPage text="Carregando restaurante..." />
  if (error || !restaurant) return <ErrorPage error={error} />

  return <Outlet />
}

export function RestaurantLayout() {
  return (
    <>
      <RestaurantMiddleware />

      <RestaurantProvider>
        <OrderProvider>
          <RestaurantGuard />
        </OrderProvider>
      </RestaurantProvider>
    </>
  )
}
