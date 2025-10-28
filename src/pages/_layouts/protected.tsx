import { Navigate } from 'react-router-dom'

import { LoadingPage } from '@/components/loading-page'
import { useAuth } from '@/contexts/auth-context'
import { useRestaurant } from '@/contexts/restaurant-context'

interface ProtectedLayoutProps {
  children: React.ReactElement
  requireOpen?: boolean
}

export function ProtectedLayout({
  children,
  requireOpen = false,
}: ProtectedLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const { restaurant, slug } = useRestaurant()

  if (isLoading) {
    return <LoadingPage />
  }

  if (!slug) {
    return <Navigate to="/" replace />
  }

  if (!isAuthenticated) {
    return <Navigate to={`/${slug}`} replace />
  }

  if (requireOpen && restaurant && !restaurant.isOpen) {
    return <Navigate to={`/${slug}`} replace />
  }

  return children
}
