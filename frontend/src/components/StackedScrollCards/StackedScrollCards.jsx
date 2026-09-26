import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Sliders, 
  Layers, 
  Zap, 
  Database, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import './StackedScrollCards.css';

gsap.registerPlugin(ScrollTrigger);

// Curated default service cards matching Nirmaan Softworks frontend theme & design tokens
export const DEFAULT_SERVICES_CARDS = [
  {
    id: 'web-apps',
    stepNumber: '01',
    badge: 'Custom Engineering',
    title: 'Custom Web Applications & Portals with Full Autonomy',
    description: 'High-performance bespoke web platforms engineered from scratch with dedicated Admin Panels so your team has 100% control without ongoing vendor lock-in.',
    image: '/images/service-web-apps.jpg',
    imageAlt: 'Custom Web Application Dashboard Preview',
    theme: {
      cardBg: 'bg-white',
      textColor: 'text-slate-900',
      descriptionColor: 'text-slate-600',
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-200/90 font-bold',
      pillBg: 'bg-slate-50 border-slate-200/90 text-slate-800',
      pillLabelColor: 'text-slate-500',
      pillIconColor: 'text-amber-500',
      borderColor: 'border-slate-200/90',
      ctaBg: 'bg-slate-950 text-white hover:bg-slate-900 shadow-md shadow-slate-950/15',
      footerLabel: 'Full Stack Ownership',
      footerValue: 'React + Node + PostgreSQL',
    },
    metrics: [
      { icon: Clock, value: '2–4 Weeks', label: 'Delivery Time' },
      { icon: ShieldCheck, value: '100% Owned', label: 'Full Source Code' },
      { icon: Sliders, value: 'Full Control', label: 'Dedicated Admin' },
    ],
    ctaText: 'Explore Web Apps',
    ctaLink: '/contact',
  },
  {
    id: 'admin-dashboards',
    stepNumber: '02',
    badge: 'Operations & Control',
    title: 'Tailored Admin Dashboards & Internal Operations Tools',
    description: 'Private centralized command centers engineered with real-time data grids, granular staff roles, and instant Excel exports to run operations without friction.',
    image: '/images/service-admin-portal.jpg',
    imageAlt: 'Interactive Admin Console with Realtime Analytics',
    theme: {
      cardBg: 'bg-[#0f172a]', // Signature Deep Slate 900 (matches Admin Console & Footer)
      textColor: 'text-white',
      descriptionColor: 'text-slate-300',
      badgeBg: 'bg-amber-400/15 text-amber-300 border-amber-400/30 backdrop-blur-xs font-bold',
      pillBg: 'bg-white/10 border-white/15 text-white backdrop-blur-xs',
      pillLabelColor: 'text-slate-400',
      pillIconColor: 'text-amber-400',
      borderColor: 'border-slate-800',
      ctaBg: 'bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold shadow-lg shadow-amber-400/20',
      footerLabel: 'Direct Management',
      footerValue: 'Role-Based Access Control',
    },
    metrics: [
      { icon: Layers, value: 'Live Grids', label: 'Filter & Search' },
      { icon: Zap, value: '1-Click', label: 'Excel/CSV Export' },
      { icon: Sliders, value: 'Zero Lock-in', label: 'Instant Updates' },
    ],
    ctaText: 'View Dashboard Specs',
    ctaLink: '/contact',
  },
  {
    id: 'ecommerce-portals',
    stepNumber: '03',
    badge: 'Direct Commerce',
    title: 'Conversion-Focused Online Stores & Dynamic Catalogs',
    description: 'Bespoke e-commerce engines where non-technical staff manage sale banners, coupon codes, inventories, and customer shipments with zero developer tickets.',
    image: '/images/service-ecommerce.jpg',
    imageAlt: 'Next-Gen E-Commerce Platform Display',
    theme: {
      cardBg: 'bg-gradient-to-br from-[#d97706] to-[#b45309]', // Brand Signature Warm Amber
      textColor: 'text-white',
      descriptionColor: 'text-amber-100',
      badgeBg: 'bg-black/25 text-white border-white/30 backdrop-blur-xs font-bold',
      pillBg: 'bg-white/15 border-white/25 text-white backdrop-blur-xs',
      pillLabelColor: 'text-amber-100',
      pillIconColor: 'text-amber-200',
      borderColor: 'border-amber-400/30',
      ctaBg: 'bg-slate-950 text-white hover:bg-slate-900 font-bold shadow-xl shadow-black/25',
      footerLabel: 'Checkout Pipeline',
      footerValue: 'Stripe + Razorpay Ready',
    },
    metrics: [
      { icon: ShoppingBag, value: '99.9%', label: 'Uptime Reliability' },
      { icon: Zap, value: 'Instant', label: 'Catalog Updates' },
      { icon: ShieldCheck, value: 'Secure', label: 'Payment Gateway' },
    ],
    ctaText: 'Explore E-Commerce',
    ctaLink: '/contact',
  },
  {
    id: 'cloud-backend',
    stepNumber: '04',
    badge: 'Scalable Infrastructure',
    title: 'Cloud Backend Architecture & High-Speed API Pipelines',
    description: 'Production-ready database and cloud server architecture engineered for sub-50ms latency, bulletproof token security, and automated cloud backup pipelines.',
    image: '/images/service-cloud-backend.jpg',
    imageAlt: 'Cloud Server Architecture and Database Systems',
    theme: {
      cardBg: 'bg-slate-950', // Executive Obsidian Slate (Theme Dark)
      textColor: 'text-white',
      descriptionColor: 'text-slate-400',
      badgeBg: 'bg-amber-400/10 text-amber-400 border-amber-400/25 font-bold',
      pillBg: 'bg-white/5 border-white/10 text-white',
      pillLabelColor: 'text-slate-400',
      pillIconColor: 'text-amber-400',
      borderColor: 'border-slate-800',
      ctaBg: 'bg-white text-slate-950 hover:bg-slate-100 font-bold shadow-lg shadow-white/10',
      footerLabel: 'Database & Cloud',
      footerValue: 'Sub-50ms REST / GraphQL',
    },
    metrics: [
      { icon: Database, value: 'Daily', label: 'Automated Backups' },
      { icon: Zap, value: '< 50ms', label: 'API Response Time' },
      { icon: ShieldCheck, value: 'End-to-End', label: 'Encrypted Security' },
    ],
    ctaText: 'View Cloud Architecture',
    ctaLink: '/contact',
  },
];

export default function StackedScrollCards({
  cards = DEFAULT_SERVICES_CARDS,
  sectionBadge = 'Explore Services',
  sectionTitle = 'Custom Web Software Built for Complete Autonomy',
  sectionSubtitle = 'Every platform we engineer pairs modern architecture with an intuitive admin dashboard, giving your business 100% control without monthly vendor lock-in.',
  onCardClick,
}) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  let navigate;
  try {
    const router = useRouter();
    navigate = router?.navigate;
  } catch (err) {
    // Fallback when outside RouterProvider
  }

  useLayoutEffect(() => {
    // GSAP context ensures clean scoping and avoids memory leaks / StrictMode duplication
    const ctx = gsap.context(() => {
      const activeCards = cardsRef.current.filter(Boolean);
      if (activeCards.length <= 1) return;

      // Base z-index and initial end-to-end positioning (card 2 sticks to end of card 1, etc.)
      activeCards.forEach((card, index) => {
        gsap.set(card, {
          zIndex: index + 1,
          transformOrigin: 'center top',
          yPercent: index * 100,
          force3D: true, // Permanent GPU acceleration prevents layer promotion glitch
        });
      });

      // Responsive matchMedia for responsive animations and reduced motion support
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          isTablet: '(min-width: 768px) and (max-width: 1023px)',
          isMobile: '(max-width: 767px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, isTablet, isMobile, reduceMotion } = context.conditions;

          // If user prefers reduced motion, disable pinning and transforms
          if (reduceMotion) {
            activeCards.forEach((card) => {
              gsap.set(card, { clearProps: 'all' });
            });
            return;
          }

          // Stepped vertical offset and subtle scale down for physical deck stack (Sheryians reference)
          const stepY = isDesktop ? -36 : isTablet ? -24 : -16;
          const scaleStep = isDesktop ? 0.032 : isTablet ? 0.028 : 0.02;
          const scrollDistancePerCard = isMobile ? 500 : isTablet ? 600 : 680;
          const totalTransitions = activeCards.length - 1;
          const settleDistance = isMobile ? 80 : 120;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              // Exact distance: only active transitions + brief natural settle for the final card
              end: () => `+=${totalTransitions * scrollDistancePerCard + settleDistance}`,
              pin: true,
              pinSpacing: true,
              scrub: true, // 1:1 direct sync with Lenis: every single subpixel of scroll immediately moves the cards
              anticipatePin: 0,
              invalidateOnRefresh: true,
            },
          });

          // Stacking sequence: cards advance sequentially, with each next card
          // attached directly to the bottom end of the previous one as it scrolls up
          for (let i = 1; i < activeCards.length; i++) {
            // All remaining cards (j >= i) move up by 100% together (connected end-to-end train)
            for (let j = i; j < activeCards.length; j++) {
              const movingCard = activeCards[j];
              const targetYPercent = (j - i) * 100;

              tl.to(
                movingCard,
                {
                  yPercent: targetYPercent,
                  ease: 'none',
                  duration: 1,
                  force3D: true,
                },
                j === i ? undefined : '<' // sync all moving cards in this step
              );
            }

            // Simultaneously hide the header as the FIRST card swap happens
            if (i === 1 && headerRef.current) {
              tl.to(
                headerRef.current,
                {
                  yPercent: -120,
                  opacity: 0,
                  ease: 'none',
                  duration: 0.6,
                  force3D: true,
                },
                '<' // sync with the card swap start
              );
            }

            // All previously entered cards step up and scale down slightly
            for (let k = 0; k < i; k++) {
              const prevCard = activeCards[k];
              const stepsBehind = i - k;
              const targetY = stepsBehind * stepY;
              const targetScale = Math.max(0.84, 1 - stepsBehind * scaleStep);

              tl.to(
                prevCard,
                {
                  y: targetY,
                  scale: targetScale,
                  ease: 'none',
                  duration: 1,
                  force3D: true,
                },
                '<' // run simultaneously with incoming card
              );
            }
          }

          // Brief, natural settle for the final card before smooth unpinning into next section
          tl.to({}, { duration: 0.2 });
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [cards]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="stacked-cards-section relative z-20 scroll-mt-20 selection:bg-amber-400 selection:text-slate-950"
    >
      {/* Anchor for Why Us navigation */}
      <div id="why-us" className="absolute top-0 left-0 pointer-events-none" />

      {/* Top Header — slides up & fades out when the second card enters */}
      <div ref={headerRef} className="stacked-cards-header max-w-3xl mx-auto text-center px-4">
        {sectionBadge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 shadow-sm text-xs font-mono uppercase tracking-widest text-amber-400 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>{sectionBadge}</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </div>
        )}
        <h2 className="font-headline text-2xl sm:text-3xl md:text-[30px] font-extrabold text-slate-900 tracking-tight leading-tight">
          {sectionTitle}
        </h2>
      </div>

      {/* Stacked Cards Frame */}
      <div ref={containerRef} className="stacked-cards-container">
        {cards.map((card, index) => {
          const theme = card.theme;
          return (
            <article
              key={card.id || index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`stacked-card ${theme.cardBg} ${theme.textColor} border ${theme.borderColor} p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-7 items-stretch justify-between`}
            >
              {/* Left Column: Visual Media Display */}
              <div className="w-full md:w-[46%] lg:w-[45%] flex-shrink-0 h-[200px] sm:h-[240px] md:h-full relative rounded-2xl md:rounded-[22px] overflow-hidden bg-slate-950 shadow-inner group">
                <img
                  src={card.image}
                  alt={card.imageAlt || card.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Status Badge overlay on image */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                  <span className="text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white border border-white/20">
                    SERVICE #{card.stepNumber}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-slate-950/85 px-2.5 py-0.5 rounded-full border border-amber-400/30 backdrop-blur-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Production Ready
                  </span>
                </div>
              </div>

              {/* Right Column: Card Content & Actions */}
              <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                {/* Header Information */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <span
                      className={`text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${theme.badgeBg}`}
                    >
                      {card.badge}
                    </span>
                    <span className="text-xs sm:text-sm font-mono opacity-60">
                      {card.stepNumber} / 0{cards.length}
                    </span>
                  </div>

                  <h3 className="font-headline text-lg sm:text-xl md:text-2xl lg:text-[26px] xl:text-[28px] font-extrabold tracking-tight leading-snug">
                    {card.title}
                  </h3>

                  <p
                    className={`font-body text-xs sm:text-sm leading-relaxed mt-1.5 ${theme.descriptionColor}`}
                  >
                    {card.description}
                  </p>
                </div>

                {/* 3 Key Spec Pills (Exact match to reference video) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 my-2.5 sm:my-3">
                  {card.metrics.map((metric, mIdx) => {
                    const Icon = metric.icon;
                    return (
                      <div
                        key={mIdx}
                        className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border flex flex-col justify-center ${theme.pillBg}`}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${theme.pillIconColor}`} />
                          <span className="font-extrabold text-xs sm:text-sm lg:text-base truncate">
                            {metric.value}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] sm:text-xs font-semibold truncate ${theme.pillLabelColor}`}
                        >
                          {metric.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Value & Action Row */}
                <div className="pt-2.5 sm:pt-3 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <span
                      className={`text-[11px] sm:text-xs uppercase tracking-wider block font-semibold ${theme.pillLabelColor}`}
                    >
                      {theme.footerLabel}
                    </span>
                    <span className="font-extrabold text-sm sm:text-base lg:text-lg tracking-tight">
                      {theme.footerValue}
                    </span>
                  </div>

                  <a
                    href={card.ctaLink || '/contact'}
                    onClick={(e) => {
                      if (onCardClick) {
                        e.preventDefault();
                        onCardClick(card);
                      } else if (navigate && card.ctaLink) {
                        e.preventDefault();
                        navigate(card.ctaLink);
                      }
                    }}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm hover:scale-[1.03] active:scale-[0.98] ${theme.ctaBg}`}
                  >
                    <span>{card.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
