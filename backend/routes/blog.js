import { Router } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

/**
 * GET /api/blog
 * Fetch blog posts with optional search, category, tag, and featured filtering
 */
router.get('/', async (req, res) => {
  try {
    const { search, category, tag, featured, limit = 20, offset = 0 } = req.query;

    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    if (tag) {
      query = query.contains('tags', [tag]);
    }

    if (search) {
      const searchPattern = `%${search.trim()}%`;
      query = query.or(`title.ilike.${searchPattern},excerpt.ilike.${searchPattern},content.ilike.${searchPattern}`);
    }

    const { data, count, error } = await query.range(Number(offset), Number(offset) + Number(limit) - 1);

    if (error) {
      console.error('❌ Supabase blog posts fetch error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.json({
      success: true,
      count: count || data.length,
      posts: data
    });
  } catch (err) {
    console.error('❌ Server error in GET /api/blog:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/blog/:slug
 * Fetch a single blog post by slug and increment view count
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    if (!post) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }

    // Increment view count asynchronously
    supabase
      .from('blog_posts')
      .update({ views: (post.views || 0) + 1 })
      .eq('id', post.id)
      .then(() => {})
      .catch((err) => console.warn('Failed to increment post views:', err));

    return res.json({ success: true, post });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/blog/:slug/comments
 * Fetch comments for a blog post
 */
router.get('/:slug/comments', async (req, res) => {
  try {
    const { slug } = req.params;

    const { data: comments, error } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_slug', slug)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.json({ success: true, count: comments.length, comments });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/blog/:slug/comments
 * Add a comment to a blog post
 */
router.post('/:slug/comments', async (req, res) => {
  try {
    const { slug } = req.params;
    const { authorName, email, comment } = req.body;

    if (!authorName || !email || !comment) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: Name, Email, and Comment are required.'
      });
    }

    const { data, error } = await supabase
      .from('blog_comments')
      .insert([
        {
          post_slug: slug,
          author_name: authorName.trim(),
          email: email.trim().toLowerCase(),
          comment: comment.trim()
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment: data[0]
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/blog
 * Create a new blog post (admin route)
 */
router.post('/', async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, tags, authorName, authorRole, authorAvatar, coverImage, featured } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ success: false, error: 'Title, slug, and content are required.' });
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        {
          title: title.trim(),
          slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
          excerpt: excerpt ? excerpt.trim() : title.trim(),
          content: content,
          category: category || 'Engineering',
          tags: tags || ['General'],
          author_name: authorName || 'Nirmaan Softworks',
          author_role: authorRole || 'Engineering Team',
          author_avatar: authorAvatar || null,
          cover_image: coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
          featured: Boolean(featured),
          published: true
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(201).json({ success: true, post: data[0] });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
