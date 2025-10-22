import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { getCategories } from '@/api/restaurants/get-categories'
import { getProducts } from '@/api/restaurants/get-products'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useRestaurant } from '@/contexts/restaurant-context'
import { formatCurrency } from '@/utils/format-currency'
import { getInitialsName } from '@/utils/get-initials-name'

export function MenuItems() {
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

  const scrollToCategory = (categoryId: string) => {
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
      <div className="flex items-center justify-center py-12">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Nenhuma categoria disponível</p>
      </div>
    )
  }

  const productsByCategory = categories
    .map((category) => ({
      ...category,
      products: products?.filter((p) => p.categoryId === category.id) || [],
    }))
    .filter((cat) => cat.products.length > 0)

  if (productsByCategory.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Nenhum produto disponível</p>
      </div>
    )
  }

  return (
    <div className="bg-muted">
      <div className="bg-muted sticky top-0 z-10 px-4 py-6">
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide overflow-x-auto"
        >
          <div className="flex gap-2">
            {productsByCategory.map((category) => (
              <Button
                key={category.id}
                ref={(el) => {
                  buttonRefs.current[category.id] = el
                }}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => scrollToCategory(category.id)}
                className="font-normal whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div>
        {productsByCategory.map((category) => (
          <div
            key={category.id}
            ref={(el) => {
              categoryRefs.current[category.id] = el
            }}
          >
            <div className="p-4">
              <h2 className="text-sm font-semibold">{category.name}</h2>

              {category.description && (
                <p className="text-muted-foreground text-xs">
                  {category.description}
                </p>
              )}
            </div>

            <div className="bg-background">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 border-b px-4 py-6 last:border-0"
                >
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-medium">{product.name}</h3>

                    {product.ingredients.length > 0 && (
                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {product.ingredients
                          .map((ingredient) => ingredient.name)
                          .join(', ')}
                      </p>
                    )}

                    <Link
                      to={`/${slug}/products/${product.id}`}
                      className="text-primary inline-block text-sm font-medium underline underline-offset-2"
                    >
                      Ver mais
                    </Link>

                    <p className="pt-4">
                      {formatCurrency(product.priceInCents / 100)}
                    </p>
                  </div>

                  <Avatar className="size-20 rounded-lg">
                    <AvatarImage
                      src={product.photoUrl || ''}
                      alt={product.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-muted text-muted-foreground rounded-lg text-xs">
                      {getInitialsName(product.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
