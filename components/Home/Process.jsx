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
  const giantX = useTransform(scrollYProgress, [0, 1], ['-8%', '4%']);
  const lineScale = useTransform(scrollYProgress, [0.08, 0.92], [0, 1]);

  return (
    <section
      ref={sectionRef}
      data-home-chapter="process"
      className="relative w-full home-section-light py-32 sm:py-44 overflow-hidden z-10 border-t border-[#E2DBCE]/60"
    >
      {/* Complete background sentence visible in one go - Distinct Animation 5: Rhythmic Accordion Letter Expansion */}
      <div className="absolute inset-x-0 top-[6%] pointer-events-none select-none z-0 overflow-hidden px-2">
        <div className="home-bg-banner-line home-anim-accordion-bounded">
          <span className="home-bg-text-full home-bg-size-md sm:home-bg-size-lg bg-gradient-to-r from-teal-700 via-cyan-700 to-blue-700 bg-clip-text text-transparent opacity-90 tracking-wide">
            PROCESS &bull; WORKFLOW &bull; PRECISION
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 xl:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 sm:mb-32 max-w-3xl home-content-panel rounded-2xl p-8 sm:p-12 shadow-xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#2563EB]" />
            <span className="home-editorial-tag text-[#2563EB]">Our Process</span>
          </div>
          <h2 className="home-h2 text-[#1C1917]">
            A structured process that removes surprises and keeps projects on time.
          </h2>
        </motion.div>

        {/* Engineering pipeline layout */}
        <div className="relative max-w-4xl">
          {/* Vertical gradient pipeline */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[30px] sm:left-[34px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#2563EB] via-sky-400 to-[#0284C7] origin-top hidden sm:block"
          />

          <div className="flex flex-col gap-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.09 }}
                className="relative flex gap-8 sm:gap-12 py-10 border-b border-[#E2DBCE]/60 last:border-b-0 home-content-panel rounded-2xl mb-4 p-7 sm:p-10 shadow-lg"
              >
                {/* Step number — editorial oversized */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <span
                    className="text-4xl sm:text-5xl font-mono font-extrabold leading-none"
                    style={{ color: '#2563EB', opacity: 0.35 }}
                  >
                    {step.number}
                  </span>
                  {/* Pipeline dot */}
                  <div className="h-3 w-3 rounded-full border-2 border-[#2563EB] bg-white/90 hidden sm:block shadow-sm" />
                </div>

                <div className="pt-1">
                  <div className="mb-1 home-editorial-tag text-[#2563EB]/80">
                    Step {step.number}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#57534E] font-light max-w-md">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}