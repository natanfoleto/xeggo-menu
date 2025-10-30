import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signInWithGoogle } from '@/api/auth/sign-in-with-google'
import { signInWithLink } from '@/api/auth/sign-in-with-link'
import { FormInput } from '@/components/form/form-input'
import { GoogleIcon } from '@/components/google-icon'
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

  const { mutateAsync: authenticateWithLink } = useMutation({
    mutationFn: signInWithLink,
  })

  async function handleAuthenticateWithLink({ email }: SignInSchema) {
    try {
      await authenticateWithLink({ email })

      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => authenticateWithLink({ email }),
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  async function handleSignInWithGoogle() {
    await signInWithGoogle({ slug })
  }

  return (
    <div className="space-y-4 px-4 pb-8">
      {!showEmailForm ? (
        <div className="space-y-2">
          <Button
            onClick={() => setShowEmailForm(true)}
            variant="outline"
            className="not-dark:border-muted-foreground w-full"
          >
            <Mail className="size-4" />
            Continuar com e-mail
          </Button>

          <Button
            onClick={handleSignInWithGoogle}
            variant="outline"
            className="not-dark:border-muted-foreground w-full"
          >
            <GoogleIcon />
            Continuar com Google
          </Button>
        </div>
      ) : (
        <div className="space-y-1">
          <form
            onSubmit={handleSubmit(handleAuthenticateWithLink)}
            className="space-y-2"
          >
            <FormInput
              id="email"
              type="email"
              placeholder="E-mail"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="not-dark:border-muted-foreground text-sm"
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
