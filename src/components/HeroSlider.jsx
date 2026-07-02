import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { games } from '../data/content';
import { getGameImage } from '../utils/gameImage';
import GamePlayLink from './GamePlayLink';

const AUTOPLAY_MS = 5500;
const slides = games.filter((game) => game.images?.icon);

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(Date.now());

  const slide = slides[index];
  const total = slides.length;

  const goTo = useCallback(
    (i) => {
      setIndex(((i % total) + total) % total);
      setProgress(0);
      startRef.current = Date.now();
    },
    [total]
  );

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  useEffect(() => {
    if (!playing || total === 0) return;

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / AUTOPLAY_MS) * 100, 100);
      setProgress(pct);

      if (elapsed >= AUTOPLAY_MS) {
        goTo(index + 1);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index, playing, goTo, total]);

  if (total === 0) return null;

  return (
    <div
      className="hero-slider interactive"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => {
        setPlaying(true);
        startRef.current = Date.now() - (progress / 100) * AUTOPLAY_MS;
      }}
    >
      <div className="hero-slider__viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="hero-slider__slide"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ '--slide-color': slide.color }}
          >
            <div
              className="hero-slider__glow"
              style={{ background: `radial-gradient(circle, ${slide.color}33 0%, transparent 70%)` }}
              aria-hidden="true"
            />
            <GamePlayLink game={slide} className="hero-slider__game interactive">
              <span className="hero-slider__icon">
                <img src={getGameImage(slide, 'icon')} alt="" />
              </span>
              <h3 className="hero-slider__title">{slide.title}</h3>
            </GamePlayLink>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero-slider__controls">
        <button className="hero-slider__arrow interactive" onClick={prev} aria-label="Previous slide">
          <ChevronLeft size={20} />
        </button>

        <div className="hero-slider__dots">
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={`hero-slider__dot interactive ${i === index ? 'hero-slider__dot--active' : ''}`}
              style={{ '--dot-color': s.color }}
              onClick={() => goTo(i)}
              aria-label={`Go to ${s.title}`}
            />
          ))}
        </div>

        <button className="hero-slider__arrow interactive" onClick={next} aria-label="Next slide">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="hero-slider__footer">
        <div className="hero-slider__progress">
          <div
            className="hero-slider__progress-fill"
            style={{ width: `${progress}%`, background: slide.color }}
          />
        </div>
        <button
          className="hero-slider__playpause interactive"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
        >
          {playing ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
        </button>
        <span className="hero-slider__counter">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
