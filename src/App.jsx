import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { FavoriteProvider } from './context/FavoriteContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import CompletePage from './pages/CompletePage'
import FavoritesPage from './pages/FavoritesPage'

export default function App() {
  return (
    <CartProvider>
      <FavoriteProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/complete" element={<CompletePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FavoriteProvider>
    </CartProvider>
  )
}
