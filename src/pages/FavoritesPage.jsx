import { Link } from 'react-router-dom'
import { useFavorite } from '../context/FavoriteContext'
import products from '../data/products.json'
import ProductCard from '../components/product/ProductCard'

export default function FavoritesPage() {
  const { favorites } = useFavorite()
  const favoriteProducts = favorites
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-8">
        お気に入り
        {favoriteProducts.length > 0 && (
          <span className="ml-2 text-sm font-normal text-gray-400">
            {favoriteProducts.length}件
          </span>
        )}
      </h1>

      {favoriteProducts.length === 0 ? (
        <div className="py-20 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="text-gray-400 mb-6">お気に入りに登録された商品がありません</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-accent text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            商品を探す
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
