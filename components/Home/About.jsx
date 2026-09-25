'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function About() {
  return (
    <section className="w-full bg-[#FAFAF9] py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[320px] w-full lg:h-auto lg:min-h-[480px]"
        >
          <img
            src="https://images.unsplash.com/photo-1781888688940-5730c3fd5baf?q=80&w=1600&auto=format&fit=crop"
            alt="SAK engineering and architectural planning"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#3E7CB1]" />
            <span className="text-[13px] font-medium text-[#6B7780]">About SAK</span>
          </div>

          <h2 className="max-w-md text-3xl font-semibold leading-[1.2] tracking-tight text-[#11161A] sm:text-4xl">
            Our Services Are Our Identity.
          </h2>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#4B5860]">
            SAK Engineering &amp; Architect is a multidisciplinary design
            company established in 2023, headquartered in Hyderabad with
            an international reach. We bring together civil, structural,
            architectural, mechanical and BIM expertise — delivering
            200+ projects across multiple sectors with a team of 10+
            professionals.
          </p>

          <Link
            href="/about"
            className="mt-8 inline-flex w-fit items-center gap-2 border-b border-[#11161A] pb-1 text-[14px] font-medium text-[#11161A] transition-opacity duration-200 hover:opacity-70"
          >
            Discover More
            <FiArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}