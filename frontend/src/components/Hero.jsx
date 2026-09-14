import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sliders, 
  Sparkles, 
  CheckCircle2, 
  Check, 
  ShieldCheck, 
  Code2, 
  Star 
} from 'lucide-react';
import { COMPANY_INFO } from '../constants/content';
import { Link } from '../context/RouterContext';

export default function Hero() {
  const scrollToAdmin = (e) => {
    e.preventDefault();
    const el = document.getElementById('admin-control');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const marqueeItems = [
    'Instant no-code edits for text, pricing, & promos',
    '100% Source code & cloud ownership (Zero lock-in)',
    'Bespoke Admin Dashboard tailored to your exact workflow',
    'Granular role-based permissions (RBAC) for your team',
    'Production-ready React & Node.js architecture',
    '2–4 Week agile delivery with guaranteed SLA',
    'Real-time database synchronization with zero downtime'
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-start pt-28 sm:pt-36 pb-20 px-gutter w-full overflow-hidden bg-editorial-grid"
    >
      {/* Humanto-style Warm Peach & Amber Ambient Gradient Haze at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[520px] bg-peach-glow pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 max-w-container-max mx-auto w-full flex flex-col items-center">
        
        {/* Centered Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-main tracking-tight leading-[1.15] text-center max-w-4xl"
        >
          Custom IT Services & Software{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
            With Total Admin Control.
          </span>
        </motion.h1>

        {/* Centered Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-base sm:text-lg md:text-xl text-text-muted leading-relaxed text-center max-w-2xl mt-4 mb-8"
        >
          Never wait days for a developer to change a banner, price, or copy again. Every build includes a custom admin panel so you stay in total control.
        </motion.p>

        {/* CTAs with Playful Hand-Drawn Annotation Arrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 relative mb-7"
        >
          {/* Primary Pill Button (Humanto style with circular arrow indicator) */}
          <Link
            to="/contact"
            className="group relative bg-slate-950 hover:bg-slate-900 text-white font-label-md text-base px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:shadow-slate-950/20 transition-all flex items-center gap-3 font-bold cursor-pointer card-hover-lift"
          >
            <span>Book Free Strategy Call</span>
            <span className="w-7 h-7 rounded-full bg-amber-400 group-hover:bg-amber-300 text-slate-950 flex items-center justify-center transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Secondary Pill Button */}
          <a
            href="#admin-control"
            onClick={scrollToAdmin}
            className="bg-white/90 backdrop-blur-sm border border-slate-300 hover:border-text-main text-text-main font-label-md text-base px-7 py-4 rounded-full hover:bg-surface-container-low transition-all font-semibold cursor-pointer shadow-sm flex items-center gap-2 card-hover-lift"
          >
            <Sliders className="w-4 h-4 text-amber-600" />
            <span>Try Interactive Admin Demo</span>
          </a>

          {/* Playful Handwritten Vector Arrow Annotation (Humanto "It's free!" concept -> "100% Code Ownership!") */}
          <div className="hidden lg:flex items-center gap-1.5 absolute -right-48 top-1 pointer-events-none select-none">
            <svg 
              className="w-12 h-10 text-slate-700 transform -rotate-12" 
              viewBox="0 0 50 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M45 5C35 8 18 15 10 32M10 32L6 23M10 32L19 32" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            <span className="font-mono text-xs font-bold text-slate-800 bg-amber-200/90 border border-amber-300 px-2.5 py-1 rounded-full shadow-xs transform -rotate-2">
              100% Code Ownership!
            </span>
          </div>
        </motion.div>

        {/* Social Proof & Rating Stack (Humanto style) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-10 text-center"
        >
          {/* Overlapping Avatar Stack */}
          <div className="flex items-center -space-x-2.5">
            <span className="inline-block w-8 h-8 rounded-full bg-slate-800 text-amber-300 border-2 border-white flex items-center justify-center text-xs font-bold shadow-xs">
              AK
            </span>
            <span className="inline-block w-8 h-8 rounded-full bg-amber-600 text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow-xs">
              SJ
            </span>
            <span className="inline-block w-8 h-8 rounded-full bg-emerald-700 text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow-xs">
              MR
            </span>
            <span className="inline-block w-8 h-8 rounded-full bg-indigo-700 text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow-xs">
              TL
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-text-muted">
              Loved by founders & operators globally
            </span>
          </div>
        </motion.div>

        {/* Infinite Marquee Strip of Core Business Benefits */}
        <div className="w-full overflow-hidden py-8 mt-4 border-y border-slate-200/70 relative">
          <div className="animate-marquee flex items-center gap-4">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-xs backdrop-blur-xs shrink-0"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-sm text-slate-800 whitespace-nowrap">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Humanto-style 3 Key Value Props / Checkmark Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-4xl mt-12 pt-4"
        >
          {/* Pillar 1 */}
          <div className="flex items-start gap-3.5">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <div>
              <p className="font-bold text-base text-text-main">
                Complete Admin Autonomy
              </p>
              <p className="text-sm text-text-muted leading-relaxed mt-1">
                Edit text, change pricing, and toggle promo banners in 5 seconds without waiting on developer tickets.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-start gap-3.5">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <div>
              <p className="font-bold text-base text-text-main">
                100% Code & Cloud Ownership
              </p>
              <p className="text-sm text-text-muted leading-relaxed mt-1">
                Full source code handed over to your GitHub repo. Deployed directly to your cloud with zero proprietary lock-in.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-start gap-3.5">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <div>
              <p className="font-bold text-base text-text-main">
                Production-Grade Engineering
              </p>
              <p className="text-sm text-text-muted leading-relaxed mt-1">
                Engineered with clean React, Node, and secure REST APIs built for enterprise reliability, speed, and scale.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
