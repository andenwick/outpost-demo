# The Outpost

A single-page restaurant website for The Outpost, an American comfort kitchen in the Salt Lake Valley.

## Tech Stack

- **React 18** -- Component-based UI
- **Vite 5** -- Build tooling and dev server
- **Tailwind CSS 3** -- Utility-first styling
- **Framer Motion 10** -- Scroll-driven animations and parallax effects

## Features

- Responsive, mobile-first layout with animated hamburger menu
- Parallax scrolling throughout (hero, about, gallery, menu sections)
- Scroll-triggered entrance animations on every section
- Image gallery with per-image parallax and hover reveals
- Embedded Google Maps with desaturation-to-color scroll transition
- Custom grain texture overlay and branded color palette
- Smooth scrolling navigation with transparent-to-solid navbar transition

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens a local dev server at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  main.jsx          # App entry point
  App.jsx           # Root component, section composition
  index.css         # Global styles, grain overlay, scrollbar
  components/
    Navbar.jsx      # Fixed nav with scroll detection, mobile menu
    Hero.jsx        # Full-viewport hero with parallax background
    About.jsx       # Story section with layered parallax images
    Menu.jsx        # Menu highlights with staggered animations
    Gallery.jsx     # Photo grid with per-image parallax
    Location.jsx    # Map embed, hours, and contact info
    Footer.jsx      # Brand summary, quick links, newsletter form
```
