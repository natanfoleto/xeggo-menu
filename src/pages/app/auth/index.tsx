import { Helmet } from 'react-helmet-async'
import { Navigate } from 'react-router-dom'

import { AuthAccount } from '@/components/auth-account'
import { Header } from '@/components/header'
import { BrandIcon } from '@/components/icon/brand-icon'
import { useAuth } from '@/contexts/auth-context'

export function Auth() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <Helmet title="Entre ou cadastre-se" />

      <div className="flex flex-col">
        <Header />

        <div className="mx-auto w-full max-w-7xl flex-1 space-y-8 p-4 py-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <span className="text-foreground self-center rounded-lg bg-violet-500 p-3">
                <BrandIcon className="size-12 fill-white" />
              </span>
            </div>

            <div className="space-y-1 text-center">
              <h1>Seus pedidos com mais agilidade e segurança</h1>
              <p className="text-muted-foreground text-sm">
                Faça login e mantenha suas informações salvas para este e os
                próximos pedidos.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground text-center text-xs">
              Selecione uma opção para continuar:
            </p>

            <AuthAccount />
          </div>
        </div>
      </div>
    </>
  )
}
