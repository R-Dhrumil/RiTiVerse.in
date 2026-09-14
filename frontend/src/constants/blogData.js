export const BLOG_CATEGORIES = [
  'All',
  'Admin Control',
  'Code Ownership',
  'Engineering',
  'Security'
];

export const INITIAL_BLOG_POSTS = [
  {
    id: 'b1',
    slug: 'building-scalable-react-19-architectures',
    title: 'Why Total Admin Control is the Ultimate Competitive Advantage',
    excerpt: 'How custom administrative dashboards empower non-technical teams to manage content, leads, and pricing instantly without waiting on developers.',
    category: 'Admin Control',
    tags: ['Admin Dashboards', 'React 19', 'Business Autonomy'],
    read_time: '4 min read',
    created_at: '2026-08-10T10:00:00.000Z',
    views: 1420,
    featured: true,
    published: true,
    cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Nirmaan Engineering Team',
      role: 'Software Architects',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    },
    content: `
# Why Total Admin Control is the Ultimate Competitive Advantage

Modern businesses move too fast to wait days or weeks for agency developers to make routine updates. When your team has a tailored administrative console, your operational agility increases tenfold.

---

## 1. Eliminate the Agency Bottleneck

In conventional agency models, updating a headline, launching a seasonal promo banner, or adding a new team member requires a support ticket and days of turnaround. With bespoke Admin Control, marketing and operations teams execute changes in seconds.

- **Instant Content Edits:** Change copy, images, and pricing in real time.
- **Dynamic Feature Toggles:** Activate new services or holiday promos with a single switch.
- **Self-Serve Analytics:** Export customer inquiries and leads directly to CSV.

---

## 2. Engineered For Your Exact Workflow

Off-the-shelf CMS solutions are often bloated and confusing. We build minimal, purpose-built admin portals that mirror your exact business processes—nothing more, nothing less.

> **Our Philosophy:** Software should adapt to your business, not the other way around. You own the software, and you control the levers.
    `
  },
  {
    id: 'b2',
    slug: 'supabase-vs-traditional-relational-databases',
    title: '100% Code Ownership vs Proprietary SaaS Lock-In',
    excerpt: 'An architectural analysis of why owning your full source code and database saves thousands in recurring platform fees.',
    category: 'Code Ownership',
    tags: ['Code Ownership', 'PostgreSQL', 'Architecture'],
    read_time: '5 min read',
    created_at: '2026-08-04T14:30:00.000Z',
    views: 980,
    featured: false,
    published: true,
    cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Nirmaan Engineering Team',
      role: 'Backend Leads',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    content: `
# 100% Code Ownership vs Proprietary SaaS Lock-In

Many software agencies deliver websites built on proprietary platforms that require perpetual monthly licensing. If you ever leave, you lose your website and data.

---

## 1. Complete Source Code Handover

At Nirmaan Softworks, you receive the full Git repository, database schemas, and documentation. You can host it anywhere, modify it at any time, and never pay hostage fees.

- **Zero Monthly Platform Fees:** Only standard cloud hosting at cost.
- **Freedom to Expand:** Any modern developer can build on clean React and Node code.
- **Complete Intellectual Property:** All assets belong legally to your business.

---

## 2. Standard Open-Source Stack

We build exclusively with standard, battle-tested technologies: React 19, Vite, Node.js, and PostgreSQL. No obscure proprietary languages or restrictive runtime containers.
    `
  },
  {
    id: 'b3',
    slug: 'ai-driven-code-generation-and-dev-pipelines',
    title: 'Architecting Real-Time Admin Dashboards with React & PostgreSQL',
    excerpt: 'How modern full-stack architectures deliver sub-second data synchronization and role-based permissions.',
    category: 'Engineering',
    tags: ['React 19', 'PostgreSQL', 'Full Stack'],
    read_time: '4 min read',
    created_at: '2026-07-28T09:15:00.000Z',
    views: 2150,
    featured: false,
    published: true,
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Nirmaan Engineering Team',
      role: 'Frontend Leads',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
    },
    content: `
# Architecting Real-Time Admin Dashboards with React & PostgreSQL

A high-performing admin dashboard must be responsive, intuitive, and secure. We architect internal tooling with instant optimistic updates and role-based permission tiers.

---

## 1. Role-Based Access Control (RBAC)

Not every team member needs full access to financial data or billing settings. Our admin consoles support granular permissions:

- **Super Admins:** Full system configuration and user management.
- **Content Editors:** Live text, media, and blog management.
- **Support Staff:** Customer inquiries and appointment pipelines.

---

## 2. Sub-Second Real-Time Updates

By pairing PostgreSQL realtime notifications with optimized React state, updates to inquiries and orders appear across all connected dashboard screens with zero latency.
    `
  },
  {
    id: 'b4',
    slug: 'zero-trust-cloud-security-best-practices',
    title: 'Hardening Client Portals with Role-Based Security & Encryption',
    excerpt: 'Practical security protocols for API key rotation, JWT authorization, and encrypted database storage.',
    category: 'Security',
    tags: ['Security', 'Cloud', 'Data Privacy'],
    read_time: '5 min read',
    created_at: '2026-07-19T11:00:00.000Z',
    views: 840,
    featured: false,
    published: true,
    cover_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Nirmaan Engineering Team',
      role: 'Security Architects',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    content: `
# Hardening Client Portals with Role-Based Security & Encryption

Security should never be an afterthought. In every custom web platform we deliver, enterprise-grade protection is baked into the foundation.

---

## 1. Database-Level Row Security

Row-Level Security (RLS) ensures that even if client-side code is probed, users can only access their authorized records at the database level.

## 2. Automated Backups & Disaster Recovery

Every deployment includes daily encrypted snapshots and automated redundancy, ensuring business continuity with zero manual maintenance required.
    `
  }
];
