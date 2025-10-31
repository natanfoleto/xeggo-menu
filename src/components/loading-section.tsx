import { Loader2 } from 'lucide-react'

interface LoadingSectionProps {
  text?: string
}

export function LoadingSection({ text }: LoadingSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16">
      <Loader2 className="size-7 animate-spin" />

      {text && <p className="text-sm">{text}</p>}
    </div>
  )
}
