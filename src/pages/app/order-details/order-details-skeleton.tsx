import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function OrderDetailsSkeleton() {
  return (
    <div>
      <section className="bg-muted p-4">
        <Skeleton className="mx-auto h-3 w-32" />

        <div className="mt-2 space-y-0.5">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-20" />
          </div>

          <div className="flex justify-between">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </section>

      <section className="space-y-2 border-b p-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-20" />
      </section>

      <section className="space-y-2 border-b p-4">
        <Skeleton className="h-5 w-48" />

        <div className="space-y-3">
          <div className="space-y-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-40" />
          </div>

          <div className="space-y-1">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-48" />
          </div>

          <div className="space-y-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      </section>

      <section className="space-y-2 border-b p-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
      </section>

      <section className="space-y-2 border-b p-4">
        <Skeleton className="h-5 w-24" />

        <div className="space-y-3">
          <div className="space-y-1">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-28" />
          </div>

          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </section>

      <section className="space-y-2 p-4">
        <Skeleton className="h-5 w-32" />

        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-1 items-start gap-2">
                  <Skeleton className="h-4 w-6" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>

                <div className="space-y-1 text-right">
                  <Skeleton className="ml-auto h-4 w-16" />
                  <Skeleton className="ml-auto h-3 w-12" />
                </div>
              </div>

              {i === 0 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted p-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>

          <Separator />

          <div className="flex justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </section>
    </div>
  )
}
