'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Consultation Call',
    description:
      'A quick, no-strings-attached call to understand your project requirements and see if we\u2019re the right fit.',
  },
  {
    number: '02',
    title: 'Discovery & Site Visit',
    description:
      'A deeper conversation on scope, budget and timeline, along with a site visit and requirement documentation.',
  },
  {
    number: '03',
    title: 'Contract & Advance',
    description:
      'Once we\u2019re aligned, we finalize the scope, sign the contract, and get started with the advance payment.',
  },
  {
    number: '04',
    title: 'Design & Delivery',
    description:
      'From concept to GFC drawings, we take your project through each design phase, keeping you involved at every step.',
  },
];

export default function Process() {
  return (
    <section className="w-full bg-[#FAFAF9] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-xl lg:mb-20"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#3E7CB1]" />
            <span className="text-[13px] font-medium text-[#6B7780]">Our Process</span>
          </div>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight text-[#11161A] sm:text-4xl">
            A structured process that removes surprises and keeps projects on time.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Connecting line — desktop only */}
          <div className="pointer-events-none absolute left-0 right-0 top-[22px] hidden h-px bg-[#11161A]/10 lg:block" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.15,
              }}
              className="relative flex flex-col"
            >
              {/* Number marker */}
              <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#11161A]/15 bg-[#FAFAF9] text-[13px] font-medium text-[#11161A]">
                {step.number}
              </div>

              <h3 className="mt-6 text-lg font-semibold leading-snug tracking-tight text-[#11161A]">
                {step.title}
              </h3>

              <p className="mt-3 max-w-[30ch] text-[14.5px] leading-relaxed text-[#6B7780]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}