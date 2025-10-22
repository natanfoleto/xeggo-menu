import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getProducts } from '@/api/restaurants/get-products'
import { LoadingSection } from '@/components/loading-section'
import { useRestaurant } from '@/contexts/restaurant-context'

import { ProductItem } from './product-item'

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

  if (isLoading) return <LoadingSection text="Carregando produtos..." />

  if (!products || products.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          {`Nenhum produto encontrado para "${search}".`}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h2 className="text-muted-foreground text-center text-sm">{`${products.length} produtos econtrados para "${search}"`}</h2>

      <div className="bg-background">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} slug={slug!} />
        ))}
      </div>
    </div>
  )
}
