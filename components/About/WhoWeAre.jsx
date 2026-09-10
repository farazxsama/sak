'use client';

import { motion } from 'framer-motion';

export default function WhoWeAre() {
  return (
    <section className="w-full py-16 sm:py-20" style={{ backgroundColor: '#ffffe4' }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: '#11161A' }} />
            <span className="text-[13px] font-medium" style={{ color: '#11161A99' }}>
              Who We Are
            </span>
          </div>

          <h2
            className="max-w-md text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: '#11161A' }}
          >
            Built on technical expertise. Driven by thoughtful design.
          </h2>

          <div className="mt-6 flex max-w-lg flex-col gap-5 text-[15px] leading-relaxed" style={{ color: '#11161Ab3' }}>
            <p>
              SAK Engineering &amp; Architecture brings civil, architectural
              and mechanical disciplines together under one team — so a
              project moves from concept to construction without getting
              lost between specialists who don't talk to each other.
            </p>
            <p>
              Every engagement is handled by people who understand both the
              structural and the mechanical side of a build, which means
              fewer conflicts on site and fewer surprises during execution.
            </p>
            <p>
              Our approach stays the same regardless of scale: precise
              drawings, realistic timelines, and a focus on solving the
              actual constraints of a site rather than working around them.
            </p>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative h-[320px] w-full lg:h-[460px]"
        >
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop"
            alt="SAK engineers working on architectural drafts"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}