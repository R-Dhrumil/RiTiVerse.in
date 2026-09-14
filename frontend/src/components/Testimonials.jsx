import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Key, GraduationCap, Award } from 'lucide-react';

const commitments = [
  {
    icon: Key,
    title: "100% Code & IP Handover",
    description: "Every line of code, database schema, and design belongs entirely to you with zero licensing fees."
  },
  {
    icon: GraduationCap,
    title: "Complete Admin Training",
    description: "Hands-on live walkthrough sessions so your team masters your custom admin panel from day one."
  },
  {
    icon: ShieldCheck,
    title: "Modern Open Architecture",
    description: "Built strictly on React, Node, and PostgreSQL for maximum speed, security, and zero vendor lock-in."
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 px-gutter bg-surface relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-container-max mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low border border-slate-200 w-fit mb-3 shadow-xs">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="font-label-md text-sm font-bold text-text-main uppercase tracking-wider">
              Our Commitments
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
            Our Standards & Guarantees
          </h2>
          <p className="font-body text-text-muted text-base sm:text-lg mt-2">
            Clear terms, honest engineering, and complete transparency on every build.
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
