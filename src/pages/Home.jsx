import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import GameCarousel from '../components/GameCarousel';
import StatsBar from '../components/StatsBar';
import Marquee from '../components/Marquee';
import Reveal from '../components/Reveal';
import { games } from '../data/content';

export default function Home() {
  return (
    <div className="home">
      <section className="hero hero--split">
        <div className="hero__orbs" aria-hidden="true">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
        </div>

        <div className="container hero__split">
          {/* Left: headline + CTAs */}
          <div className="hero__content">
            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Sparkles size={14} />
              <span>New games launching soon</span>
              <span className="hero__badge-pulse" />
            </motion.div>

            <div className="hero__title-wrap">
              <motion.h1
                className="hero__title"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="hero__line">Where Worlds</span>
                <span className="hero__line hero__line--accent">
                  <span className="shimmer-text">Come to Life</span>
                </span>
              </motion.h1>
            </div>

            <motion.p
              className="hero__sub"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            >
              Join thousands of players in our immersive gaming worlds. From retro adventures to
              futuristic races, find your next favorite game.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <Link to="/games" className="btn btn--primary btn--lg interactive">
                <span className="btn__bg" />
                <span className="btn__text">
                  Explore Games <ArrowRight size={18} />
                </span>
              </Link>
              <Link to="/contact" className="btn btn--ghost btn--lg interactive">
                Get in Touch
              </Link>
            </motion.div>

            <motion.div
              className="hero__tags"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              {['Adventure', 'Racing', 'RPG', 'Action'].map((tag) => (
                <span key={tag} className="hero__tag">
                  <Zap size={11} /> {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: image/video slider */}
          <motion.div
            className="hero__slider-wrap"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero__slider-label">
              <span className="hero__slider-label-dot" />
              Featured Showcase
            </p>
            <HeroSlider />
          </motion.div>
        </div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span>Scroll to explore</span>
          <div className="hero__scroll-line">
            <div className="hero__scroll-dot" />
          </div>
        </motion.div>
      </section>

      <Marquee />

      <section className="section section--glass">
        <div className="container">
          <StatsBar />
        </div>
      </section>

      <section className="section section--carousel" id="games">
        <div className="container">
          <Reveal>
            <div className="section__header">
              <span className="section__eyebrow">Interactive Showcase</span>
              <h2 className="section__title">
                Featured <span className="text-accent">Games</span>
              </h2>
              <p className="section__desc">
                Click, drag, and explore our titles in an interactive 3D carousel
              </p>
            </div>
          </Reveal>
          <GameCarousel />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section__header">
              <span className="section__eyebrow">Our Library</span>
              <h2 className="section__title">
                Discover <span className="text-accent">More</span>
              </h2>
            </div>
          </Reveal>

          <div className="game-grid">
            {games.map((g, i) => (
              <Reveal key={g.id} delay={i * 0.08}>
                <article
                  className="game-tile interactive"
                  style={{ '--tile-color': g.color, '--tile-accent': g.accent }}
                >
                  <div className="game-tile__border" />
                  <div className="game-tile__img">
                    <img src={g.image} alt={g.title} loading="lazy" />
                  </div>
                  <div className="game-tile__overlay" />
                  <div className="game-tile__rating">
                    <span>{g.rating}%</span>
                  </div>
                  <div className="game-tile__content">
                    <span className="game-tile__genre">{g.genre}</span>
                    <h3>{g.title}</h3>
                    <p>{g.tagline}</p>
                  </div>
                  <div className="game-tile__shine" />
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="section__cta-wrap">
            <Link to="/games" className="btn btn--primary interactive">
              <span className="btn__bg" />
              <span className="btn__text">
                View All Games <ArrowRight size={18} />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-block">
              <div className="cta-block__rings" aria-hidden="true">
                <div className="cta-block__ring" />
                <div className="cta-block__ring cta-block__ring--2" />
              </div>
              <div className="cta-block__glow" />
              <span className="cta-block__label">Join the adventure</span>
              <h2>Ready to Play?</h2>
              <p>Join our community and be the first to experience new releases.</p>
              <Link to="/contact" className="btn btn--primary btn--lg interactive">
                <span className="btn__bg" />
                <span className="btn__text">
                  Join the Community <ArrowRight size={18} />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
