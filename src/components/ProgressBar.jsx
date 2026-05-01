export default function ProgressBar({ current, total, slides, onDotClick }) {
  const percentage = ((current + 1) / total) * 100

  // Collect unique chapters in order
  const chapterOrder = []
  const seen = new Set()
  for (const s of slides) {
    if (s.chapter && !seen.has(s.chapter)) {
      seen.add(s.chapter)
      chapterOrder.push(s.chapter)
    }
  }

  // Find current chapter
  const currentChapter = slides[current]?.chapter || ''

  const dotSize = total > 20 ? 3 : 5
  const dotGap = total > 20 ? 3 : 4

  return (
    <div className="progress-bar">
      <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />

      {/* Dots row */}
      <div className="progress-dots" style={{ gap: dotGap }}>
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            className={`progress-dot ${i === current ? 'active' : ''}`}
            style={{ width: dotSize, height: dotSize }}
            onClick={() => onDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Chapter labels row */}
      <div className="progress-chapters">
        {chapterOrder.map((ch, i) => {
          const isCurrent = ch === currentChapter
          const isPast = chapterOrder.indexOf(currentChapter) > i
          const isFuture = chapterOrder.indexOf(currentChapter) < i

          let cls = 'chapter-label'
          if (isCurrent) cls += ' chapter-current'
          else if (isPast) cls += ' chapter-past'
          else if (isFuture) cls += ' chapter-future'

          return (
            <span key={i} className={cls}>
              {i > 0 && <span className="chapter-sep">│</span>}
              <span className="chapter-name">{ch}</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
