export const COMPANY_INFO = {
  name: "Nirmaan Softworks",
  altName: "Nirmaan IT Solutions",
  tagline: "Custom IT Services with Total Admin Control",
  subTagline: "You Own It. You Control It.",
  description: "Bespoke web applications and digital platforms equipped with an intuitive Admin Panel. Manage your entire business without developer dependency.",
  highlights: [
    { label: "Admin Autonomy", value: "100% Control" },
    { label: "Source Code", value: "Full Ownership" },
    { label: "Tech Stack", value: "React & Node" },
    { label: "Delivery", value: "2–4 Weeks" }
  ],
  email: "contact@nirmaansoftworks.com",
  phone: "+91 98765 43210",
  address: "Ahmedabad, Gujarat, India"
};

export const SERVICES = [
  {
    id: "custom-web-apps",
    title: "Custom Web Applications",
    icon: "globe",
    description: "Fast, custom-built web platforms delivered with a dedicated Admin Panel for full operational autonomy.",
    features: [
      "Bespoke UI/UX for your brand",
      "Tailored Admin CMS included",
      "Real-time database synchronization",
      "100% Mobile responsive & SEO-ready"
    ],
    badge: "Core Service",
    cols: "col-span-12 lg:col-span-6"
  },
  {
    id: "admin-dashboards",
    title: "Admin Portals & Internal Tools",
    icon: "layout_dashboard",
    description: "Centralized control centers to manage data, track inquiries, view metrics, and automate team workflows.",
    features: [
      "Custom CRUD data tables & filters",
      "1-click CSV & PDF reports export",
      "Granular role permissions (RBAC)",
      "Zero-latency updates"
    ],
    cols: "col-span-12 lg:col-span-6"
  },
  {
    id: "ecommerce-portals",
    title: "E-Commerce & Digital Catalogs",
    icon: "shopping_bag",
    description: "High-conversion online storefronts with instant inventory editing, discount controls, and order tracking.",
    features: [
      "Effortless stock & price updates",
      "Automated order & lead notifications",
      "Stripe & Razorpay payment integration",
      "Promotional banner toggles"
    ],
    cols: "col-span-12 lg:col-span-6"
  },
  {
    id: "api-backend",
    title: "API & Cloud Architecture",
    icon: "server",
    description: "Secure, scalable backend infrastructure built on PostgreSQL/Supabase and Node.js with zero lock-in.",
    features: [
      "Clean REST & GraphQL APIs",
      "High-speed database caching",
      "Secure role-based authentication",
      "Automated cloud backups"
    ],
    cols: "col-span-12 lg:col-span-6"
  }
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Requirements Scoping",
    description: "We map out your business workflow and identify the exact admin controls your team needs."
  },
  {
    step: 2,
    title: "UI & Architecture",
    description: "We design both the customer-facing interface and the administrative control dashboard."
  },
  {
    step: 3,
    title: "Full-Stack Development",
    description: "We build your platform using clean, modern code with continuous staging previews."
  },
  {
    step: 4,
    title: "Handover & Admin Training",
    description: "We transfer 100% code ownership and provide a live 1-on-1 walkthrough of your admin panel."
  }
];

export const WHY_CHOOSE_US = [
  {
    icon: "sliders",
    title: "Total Admin Autonomy",
    description: "Update copy, banners, products, and prices in real-time. Never wait on a developer for simple changes."
  },
  {
    icon: "key",
    title: "100% Code Ownership",
    description: "You own the full source code, database, and assets. Zero monthly proprietary fees or platform lock-in."
  },
  {
    icon: "zap",
    title: "Blazing Modern Speed",
    description: "Built on React 19, Vite, and PostgreSQL for instantaneous load times and smooth mobile experiences."
  },
  {
    icon: "user_check",
    title: "Direct Developer Contact",
    description: "Communicate directly with the engineers building your software. Clear milestones and fast execution."
  }
];

export const PORTFOLIO_PROJECTS = [
  {
    id: "b2b-procurement-portal",
    title: "B2B Procurement Platform",
    category: "Custom Web App",
    badge: "Web Platform + Admin",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    description: "Ordering and catalog platform with a full admin suite for tiered client pricing, automated invoicing, and stock sync.",
    features: ["Role-based access", "Instant stock edits", "Exportable CSV analytics"],
    gridCols: "col-span-1 md:col-span-7",
    layout: "horizontal"
  },
  {
    id: "service-booking-hub",
    title: "Service Reservation CRM",
    category: "Internal Tool",
    badge: "CRM + Booking Engine",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    description: "Service dispatch hub equipped with live calendar drag-and-drop scheduling and automated SMS/Email alerts.",
    features: ["Staff scheduling", "Lead status pipeline", "Real-time calendar"],
    gridCols: "col-span-1 md:col-span-5",
    layout: "vertical"
  },
  {
    id: "custom-cms-store",
    title: "Direct-to-Consumer Storefront",
    category: "E-Commerce",
    badge: "Storefront + CMS",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&q=80&w=1000",
    description: "Lightning-fast modern storefront where marketing teams manage promo banners, coupons, and inventory with zero code.",
    features: ["Visual banner editor", "Coupon code engine", "Instant Stripe checkout"],
    gridCols: "col-span-1 md:col-span-12",
    layout: "reverse-horizontal"
  }
];

export const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter Web + CMS",
    price: "Custom Quote",
    badge: "Fast Launch",
    description: "Custom responsive website with a tailored admin CMS for copy, blog, and media management.",
    features: [
      "Custom responsive design",
      "Visual Admin CMS for text & media",
      "Lead capture & email notifications",
      "SEO setup & fast CDN hosting",
      "100% full source code ownership"
    ],
    ctaText: "Get a Proposal",
    highlighted: false
  },
  {
    id: "growth",
    name: "Custom Web App + Admin Suite",
    price: "Custom Quote",
    badge: "Most Popular",
    description: "Tailored application with user accounts, custom business logic, and a comprehensive admin control hub.",
    features: [
      "Custom web app / operational portal",
      "Complete Admin Control Dashboard",
      "Role-based access permissions (RBAC)",
      "Database & custom API integrations",
      "Automated alerts & export tools",
      "Live 1-on-1 admin training"
    ],
    ctaText: "Discuss Your Project",
    highlighted: true
  },
  {
    id: "enterprise",
    name: "Enterprise Architecture",
    price: "Custom Quote",
    badge: "Full Scale",
    description: "Scalable multi-tenant platforms, SaaS architectures, and complex operational software.",
    features: [
      "Full custom SaaS or platform build",
      "Advanced multi-tenant admin suite",
      "Custom workflow & report automations",
      "Scalable cloud backend & DB caching",
      "Priority SLA & dedicated lead engineer"
    ],
    ctaText: "Contact Tech Lead",
    highlighted: false
  }
];

export const FAQ_ITEMS = [
  {
    question: "What does 'Full Admin Control' mean?",
    answer: "You receive a custom dashboard to edit content, adjust pricing, manage orders/leads, and toggle features instantly—without hiring or waiting on developers."
  },
  {
    question: "Do I own 100% of the source code?",
    answer: "Yes, absolutely. All code, database schemas, and intellectual property belong entirely to you with zero recurring proprietary platform fees."
  },
  {
    question: "What is the typical turnaround time?",
    answer: "Custom websites with an admin CMS typically launch in 2 to 3 weeks. Custom web apps and internal portals launch in 4 to 6 weeks."
  },
  {
    question: "What technologies do you build with?",
    answer: "We use modern, open-source industry standards: React 19, Vite, Node.js, and PostgreSQL/Supabase for maximum speed and longevity."
  }
];
