import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Gamepad2 } from 'lucide-react';

export default function GameCard({ game, index }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.article
      ref={cardRef}
      className="game-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
    >
      <div className="game-card-image">
        <img src={game.image} alt={game.title} loading="lazy" />
        <div className="game-card-overlay" />
      </div>
      <div className="game-card-body">
        <span className="game-card-genre" style={{ color: game.color }}>
          {game.genre}
        </span>
        <h3 className="game-card-title">{game.title}</h3>
        <p className="game-card-desc">{game.description}</p>
        <div className="game-card-meta">
          <span className="game-card-rating">
            <Star size={14} fill="#fbbf24" color="#fbbf24" />
            {game.rating}%
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Users size={14} />
            {game.players}
          </span>
        </div>
        <button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '1rem' }}
          onClick={() => alert(`Launching ${game.title}... Coming soon!`)}
        >
          <Gamepad2 size={16} />
          Play Now
        </button>
      </div>
    </motion.article>
  );
}
