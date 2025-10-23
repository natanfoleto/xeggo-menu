import { Search as SearchIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Input } from '@/components/ui/input'

export function InputSearch() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [localValue, setLocalValue] = useState(searchParams.get('q') || '')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue) {
        setSearchParams((params) => {
          params.set('q', localValue)
          return params
        })
      } else {
        setSearchParams((params) => {
          params.delete('q')
          return params
        })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [localValue, setSearchParams])

  const handleClear = () => {
    setLocalValue('')
    setSearchParams((params) => {
      params.delete('q')
      return params
    })
  }

  return (
    <div className="p-4">
      <div className="relative">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />

        <Input
          type="text"
          placeholder="Buscar produtos"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          className="placeholder:text-muted-foreground pr-10 pl-10 text-sm"
        />

        {localValue && (
          <button
            onClick={handleClear}
            className="absolute top-1/2 right-3 -translate-y-1/2"
            aria-label="Limpar busca"
          >
            <X className="text-muted-foreground size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
