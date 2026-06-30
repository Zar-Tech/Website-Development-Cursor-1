import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Loader() {
  const { loading, finishLoading } = useApp();
  const progressRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      progressRef.current += Math.random() * 18 + 5;
      const bar = document.getElementById('loader-bar');
      const pct = document.getElementById('loader-pct');
      if (bar) bar.style.width = `${Math.min(progressRef.current, 100)}%`;
      if (pct) pct.textContent = `${Math.min(Math.floor(progressRef.current), 100)}%`;

      if (progressRef.current >= 100) {
        clearInterval(interval);
        setTimeout(finishLoading, 500);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [finishLoading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader__aurora" aria-hidden="true">
            <div className="loader__blob loader__blob--1" />
            <div className="loader__blob loader__blob--2" />
          </div>

          <motion.div
            className="loader-inner"
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loader-logo">
              <span className="loader-logo-famz">FAMZ</span>
              <span className="loader-logo-games">GAMES</span>
            </div>

            <div className="loader-ring">
              <div className="loader-ring-outer" />
              <div className="loader-ring-inner" />
              <div className="loader-ring-core" />
            </div>

            <div className="loader-bar-track">
              <div className="loader-bar-fill" id="loader-bar" />
            </div>
            <div className="loader-pct" id="loader-pct">
              0%
            </div>
            <p className="loader-text">Loading immersive experience...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
