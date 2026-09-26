import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from '../context/RouterContext';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const router = useRouter?.() || {};
  const currentPath = router.currentPath;

  useEffect(() => {
    // Initialize Lenis with responsive lerp momentum (eliminates deadband on small scrolls)
    const lenis = new Lenis({
      lerp: 0.08, // Ultra-smooth linear interpolation: immediate response to micro-scrolls
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Calibrated wheel sensitivity for natural, controlled speed
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Run Lenis through GSAP ticker for frame-locked synchronization
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
      delete window.lenis;
    };
  }, []);

  // Reset scroll to top on route change & refresh ScrollTrigger
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  }, [currentPath]);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}
