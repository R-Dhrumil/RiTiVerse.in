import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  ChevronDown, 
  DollarSign
} from 'lucide-react';
import { PRICING_TIERS } from '../constants/content';
import { Link } from '../context/RouterContext';

const pricingFaqs = [
  {
    q: "Are there any hidden costs or surprise recurring fees?",
    a: "None. All deliverables, admin features, and scope boundaries are outlined transparently before development begins. You own 100% of the code with zero proprietary fees."
  },
  {
    q: "What payment schedules do you work with?",
    a: "Standard project billing is milestone-based (e.g. 50% upfront at kick-off and 50% upon final production deployment and admin handover training)."
  },
  {
    q: "Can we customize the exact admin features we need?",
    a: "Yes! Every admin dashboard is custom-engineered to your team's exact workflow—whether you need inventory management, live banner toggles, lead export, or role permissions."
  },
  {
    q: "What happens after launch?",
    a: "Every build comes with 30-day post-launch warranty support and hands-on admin training sessions for your team."
  }
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="pt-24 pb-20 bg-background text-text-main min-h-screen">
      {/* Header Banner */}
      <section className="py-16 md:py-24 px-gutter bg-surface border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low border border-slate-200 w-fit mb-4 mx-auto">
              <DollarSign className="w-4 h-4 text-amber-600" />
              <span className="font-label-md text-sm font-bold text-text-main uppercase tracking-wider">
                Transparent Scoping
              </span>
            </div>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-main tracking-tight leading-tight mb-5">
              Clear, Predictable Project Packages
            </h1>
            <p className="font-body text-base sm:text-lg text-text-muted leading-relaxed mb-6">
              Straightforward pricing engineered for businesses seeking custom digital software, complete admin autonomy, and zero recurring platform lock-in.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-20 px-gutter max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {PRICING_TIERS.map((tier, idx) => {
            return (
              <motion.div
                key={tier.id || tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`bg-surface border rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-300 card-hover-lift ${
                  tier.highlighted
                    ? 'border-2 border-slate-900 shadow-xl scale-105 z-10 bg-surface ring-4 ring-amber-400/20'
                    : 'border-slate-200 hover:border-slate-400 shadow-xs'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-warm text-text-main px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> {tier.badge}
                  </div>
                )}

                <div>
                  <h2 className="font-headline text-2xl font-bold text-text-main mb-2 mt-1">
                    {tier.name}
                  </h2>
                  <p className="font-body text-base text-text-muted mb-4 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="mb-6">
                    <span className="font-headline text-2xl font-extrabold text-text-main">
                      {tier.price}
                    </span>
                    <p className="text-sm text-text-muted mt-1">
                      Fixed-scope milestone contract
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-5 mb-7">
                    <h3 className="font-label-md text-sm uppercase tracking-wider text-text-main font-bold mb-3">
                      Included Deliverables
                    </h3>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-text-main font-medium">
                          <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className={`w-full py-3.5 rounded-DEFAULT text-center font-bold font-label-md text-base transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    tier.highlighted
                      ? 'bg-accent-warm text-text-main hover:bg-amber-400 shadow-sm'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {tier.ctaText || 'Get Started'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing FAQ */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-slate-200 w-fit mb-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span className="font-label-md text-sm font-bold text-text-main uppercase tracking-wider">
                Pricing FAQ
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-text-main">
              Got Questions About Pricing?
            </h2>
          </div>

          <div className="space-y-3">
            {pricingFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-surface border border-slate-200 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left font-headline font-bold text-base sm:text-lg text-text-main flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-600' : 'text-text-muted'}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 text-base text-text-muted font-body leading-relaxed border-t border-slate-100 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="px-gutter max-w-container-max mx-auto mt-12">
        <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-white">
            Need a Custom Architecture Proposal?
          </h2>
          <p className="font-body text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-7 leading-relaxed">
            Tell us about your specific feature requirements, timeline, and goals for an itemized estimate.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent-warm text-text-main font-bold px-7 py-3.5 rounded-DEFAULT hover:bg-amber-400 transition-all text-sm sm:text-base shadow-lg cursor-pointer card-hover-lift"
          >
            Request Custom Proposal
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
