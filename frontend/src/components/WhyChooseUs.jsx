import React from 'react';
import { motion } from 'framer-motion';
import { Sliders, Key, Zap, UserCheck, CheckCircle2 } from 'lucide-react';
import { WHY_CHOOSE_US } from '../constants/content';

const iconMap = {
  sliders: Sliders,
  key: Key,
  zap: Zap,
  user_check: UserCheck
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 md:py-28 px-gutter bg-background relative overflow-hidden border-t border-b border-slate-200/80">
      <div className="max-w-container-max mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-slate-200 w-fit shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span className="font-label-md text-sm font-bold text-text-main uppercase tracking-wider">
                Why Partner With Us
              </span>
            </div>
            
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main tracking-tight leading-[1.15]">
              Full Control. No Tech Headaches.
            </h2>
            
            <p className="font-body text-base sm:text-lg text-text-muted leading-relaxed">
              We build custom software so your business can update prices, images, and content directly without waiting on an outside agency.
            </p>

            <div className="flex flex-col gap-3 pt-1">
              {[
                "100% code and database ownership",
                "Easy-to-use admin panel included",
                "Direct contact with senior developers"
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                  <span className="font-body text-sm sm:text-base font-semibold text-text-main">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 4 Key Pillar Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_CHOOSE_US.map((item, index) => {
              const IconComp = iconMap[item.icon] || Sliders;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-surface border border-slate-200/90 rounded-xl p-6 shadow-xs hover:shadow-lg hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between group card-hover-lift"
                >
                  <div>
                    <div className="w-11 h-11 rounded-lg bg-surface-container-low border border-slate-200 flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-5 h-5 text-text-main group-hover:text-amber-400 transition-colors" />
                    </div>
                    <h3 className="font-headline text-lg font-bold text-text-main mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm sm:text-base text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
