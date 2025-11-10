import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ProductImageProps {
  src: string
  alt: string
  children: React.ReactNode
  name: string
  description: string | null
  ingredients: {
    id: string
    name: string
  }[]
}

export function ProductImage({
  src,
  alt,
  children,
  name,
  description,
  ingredients,
}: ProductImageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogOverlay className="bg-background/25" />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <img
            src={src}
            alt={alt}
            className="w-full rounded-md object-contain"
          />

          {ingredients.length > 0 && (
            <p className="text-muted-foreground text-center text-sm font-light">
              {ingredients.map((ingredient) => ingredient.name).join(', ')}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
