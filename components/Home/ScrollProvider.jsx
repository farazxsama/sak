'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollContext = createContext({
  scrollProgress: 0,
  introComplete: false,
  setIntroComplete: () => {},
});

export function useHomeScroll() {
  return useContext(ScrollContext);
}

export default function ScrollProvider({ children }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [introComplete, setIntroComplete] = useState(false);
  const lenisRef = useRef(null);

  // Safety: never leave hero copy permanently hidden if 3D intro fails
  useEffect(() => {
    const fallback = setTimeout(() => setIntroComplete(true), 5000);
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const masterTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      scroller: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        document.documentElement.style.setProperty(
          '--home-scroll',
          String(self.progress)
        );
      },
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', onRefresh);
    ScrollTrigger.refresh();

    return () => {
      masterTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        scrollProgress,
        introComplete,
        setIntroComplete,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
