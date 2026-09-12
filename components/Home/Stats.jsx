'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '04+', label: 'Years of Experience' },
  { value: '200+', label: 'Projects Completed' },
  { value: '₹660 Cr+', label: 'Total Project Value Delivered' },
];

export default function Stats() {
  return (
    <section
      data-home-chapter="stats"
      className="relative w-full py-20 sm:py-28 overflow-hidden z-10"
    >
      <div className="relative z-10 mx-auto max-w-[1540px] px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative flex flex-col items-start bg-[#FFFDF8]/85 backdrop-blur-xl border border-[#D8C08A]/40 rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(41,39,34,0.06)] overflow-hidden"
            >
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#9F7B35] uppercase mb-4">
                METRIC 0{index + 1} //
              </span>

              <span className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-[#292722] leading-none mb-4">
                {stat.value}
              </span>

              <span className="font-mono text-xs font-semibold tracking-wider text-[#77736B] uppercase">
                {stat.label}
              </span>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#C6A15B] via-[#D8C08A] to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}