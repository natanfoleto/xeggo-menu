import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useRestaurant } from '@/contexts/restaurant-context'

export function RestaurantActions() {
  const { slug } = useRestaurant()

  if (!slug) return null

  return (
    <div className="space-y-3 px-4">
      <Button asChild className="w-full">
        <Link to={`/${slug}/menu`}>Ver cardápio</Link>
      </Button>

      <div className="text-center">
        <Link
          to={`/${slug}/info`}
          className="text-muted-foreground text-sm underline-offset-4 hover:underline"
        >
          Ver informações do restaurante
        </Link>
      </div>
    </div>
  )
}
