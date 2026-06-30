import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { blogPosts } from '../data/content';

export default function Blog() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <span className="section__eyebrow">News & Updates</span>
            <h1 className="page-hero__title">
              Latest from <span className="text-accent">FAMZ Games</span>
            </h1>
            <p className="page-hero__desc">
              Stay up to date with announcements, dev logs, and community highlights.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-list">
            {blogPosts.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.08}>
                <article className={`blog-item interactive ${i === 0 ? 'blog-item--featured' : ''}`}>
                  <div className="blog-item__img">
                    <img src={post.image} alt={post.title} loading="lazy" />
                  </div>
                  <div className="blog-item__body">
                    <time>{post.date}</time>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <span className="blog-item__link">
                      Read Article <ArrowRight size={15} />
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
