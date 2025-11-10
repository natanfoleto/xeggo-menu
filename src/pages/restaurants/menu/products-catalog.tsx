import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

import { getCategories } from '@/api/public/categories/get-categories'
import { getProducts } from '@/api/public/products/get-products'
import { BackToTop } from '@/components/back-to-top'
import { LoadingSection } from '@/components/loading-section'
import { useRestaurant } from '@/contexts/restaurant-context'

import { CategoriesNav } from './categories-nav'
import { CategorySection } from './category-section'

export function ProductsCatalog() {
  const { slug } = useRestaurant()

  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories', slug],
    queryFn: () => getCategories(slug!),
    enabled: !!slug,
  })

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products', slug],
    queryFn: () => getProducts({ slug: slug! }),
    enabled: !!slug,
  })

  const onCategoryClick = (categoryId: string) => {
    const element = categoryRefs.current[categoryId]
    const button = buttonRefs.current[categoryId]

    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }

    if (button) {
      button.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }

    setActiveCategory(categoryId)
  }

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    Object.entries(categoryRefs.current).forEach(([categoryId, element]) => {
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveCategory(categoryId)

              const button = buttonRefs.current[categoryId]
              if (button) {
                button.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center',
                })
              }
            }
          },
          {
            rootMargin: '-100px 0px -70% 0px',
            threshold: 0,
          },
        )

        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [products])

  if (categoriesLoading || productsLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LoadingSection />
      </div>
    )
  }

  const productsByCategory = categories
    ?.map((category) => ({
      ...category,
      products: products?.filter((p) => p.categoryId === category.id) || [],
    }))
    .filter((cat) => cat.products.length > 0)

  if (
    !categories ||
    !productsByCategory ||
    categories.length === 0 ||
    productsByCategory.length === 0
  ) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <p className="text-muted-foreground text-sm">
          Nenhum produto encontrado
        </p>
      </div>
    )
  }

  return (
    <div className="bg-muted">
      <CategoriesNav
        ref={scrollContainerRef}
        categories={productsByCategory}
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
        buttonRefs={buttonRefs}
      />

      <div>
        {productsByCategory.map((category) => (
          <CategorySection
            key={category.id}
            ref={(el) => {
              categoryRefs.current[category.id] = el
            }}
            category={category}
          />
        ))}
      </div>

      {categories.length && products?.length && <BackToTop />}
    </div>
  )
}
