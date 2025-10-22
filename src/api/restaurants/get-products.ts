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

export interface GetProductsResponse {
  products: Product[]
}

export interface GetProductsParams {
  slug: string
}

export async function getProducts({ slug }: GetProductsParams) {
  const response = await api.deauth.get<GetProductsResponse>(
    `/restaurants/${slug}/products`,
  )

  return response.data.products
}
