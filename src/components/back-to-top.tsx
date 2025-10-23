import { ArrowUp } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-muted flex justify-center py-6">
      <Button
        variant="link"
        onClick={scrollToTop}
        className="text-md w-full max-w-sm gap-1.5"
      >
        Voltar ao topo
        <ArrowUp className="size-5" />
      </Button>
    </div>
  )
}
