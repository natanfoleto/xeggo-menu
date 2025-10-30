import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

import { LoadingPage } from '@/components/loading-page'
import { useAuth } from '@/contexts/auth-context'

interface ProtectedLayoutProps {
  children: React.ReactElement
}

export function SafeAppLayout({ children }: ProtectedLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth()

  const slug = Cookies.get('restaurant')

  if (isLoading) {
    return <LoadingPage />
  }

  const url = slug ? `/${slug}` : '/'

  if (!isAuthenticated) {
    return <Navigate to={url} replace />
  }

  return children
}
