'use client';

import { motion } from 'framer-motion';

// Reusable top-of-page banner. Use on About, Services, Projects, etc.
// <PageBanner eyebrow="About Us" title="Engineering with purpose. Designing with precision." />
export default function PageBanner({ eyebrow, title }) {
  return (
    <section
      className="relative flex h-[300px] w-full items-end overflow-hidden pt-20"
      style={{ backgroundColor: '#11161A' }}
    >
      {/* Subtle black-to-transparent gradient, top to ~60% */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(17,22,26,0.12) 0%, rgba(17,22,26,0.06) 30%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 lg:px-10 lg:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: '#ffffe4' }} />
            <span className="text-[13px] font-medium tracking-wide" style={{ color: '#ffffe4' }}>
              {eyebrow}
            </span>
          </div>

          <h1
            className="max-w-2xl text-3xl font-semibold leading-[1.25] tracking-tight sm:text-4xl"
            style={{ color: '#ffffe4' }}
          >
            {title}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}