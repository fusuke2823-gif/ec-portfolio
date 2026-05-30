import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import products from '../data/products.json'
import ProductGrid from '../components/product/ProductGrid'
import ProductCard from '../components/product/ProductCard'
import FilterPanel from '../components/filter/FilterPanel'
import SortSelect from '../components/filter/SortSelect'
import SearchBar from '../components/filter/SearchBar'
import { useHistory } from '../hooks/useHistory'

function avgRating(reviews) {
  if (!reviews.length) return 0
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
}

function applyPriceFilter(product, range) {
  if (!range) return true
  const p = product.salePrice ?? product.price
  if (range === 'under2k') return p <= 2000
  if (range === '2k5k') return p >= 2001 && p <= 5000
  if (range === '5k10k') return p >= 5001 && p <= 10000
  if (range === '10k20k') return p >= 10001 && p <= 20000
  return p >= 20001
}

const TOP5 = [...products].sort((a, b) => b.rankScore - a.rankScore).slice(0, 5)

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const urlQuery = searchParams.get('q') || ''
  const urlCategory = searchParams.get('category') || ''

  const [query, setQuery] = useState(urlQuery)
  const [selectedCategories, setSelectedCategories] = useState(urlCategory ? [urlCategory] : [])
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [selectedBadges, setSelectedBadges] = useState([])
  const [hideOutOfStock, setHideOutOfStock] = useState(false)
  const [sort, setSort] = useState('recommended')
  const [filterOpen, setFilterOpen] = useState(false)

  const { history } = useHistory()
  const recentProducts = history
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4)

  useEffect(() => { setQuery(urlQuery) }, [urlQuery])
  useEffect(() => { if (urlCategory) setSelectedCategories([urlCategory]) }, [urlCategory])

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchQuery = !query || p.name.includes(query) || p.description.includes(query)
      const matchCat = selectedCategories.length === 0 || selectedCategories.includes(p.category)
      const matchPrice = applyPriceFilter(p, selectedPrice)
      const matchBadge = selectedBadges.length === 0 || selectedBadges.includes(p.badge)
      const matchStock = !hideOutOfStock || p.stock > 0
      return matchQuery && matchCat && matchPrice && matchBadge && matchStock
    })

    switch (sort) {
      case 'price_asc': return [...result].sort((a, b) => a.price - b.price)
      case 'price_desc': return [...result].sort((a, b) => b.price - a.price)
      case 'newest': return [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      case 'rating': return [...result].sort((a, b) => avgRating(b.reviews) - avgRating(a.reviews))
      default: return [...result].sort((a, b) => b.rankScore - a.rankScore)
    }
  }, [query, selectedCategories, selectedPrice, selectedBadges, hideOutOfStock, sort])

  const hasFilter = query || selectedCategories.length > 0 || selectedPrice || selectedBadges.length > 0 || hideOutOfStock

  const resetFilters = () => {
    setSelectedCategories([])
    setSelectedPrice(null)
    setQuery('')
    setSelectedBadges([])
    setHideOutOfStock(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ランキングセクション */}
      {!hasFilter && (
        <section className="mb-12">
          <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <span className="text-amber-500">🏆</span> 今週の人気ランキング TOP5
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 items-stretch">
            {TOP5.map((product, i) => (
              <div key={product.id} className="relative shrink-0 w-44 flex flex-col">
                <span className="absolute -top-1 -left-1 z-10 w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold shadow bg-gradient-to-br from-amber-400 to-amber-600 text-white">
                  {i + 1}
                </span>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* フィルター・検索エリア */}
      <div className="mb-6 space-y-3">
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <button
            onClick={() => setFilterOpen((o) => !o)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm border rounded-lg transition-colors ${
              filterOpen || hasFilter
                ? 'bg-accent text-white border-accent'
                : 'bg-surface text-primary border-border hover:border-accent'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            絞り込み
            {hasFilter && !filterOpen && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
          </button>
          <SortSelect value={sort} onChange={setSort} />
        </div>

        {filterOpen && (
          <div className="bg-surface border border-border rounded-xl p-4">
            <FilterPanel
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              selectedPrice={selectedPrice}
              onPriceChange={setSelectedPrice}
              selectedBadges={selectedBadges}
              onBadgeChange={setSelectedBadges}
              hideOutOfStock={hideOutOfStock}
              onHideOutOfStockChange={setHideOutOfStock}
            />
            {hasFilter && (
              <button onClick={resetFilters} className="mt-3 text-xs text-accent hover:underline">
                フィルターをリセット
              </button>
            )}
          </div>
        )}
      </div>

      {/* 商品一覧 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-primary">
          {hasFilter ? '検索結果' : 'すべての商品'}
        </h2>
        <span className="text-sm text-gray-400">{filtered.length}件</span>
      </div>
      <ProductGrid products={filtered} />

      {/* 閲覧履歴 */}
      {recentProducts.length > 0 && !hasFilter && (
        <section className="mt-16">
          <h2 className="text-lg font-bold text-primary mb-4">最近チェックした商品</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
