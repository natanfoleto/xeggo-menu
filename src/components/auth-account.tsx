import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { authenticateFromGoogle } from '@/api/public/authentication/authenticate-from-google'
import { authenticateFromLink } from '@/api/public/authentication/authenticate-from-link'
import { FormInput } from '@/components/form/form-input'
import { GoogleIcon } from '@/components/icon/google-icon'
import { Button } from '@/components/ui/button'

interface AuthAccountProps {
  slug?: string | null
}

const signInSchema = z.object({
  email: z.string().email(),
})

type SignInSchema = z.infer<typeof signInSchema>

export function AuthAccount({ slug }: AuthAccountProps) {
  const [searchParams] = useSearchParams()

  const [showEmailForm, setShowEmailForm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticateFromLinkFn } = useMutation({
    mutationFn: authenticateFromLink,
  })

  async function handleAuthenticateFromLink({ email }: SignInSchema) {
    try {
      await authenticateFromLinkFn({ email })

      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => authenticateFromLinkFn({ email }),
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  async function handleAuthenticateFromGoogle() {
    await authenticateFromGoogle({ slug })
  }

  return (
    <div className="space-y-4">
      {!showEmailForm ? (
        <div className="space-y-2">
          <Button
            onClick={() => setShowEmailForm(true)}
            variant="outline"
            className="not-dark:border-muted-foreground w-full font-normal"
          >
            <Mail className="size-4" />
            Continuar com e-mail
          </Button>

          <Button
            onClick={handleAuthenticateFromGoogle}
            variant="outline"
            className="not-dark:border-muted-foreground w-full font-normal"
          >
            <GoogleIcon />
            Continuar com Google
          </Button>
        </div>
      ) : (
        <div className="space-y-1">
          <form
            onSubmit={handleSubmit(handleAuthenticateFromLink)}
            className="space-y-2"
          >
            <FormInput
              id="email"
              type="email"
              placeholder="E-mail"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="not-dark:border-muted-foreground text-center text-sm"
              {...register('email')}
            />

            <Button
              type="submit"
              variant="outline"
              className="not-dark:border-muted-foreground w-full font-normal"
              disabled={isSubmitting}
            >
              Continuar
            </Button>
          </form>

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
