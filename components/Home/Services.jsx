'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiCompass, FiCpu } from 'react-icons/fi';

const services = [
  {
    number: '01',
    icon: FiCompass,
    giantWord: 'CIVIL',
    title: 'Civil & Architectural Services',
    items: [
      'Building & Infrastructure',
      'RCC Structural Design',
      'Steel Structural Design',
      'BIM & Site Layouts',
      '3D Elevation & Interior Design',
    ],
    href: '/services/civil-architectural',
    highlightTag: 'Structural & Spatial',
    accentColor: '#2563EB',
  },
  {
    number: '02',
    icon: FiCpu,
    giantWord: 'MECHANICAL',
    title: 'Mechanical Engineering Services',
    items: [
      'Industrial Equipment Design',
      'Automobile Design',
      'Manufacturing Drawings',
      'Analysis & Simulation',
      'REVIT MEP Design',
    ],
    href: '/services/mechanical-engineering',
    highlightTag: 'MEP & Equipment',
    accentColor: '#2563EB',
  },
];

function ServiceSequence({ service, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const wordX = useTransform(scrollYProgress, [0, 1],
    [index % 2 === 0 ? '-4%' : '4%', index % 2 === 0 ? '4%' : '-4%']);
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      data-home-chapter={`services-${index}`}
      className="relative min-h-screen flex items-center py-28 sm:py-36 overflow-hidden border-t border-[#E2DBCE]/60 home-section-light"
    >
      {/* Complete background sentence visible in one go - Distinct Animation 2: Mechanical Shimmer Stroke */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0 overflow-hidden px-2">
        <div
          className="home-bg-banner-line home-anim-piston-stroke-bounded"
          style={{ animationDirection: index % 2 === 0 ? 'normal' : 'reverse' }}
        >
          <span
            className={`home-bg-text-full home-bg-size-md sm:home-bg-size-lg ${
              index === 0
                ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600'
                : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600'
            } bg-clip-text text-transparent opacity-90 tracking-wide`}
          >
            {index === 0 ? 'CIVIL & ARCHITECTURAL ENGINEERING' : 'PRECISION MECHANICAL & MEP SYSTEMS'}
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 xl:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Service header panel */}
          <div className={`lg:col-span-4 ${index % 2 === 1 ? 'lg:col-start-9' : ''} home-content-panel rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col justify-between`}>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-[#2563EB]">
                  <Icon size={20} />
                </div>
                <span className="home-editorial-tag text-[#2563EB] border border-[#E2DBCE] rounded-full px-3 py-1 bg-[#FBF9F5]/90">
                  {service.highlightTag}
                </span>
                <span className="ml-auto text-xl font-mono font-bold text-slate-400/70">{service.number}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold leading-snug tracking-tight text-[#1C1917]">
                {service.title}
              </h3>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="home-arrow text-[#2563EB]/30">→</span>
              <Link
                href={service.href}
                className="home-magnetic inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-sm font-semibold border border-[#E2DBCE] bg-[#FBF9F5]/95 text-[#1C1917] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] shadow-sm transition-all"
              >
                Explore
                <FiArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Service items list */}
          <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-6'} home-content-panel rounded-2xl p-8 sm:p-10 shadow-xl`}>
            <ul className="flex flex-col divide-y divide-[#E2DBCE]/60">
              {service.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 24 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.6 }}
                  className="flex items-center justify-between gap-6 py-5"
                >
                  <div className="flex items-center gap-5">
                    <span className="home-editorial-tag text-[#2563EB]/80 w-7 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base sm:text-lg font-medium text-[#1C1917]">{item}</span>
                  </div>
                  <span className="text-slate-400 text-lg shrink-0">→</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section data-home-chapter="services" className="relative z-10">
      {/* Section introduction */}
      <div className="relative py-20 sm:py-28 home-section-light border-t border-[#E2DBCE]/60">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl home-content-panel rounded-2xl p-8 sm:p-12"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#2563EB]" />
              <span className="home-editorial-tag text-[#2563EB]">Our Services</span>
            </div>
            <h2 className="home-h2 text-[#1C1917]">
              Two disciplines, one integrated approach.
            </h2>
          </motion.div>
        </div>
      </div>

      {services.map((service, index) => (
        <ServiceSequence key={service.title} service={service} index={index} />
      ))}
    </section>
  );
}