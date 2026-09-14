import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, DollarSign, HelpCircle, ArrowRight } from 'lucide-react';
import { PRICING_TIERS, FAQ_ITEMS } from '../constants/content';
import { Link } from '../context/RouterContext';

export default function Pricing() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="pricing" className="py-20 md:py-28 px-gutter bg-background relative z-10 border-t border-slate-200/80">
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-slate-200 w-fit mb-3 shadow-xs">
            <DollarSign className="w-4 h-4 text-amber-600" />
            <span className="font-label-md text-sm font-bold text-text-main uppercase tracking-wider">
              Transparent Scoping
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
            Straightforward Project Packages
          </h2>
          <p className="font-body text-text-muted text-base sm:text-lg mt-2">
            Every package includes 100% source code ownership and a custom admin dashboard.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 items-stretch">
          {PRICING_TIERS.map((tier, index) => {
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative card-hover-lift ${
                  tier.highlighted
                    ? 'bg-surface border-2 border-slate-900 shadow-xl ring-4 ring-amber-400/20 z-10'
                    : 'bg-surface border border-slate-200 shadow-xs hover:border-slate-400'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-warm text-text-main px-4 py-1 rounded-full font-label-md text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xs">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <h3 className="font-headline text-2xl font-bold text-text-main mb-2 mt-1">
                    {tier.name}
                  </h3>

                  <div className="mb-4">
                    <span className="font-headline text-2xl font-extrabold text-text-main">
                      {tier.price}
                    </span>
                    <p className="font-body text-sm text-text-muted mt-1">
                      Fixed-scope milestone contract
                    </p>
                  </div>

                  <p className="font-body text-base text-text-muted mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  <ul className="space-y-3 mb-8 border-t border-slate-100 pt-5">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-text-main font-medium">
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            tier.highlighted ? 'text-amber-600' : 'text-emerald-600'
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className={`w-full py-3.5 px-6 rounded-DEFAULT font-label-md text-base font-bold text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    tier.highlighted
                      ? 'bg-accent-warm text-text-main hover:bg-amber-400 shadow-sm'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {tier.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-text-main">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl bg-surface overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 flex justify-between items-center text-left bg-surface hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
                  >
                    <span className="font-headline text-base sm:text-lg text-text-main font-bold">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-text-muted transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-text-main' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5 border-t border-slate-100 bg-slate-50/50"
                      >
                        <p className="font-body text-base text-text-muted leading-relaxed pt-2">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
