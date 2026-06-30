import { useEffect } from 'react';
import Lenis from 'lenis';
import { useApp } from '../context/AppContext';

export default function SmoothScroll({ children }) {
  const { setScrollProgress } = useApp();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ({ scroll, limit }) => {
      setScrollProgress(scroll / limit);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [setScrollProgress]);

  return children;
}
