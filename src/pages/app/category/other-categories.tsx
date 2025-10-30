import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'

interface OtherCategoriesProps {
  categories: {
    id: string
    name: string
  }[]
}

export function OtherCategories({ categories }: OtherCategoriesProps) {
  if (categories.length === 0) return null

  return (
    <div className="space-y-3 p-4">
      <h2>Outras categorias</h2>

      <div className="flex flex-wrap gap-2">
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
