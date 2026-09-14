import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, X, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../constants/content';
import { Link } from '../context/RouterContext';

export default function Footer() {
  const [modalContent, setModalContent] = useState(null);

  return (
    <footer className="bg-slate-950 text-slate-400 w-full border-t border-slate-900 relative z-20">
      <div className="max-w-container-max mx-auto px-gutter pt-14 pb-24 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-900">
          {/* Brand Col */}
          <div className="md:col-span-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-warm text-text-main flex items-center justify-center font-bold">
                <Code className="w-4 h-4" />
              </div>
              <span className="font-headline text-xl font-extrabold text-white tracking-tight">
                {COMPANY_INFO.name}
              </span>
            </div>
            <p className="font-headline text-base font-bold text-amber-400">
              {COMPANY_INFO.subTagline}
            </p>
            <p className="font-body text-sm text-slate-300 leading-relaxed max-w-sm">
              {COMPANY_INFO.description}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider mb-2">
              Explore
            </h4>
            <div className="flex flex-col gap-2 font-body text-sm">
              <Link to="/services" className="hover:text-amber-400 transition-colors w-fit">
                Services
              </Link>
              <Link to="/portfolio" className="hover:text-amber-400 transition-colors w-fit">
                Portfolio
              </Link>
              <Link to="/pricing" className="hover:text-amber-400 transition-colors w-fit">
                Pricing
              </Link>
              <Link to="/why-us" className="hover:text-amber-400 transition-colors w-fit">
                Why Us
              </Link>
              <Link to="/blog" className="hover:text-amber-400 transition-colors w-fit">
                Blog
              </Link>
              <Link to="/contact" className="hover:text-amber-400 transition-colors w-fit">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal / Contact */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider mb-2">
              Connect & Legal
            </h4>
            <div className="flex flex-col gap-2 font-body text-sm">
              <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-400 font-semibold hover:underline w-fit">
                {COMPANY_INFO.email}
              </a>
              <button
                onClick={() => setModalContent('privacy')}
                className="text-left hover:text-white transition-colors w-fit cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setModalContent('terms')}
                className="text-left hover:text-white transition-colors w-fit cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
          <p className="text-amber-400 font-semibold">
            Custom IT & Software with Complete Admin Control
          </p>
        </div>
      </div>

      {/* Modal for Privacy & Terms disclosures */}
      <AnimatePresence>
        {modalContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalContent(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
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
                  className="p-1 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100"
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
  );
}
