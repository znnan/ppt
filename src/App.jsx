import { useState, useEffect, useCallback } from 'react'
import Slide from './components/Slide'
import ProgressBar from './components/ProgressBar'
import ThemeSwitcher from './components/ThemeSwitcher'
import { THEMES, DEFAULT_THEME_ID } from './themes'
import slides from './slides'
import './App.css'

function applyTheme(themeId) {
  const theme = THEMES.find(t => t.id === themeId)
  if (!theme) return
  const root = document.documentElement
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v))
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState('next')
  const [revealStep, setRevealStep] = useState(0)

  const savedTheme = () => localStorage.getItem('theme') || DEFAULT_THEME_ID
  const [theme, setTheme] = useState(savedTheme)

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const goTo = useCallback((index) => {
    if (index < 0 || index >= slides.length) return
    setDirection(index > currentIndex ? 'next' : 'prev')
    setCurrentIndex(index)
    setRevealStep(0)
  }, [currentIndex])

  const goNext = useCallback(() => {
    const current = slides[currentIndex]
    const maxReveal = current?.revealCount || 0
    if (revealStep < maxReveal) {
      setRevealStep(prev => prev + 1)
      return
    }
    if (currentIndex < slides.length - 1) {
      setDirection('next')
      setCurrentIndex(prev => prev + 1)
      setRevealStep(0)
    }
  }, [currentIndex, revealStep])

  const goPrev = useCallback(() => {
    if (revealStep > 0) {
      setRevealStep(prev => prev - 1)
      return
    }
    if (currentIndex > 0) {
      const prevSlide = slides[currentIndex - 1]
      setDirection('prev')
      setCurrentIndex(prev => prev - 1)
      setRevealStep(prevSlide?.revealCount || 0)
    }
  }, [currentIndex, revealStep])

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

  // Click anywhere on the slide area to advance / reveal next step.
  // Interactive elements (chart toggle, dots, theme switcher) call e.stopPropagation().
  const handleAppClick = (e) => {
    // Ignore clicks on actual <button> / <a> elements.
    const tag = e.target?.tagName
    if (tag === 'BUTTON' || tag === 'A') return
    goNext()
  }

  return (
    <div className="app" onClick={handleAppClick}>
      <ProgressBar
        current={currentIndex}
        total={slides.length}
        slides={slides}
        onDotClick={goTo}
      />
      <Slide
        key={currentSlide.id}
        slide={currentSlide}
        direction={direction}
        revealStep={revealStep}
      />
      <div className="nav-hint">
        {currentIndex === 0 && (
          <span>按 → 或 ↓ 开始</span>
        )}
      </div>
      <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
    </div>
  )
}
