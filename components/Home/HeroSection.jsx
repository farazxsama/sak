'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiArrowRight, FiCompass, FiLayers, FiCpu } from 'react-icons/fi';
import { useHomeScroll } from './ScrollProvider';

export default function HeroSection() {
  const containerRef = useRef(null);
  const { introComplete } = useHomeScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  // Fade the hero overlay as user scrolls — building stays visible underneath
  const opacityTransform = useTransform(scrollY, [0, 460], [1, 0]);
  const smoothY = useSpring(
    useTransform(scrollY, [0, 600], [0, 48]),
    { stiffness: 55, damping: 16 }
  );

  useEffect(() => {
    const h = (e) => setMousePos({
      x: (e.clientX / window.innerWidth  - 0.5) * 10,
      y: (e.clientY / window.innerHeight - 0.5) * 10,
    });
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <section
      ref={containerRef}
      data-home-chapter="hero"
      /* Full viewport height — building shows in background via fixed canvas */
      className="relative min-h-[100vh] w-full overflow-hidden bg-transparent text-[#1F2937] z-10"
    >
      {/* ── Content overlay: positioned on the LEFT in cinematic negative space ── */}
      {/* This leaves the completed modern architectural building fully visible on the RIGHT. */}
      <motion.div
        style={{ y: smoothY, opacity: opacityTransform }}
        className="absolute inset-0 flex flex-col justify-center px-6 lg:px-16 xl:px-24 pointer-events-none"
      >
        <div className="w-full max-w-[1540px] mx-auto flex flex-col items-start">
          <div className="max-w-xl lg:max-w-2xl text-left pointer-events-auto flex flex-col items-start">

            {/* ── Top floating discipline badge ─────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: introComplete ? 1 : 0, x: introComplete ? 0 : -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="mb-5"
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#D8C08A]/40 bg-[#FFFDF8]/80 px-4 py-1.5 shadow-xs backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A15B] opacity-70" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6A15B]" />
                </span>
                <span className="text-[10px] font-mono tracking-[0.22em] uppercase font-bold text-[#292722]">
                  Civil · Architecture · Mechanical
                </span>
              </div>
            </motion.div>

            {/* ── Headline ──────────────────────────────────────────────── */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 28 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              style={{
                transform: `translate(${mousePos.x * 0.008}px, ${mousePos.y * 0.008}px)`,
              }}
              className="font-black tracking-tight leading-[1.04] text-[clamp(2.2rem,5.5vw,4.4rem)] mb-5"
            >
              <span
                className="block"
                style={{
                  color: '#292722',
                  textShadow: '0 1px 16px rgba(255,255,255,0.90), 0 0px 32px rgba(255,255,255,0.70)',
                }}
              >
                Engineering ideas.
              </span>
              <span
                className="block bg-gradient-to-r from-[#9F7B35] via-[#C6A15B] to-[#D8C08A] bg-clip-text text-transparent"
                style={{ filter: 'drop-shadow(0 2px 10px rgba(255,255,255,0.8))' }}
              >
                Built with precision.
              </span>
            </motion.h1>

            {/* ── Subtitle Description ──────────────────────────────────── */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 18 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.50 }}
              className="text-[0.92rem] sm:text-[1.05rem] leading-relaxed font-medium text-[#77736B] mb-8 max-w-lg bg-[#FFFDF8]/65 backdrop-blur-sm p-3 rounded-xl border border-[#D8C08A]/30"
              style={{
                textShadow: '0 1px 8px rgba(255,255,255,0.90)',
              }}
            >
              Comprehensive civil, architectural and mechanical engineering solutions
              for modern projects — from concept through construction.
            </motion.p>

            {/* ── Call to Action Buttons ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 16 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
              className="flex flex-wrap items-center gap-3.5 mb-8"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#C6A15B] hover:bg-[#B8934D] px-7 py-3.5 text-xs sm:text-sm font-bold text-[#292722] shadow-[0_8px_24px_rgba(198,161,91,0.28)] hover:shadow-[0_12px_32px_rgba(198,161,91,0.45)] hover:scale-[1.03] transition-all duration-200"
              >
                Explore Our Projects
                <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2.5 rounded-full border border-[#D8C08A]/60 bg-[#FFFDF8]/90 px-7 py-3.5 text-xs sm:text-sm font-bold text-[#292722] backdrop-blur-md hover:bg-white hover:border-[#C6A15B] hover:scale-[1.03] transition-all duration-200 shadow-sm"
              >
                Our Services
              </Link>
            </motion.div>

            {/* ── Minimal 3-Discipline Tag Row ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 12 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="flex flex-wrap items-center gap-2"
            >
              {[
                { icon: <FiCompass size={12} />, label: 'Civil & Structural', color: '#9F7B35' },
                { icon: <FiLayers  size={12} />, label: 'Architectural BIM',  color: '#C6A15B' },
                { icon: <FiCpu     size={12} />, label: 'Mechanical MEP',     color: '#9F7B35' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8]/80 border border-[#D8C08A]/40 backdrop-blur-md shadow-xs"
                >
                  <span style={{ color: item.color }}>{item.icon}</span>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-bold text-[#292722]">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* ── Scroll indicator ───────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: introComplete ? 0.75 : 0 }}
              transition={{ delay: 1.0 }}
              className="mt-6 flex items-center gap-3"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#77736B] font-semibold">
                Scroll to travel through the 3D world
              </span>
              <div className="h-4 w-2.5 rounded-full border border-[#77736B]/60 flex justify-center pt-0.5">
                <div className="h-1 w-0.5 rounded-full bg-[#C6A15B] animate-bounce" />
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}