import { LogOut } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

export function ProfileLogout() {
  const { logout } = useAuth()

  return (
    <div className="space-y-4 p-4">
      <Button
        onClick={logout}
        variant="secondary"
        className="w-full font-normal"
      >
        <LogOut className="text-muted-foreground size-4" />
        Sair
      </Button>

      <p className="text-muted-foreground text-center text-xs">
        Seu cadastro é válido em qualquer restaurante com Delivery da Xeggo.
      </p>
    </div>
  )
}
