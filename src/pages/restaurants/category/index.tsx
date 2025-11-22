import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

import { getCategories } from '@/api/public/categories/get-categories'
import { getProducts } from '@/api/public/products/get-products'
import { LoadingPage } from '@/components/loading-page'
import { PageHeader } from '@/components/page-header'
import { useRestaurant } from '@/contexts/restaurant-context'

import { CategoryProducts } from './category-products'
import { OtherCategories } from './other-categories'

export function Category() {
  const { restaurant, slug } = useRestaurant()

  const { id } = useParams<{ id: string }>()

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories', slug],
    queryFn: () => getCategories({ slug: slug! }),
    enabled: !!slug,
  })

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products-category', slug, id],
    queryFn: () => getProducts({ slug: slug!, categoryId: id }),
    enabled: !!slug && !!id,
  })

  if (!restaurant || !slug || !id) return null

  if (isLoadingCategories || isLoadingProducts) {
    return <LoadingPage text="Carregando produtos..." />
  }

  const currentCategory = categories?.find((cat) => cat.id === id)
  const otherCategories = categories?.filter((cat) => cat.id !== id) || []

  return (
    <>
      <Helmet
        title={`${currentCategory?.name || 'Categoria'} - ${restaurant.name}`}
      />

      <div className="mx-auto min-h-screen max-w-7xl">
        <PageHeader title={currentCategory?.name || 'Categoria'} />

        <CategoryProducts products={products || []} />
        <OtherCategories categories={otherCategories} />
      </div>
    </>
  )
}
