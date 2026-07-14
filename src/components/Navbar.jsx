import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Games', path: '/games' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner container">
          <Link to="/" className="nav__brand interactive">
            <span className="nav__brand-famz">FAMZ</span>
            <span className="nav__brand-games">GAMES</span>
          </Link>

          <nav className="nav__links">
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`nav__link interactive ${location.pathname === l.path ? 'nav__link--active' : ''}`}
              >
                <span className="nav__link-text">{l.name}</span>
                <span className="nav__link-line" />
              </Link>
            ))}
          </nav>

          <Link to="/games" className="nav__cta btn btn--primary interactive">
            <span className="btn__bg" />
            <span className="btn__text">Play Now</span>
          </Link>

          <button
            className="nav__toggle interactive"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__mobile"
            initial={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.path}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <Link to={l.path} className="nav__mobile-link interactive" onClick={() => setOpen(false)}>
                  {l.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Link
                to="/games"
                className="btn btn--primary btn--lg interactive nav__mobile-cta"
                onClick={() => setOpen(false)}
              >
                <span className="btn__bg" />
                <span className="btn__text">Play Now</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
