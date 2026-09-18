import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Eye, 
  User, 
  ThumbsUp, 
  Bookmark, 
  Share2, 
  MessageSquare, 
  Check, 
  Copy, 
  Send,
  Sparkles
} from 'lucide-react';
import { INITIAL_BLOG_POSTS } from '../constants/blogData';
import { Link } from '../context/RouterContext';
import BlogCard from '../components/BlogCard';

export default function BlogPostPage({ slug }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Comment Form State
  const [commentForm, setCommentForm] = useState({ authorName: '', email: '', comment: '' });
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);

  // 1. Fetch Post Data (Backend API with Fallback)
  useEffect(() => {
    let isMounted = true;
    const fetchPost = async () => {
      // First find in local fallback to render instantly
      const localPost = INITIAL_BLOG_POSTS.find((p) => p.slug === slug) || INITIAL_BLOG_POSTS[0];
      if (isMounted) {
        setPost(localPost);
        setLikes(0);
      }

      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.post && isMounted) {
            setPost(result.post);
            setLikes(result.post.likes || 0);
          }
        }
      } catch (err) {
        console.warn('Backend API connection offline, using fallback article:', err);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}/comments`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.comments && isMounted) {
            setComments(result.comments);
          }
        }
      } catch (err) {
        if (isMounted) {
          setComments([]);
        }
      }
    };

    fetchPost();
    fetchComments();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // 2. Handle Scroll Progress Indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLikeToggle = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.authorName || !commentForm.email || !commentForm.comment) return;

    setCommentSubmitting(true);
    const newComment = {
      id: Date.now().toString(),
      post_slug: slug,
      author_name: commentForm.authorName.trim(),
      email: commentForm.email.trim(),
      comment: commentForm.comment.trim(),
      created_at: new Date().toISOString()
    };

    try {
      const response = await fetch(`/api/blog/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: commentForm.authorName,
          email: commentForm.email,
          comment: commentForm.comment
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.comment) {
          setComments((prev) => [result.comment, ...prev]);
        } else {
          setComments((prev) => [newComment, ...prev]);
        }
      } else {
        setComments((prev) => [newComment, ...prev]);
      }
    } catch (err) {
      setComments((prev) => [newComment, ...prev]);
    } finally {
      setCommentSubmitting(false);
      setCommentSuccess(true);
      setCommentForm({ authorName: '', email: '', comment: '' });
      setTimeout(() => setCommentSuccess(false), 4000);
    }
  };

  if (!post) {
    return (
      <div className="pt-32 pb-24 text-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-muted text-base font-medium">Loading article...</p>
      </div>
    );
  }

  const authorName = post.author_name || post.author?.name || 'Nirmaan Softworks';
  const authorRole = post.author_role || post.author?.role || 'Engineering Team';
  const authorAvatar = post.author_avatar || post.author?.avatar;
  const formattedDate = new Date(post.created_at || Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const relatedPosts = INITIAL_BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  // Content Paragraph Formatter
  const renderFormattedContent = (contentStr) => {
    if (!contentStr) return null;

    const sections = contentStr.split('\n\n');
    return sections.map((sec, i) => {
      const trimmed = sec.trim();

      // H1 / H2 Headers
      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={i} className="font-headline text-3xl sm:text-4xl font-extrabold text-text-main mt-10 mb-6 tracking-tight">
            {trimmed.replace('# ', '')}
          </h1>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} className="font-headline text-2xl sm:text-3xl font-bold text-text-main mt-8 mb-4 tracking-tight border-b border-slate-200 pb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} className="font-headline text-xl font-bold text-text-main mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // Code blocks
      if (trimmed.startsWith('```')) {
        const lines = trimmed.split('\n');
        const lang = lines[0].replace('```', '') || 'javascript';
        const codeText = lines.slice(1, lines.length - 1).join('\n');

        return (
          <div key={i} className="my-6 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 text-white shadow-xl">
            <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between border-b border-slate-700 text-sm font-mono text-slate-300">
              <span className="uppercase text-amber-400 font-bold">{lang}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(codeText);
                  setCopiedCodeIdx(i);
                  setTimeout(() => setCopiedCodeIdx(null), 2500);
                }}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-sm font-semibold"
              >
                {copiedCodeIdx === i ? (
                  <>
                    <Check className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm sm:text-base font-mono leading-relaxed text-amber-100/90">
              <code>{codeText}</code>
            </pre>
          </div>
        );
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={i} className="my-6 pl-5 border-l-4 border-amber-500 bg-amber-500/10 p-5 rounded-r-xl italic text-text-main text-base sm:text-lg font-body">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }

      // List Items
      if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
        const items = trimmed.split('\n');
        return (
          <ul key={i} className="my-5 space-y-2.5 list-disc list-inside text-text-muted font-body text-base sm:text-lg pl-2">
            {items.map((it, idx) => (
              <li key={idx} className="leading-relaxed">
                {it.replace(/^[-*]|\d+\.\s*/, '')}
              </li>
            ))}
          </ul>
        );
      }

      // Regular Paragraphs
      return (
        <p key={i} className="font-body text-text-main/90 text-base sm:text-lg leading-relaxed mb-6">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-background min-h-screen relative">
      {/* Scroll Reading Progress Line at Top Header */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200/30 z-40">
        <div
          className="h-full bg-amber-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-gutter">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-muted hover:text-amber-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>
        </div>

        {/* Category & Tags Header */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="bg-amber-100 text-amber-900 border border-amber-300 font-label-md text-sm font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
            {post.category || 'Engineering'}
          </span>
          {post.tags &&
            post.tags.map((tag, idx) => (
              <span key={idx} className="bg-surface text-text-muted text-sm font-medium px-3 py-1.5 rounded-lg border border-slate-200">
                #{tag}
              </span>
            ))}
        </div>

        {/* Title */}
        <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main tracking-tight leading-tight mb-8">
          {post.title}
        </h1>

        {/* Author Bio Header */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-slate-200 mb-8">
          <div className="flex items-center gap-4">
            {authorAvatar ? (
              <img src={authorAvatar} alt={authorName} className="w-12 h-12 rounded-full object-cover border-2 border-amber-400" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <User className="w-6 h-6" />
              </div>
            )}
            <div>
              <h3 className="font-headline text-lg font-bold text-text-main">{authorName}</h3>
              <p className="text-sm text-text-muted font-medium">{authorRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 text-sm font-medium text-text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-600" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              {post.read_time || '5 min read'}
            </span>
          </div>
        </div>

        {/* Cover Image Banner */}
        {post.cover_image && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-xl border border-slate-200">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Social & Engagement Toolbar */}
        <div className="flex items-center justify-between bg-surface border border-slate-200 rounded-xl p-4 mb-10 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLikeToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                hasLiked
                  ? 'bg-amber-400 text-text-main shadow-sm'
                  : 'bg-surface-container-low text-text-muted hover:text-text-main border border-slate-200'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              {likes} {likes === 1 ? 'Like' : 'Likes'}
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-surface-container-low text-text-muted hover:text-text-main border border-slate-200'
              }`}
              title="Bookmark article"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-surface hover:bg-slate-100 text-text-main font-bold text-sm px-4 py-2 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            {copiedShare ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share Article</span>
              </>
            )}
          </button>
        </div>

        {/* Article Body Content */}
        <div className="prose max-w-none mb-16 border-b border-slate-200 pb-12">
          {renderFormattedContent(post.content)}
        </div>

        {/* Comments Section */}
        <div className="mb-20">
          <h3 className="font-headline text-2xl font-bold text-text-main mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-600" />
            Discussion & Comments ({comments.length})
          </h3>

          {/* Comment Submission Form */}
          <div className="bg-surface border border-slate-200 rounded-2xl p-6 sm:p-8 mb-10 shadow-sm">
            <h4 className="font-headline text-lg font-bold text-text-main mb-4">Leave a Comment</h4>

            {commentSuccess && (
              <div className="mb-6 bg-amber-50 border border-amber-300 text-amber-900 p-4 rounded-xl text-base font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Thank you! Your comment has been posted successfully.
              </div>
            )}

            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-text-main mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={commentForm.authorName}
                    onChange={(e) => setCommentForm({ ...commentForm, authorName: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-background border border-slate-300 focus:border-amber-500 text-text-main rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-1.5">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={commentForm.email}
                    onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                    placeholder="sarah@example.com"
                    className="w-full bg-background border border-slate-300 focus:border-amber-500 text-text-main rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-main mb-1.5">Comment *</label>
                <textarea
                  required
                  rows={4}
                  value={commentForm.comment}
                  onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                  placeholder="Share your feedback or questions..."
                  className="w-full bg-background border border-slate-300 focus:border-amber-500 text-text-main rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-y"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={commentSubmitting}
                  className="bg-accent-warm text-text-main font-label-md text-base px-7 py-3 rounded-xl font-bold hover:bg-amber-400 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {commentSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      Post Comment
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Comment List */}
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="bg-surface border border-slate-200 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-text-main text-base">{c.author_name}</span>
                    <span className="text-sm text-text-muted">
                      {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="font-body text-text-muted text-base leading-relaxed">{c.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-text-muted text-sm font-medium bg-surface/60 rounded-xl border border-slate-200/60">
              No comments yet. Be the first to share your perspective.
            </div>
          )}
        </div>

        {/* Related Articles */}
        <div className="pt-12 border-t border-slate-200">
          <h3 className="font-headline text-2xl font-bold text-text-main mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rPost) => (
              <BlogCard key={rPost.id || rPost.slug} post={rPost} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
