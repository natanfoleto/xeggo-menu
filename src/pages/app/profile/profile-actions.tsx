import { ChevronRight, MapPin, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useRestaurant } from '@/contexts/restaurant-context'

export function ProfileActions() {
  const { slug } = useRestaurant()

  return (
    <div className="flex flex-1 flex-col gap-6 p-4">
      <Link to={`/${slug}/profile/data`}>
        <div className="flex items-center gap-4">
          <UserRound className="text-muted-foreground size-5" />

          <div className="flex-1">
            <p className="text-sm">Meu perfil</p>
            <p className="text-muted-foreground text-xs">
              Atualize os dados da sua conta
            </p>
          </div>

          <ChevronRight className="text-muted-foreground size-5" />
        </div>
      </Link>

      <Link to={`/${slug}/profile/address`}>
        <div className="flex items-center gap-4">
          <MapPin className="text-muted-foreground size-5" />

          <div className="flex-1">
            <p className="text-sm">Endereços</p>
            <p className="text-muted-foreground text-xs">
              Endereços salvos na sua conta
            </p>
          </div>

          <ChevronRight className="text-muted-foreground size-5" />
        </div>
      </Link>
    </div>
  )
}
