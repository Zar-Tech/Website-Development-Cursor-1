import { Users, Zap, Heart, Gamepad2 } from 'lucide-react';
import Reveal from '../components/Reveal';
import { games, values } from '../data/content';
import { getGameImage } from '../utils/gameImage';

const icons = { users: Users, zap: Zap, heart: Heart, gamepad: Gamepad2 };

const featuredGames = games.filter((g) => g.images);

export default function About() {
  const [brainDash, xoRivals] = featuredGames;

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <span className="section__eyebrow">Our Story</span>
            <h1 className="page-hero__title">
              Indie Studio, <span className="text-accent">Player-First Games</span>
            </h1>
            <p className="page-hero__desc">
              FAMZ Games builds fast, fun mobile experiences — from brain-busting trivia to
              classic board-game rivalries.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-intro">
          <Reveal>
            <div className="about-showcase">
              <div className="about-showcase__ambient" aria-hidden="true">
                <span className="about-showcase__orb about-showcase__orb--cyan" />
                <span className="about-showcase__orb about-showcase__orb--magenta" />
              </div>

              <div
                className="about-showcase__card about-showcase__card--primary"
                style={{ '--game-color': brainDash.color, '--game-accent': brainDash.accent }}
              >
                <img src={getGameImage(brainDash, 'hero')} alt={brainDash.title} loading="lazy" />
                <div className="about-showcase__card-overlay" />
                <div className="about-showcase__card-meta">
                  <img src={getGameImage(brainDash, 'icon')} alt="" />
                  <div>
                    <strong>{brainDash.title}</strong>
                    <span>{brainDash.genre}</span>
                  </div>
                </div>
              </div>

              <div
                className="about-showcase__card about-showcase__card--secondary"
                style={{ '--game-color': xoRivals.color, '--game-accent': xoRivals.accent }}
              >
                <img src={getGameImage(xoRivals, 'hero')} alt={xoRivals.title} loading="lazy" />
                <div className="about-showcase__card-overlay" />
                <div className="about-showcase__card-meta">
                  <img src={getGameImage(xoRivals, 'icon')} alt="" />
                  <div>
                    <strong>{xoRivals.title}</strong>
                    <span>{xoRivals.genre}</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="about-story">
              <p>
                FAMZ Games is an independent mobile studio focused on bite-sized games that are easy
                to pick up and hard to put down. We design for quick sessions on the go — sharp
                mechanics, bold visuals, and moments that keep players coming back.
              </p>
              <p>
                Our lineup includes <strong>Brain Dash</strong>, a fast-paced trivia challenge that
                tests how quickly you can think under pressure, and <strong>XO Rivals</strong>, a
                modern take on classic tic-tac-toe built for friendly competition. Every release
                is shaped by player feedback, polished through iteration, and tuned for mobile.
              </p>
              <p>
                We are a small team with big ambitions: create games that feel great in your
                pocket, connect players with friends, and grow alongside the community that plays
                them.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--glass">
        <div className="container">
          <Reveal>
            <div className="section__header">
              <span className="section__eyebrow">What Drives Us</span>
              <h2 className="section__title">
                Our Core <span className="text-accent">Values</span>
              </h2>
            </div>
          </Reveal>

          <div className="values-grid">
            {values.map((v, i) => {
              const Icon = icons[v.icon];
              return (
                <Reveal key={v.title} delay={i * 0.1}>
                  <div className="value-card interactive">
                    <div className="value-card__icon">
                      <Icon size={24} />
                    </div>
                    <h3>{v.title}</h3>
                    <p>{v.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
