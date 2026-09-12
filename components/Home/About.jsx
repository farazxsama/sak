'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      data-home-chapter="about"
      className="relative w-full min-h-[110vh] flex items-center pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden z-10"
    >
      <div className="relative z-10 mx-auto max-w-[1540px] px-6 lg:px-12 xl:px-16 w-full">
        <motion.div
          style={{ y: cardY, opacity }}
          className="max-w-2xl bg-[#FFFDF8]/85 backdrop-blur-xl border border-[#D8C08A]/40 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(41,39,34,0.06)]"
        >
          {/* Film Scene Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-2 w-2 rounded-full bg-[#C6A15B] animate-pulse" />
            <span className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-[#9F7B35]">
              SCENE 02 // ARCHITECTURAL PHILOSOPHY
            </span>
          </div>

          <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#77736B] font-semibold mb-3">
            About SAK
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#292722] leading-[1.12] mb-6">
            Engineering solutions built around precision, functionality and design.
          </h2>

          <p className="text-base sm:text-lg text-[#77736B] leading-relaxed font-medium mb-8">
            SAK brings together civil, architectural and mechanical expertise under one roof — delivering projects that hold up structurally and read beautifully, from first sketch to final handover.
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#292722] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#C6A15B] hover:text-[#292722] transition-all duration-200"
          >
            Discover More
            <FiArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}