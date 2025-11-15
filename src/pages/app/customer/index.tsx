import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { type GetProfileResponse } from '@/api/customer/profile/get-profile'
import {
  updateProfile,
  type UpdateProfileRequest,
} from '@/api/customer/profile/update-profile'
import { FormInput } from '@/components/form/form-input'
import { FormPhoneInput } from '@/components/form/form-phone-input'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth-context'

const profileSchema = z.object({
  name: z.string().min(1, { message: 'Informe seu nome completo' }),
  email: z.string().email({ message: 'Informe um e-mail válido' }),
  phone: z.string().nullable(),
})

type ProfileSchema = z.infer<typeof profileSchema>

export function Customer() {
  const queryClient = useQueryClient()

  const { user, isLoading: isLoadingProfile } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    values: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? null,
    },
  })

  function updateProfileDataOnCache({ name, phone }: UpdateProfileRequest) {
    const cached = queryClient.getQueryData<GetProfileResponse>(['profile'])

    if (cached) {
      queryClient.setQueryData<GetProfileResponse>(['profile'], {
        profile: {
          ...cached.profile,
          name,
          phone,
        },
      })
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ name, phone }: UpdateProfileRequest) => {
      const { cached } = updateProfileDataOnCache({ name, phone })

      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        queryClient.setQueryData<GetProfileResponse>(
          ['profile'],
          context.previousProfile,
        )
      }
    },
  })

  async function handleUpdateProfile(data: ProfileSchema) {
    await updateProfileFn({
      name: data.name,
      phone: data.phone,
    })
  }

  return (
    <>
      <Helmet title="Meus dados - Xeggo" />

      <div className="flex min-h-screen flex-col">
        <PageHeader title="Meus dados" />

        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 p-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="name">Nome completo</Label>
            <FormInput
              id="name"
              className="not-dark:border-muted-foreground text-sm"
              placeholder="Seu nome completo"
              autoCorrect="off"
              disabled={isLoadingProfile}
              {...register('name')}
              error={errors.name?.message}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <FormInput
              id="email"
              type="email"
              className="not-dark:border-muted-foreground text-sm"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled
              {...register('email')}
              error={errors.email?.message}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Celular</Label>
            <FormPhoneInput
              value={watch('phone') ?? undefined}
              onChange={(value) =>
                setValue('phone', value, { shouldDirty: true })
              }
              disabled={isSubmitting || isLoadingProfile}
              className="not-dark:border-muted-foreground text-sm"
              error={errors.phone?.message}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoadingProfile || isSubmitting || !isDirty}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Salvar'}
          </Button>
        </form>
      </div>
    </>
  )
}
