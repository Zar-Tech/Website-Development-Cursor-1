import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroScene from '../components/HeroScene';
import GameCard from '../components/GameCard';
import GameShowcase3D from '../components/GameShowcase3D';
import { MagneticLink } from '../components/MagneticButton';
import { games } from '../data/content';

const stats = [
  { value: '6+', label: 'Games' },
  { value: '25K+', label: 'Players' },
  { value: '94%', label: 'Avg Rating' },
  { value: '2019', label: 'Founded' },
];

export default function Home() {
  const featured = games.slice(0, 3);

  return (
    <motion.div
      className="page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="hero">
        <HeroScene />
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles size={16} />
            New games launching soon
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="gradient-text">Immersive</span> Gaming Worlds
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            From retro adventures to futuristic races, discover your next favorite game
            from FAMZ Games.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <MagneticLink to="/games" className="btn btn-primary glow-effect">
              Explore Games <ArrowRight size={18} />
            </MagneticLink>
            <MagneticLink to="/about" className="btn btn-outline">
              Our Story
            </MagneticLink>
          </motion.div>
        </div>
      </section>

      <section className="section container">
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="section container">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Games
          </motion.h2>
          <motion.p
            className="section-desc"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Hand-picked titles that showcase the best of what we create
          </motion.p>
        </div>

        <div className="games-grid">
          {featured.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>

        <motion.div
          style={{ textAlign: 'center', marginTop: '2.5rem' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <MagneticLink to="/games" className="btn btn-outline">
            View All Games <ArrowRight size={18} />
          </MagneticLink>
        </motion.div>
      </section>

      <section className="section container">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Interactive 3D Showcase
          </motion.h2>
          <motion.p
            className="section-desc"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Each cube represents one of our games — spinning with unique energy
          </motion.p>
        </div>
        <GameShowcase3D />
      </section>

      <section className="section container">
        <motion.div
          className="cta-banner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Join Our Gaming Community</h3>
          <p>
            Connect with fellow players, get early access to new releases, and shape the
            future of our games.
          </p>
          <MagneticLink to="/contact" className="btn btn-primary glow-effect">
            Get in Touch <ArrowRight size={18} />
          </MagneticLink>
        </motion.div>
      </section>
    </motion.div>
  );
}
