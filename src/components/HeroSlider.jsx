import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Image, Film } from 'lucide-react';
import { heroSlides } from '../data/content';

const AUTOPLAY_MS = 5500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(Date.now());

  const slide = heroSlides[index];
  const total = heroSlides.length;

  const goTo = useCallback((i) => {
    setIndex(((i % total) + total) % total);
    setProgress(0);
    startRef.current = Date.now();
  }, [total]);

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // Autoplay timer + progress bar
  useEffect(() => {
    if (!playing) return;

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
  }, [index, playing, goTo]);

  // Play/pause video when slide changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (slide.type === 'video') {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [index, slide.type]);

  return (
    <div
      className="hero-slider interactive"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => {
        setPlaying(true);
        startRef.current = Date.now() - (progress / 100) * AUTOPLAY_MS;
      }}
    >
      {/* Slides */}
      <div className="hero-slider__viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="hero-slider__slide"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {slide.type === 'video' ? (
              <video
                ref={videoRef}
                className="hero-slider__media"
                src={slide.src}
                poster={slide.poster}
                muted
                loop
                playsInline
                autoPlay
              />
            ) : (
              <img className="hero-slider__media" src={slide.src} alt={slide.title} />
            )}
            <div
              className="hero-slider__tint"
              style={{ background: `linear-gradient(135deg, ${slide.color}33, transparent 60%)` }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="hero-slider__info"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
        >
          <span className="hero-slider__type">
            {slide.type === 'video' ? <Film size={12} /> : <Image size={12} />}
            {slide.type === 'video' ? 'Trailer' : 'Screenshot'}
          </span>
          <span className="hero-slider__genre" style={{ color: slide.color }}>
            {slide.genre}
          </span>
          <h3 className="hero-slider__title">{slide.title}</h3>
          <p className="hero-slider__tagline">{slide.tagline}</p>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="hero-slider__controls">
        <button className="hero-slider__arrow interactive" onClick={prev} aria-label="Previous slide">
          <ChevronLeft size={20} />
        </button>

        <div className="hero-slider__dots">
          {heroSlides.map((s, i) => (
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

      {/* Progress + play/pause */}
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
