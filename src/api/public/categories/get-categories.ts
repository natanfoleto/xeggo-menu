import { api } from '@/lib/axios'

export interface Category {
  id: string
  name: string
  description: string | null
}

export interface GetCategoriesRequest {
  slug: string
}

export interface GetCategoriesResponse {
  categories: Category[]
}

export async function getCategories({ slug }: GetCategoriesRequest) {
  const response = await api.public.get<GetCategoriesResponse>(
    `/restaurants/${slug}/categories`,
  )

  return response.data.categories
}
