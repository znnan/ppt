// Render text with basic HTML markup (<b>, <i>) — content is trusted (hardcoded in slides.jsx)
function MarkupText({ text }) {
  return <span dangerouslySetInnerHTML={{ __html: text }} />
}

export default function Slide({ slide, direction }) {
  const { type, title, subtitle, content, layout = 'left', image } = slide

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
      const body = (
        <div className="slide-body">
          <h2 className="slide-title">{title}</h2>
          {subtitle && <p className="slide-subtitle-secondary">{subtitle}</p>}
          <ul className="slide-content-list">
            {Array.isArray(content) ? content.filter(Boolean).map((item, i) => (
              <li key={i}><MarkupText text={item} /></li>
            )) : (
              <li><MarkupText text={content} /></li>
            )}
          </ul>
        </div>
      )

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

  return (
    <div className={`slide slide-${type} slide-${layout} slide-${direction}`}>
      {renderContent()}
    </div>
  )
}
