import { Loader2 } from 'lucide-react'

interface LoadingPageProps {
  text?: string
}

export function LoadingPage({ text = 'Carregando...' }: LoadingPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Loader2 className="size-7 animate-spin stroke-1" />

      {text && <p className="text-muted-foreground text-sm">{text}</p>}
    </div>
  )
}
