import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

interface OtherCategoriesProps {
  categories: {
    id: string
    name: string
  }[]
  slug: string
}

export function OtherCategories({ categories, slug }: OtherCategoriesProps) {
  if (categories.length === 0) return null

  return (
    <div className="space-y-3 p-4">
      <h2>Outras categorias</h2>

      <div className="flex flex-wrap gap-2">
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
