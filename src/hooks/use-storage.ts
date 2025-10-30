import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

import { env } from '@/env'

type Response<T> = [T, Dispatch<SetStateAction<T>>]

const useStorage = <T>(key: string, initialState: T): Response<T> => {
  const [state, setState] = useState<T>(() => {
    const storageValue = localStorage.getItem(
      `${env.VITE_STORAGE_PREFIX}-${key}`,
    )

    if (storageValue) {
      return JSON.parse(storageValue)
    } else {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(
      `${env.VITE_STORAGE_PREFIX}-${key}`,
      JSON.stringify(state),
    )
  }, [key, state])

  return [state, setState]
}

export { useStorage }
