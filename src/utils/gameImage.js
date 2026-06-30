/**
 * Pick the best image URL for a game or slide by layout format.
 *
 * Formats:
 * - hero   → 16:10 hero slider (1280×800)
 * - card   → 16:10 carousel & cards (960×600)
 * - tile   → 3:4 home grid tiles (720×960)
 * - panel  → wide games page banner (1200×750)
 * - icon   → square app icon (512×512)
 */

const FORMAT_KEYS = {
  hero: 'hero',
  card: 'card',
  tile: 'tile',
  panel: 'panel',
  icon: 'icon',
};

export function getGameImage(game, format = 'card') {
  const key = FORMAT_KEYS[format] || format;
  if (game?.images?.[key]) return game.images[key];
  if (format === 'icon' && game?.images?.icon) return game.images.icon;
  return game?.image || '';
}

export function getSlideImage(slide, format = 'hero') {
  if (slide?.images?.[format]) return slide.images[format];
  return slide?.src || slide?.poster || '';
}
