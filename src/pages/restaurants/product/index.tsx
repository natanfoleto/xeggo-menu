import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'

import { getProduct } from '@/api/products/get-product'
import { LoadingPage } from '@/components/loading-page'
import { NavLink } from '@/components/nav-link'
import { PageHeader } from '@/components/page-header'
import { ResourceNotFound } from '@/components/resource-not-found'
import { Button } from '@/components/ui/button'
import { type BagComplement, useOrder } from '@/contexts/order-context'
import { useRestaurant } from '@/contexts/restaurant-context'

import { ProductActions } from './product-actions'
import { ProductDetails } from './product-details'
import { ProductOptions } from './product-options'

export function Product() {
  const navigate = useNavigate()

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

  const handleAddToBag = () => {
    if (!product) return

    const selectedComplementsList: BagComplement[] = []

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

    navigate(`/${slug}/menu`)
  }

  if (!restaurant || !slug || !id) return null

  if (isLoading) return <LoadingPage text="Carregando produto..." />

  if (!product)
    return (
      <ResourceNotFound
        title="Produto não encontrado"
        subtitle="Volte ao cardápio para encontrar os produtos deste restaurante."
      >
        <NavLink to="/menu">
          <Button variant="link" className="font-normal text-violet-700">
            Cardápio
          </Button>
        </NavLink>
      </ResourceNotFound>
    )

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
          onAddToBag={handleAddToBag}
        />
      </div>
    </>
  )
}
