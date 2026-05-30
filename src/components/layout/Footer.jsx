import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="text-xl font-bold text-primary">
              STYLE<span className="text-accent">SHOP</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              シンプルで上質なライフスタイルアイテムをお届け
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div>
              <p className="font-semibold text-primary mb-3">カテゴリ</p>
              <ul className="space-y-2 text-gray-500">
                {['トップス', 'パンツ', 'アウター', 'アクセサリー', 'シューズ'].map((cat) => (
                  <li key={cat}>
                    <Link to={`/?category=${encodeURIComponent(cat)}`} className="hover:text-accent transition-colors">
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-primary mb-3">サービス</p>
              <ul className="space-y-2 text-gray-500">
                <li><Link to="/favorites" className="hover:text-accent transition-colors">お気に入り</Link></li>
                <li><Link to="/cart" className="hover:text-accent transition-colors">カート</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-gray-400">
          © 2026 STYLESHOP — ポートフォリオ用デモサイト
        </div>
      </div>
    </footer>
  )
}
