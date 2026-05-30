export default function StockLabel({ stock }) {
  if (stock === 0) {
    return <span className="text-xs font-medium text-red-500">売り切れ</span>
  }
  if (stock <= 3) {
    return <span className="text-xs font-medium text-amber-600">残りわずか（{stock}個）</span>
  }
  return <span className="text-xs font-medium text-green-600">在庫あり</span>
}
