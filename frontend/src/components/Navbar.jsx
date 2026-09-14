import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Code } from 'lucide-react';
import { COMPANY_INFO } from '../constants/content';
import { Link, useRouter } from '../context/RouterContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath, navigate } = useRouter();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Why Us', path: '/why-us' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md shadow-xs py-3 border-b border-slate-200/80'
          : 'bg-white/65 backdrop-blur-xs py-4 border-b border-slate-200/40'
      }`}
    >
      <div className="max-w-container-max mx-auto px-gutter flex justify-between items-center">
        {/* Brand Logo with Motto Pill */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
        >
          <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs">
            <Code className="w-4 h-4 text-amber-400" />
          </span>
          <div className="flex items-center gap-2">
            <span className="text-text-main font-bold tracking-tight text-base sm:text-lg">
              {COMPANY_INFO.name}
            </span>
            <span className="hidden xl:inline-block text-xs font-mono text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-bold uppercase">
              You Own It. You Control It.
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-7 items-center" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-sm font-semibold transition-colors duration-150 py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-amber-600 font-bold'
                    : 'text-text-muted hover:text-text-main'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            onClick={() => handleLinkClick('/contact')}
            className="bg-accent-warm text-text-main font-label-md text-sm px-5 py-2.5 rounded-DEFAULT hover:bg-amber-400 transition-all flex items-center gap-1.5 font-bold shadow-xs cursor-pointer card-hover-lift"
          >
            Get a Quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-text-main p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-slate-200 px-gutter py-5 shadow-xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`text-base py-2 font-medium transition-colors ${
                      isActive ? 'text-amber-600 font-bold' : 'text-text-main'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                onClick={() => handleLinkClick('/contact')}
                className="mt-2 w-full bg-accent-warm text-text-main font-bold text-sm py-3 rounded-DEFAULT text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
