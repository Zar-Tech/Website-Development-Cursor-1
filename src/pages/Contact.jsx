import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, MessageSquare, CheckCircle } from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
            Get in <span className="gradient-text">Touch</span>
          </motion.h1>
          <motion.p
            className="section-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Have a question, partnership idea, or just want to say hello? We would love to
            hear from you.
          </motion.p>
        </div>
      </div>

      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="contact-grid">
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
              >
                <option value="">Select a topic</option>
                <option value="general">General Inquiry</option>
                <option value="partnership">Partnership</option>
                <option value="press">Press & Media</option>
                <option value="support">Game Support</option>
                <option value="careers">Careers</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us what's on your mind..."
              />
            </div>
            <MagneticButton type="submit" className="btn btn-primary glow-effect">
              <MessageSquare size={18} />
              Send Message
            </MagneticButton>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="contact-info-card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                Contact Information
              </h3>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Email</div>
                  <a
                    href="mailto:hello@famzgames.com"
                    style={{ color: 'var(--primary)' }}
                  >
                    hello@famzgames.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Studio</div>
                  <span style={{ color: 'var(--muted-foreground)' }}>
                    Independent Game Studio
                    <br />
                    Est. 2019
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius)',
                  background: 'rgba(34, 211, 238, 0.05)',
                  border: '1px solid rgba(34, 211, 238, 0.15)',
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                  Join our community
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                  Connect with us on Discord, Twitter, and YouTube for the latest updates
                  and behind-the-scenes content.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {sent && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 20 }}
          >
            <CheckCircle size={20} color="var(--primary)" />
            Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
