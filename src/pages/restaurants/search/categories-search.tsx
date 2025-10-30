import { useQuery } from '@tanstack/react-query'

import { getCategories } from '@/api/categories/get-categories'
import { LoadingSection } from '@/components/loading-section'
import { NavLink } from '@/components/nav-link'
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
          <NavLink to={`/category/${category.id}`} key={category.id}>
            <Button
              variant="outline"
              className="text-foreground not-dark:border-muted-foreground font-normal"
            >
              {category.name}
            </Button>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
