import { Helmet } from 'react-helmet-async'

import { NavLink } from './nav-link'
import { Button } from './ui/button'

interface ErrorPageProps {
  error?: string
}

export function ErrorPage({ error = 'Erro' }: ErrorPageProps) {
  return (
    <>
      <Helmet title={error} />

      <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
          <div className="space-y-1">
            <h3 className="text-lg">{error ?? 'Erro'}</h3>

            <p className="text-muted-foreground text-sm">
              Peça o link para o restaurante, ou encontre-o na página inicial.
            </p>
          </div>

          <NavLink to="/">
            <Button variant="link" className="font-normal text-violet-700">
              Encontrar restaurante
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  )
}
