import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { createContext, useContext, useEffect, useState } from 'react'

import {
  getRestaurant,
  type Restaurant,
} from '@/api/restaurants/get-restaurant'

interface RestaurantContextData {
  restaurant: Restaurant | null
  isLoading: boolean
  error: string | null
  slug: string | null
}

const RestaurantContext = createContext<RestaurantContextData>(
  {} as RestaurantContextData,
)

export function RestaurantProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [slug, setSlug] = useState<string | null>(null)

  useEffect(() => {
    const restaurantSlug = Cookies.get('restaurant')

    if (restaurantSlug) {
      setSlug(restaurantSlug)
    }
  }, [])

  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['restaurant', slug],
    queryFn: () => getRestaurant(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 3,
  })

  return (
    <RestaurantContext.Provider
      value={{
        restaurant: restaurant || null,
        isLoading,
        error: error ? 'Restaurante não encontrado' : null,
        slug,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurant() {
  const context = useContext(RestaurantContext)

  if (!context) {
    throw new Error('useRestaurant must be used within RestaurantProvider')
  }

  return context
}
