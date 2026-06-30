import { Users, Zap, Heart, Gamepad2 } from 'lucide-react';
import Reveal from '../components/Reveal';
import { team, values } from '../data/content';

const icons = { users: Users, zap: Zap, heart: Heart, gamepad: Gamepad2 };

export default function About() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <span className="section__eyebrow">Our Story</span>
            <h1 className="page-hero__title">
              Building Worlds That <span className="text-accent">Bring Players Together</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="about-hero-img">
              <img
                src="https://images.unsplash.com/photo-1672754091891-b58ed53665e6?w=1200&q=80"
                alt="FAMZ Games studio"
              />
              <div className="about-hero-img__overlay" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="about-story">
              <p>
                Founded in 2019, FAMZ Games started with a simple mission: create games that players
                genuinely want to play. What began as a small indie studio has grown into a passionate
                team dedicated to crafting immersive experiences.
              </p>
              <p>
                We believe great games come from listening to our community, iterating constantly, and
                never settling for good enough. Every pixel, every mechanic, every story beat is designed
                with care.
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

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section__header">
              <span className="section__eyebrow">The Team</span>
              <h2 className="section__title">
                Meet the <span className="text-accent">Team</span>
              </h2>
            </div>
          </Reveal>

          <div className="team-grid">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.1}>
                <div className="team-card interactive">
                  <div className="team-card__img-wrap">
                    <img src={member.image} alt={member.name} />
                    <div className="team-card__ring" />
                  </div>
                  <h3>{member.name}</h3>
                  <span>{member.role}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
