import { createContext, useContext, useState, useEffect } from 'react'

const FavoriteContext = createContext(null)

const STORAGE_KEY = 'favorites'

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const isFavorite = (productId) => favorites.includes(productId)

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  )
}

export function useFavorite() {
  const ctx = useContext(FavoriteContext)
  if (!ctx) throw new Error('useFavorite must be used within FavoriteProvider')
  return ctx
}
