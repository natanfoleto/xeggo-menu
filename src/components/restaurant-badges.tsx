import { Clock } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const SEGMENT_LABELS: Record<string, string> = {
  restaurant: 'Restaurante',
  bakery: 'Padaria',
  snackBar: 'Lanchonete',
  pizzeria: 'Pizzaria',
  iceCreamShop: 'Sorveteria',
  coffee: 'Cafeteria',
  fastFood: 'Fast Food',
  barbecue: 'Churrascaria',
  japanese: 'Japonês',
  brazilian: 'Brasileiro',
  italian: 'Italiano',
  chinese: 'Chinês',
  mexican: 'Mexicano',
  arabic: 'Árabe',
  bar: 'Bar',
}

interface RestaurantBadgesProps {
  isOpen: boolean
  segments: string[]
  className?: string
}

export function RestaurantBadges({
  isOpen,
  segments,
  className,
}: RestaurantBadgesProps) {
  return (
    <div className={cn('flex flex-wrap justify-start gap-2', className)}>
      <Badge
        variant="outline"
        className={cn(
          'gap-1',
          isOpen
            ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'
            : 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
        )}
      >
        <Clock className="size-4" />
        {isOpen ? 'Aberto' : 'Fechado'}
      </Badge>

      {segments.map((segment) => (
        <Badge key={segment} variant="outline">
          {SEGMENT_LABELS[segment] || segment}
        </Badge>
      ))}
    </div>
  )
}
