import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'cartItems'

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.productId === action.productId)
      if (existing) {
        return state.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...state, { productId: action.productId, quantity: 1 }]
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.productId !== action.productId)
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return state.filter((item) => item.productId !== action.productId)
      }
      return state.map((item) =>
        item.productId === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      )
    case 'CLEAR_CART':
      return []
    case 'INIT':
      return action.payload
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) dispatch({ type: 'INIT', payload: JSON.parse(saved) })
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addItem = (productId) => dispatch({ type: 'ADD_ITEM', productId })
  const removeItem = (productId) => dispatch({ type: 'REMOVE_ITEM', productId })
  const updateQuantity = (productId, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart, totalCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
