import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

import { BottomNavigation } from '@/components/bottom-navigation'
import { Branding } from '@/components/branding'
import { useRestaurant } from '@/contexts/restaurant-context'

import { CategoriesSearch } from './categories-search'
import { InputSearch } from './input-search'
import { SearchResult } from './search-result'

export function Search() {
  const { restaurant } = useRestaurant()

  const [searchParams] = useSearchParams()

  const hasSearch = !!searchParams.get('q')

  if (!restaurant) return null

  return (
    <>
      <Helmet title={`Buscar - ${restaurant.name}`} />

      <div className="flex min-h-screen flex-col pb-16">
        <InputSearch />

        <div className="flex flex-1 flex-col justify-between pb-6">
          {hasSearch ? <SearchResult /> : <CategoriesSearch />}

          <Branding />
        </div>
      </div>

      <BottomNavigation />
    </>
  )
}
