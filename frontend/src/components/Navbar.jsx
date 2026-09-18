import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Terminal } from 'lucide-react';
import { COMPANY_INFO } from '../constants/content';
import { Link, useRouter } from '../context/RouterContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath, navigate } = useRouter();

  // Minimal streamlined nav links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-3 sm:px-6 pt-3 sm:pt-4 transition-all duration-300">
      {/* Floating Island with Glassmorphism */}
      <div
        className={`pointer-events-auto max-w-5xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-6 ${
          isScrolled
            ? 'glass-header-scrolled py-2 sm:py-2.5'
            : 'glass-header py-2.5 sm:py-3'
        }`}
      >
        <div className="relative flex justify-between items-center">
          {/* Minimal Clean Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 group cursor-pointer z-10"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:scale-105 transition-all shadow-xs">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <span className="text-text-main font-headline font-bold text-base sm:text-lg tracking-tight group-hover:text-amber-600 transition-colors">
              {COMPANY_INFO.name}
            </span>
          </Link>

          {/* Minimal Desktop Nav Links (Precisely Centered) */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 z-10" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`relative text-xs sm:text-sm px-3.5 py-1.5 rounded-full font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-slate-950 font-bold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-900/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFloatingTab"
                      className="absolute inset-0 bg-slate-900/10 rounded-full -z-10 border border-slate-900/10 backdrop-blur-xs"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Desktop CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2 z-10">
            {/* Desktop Right CTA Button */}
            <div className="hidden md:flex items-center">
              <Link
                to="/contact"
                onClick={() => handleLinkClick('/contact')}
                className="bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-700 hover:text-slate-900 p-1.5 rounded-full hover:bg-slate-100/70 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-auto max-w-sm mx-auto mt-2.5 glass-header rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? currentPath === '/'
                    : currentPath.startsWith(link.path);

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`text-sm py-2.5 px-3.5 rounded-xl font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-50 text-amber-800 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <Link
                to="/contact"
                onClick={() => handleLinkClick('/contact')}
                className="mt-3 w-full bg-slate-950 text-white text-sm font-semibold py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
