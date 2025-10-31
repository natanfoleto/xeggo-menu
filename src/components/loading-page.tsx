import { Loader2 } from 'lucide-react'

interface LoadingPageProps {
  text?: string
}

export function LoadingPage({ text = 'Carregando...' }: LoadingPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Loader2 className="size-5 animate-spin" />

      {text && <p>{text}</p>}
    </div>
  )
}
