import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, X, ArrowRight, ShieldCheck, Mail, Sparkles, Terminal } from 'lucide-react';
import { COMPANY_INFO } from '../constants/content';
import { Link } from '../context/RouterContext';

export default function Footer() {
  const [modalContent, setModalContent] = useState(null);
  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;

    const updateHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(footerRef.current);
    window.addEventListener('resize', updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div
      className="relative z-0 w-full bg-slate-950"
      style={{ minHeight: footerHeight ? `${footerHeight}px` : 'auto' }}
    >
      {/* Fully Expanded Footer Background - revealed seamlessly under rounded upper sheet */}
      <footer
        ref={footerRef}
        className="w-full bg-slate-950 text-slate-400 relative md:fixed md:bottom-0 md:left-0 md:right-0 md:z-0 overflow-hidden transition-all duration-300"
      >
        {/* Ambient Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[120px] bg-gradient-to-b from-amber-400/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none -z-0" />

        <div className="max-w-container-max mx-auto px-gutter pt-12 sm:pt-16 pb-28 md:pb-12 relative z-10">
          {/* Top Status Indicator Badge */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-lg text-[11px] sm:text-xs font-mono uppercase tracking-widest text-amber-400 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>{COMPANY_INFO.name} • Architected for Scale</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-10 border-b border-slate-900">
            {/* Brand Col */}
            <div className="md:col-span-6 flex flex-col gap-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-sm">
                  <Terminal className="w-4 h-4 text-slate-950" />
                </div>
                <span className="font-headline text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {COMPANY_INFO.name}
                </span>
              </div>
              <p className="font-headline text-sm sm:text-base font-bold text-amber-400">
                {COMPANY_INFO.subTagline}
              </p>
              <p className="font-body text-sm text-slate-300 leading-relaxed max-w-md">
                {COMPANY_INFO.description}
              </p>
            </div>

            {/* Quick Nav Links */}
            <div className="md:col-span-3 flex flex-col gap-2.5">
              <h4 className="font-headline text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span>Explore</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </h4>
              <div className="flex flex-col gap-2 font-body text-sm">
                <Link to="/services" className="hover:text-amber-400 hover:translate-x-1 transition-all w-fit cursor-pointer">
                  Services & Why Us
                </Link>
                <Link to="/portfolio" className="hover:text-amber-400 hover:translate-x-1 transition-all w-fit cursor-pointer">
                  Portfolio Showcase
                </Link>
                <Link to="/blog" className="hover:text-amber-400 hover:translate-x-1 transition-all w-fit cursor-pointer">
                  Engineering Insights
                </Link>
                <Link to="/contact" className="hover:text-amber-400 hover:translate-x-1 transition-all w-fit cursor-pointer">
                  Request a Quote
                </Link>
              </div>
            </div>

            {/* Legal / Contact */}
            <div className="md:col-span-3 flex flex-col gap-2.5">
              <h4 className="font-headline text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span>Connect & Legal</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </h4>
              <div className="flex flex-col gap-2 font-body text-sm">
                <a 
                  href={`mailto:${COMPANY_INFO.email}`} 
                  className="text-amber-400 font-semibold hover:underline flex items-center gap-1.5 w-fit"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
                <button
                  onClick={() => setModalContent('privacy')}
                  className="text-left hover:text-white transition-colors w-fit cursor-pointer text-slate-400"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setModalContent('terms')}
                  className="text-left hover:text-white transition-colors w-fit cursor-pointer text-slate-400"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright and Attribution */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-slate-400">
            <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
            <p className="text-amber-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Custom Software Architecture with Full Admin Control</span>
            </p>
          </div>
        </div>

        {/* Modal for Privacy & Terms disclosures */}
        <AnimatePresence>
          {modalContent && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalContent(null)}
                className="fixed inset-0 bg-black/75 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg bg-white text-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-200 z-10 max-h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
                  <h3 className="font-headline text-lg font-bold">
                    {modalContent === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                  </h3>
                  <button
                    onClick={() => setModalContent(null)}
                    className="p-1 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                  {modalContent === 'privacy' ? (
                    <>
                      <p>
                        At <strong>{COMPANY_INFO.name}</strong>, we respect client privacy. We never sell, lease, or distribute customer details.
                      </p>
                      <p>
                        Contact inquiries are strictly used to respond with software estimates and scoping proposals.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        All custom software architectures, source code repositories, and databases belong 100% to the client upon contract settlement.
                      </p>
                      <p>
                        We provide milestone delivery and warranty support as detailed in individual project agreements.
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => setModalContent(null)}
                    className="px-5 py-2 bg-slate-900 text-white rounded font-bold text-sm hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
}
