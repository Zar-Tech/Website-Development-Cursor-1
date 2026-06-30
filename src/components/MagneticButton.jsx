import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function useMagnetic() {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return { ref, onMouseMove, onMouseLeave };
}

export function MagneticLink({ to, className, children }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic();

  return (
    <motion.div style={{ display: 'inline-block' }} whileTap={{ scale: 0.97 }}>
      <Link
        ref={ref}
        to={to}
        className={className}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Link>
    </motion.div>
  );
}

export function MagneticButton({ className, children, onClick, type = 'button' }) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic();

  return (
    <motion.button
      ref={ref}
      type={type}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
