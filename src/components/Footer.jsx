import { Link } from 'react-router-dom';
import { Twitter, MessageCircle, Instagram, Youtube } from 'lucide-react';
import { socialLinks } from '../data/content';

const iconMap = {
  Twitter: Twitter,
  Discord: MessageCircle,
  Instagram: Instagram,
  YouTube: Youtube,
};

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Games', path: '/games' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand gradient-text">FAMZ Games</div>
            <p className="footer-desc">
              Creating immersive gaming experiences since 2019. From retro adventures to
              futuristic races.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <div className="footer-heading">Navigation</div>
            <div className="footer-links">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-heading">Contact</div>
            <div className="footer-links">
              <a href="mailto:hello@famzgames.com">hello@famzgames.com</a>
              <span>Indie Game Studio</span>
              <span>Est. 2019</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} FAMZ Games. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
