'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiCompass, FiCpu, FiLayers } from 'react-icons/fi';

const civilServices = [
  'Building & Infrastructure',
  'RCC Structural Design',
  'Steel Structural Design',
  'BIM & Site Layouts',
  '3D Elevation & Interior Design',
];

const mechanicalServices = [
  'Industrial Equipment Design',
  'Automobile Design',
  'Manufacturing Drawings',
  'Analysis & Simulation',
  'REVIT MEP Design',
];

export default function Services() {
  const containerRef = useRef(null);
  const civilRef = useRef(null);
  const mechRef = useRef(null);
  const integRef = useRef(null);

  const { scrollYProgress: civilProgress } = useScroll({
    target: civilRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: mechProgress } = useScroll({
    target: mechRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: integProgress } = useScroll({
    target: integRef,
    offset: ['start end', 'end start'],
  });

  const civilY = useTransform(civilProgress, [0, 1], [30, -30]);
  const civilOpacity = useTransform(civilProgress, [0.08, 0.25, 0.75, 0.92], [0, 1, 1, 0]);

  const mechY = useTransform(mechProgress, [0, 1], [30, -30]);
  const mechOpacity = useTransform(mechProgress, [0.08, 0.25, 0.75, 0.92], [0, 1, 1, 0]);

  const integY = useTransform(integProgress, [0, 1], [30, -30]);
  const integOpacity = useTransform(integProgress, [0.08, 0.25, 0.75, 0.92], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative w-full z-10">
      {/* ── CHAPTER 03: Civil & Structural Engineering ───────────────────────── */}
      <section
        ref={civilRef}
        data-home-chapter="services-civil"
        className="relative w-full min-h-[115vh] flex items-center pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden"
      >
        <div className="relative z-10 mx-auto max-w-[1540px] px-6 lg:px-12 xl:px-16 w-full">
          <motion.div
            style={{ y: civilY, opacity: civilOpacity }}
            className="max-w-2xl bg-[#FFFDF8]/85 backdrop-blur-xl border border-[#D8C08A]/40 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(41,39,34,0.06)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#C6A15B] animate-pulse" />
              <span className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-[#9F7B35]">
                SCENE 03 // CIVIL & STRUCTURAL ENGINEERING
              </span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <FiCompass className="text-[#9F7B35]" size={24} />
              <span className="font-mono text-xs uppercase tracking-widest text-[#77736B] font-semibold">
                Structural Framework
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#292722] leading-[1.12] mb-6">
              Civil &amp; Architectural Services
            </h2>

            <p className="text-sm sm:text-base text-[#77736B] font-medium leading-relaxed mb-6">
              The physical skeleton beneath the architectural skin. Precision structural engineering designed for permanence, safety, and architectural elegance.
            </p>

            <ul className="space-y-3 mb-8">
              {civilServices.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#292722] font-semibold text-sm sm:text-base">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C6A15B]" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/services/civil-architectural"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#292722] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#C6A15B] hover:text-[#292722] transition-all duration-200"
            >
              Explore Civil Solutions
              <FiArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CHAPTER 04: Mechanical Systems & MEP ─────────────────────────────── */}
      <section
        ref={mechRef}
        data-home-chapter="services-mechanical"
        className="relative w-full min-h-[115vh] flex items-center justify-end pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden"
      >
        <div className="relative z-10 mx-auto max-w-[1540px] px-6 lg:px-12 xl:px-16 w-full flex justify-end">
          <motion.div
            style={{ y: mechY, opacity: mechOpacity }}
            className="max-w-2xl bg-[#FFFDF8]/85 backdrop-blur-xl border border-[#D8C08A]/40 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(41,39,34,0.06)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#C6A15B] animate-pulse" />
              <span className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-[#9F7B35]">
                SCENE 04 // MECHANICAL ENGINEERING &amp; MEP
              </span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <FiCpu className="text-[#9F7B35]" size={24} />
              <span className="font-mono text-xs uppercase tracking-widest text-[#77736B] font-semibold">
                Building Anatomy &amp; Systems
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#292722] leading-[1.12] mb-6">
              Mechanical Engineering Services
            </h2>

            <p className="text-sm sm:text-base text-[#77736B] font-medium leading-relaxed mb-6">
              The internal circulatory arteries that give life to architecture. High-efficiency HVAC, process piping, electrical infrastructure, and industrial mechanical systems.
            </p>

            <ul className="space-y-3 mb-8">
              {mechanicalServices.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#292722] font-semibold text-sm sm:text-base">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C6A15B]" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/services/mechanical-engineering"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#292722] px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#C6A15B] hover:text-[#292722] transition-all duration-200"
            >
              Explore Mechanical Solutions
              <FiArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CHAPTER 05: The Synthesis Climax (Integrated Engineering) ───────── */}
      <section
        ref={integRef}
        data-home-chapter="services-integration"
        className="relative w-full min-h-[115vh] flex items-center pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden"
      >
        <div className="relative z-10 mx-auto max-w-[1540px] px-6 lg:px-12 xl:px-16 w-full">
          <motion.div
            style={{ y: integY, opacity: integOpacity }}
            className="max-w-2xl bg-[#FFFDF8]/85 backdrop-blur-xl border border-[#D8C08A]/40 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(41,39,34,0.06)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#C6A15B] animate-pulse" />
              <span className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-[#9F7B35]">
                SCENE 05 // THE INTEGRATION CLIMAX
              </span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <FiLayers className="text-[#9F7B35]" size={24} />
              <span className="font-mono text-xs uppercase tracking-widest text-[#77736B] font-semibold">
                Multi-Disciplinary Synthesis
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#292722] leading-[1.12] mb-6">
              Civil · Architecture · Mechanical
            </h2>

            <p className="text-base sm:text-lg text-[#77736B] font-medium leading-relaxed mb-6">
              When structural integrity, architectural form, and mechanical precision synchronize seamlessly, buildings don&apos;t just stand — they perform at their highest potential.
            </p>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F6F1E7]/80 border border-[#D8C08A]/40 mb-8 font-mono text-xs text-center font-bold text-[#292722]">
              <div className="p-2 bg-[#FFFDF8] rounded-lg shadow-xs border border-[#D8C08A]/20">CIVIL</div>
              <div className="p-2 bg-[#FFFDF8] rounded-lg shadow-xs border border-[#D8C08A]/20">ARCHITECTURE</div>
              <div className="p-2 bg-[#FFFDF8] rounded-lg shadow-xs border border-[#D8C08A]/20">MECHANICAL</div>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#C6A15B] hover:bg-[#B8934D] px-7 py-3.5 text-xs sm:text-sm font-bold text-[#292722] shadow-[0_8px_24px_rgba(198,161,91,0.28)] hover:shadow-[0_12px_32px_rgba(198,161,91,0.45)] hover:scale-[1.03] transition-all duration-200"
            >
              Discover Integrated Delivery
              <FiArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}