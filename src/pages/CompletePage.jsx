import { useLocation, Link } from 'react-router-dom'

export default function CompletePage() {
  const { state } = useLocation()

  if (!state?.orderNumber) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 mb-4">このページは直接アクセスできません</p>
        <Link to="/" className="text-sm text-accent hover:underline">トップへ戻る</Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-primary">ご注文ありがとうございます！</h1>
      <p className="mt-3 text-sm text-gray-500">
        ご注文が確定しました。お届けまでしばらくお待ちください。
      </p>

      <div className="mt-8 bg-surface border border-border rounded-xl p-6">
        <p className="text-xs text-gray-400 mb-1">注文番号</p>
        <p className="text-2xl font-mono font-bold text-primary tracking-widest">
          #{state.orderNumber}
        </p>
        {state.total && (
          <p className="mt-3 text-sm text-gray-500">
            お支払い金額: <span className="font-bold text-primary">¥{state.total.toLocaleString()}</span>
          </p>
        )}
      </div>

      <p className="mt-6 text-xs text-gray-400">
        ※ これはポートフォリオ用のデモサイトです。<br />実際の配送・決済は行われません。
      </p>

      <Link
        to="/"
        className="mt-8 inline-block px-8 py-3 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
      >
        トップページへ戻る
      </Link>
    </div>
  )
}
