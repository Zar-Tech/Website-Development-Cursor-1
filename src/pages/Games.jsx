import { useState } from 'react';
import { Play, Star, Users, Filter } from 'lucide-react';
import Reveal from '../components/Reveal';
import { games } from '../data/content';

const genres = ['All', ...new Set(games.map((g) => g.genre))];

export default function Games() {
  const [filter, setFilter] = useState('All');
  const [hovered, setHovered] = useState(null);

  const filtered = filter === 'All' ? games : games.filter((g) => g.genre === filter);

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <span className="section__eyebrow">Our Collection</span>
            <h1 className="page-hero__title">
              Explore Our <span className="text-accent">Games</span>
            </h1>
            <p className="page-hero__desc">
              From action-packed adventures to strategic challenges — find your next obsession.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="filter-bar">
              <Filter size={16} />
              {genres.map((g) => (
                <button
                  key={g}
                  className={`filter-bar__btn interactive ${filter === g ? 'filter-bar__btn--active' : ''}`}
                  onClick={() => setFilter(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="games-showcase">
            {filtered.map((game, i) => (
              <Reveal key={game.id} delay={i * 0.06}>
                <article
                  className={`game-panel interactive ${hovered === game.id ? 'game-panel--hover' : ''}`}
                  style={{ '--panel-color': game.color }}
                  onMouseEnter={() => setHovered(game.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="game-panel__visual">
                    <img src={game.image} alt={game.title} />
                    <div className="game-panel__visual-overlay" />
                    <div className="game-panel__number">0{game.id}</div>
                  </div>
                  <div className="game-panel__info">
                    <div className="game-panel__top">
                      <span className="game-panel__genre">{game.genre}</span>
                      <div className="game-panel__stats">
                        <span>
                          <Star size={13} fill="#fbbf24" color="#fbbf24" /> {game.rating}%
                        </span>
                        <span>
                          <Users size={13} /> {game.players}
                        </span>
                      </div>
                    </div>
                    <h2>{game.title}</h2>
                    <p className="game-panel__tagline">{game.tagline}</p>
                    <p className="game-panel__desc">{game.description}</p>
                    <button className="btn btn--glow interactive" style={{ borderColor: game.color, color: game.color }}>
                      <Play size={16} fill="currentColor" /> Play Now
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
