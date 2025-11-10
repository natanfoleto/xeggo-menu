// src/api/menu/get-product.ts
import { api } from '@/lib/axios'

export interface ProductDetail {
  id: string
  name: string
  description: string | null
  priceInCents: number
  photoUrl: string | null
  active: boolean
  categoryId: string
  ingredients: {
    id: string
    name: string
  }[]
  complementGroups: {
    id: string
    name: string
    mandatory: boolean
    min: number
    max: number
    complements: {
      id: string
      name: string
      priceInCents: number | null
      description: string | null
    }[]
  }[]
}

export interface GetProductResponse {
  product: ProductDetail
}

export interface GetProductParams {
  slug: string
  productId: string
}

export async function getProduct({ slug, productId }: GetProductParams) {
  const response = await api.public.get<GetProductResponse>(
    `/restaurants/${slug}/products/${productId}`,
  )

  return response.data.product
}
