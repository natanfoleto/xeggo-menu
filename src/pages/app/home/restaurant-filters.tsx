import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'

const SEGMENTS = [
  { value: 'restaurant', label: 'Restaurante' },
  { value: 'bakery', label: 'Padaria' },
  { value: 'snackBar', label: 'Lanchonete' },
  { value: 'pizzeria', label: 'Pizzaria' },
  { value: 'iceCreamShop', label: 'Sorveteria' },
  { value: 'coffee', label: 'Cafeteria' },
  { value: 'fastFood', label: 'Fast Food' },
  { value: 'barbecue', label: 'Churrascaria' },
  { value: 'japanese', label: 'Japonês' },
  { value: 'brazilian', label: 'Brasileira' },
  { value: 'italian', label: 'Italiana' },
  { value: 'chinese', label: 'Chinesa' },
  { value: 'mexican', label: 'Mexicana' },
  { value: 'arabic', label: 'Árabe' },
  { value: 'bar', label: 'Bar' },
]

export interface RestaurantFilters {
  segments: string[]
  deliveryFee: boolean
  open: boolean
}

interface RestaurantFiltersProps {
  filters: RestaurantFilters
  onFiltersChange: (filters: RestaurantFilters) => void
}

export function RestaurantFilters({
  filters,
  onFiltersChange,
}: RestaurantFiltersProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [segments, setSegments] = useState<string[]>(filters.segments)

  useEffect(() => {
    setSegments(filters.segments)
  }, [filters.segments])

  const hasActiveFilters =
    filters.segments.length > 0 || filters.deliveryFee || filters.open

  const handleClearFilters = () => {
    onFiltersChange({
      segments: [],
      deliveryFee: false,
      open: false,
    })

    setSegments([])
  }

  const handleToggleSegment = (segmentValue: string) => {
    setSegments((prev) =>
      prev.includes(segmentValue)
        ? prev.filter((s) => s !== segmentValue)
        : [...prev, segmentValue],
    )
  }

  const handleApplySegments = () => {
    onFiltersChange({ ...filters, segments })
    setDrawerOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (open) setSegments(filters.segments)

    setDrawerOpen(open)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Drawer open={drawerOpen} onOpenChange={handleOpenChange}>
          <DrawerTrigger asChild>
            <Button
              variant="brand"
              size="sm"
              data-state={filters.segments.length > 0 ? 'active' : 'inactive'}
              className="flex-shrink-0 text-xs font-normal"
            >
              Categorias
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Categorias</DrawerTitle>
              <DrawerDescription>
                Escolha os tipos de restaurantes
              </DrawerDescription>
            </DrawerHeader>

            <div className="max-h-[60vh] space-y-3 overflow-y-auto px-4">
              {SEGMENTS.map((segment) => (
                <div
                  key={segment.value}
                  className="group flex items-center gap-3"
                >
                  <Label
                    htmlFor={segment.value}
                    className="flex-1 cursor-pointer font-normal transition-colors group-hover:text-violet-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {segment.label}
                  </Label>

                  <Checkbox
                    id={segment.value}
                    checked={segments.includes(segment.value)}
                    onCheckedChange={() => handleToggleSegment(segment.value)}
                    className="not-dark:border-muted-foreground size-5 cursor-pointer transition-colors group-hover:border-violet-400 data-[state=checked]:border-violet-400 data-[state=checked]:bg-violet-500"
                  />
                </div>
              ))}
            </div>

            <DrawerFooter>
              <Button
                variant="link"
                onClick={handleApplySegments}
                className="text-violet-700"
              >
                Ver resultados
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Button
          variant="brand"
          size="sm"
          data-state={filters.open ? 'active' : 'inactive'}
          className="flex-shrink-0 text-xs font-normal"
          onClick={() => onFiltersChange({ ...filters, open: !filters.open })}
        >
          Abertos
        </Button>

        <Button
          variant="brand"
          size="sm"
          data-state={filters.deliveryFee ? 'active' : 'inactive'}
          className="flex-shrink-0 text-xs font-normal"
          onClick={() =>
            onFiltersChange({
              ...filters,
              deliveryFee: !filters.deliveryFee,
            })
          }
        >
          Taxa de entrega
        </Button>

        {hasActiveFilters && (
          <Button
            variant="brand"
            size="sm"
            data-state="active"
            className="flex-shrink-0 text-xs font-normal"
            onClick={handleClearFilters}
          >
            Limpar
          </Button>
        )}
      </div>
    </div>
  )
}
