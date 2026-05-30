import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import products from '../data/products.json'

const SHIPPING_THRESHOLD = 3000
const SHIPPING_FEE = 500

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'お名前を入力してください'
  if (!form.zip.trim()) errors.zip = '郵便番号を入力してください'
  else if (!/^\d{7}$/.test(form.zip.replace('-', ''))) errors.zip = '郵便番号は7桁の数字で入力してください'
  if (!form.address.trim()) errors.address = '住所を入力してください'
  if (!form.phone.trim()) errors.phone = '電話番号を入力してください'
  else if (!/^[\d-]{10,13}$/.test(form.phone)) errors.phone = '電話番号が正しくありません'
  return errors
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', zip: '', address: '', phone: '' })
  const [errors, setErrors] = useState({})

  const cartProducts = cart.map((item) => ({
    product: products.find((p) => p.id === item.productId),
    quantity: item.quantity,
  })).filter((item) => item.product)

  const subtotal = cartProducts.reduce((s, { product, quantity }) => s + (product.salePrice ?? product.price) * quantity, 0)
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((err) => ({ ...err, [e.target.name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase()
    clearCart()
    navigate('/complete', { state: { orderNumber, total } })
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 mb-4">カートが空です</p>
        <Link to="/" className="text-sm text-accent hover:underline">トップへ戻る</Link>
      </div>
    )
  }

  const Field = ({ label, name, type = 'text', placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-primary mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition ${
          errors[name]
            ? 'border-red-400 focus:ring-red-200'
            : 'border-border focus:ring-accent/30 focus:border-accent'
        }`}
      />
      {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-8">ご注文内容の確認</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-base font-bold text-primary mb-4">お届け先情報</h2>
              <div className="space-y-4">
                <Field label="お名前" name="name" placeholder="山田 太郎" />
                <Field label="郵便番号（ハイフンなし）" name="zip" placeholder="1000001" />
                <Field label="住所" name="address" placeholder="東京都千代田区千代田1-1" />
                <Field label="電話番号" name="phone" type="tel" placeholder="09012345678" />
              </div>
            </div>

            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-base font-bold text-primary mb-4">注文商品</h2>
              <div className="space-y-3">
                {cartProducts.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 items-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg border border-border shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-400">数量: {quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-primary shrink-0">
                      ¥{((product.salePrice ?? product.price) * quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 h-fit sticky top-24">
            <h2 className="text-base font-bold text-primary mb-4">お支払い金額</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>小計</span>
                <span>¥{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>送料</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? '無料' : `¥${shipping.toLocaleString()}`}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-primary">
                <span>合計（税込）</span>
                <span className="text-lg">¥{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 w-full py-3 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              注文を確定する
            </button>
            <p className="mt-3 text-xs text-gray-400 text-center">
              ※ これはデモサイトです。実際の決済は行われません。
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
