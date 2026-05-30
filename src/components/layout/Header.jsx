import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useFavorite } from '../../context/FavoriteContext'

export default function Header() {
  const { totalCount } = useCart()
  const { favorites } = useFavorite()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/?q=${encodeURIComponent(query.trim())}`)
    } else {
      navigate('/')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
        <Link to="/" className="text-xl font-bold tracking-tight text-primary shrink-0">
          STYLE<span className="text-accent">SHOP</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="商品を検索..."
              className="w-full pl-4 pr-10 py-2 text-sm border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent"
              aria-label="検索"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        <nav className="flex items-center gap-1 ml-auto">
          <Link
            to="/favorites"
            className="relative p-2 rounded-full hover:bg-background transition-colors"
            aria-label={`お気に入り ${favorites.length}件`}
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-accent text-white text-[10px] font-bold rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-background transition-colors"
            aria-label={`カート ${totalCount}点`}
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-accent text-white text-[10px] font-bold rounded-full">
                {totalCount > 9 ? '9+' : totalCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
