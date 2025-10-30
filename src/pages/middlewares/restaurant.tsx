import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function RestaurantMiddleware() {
  const location = useLocation()

  useEffect(() => {
    const pathSegments = location.pathname.split('/')
    const slug = pathSegments[1]

    if (slug) {
      Cookies.set('restaurant', slug, { path: '/' })
    }
  }, [location])

  return null
}
