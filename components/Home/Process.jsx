'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Consultation Call',
    description:
      'A quick, no-strings-attached call to understand your project requirements and see if we\'re the right fit.',
  },
  {
    number: '02',
    title: 'Discovery & Site Visit',
    description:
      'A deeper conversation on scope, budget and timeline, along with a site visit and requirement documentation.',
  },
  {
    number: '03',
    title: 'Contract & Advance',
    description:
      'Once we\'re aligned, we finalize the scope, sign the contract, and get started with the advance payment.',
  },
  {
    number: '04',
    title: 'Design & Delivery',
    description:
      'From concept to GFC drawings, we take your project through each design phase, keeping you involved at every step.',
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0.08, 0.22, 0.78, 0.92], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      data-home-chapter="process"
      className="relative w-full min-h-[115vh] flex items-center pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden z-10"
    >
      <div className="relative z-10 mx-auto max-w-[1540px] px-6 lg:px-12 xl:px-16 w-full">
        <motion.div
          style={{ y: cardY, opacity }}
          className="max-w-5xl mx-auto bg-[#FFFDF8]/85 backdrop-blur-xl border border-[#D8C08A]/40 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[0_25px_50px_rgba(41,39,34,0.06)]"
        >
          {/* Film Scene Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-2 w-2 rounded-full bg-[#C6A15B] animate-pulse" />
            <span className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-[#9F7B35]">
              SCENE 10 // THE ENGINEERING PROCESS &amp; STUDIO WORKFLOW
            </span>
          </div>

          <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#77736B] font-semibold mb-3">
            Execution Roadmap
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#292722] leading-[1.12] mb-12">
            From First Sketch to Final Handover
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative flex flex-col p-6 rounded-2xl bg-[#F6F1E7]/70 border border-[#D8C08A]/30 shadow-xs"
              >
                <span className="font-mono text-xs font-bold tracking-widest text-[#9F7B35] mb-3">
                  PHASE {step.number}
                </span>
                <h3 className="text-lg font-bold text-[#292722] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#77736B] leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}