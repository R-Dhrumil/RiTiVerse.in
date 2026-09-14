import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Filter, X, Mail, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { BLOG_CATEGORIES, INITIAL_BLOG_POSTS } from '../constants/blogData';

export default function BlogPage() {
  const [posts, setPosts] = useState(INITIAL_BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Fetch posts from backend with fallback
  useEffect(() => {
    let isMounted = true;
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.posts && result.posts.length > 0) {
            if (isMounted) setPosts(result.posts);
          }
        }
      } catch (err) {
        console.warn('Backend API connection offline, using fallback blog dataset:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set();
    posts.forEach((post) => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach((tag) => set.add(tag));
      }
    });
    return Array.from(set);
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchTag = !selectedTag || (Array.isArray(post.tags) && post.tags.includes(selectedTag));
      const matchSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchTag && matchSearch;
    });
  }, [posts, selectedCategory, selectedTag, searchQuery]);

  // Featured post selection
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail('');
      }, 5000);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      {/* 1. Hero Header Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-container-max mx-auto px-gutter relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-md border border-amber-500/30 px-4 py-1.5 rounded-full text-sm font-bold text-amber-400 mb-6 uppercase tracking-wider shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            Engineering & Strategy Journal
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-5"
          >
            Insights on Custom Software &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              Total Admin Control
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Practical technical guides on custom web platforms, full source code ownership, and intuitive admin dashboards.
          </motion.p>

          {/* Search Bar Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto relative"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles (e.g. Admin Control, React, Ownership)..."
                className="w-full bg-slate-800/80 border border-slate-700 focus:border-amber-400 text-white placeholder-slate-400 pl-12 pr-10 py-3.5 rounded-full text-base font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Blog Content Layout */}
      <div className="max-w-container-max mx-auto px-gutter pt-12 sm:pt-16">
        {/* Category & Tag Filter Toolbar */}
        <div className="flex flex-col gap-6 mb-12 border-b border-slate-200 pb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5 pr-3 border-r border-slate-200">
              <Filter className="w-4 h-4 text-amber-600" />
              Topic:
            </span>
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-label-md text-sm sm:text-base font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-surface border border-slate-200 text-text-muted hover:text-text-main hover:border-slate-400'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Tag Pills */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-text-muted font-bold">Tags:</span>
              {allTags.map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(isActive ? null : tag)}
                    className={`text-sm px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                        : 'bg-surface text-text-muted hover:text-text-main border border-slate-200'
                    }`}
                  >
                    #{tag}
                    {isActive && <X className="inline-block w-3.5 h-3.5 ml-1" />}
                  </button>
                );
              })}
              {(selectedCategory !== 'All' || selectedTag || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedTag(null);
                    setSearchQuery('');
                  }}
                  className="text-sm text-amber-600 font-bold hover:underline ml-auto cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Featured Spotlight Article (Only when no active search/tag filter) */}
        {!searchQuery && selectedCategory === 'All' && !selectedTag && featuredPost && (
          <div className="mb-16">
            <h2 className="font-headline text-lg sm:text-xl font-bold text-text-muted uppercase tracking-wider mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Featured Insight
            </h2>
            <BlogCard post={featuredPost} featured={true} />
          </div>
        )}

        {/* Article Grid Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-text-main">
            {selectedCategory === 'All' ? 'All Articles & Insights' : `${selectedCategory} Articles`}
          </h2>
          <span className="text-sm font-bold text-text-muted bg-surface px-4 py-1.5 rounded-full border border-slate-200 shadow-xs">
            Showing {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Article Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id || post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface rounded-2xl border border-slate-200 p-8 max-w-xl mx-auto shadow-xs">
            <Search className="w-12 h-12 text-amber-600 mx-auto mb-4 opacity-70" />
            <h3 className="font-headline text-xl font-bold text-text-main mb-2">No matching articles found</h3>
            <p className="font-body text-text-muted text-base mb-6">
              We couldn't find any articles matching your search query or selected topic filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedTag(null);
                setSearchQuery('');
              }}
              className="bg-accent-warm text-text-main font-label-md text-base px-6 py-2.5 rounded-DEFAULT font-bold hover:shadow-lg transition-all cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* 3. Newsletter Subscription Card */}
        <div className="mt-20 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-accent-warm text-text-main flex items-center justify-center mx-auto mb-6 shadow-md font-bold">
              <Mail className="w-6 h-6" />
            </div>

            <h3 className="font-headline text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
              Stay Ahead with Modern Software Insights
            </h3>
            <p className="font-body text-slate-300 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Subscribe for practical architectural guides, admin dashboard case studies, and engineering strategies. Zero spam.
            </p>

            {newsletterSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800 border border-amber-400/40 p-4 rounded-xl inline-flex items-center gap-3 text-amber-300 font-bold text-base"
              >
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                Subscription confirmed! Welcome to the engineering journal.
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-slate-800 border border-slate-700 focus:border-amber-400 text-white placeholder-slate-400 px-5 py-3.5 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-accent-warm text-text-main font-label-md text-base px-7 py-3.5 rounded-xl font-extrabold hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
