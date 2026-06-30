import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const { setMouse } = useApp();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    const onEnter = () => {
      dot.classList.add('hovering');
      ring.classList.add('hovering');
    };
    const onLeave = () => {
      dot.classList.remove('hovering');
      ring.classList.remove('hovering');
    };

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, .interactive').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, [setMouse]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
