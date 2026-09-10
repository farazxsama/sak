'use client';

import { motion } from 'framer-motion';

const principles = [
  {
    number: '01',
    title: 'Precision',
    description:
      'Every project begins with careful planning, technical accuracy and attention to detail.',
  },
  {
    number: '02',
    title: 'Integration',
    description:
      'We bring engineering disciplines together to create coordinated and practical project solutions.',
  },
  {
    number: '03',
    title: 'Innovation',
    description:
      'We use modern tools, technologies and design approaches to improve project outcomes.',
  },
  {
    number: '04',
    title: 'Excellence',
    description:
      'Our focus remains on delivering reliable solutions that meet project requirements and expectations.',
  },
];

export default function OurApproach() {
  return (
    <section className="w-full py-16 sm:py-20" style={{ backgroundColor: '#11161A' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-xl lg:mb-20"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#3E7CB1]" />
            <span className="text-[13px] font-medium" style={{ color: 'rgba(255,255,228,0.65)' }}>
              Our Approach
            </span>
          </div>
          <h2
            className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: '#ffffe4' }}
          >
            Engineering solutions built around precision, functionality and innovation.
          </h2>
        </motion.div>

        {/* Principles */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderTop: '1px solid rgba(255,255,228,0.15)' }}
        >
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.15,
              }}
              className="px-0 py-8 pr-6 sm:px-8 sm:py-10"
              style={{
                borderRight:
                  index !== principles.length - 1 ? '1px solid rgba(255,255,228,0.15)' : 'none',
                borderBottom: '1px solid rgba(255,255,228,0.15)',
              }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: 'rgba(255,255,228,0.4)' }}
              >
                {principle.number}
              </span>

              <h3
                className="mt-5 text-xl font-semibold tracking-tight"
                style={{ color: '#ffffe4' }}
              >
                {principle.title}
              </h3>

              <p
                className="mt-4 text-[14.5px] leading-relaxed"
                style={{ color: 'rgba(255,255,228,0.65)' }}
              >
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}