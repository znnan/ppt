# Review Notes

## Implementation Summary

Static React + Vite single-page presentation site with Typeform-style slide transitions.

### Architecture
- **No router** — single page with `useState` for slide index
- **CSS only** — no Tailwind, no UI library
- **CSS transitions** — `@keyframes` for slide-in/out animations
- **Build to `docs/`** — direct GitHub Pages deployment from `main` branch

### Key Decisions
1. **Base path**: Set to `/ppt/` to match repo name
2. **Slide data**: 26 slides in `src/slides.jsx`, easy to edit without touching components
3. **Speaker notes**: Stored in `note` field but not displayed — could add a toggle (e.g. press `N`)
4. **Responsive**: `max-width: 720px` on slides, mobile-adjusted padding/font sizing
