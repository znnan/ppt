import { useState } from 'react'
import SlideChart from './SlideChart'

// Render text with basic HTML markup (<b>, <i>) — content is trusted (hardcoded in slides.jsx)
function MarkupText({ text }) {
  return <span dangerouslySetInnerHTML={{ __html: text }} />
}

export default function Slide({ slide, direction, revealStep = 0 }) {
  const { type, title, subtitle, content, layout = 'left', image, chart, chartAlt, sources, wider,
    left, right, centerLine, bottom } = slide
  const [altView, setAltView] = useState(false)

  const activeChart = altView && chartAlt ? chartAlt : chart
  const canToggle = !!(chart && chartAlt)

  const handleChartClick = (e) => {
    if (!canToggle) return
    e.stopPropagation()
    setAltView(!altView)
  }

  const renderContent = () => {
    if (type === 'title') {
      return (
        <div className="slide-inner">
          <h1 className="slide-title title-main">{title}</h1>
          {subtitle && <p className="slide-subtitle">{subtitle}</p>}
        </div>
      )
    }

    if (type === 'chapter') {
      return (
        <div className="slide-inner">
          <span className="chapter-tag">{title}</span>
          {subtitle && <h2 className="slide-subtitle">{subtitle}</h2>}
        </div>
      )
    }

    if (type === 'content') {
      // ── Comparison layout (左右对比 + 中间类比 + 底部结论) ──
      if (layout === 'comparison' && left && right) {
        const hasMoreToReveal = bottom && revealStep < 1
        return (
          <div className="slide-inner slide-comparison">
            <h2 className="slide-title slide-comparison-title">{title}</h2>
            <div className="comparison-cols">
              <div className="comparison-col comparison-col-left">
                <div className="comparison-label">{left.label}</div>
                <ul className="comparison-items">
                  {left.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div className="comparison-divider" />
              <div className="comparison-col comparison-col-right">
                <div className="comparison-label">{right.label}</div>
                <ul className="comparison-items">
                  {right.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>
            {centerLine && (
              <div className="comparison-center">{centerLine}</div>
            )}
            {bottom && (
              <div className={`comparison-bottom${revealStep >= 1 ? ' revealed' : ''}`}>
                {bottom}
              </div>
            )}
            {hasMoreToReveal && (
              <div className="reveal-hint">点击或按空格揭晓</div>
            )}
          </div>
        )
      }

      const renderItem = (item, i) => {
        // Sub-item: starts with —— or —
        const m = item.match(/^(——|—)\s*/)
        if (m) {
          const text = item.slice(m[0].length)
          return <li key={i} className="sub-item"><MarkupText text={text} /></li>
        }
        // Spacer line
        if (item === '') return <li key={i} className="spacer" aria-hidden="true" />
        return <li key={i}><MarkupText text={item} /></li>
      }

      const body = (
        <div className="slide-body">
          <h2 className="slide-title">{title}</h2>
          {subtitle && <p className="slide-subtitle-secondary">{subtitle}</p>}
          <ul className="slide-content-list">
            {Array.isArray(content) ? content.map(renderItem) : (
              <li><MarkupText text={content} /></li>
            )}
          </ul>
        </div>
      )

      // Footnotes / sources
      const footnotes = sources && sources.length > 0 && (
        <div className="slide-footnotes">
          {sources.map((s, i) => (
            <span key={i} className="footnote-item"><sup>{i + 1})</sup> {s}</span>
          ))}
        </div>
      )

      // Chart + text in columns layout
      // When sources are present, title serves as chart caption below the chart
      const titleInChart = !!(sources && sources.length > 0)

      if (activeChart && layout === 'columns') {
        const chartBlock = (
          <div className="slide-chart-area" onClick={handleChartClick}>
            <SlideChart config={activeChart} />
            {titleInChart && <div className="chart-caption">{title}</div>}
            {titleInChart && subtitle && <div className="chart-subtitle">{subtitle}</div>}
            {titleInChart && footnotes}
            {canToggle && (
              <div className="chart-toggle-hint">
                {altView ? '点击切回模块视图' : '点击切换：OEM vs 供应商控制权'}
              </div>
            )}
          </div>
        )

        const textBlock = (
          <div className="slide-body">
            {!titleInChart && <h2 className="slide-title">{title}</h2>}
            {!titleInChart && subtitle && <p className="slide-subtitle-secondary">{subtitle}</p>}
            <ul className="slide-content-list">
              {Array.isArray(content) ? content.map(renderItem) : (
                <li><MarkupText text={content} /></li>
              )}
            </ul>
            {!titleInChart && footnotes}
          </div>
        )

        return (
          <div className="slide-inner slide-columns slide-chart-columns">
            {chartBlock}
            {textBlock}
          </div>
        )
      }

      // Chart below text
      if (activeChart) {
        return (
          <div className="slide-inner">
            {body}
            <div className="slide-chart-area" onClick={handleChartClick}>
              <SlideChart config={activeChart} />
              {canToggle && (
                <div className="chart-toggle-hint">
                  {altView ? '点击切回模块视图' : '点击切换：OEM vs 供应商控制权'}
                </div>
              )}
            </div>
            {footnotes}
          </div>
        )
      }

      // Image + text in columns
      if (image && layout === 'columns') {
        return (
          <div className="slide-inner slide-columns">
            <div className="slide-image">
              <img src={image} alt={title} />
            </div>
            {body}
          </div>
        )
      }

      // Image above text
      if (image) {
        return (
          <div className="slide-inner">
            <div className="slide-image slide-image-block">
              <img src={image} alt={title} />
            </div>
            {body}
          </div>
        )
      }

      return <div className="slide-inner">{body}</div>
    }

    if (type === 'end') {
      return (
        <div className="slide-inner">
          <h1 className="slide-title title-end">{title}</h1>
          {subtitle && <p className="slide-subtitle">{subtitle}</p>}
        </div>
      )
    }

    return null
  }

  const slideClass = [
    'slide',
    `slide-${type}`,
    `slide-${layout}`,
    `slide-${direction}`,
    wider ? 'slide-wide' : '',
    canToggle ? 'slide-has-toggle' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={slideClass}>
      {renderContent()}
    </div>
  )
}
