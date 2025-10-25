import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

import { BottomNavigation } from '@/components/bottom-navigation'
import { PageHeader } from '@/components/page-header'
import { useAuth } from '@/contexts/auth-context'
import { useRestaurant } from '@/contexts/restaurant-context'

import { ProfileActions } from './profile-actions'
import { ProfileInfo } from './profile-info'
import { ProfileLogout } from './profile-logout'

export function Profile() {
  const navigate = useNavigate()

  const { slug } = useRestaurant()
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated || !user) {
      if (slug) {
        navigate(`/${slug}`)
      } else {
        navigate('/')
      }
    }
  }, [isAuthenticated, user, slug, navigate])

  if (!user) return null

  return (
    <>
      <Helmet title="Perfil" />

      <div className="flex min-h-screen flex-col pb-16">
        <PageHeader title="Perfil" />

        <div className="flex flex-1 flex-col gap-4">
          <ProfileInfo user={user} />
          <ProfileActions />
          <ProfileLogout />
        </div>
      </div>

      <BottomNavigation />
    </>
  )
}
