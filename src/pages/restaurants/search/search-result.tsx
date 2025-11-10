import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getProducts } from '@/api/public/products/get-products'
import { LoadingSection } from '@/components/loading-section'
import { ProductCard } from '@/components/product-card'
import { useRestaurant } from '@/contexts/restaurant-context'

export function SearchResult() {
  const { slug } = useRestaurant()

  const [searchParams] = useSearchParams()

  const search = searchParams.get('q')

  const { data: products, isLoading } = useQuery({
    queryKey: ['products-search', slug, search],
    queryFn: () => getProducts({ slug: slug!, search: search || undefined }),
    enabled: !!slug && !!search,
  })

  if (!search) return null

  if (isLoading) return <LoadingSection />

  if (!products || products.length === 0) {
    return (
      <div className="py-2 text-center">
        <p className="text-muted-foreground text-sm">
          {`Nenhum produto encontrado para "${search}".`}
        </p>
      </div>
    )
  }

  const resultText =
    products.length === 1
      ? `1 produto encontrado para "${search}"`
      : `${products.length} produtos encontrados para "${search}"`

  return (
    <div className="space-y-2 py-2">
      <h2 className="text-muted-foreground text-center text-sm">
        {resultText}
      </h2>

      <div className="bg-background">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
