import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import WorldCanvas from './components/WorldCanvas';
import AuroraBackground from './components/AuroraBackground';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Games from './pages/Games';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import './styles/index.css';

export default function App() {
  return (
    <AppProvider>
      <Loader />
      <WorldCanvas />
      <AuroraBackground />
      <CustomCursor />
      <SmoothScroll>
        <div className="app-shell">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </AppProvider>
  );
}
