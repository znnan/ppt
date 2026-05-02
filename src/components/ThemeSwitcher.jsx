import { THEMES } from '../themes'

export default function ThemeSwitcher({ theme, onThemeChange }) {
  return (
    <div className="theme-switcher" role="group" aria-label="主题切换">
      {THEMES.map(t => (
        <button
          key={t.id}
          className={`theme-dot-btn${t.id === theme ? ' active' : ''}`}
          onClick={() => onThemeChange(t.id)}
          title={t.name}
          aria-pressed={t.id === theme}
          style={{ '--swatch': t.swatch }}
        />
      ))}
    </div>
  )
}
