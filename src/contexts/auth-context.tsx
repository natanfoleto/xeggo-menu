import { useQuery } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import type { CustomerAddress } from '@/api/addresses/get-customer-addresses'
import { getCustomerAddresses } from '@/api/addresses/get-customer-addresses'
import { signOut } from '@/api/auth/sign-out'
import { authCheckCustomer } from '@/api/customers/auth-check-customer'
import {
  getCustomerProfile,
  type GetCustomerProfileResponse,
} from '@/api/customers/get-customer-profile'
import { useStorage } from '@/hooks/use-storage'

export interface CustomerProfile extends GetCustomerProfileResponse {}

interface AuthContextData {
  user: CustomerProfile | null
  address: CustomerAddress | null
  addresses: CustomerAddress[]
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
  const [address, setAddress] = useState<CustomerAddress | null>(null)
  const [addresses, setAddresses] = useState<CustomerAddress[]>([])

  const { isError: isAuthCheckError } = useQuery({
    queryKey: ['auth-check'],
    queryFn: authCheckCustomer,
    retry: false,
    staleTime: Infinity,
    enabled: true,
  })

  const {
    data: customerData,
    isLoading: isLoadingCustomerData,
    refetch: refetchCustomerData,
  } = useQuery({
    queryKey: ['customer-profile'],
    queryFn: getCustomerProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: !isAuthCheckError,
  })

  const { data: addressesData } = useQuery({
    queryKey: ['customer-addresses'],
    queryFn: getCustomerAddresses,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: !isAuthCheckError && !!customerData,
  })

  useEffect(() => {
    if (isAuthCheckError) {
      setUser(null)
      setAddress(null)
      setAddresses([])
      signOut()
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
    signOut()
  }

  const isAuthenticated = !isAuthCheckError && user !== null
  const isLoading = isLoadingCustomerData

  return (
    <AuthContext.Provider
      value={{
        user,
        address,
        addresses,
        isLoading,
        isAuthenticated,
        isCheckingAuth: !isAuthCheckError && !customerData,
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
