import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <span className="section__eyebrow">Contact</span>
            <h1 className="page-hero__title">
              Get in <span className="text-accent">Touch</span>
            </h1>
            <p className="page-hero__desc">
              Have a question or want to work with us? We would love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <Reveal direction="left">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="press">Press & Media</option>
                    <option value="support">Game Support</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                <button type="submit" className="btn btn--glow interactive">
                  <Send size={16} /> Send Message
                </button>
              </form>
            </Reveal>

            <Reveal direction="right" delay={0.15}>
              <div className="contact-info">
                <h3>Contact Information</h3>
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:hello@famzgames.com" className="interactive">
                      hello@famzgames.com
                    </a>
                  </div>
                </div>
                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong>Studio</strong>
                    <span>Independent Game Studio · Est. 2019</span>
                  </div>
                </div>
                <div className="contact-info__card">
                  <strong>Join our community</strong>
                  <p>Connect on Discord, Twitter, and YouTube for updates and behind-the-scenes content.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {sent && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
          >
            <CheckCircle size={20} />
            Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
