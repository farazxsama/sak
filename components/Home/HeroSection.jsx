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
  const rawY = useTransform(scrollY, [0, 800], [0, 80]);
  const opacityTransform = useTransform(scrollY, [0, 500], [1, 0]);
  const smoothY = useSpring(rawY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const h = (e) => setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 16,
      y: (e.clientY / window.innerHeight - 0.5) * 16,
    });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const d = introComplete ? 0 : 5.2;

  return (
    <section
      ref={containerRef}
      data-home-chapter="hero"
      className="relative min-h-[100vh] w-full overflow-hidden bg-transparent text-[#1F2937] flex items-end z-10"
    >
      {/* Subtle bottom gradient scrim to ensure clean text contrast without blocking the 3D scene */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6F0]/95 via-[#F9F6F0]/35 to-transparent pointer-events-none z-0" />

      <motion.div
        style={{ y: smoothY, opacity: opacityTransform }}
        className="relative z-10 w-full min-h-[100vh] flex flex-col justify-end pb-8 sm:pb-12 pt-32 px-6 lg:px-12 xl:px-16"
      >
        {/* ── Cinematic title card container ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-[1540px] mx-auto items-end">

          {/* Left: Cinematic Title & Discipline Pill */}
          <div className="lg:col-span-7 xl:col-span-8">

            {/* Discipline Tag Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: d }}
              className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-amber-950/15 bg-[#FBF9F5]/95 px-4 py-1.5 shadow-md backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
              </span>
              <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-slate-900">
                01 / Civil · Architecture · Mechanical
              </span>
            </motion.div>

            {/* Main Headline — Architectural Film Title Card Style */}
            <motion.h1
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              animate={{
                opacity: introComplete ? 1 : 0,
                y: introComplete ? 0 : 25,
                filter: introComplete ? 'blur(0px)' : 'blur(8px)',
              }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: d + 0.12 }}
              style={{ transform: `translate(${mousePos.x * 0.015}px, ${mousePos.y * 0.015}px)` }}
              className="text-left font-black tracking-tight leading-[1.08] text-3xl sm:text-5xl lg:text-6xl"
            >
              <span className="block text-[#0F172A]">
                Engineering ideas.
              </span>
              <span className="block bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                Built with precision.
              </span>
            </motion.h1>
          </div>

          {/* Right: Subtitle & Action CTAs */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-start lg:items-end lg:text-right">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 15 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: d + 0.32 }}
              className="max-w-md text-sm sm:text-base text-slate-700 leading-relaxed font-medium lg:ml-auto"
            >
              Comprehensive civil, architectural and mechanical engineering
              solutions for modern projects — from concept through construction.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 15 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: d + 0.48 }}
              className="mt-6 flex flex-wrap items-center gap-3 lg:justify-end"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:from-blue-800 hover:to-indigo-700 shadow-[0_8px_25px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.45)] hover:scale-[1.02] transition-all"
              >
                Explore Projects
                <FiArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/75 bg-white/45 px-6 py-3 text-xs sm:text-sm font-bold text-stone-900 backdrop-blur-md hover:border-blue-500/60 hover:bg-white/80 hover:scale-[1.02] transition-all shadow-sm"
              >
                Our Services
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom discipline status bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 16 }}
          transition={{ duration: 0.9, delay: d + 0.62 }}
          className="mt-8 lg:mt-10 w-full max-w-[1540px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl border border-white/75 bg-white/20 overflow-hidden shadow-xl backdrop-blur-xl"
        >
          {[
            { icon: <FiCompass size={14} />, label: 'Civil & Structural', sub: 'RCC & Steel Precision', color: '#1d4ed8' },
            { icon: <FiLayers size={14} />, label: 'Architectural BIM', sub: '3D Elevation & Layouts', color: '#0891b2' },
            { icon: <FiCpu size={14} />, label: 'Mechanical MEP', sub: 'Plant & Revit MEP', color: '#d97706' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-0.5 px-6 py-3.5 bg-white/40 backdrop-blur-xl"
            >
              <div
                className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider font-bold"
                style={{ color: item.color }}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
              <span className="text-xs text-stone-600 font-medium">{item.sub}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introComplete ? 0.75 : 0 }}
          transition={{ delay: d + 0.8 }}
          className="mt-5 flex items-center gap-3"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
            Scroll to explore construction site
          </span>
          <div className="h-4 w-2.5 rounded-full border border-slate-400 flex justify-center pt-0.5">
            <div className="h-1 w-0.5 rounded-full bg-[#2563EB] animate-bounce" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}