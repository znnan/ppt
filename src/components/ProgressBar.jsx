export default function ProgressBar({ current, total, onDotClick }) {
  const percentage = ((current + 1) / total) * 100
  // Group dots: show all dots but highlight the active one
  // For simplicity, use mini dots that fit in one row
  const maxDots = 20
  let dots = []
  if (total <= maxDots) {
    dots = Array.from({ length: total }, (_, i) => i)
  } else {
    // Show first, last, and a sliding window around current
    const windowSize = 10
    let start = Math.max(0, current - Math.floor(windowSize / 2))
    let end = Math.min(total, start + windowSize)
    if (end === total) start = Math.max(0, total - windowSize)
    dots = Array.from({ length: end - start }, (_, i) => start + i)
  }

  return (
    <div className="progress-bar">
      <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
      <div className="progress-dots">
        {dots.map((i) => (
          <button
            key={i}
            className={`progress-dot ${i === current ? 'active' : ''}`}
            onClick={() => onDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
