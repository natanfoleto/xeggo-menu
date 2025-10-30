import { forwardRef } from 'react'

import { ProductCard } from '@/components/product-card'

interface CategorySectionProps {
  category: {
    id: string
    name: string
    description: string | null
    products: Array<{
      id: string
      name: string
      description?: string | null
      priceInCents: number
      photoUrl: string | null
      ingredients: {
        id: string
        name: string
      }[]
    }>
  }
}

export const CategorySection = forwardRef<HTMLDivElement, CategorySectionProps>(
  ({ category }, ref) => {
    return (
      <div ref={ref}>
        <div className="p-4">
          <h2 className="text-sm font-semibold">{category.name}</h2>

          {category.description && (
            <p className="text-muted-foreground text-xs">
              {category.description}
            </p>
          )}
        </div>

        <div className="bg-background">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    )
  },
)

CategorySection.displayName = 'CategorySection'
