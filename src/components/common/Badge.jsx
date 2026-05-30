const BADGE_STYLES = {
  NEW: 'bg-accent text-white',
  SALE: 'bg-red-500 text-white',
  '期間限定': 'bg-amber-500 text-white',
}

export default function Badge({ type }) {
  if (!type || !BADGE_STYLES[type]) return null
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded ${BADGE_STYLES[type]}`}>
      {type}
    </span>
  )
}
