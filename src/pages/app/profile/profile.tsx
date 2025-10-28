import { Helmet } from 'react-helmet-async'

import { BottomNavigation } from '@/components/bottom-navigation'
import { PageHeader } from '@/components/page-header'
import { useAuth } from '@/contexts/auth-context'

import { ProfileActions } from './profile-actions'
import { ProfileInfo } from './profile-info'
import { ProfileLogout } from './profile-logout'

export function Profile() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <>
      <Helmet title="Perfil" />

      <div className="flex min-h-screen flex-col pb-16">
        <PageHeader title="Perfil" />

        <div className="flex flex-1 flex-col gap-0">
          <ProfileInfo user={user} />
          <ProfileActions />
          <ProfileLogout />
        </div>
      </div>

      <BottomNavigation />
    </>
  )
}
