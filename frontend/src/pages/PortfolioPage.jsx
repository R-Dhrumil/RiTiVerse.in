import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, 
  Code2, 
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../constants/content';
import { Link } from '../context/RouterContext';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Custom Web App', 'Internal Tool', 'E-Commerce'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-background text-text-main min-h-screen">
      {/* Header Banner extending under floating navbar */}
      <section className="pt-28 sm:pt-36 pb-16 md:pb-20 px-gutter bg-surface border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-main tracking-tight leading-tight mb-5">
              Proven Platforms Delivered With Full Admin Control
            </h1>
            <p className="font-body text-base sm:text-lg text-text-muted leading-relaxed mb-7">
              Explore custom web platforms, e-commerce storefronts, and internal operations tools engineered for speed, clean architecture, and total client independence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter & Project Showcase Grid */}
      <section className="py-16 px-gutter max-w-container-max mx-auto">
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          <div className="flex items-center gap-2 mr-2 text-text-muted font-body text-sm font-semibold">
            <Filter className="w-4 h-4 text-amber-600" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-label-md text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'bg-surface border border-slate-200 text-text-muted hover:text-text-main hover:border-slate-400'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-surface border border-slate-200 rounded-2xl overflow-hidden hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group card-hover-lift"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="h-56 bg-slate-100 border-b border-slate-200 relative overflow-hidden flex items-center justify-center">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-200 shadow-xs">
                          <Code2 className="w-7 h-7 text-amber-600" />
                        </div>
                        <span className="font-headline font-bold text-text-main text-lg block">
                          {project.title}
                        </span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3.5 py-1 rounded-full text-sm font-bold text-text-main border border-slate-200 shadow-xs">
                      {project.badge || project.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-7">
                    <h3 className="font-headline text-xl font-bold text-text-main mb-2.5 group-hover:text-amber-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-text-muted text-base leading-relaxed mb-5">
                      {project.description}
                    </p>

                    <div className="border-t border-slate-100 pt-4 space-y-2.5">
                      <h4 className="text-sm uppercase font-bold text-text-main tracking-wider">
                        Included Features:
                      </h4>
                      {project.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-sm sm:text-base text-text-muted">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-7 pb-6 pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-sm font-semibold text-amber-700 font-mono">
                    {project.badge || "Featured Platform"}
                  </span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-text-main hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    Discuss Scope
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Box */}
      <section className="px-gutter max-w-container-max mx-auto mt-12 pb-16 md:pb-24">
        <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-white">
            Have a Project in Mind?
          </h2>
          <p className="font-body text-slate-300 text-base sm:text-lg max-w-xl mx-auto mb-7 leading-relaxed">
            Let's discuss how we can build your custom software system with full admin autonomy.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent-warm text-text-main font-bold px-7 py-3.5 rounded-DEFAULT hover:bg-amber-400 transition-all text-sm sm:text-base shadow-lg cursor-pointer card-hover-lift"
          >
            Start Your Custom Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
