import { games } from '../data/content';
import { getGameImage } from '../utils/gameImage';
import GamePlayLink from './GamePlayLink';

const featuredGames = games.filter((game) => game.images?.icon);

export default function FeaturedShowcase() {
  return (
    <div className="featured-showcase">
      <ul className="featured-showcase__grid">
        {featuredGames.map((game) => (
          <li key={game.id}>
            <GamePlayLink
              game={game}
              className="featured-showcase__item interactive"
              style={{ '--showcase-color': game.color }}
            >
              <span className="featured-showcase__icon">
                <img src={getGameImage(game, 'icon')} alt="" />
              </span>
              <span className="featured-showcase__name">{game.title}</span>
            </GamePlayLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
