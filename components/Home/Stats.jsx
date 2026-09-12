'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const stats = [
  { value: 4,   suffix: '+',     prefix: '',  label: 'Years of Experience',         giant: '4+' },
  { value: 200, suffix: '+',     prefix: '',  label: 'Projects Completed',          giant: '200+' },
  { value: 660, suffix: ' Cr+',  prefix: '₹', label: 'Total Project Value Delivered', giant: '₹660 Cr+' },
];

function Counter({ value, prefix, suffix, duration = 1.8 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = null;
    let frameId;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums font-mono">
      {prefix}{display}{suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const giantX = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={sectionRef}
      data-home-chapter="stats"
      className="relative w-full home-section-dark py-32 sm:py-44 overflow-hidden z-10 border-t border-[#E2DBCE]/60"
    >
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 xl:px-16">
        {/* Section label & heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#2563EB]" />
            <span className="home-editorial-tag text-[#2563EB]">By The Numbers</span>
          </div>

          <div className="home-anim-swell-bounded inline-block">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight bg-gradient-to-r from-violet-700 via-indigo-700 to-sky-600 bg-clip-text text-transparent drop-shadow-sm">
              PROVEN SCALE &bull; DELIVERED IMPACT
            </h2>
          </div>
        </motion.div>

        {/* Stats grid — editorial numerals with transparent glassmorphism */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className="relative flex flex-col items-start home-content-panel rounded-2xl p-8 sm:p-10 lg:p-12 overflow-hidden"
            >
              {/* Dim chapter number */}
              <span className="home-editorial-tag text-[#2563EB]/60 mb-5 text-[10px] sm:text-[11px] tracking-[0.2em]">
                {String(index + 1).padStart(2, '0')} ──
              </span>

              {/* Giant editorial number (30% smaller) */}
              <span className="home-stat-giant bg-gradient-to-br from-[#1F2937] via-[#2563EB] to-[#0284C7] bg-clip-text text-transparent block leading-none">
                {stat.giant}
              </span>

              {/* Counter (for screen readers, hidden visually for desktop) */}
              <span className="sr-only">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </span>

              {/* Label */}
              <span className="mt-5 home-editorial-tag text-[#57534E] text-[10px] sm:text-[11px] tracking-[0.2em]">
                {stat.label}
              </span>

              {/* Thin bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#2563EB]/60 via-sky-400/30 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}