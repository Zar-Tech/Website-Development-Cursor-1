import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/content';

export default function Blog() {
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
            Latest <span className="gradient-text">News</span>
          </motion.h1>
          <motion.p
            className="section-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Updates, announcements, and behind-the-scenes stories from FAMZ Games
          </motion.p>
        </div>
      </div>

      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="blog-grid">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              className="blog-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="blog-card-image">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
              <div className="blog-card-body">
                <div className="blog-date">{post.date}</div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <span className="read-more">
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
