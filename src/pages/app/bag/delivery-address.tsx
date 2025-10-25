import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

export function DeliveryAddress() {
  const { address } = useAuth()

  const handleAddAddress = () => {
    console.log('Adicionar endereço')
  }

  return (
    <div className="space-y-2 border-t p-4">
      <h2 className="text-sm">Endereço de entrega</h2>

      {address ? (
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm">
              {address.street}, {address.number}
            </p>

            {address.complement && (
              <p className="text-muted-foreground text-xs">
                {address.complement} - {address.neighborhood}
              </p>
            )}

            <p className="text-muted-foreground text-xs">
              CEP {address.zipCode} - {address.state} - {address.city}
            </p>
          </div>

          <NavLink to="/address">
            <Button
              variant="link"
              className="px-0 text-xs"
              onClick={handleAddAddress}
            >
              Alterar endereço
            </Button>
          </NavLink>
        </div>
      ) : (
        <NavLink to="/address">
          <Button
            variant="link"
            className="w-full text-xs"
            onClick={handleAddAddress}
          >
            Adicionar endereço
          </Button>
        </NavLink>
      )}
    </div>
  )
}
