import { Link } from 'react-router-dom';
import { Twitter, MessageCircle, Instagram, Youtube } from 'lucide-react';
import { socialLinks } from '../data/content';

const icons = { Twitter, Discord: MessageCircle, Instagram, YouTube: Youtube };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand-col">
            <div className="footer__brand">
              <span className="nav__brand-famz">FAMZ</span>
              <span className="nav__brand-games">GAMES</span>
            </div>
            <p className="footer__tagline">
              Creating immersive gaming experiences that bring players together from around the world.
            </p>
            <div className="footer__socials">
              {socialLinks.map((s) => {
                const Icon = icons[s.name];
                return (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="footer__social interactive" aria-label={s.name}>
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer__col">
            <h4>Quick Links</h4>
            <Link to="/" className="interactive">Home</Link>
            <Link to="/games" className="interactive">Games</Link>
            <Link to="/about" className="interactive">About</Link>
            <Link to="/blog" className="interactive">Blog</Link>
          </div>

          <div className="footer__col">
            <h4>Connect With Us</h4>
            <a href="mailto:hello@famzgames.com" className="interactive">hello@famzgames.com</a>
            <span>Indie Game Studio</span>
            <span>Est. 2019</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>&copy; {year} FAMZ Games. All rights reserved.</span>
          <div className="footer__legal">
            <a href="#" className="interactive">Privacy Policy</a>
            <a href="#" className="interactive">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
