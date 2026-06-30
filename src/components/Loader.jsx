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
        setTimeout(finishLoading, 400);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [finishLoading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loader"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-inner">
            <div className="loader-logo">
              <span className="loader-logo-famz">FAMZ</span>
              <span className="loader-logo-games">GAMES</span>
            </div>
            <div className="loader-ring">
              <div className="loader-ring-inner" />
              <div className="loader-ring-outer" />
            </div>
            <div className="loader-bar-track">
              <div className="loader-bar-fill" id="loader-bar" />
            </div>
            <div className="loader-pct" id="loader-pct">
              0%
            </div>
            <p className="loader-text">Loading immersive experience...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
