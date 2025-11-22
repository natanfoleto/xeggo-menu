import { forwardRef } from 'react'

import { Button } from '@/components/ui/button'

interface CategoriesNavProps {
  categories: {
    id: string
    name: string
  }[]
  activeCategory: string | null
  onCategoryClick: (categoryId: string) => void
  buttonRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>
}

export const CategoriesNav = forwardRef<HTMLDivElement, CategoriesNavProps>(
  ({ categories, activeCategory, onCategoryClick, buttonRefs }, ref) => {
    return (
      <div className="bg-muted sticky top-0 z-10 px-4 py-6">
        <div ref={ref} className="scrollbar-hide overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                ref={(el) => {
                  buttonRefs.current[category.id] = el
                }}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategoryClick(category.id)}
                className="font-normal whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    )
  },
)

CategoriesNav.displayName = 'CategoriesNav'
