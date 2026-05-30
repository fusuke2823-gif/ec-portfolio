import StarRating from '../common/StarRating'

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-sm text-gray-400">まだレビューがありません</p>
  }

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-primary">{avg.toFixed(1)}</span>
        <div>
          <StarRating rating={Math.round(avg)} size="base" />
          <p className="text-xs text-gray-400 mt-0.5">{reviews.length}件のレビュー</p>
        </div>
      </div>

      <div className="divide-y divide-border">
        {reviews.map((review, i) => (
          <div key={i} className="py-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center text-xs font-medium text-gray-500">
                  {review.user[0].toUpperCase()}
                </span>
                <span className="text-sm font-medium text-primary">{review.user}</span>
              </div>
              <span className="text-xs text-gray-400">{review.date}</span>
            </div>
            <StarRating rating={review.rating} />
            {review.hasPhoto && (
              <span className="ml-2 text-xs text-accent">📷 写真あり</span>
            )}
            <p className="mt-1.5 text-sm text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
