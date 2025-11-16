import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createAddress } from '@/api/customer/addresses/create-address'
import { type Address, getAddress } from '@/api/customer/addresses/get-address'
import { getAddressByCep } from '@/api/customer/addresses/get-address-by-cep'
import type { GetAddressesResponse } from '@/api/customer/addresses/get-addresses'
import { updateAddress } from '@/api/customer/addresses/update-address'
import { FormInput } from '@/components/form/form-input'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { formatCEP } from '@/utils/format-cep'

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

export function SaveAddress() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  const [isSearchingCep, setIsSearchingCep] = useState(false)

  const addressId = searchParams.get('id')
  const isEditing = !!addressId

  const { data: address, isLoading: isLoadingAddress } = useQuery({
    queryKey: ['address', addressId],
    queryFn: () => getAddress({ addressId: addressId! }),
    enabled: isEditing,
  })

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
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

  const zipCode = watch('zipCode')

  function updateAddressesOnCache(newAddress: Address, isNew: boolean) {
    const cached = queryClient.getQueryData<GetAddressesResponse>(['addresses'])

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

      queryClient.setQueryData<GetAddressesResponse>(['addresses'], {
        addresses: updatedAddresses,
      })
    }

    return { cached }
  }

  const { mutateAsync: createAddressFn } = useMutation({
    mutationFn: createAddress,
    onSuccess: (response) => {
      const newAddress: Address = {
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

      queryClient.invalidateQueries({ queryKey: ['addresses'] })

      toast.success('Endereço criado com sucesso!')

      navigate(-1)
    },
  })

  const { mutateAsync: updateAddressFn } = useMutation({
    mutationFn: updateAddress,
    onMutate: (data) => {
      if (!address) return

      const updatedAddress: Address = {
        ...address,
        ...data,
      }

      updateAddressesOnCache(updatedAddress, false)

      return { previousAddress: address }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })

      toast.success('Endereço atualizado com sucesso!')

      navigate(-1)
    },
    onError: (_, __, context) => {
      if (context?.previousAddress) {
        updateAddressesOnCache(context.previousAddress, false)
      }
    },
  })

  const { mutateAsync: getAddressByCepFn } = useMutation({
    mutationFn: getAddressByCep,
  })

  async function handleSaveAddress(data: AddressFormSchema) {
    if (isEditing && addressId) {
      await updateAddressFn({
        addressId,
        ...data,
      })
    } else {
      await createAddressFn(data)
    }
  }

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('zipCode', formatCEP(event.target.value), { shouldDirty: true })
  }

  const handleZipCodeBlur = async () => {
    if (!zipCode || zipCode.replace(/\D/g, '').length !== 8) return

    setIsSearchingCep(true)

    try {
      const addressData = await getAddressByCepFn(zipCode.replace(/\D/g, ''))

      if (!addressData) return

      setValue('street', addressData.street, { shouldDirty: true })
      setValue('neighborhood', addressData.neighborhood, { shouldDirty: true })
      setValue('city', addressData.city, { shouldDirty: true })
      setValue('state', addressData.state, { shouldDirty: true })

      if (addressData.complement) {
        setValue('complement', addressData.complement, { shouldDirty: true })
      }
    } catch (error) {
    } finally {
      setIsSearchingCep(false)
    }
  }

  const isLoading = isLoadingAddress && isEditing

  return (
    <>
      <Helmet title={isEditing ? 'Editar endereço' : 'Novo endereço'} />

      <div className="flex min-h-screen flex-col">
        <PageHeader title={isEditing ? 'Editar endereço' : 'Novo endereço'} />

        <form
          onSubmit={handleSubmit(handleSaveAddress)}
          className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 p-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="zipCode">CEP</Label>
            <div className="relative">
              <FormInput
                id="zipCode"
                className="not-dark:border-muted-foreground text-sm"
                placeholder="00000-000"
                maxLength={9}
                disabled={isLoading || isSearchingCep}
                {...register('zipCode')}
                onChange={handleZipCodeChange}
                onBlur={handleZipCodeBlur}
                error={errors.zipCode?.message}
              />
              {isSearchingCep && (
                <Loader2 className="text-muted-foreground absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin" />
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="street">Rua</Label>
            <FormInput
              id="street"
              className="not-dark:border-muted-foreground text-sm"
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
                className="not-dark:border-muted-foreground text-sm"
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
                className="not-dark:border-muted-foreground text-sm"
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
              className="not-dark:border-muted-foreground text-sm"
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
                className="not-dark:border-muted-foreground text-sm"
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
                className="not-dark:border-muted-foreground text-sm"
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
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Salvar'}
          </Button>
        </form>
      </div>
    </>
  )
}
