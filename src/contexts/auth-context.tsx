import { useQuery } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import type { Address } from '@/api/customer/addresses/get-addresses'
import { getAddresses } from '@/api/customer/addresses/get-addresses'
import { authCheck } from '@/api/customer/profile/auth-check'
import {
  getProfile,
  type GetProfileResponse,
} from '@/api/customer/profile/get-profile'
import { signOut } from '@/api/public/authentication/sign-out'
import { useStorage } from '@/hooks/use-storage'
import { resetOrder } from '@/utils/reset-order'

export interface CustomerProfile extends GetProfileResponse {}

interface AuthContextData {
  user: CustomerProfile | null
  address: Address | null
  addresses: Address[]
  isLoading: boolean
  isAuthenticated: boolean
  isCheckingAuth: boolean
  refetch: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useStorage<CustomerProfile | null>('user', null)
  const [address, setAddress] = useState<Address | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])

  const {
    data: authCheckData,
    isError: isAuthCheckError,
    isLoading: isLoadingAuthCheck,
  } = useQuery({
    queryKey: ['auth-check'],
    queryFn: authCheck,
    retry: false,
    staleTime: Infinity,
  })

  const isAuthCheckSuccess = authCheckData?.authenticated === true

  const {
    data: customerData,
    isLoading: isLoadingCustomerData,
    refetch: refetchCustomerData,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: isAuthCheckSuccess,
  })

  const { data: addressesData } = useQuery({
    queryKey: ['addresses'],
    queryFn: getAddresses,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: isAuthCheckSuccess && !!customerData,
  })

  useEffect(() => {
    if (isAuthCheckError) {
      setUser(null)
      setAddress(null)
      setAddresses([])
    }
  }, [isAuthCheckError, setUser])

  useEffect(() => {
    if (customerData) setUser(customerData)
  }, [customerData, setUser])

  useEffect(() => {
    if (addressesData?.addresses) {
      setAddresses(addressesData.addresses)

      const activeAddress = addressesData.addresses.find(
        (addr) => addr.isActive,
      )

      setAddress(activeAddress || null)
    }
  }, [addressesData])

  const refetch = async () => {
    await refetchCustomerData()
  }

  const logout = () => {
    setUser(null)
    setAddress(null)
    setAddresses([])
    resetOrder()
    signOut()
  }

  const isAuthenticated = isAuthCheckSuccess && user !== null
  const isLoading = isLoadingAuthCheck || isLoadingCustomerData

  return (
    <AuthContext.Provider
      value={{
        user,
        address,
        addresses,
        isLoading,
        isAuthenticated,
        isCheckingAuth:
          !isAuthCheckError && !customerData && !isAuthCheckSuccess,
        refetch,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
