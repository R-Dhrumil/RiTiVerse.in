import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Eye, ArrowRight, User, Calendar } from 'lucide-react';
import { Link } from '../context/RouterContext';

export default function BlogCard({ post, featured = false }) {
  if (!post) return null;

  const authorName = post.author_name || post.author?.name || 'Nirmaan Team';
  const authorRole = post.author_role || post.author?.role || 'Engineering';
  const authorAvatar = post.author_avatar || post.author?.avatar;
  const readTime = post.read_time || '5 min read';
  const views = post.views || 0;
  const category = post.category || 'Engineering';
  const tags = post.tags || [];

  const formattedDate = new Date(post.created_at || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group relative bg-surface border border-slate-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-amber-400 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 card-hover-lift"
      >
        {/* Featured Badge */}
        <div className="absolute top-4 left-4 z-20 bg-accent-warm text-text-main font-label-md text-sm px-3.5 py-1 rounded-full font-bold shadow-md flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-900 animate-ping" />
          Featured Insight
        </div>

        {/* Media Side */}
        <div className="lg:col-span-6 relative overflow-hidden min-h-[260px] lg:min-h-[380px]">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </div>

        {/* Content Side */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-amber-100 text-amber-900 border border-amber-300 font-label-md text-sm font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                {category}
              </span>
              {tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="bg-surface-container-low text-text-muted text-sm px-3 py-1 rounded-md border border-slate-200 font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <Link to={`/blog/${post.slug}`} className="block group-hover:text-amber-600 transition-colors">
              <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-text-main leading-tight tracking-tight mb-3">
                {post.title}
              </h3>
            </Link>

            {/* Excerpt */}
            <p className="font-body text-text-muted text-base leading-relaxed line-clamp-3 mb-6">
              {post.excerpt}
            </p>
          </div>

          {/* Footer Metadata */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 text-sm text-text-muted">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                {authorAvatar ? (
                  <img src={authorAvatar} alt={authorName} className="w-10 h-10 rounded-full object-cover border border-amber-400" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-text-main text-sm">{authorName}</h4>
                  <p className="text-sm text-text-muted">{authorRole}</p>
                </div>
              </div>

              {/* Read time & Views */}
              <div className="flex items-center gap-4 text-text-muted text-sm font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-amber-600" />
                  {readTime}
                </span>
              </div>
            </div>

            {/* Read Article Link */}
            <div className="mt-6 flex justify-end">
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 bg-text-main text-surface font-label-md text-base px-6 py-3 rounded-DEFAULT font-bold hover:bg-accent-warm hover:text-text-main transition-all group/btn cursor-pointer"
              >
                Read Full Insight
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-surface border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-amber-400 transition-all duration-300 card-hover-lift"
    >
      <div>
        {/* Cover Image Container */}
        <div className="relative overflow-hidden aspect-[16/9] bg-slate-100">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-amber-800 border border-amber-200 font-label-md text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
            {category}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-text-muted mb-3 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-600" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              {readTime}
            </span>
          </div>

          {/* Title */}
          <Link to={`/blog/${post.slug}`} className="block mb-2 group-hover:text-amber-600 transition-colors">
            <h3 className="font-headline text-xl font-bold text-text-main line-clamp-2 leading-snug">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="font-body text-text-muted text-base line-clamp-3 leading-relaxed mb-4">
            {post.excerpt}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="bg-slate-100 text-text-muted text-sm font-medium px-2.5 py-1 rounded-md border border-slate-200">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
        {/* Author Avatar & Name */}
        <div className="flex items-center gap-2.5">
          {authorAvatar ? (
            <img src={authorAvatar} alt={authorName} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              <User className="w-4 h-4" />
            </div>
          )}
          <span className="text-sm font-semibold text-text-main truncate max-w-[130px] sm:max-w-[160px]">
            {authorName}
          </span>
        </div>

        {/* Read Article Action */}
        <Link
          to={`/blog/${post.slug}`}
          className="text-base font-bold text-amber-600 hover:text-text-main flex items-center gap-1.5 group/link transition-colors cursor-pointer"
        >
          Read Post
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}
