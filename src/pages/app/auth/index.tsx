import { Helmet } from 'react-helmet-async'
import { Navigate } from 'react-router-dom'

import { AuthAccount } from '@/components/auth-account'
import { Header } from '@/components/header'
import { useAuth } from '@/contexts/auth-context'

export function Auth() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <Helmet title="Entre ou cadastre-se" />

      <div className="flex min-h-screen max-w-screen-xl flex-col">
        <Header />

        <div className="flex-1 space-y-4 p-4 py-4">
          <p className="text-center font-medium">xeggo</p>

          <div className="space-y-1 text-center">
            <h1>Seus pedidos com mais agilidade e segurança</h1>
            <p className="text-muted-foreground text-sm">
              Faça login e mantenha suas informações salvas para este e os
              próximos pedidos.
            </p>
          </div>

          <p className="text-muted-foreground text-center text-xs">
            Selecione uma opção para continuar:
          </p>

          <AuthAccount />
        </div>
      </div>
    </>
  )
}
