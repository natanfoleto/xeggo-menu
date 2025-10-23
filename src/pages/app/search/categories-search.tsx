import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { getCategories } from '@/api/restaurants/get-categories'
import { LoadingSection } from '@/components/loading-section'
import { Button } from '@/components/ui/button'
import { useRestaurant } from '@/contexts/restaurant-context'

export function CategoriesSearch() {
  const { slug } = useRestaurant()

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories', slug],
    queryFn: () => getCategories(slug!),
    enabled: !!slug,
  })

  if (isLoading) return <LoadingSection text="Carregando categorias..." />

  if (!categories || categories.length === 0) return null

  return (
    <div className="space-y-3 p-4">
      <h2>Categorias</h2>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            className="font-normal"
            asChild
          >
            <Link to={`/${slug}/category/${category.id}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
