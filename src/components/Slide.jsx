export default function Slide({ slide, direction }) {
  const { type, title, subtitle, content, layout = 'left' } = slide

  return (
    <div className={`slide slide-${type} slide-${layout} slide-${direction}`}>
      {type === 'title' && (
        <div className="slide-inner">
          <h1 className="slide-title title-main">{title}</h1>
          {subtitle && <p className="slide-subtitle">{subtitle}</p>}
        </div>
      )}

      {type === 'chapter' && (
        <div className="slide-inner">
          <span className="chapter-tag">{title}</span>
          <h2 className="slide-subtitle">{subtitle}</h2>
        </div>
      )}

      {type === 'content' && (
        <div className="slide-inner">
          <h2 className="slide-title">{title}</h2>
          {subtitle && <p className="slide-subtitle-secondary">{subtitle}</p>}
          <ul className="slide-content-list">
            {Array.isArray(content) ? content.map((item, i) => (
              <li key={i}>{item}</li>
            )) : (
              <li>{content}</li>
            )}
          </ul>
        </div>
      )}

      {type === 'end' && (
        <div className="slide-inner">
          <h1 className="slide-title title-end">{title}</h1>
          {subtitle && <p className="slide-subtitle">{subtitle}</p>}
        </div>
      )}
    </div>
  )
}
