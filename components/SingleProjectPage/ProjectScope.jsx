// components/SingleProjectPage/ProjectScope.jsx
'use client';

import { motion } from 'framer-motion';

export default function ProjectScope({ project }) {
  return (
    <section className="w-full bg-[#11161A] py-16 sm:py-20">
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
            <span className="text-[13px] font-medium text-white/50">Scope of Services</span>
          </div>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight text-white sm:text-4xl">
            The work delivered across this project.
          </h2>
        </motion.div>

        {/* Scope list */}
        <div className="flex flex-col">
          {project.scope.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.06,
              }}
              className="group flex items-center gap-6 border-t border-white/10 py-6 transition-colors duration-300 last:border-b hover:bg-white/[0.03] sm:gap-10 sm:px-4"
            >
              <span className="w-8 shrink-0 text-[13px] font-medium text-white/30 transition-colors duration-300 group-hover:text-[#3E7CB1] sm:w-10">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="text-[16px] font-medium tracking-tight text-white/80 transition-colors duration-300 group-hover:text-white sm:text-[18px]">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}