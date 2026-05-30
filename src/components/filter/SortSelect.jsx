const SORT_OPTIONS = [
  { value: 'recommended', label: 'おすすめ順' },
  { value: 'price_asc', label: '価格が安い順' },
  { value: 'price_desc', label: '価格が高い順' },
  { value: 'newest', label: '新着順' },
  { value: 'rating', label: 'レビュー評価順' },
]

export default function SortSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 text-sm border border-border rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent cursor-pointer"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
