import { ProductCard } from '@/components/product-card'

interface CategoryProductsProps {
  products: {
    id: string
    name: string
    priceInCents: number
    photoUrl: string | null
    ingredients: {
      id: string
      name: string
    }[]
  }[]
  slug: string
}

export function CategoryProducts({ products, slug }: CategoryProductsProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground text-sm">
          Nenhum produto disponível nesta categoria
        </p>
      </div>
    )
  }

  return (
    <div className="bg-background">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          slug={slug}
          lastBorder
        />
      ))}
    </div>
  )
}
