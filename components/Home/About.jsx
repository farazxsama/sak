'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const giantX = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      ref={sectionRef}
      data-home-chapter="about"
      className="relative w-full min-h-screen home-section-light py-32 sm:py-44 overflow-hidden z-10 border-t border-[#E2DBCE]/60"
    >
      {/* Complete background sentence visible in one go without missing any word - Distinct Animation 1: Floating 3D Wave */}
      <div className="absolute inset-x-0 top-[6%] pointer-events-none select-none z-0 overflow-hidden px-2">
        <div className="home-bg-banner-line home-anim-wave">
          <span className="home-bg-text-full home-bg-size-lg bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 bg-clip-text text-transparent opacity-90 tracking-wider">
            CIVIL &bull; ARCHITECTURE &bull; STRUCTURE
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[8%] pointer-events-none select-none z-0 overflow-hidden px-2">
        <div className="home-bg-banner-line home-anim-wave" style={{ animationDelay: '-4.5s' }}>
          <span className="home-bg-text-full home-bg-size-lg bg-gradient-to-r from-[#1C1917] via-slate-800 to-blue-800 bg-clip-text text-transparent opacity-85 tracking-wider">
            STRUCTURAL ENGINEERING &bull; DESIGN
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left: Editorial discipline marker */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col justify-center"
          >
            {/* Fully visible, unclipped STRUCTURE badge and heading */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/40 backdrop-blur-md px-4 py-1.5 shadow-sm mb-3">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-blue-800">
                  Core Discipline
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1C1917] leading-tight">
                STRUCTURE
              </h3>
              <p className="text-xs text-slate-500 font-mono tracking-wider uppercase mt-1">
                Civil & Structural Systems
              </p>
            </div>

            {/* Editorial facts strip */}
            <div className="space-y-6">
              {[
                { label: 'Discipline', value: 'Civil · Arch · Mech' },
                { label: 'Founded', value: '2020' },
                { label: 'Location', value: 'India' },
              ].map(item => (
                <div key={item.label} className="flex items-baseline justify-between border-b border-[#E2DBCE]/60 pb-4">
                  <span className="home-editorial-tag text-slate-500">{item.label}</span>
                  <span className="text-sm font-semibold text-[#1C1917]">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: HUD Copy */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 home-content-panel rounded-2xl p-8 sm:p-14 shadow-xl"
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-[#2563EB]" />
              <span className="home-editorial-tag text-[#2563EB]">About SAK</span>
            </div>

            <h2 className="home-h2 text-[#1C1917] mb-7">
              Engineering solutions built around precision, functionality and design.
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-[#57534E] font-light max-w-2xl">
              SAK brings together civil, architectural and mechanical expertise
              under one roof — delivering projects that hold up structurally
              and read beautifully, from first sketch to final handover.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 border border-white/70 bg-white/35 backdrop-blur-md px-5 py-3.5 rounded-xl shadow-sm">
                <FiCheckCircle className="text-[#2563EB] shrink-0" size={17} />
                <span className="text-sm font-medium text-[#1C1917]">End-to-End Execution</span>
              </div>
              <div className="flex items-center gap-3 border border-white/70 bg-white/35 backdrop-blur-md px-5 py-3.5 rounded-xl shadow-sm">
                <FiCheckCircle className="text-[#2563EB] shrink-0" size={17} />
                <span className="text-sm font-medium text-[#1C1917]">Multi-Discipline Precision</span>
              </div>
            </div>

            <Link
              href="/about"
              className="group mt-12 inline-flex items-center gap-3 text-base font-semibold text-slate-900 border-b-2 border-[#2563EB] pb-0.5 w-fit hover:text-[#2563EB] transition-colors"
            >
              Discover More
              <FiArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}