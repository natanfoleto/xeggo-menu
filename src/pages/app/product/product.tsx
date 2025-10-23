import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

import { getProduct } from '@/api/products/get-product'
import { ErrorPage } from '@/components/error-page'
import { LoadingPage } from '@/components/loading-page'
import { PageHeader } from '@/components/page-header'
import { useOrder } from '@/contexts/order-context'
import { useRestaurant } from '@/contexts/restaurant-context'

import { ProductActions } from './product-actions'
import { ProductDetails } from './product-details'
import { ProductOptions } from './product-options'
interface CartComplement {
  id: string
  name: string
  quantity: number
  priceInCents: number
}

export function Product() {
  const { restaurant, slug } = useRestaurant()
  const { addToBag } = useOrder()

  const { id } = useParams<{ id: string }>()

  const [observations, setObservations] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedComplements, setSelectedComplements] = useState<
    Record<string, number>
  >({})

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug, id],
    queryFn: () => getProduct({ slug: slug!, productId: id! }),
    enabled: !!slug && !!id,
  })

  const totalPrice = useMemo(() => {
    if (!product) return 0

    let complementsTotal = 0

    product.complementGroups.forEach((group) => {
      group.complements.forEach((complement) => {
        const qty = selectedComplements[complement.id] || 0
        if (qty > 0 && complement.priceInCents) {
          complementsTotal += complement.priceInCents * qty
        }
      })
    })

    return (product.priceInCents + complementsTotal) * quantity
  }, [product, selectedComplements, quantity])

  const handleComplementChange = (complementId: string, quantity: number) => {
    setSelectedComplements((prev) => ({
      ...prev,
      [complementId]: quantity,
    }))
  }

  const handleAddToCart = () => {
    if (!product) return

    const selectedComplementsList: CartComplement[] = []

    product.complementGroups.forEach((group) => {
      group.complements.forEach((complement) => {
        const qty = selectedComplements[complement.id] || 0
        if (qty > 0) {
          selectedComplementsList.push({
            id: complement.id,
            name: complement.name,
            quantity: qty,
            priceInCents: complement.priceInCents || 0,
          })
        }
      })
    })

    addToBag({
      productId: product.id,
      productName: product.name,
      productPhotoUrl: product.photoUrl,
      quantity,
      priceInCents: product.priceInCents,
      observations,
      complements: selectedComplementsList,
    })
  }

  if (!restaurant || !slug || !id) return null

  if (isLoading) return <LoadingPage text="Carregando produto..." />

  if (!product) {
    return <ErrorPage error="Produto não encontrado." />
  }

  return (
    <>
      <Helmet title={`${product.name} - ${restaurant.name}`} />

      <div className="min-h-screen">
        <PageHeader title={product.name} />

        <ProductDetails product={product} />

        <ProductOptions
          complementGroups={product.complementGroups}
          selectedComplements={selectedComplements}
          observations={observations}
          onComplementChange={handleComplementChange}
          onObservationsChange={setObservations}
        />

        <ProductActions
          isOpen={restaurant.isOpen}
          quantity={quantity}
          totalPrice={totalPrice}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
        />
      </div>
    </>
  )
}
