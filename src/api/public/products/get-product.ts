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

export interface GetProductRequest {
  slug: string
  productId: string
}

export interface GetProductResponse {
  product: ProductDetail
}

export async function getProduct({ slug, productId }: GetProductRequest) {
  const response = await api.public.get<GetProductResponse>(
    `/restaurants/${slug}/products/${productId}`,
  )

  return response.data.product
}
