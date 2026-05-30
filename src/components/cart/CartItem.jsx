import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function CartItem({ product, quantity }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-0">
      <Link to={`/product/${product.id}`} className="shrink-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-lg border border-border"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          to={`/product/${product.id}`}
          className="text-sm font-medium text-primary hover:text-accent line-clamp-2"
        >
          {product.name}
        </Link>
        <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
        <p className="text-sm font-bold text-primary mt-1">
          ¥{((product.salePrice ?? product.price) * quantity).toLocaleString()}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="w-7 h-7 flex items-center justify-center rounded border border-border hover:bg-background text-primary transition-colors"
            aria-label="数量を減らす"
          >
            −
          </button>
          <span className="text-sm font-medium w-6 text-center">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            disabled={quantity >= product.stock}
            className="w-7 h-7 flex items-center justify-center rounded border border-border hover:bg-background text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="数量を増やす"
          >
            ＋
          </button>
          <button
            onClick={() => removeItem(product.id)}
            className="ml-auto text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  )
}
