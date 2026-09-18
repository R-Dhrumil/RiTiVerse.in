import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  LayoutDashboard, 
  ShoppingBag, 
  Server, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown,
  Layers, 
  Compass, 
  Palette, 
  Code2, 
  GraduationCap,
  HelpCircle,
  ShieldCheck,
  Terminal,
  Sliders,
  Key,
  Zap,
  UserCheck
} from 'lucide-react';
import { SERVICES, PROCESS_STEPS, WHY_CHOOSE_US, COMPANY_INFO } from '../constants/content';
import { Link } from '../context/RouterContext';

const iconMap = {
  globe: Globe,
  layout_dashboard: LayoutDashboard,
  shopping_bag: ShoppingBag,
  server: Server
};

const pillarIconMap = {
  sliders: Sliders,
  key: Key,
  zap: Zap,
  user_check: UserCheck
};

const processIconMap = {
  1: Compass,
  2: Palette,
  3: Code2,
  4: GraduationCap
};

const techStack = [
  { category: "Frontend Engineering", tools: ["React 19", "Vite 6", "Tailwind CSS", "Framer Motion", "Three.js"] },
  { category: "Backend & Database", tools: ["Node.js", "Supabase", "PostgreSQL", "REST & GraphQL", "Serverless Functions"] },
  { category: "Quality & Deployment", tools: ["Automated CI/CD", "Vercel / Netlify", "SSL Encryption", "Zero Lock-In Architecture"] }
];

const serviceFaqs = [
  {
    q: "Will we be able to manage all content without writing code?",
    a: "Yes! Every platform we build includes an easy-to-use Admin Panel where you can update text, images, products, and view customer inquiries without touching code."
  },
  {
    q: "Do you build custom software or use rigid templates?",
    a: "Every solution is custom-built using modern, reliable technologies (React, Node.js, PostgreSQL) tailored to your exact business needs."
  },
  {
    q: "Do we own the full source code and database?",
    a: "Yes, 100%. All repository code, database files, and designs belong entirely to your company with zero recurring monthly platform fees."
  },
  {
    q: "What training and handover do you provide?",
    a: "We provide live 1-on-1 walkthrough training sessions so your team feels completely confident managing your new admin panel."
  }
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="pt-24 pb-20 bg-background text-text-main min-h-screen">
      {/* Page Header Banner */}
      <section className="py-16 md:py-24 px-gutter bg-surface border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-main tracking-tight leading-tight mb-5">
              Custom Software & Websites with Complete Admin Control
            </h1>
            <p className="font-body text-base sm:text-lg text-text-muted leading-relaxed mb-7">
              We build custom web platforms, online stores, and internal company tools equipped with an easy Admin Panel so your team can manage everything directly—with 100% code ownership.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="bg-slate-900 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-md hover:shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
              >
                Request a Custom Quote
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
              <Link
                to="/portfolio"
                className="bg-surface border border-slate-300 text-text-main font-bold text-sm sm:text-base px-6 py-3.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                View Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Value Pillars */}
      <section id="why-us" className="py-20 px-gutter bg-background border-b border-slate-200">
        <div className="max-w-container-max mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-text-main">
              Full Control. No Tech Headaches.
            </h2>
            <p className="font-body text-text-muted mt-2 text-base sm:text-lg">
              What makes our approach fundamentally different from standard software agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => {
              const IconComp = pillarIconMap[item.icon] || Sliders;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-surface border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-lg hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between group card-hover-lift"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low border border-slate-200 flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-6 h-6 text-text-main group-hover:text-amber-400 transition-colors" />
                    </div>
                    <h3 className="font-headline text-lg font-bold text-text-main mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 px-gutter">
        <div className="max-w-container-max mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-text-main">
              What We Build
            </h2>
            <p className="font-body text-text-muted mt-2 text-base sm:text-lg">
              Fast, easy to manage, and engineered to scale with your business.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {SERVICES.map((service) => {
              const IconComponent = iconMap[service.icon] || Globe;
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="bg-surface border border-slate-200/90 rounded-2xl p-8 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group card-hover-lift"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-13 h-13 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300 shadow-xs">
                        <IconComponent className="w-6 h-6 text-text-main group-hover:text-amber-600 transition-colors" />
                      </div>
                      {service.badge && (
                        <span className="text-sm font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full uppercase">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-headline text-2xl font-bold text-text-main mb-3 group-hover:text-amber-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-body text-text-muted text-base leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    <div className="border-t border-slate-100 pt-5 mb-6">
                      <h4 className="font-label-md text-sm uppercase tracking-wider text-text-main font-bold mb-3">
                        Included Features
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-sm sm:text-base text-text-main font-medium">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 font-label-md text-base text-text-main font-bold hover:text-amber-600 transition-colors group/link cursor-pointer"
                    >
                      Discuss your {service.title} project
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section className="py-20 px-gutter bg-surface border-y border-slate-200">
        <div className="max-w-container-max mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-text-main">
              Built on Modern Open-Source Tech
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
                      className="bg-surface border border-slate-200 text-text-main font-mono text-sm px-3 py-1.5 rounded-lg shadow-xs"
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

      {/* Engineering Process */}
      <section className="py-20 px-gutter bg-background border-b border-slate-200">
        <div className="max-w-container-max mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label-md text-sm font-bold text-amber-600 uppercase tracking-wider">
              How We Work
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-text-main mt-1">
              Our 4-Step Process
            </h2>
            <p className="font-body text-text-muted mt-2 text-base">
              A clear step-by-step process with regular updates from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => {
              const StepIcon = processIconMap[step.step] || Compass;
              return (
                <div
                  key={step.step}
                  className="bg-surface p-6 rounded-2xl border border-slate-200 hover:border-slate-400 transition-all flex flex-col justify-between card-hover-lift"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low text-text-main border border-slate-200 flex items-center justify-center mb-5 font-bold shadow-xs">
                      <StepIcon className="w-6 h-6 text-amber-600" />
                    </div>
                    <span className="text-sm font-mono font-bold text-amber-600 uppercase tracking-wider">
                      Phase 0{step.step}
                    </span>
                    <h3 className="font-headline text-xl font-bold text-text-main mt-1.5 mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-base text-text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services FAQ Accordion */}
      <section className="py-20 px-gutter max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-text-main">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {serviceFaqs.map((faq, idx) => {
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
      </section>

      {/* CTA Box */}
      <section className="px-gutter max-w-container-max mx-auto">
        <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-white">
            Ready to Build Your Custom Platform?
          </h2>
          <p className="font-body text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-7 leading-relaxed">
            Schedule a scoping call with our engineering team to discuss your project requirements and custom admin tools.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-7 py-3.5 rounded-full hover:bg-slate-100 transition-all text-sm sm:text-base shadow-lg cursor-pointer"
          >
            Get a Project Estimate
            <ArrowRight className="w-4 h-4 text-amber-600" />
          </Link>
        </div>
      </section>
    </div>
  );
}
