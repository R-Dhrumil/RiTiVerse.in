import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ArrowRight,
  Terminal,
  Sliders,
  Key,
  Zap,
  UserCheck
} from 'lucide-react';
import { WHY_CHOOSE_US, COMPANY_INFO } from '../constants/content';
import Testimonials from '../components/Testimonials';
import AdminPreviewSection from '../components/AdminPreviewSection';
import { Link } from '../context/RouterContext';

const iconMap = {
  sliders: Sliders,
  key: Key,
  zap: Zap,
  user_check: UserCheck
};

const techStack = [
  { category: "Frontend Engineering", tools: ["React 19", "Vite 6", "Tailwind CSS", "Framer Motion", "Three.js"] },
  { category: "Backend & Database", tools: ["Node.js", "Supabase", "PostgreSQL", "REST & GraphQL", "Serverless Functions"] },
  { category: "Quality & Deployment", tools: ["Automated CI/CD", "Vercel / Netlify", "SSL Encryption", "Zero Lock-In Architecture"] }
];

export default function WhyUsPage() {
  return (
    <div className="pt-24 pb-20 bg-background text-text-main min-h-screen">
      {/* Header Banner */}
      <section className="py-16 md:py-24 px-gutter bg-surface border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low border border-slate-200 w-fit mb-4">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span className="font-label-md text-sm font-bold text-text-main uppercase tracking-wider">
                Why Partner With {COMPANY_INFO.name}
              </span>
            </div>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-main tracking-tight leading-tight mb-5">
              Engineering Built Around Autonomy, Quality & Direct Control
            </h1>
            <p className="font-body text-base sm:text-lg text-text-muted leading-relaxed mb-7">
              We build custom software platforms that grant companies full operational independence. Every system we deploy pairs a dedicated administrative console with complete source code and infrastructure ownership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Engineering Pillars */}
      <section className="py-20 px-gutter max-w-container-max mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-text-main">
            Our Core Value Pillars
          </h2>
          <p className="font-body text-text-muted mt-2 text-base sm:text-lg">
            What makes our approach fundamentally different from standard software agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {WHY_CHOOSE_US.map((point, idx) => {
            const Icon = iconMap[point.icon] || Sliders;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-surface border border-slate-200/90 rounded-2xl p-7 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex items-start gap-5 card-hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Icon className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold text-text-main mb-2">
                    {point.title}
                  </h3>
                  <p className="font-body text-text-muted text-base leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Embedded Admin Demo for High Impact */}
      <AdminPreviewSection />

      {/* Tech Stack Showcase */}
      <section className="py-20 px-gutter bg-surface border-y border-slate-200">
        <div className="max-w-container-max mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low border border-slate-200 w-fit mb-3">
              <Terminal className="w-4 h-4 text-amber-600" />
              <span className="font-label-md text-sm font-bold text-text-main uppercase tracking-wider">
                Modern Stack
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-text-main">
              Built on Open-Source Standards
            </h2>
            <p className="font-body text-text-muted mt-2 text-base sm:text-lg">
              Clean architectures with high developer velocity and zero proprietary runtime lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.map((group, idx) => (
              <div
                key={idx}
                className="bg-background p-7 rounded-2xl border border-slate-200 shadow-xs card-hover-lift"
              >
                <h3 className="font-headline font-bold text-text-main text-xl mb-4 pb-3 border-b border-slate-200">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-surface border border-slate-200 text-text-main font-mono text-sm sm:text-base px-3 py-1.5 rounded-lg shadow-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments & Standards */}
      <Testimonials />

      {/* CTA Box */}
      <section className="px-gutter max-w-container-max mx-auto mt-12">
        <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-white">
            Experience Complete Digital Independence
          </h2>
          <p className="font-body text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-7 leading-relaxed">
            Let's build a software platform tailored to your business, with complete ownership and seamless admin control.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent-warm text-text-main font-bold px-7 py-3.5 rounded-DEFAULT hover:bg-amber-400 transition-all text-sm sm:text-base shadow-lg cursor-pointer card-hover-lift"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
