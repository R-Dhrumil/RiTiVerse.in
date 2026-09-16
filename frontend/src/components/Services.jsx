import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  LayoutDashboard, 
  ShoppingBag, 
  Server, 
  ArrowRight, 
  CheckCircle2,
  Layers
} from 'lucide-react';
import { SERVICES } from '../constants/content';
import { Link } from '../context/RouterContext';

const iconMap = {
  globe: Globe,
  layout_dashboard: LayoutDashboard,
  shopping_bag: ShoppingBag,
  server: Server
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
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 px-gutter bg-surface relative z-20">
      <div className="max-w-container-max mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low border border-slate-200 w-fit mb-3">
            <Layers className="w-4 h-4 text-amber-600" />
            <span className="font-label-md text-sm font-bold text-text-main uppercase tracking-wider">
              What We Build
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
            Custom Web Software with Easy Admin Control
          </h2>
          <p className="font-body text-base sm:text-lg text-text-muted mt-3">
            Every platform we build comes with clean code and an easy admin panel so you can manage your website anytime.
          </p>
        </motion.div>

        {/* 2x2 Clean Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon] || Globe;
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

                  <h3 className="font-headline text-2xl font-bold text-text-main mb-2.5 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
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
