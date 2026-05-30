const CATEGORIES = ['トップス', 'パンツ', 'アウター', 'アクセサリー', 'シューズ']

const PRICE_RANGES = [
  { label: '〜¥3,000', value: 'low' },
  { label: '¥3,001〜¥8,000', value: 'mid' },
  { label: '¥8,001〜', value: 'high' },
]

export default function FilterPanel({ selectedCategories, onCategoryChange, selectedPrice, onPriceChange }) {
  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      onCategoryChange(selectedCategories.filter((c) => c !== cat))
    } else {
      onCategoryChange([...selectedCategories, cat])
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">カテゴリ</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                selectedCategories.includes(cat)
                  ? 'bg-accent text-white border-accent'
                  : 'bg-surface text-primary border-border hover:border-accent hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">価格帯</p>
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.value}
              onClick={() => onPriceChange(selectedPrice === range.value ? null : range.value)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                selectedPrice === range.value
                  ? 'bg-accent text-white border-accent'
                  : 'bg-surface text-primary border-border hover:border-accent hover:text-accent'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
