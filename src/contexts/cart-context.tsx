import { createContext, useEffect, useState } from 'react'

export interface CartItem {
  id: string
  product: {
    id: string
    name: string
    imageUrl: string
    defaultPriceId: string
    price: number
    description: string
  }
}

interface CartContextType {
  itensList: CartItem[]
  addNewItem: (newItem: CartItem) => void
  removeItem: (id: string) => void
  removeAllItens: () => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: React.ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [itensList, setItensList] = useState<CartItem[]>([])

  function addNewItem(newItem: CartItem) {
    setItensList((state) => [...state, newItem])
  }

  function removeItem(id: string) {
    const newList = itensList.filter((item) => item.id !== id)
    setItensList(newList)

    const stateJSON = JSON.stringify(newList)
    localStorage.setItem('@ignite-shop:cart-items-1.0.0', stateJSON)
  }

  function removeAllItens() {
    const EmptyItemList = [] as CartItem[]
    setItensList(EmptyItemList)

    const stateJSON = JSON.stringify(EmptyItemList)
    localStorage.setItem('@ignite-shop:cart-items-1.0.0', stateJSON)
  }

  useEffect(() => {
    const storageStateAsJSON = localStorage.getItem(
      '@ignite-shop:cart-items-1.0.0'
    )
    if (storageStateAsJSON) {
      setItensList(JSON.parse(storageStateAsJSON))
    }
  }, [])

  useEffect(() => {
    if (itensList.length > 0) {
      const stateJSON = JSON.stringify(itensList)
      localStorage.setItem('@ignite-shop:cart-items-1.0.0', stateJSON)
    }
  }, [itensList])

  return (
    <CartContext.Provider
      value={{
        itensList,
        addNewItem,
        removeItem,
        removeAllItens,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
