import { useState } from 'react'

export default function ProductImage({ images, name }) {
  const [current, setCurrent] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square rounded-xl overflow-hidden bg-background border border-border">
        <img
          src={images[current]}
          alt={`${name} - 画像${current + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === current ? 'border-accent' : 'border-border hover:border-gray-400'
              }`}
              aria-label={`画像${i + 1}を表示`}
            >
              <img src={src} alt={`サムネイル${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
