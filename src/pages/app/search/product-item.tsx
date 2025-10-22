import { Link } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatCurrency } from '@/utils/format-currency'
import { getInitialsName } from '@/utils/get-initials-name'

interface ProductItemProps {
  slug: string
  product: {
    id: string
    name: string
    description?: string | null
    priceInCents: number
    photoUrl: string | null
    ingredients: {
      id: string
      name: string
    }[]
  }
}

export function ProductItem({ product, slug }: ProductItemProps) {
  return (
    <div className="flex items-center gap-4 border-b p-4 last:border-0">
      <div className="flex-1 space-y-2">
        <div>
          <h2 className="font-medium">{product.name}</h2>

          {product.description && (
            <p className="text-muted-foreground text-xs">
              {product.description}
            </p>
          )}
        </div>

        <div>
          {product.ingredients.length > 0 && (
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {product.ingredients
                .map((ingredient) => ingredient.name)
                .join(', ')}
            </p>
          )}

          <Link
            to={`/${slug}/products/${product.id}`}
            className="text-primary inline-block text-sm font-medium underline underline-offset-2"
          >
            Ver mais
          </Link>
        </div>

        <p>{formatCurrency(product.priceInCents / 100)}</p>
      </div>

      <Avatar className="size-24 rounded-lg">
        <AvatarImage
          src={product.photoUrl || ''}
          alt={product.name}
          className="object-cover"
        />
        <AvatarFallback className="bg-muted text-muted-foreground rounded-lg text-xs">
          {getInitialsName(product.name)}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
