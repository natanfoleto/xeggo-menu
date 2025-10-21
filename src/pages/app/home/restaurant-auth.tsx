import { Mail } from 'lucide-react'
import { useState } from 'react'

import { signInWithGoogle } from '@/api/auth/sign-in-with-google'
import { FormInput } from '@/components/form/form-input'
import { GoogleIcon } from '@/components/google-icon'
import { Button } from '@/components/ui/button'

export function RestaurantAuth() {
  const [showEmailForm, setShowEmailForm] = useState(false)

  return (
    <div className="space-y-4">
      <p className="text-center text-sm">
        Faça login e peça com mais agilidade
      </p>

      {!showEmailForm ? (
        <div className="space-y-2">
          <Button
            onClick={() => setShowEmailForm(true)}
            variant="outline"
            className="w-full"
          >
            <Mail className="size-4" />
            Continuar com e-mail
          </Button>

          <Button
            onClick={signInWithGoogle}
            variant="secondary"
            className="w-full"
          >
            <GoogleIcon />
            Continuar com Google
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <FormInput
            id="email"
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            className="text-sm"
          />

          <Button type="submit" className="w-full" variant="outline">
            Continuar
          </Button>

          <Button
            type="button"
            variant="link"
            onClick={() => setShowEmailForm(false)}
            className="text-muted-foreground w-full text-sm font-normal"
          >
            Outras opções de login
          </Button>
        </div>
      )}
    </div>
  )
}
