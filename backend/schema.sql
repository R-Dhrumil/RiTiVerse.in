-- ==============================================================================
-- Nirmaan Softworks - Supabase PostgreSQL Schema Migration
-- Table: contact_submissions
-- ==============================================================================

-- 1. Create Submissions Table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_type TEXT NOT NULL,
    budget_range TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'archived', 'accepted')),
    user_agent TEXT,
    ip_address TEXT
);

-- 2. Create Search & Status Indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions(status);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Allow Public Anonymous Submissions (Insert Only)
DROP POLICY IF EXISTS "Allow public contact form submissions" ON public.contact_submissions;
CREATE POLICY "Allow public contact form submissions"
    ON public.contact_submissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 5. RLS Policy: Allow Authenticated Admins to Read Submissions
DROP POLICY IF EXISTS "Allow authenticated admins to read submissions" ON public.contact_submissions;
CREATE POLICY "Allow authenticated admins to read submissions"
    ON public.contact_submissions
    FOR SELECT
    TO authenticated
    USING (true);

-- 6. Trigger for Updating updated_at Timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON public.contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON public.contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- Table: blog_posts
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    category TEXT NOT NULL DEFAULT 'Engineering',
    tags TEXT[] DEFAULT '{}',
    author_name TEXT NOT NULL DEFAULT 'Nirmaan Softworks',
    author_role TEXT NOT NULL DEFAULT 'Engineering Team',
    author_avatar TEXT,
    read_time TEXT DEFAULT '5 min read',
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for fast blog retrieval and filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);

-- Enable RLS for blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published blog posts
DROP POLICY IF EXISTS "Allow public read access to blog posts" ON public.blog_posts;
CREATE POLICY "Allow public read access to blog posts"
    ON public.blog_posts
    FOR SELECT
    TO anon, authenticated
    USING (published = true);

-- Allow authenticated users to manage blog posts
DROP POLICY IF EXISTS "Allow authenticated users to insert/update blog posts" ON public.blog_posts;
CREATE POLICY "Allow authenticated users to insert/update blog posts"
    ON public.blog_posts
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Trigger for blog_posts updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- Table: blog_comments
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.blog_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
    post_slug TEXT NOT NULL,
    author_name TEXT NOT NULL,
    email TEXT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_blog_comments_post_slug ON public.blog_comments(post_slug);

-- Enable RLS for blog_comments
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Allow public read access to blog comments
DROP POLICY IF EXISTS "Allow public read access to comments" ON public.blog_comments;
CREATE POLICY "Allow public read access to comments"
    ON public.blog_comments
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Allow public insert access for new comments
DROP POLICY IF EXISTS "Allow public comment submissions" ON public.blog_comments;
CREATE POLICY "Allow public comment submissions"
    ON public.blog_comments
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- ==============================================================================
-- Seed Data for Blog Posts
-- ==============================================================================
INSERT INTO public.blog_posts (slug, title, excerpt, content, cover_image, category, tags, author_name, author_role, author_avatar, read_time, featured, published, views)
VALUES 
(
    'building-scalable-react-19-architectures',
    'Architecting Enterprise React 19 Applications with Sub-Second Performance',
    'Explore the modern paradigm of Server Components, Concurrent Mode, fine-grained state management, and asset optimization for enterprise React applications in 2026.',
    '# Architecting Enterprise React 19 Applications\n\nBuilding enterprise software requires balancing speed, scalability, developer experience, and long-term maintainability. In React 19, new features like actions, useDeferredValue optimizations, and refined concurrency patterns enable developers to craft applications with near-zero latency.\n\n## 1. Modular State Topology\nState management often defaults to monolithic global stores. Instead, prefer local state scoping with specialized contexts:\n\n```javascript\n// Scoped React Context Pattern\nexport const WorkspaceProvider = ({ children }) => {\n  const [state, dispatch] = useReducer(workspaceReducer, initialWorkspace);\n  return (\n    <WorkspaceContext.Provider value={{ state, dispatch }}>\n      {children}\n    </WorkspaceContext.Provider>\n  );\n};\n```\n\n## 2. Micro-Frontend Layout Splitting\nBy splitting complex dashboards into isolated feature packages, team velocity increases while bundle sizes remain minimal.\n\n## Key Takeaways\n- Use React 19 Actions for asynchronous transitions.\n- Keep global state localized to specific DOM sub-trees.\n- Enforce strict core web vitals performance budgets.',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    'Engineering',
    ARRAY['React', 'JavaScript', 'Frontend', 'Performance'],
    'Alex Vance',
    'Principal Software Architect',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    '6 min read',
    true,
    true,
    1420
),
(
    'supabase-vs-traditional-relational-databases',
    'Why Enterprise Teams Are Choosing Supabase & PostgreSQL for Cloud Backends',
    'A deep dive into real-time subscriptions, Row-Level Security (RLS) governance, microservice scalability, and edge function integrations.',
    '# Why Enterprise Teams Are Choosing Supabase & PostgreSQL\n\nPostgreSQL has long been the gold standard for relational persistence. Combined with Supabase''s instant APIs and fine-grained Row-Level Security (RLS), engineering teams can deploy secure backends in hours rather than weeks.\n\n## Fine-Grained Row Level Security (RLS)\nRLS shifts security enforcement directly to the database layer, eliminating redundant middleware authorization logic:\n\n```sql\nCREATE POLICY "Users access own records"\n    ON public.user_profiles\n    FOR SELECT\n    USING (auth.uid() = user_id);\n```\n\n## Instant Realtime Subscriptions\nWith PostgreSQL CDC (Change Data Capture), client frontends listen to mutations instantly without heavy WebSocket server boilerplates.',
    'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1200',
    'Architecture',
    ARRAY['Supabase', 'PostgreSQL', 'Backend', 'Database'],
    'Marcus Thorne',
    'Head of Backend Infrastructure',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    '8 min read',
    false,
    true,
    980
),
(
    'ai-driven-code-generation-and-dev-pipelines',
    'Integrating AI Agents into CI/CD Pipelines for Zero-Defect Releases',
    'How automated AI review agents, static security scanners, and continuous visual testing accelerate time-to-market without compromising quality.',
    '# Integrating AI Agents into CI/CD Pipelines\n\nModern software development velocity demands automated verification at every step of the pipeline. AI code inspection agents combined with static analysis ensure zero-defect deployments.\n\n## Visual Regression & Automated E2E\nAutomating cross-browser validation ensures that visual components maintain pixel-perfect fidelity across releases.',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    'AI & ML',
    ARRAY['AI', 'DevOps', 'CI/CD', 'Automation'],
    'Elena Rostova',
    'VP of AI Engineering',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    '5 min read',
    true,
    true,
    2150
)
ON CONFLICT (slug) DO NOTHING;

