import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { type GetCustomerProfileResponse } from '@/api/customers/get-customer-profile'
import {
  updateCustomerProfile,
  type UpdateCustomerProfileRequest,
} from '@/api/customers/update-customer-profile'
import { BottomNavigation } from '@/components/bottom-navigation'
import { FormInput } from '@/components/form/form-input'
import { FormPhoneInput } from '@/components/form/form-phone-input'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth-context'

const customerProfileFormSchema = z.object({
  name: z.string().min(1, { message: 'Informe seu nome completo' }),
  email: z.string().email({ message: 'Informe um e-mail válido' }),
  phone: z.string().nullable(),
})

type CustomerProfileFormSchema = z.infer<typeof customerProfileFormSchema>

export function UpdateProfile() {
  const queryClient = useQueryClient()

  const { user, isLoading: isLoadingProfile } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<CustomerProfileFormSchema>({
    resolver: zodResolver(customerProfileFormSchema),
    values: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? null,
    },
  })

  function updateProfileDataOnCache({
    name,
    phone,
  }: UpdateCustomerProfileRequest) {
    const cached = queryClient.getQueryData<GetCustomerProfileResponse>([
      'customer-profile',
    ])

    if (cached) {
      queryClient.setQueryData<GetCustomerProfileResponse>(
        ['customer-profile'],
        {
          ...cached,
          name,
          phone,
        },
      )
    }

    return { cached }
  }

  const { mutateAsync: updateCustomerProfileFn } = useMutation({
    mutationFn: updateCustomerProfile,
    onMutate: ({ name, phone }: UpdateCustomerProfileRequest) => {
      const { cached } = updateProfileDataOnCache({ name, phone })

      return { previousCustomerProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousCustomerProfile) {
        updateProfileDataOnCache(context.previousCustomerProfile)
      }
    },
  })

  async function handleUpdateCustomerProfile(data: CustomerProfileFormSchema) {
    await updateCustomerProfileFn({
      name: data.name,
      phone: data.phone,
    })
  }

  return (
    <>
      <Helmet title="Meu perfil" />

      <div className="flex min-h-screen flex-col pb-16">
        <PageHeader title="Meu perfil" />

        <form
          onSubmit={handleSubmit(handleUpdateCustomerProfile)}
          className="flex flex-1 flex-col gap-4 p-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="name">Nome completo</Label>
            <FormInput
              id="name"
              className="border-muted-foreground text-sm"
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
              className="border-muted-foreground text-sm"
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
              className="border-muted-foreground text-sm"
              error={errors.phone?.message}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoadingProfile || isSubmitting || !isDirty}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </div>

      <BottomNavigation />
    </>
  )
}
