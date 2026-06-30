GAME IMAGE FORMATS
==================

For square app icons (like Brain Dash), create multiple sizes:

  brain-dash-icon.png   → 512×512   square app icon
  brain-dash-hero.jpg   → 1280×800  16:10 hero slider
  brain-dash-card.jpg   → 960×600   16:10 carousel & cards
  brain-dash-tile.jpg   → 720×960   3:4 home grid tiles
  brain-dash-panel.jpg  → 1200×750  games page wide banner

Regenerate from icon:
  python3 scripts/generate-game-images.py brain-dash
  python3 scripts/generate-game-images.py xo-rivals

Place source files first:
  public/games/brain-dash.jpg
  public/games/xo-rivals.png

In src/data/content.js:

  images: {
    icon: '/games/brain-dash-icon.png',
    hero: '/games/brain-dash-hero.jpg',
    card: '/games/brain-dash-card.jpg',
    tile: '/games/brain-dash-tile.jpg',
    panel: '/games/brain-dash-panel.jpg',
  },

Landscape photos only need:
  image: '/games/my-game.jpg'
