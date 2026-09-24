import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  LayoutDashboard, 
  ShoppingBag, 
  Server, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown,
  SlidersHorizontal,
  Compass, 
  Palette, 
  Code2, 
  GraduationCap,
  Sparkles,
  Clock,
  Check,
  X
} from 'lucide-react';
import { Link } from '../context/RouterContext';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);

  const servicesData = [
    {
      id: "custom-web-apps",
      category: "web",
      title: "Custom Web Applications",
      tagline: "Modern web platforms engineered for brand authority and easy daily management.",
      icon: Globe,
      badge: "Most Popular",
      turnaround: "2–3 Weeks",
      tech: ["React 19", "Node.js", "Tailwind"],
      customerFeatures: [
        "Sub-second load times & mobile-first UI",
        "Interactive quote estimators & inquiry forms",
        "Clean, tailored brand design & animations"
      ],
      adminControls: [
        "Visual CMS to update text & images in seconds",
        "Filtered lead inbox with CSV export",
        "Turn promotional banners on/off anytime"
      ]
    },
    {
      id: "admin-dashboards",
      category: "tools",
      title: "Admin Portals & Internal Tools",
      tagline: "Replace messy spreadsheets with a tailored company control center.",
      icon: LayoutDashboard,
      badge: "Core Strength",
      turnaround: "2–4 Weeks",
      tech: ["React", "PostgreSQL", "Node.js"],
      customerFeatures: [
        "Tailored specifically to your team's daily tasks",
        "Instant multi-column search, sort & filters",
        "One-click reports export to CSV & Excel"
      ],
      adminControls: [
        "Role-based permissions (Admin, Editor, Staff)",
        "Audit log tracking who edited what and when",
        "Direct database control with zero per-seat fees"
      ]
    },
    {
      id: "ecommerce-portals",
      category: "ecommerce",
      title: "Online Stores & Catalogs",
      tagline: "Fast digital stores with zero recurring platform rent and instant catalog edits.",
      icon: ShoppingBag,
      badge: "Zero Platform Fees",
      turnaround: "3–4 Weeks",
      tech: ["React", "Stripe / Razorpay", "PostgreSQL"],
      customerFeatures: [
        "Frictionless product browsing & instant filters",
        "Secure one-click checkout (Stripe / Razorpay)",
        "Automated customer receipts & order updates"
      ],
      adminControls: [
        "Add products, photos, and change prices live",
        "Inventory counter with low-stock alerts",
        "Create coupon codes and flash sales anytime"
      ]
    },
    {
      id: "api-backend",
      category: "backend",
      title: "Cloud Backend & Database",
      tagline: "Rock-solid server infrastructure and databases built for scale, speed, and safety.",
      icon: Server,
      badge: "High Performance",
      turnaround: "2–3 Weeks",
      tech: ["Node.js", "PostgreSQL", "REST APIs"],
      customerFeatures: [
        "Sub-50ms API response times for instant apps",
        "Secure user logins with encrypted sessions",
        "Reliable architecture designed for zero crashes"
      ],
      adminControls: [
        "100% access and ownership of database schemas",
        "Automated daily cloud backups to your private S3",
        "Zero vendor lock-in — move anywhere anytime"
      ]
    }
  ];

  const comparisonRows = [
    {
      feature: "Simple Text, Price & Banner Edits",
      traditional: "Submit support ticket, wait 2–5 days",
      nirmaan: "Instant via your custom Admin Panel (0 sec)"
    },
    {
      feature: "Code & Cloud Ownership",
      traditional: "Agency locks code on their servers",
      nirmaan: "100% transferred to your GitHub & Cloud"
    },
    {
      feature: "Monthly Platform Rent",
      traditional: "$50–$300/mo proprietary lock-in",
      nirmaan: "$0 monthly platform fee"
    },
    {
      feature: "Delivery Turnaround",
      traditional: "Months of delays and vague billable hours",
      nirmaan: "Fixed 2–4 week milestone delivery"
    },
    {
      feature: "Handover & Training",
      traditional: "ZIP file sent with zero guidance",
      nirmaan: "Live 1-on-1 video call + recorded guides"
    }
  ];

  const serviceFaqs = [
    {
      q: "Will my team be able to update content without writing code?",
      a: "Yes. Every platform includes a bespoke, easy Admin Panel where you can update headlines, product pricing, publish blogs, and toggle promo banners in seconds."
    },
    {
      q: "Do we really own 100% of the code and database?",
      a: "Yes, 100%. All repository code, database credentials, and cloud deployments are transferred directly to your organization with zero recurring platform rent."
    },
    {
      q: "What is your typical delivery timeline?",
      a: "Most custom builds are completed in 2 to 4 weeks with weekly milestone previews so you test features as they are built."
    },
    {
      q: "What training do you provide at handover?",
      a: "We conduct a live 1-on-1 video walkthrough call and provide recorded video tutorials so onboarding your team is effortless."
    }
  ];

  const filteredServices = activeTab === 'all' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeTab);

  return (
    <div className="bg-background text-text-main min-h-screen">
      {/* 1. Clean, Focused Header */}
      <section className="pt-28 sm:pt-36 pb-14 sm:pb-16 px-gutter bg-surface border-b border-slate-200">
        <div className="max-w-container-max mx-auto text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-mono uppercase tracking-wider font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Full Control • 100% Code Ownership</span>
            </div>

            <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-extrabold text-text-main tracking-tight leading-tight mb-4">
              Custom Software with Total Admin Control.
            </h1>
            <p className="font-body text-base sm:text-lg text-text-muted leading-relaxed mb-6 max-w-2xl">
              We build custom web apps, company dashboards, and digital stores paired with an easy Admin Suite—giving you complete freedom without ongoing developer delays.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm sm:text-base px-6 sm:px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
              <Link
                to="/portfolio"
                className="bg-surface border border-slate-300 text-text-main font-bold text-sm sm:text-base px-6 py-3 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Streamlined Services Grid (Clean, Scannable Cards) */}
      <section className="py-16 sm:py-20 px-gutter">
        <div className="max-w-container-max mx-auto">
          {/* Header & Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-text-main">
                What We Build
              </h2>
              <p className="font-body text-text-muted text-sm sm:text-base mt-1">
                Each service includes both a customer-facing app and an internal admin suite.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'All', key: 'all' },
                { label: 'Web Apps', key: 'web' },
                { label: 'Admin Tools', key: 'tools' },
                { label: 'E-Commerce', key: 'ecommerce' },
                { label: 'Backend', key: 'backend' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-slate-950 text-white'
                      : 'bg-surface border border-slate-200 text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards (Streamlined Dual-Panel) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredServices.map((service, sIdx) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: sIdx * 0.05 }}
                  className="bg-surface border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-lg hover:border-amber-400/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Card Top */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
                          <ServiceIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-headline text-xl font-bold text-text-main">
                            {service.title}
                          </h3>
                          <span className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {service.turnaround} Turnaround
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase text-amber-800 bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 rounded-full">
                        {service.badge}
                      </span>
                    </div>

                    <p className="text-sm text-text-muted mb-5 leading-relaxed">
                      {service.tagline}
                    </p>

                    {/* Dual Highlights: Customer vs Admin (Tight 3x3) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                      {/* Left: Customer Side */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Customer View
                        </p>
                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {service.customerFeatures.map((f, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Admin Side */}
                      <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                          Your Admin Suite
                        </p>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {service.adminControls.map((c, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {service.tech.map((t, idx) => (
                        <span key={idx} className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/contact"
                      className="text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1 group/btn cursor-pointer"
                    >
                      <span>Get Scope</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Concise Comparison Table */}
      <section className="py-16 sm:py-20 px-gutter bg-surface border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-text-main">
              The Difference
            </h2>
            <p className="font-body text-text-muted text-sm sm:text-base mt-1">
              Why founders choose our complete ownership model over traditional agencies.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-background border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/80 text-[11px] uppercase font-mono tracking-wider text-slate-700">
                  <th className="py-3.5 px-5 font-bold">Category</th>
                  <th className="py-3.5 px-5 font-bold text-slate-500">Traditional Agencies</th>
                  <th className="py-3.5 px-5 font-bold bg-slate-900 text-amber-400">Nirmaan Softworks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 font-bold text-text-main">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{row.traditional}</span>
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-slate-950 bg-amber-50/40">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                        <span>{row.nirmaan}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Simple 4-Step Process */}
      <section className="py-16 sm:py-20 px-gutter bg-background border-b border-slate-200">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-text-main">
              How We Work
            </h2>
            <p className="font-body text-text-muted text-sm sm:text-base mt-1">
              Clear 4-step delivery with weekly live previews.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Scope & Plan', desc: 'Map your daily workflow & required admin controls.', icon: Compass },
              { step: '02', title: 'Interactive Design', desc: 'Design customer screens & admin panels before coding.', icon: Palette },
              { step: '03', title: 'Build & Sprints', desc: 'Weekly milestone preview links for live testing.', icon: Code2 },
              { step: '04', title: 'Handover & Train', desc: '100% code transfer + live 1-on-1 video walkthrough.', icon: GraduationCap }
            ].map((s, idx) => {
              const StepIcon = s.icon;
              return (
                <div key={idx} className="bg-surface p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-base text-text-main mb-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FAQs (Tight & Clean) */}
      <section className="py-16 sm:py-20 px-gutter max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-text-main">
            Common Questions
          </h2>
        </div>

        <div className="space-y-2.5">
          {serviceFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-surface border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-3.5 text-left font-headline font-bold text-sm sm:text-base text-text-main flex justify-between items-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-600' : 'text-slate-400'}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-4 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-slate-100 pt-2.5"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Clean Bottom CTA */}
      <section className="px-gutter max-w-container-max mx-auto pb-16 sm:pb-24">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <h2 className="font-headline text-2xl sm:text-4xl font-extrabold mb-2 text-white">
            Ready to Build With Full Admin Control?
          </h2>
          <p className="font-body text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
            Get in touch with our lead engineer for a preliminary scope and fixed delivery timeline within 24 hours.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-7 py-3.5 rounded-full transition-all text-sm sm:text-base shadow-md cursor-pointer"
          >
            <span>Get a Project Estimate</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </Link>
        </div>
      </section>
    </div>
  );
}
