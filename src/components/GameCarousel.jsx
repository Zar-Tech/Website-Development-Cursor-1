import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Users, Play } from 'lucide-react';
import { games } from '../data/content';
import { getGameImage } from '../utils/gameImage';
import { useApp } from '../context/AppContext';

function GamePlayLink({ game, className, children, onClick, style }) {
  if (game.playUrl) {
    return (
      <a
        href={game.playUrl}
        className={className}
        style={style}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to="/games" className={className} style={style} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function GameCarousel() {
  const [index, setIndex] = useState(0);
  const { setActiveGame } = useApp();
  const game = games[index];

  const go = (i) => {
    setIndex(i);
    setActiveGame(i);
  };

  const prev = () => go((index - 1 + games.length) % games.length);
  const next = () => go((index + 1) % games.length);

  return (
    <div className="carousel">
      <div className="carousel__glow" style={{ background: `radial-gradient(ellipse, ${game.color}22 0%, transparent 70%)` }} />

      <div className="carousel__stage">
        {games.map((g, i) => {
          const offset = i - index;
          const abs = Math.abs(offset);
          const isActive = i === index;

          return (
            <motion.div
              key={g.id}
              className={`carousel__card interactive ${isActive ? 'carousel__card--active' : ''}`}
              animate={{
                x: offset * 300,
                z: isActive ? 0 : -abs * 140,
                rotateY: offset * -20,
                scale: isActive ? 1 : 0.78,
                opacity: abs > 2 ? 0 : isActive ? 1 : 0.45,
              }}
              transition={{ type: 'spring', stiffness: 180, damping: 26 }}
              style={{
                zIndex: games.length - abs,
                '--card-color': g.color,
              }}
              onClick={() => !isActive && go(i)}
            >
              <div className="carousel__card-frame" />
              <div className="carousel__card-img">
                <img src={getGameImage(g, 'card')} alt={g.title} draggable={false} />
                <div className="carousel__card-gradient" />
                {isActive && (
                  <div className="carousel__play-wrap">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <GamePlayLink
                        game={g}
                        className="carousel__play-btn interactive"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Play size={22} fill="currentColor" strokeWidth={0} />
                      </GamePlayLink>
                    </motion.div>
                  </div>
                )}
              </div>
              <div className="carousel__card-body">
                <div className="carousel__card-top">
                  <span className="carousel__genre">{g.genre}</span>
                  {isActive && (
                    <span className="carousel__rating-badge">
                      <Star size={11} fill="#fbbf24" color="#fbbf24" /> {g.rating}%
                    </span>
                  )}
                </div>
                <h3>{g.title}</h3>
                <p>{g.tagline}</p>
                {isActive && (
                  <motion.div
                    className="carousel__card-meta"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span>
                      <Users size={13} /> {g.players} players
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="carousel__controls">
        <button className="carousel__btn interactive" onClick={prev} aria-label="Previous">
          <ChevronLeft size={22} />
        </button>

        <div className="carousel__dots">
          {games.map((g, i) => (
            <button
              key={g.id}
              className={`carousel__dot interactive ${i === index ? 'carousel__dot--active' : ''}`}
              style={{ '--dot-color': g.color }}
              onClick={() => go(i)}
              aria-label={g.title}
            />
          ))}
        </div>

        <button className="carousel__btn interactive" onClick={next} aria-label="Next">
          <ChevronRight size={22} />
        </button>
      </div>

      <motion.div
        key={game.id}
        className="carousel__detail"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p>{game.description}</p>
        <GamePlayLink
          game={game}
          className="btn btn--primary interactive"
          style={{ '--btn-color': game.color }}
        >
          <span className="btn__bg" />
          <span className="btn__text">
            <Play size={16} fill="currentColor" /> Play {game.title}
          </span>
        </GamePlayLink>
      </motion.div>
    </div>
  );
}
