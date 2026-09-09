'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#11161A]">
      {/* Background image — replace with a real project photo later */}
      <div className="absolute inset-0">
        <Image
          src="/img/sak-hero-banner.png"
          alt="Engineering and architectural project"
          fill
          // sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Left-to-right gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(10,14,17,0.99) 0%, rgba(10,14,17,0.88) 20%, rgba(10,14,17,0.66) 50%, rgba(10,14,17,0) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl pt-20"
        >
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#3E7CB1]" />
            <span className="text-[13px] font-medium text-white/80">
              Civil · Architecture · Mechanical
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-normal leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            Engineering ideas. Built with precision.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-md text-[15.5px] leading-relaxed text-white/70">
            Comprehensive civil, architectural and mechanical engineering
            solutions for modern projects — from concept through construction.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-medium text-[#11161A] transition-colors duration-200 hover:bg-white/90"
            >
              Explore Our Projects
              <FiArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-[14px] font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
            >
              Our Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}