import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

import { BottomNavigation } from '@/components/bottom-navigation'
import { PageHeader } from '@/components/page-header'
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
      <Helmet title="Buscar produto" />

      <div className="min-h-screen pb-16">
        <PageHeader title="Buscar produto" />

        <div className="mx-auto max-w-7xl">
          <InputSearch />

          <div className="flex flex-1 flex-col justify-between pb-6">
            {hasSearch ? <SearchResult /> : <CategoriesSearch />}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </>
  )
}
