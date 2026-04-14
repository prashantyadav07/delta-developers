import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../constants/navLinks';
import { siteConfig } from '../../constants/config';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center pt-6 px-6 pointer-events-none ${
        scrolled ? 'translate-y-[-10px]' : 'translate-y-0'
      }`}
    >
      <div className={`
        w-full max-w-6xl pointer-events-auto transition-all duration-500
        ${scrolled ? 'glass-heavy py-2 px-8 rounded-2xl shadow-xl' : 'glass py-2.5 px-10 rounded-3xl shadow-sm'}
        flex items-center justify-between border border-white/20
      `}>
        
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold tracking-tight text-black z-50 flex items-center gap-2 group">
          <span className="text-black drop-shadow-sm">{siteConfig.name}</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path}
              className={({ isActive }) => 
                `text-[15px] font-medium transition-all duration-300 ${
                  isActive ? 'text-black' : 'text-black/70 hover:text-black'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <NavLink 
            to="/contact" 
            className="px-8 py-2.5 text-[15px] font-bold bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center gap-2"
          >
            Start Project
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 text-black p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-background/90"
          >
            <div className="flex flex-col items-center justify-center h-full gap-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-bold tracking-tight text-black/80 hover:text-black transition-all duration-300"
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <NavLink 
                  to="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-6 px-12 py-4 text-xl font-black bg-black text-white rounded-full shadow-2xl"
                >
                  Start Project
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
