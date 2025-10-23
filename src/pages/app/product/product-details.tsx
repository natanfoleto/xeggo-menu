import { ZoomIn } from 'lucide-react'

import { ImageModal } from '@/components/image-modal'
import { formatCurrency } from '@/utils/format-currency'

interface ProductDetailsProps {
  product: {
    name: string
    description: string | null
    priceInCents: number
    photoUrl: string | null
    ingredients: {
      id: string
      name: string
    }[]
  }
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div>
      {product.photoUrl ? (
        <ImageModal src={product.photoUrl} alt={product.name}>
          <button className="relative w-full">
            <ZoomIn className="bg-foreground text-muted absolute right-1.5 bottom-2.5 rounded-md stroke-2 p-1" />

            <img
              src={product.photoUrl}
              alt={product.name}
              className="h-44 w-full cursor-pointer object-cover transition-opacity hover:opacity-90"
            />
          </button>
        </ImageModal>
      ) : (
        <div className="bg-muted flex h-44 w-full items-center justify-center"></div>
      )}

      <div className="space-y-2 px-4 py-6">
        <div className="space-y-0.5">
          <h1 className="font-semibold">{product.name}</h1>

          {product.description && (
            <p className="text-muted-foreground text-xs">
              {product.description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {product.ingredients.length > 0 && (
            <p className="text-muted-foreground font-light">
              {product.ingredients
                .map((ingredient) => ingredient.name)
                .join(', ')}
            </p>
          )}

          <p>{formatCurrency(product.priceInCents / 100)}</p>
        </div>
      </div>
    </div>
  )
}
