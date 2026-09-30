// Section 2 — About / Introduction
// components/sea/SeaAbout.jsx

'use client';

import { motion } from 'framer-motion';

const pillars = [
  { label: 'Discretion', description: 'Every project is handled with complete confidentiality.' },
  { label: 'Personalization', description: "Solutions shaped entirely around the client's vision." },
  { label: 'Excellence', description: 'Uncompromising design quality at every stage.' },
];

export default function SeaAbout() {
  return (
    <section id="about" className="w-full py-20 sm:py-28" style={{ backgroundColor: '#0a0a08' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop"
              alt="SEA luxury interior"
              className="h-full w-full object-cover"
            />
            {/* Gold corner accent */}
            <div
              className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2"
              style={{ borderColor: '#c9a96e' }}
            />
            <div
              className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2"
              style={{ borderColor: '#c9a96e' }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8" style={{ backgroundColor: '#c9a96e' }} />
              <span className="text-[12px] font-medium tracking-[0.18em] uppercase" style={{ color: '#c9a96e' }}>
                Who We Are
              </span>
            </div>

            <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight text-white sm:text-4xl">
              Where engineering meets
              <br />
              <em className="not-italic" style={{ color: '#c9a96e' }}>design excellence.</em>
            </h2>

            <p className="mt-6 text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>
              SEA Engineering &amp; Architect operates as a specialized luxury
              design collaboration within the broader SAK E&amp;A ecosystem.
              Led by <strong className="font-medium text-white">Safaa Khan</strong> — Designer &amp;
              CEO — the division focuses on bespoke projects demanding elevated
              levels of design, privacy and personalization.
            </p>

            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>
              From exclusive private residences to highly confidential
              developments, every project is approached with complete
              discretion and an unwavering commitment to design integrity.
            </p>

            {/* Three pillars */}
            <div
              className="mt-10 grid grid-cols-3 gap-px"
              style={{ backgroundColor: 'rgba(201,169,110,0.2)' }}
            >
              {pillars.map((p) => (
                <div
                  key={p.label}
                  className="flex flex-col gap-2 px-4 py-5"
                  style={{ backgroundColor: '#0a0a08' }}
                >
                  <span className="text-[13px] font-semibold" style={{ color: '#c9a96e' }}>
                    {p.label}
                  </span>
                  <span className="text-[12.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>
                    {p.description}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}