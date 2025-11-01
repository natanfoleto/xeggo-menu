import { Outlet } from 'react-router-dom'

import { LoadingPage } from '@/components/loading-page'
import { NavLink } from '@/components/nav-link'
import { ResourceNotFound } from '@/components/resource-not-found'
import { Button } from '@/components/ui/button'
import { OrderProvider } from '@/contexts/order-context'
import {
  RestaurantProvider,
  useRestaurant,
} from '@/contexts/restaurant-context'

import { RestaurantMiddleware } from '../middlewares/restaurant'

function RestaurantNotFound({
  title = 'Nenhum restaurante encontrado',
  subtitle = 'Peça o link para o restaurante, ou encontre-o na página inicial.',
}) {
  return (
    <ResourceNotFound title={title} subtitle={subtitle}>
      <NavLink to="/" disablePrefix>
        <Button variant="link" className="font-normal text-violet-700">
          Encontrar restaurante
        </Button>
      </NavLink>
    </ResourceNotFound>
  )
}

function RestaurantGuard() {
  const { restaurant, isLoading, error, slug } = useRestaurant()

  if (!slug) return <RestaurantNotFound />

  if (isLoading) return <LoadingPage />

  if (error) return <RestaurantNotFound title={error} />

  if (!restaurant) return <RestaurantNotFound />

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
