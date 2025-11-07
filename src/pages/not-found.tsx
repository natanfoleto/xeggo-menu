import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <>
      <Helmet title="Página não encontrada" />

      <div className="flex h-screen flex-col items-center justify-center gap-1">
        <h1>Página não encontrada</h1>
        <p className="text-muted-foreground text-xs">
          Infelizmente não encontramos a página que você acessou
        </p>

        <p className="text-muted-foreground text-sm">
          <Link className="text-violet-400 dark:text-violet-400" to="/">
            <Button variant="link" className="font-normal text-violet-700">
              Voltar para o início
            </Button>
          </Link>
        </p>
      </div>
    </>
  )
}
