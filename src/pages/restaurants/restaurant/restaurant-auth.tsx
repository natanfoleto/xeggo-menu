import { AuthAccount } from '@/components/auth-account'
import { useRestaurant } from '@/contexts/restaurant-context'

export function RestaurantAuth() {
  const { slug } = useRestaurant()

  return (
    <div className="border-b px-4 py-6">
      <AuthAccount slug={slug} />
    </div>
  )
}
