import { useParams, Link } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import products from '../data/products.json'
import ProductImage from '../components/product/ProductImage'
import ReviewList from '../components/product/ReviewList'
import ProductCard from '../components/product/ProductCard'
import Badge from '../components/common/Badge'
import StockLabel from '../components/common/StockLabel'
import ShareButton from '../components/common/ShareButton'
import { useCart } from '../context/CartContext'
import { useFavorite } from '../context/FavoriteContext'
import { useHistory } from '../hooks/useHistory'

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { addItem, cart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorite()
  const { addToHistory } = useHistory()

  useEffect(() => {
    if (product) addToHistory(product.id)
    window.scrollTo(0, 0)
  }, [id])

  const recommended = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
  }, [id])

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-gray-400">
        <p className="text-lg font-medium">商品が見つかりませんでした</p>
        <Link to="/" className="mt-4 inline-block text-sm text-accent hover:underline">
          トップへ戻る
        </Link>
      </div>
    )
  }

  const inCart = cart.some((item) => item.productId === product.id)
  const fav = isFavorite(product.id)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-400 mb-6 flex gap-1.5 items-center flex-wrap">
        <Link to="/" className="hover:text-accent">トップ</Link>
        <span>/</span>
        <Link to={`/?category=${encodeURIComponent(product.category)}`} className="hover:text-accent">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-primary truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <ProductImage images={product.images} name={product.name} />

        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-gray-400">{product.category}</p>
              <h1 className="text-2xl font-bold text-primary mt-1 leading-tight">{product.name}</h1>
            </div>
            {product.badge && <Badge type={product.badge} />}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">¥{product.price.toLocaleString()}</span>
            <span className="text-sm text-gray-400">（税込）</span>
          </div>

          <StockLabel stock={product.stock} />

          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => addItem(product.id)}
              disabled={product.stock === 0}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${
                product.stock === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : inCart
                  ? 'bg-accent/10 text-accent border border-accent hover:bg-accent hover:text-white'
                  : 'bg-accent text-white hover:bg-blue-700'
              }`}
            >
              {product.stock === 0 ? '売り切れ' : inCart ? 'カートに追加済み ＋1' : 'カートに追加'}
            </button>

            <button
              onClick={() => toggleFavorite(product.id)}
              className={`p-3 rounded-xl border transition-colors ${
                fav
                  ? 'bg-red-50 border-red-200 text-red-500'
                  : 'border-border text-gray-400 hover:border-red-200 hover:text-red-400'
              }`}
              aria-label={fav ? 'お気に入り解除' : 'お気に入りに追加'}
            >
              <svg className="w-5 h-5" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="pt-1">
            <ShareButton name={product.name} url={window.location.href} />
          </div>

          {inCart && (
            <Link
              to="/cart"
              className="text-center py-3 rounded-xl border border-border text-sm font-medium text-primary hover:bg-background transition-colors"
            >
              カートを見る →
            </Link>
          )}
        </div>
      </div>

      {/* レビュー */}
      <section className="mt-14 border-t border-border pt-10">
        <h2 className="text-lg font-bold text-primary mb-6">カスタマーレビュー</h2>
        <ReviewList reviews={product.reviews} />
      </section>

      {/* おすすめ商品 */}
      {recommended.length > 0 && (
        <section className="mt-14">
          <h2 className="text-lg font-bold text-primary mb-6">同じカテゴリのおすすめ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recommended.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
