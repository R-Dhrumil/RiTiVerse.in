import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../constants/content';
import { Link } from '../context/RouterContext';

export default function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'Custom Web App', 'Internal Tool', 'E-Commerce'];

  const filteredProjects = selectedFilter === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedFilter);

  return (
    <section id="portfolio" className="py-20 md:py-28 px-gutter bg-surface relative">
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low border border-slate-200 w-fit mb-3">
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span className="font-label-md text-sm font-bold text-text-main uppercase tracking-wider">
                Delivered Systems
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
              Featured Case Studies
            </h2>
            <p className="font-body text-text-muted text-base sm:text-lg mt-2 max-w-lg">
              High-performance web applications built with custom admin dashboards for total client control.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                    : 'bg-surface-container-low text-text-muted hover:text-text-main hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveModalProject(project)}
                className={`${project.gridCols} bg-surface border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col ${
                  project.layout === 'horizontal' ? 'md:flex-row' : ''
                } group cursor-pointer card-hover-lift`}
              >
                {/* Image Container */}
                <div
                  className={`relative overflow-hidden bg-slate-100 ${
                    project.layout === 'horizontal' ? 'w-full md:w-1/2 h-56 md:h-auto' : 'w-full h-48'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur-md text-text-main font-label-md text-xs sm:text-sm px-3 py-1 rounded-full border border-slate-200 font-bold shadow-xs">
                      {project.badge}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline text-xl font-bold text-text-main mb-2 group-hover:text-amber-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-base text-text-muted leading-relaxed mb-5">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.features.map((feat, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 text-xs sm:text-sm bg-slate-50 px-2.5 py-1 rounded border border-slate-200 text-text-muted font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-text-main font-bold text-sm sm:text-base group-hover:translate-x-1 transition-transform">
                    <span>View Architecture Details</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 text-amber-600" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-surface rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              <div className="p-5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-700">
                    {activeModalProject.category}
                  </span>
                  <h3 className="font-headline text-xl font-bold text-text-main">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 text-text-muted hover:text-text-main rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-5">
                <div className="h-56 rounded-xl overflow-hidden border border-slate-200 relative">
                  <img
                    src={activeModalProject.image}
                    alt={activeModalProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="font-body text-text-muted text-base leading-relaxed">
                  {activeModalProject.description}
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <h4 className="font-headline text-sm font-bold text-text-main uppercase tracking-wider mb-3">
                    Included Admin Capabilities
                  </h4>
                  <ul className="space-y-2">
                    {activeModalProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-sm sm:text-base text-text-main font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2.5 bg-surface border border-slate-200 text-text-main rounded-DEFAULT font-bold text-sm hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <Link
                  to="/contact"
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2.5 bg-accent-warm text-text-main font-bold text-sm rounded-DEFAULT hover:bg-amber-400 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Build Similar Platform
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
