import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Exact cursor coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Responsive fluid trailing spring with minimal delay
  const springConfig = { damping: 24, stiffness: 240, mass: 0.45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Detect hover over clickable / interactive elements
      const target = e.target;
      const isClickable = Boolean(
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer')
      );
      setIsHovered(isClickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
      {/* Outer Fluid Trailing Ring with Snappy Responsive Follow */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          opacity: isHovered ? 0.85 : 0.4,
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className={`absolute top-0 left-0 w-9 h-9 rounded-full border transition-colors duration-200 pointer-events-none ${
          isHovered
            ? 'border-amber-500 bg-amber-400/20 shadow-[0_0_24px_rgba(245,158,11,0.35)]'
            : 'border-slate-800/35 bg-slate-400/10 shadow-[0_0_12px_rgba(0,0,0,0.03)]'
        }`}
      />

      {/* Inner Precision Black Dot (Increased Size & Prominence) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.6 : 1,
          opacity: isHovered ? 0.9 : 0.85,
        }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
        className={`absolute top-0 left-0 w-2.5 h-2.5 rounded-full transition-colors duration-200 pointer-events-none shadow-xs ${
          isHovered ? 'bg-amber-500' : 'bg-slate-900'
        }`}
      />
    </div>
  );
}
