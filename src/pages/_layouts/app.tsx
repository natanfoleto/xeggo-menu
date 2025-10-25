import { Outlet } from 'react-router-dom'

import { ErrorPage } from '@/components/error-page'
import { LoadingPage } from '@/components/loading-page'
import { AuthProvider } from '@/contexts/auth-context'
import { OrderProvider } from '@/contexts/order-context'
import {
  RestaurantProvider,
  useRestaurant,
} from '@/contexts/restaurant-context'

import { Middleware } from '../app/middleware'

function RestaurantGuard() {
  const { restaurant, isLoading, error } = useRestaurant()

  if (isLoading) return <LoadingPage text="Carregando restaurante..." />
  if (error || !restaurant) return <ErrorPage error={error} />

  return <Outlet />
}

export function AppLayout() {
  return (
    <>
      <Middleware />

      <RestaurantProvider>
        <AuthProvider>
          <OrderProvider>
            <RestaurantGuard />
          </OrderProvider>
        </AuthProvider>
      </RestaurantProvider>
    </>
  )
}
