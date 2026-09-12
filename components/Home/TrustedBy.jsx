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
    <div className="flex h-12 shrink-0 items-center justify-center rounded-xl border border-[#D8C08A]/30 bg-[#FFFDF8]/85 backdrop-blur-md px-8 transition-all duration-300 hover:border-[#C6A15B] hover:bg-[#F6F1E7]/70 shadow-xs cursor-default">
      <span className="whitespace-nowrap text-xs font-bold tracking-widest text-[#292722] hover:text-[#9F7B35] uppercase font-mono transition-colors">
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F6F1E7]/90 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F6F1E7]/90 to-transparent z-10" />
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section
      data-home-chapter="trusted"
      className="relative w-full py-20 sm:py-28 overflow-hidden z-10"
    >
      <div className="mx-auto max-w-[1540px] px-6 lg:px-12 xl:px-16">
        <div className="mb-10 max-w-3xl bg-[#FFFDF8]/85 backdrop-blur-xl rounded-2xl p-8 border border-[#D8C08A]/40 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#C6A15B] animate-pulse" />
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-[#9F7B35]">
              TRUST &amp; PARTNERSHIPS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#292722] tracking-tight leading-snug">
            Trusted by high-performing brands in hospitality and F&amp;B
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <MarqueeRow items={rowOne} direction="left" duration={32} />
          <MarqueeRow items={rowTwo} direction="right" duration={36} />
        </div>
      </div>
    </section>
  );
}