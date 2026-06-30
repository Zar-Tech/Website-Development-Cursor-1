import { useState } from 'react';
import { motion } from 'framer-motion';
import GameCard from '../components/GameCard';
import { games } from '../data/content';

const genres = ['All', ...new Set(games.map((g) => g.genre))];

export default function Games() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All' ? games : games.filter((g) => g.genre === activeFilter);

  return (
    <motion.div
      className="page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="page-header">
        <div className="container page-header-content">
          <motion.h1
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our <span className="gradient-text">Games</span>
          </motion.h1>
          <motion.p
            className="section-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Explore our diverse collection of games, from action-packed adventures to
            strategic challenges
          </motion.p>
        </div>
      </div>

      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="filter-tabs">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`filter-tab ${activeFilter === genre ? 'active' : ''}`}
              onClick={() => setActiveFilter(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        <motion.div
          className="games-grid"
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}
