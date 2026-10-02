// Section 1 — Full Screen Hero / Landing
// components/sea/SeaHero.jsx

'use client';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function SeaHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: '#0a0a08' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2000&auto=format&fit=crop"
          alt="SEA Engineering luxury design"
          className="h-full w-full object-cover opacity-50"
        />
      </div>

      {/* Gradient overlay — bottom heavy so text reads clean */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(10,10,8,1) 0%, rgba(10,10,8,0.6) 40%, rgba(10,10,8,0.2) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-20 lg:px-10 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="max-w-3xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: '#c9a96e' }} />
            <span className="text-[12px] font-medium tracking-[0.2em] uppercase" style={{ color: '#c9a96e' }}>
              Luxury Design Division · SAK E&amp;A
            </span>
          </div>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            SEA Engineering
            <br />
            <span style={{ color: '#c9a96e' }}>&amp; Architect</span>
          </h1>

          <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            A specialized design brand delivering highly personalized
            engineering and architectural solutions for ultra-high-net-worth
            clients and private developments.
          </p>

          {/* <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/sister-company#contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-[14px] font-medium transition-opacity duration-200 hover:opacity-85"
              style={{ backgroundColor: '#c9a96e', color: '#0a0a08' }}
            >
              Begin a Private Enquiry
              <FiArrowRight size={15} />
            </a>
            <a
              href="/sister-company#about"
              className="inline-flex items-center gap-2 rounded-full border px-7 py-3 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-white/10"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }}
            >
              Discover SEA
            </a>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}