import { api } from '@/lib/axios'

export interface Product {
  id: string
  name: string
  priceInCents: number
  photoUrl: string | null
  active: boolean
  categoryId: string
  ingredients: {
    id: string
    name: string
  }[]
}

export interface GetProductsRequest {
  slug: string
  categoryId?: string
  search?: string
}

export interface GetProductsResponse {
  products: Product[]
}

export async function getProducts({
  slug,
  categoryId,
  search,
}: GetProductsRequest) {
  const response = await api.public.get<GetProductsResponse>(
    `/restaurants/${slug}/products`,
    {
      params: {
        ...(categoryId && { categoryId }),
        ...(search && { search }),
      },
    },
  )

  return response.data.products
}
