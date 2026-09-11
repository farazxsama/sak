// components/SingleProjectPage/ProjectHighlights.jsx
'use client';

import { motion } from 'framer-motion';

export default function ProjectHighlights({ project }) {
  return (
    <section className="w-full bg-[#FAFAF9] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-xl lg:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#3E7CB1]" />
            <span className="text-[13px] font-medium text-[#6B7780]">Project Highlights</span>
          </div>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight text-[#11161A] sm:text-4xl">
            What sets this project apart.
          </h2>
        </motion.div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
          {project.projectHighlights.map((highlight, index) => (
            <motion.div
              key={highlight}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1,
              }}
              className="group flex gap-5 border-t border-[#11161A]/10 pt-6"
            >
              <span className="shrink-0 text-[13px] font-medium text-[#11161A]/30 transition-colors duration-300 group-hover:text-[#3E7CB1]">
                {String(index + 1).padStart(2, '0')}
              </span>

              <p className="text-[16px] font-medium leading-snug tracking-tight text-[#11161A]">
                {highlight}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}