export default function StarRating({ rating, max = 5, size = 'sm' }) {
  const sizeClass = size === 'sm' ? 'text-sm' : 'text-base'
  return (
    <span className={`${sizeClass} leading-none`} aria-label={`評価 ${rating}/${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < rating ? 'text-amber-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </span>
  )
}
