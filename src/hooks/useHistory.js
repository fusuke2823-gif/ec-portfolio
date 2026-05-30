import { useLocalStorage } from './useLocalStorage'

const MAX_HISTORY = 10

export function useHistory() {
  const [history, setHistory] = useLocalStorage('viewHistory', [])

  const addToHistory = (productId) => {
    setHistory((prev) => {
      const filtered = prev.filter((id) => id !== productId)
      return [productId, ...filtered].slice(0, MAX_HISTORY)
    })
  }

  return { history, addToHistory }
}
