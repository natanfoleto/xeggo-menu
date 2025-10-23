import { Link } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/format-currency'
import { getInitialsName } from '@/utils/get-initials-name'

interface ProductCardProps {
  slug: string
  product: {
    id: string
    name: string
    priceInCents: number
    photoUrl: string | null
    ingredients: {
      id: string
      name: string
    }[]
  }
  lastBorder?: boolean
}

export function ProductCard({
  product,
  slug,
  lastBorder = false,
}: ProductCardProps) {
  return (
    <Link
      to={`/${slug}/products/${product.id}`}
      className={cn(
        'hover:bg-muted flex items-center gap-4 border-b px-4 py-6 transition-colors',
        !lastBorder && 'last:border-0',
      )}
    >
      <div className="flex-1 space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-medium">{product.name}</h2>

          {product.ingredients.length > 0 && (
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {product.ingredients
                .map((ingredient) => ingredient.name)
                .join(', ')}
            </p>
          )}
        </div>

        <p>{formatCurrency(product.priceInCents / 100)}</p>
      </div>

      <Avatar className="size-20 rounded-lg">
        <AvatarImage
          src={product.photoUrl || ''}
          alt={product.name}
          className="object-cover"
        />
        <AvatarFallback className="bg-muted text-muted-foreground rounded-lg text-xs">
          {getInitialsName(product.name)}
        </AvatarFallback>
      </Avatar>
    </Link>
  )
}
