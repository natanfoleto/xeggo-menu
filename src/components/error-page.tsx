import { SearchX } from 'lucide-react'

interface ErrorPageProps {
  error?: string | null
}

export function ErrorPage({ error }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <SearchX className="size-8 stroke-1" />

      {error && <p className="text-muted-foreground text-sm">{error}</p>}
    </div>
  )
}
