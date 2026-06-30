import { motion } from 'framer-motion';
import { Users, Lightbulb, Heart, Gamepad2 } from 'lucide-react';
import { team, values } from '../data/content';

const iconMap = {
  users: Users,
  lightbulb: Lightbulb,
  heart: Heart,
  gamepad: Gamepad2,
};

export default function About() {
  return (
    <motion.div
      className="page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="page-header">
        <div className="container page-header-content">
          <motion.h1
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About <span className="gradient-text">FAMZ Games</span>
          </motion.h1>
          <motion.p
            className="section-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            The passionate team behind immersive gaming experiences
          </motion.p>
        </div>
      </div>

      <section className="section container" style={{ paddingTop: 0 }}>
        <motion.div
          className="about-hero-image"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1672754091891-b58ed53665e6?w=1200&q=80"
            alt="FAMZ Games studio"
          />
        </motion.div>

        <motion.div
          style={{ maxWidth: '48rem', margin: '0 auto 4rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Founded in 2019, FAMZ Games started with a simple mission: create games that
            players genuinely want to play. What began as a small indie studio has grown
            into a passionate team dedicated to crafting immersive experiences.
          </p>
          <p style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
            We believe great games come from listening to our community, iterating
            constantly, and never settling for good enough. Every pixel, every mechanic,
            every story beat is designed with care.
          </p>
        </motion.div>

        <div className="section-header">
          <h2 className="section-title">Our Values</h2>
          <p className="section-desc">Our core values guide every game we create</p>
        </div>

        <div className="values-grid">
          {values.map((value, i) => {
            const Icon = iconMap[value.icon];
            return (
              <motion.div
                key={value.title}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="value-icon">
                  <Icon size={24} />
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Meet the Team</h2>
          <p className="section-desc">The talented people behind FAMZ Games</p>
        </div>

        <div className="team-grid">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="team-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <img src={member.image} alt={member.name} className="team-avatar" />
              <div className="team-name">{member.name}</div>
              <div className="team-role">{member.role}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
