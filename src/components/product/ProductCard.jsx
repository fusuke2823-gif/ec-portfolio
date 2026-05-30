import { Link } from 'react-router-dom'
import Badge from '../common/Badge'
import StockLabel from '../common/StockLabel'
import StarRating from '../common/StarRating'
import { useCart } from '../../context/CartContext'
import { useFavorite } from '../../context/FavoriteContext'

function avgRating(reviews) {
  if (!reviews.length) return 0
  return Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length)
}

export default function ProductCard({ product }) {
  const { addItem, cart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorite()
  const inCart = cart.some((item) => item.productId === product.id)
  const fav = isFavorite(product.id)

  return (
    <div className="group bg-surface border border-border rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow h-full">
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden aspect-square">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-2 left-2">
            <Badge type={product.badge} />
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleFavorite(product.id)
          }}
          className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition-colors"
          aria-label={fav ? 'お気に入り解除' : 'お気に入りに追加'}
        >
          <svg
            className={`w-4 h-4 ${fav ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            fill={fav ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </Link>

      <div className="p-3 flex flex-col flex-1 gap-1">
        <p className="text-xs text-gray-400">{product.category}</p>
        <Link to={`/product/${product.id}`} className="text-sm font-medium text-primary hover:text-accent line-clamp-2 leading-snug">
          {product.name}
        </Link>

        <div className="flex items-center gap-1 mt-0.5">
          <StarRating rating={avgRating(product.reviews)} />
          <span className="text-xs text-gray-400">({product.reviews.length})</span>
        </div>

        <div className="flex items-end justify-between mt-auto pt-2">
          <div>
            {product.salePrice != null && (
              <p className="text-xs text-gray-400 line-through">¥{product.price.toLocaleString()}</p>
            )}
            <p className={`text-base font-bold ${product.salePrice != null ? 'text-red-500' : 'text-primary'}`}>
              ¥{(product.salePrice ?? product.price).toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">税込</p>
          </div>
          <StockLabel stock={product.stock} />
        </div>

        <button
          onClick={() => addItem(product.id)}
          disabled={product.stock === 0}
          className={`mt-2 w-full py-2 rounded-lg text-sm font-medium transition-colors ${
            product.stock === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : inCart
              ? 'bg-accent/10 text-accent border border-accent hover:bg-accent hover:text-white'
              : 'bg-accent text-white hover:bg-blue-700'
          }`}
        >
          {product.stock === 0 ? '売り切れ' : inCart ? 'カートに追加済' : 'カートに追加'}
        </button>
      </div>
    </div>
  )
}
