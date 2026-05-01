import { useState, useEffect, useCallback } from 'react'
import Slide from './components/Slide'
import ProgressBar from './components/ProgressBar'
import slides from './slides'
import './App.css'

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState('next')

  const goTo = useCallback((index) => {
    if (index < 0 || index >= slides.length) return
    setDirection(index > currentIndex ? 'next' : 'prev')
    setCurrentIndex(index)
  }, [currentIndex])

  const goNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setDirection('next')
      setCurrentIndex(prev => prev + 1)
    }
  }, [currentIndex])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection('prev')
      setCurrentIndex(prev => prev - 1)
    }
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  // Touch/swipe support
  useEffect(() => {
    let touchStartY = 0
    let touchStartX = 0

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
    }

    const handleTouchEnd = (e) => {
      const diffY = touchStartY - e.changedTouches[0].clientY
      const diffX = touchStartX - e.changedTouches[0].clientX

      // Prefer vertical swipes
      if (Math.abs(diffY) > Math.abs(diffX)) {
        if (diffY > 30) goNext()
        else if (diffY < -30) goPrev()
      } else {
        if (diffX > 30) goNext()
        else if (diffX < -30) goPrev()
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [goNext, goPrev])

  const currentSlide = slides[currentIndex]

  return (
    <div className="app">
      <ProgressBar
        current={currentIndex}
        total={slides.length}
        onDotClick={goTo}
      />
      <Slide
        key={currentSlide.id}
        slide={currentSlide}
        direction={direction}
      />
      <div className="nav-hint">
        {currentIndex === 0 && (
          <span>按 → 或 ↓ 开始</span>
        )}
      </div>
    </div>
  )
}
