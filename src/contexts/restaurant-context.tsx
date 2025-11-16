import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { createContext, useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import {
  getRestaurant,
  type Restaurant,
} from '@/api/public/restaurants/get-restaurant'
import {
  getCurrentTimeInMinutes,
  getCurrentWeekDay,
  timeStringToMinutes,
} from '@/utils/week-days'

interface RestaurantContextData {
  restaurant: Restaurant | null
  isLoading: boolean
  error: string | null
  slug: string | null
  closingTime: {
    time: string
    isOpen: boolean
    isClosingSoon: boolean
  } | null
}

const RestaurantContext = createContext<RestaurantContextData>(
  {} as RestaurantContextData,
)

export function RestaurantProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieSlug = Cookies.get('restaurant')

  const { slug: urlSlug } = useParams<{ slug: string }>()

  const slug = urlSlug || cookieSlug || null

  const {
    data: restaurant,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurant', slug],
    queryFn: () => getRestaurant({ slug: slug! }),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 3,
  })

  const closingTime = useMemo(() => {
    if (!restaurant?.openingHours || restaurant.openingHours.length === 0) {
      return null
    }

    const currentDay = getCurrentWeekDay()

    const todayHours = restaurant.openingHours.find(
      (hours) => hours.weekDay === currentDay,
    )

    if (!todayHours) {
      return null
    }

    const currentTimeInMinutes = getCurrentTimeInMinutes()
    const openTimeInMinutes = timeStringToMinutes(todayHours.openTime)
    const closeTimeInMinutes = timeStringToMinutes(todayHours.closeTime)

    const crossesMidnight = closeTimeInMinutes < openTimeInMinutes

    const isOpen = crossesMidnight
      ? currentTimeInMinutes >= openTimeInMinutes ||
        currentTimeInMinutes < closeTimeInMinutes
      : currentTimeInMinutes >= openTimeInMinutes &&
        currentTimeInMinutes <= closeTimeInMinutes

    const timeUntilClose = crossesMidnight
      ? currentTimeInMinutes >= openTimeInMinutes
        ? 24 * 60 - currentTimeInMinutes + closeTimeInMinutes
        : closeTimeInMinutes - currentTimeInMinutes
      : closeTimeInMinutes - currentTimeInMinutes

    const isClosingSoon = isOpen && timeUntilClose <= 60

    return {
      time: todayHours.closeTime,
      isOpen,
      isClosingSoon,
    }
  }, [restaurant])

  return (
    <RestaurantContext.Provider
      value={{
        restaurant: restaurant || null,
        isLoading,
        error: isError ? 'Restaurante não encontrado' : null,
        slug,
        closingTime,
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
