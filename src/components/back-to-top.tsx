import { ArrowUp } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-muted flex justify-center py-6">
      <Button
        variant="ghost"
        onClick={scrollToTop}
        className="w-min max-w-sm gap-1.5"
      >
        Voltar ao topo
        <ArrowUp className="size-4" />
      </Button>
    </div>
  )
}
