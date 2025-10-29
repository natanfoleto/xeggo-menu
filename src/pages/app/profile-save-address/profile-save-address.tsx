import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createCustomerAddress } from '@/api/addresses/create-customer-address'
import {
  getCustomerAddress,
  type GetCustomerAddressResponse,
} from '@/api/addresses/get-customer-address'
import type { GetCustomerAddressesResponse } from '@/api/addresses/get-customer-addresses'
import { updateCustomerAddress } from '@/api/addresses/update-customer-address'
import { BottomNavigation } from '@/components/bottom-navigation'
import { FormInput } from '@/components/form/form-input'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const addressFormSchema = z.object({
  zipCode: z
    .string()
    .min(8, { message: 'CEP inválido' })
    .max(10, { message: 'CEP inválido' }),
  street: z.string().min(1, { message: 'Informe a rua' }),
  number: z.string().min(1, { message: 'Informe o número' }),
  complement: z.string().optional().nullable(),
  neighborhood: z.string().min(1, { message: 'Informe o bairro' }),
  city: z.string().min(1, { message: 'Informe a cidade' }),
  state: z
    .string()
    .length(2, { message: 'Estado deve ter 2 caracteres' })
    .toUpperCase(),
  isActive: z.boolean(),
})

type AddressFormSchema = z.infer<typeof addressFormSchema>

export function ProfileSaveAddress() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  const addressId = searchParams.get('id')
  const isEditing = !!addressId

  const { data: address, isLoading: isLoadingAddress } = useQuery({
    queryKey: ['customer-address', addressId],
    queryFn: () => getCustomerAddress({ addressId: addressId! }),
    enabled: isEditing,
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<AddressFormSchema>({
    resolver: zodResolver(addressFormSchema),
    values: isEditing
      ? {
          zipCode: address?.zipCode ?? '',
          street: address?.street ?? '',
          number: address?.number ?? '',
          complement: address?.complement ?? null,
          neighborhood: address?.neighborhood ?? '',
          city: address?.city ?? '',
          state: address?.state ?? '',
          isActive: address?.isActive ?? false,
        }
      : {
          zipCode: '',
          street: '',
          number: '',
          complement: null,
          neighborhood: '',
          city: '',
          state: '',
          isActive: false,
        },
  })

  function updateAddressesOnCache(
    newAddress: GetCustomerAddressResponse,
    isNew: boolean,
  ) {
    const cached = queryClient.getQueryData<GetCustomerAddressesResponse>([
      'customer-addresses',
    ])

    if (cached) {
      let updatedAddresses = [...cached.addresses]

      if (isNew) {
        if (newAddress.isActive) {
          updatedAddresses = updatedAddresses.map((addr) => ({
            ...addr,
            isActive: false,
          }))
        }

        updatedAddresses.push(newAddress)
      } else {
        updatedAddresses = updatedAddresses.map((addr) => {
          if (addr.id === newAddress.id) {
            return newAddress
          }

          if (newAddress.isActive && addr.isActive) {
            return { ...addr, isActive: false }
          }

          return addr
        })
      }

      queryClient.setQueryData<GetCustomerAddressesResponse>(
        ['customer-addresses'],
        {
          addresses: updatedAddresses,
        },
      )
    }

    return { cached }
  }

  const { mutateAsync: createAddress } = useMutation({
    mutationFn: createCustomerAddress,
    onSuccess: (response) => {
      const newAddress: GetCustomerAddressResponse = {
        id: response.addressId,
        zipCode: '',
        street: '',
        number: '',
        complement: null,
        neighborhood: '',
        city: '',
        state: '',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      updateAddressesOnCache(newAddress, true)

      queryClient.invalidateQueries({ queryKey: ['customer-addresses'] })

      toast.success('Endereço criado com sucesso!')

      navigate(-1)
    },
  })

  const { mutateAsync: updateAddress } = useMutation({
    mutationFn: updateCustomerAddress,
    onMutate: (data) => {
      if (!address) return

      const updatedAddress: GetCustomerAddressResponse = {
        ...address,
        ...data,
      }

      updateAddressesOnCache(updatedAddress, false)

      return { previousAddress: address }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-addresses'] })

      toast.success('Endereço atualizado com sucesso!')

      navigate(-1)
    },
    onError: (_, __, context) => {
      if (context?.previousAddress) {
        updateAddressesOnCache(context.previousAddress, false)
      }
    },
  })

  async function handleSaveAddress(data: AddressFormSchema) {
    if (isEditing && addressId) {
      await updateAddress({
        addressId,
        ...data,
      })
    } else {
      await createAddress(data)
    }
  }

  const isLoading = isLoadingAddress && isEditing

  return (
    <>
      <Helmet title={isEditing ? 'Editar endereço' : 'Novo endereço'} />

      <div className="flex min-h-screen flex-col pb-16">
        <PageHeader title={isEditing ? 'Editar endereço' : 'Novo endereço'} />

        <form
          onSubmit={handleSubmit(handleSaveAddress)}
          className="flex flex-1 flex-col gap-4 p-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="zipCode">CEP</Label>
            <FormInput
              id="zipCode"
              className="border-muted-foreground text-sm"
              placeholder="00000-000"
              disabled={isLoading}
              {...register('zipCode')}
              error={errors.zipCode?.message}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="street">Rua</Label>
            <FormInput
              id="street"
              className="border-muted-foreground text-sm"
              placeholder="Nome da rua"
              disabled={isLoading}
              {...register('street')}
              error={errors.street?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="number">Número</Label>
              <FormInput
                id="number"
                className="border-muted-foreground text-sm"
                placeholder="123"
                disabled={isLoading}
                {...register('number')}
                error={errors.number?.message}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="complement">Complemento</Label>
              <FormInput
                id="complement"
                className="border-muted-foreground text-sm"
                placeholder="Apto, Casa..."
                disabled={isLoading}
                {...register('complement')}
                error={errors.complement?.message}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="neighborhood">Bairro</Label>
            <FormInput
              id="neighborhood"
              className="border-muted-foreground text-sm"
              placeholder="Nome do bairro"
              disabled={isLoading}
              {...register('neighborhood')}
              error={errors.neighborhood?.message}
            />
          </div>

          <div className="grid grid-cols-[1fr_80px] gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="city">Cidade</Label>
              <FormInput
                id="city"
                className="border-muted-foreground text-sm"
                placeholder="Nome da cidade"
                disabled={isLoading}
                {...register('city')}
                error={errors.city?.message}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="state">Estado</Label>
              <FormInput
                id="state"
                className="border-muted-foreground text-sm"
                placeholder="SP"
                maxLength={2}
                disabled={isLoading}
                {...register('state')}
                error={errors.state?.message}
              />
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="isActive"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              )}
            />
            <Label
              htmlFor="isActive"
              className="text-sm leading-none font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Definir como endereço principal
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isLoading || isSubmitting || !isDirty}
            className="w-full"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </div>

      <BottomNavigation />
    </>
  )
}
