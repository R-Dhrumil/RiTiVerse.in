import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Key, GraduationCap, Award } from 'lucide-react';

const commitments = [
  {
    icon: Key,
    title: "Complete Repository Handover",
    description: "All source code, database architecture, and deployment configurations belong to your business upon delivery."
  },
  {
    icon: GraduationCap,
    title: "Admin Onboarding Walkthrough",
    description: "Hands-on walkthrough sessions ensure your internal operations team is confident managing the platform."
  },
  {
    icon: ShieldCheck,
    title: "Open-Source Architecture",
    description: "Engineered with standard React, Node.js, and PostgreSQL for maximum security, performance, and vendor independence."
  }
];

export default function Testimonials() {
  return (
    <section className="py-14 md:py-20 px-gutter bg-surface relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-container-max mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
            Our Engineering Standards
          </h2>
          <p className="font-body text-text-muted text-base sm:text-lg mt-2">
            Clear scopes, transparent milestones, and complete operational handover.
          </p>
        </motion.div>

        {/* Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {commitments.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-background border border-slate-200/90 rounded-2xl p-8 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group card-hover-lift"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center border border-slate-200 mb-5 group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6 text-text-main group-hover:text-amber-600 transition-colors" />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-text-main mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-text-muted text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
