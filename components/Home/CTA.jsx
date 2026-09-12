'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function CTA() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [30, -10]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section
      ref={sectionRef}
      data-home-chapter="cta"
      className="relative w-full min-h-[90vh] flex items-center py-28 sm:py-40 overflow-hidden z-10"
    >
      <div className="relative z-10 mx-auto max-w-[1540px] px-6 lg:px-12 xl:px-16 w-full">
        <motion.div
          style={{ y: cardY, opacity }}
          className="max-w-4xl mx-auto bg-[#FFFDF8]/85 backdrop-blur-2xl border border-[#D8C08A]/40 rounded-3xl p-8 sm:p-14 lg:p-16 shadow-[0_30px_70px_rgba(41,39,34,0.06)] text-center"
        >
          {/* Film Scene Label */}
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-[#F6F1E7]/80 border border-[#D8C08A]/30">
            <span className="h-2 w-2 rounded-full bg-[#C6A15B] animate-pulse" />
            <span className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-[#9F7B35]">
              SCENE 11 // THE FINAL VISION &bull; GET STARTED
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#292722] leading-[1.08] mb-6">
            Ready to build your next project?
          </h2>

          <p className="text-base sm:text-lg text-[#77736B] font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Let&apos;s discuss your engineering and design requirements.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#C6A15B] hover:bg-[#B8934D] px-8 py-4 text-xs sm:text-sm font-bold text-[#292722] shadow-[0_8px_24px_rgba(198,161,91,0.28)] hover:scale-105 transition-all duration-200"
            >
              Get in Touch
              <FiArrowRight size={16} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#FFFDF8] px-8 py-4 text-xs sm:text-sm font-bold text-[#292722] border border-[#D8C08A]/60 shadow-xs hover:bg-white transition-colors"
            >
              Explore All Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}