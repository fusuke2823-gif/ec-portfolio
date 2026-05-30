const CATEGORIES = ['トップス', 'パンツ', 'アウター', 'アクセサリー', 'シューズ']

const PRICE_RANGES = [
  { label: '〜¥2,000', value: 'under2k' },
  { label: '¥2,001〜¥5,000', value: '2k5k' },
  { label: '¥5,001〜¥10,000', value: '5k10k' },
  { label: '¥10,001〜¥20,000', value: '10k20k' },
  { label: '¥20,001〜', value: 'over20k' },
]

const BADGES = [
  { label: 'SALE', value: 'SALE', color: 'bg-red-500' },
  { label: 'NEW', value: 'NEW', color: 'bg-accent' },
  { label: '期間限定', value: '期間限定', color: 'bg-amber-500' },
]

export default function FilterPanel({
  selectedCategories, onCategoryChange,
  selectedPrice, onPriceChange,
  selectedBadges, onBadgeChange,
  hideOutOfStock, onHideOutOfStockChange,
}) {
  const toggleCategory = (cat) => {
    onCategoryChange(
      selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat]
    )
  }

  const toggleBadge = (badge) => {
    onBadgeChange(
      selectedBadges.includes(badge)
        ? selectedBadges.filter((b) => b !== badge)
        : [...selectedBadges, badge]
    )
  }

  const activeBtn = 'bg-accent text-white border-accent'
  const inactiveBtn = 'bg-surface text-primary border-border hover:border-accent hover:text-accent'

  return (
    <div className="space-y-5">
      {/* カテゴリ */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">カテゴリ</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                selectedCategories.includes(cat) ? activeBtn : inactiveBtn
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 価格帯 */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">価格帯</p>
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.value}
              onClick={() => onPriceChange(selectedPrice === range.value ? null : range.value)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                selectedPrice === range.value ? activeBtn : inactiveBtn
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* バッジ */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">バッジ</p>
        <div className="flex flex-wrap gap-2">
          {BADGES.map((badge) => (
            <button
              key={badge.value}
              onClick={() => toggleBadge(badge.value)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                selectedBadges.includes(badge.value) ? activeBtn : inactiveBtn
              }`}
            >
              {badge.label}
            </button>
          ))}
        </div>
      </div>

      {/* 売り切れ非表示 */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer w-fit">
          <input
            type="checkbox"
            checked={hideOutOfStock}
            onChange={(e) => onHideOutOfStockChange(e.target.checked)}
            className="w-4 h-4 rounded border-border accent-accent cursor-pointer"
          />
          <span className="text-xs font-medium text-primary">売り切れ商品を非表示</span>
        </label>
      </div>
    </div>
  )
}
