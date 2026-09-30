// Section 3 — Specializations / Services
// components/sea/SeaSpecializations.jsx

'use client';

import { motion } from 'framer-motion';
import { FiHome, FiLock, FiStar, FiLayers } from 'react-icons/fi';

const specializations = [
  {
    icon: FiHome,
    title: 'Exclusive Private Residences',
    description:
      'Custom-designed homes engineered and architecturally resolved for ultra-high-net-worth clients who require complete originality and absolute quality.',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
  },
  {
    icon: FiStar,
    title: 'Luxury Developments',
    description:
      'High-end residential and mixed-use developments where design language, material quality and spatial experience are held to the highest standard.',
    image:
      'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    icon: FiLock,
    title: 'Confidential Developments',
    description:
      'Sensitive projects managed with complete discretion — identity, location and design details fully protected throughout the engagement.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    icon: FiLayers,
    title: 'Private Estates',
    description:
      'Multi-structure estate design encompassing landscaping, outbuildings, gates and integrated engineering across large private landholdings.',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function SeaSpecialization() {
  return (
    <section className="w-full py-20 sm:py-28" style={{ backgroundColor: '#0d0d0b' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-xl lg:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: '#c9a96e' }} />
            <span className="text-[12px] font-medium tracking-[0.18em] uppercase" style={{ color: '#c9a96e' }}>
              Our Specializations
            </span>
          </div>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight text-white sm:text-4xl">
            Projects that demand more
            <br />than the ordinary.
          </h2>
        </motion.div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2" style={{ backgroundColor: 'rgba(201,169,110,0.15)' }}>
          {specializations.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (index % 2) * 0.15,
                }}
                className="group relative overflow-hidden"
                style={{ backgroundColor: '#0a0a08' }}
              >
                {/* Card image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, #0a0a08 0%, transparent 60%)' }}
                  />
                </div>

                {/* Card text */}
                <div className="p-7">
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border"
                    style={{ borderColor: 'rgba(201,169,110,0.4)', color: '#c9a96e' }}
                  >
                    <Icon size={17} />
                  </div>
                  <h3 className="text-[17px] font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}