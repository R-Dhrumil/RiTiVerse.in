# Nirmaan Softworks — Enterprise Company Website

A fully functional, animated, professional company website for **Nirmaan Softworks** built with React, Vite, Tailwind CSS, Framer Motion, and Supabase. Crafted directly from Google Stitch UI/UX design specifications.

---

## 🚀 Tech Stack

- **Frontend Framework:** React (JSX) + Vite
- **Styling:** Tailwind CSS (configured with Stitch design system tokens: colors, spacing, typography)
- **Animations:** Framer Motion (smooth scroll fade-in, bento grid hover states, modals, drawer)
- **3D & Shader Graphics:** WebGL GLSL Shader + Three.js 3D Laptop Canvas
- **Database Backend:** `@supabase/supabase-js` (Contact form submissions)
- **Icons:** Lucide React + Google Material Symbols
- **Deployment:** Fully static SPA ready for GitHub Pages (`base: './'`)

---

## 📦 Local Setup & Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create or verify `.env.local` in the project root with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://igpuggmoskurxzebyolq.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_OhS-9WD5Fvz-GvdKnohETg_9kvWWKYj
   ```

3. **Run Local Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Production Build:**
   ```bash
   npm run build
   ```
   The static production output will be generated in the `./dist` folder.

---

## 🗄️ Supabase Table Schema & Setup

To enable the Contact Consultation Form submissions, create the `contact_submissions` table in your Supabase SQL Editor:

```sql
-- 1. Create the contact_submissions table
create table public.contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  project_type text not null,
  message text not null,
  created_at timestamptz default now() not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.contact_submissions enable row level security;

-- 3. Create RLS Policy allowing anonymous public submissions
create policy "Allow public contact submissions" 
  on public.contact_submissions 
  for insert 
  to anon, authenticated 
  with check (true);
```

---

## 🌐 Deploying to GitHub Pages

1. Build the production output:
   ```bash
   npm run build
   ```
2. The static files are generated in `./dist`.
3. Push the `./dist` folder content or use `gh-pages` CLI:
   ```bash
   npx gh-pages -d dist
   ```
   `vite.config.js` is already pre-configured with `base: './'` for seamless relative asset resolution on any GitHub repository path.

---

## 📂 Project Component Architecture

- `src/components/Navbar.jsx` — Sticky header with smooth scroll & mobile drawer
- `src/components/Hero.jsx` — Hero banner with WebGL Shader BG & Three.js 3D model
- `src/components/Services.jsx` — Architectural Capabilities Bento Grid & 4-step process
- `src/components/WhyChooseUs.jsx` — Trust pillars & zero tech debt highlights
- `src/components/Portfolio.jsx` — Case studies grid, filter tabs, & detail modal
- `src/components/Pricing.jsx` — Monthly/Annual pricing cards & FAQ accordion
- `src/components/Testimonials.jsx` — Executive social proof & client feedback
- `src/components/ContactForm.jsx` — Form with client validation & Supabase integration
- `src/components/Footer.jsx` — Footer with navigation links & policy disclosures
- `src/constants/content.js` — Centralized content data file for clean layout separation
