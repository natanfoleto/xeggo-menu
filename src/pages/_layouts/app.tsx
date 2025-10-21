import { Loader2 } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import {
  RestaurantProvider,
  useRestaurant,
} from '@/contexts/restaurant-context'

import { Middleware } from '../app/middleware'

function RestaurantGuard() {
  const { restaurant, isLoading, error } = useRestaurant()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-2 text-center">
          <Loader2 className="text-primary mx-auto size-8 animate-spin" />

          <p className="text-muted-foreground text-sm">
            Carregando restaurante...
          </p>
        </div>
      </div>
    )
  }

  if (error || !restaurant) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold">Restaurante não encontrado</h1>

          <p className="text-muted-foreground mt-2 text-sm">
            {error || 'Verifique se o endereço está correto'}
          </p>
        </div>
      </div>
    )
  }

  return <Outlet />
}

export function AppLayout() {
  return (
    <>
      <Middleware />

      <RestaurantProvider>
        <RestaurantGuard />
      </RestaurantProvider>
    </>
  )
}
