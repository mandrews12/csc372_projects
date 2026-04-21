import Header from './components/NavBar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Products from './pages/Products';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import About from './pages/About';
import './index.css';


export default function App() {
  return (
    <div className="site-shell">
      <Header />

      <main className="page-content container">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}