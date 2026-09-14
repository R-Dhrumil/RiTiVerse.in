import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Layers, 
  Briefcase, 
  Tag, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Link, useRouter } from '../context/RouterContext';

export default function MobileBottomNav() {
  const { currentPath, navigate } = useRouter();

  const mobileTabs = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: Layers },
    { name: 'Quote', path: '/contact', icon: Sparkles, isCenterCta: true },
    { name: 'Work', path: '/portfolio', icon: Briefcase },
    { name: 'Blog', path: '/blog', icon: BookOpen },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface/95 backdrop-blur-xl border-t border-surface-container-high rounded-t-2xl rounded-b-none shadow-2xl">
      {/* Edge-to-Edge Navigation Bar */}
      <nav 
        className="max-w-md mx-auto px-3 py-2 flex items-center justify-around relative"
        aria-label="Mobile Navigation Dock"
      >
        {mobileTabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = currentPath === tab.path || (tab.path !== '/' && currentPath.startsWith(tab.path));

          if (tab.isCenterCta) {
            return (
              <Link
                key={tab.name}
                to={tab.path}
                onClick={() => navigate(tab.path)}
                className="relative -mt-6 flex flex-col items-center group z-20"
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className={`w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-xl border-4 border-background transition-all ${
                    isActive
                      ? 'bg-accent-warm text-text-main ring-4 ring-accent-warm/30'
                      : 'bg-text-main text-surface'
                  }`}
                >
                  <IconComponent className="w-5 h-5 animate-pulse text-amber-300" />
                </motion.div>
                <span className={`text-xs font-label-md font-bold mt-1 tracking-tight ${
                  isActive ? 'text-accent-warm font-extrabold' : 'text-text-muted'
                }`}>
                  {tab.name}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.name}
              to={tab.path}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center justify-center pt-2.5 pb-1.5 px-3.5 rounded-xl transition-all group min-w-[62px]"
            >
              {/* Top Active Indicator Line (Flush at top border of the bottombar) */}
              {isActive && (
                <motion.div
                  layoutId="activeMobileTopLine"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-accent-warm rounded-full shadow-sm z-30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              {/* Active Item Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="activeMobilePill"
                  className="absolute inset-0 bg-surface-container-low border border-outline-variant/60 rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Tab Icon and Label */}
              <motion.div
                whileTap={{ scale: 0.88 }}
                className={`relative z-10 flex flex-col items-center justify-center transition-colors ${
                  isActive ? 'text-accent-warm' : 'text-text-muted group-hover:text-text-main'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className={`text-xs font-label-md mt-1 transition-colors ${
                  isActive ? 'font-bold text-text-main' : 'font-medium text-text-muted'
                }`}>
                  {tab.name}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
