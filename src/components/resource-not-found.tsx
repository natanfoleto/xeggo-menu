import type { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

interface ResourceNotFoundProps {
  title?: string
  subtitle?: string
  children?: ReactNode
}

export function ResourceNotFound({
  title = 'Erro',
  subtitle = 'Recurso não encontrado',
  children = null,
}: ResourceNotFoundProps) {
  return (
    <>
      <Helmet title={title} />

      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
          <div className="space-y-1">
            <h3 className="text-lg">{title}</h3>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </>
  )
}
