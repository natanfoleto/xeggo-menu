import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getCustomerRestaurants } from '@/api/customers/get-customer-restaurants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderFiltersSchema = z.object({
  date: z.string().optional(),
  status: z.string().optional(),
  restaurantId: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export function OrderFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const date = searchParams.get('date')
  const status = searchParams.get('status')
  const restaurantId = searchParams.get('restaurantId')

  const { data: restaurantsData } = useQuery({
    queryKey: ['customer-restaurants'],
    queryFn: getCustomerRestaurants,
  })

  const { register, handleSubmit, reset, getValues } =
    useForm<OrderFiltersSchema>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        date: date ?? '',
        status: status ?? 'all',
        restaurantId: restaurantId ?? 'all',
      },
    })

  function handleFilter({ date, status, restaurantId }: OrderFiltersSchema) {
    setSearchParams((state) => {
      if (date) state.set('date', date)
      else state.delete('date')

      if (status && status !== 'all') state.set('status', status)
      else state.delete('status')

      if (restaurantId && restaurantId !== 'all')
        state.set('restaurantId', restaurantId)
      else state.delete('restaurantId')

      state.set('limit', '10')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('date')
      state.delete('status')
      state.delete('restaurantId')
      state.set('limit', '10')

      return state
    })

    reset({
      date: '',
      status: 'all',
      restaurantId: 'all',
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFilter)} className="flex flex-col gap-2">
      <Select
        defaultValue={restaurantId ?? 'all'}
        onValueChange={(value) => {
          const currentDate = getValues('date')
          const currentStatus = getValues('status')
          handleFilter({
            restaurantId: value,
            date: currentDate,
            status: currentStatus,
          })
        }}
      >
        <SelectTrigger className="border-muted-foreground w-full">
          <SelectValue placeholder="Todos os restaurantes" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos os restaurantes</SelectItem>

          {restaurantsData?.restaurants.map((restaurant) => (
            <SelectItem key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={status ?? 'all'}
        onValueChange={(value) => {
          const currentDate = getValues('date')
          const currentRestaurantId = getValues('restaurantId')
          handleFilter({
            status: value,
            date: currentDate,
            restaurantId: currentRestaurantId,
          })
        }}
      >
        <SelectTrigger className="border-muted-foreground w-full">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos status</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="processing">Preparando</SelectItem>
          <SelectItem value="delivering">Em entrega</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="date"
        className="border-muted-foreground text-sm"
        {...register('date')}
      />

      <div className="flex gap-2">
        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="border-muted-foreground text-foreground flex-1 font-normal"
        >
          <Search className="size-4" />
          Filtrar resultados
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-muted-foreground text-foreground flex-1 font-normal"
          onClick={handleClearFilters}
        >
          <X className="size-4" />
          Remover filtros
        </Button>
      </div>
    </form>
  )
}
