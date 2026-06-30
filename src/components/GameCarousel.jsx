import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Users, Play } from 'lucide-react';
import { games } from '../data/content';
import { useApp } from '../context/AppContext';

export default function GameCarousel() {
  const [index, setIndex] = useState(0);
  const { setActiveGame } = useApp();
  const dragRef = useRef(null);
  const game = games[index];

  const prev = () => {
    const next = (index - 1 + games.length) % games.length;
    setIndex(next);
    setActiveGame(next);
  };

  const next = () => {
    const n = (index + 1) % games.length;
    setIndex(n);
    setActiveGame(n);
  };

  return (
    <div className="carousel" ref={dragRef}>
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
                x: offset * 280,
                z: isActive ? 0 : -abs * 120,
                rotateY: offset * -18,
                scale: isActive ? 1 : 0.82,
                opacity: abs > 2 ? 0 : isActive ? 1 : 0.5,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 28 }}
              style={{
                zIndex: games.length - abs,
                borderColor: isActive ? g.color : 'transparent',
                boxShadow: isActive ? `0 0 40px ${g.color}44, 0 20px 60px rgba(0,0,0,0.5)` : 'none',
              }}
              onClick={() => {
                if (!isActive) {
                  setIndex(i);
                  setActiveGame(i);
                }
              }}
            >
              <div className="carousel__card-img">
                <img src={g.image} alt={g.title} draggable={false} />
                <div className="carousel__card-gradient" style={{ background: `linear-gradient(to top, ${g.color}33, transparent)` }} />
              </div>
              <div className="carousel__card-body">
                <span className="carousel__genre" style={{ color: g.color }}>
                  {g.genre}
                </span>
                <h3>{g.title}</h3>
                <p>{g.tagline}</p>
                {isActive && (
                  <motion.div
                    className="carousel__card-meta"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span>
                      <Star size={13} fill="#fbbf24" color="#fbbf24" /> {g.rating}%
                    </span>
                    <span>
                      <Users size={13} /> {g.players}
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
              style={{ background: i === index ? g.color : undefined }}
              onClick={() => {
                setIndex(i);
                setActiveGame(i);
              }}
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
        <button className="btn btn--glow interactive" style={{ borderColor: game.color, color: game.color }}>
          <Play size={16} fill="currentColor" /> Play {game.title}
        </button>
      </motion.div>
    </div>
  );
}
