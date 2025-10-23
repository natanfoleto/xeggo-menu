// src/components/image-modal.tsx
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ImageModalProps {
  src: string
  alt: string
  children: React.ReactNode
}

export function ImageModal({ src, alt, children }: ImageModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogOverlay className="bg-background" />

      <DialogContent className="flex h-screen max-h-screen w-screen max-w-none items-center justify-center rounded-none border-0 p-4">
        <img
          src={src}
          alt={alt}
          className="max-h-[90vh] max-w-full rounded-md object-contain"
        />
      </DialogContent>
    </Dialog>
  )
}
