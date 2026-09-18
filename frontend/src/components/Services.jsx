import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  LayoutDashboard, 
  ShoppingBag, 
  Server, 
  ArrowRight, 
  CheckCircle2,
  Sliders, 
  Key, 
  Zap, 
  UserCheck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { SERVICES, WHY_CHOOSE_US } from '../constants/content';
import { Link } from '../context/RouterContext';

const serviceIconMap = {
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

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="services" className="py-14 md:py-20 px-gutter bg-surface relative z-20 scroll-mt-20">
      {/* Anchor for Why Us */}
      <div id="why-us" className="-top-24 relative" />

      <div className="max-w-container-max mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
            Custom Web Software Built for Complete Autonomy
          </h2>
          <p className="font-body text-base sm:text-lg text-text-muted mt-3.5 leading-relaxed">
            Every platform we engineer pairs modern architecture with an intuitive admin dashboard, giving your business 100% control without monthly vendor lock-in.
          </p>
        </motion.div>

        {/* Integrated Why Us Value Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComp = pillarIconMap[item.icon] || Sliders;
            return (
              <div
                key={idx}
                className="bg-background border border-slate-200/90 rounded-xl p-5 hover:border-amber-400/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-container-low border border-slate-200 flex items-center justify-center mb-3.5 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200">
                  <IconComp className="w-5 h-5 text-slate-700 group-hover:text-amber-400 transition-colors" />
                </div>
                <h3 className="font-headline text-base font-bold text-text-main mb-1.5">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* 2x2 Services Offerings Matrix */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-headline text-xl sm:text-2xl font-bold text-text-main">
            Solutions We Deliver
          </h3>
          <span className="text-xs sm:text-sm font-semibold text-text-muted">
            All tiers include tailored admin access
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {SERVICES.map((service) => {
            const IconComponent = serviceIconMap[service.icon] || Globe;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="bg-background border border-slate-200/90 rounded-2xl p-8 hover:border-amber-400/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group card-hover-lift"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200 group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300 shadow-xs">
                      <IconComponent className="w-6 h-6 text-text-main group-hover:text-amber-600 transition-colors" />
                    </div>
                    {service.badge && (
                      <span className="text-xs sm:text-sm font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full uppercase">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-headline text-2xl font-bold text-text-main mb-2.5 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h4>
                  <p className="font-body text-text-muted text-base leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 border-t border-slate-200/80 pt-4">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-sm text-text-muted font-medium">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 font-label-md text-sm sm:text-base font-bold text-text-main group-hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    Discuss Your Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
