# FAMZ Games — Cinematic 3D Website

A completely redesigned interactive gaming studio website with persistent WebGL, scroll-driven 3D camera, and cinematic UI.

Inspired by [famzgames.com](https://famzgames.com/).

## What's New in v2

| Feature | Description |
|---------|-------------|
| **Persistent 3D World** | Full-screen WebGL scene stays mounted behind all content |
| **Bloom + Chromatic Aberration** | Post-processing for cinematic neon glow |
| **Scroll-Driven Camera** | 3D camera moves deeper as you scroll |
| **Mouse Parallax** | Scene reacts to cursor position in real-time |
| **3D Game Carousel** | Click-through carousel with CSS 3D perspective transforms |
| **Animated Loader** | Branded loading screen with progress bar |
| **Custom Cursor** | Dot + ring cursor with hover states |
| **Smooth Scroll** | Lenis-powered buttery scroll experience |
| **Animated Counters** | Stats count up on scroll into view |
| **Glass Morphism UI** | Frosted glass sections over the 3D world |

## Tech Stack

- React 18 + Vite 6
- Three.js + React Three Fiber + Drei + Postprocessing
- Framer Motion
- GSAP-ready architecture
- Lenis smooth scroll

## Run

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
# Upload dist/ to Hostinger public_html
```

## Pages

- **Home** — Cinematic hero, stats, 3D carousel, game grid
- **Games** — Full catalog with genre filters and panel layout
- **About** — Studio story, values, team
- **Blog** — News articles
- **Contact** — Form with toast confirmation
# Famzgames-website
# Famzgames-website
