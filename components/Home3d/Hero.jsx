'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // ── Text: fades + moves down early in scroll ──────────────────
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [0.80, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.25], [0, 40]);

  // ── Building: rises + zooms + fades ───────────────────────────
  const buildingY       = useTransform(scrollYProgress, [0.1, 0.75], ['0%', '-22%']);
  const buildingScale   = useTransform(scrollYProgress, [0.1, 0.75], [1, 1.32]);
  const buildingOpacity = useTransform(scrollYProgress, [0.45, 0.80], [1, 0]);

  // ── Clouds: rise with building ─────────────────────────────────
  const cloudY = useTransform(scrollYProgress, [0.1, 0.75], ['0%', '-18%']);

  return (
    <div ref={heroRef} className="relative h-[220vh]">

      {/* ── Sticky viewport ── overflow-hidden clips horizontal bleed from scale/translate ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Z-0 — Sky background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/img/3d-image/hero.png"
            alt="Sky"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Z-20 — Hero text */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-x-0 -top-16 sm:-top-26 z-20 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="text-5xl font-bold leading-[1.1] tracking-tight text-[#11161A] sm:text-6xl lg:text-7xl"
          >
          SAK ENGINEERING & ARCHITECT
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="mt-2 max-w-md text-[15px] leading-relaxed text-[#11161A]/70"
          >
            Multidisciplinary engineering and architectural solutions for buildings, infrastructure, industrial projects and the built environment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="mt-2"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-[#11161A] bg-[#11161A] px-7 py-3 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-transparent hover:text-[#11161A]"
            >
              Explore Projects
              <FiArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Z-10 — Building */}
        <motion.div
          style={{
            y: buildingY,
            scale: buildingScale,
            opacity: buildingOpacity,
          }}
          className="absolute inset-x-0 bottom-[0%] sm:bottom-[-20%] z-10 flex items-end justify-center"
        >
          <img
            src="/img/3d-image/building.png"
            alt="Building"
            className="w-[72%] max-w-4xl object-contain sm:w-[60%] lg:w-[52%]"
          />
        </motion.div>

        {/* Z-30 — Foreground cloud */}
        <motion.div
          style={{ y: cloudY }}
          className="absolute inset-x-0 bottom-[-10%] sm:bottom-[-45%] z-30 pointer-events-none"
        >
          <img
            src="/img/3d-image/cloud-fafaf9.png"
            alt=""
            aria-hidden="true"
            className="w-full object-cover object-top"
          />
        </motion.div>

      </div>
    </div>
  );
}