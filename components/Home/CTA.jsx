'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function CTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[#11161A] py-24 sm:py-32">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop"
          alt="Architectural structure"
          className="h-full w-full object-cover opacity-25"
        />
        {/* Subtle gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#11161A]/95 via-[#11161A]/90 to-[#11161A]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#3E7CB1]" />
            <span className="text-[13px] font-medium text-white/50">Get Started</span>
            <span className="h-px w-8 bg-[#3E7CB1]" />
          </div>

          <h2 className="max-w-3xl text-4xl font-semibold uppercase leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ready to build your next project?
          </h2>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60 sm:text-base">
            Let&apos;s discuss your engineering and design requirements.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-10"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[14px] font-medium text-[#11161A] transition-colors duration-200 hover:bg-white/90"
            >
              Get in Touch
              <FiArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}