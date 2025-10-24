import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

type Response<T> = [T, Dispatch<SetStateAction<T>>]

const useStorage = <T>(key: string, initialState: T): Response<T> => {
  const [state, setState] = useState<T>(() => {
    const storageValue = localStorage.getItem(key)

    if (storageValue) {
      return JSON.parse(storageValue)
    } else {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

export { useStorage }
