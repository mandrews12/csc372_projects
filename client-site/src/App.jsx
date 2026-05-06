// Main application component for the client site, which sets up routing, user authentication state management, and renders the NavBar, Footer, and LoginModal components along with the main page content based on the current route. It also checks for admin privileges to conditionally render the update product page for admin users only.
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';

import Index from './pages/Index';
import Products from './pages/Products';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Update from './pages/Update';

import './index.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Get current session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      console.log('User:', session?.user);
    });

    // Listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Check if the user has admin privileges based on their app metadata role, which will be used to conditionally render admin-only routes and features in the application
  const isAdmin = user?.app_metadata?.role === 'admin';

  return (
    <div className="site-shell">
      
      <NavBar user={user} setIsModalOpen={setIsModalOpen} />

      <main className="page-content container">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Admin-only route for updating products */}
          <Route
            path="/update"
            element={
              user?.app_metadata?.role === 'admin' ? (
                <Update />
              ) : (
                <NotFound />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <LoginModal 
        isOpen={isModalOpen} 
        setIsOpen={setIsModalOpen} 
      />
      
    </div>
  );
}