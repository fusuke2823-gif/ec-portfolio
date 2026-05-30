import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/cart/CartItem'
import products from '../data/products.json'

const SHIPPING_THRESHOLD = 3000
const SHIPPING_FEE = 500

export default function CartPage() {
  const { cart } = useCart()

  const cartProducts = cart.map((item) => ({
    product: products.find((p) => p.id === item.productId),
    quantity: item.quantity,
  })).filter((item) => item.product)

  const subtotal = cartProducts.reduce(
    (sum, { product, quantity }) => sum + (product.salePrice ?? product.price) * quantity,
    0
  )
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p className="text-gray-400 mb-6">カートに商品が入っていません</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-accent text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          商品を見る
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-8">ショッピングカート</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-4">
          {cartProducts.map(({ product, quantity }) => (
            <CartItem key={product.id} product={product} quantity={quantity} />
          ))}
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 h-fit sticky top-24">
          <h2 className="text-base font-bold text-primary mb-4">注文サマリー</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>小計（{cart.reduce((s, i) => s + i.quantity, 0)}点）</span>
              <span>¥{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>送料</span>
              <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                {shipping === 0 ? '無料' : `¥${shipping.toLocaleString()}`}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gray-400">
                あと¥{(SHIPPING_THRESHOLD - subtotal).toLocaleString()}で送料無料
              </p>
            )}
            <div className="border-t border-border pt-3 flex justify-between font-bold text-primary">
              <span>合計（税込）</span>
              <span className="text-lg">¥{total.toLocaleString()}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-5 block w-full py-3 bg-accent text-white text-center rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            購入手続きへ
          </Link>
          <Link
            to="/"
            className="mt-2 block w-full py-2.5 text-center text-sm text-gray-500 hover:text-accent transition-colors"
          >
            ← 買い物を続ける
          </Link>
        </div>
      </div>
    </div>
  )
}
