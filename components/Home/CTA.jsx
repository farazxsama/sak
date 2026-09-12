'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiSend } from 'react-icons/fi';

export default function CTA() {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });
  const buildX = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);
  const giantScale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  useEffect(() => {
    const h = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 22,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 22,
      });
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-home-chapter="cta"
      className="relative w-full min-h-[85vh] home-section-light overflow-hidden py-28 sm:py-40 z-10 flex items-center border-t border-[#E2DBCE]/60"
    >
      {/* Complete background sentence visible in one go - Distinct Animation 6: Monumental Elevation Rise */}
      <div className="absolute inset-x-0 top-[8%] pointer-events-none select-none z-0 overflow-hidden px-2">
        <div className="home-bg-banner-line home-anim-rise-bounded">
          <span className="home-bg-text-full home-bg-size-md sm:home-bg-size-lg bg-gradient-to-r from-blue-700 via-indigo-700 to-amber-600 bg-clip-text text-transparent opacity-90 tracking-wide">
            COLLABORATE &bull; BUILD &bull; DELIVER
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 xl:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end home-content-panel rounded-3xl p-8 sm:p-14 xl:p-20 shadow-2xl">

          {/* Left: CTA headline */}
          <div className="lg:col-span-7">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/75 bg-white/40 backdrop-blur-md px-5 py-2 shadow-sm">
              <span className="h-px w-4 bg-[#2563EB]" />
              <span className="home-editorial-tag text-[#2563EB]">Get Started</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold uppercase leading-[1.04] tracking-tight text-[#1C1917] max-w-4xl">
              Ready to build your next project?
            </h2>
          </div>

          {/* Right: Description + CTA */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end lg:text-right">
            <p className="text-base sm:text-lg font-light leading-relaxed text-[#57534E] max-w-sm lg:ml-auto">
              Let&apos;s discuss your engineering and design requirements.
            </p>

            <motion.div
              style={{ transform: `translate(${mousePos.x * 0.14}px, ${mousePos.y * 0.14}px)` }}
              className="mt-10"
            >
              <Link
                href="/contact"
                className="home-magnetic group inline-flex items-center gap-3 rounded-full bg-[#2563EB] px-10 py-5 text-base font-bold text-white hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.45)] transition-all"
              >
                <FiSend size={17} className="group-hover:-translate-y-0.5 transition-transform" />
                Get in Touch
                <FiArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Discipline disciplines confirmation strip */}
            <div className="mt-12 flex flex-wrap gap-2 lg:justify-end">
              {['Civil', 'Architecture', 'Mechanical'].map(d => (
                <span
                  key={d}
                  className="home-editorial-tag text-[#78716C] border border-white/70 rounded-full px-3 py-1 bg-white/35 backdrop-blur-md"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}