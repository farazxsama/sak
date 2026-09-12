'use client';

import { motion } from 'framer-motion';

const rowOne = [
  { name: 'Apex Infra Solutions' },
  { name: 'Prestige Urban Corp' },
  { name: 'L&T Construction Alliance' },
  { name: 'Godrej Properties Group' },
  { name: 'Tata Projects Ecosystem' },
];

const rowTwo = [
  { name: 'Shapoorji Pallonji Co.' },
  { name: 'DLF Commercial Assets' },
  { name: 'Brigade Group Infra' },
  { name: 'Sobha Engineering Works' },
  { name: 'Hiranandani Communities' },
];

function LogoItem({ name }) {
  return (
    <div className="flex h-12 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white/85 backdrop-blur-md px-8 transition-all duration-300 hover:border-[#2563EB]/60 hover:bg-blue-50/60 shadow-sm cursor-default">
      <span className="whitespace-nowrap text-xs font-bold tracking-widest text-slate-700 hover:text-[#2563EB] uppercase font-mono transition-colors">
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({ items, direction = 'left', duration = 30 }) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="relative w-full overflow-hidden py-1.5">
      <motion.div
        className="flex w-max gap-5"
        animate={{ x: direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <LogoItem key={`${item.name}-${i}`} name={item.name} />
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#F8F9FA]/75 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#F8F9FA]/75 to-transparent z-10" />
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section
      data-home-chapter="trusted"
      className="relative w-full home-section-light py-24 sm:py-32 overflow-hidden z-10 border-t border-slate-200/45"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-3xl home-content-panel rounded-2xl p-8 sm:p-10"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1">
            <span className="home-editorial-tag text-[#2563EB]">Industry Partners</span>
          </div>
          <h2 className="home-h2 text-slate-900">
            Trusted by leading developers and enterprises across infrastructure &amp; industry.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="flex flex-col gap-6"
        >
          <MarqueeRow items={rowOne} direction="left" duration={32} />
          <MarqueeRow items={rowTwo} direction="right" duration={36} />
        </motion.div>
      </div>
    </section>
  );
}