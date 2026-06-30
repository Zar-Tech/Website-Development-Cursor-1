# FAMZ Games Website

An interactive indie game studio website with 3D animations, built with React, Three.js, and Framer Motion.

Inspired by [famzgames.com](https://famzgames.com/) with enhanced interactivity and immersive 3D visuals.

## Features

- **3D Hero Scene** — Interactive Three.js background with floating shapes, particle field, and mouse parallax
- **3D Game Showcase** — Rotating game cubes representing each title
- **Interactive Game Cards** — 3D tilt effect on hover with scroll-triggered animations
- **Magnetic Buttons** — Buttons that follow cursor movement
- **Cursor Glow** — Ambient light effect following the mouse
- **Page Transitions** — Smooth animated route changes
- **Genre Filters** — Interactive game filtering on the Games page
- **Responsive Design** — Mobile-friendly layout with hamburger navigation

## Pages

- **Home** — Hero with 3D scene, stats, featured games, 3D showcase
- **Games** — Full game catalog with genre filters
- **About** — Studio story, values, and team
- **Blog** — News and announcements
- **Contact** — Contact form with validation

## Tech Stack

- React 18 + Vite
- React Router
- Three.js + React Three Fiber + Drei
- Framer Motion
- Lucide React icons

## Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

Output goes to `dist/` — upload to Hostinger or any static hosting.

## Deploy to Hostinger

1. Run `npm run build`
2. Upload contents of `dist/` to `public_html`
3. Add a `.htaccess` rewrite for SPA routing (if using Apache):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Games Portfolio

- Pixel Quest — Retro adventure
- Neon Runners — Neon parkour racing
- Mystic Realms — Fantasy RPG
- Cyber Clash — Cyberpunk action
- Space Odyssey — Open-world exploration
- Adventure Legends — Co-op quests
