import { Navigate } from 'react-router-dom'

import { LoadingPage } from '@/components/loading-page'
import { useAuth } from '@/contexts/auth-context'

interface ProtectedLayoutProps {
  children: React.ReactElement
}

export function SafeAppLayout({ children }: ProtectedLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingPage />
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}
