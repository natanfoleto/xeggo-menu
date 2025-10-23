import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

import { getCategories } from '@/api/restaurants/get-categories'
import { getProducts } from '@/api/restaurants/get-products'
import { LoadingPage } from '@/components/loading-page'
import { PageHeader } from '@/components/page-header'
import { useRestaurant } from '@/contexts/restaurant-context'

import { CategoryProducts } from './category-products'
import { OtherCategories } from './other-categories'

export function Category() {
  const { restaurant, slug } = useRestaurant()
  const { id } = useParams<{ id: string }>()

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories', slug],
    queryFn: () => getCategories(slug!),
    enabled: !!slug,
  })

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products-category', slug, id],
    queryFn: () => getProducts({ slug: slug!, categoryId: id }),
    enabled: !!slug && !!id,
  })

  if (!restaurant || !slug || !id) return null

  if (categoriesLoading || productsLoading) {
    return <LoadingPage text="Carregando produtos..." />
  }

  const currentCategory = categories?.find((cat) => cat.id === id)
  const otherCategories = categories?.filter((cat) => cat.id !== id) || []

  return (
    <>
      <Helmet
        title={`${currentCategory?.name || 'Categoria'} - ${restaurant.name}`}
      />

      <div className="min-h-screen">
        <PageHeader title={currentCategory?.name || 'Categoria'} />

        <CategoryProducts products={products || []} slug={slug} />
        <OtherCategories categories={otherCategories} slug={slug} />
      </div>
    </>
  )
}
