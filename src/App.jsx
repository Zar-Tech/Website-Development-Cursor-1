import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import Home from './pages/Home';
import Games from './pages/Games';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="app">
      <CursorGlow />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}
