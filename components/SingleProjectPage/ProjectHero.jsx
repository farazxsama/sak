// app/components/Projects/ProjectHero.jsx
'use client';

import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

export default function ProjectHero({ project }) {
  return (
    <section className="relative flex min-h-[85vh] w-full items-end overflow-hidden bg-[#11161A]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={project.coverImage}
          alt={project.title}
          className="h-full w-full object-cover"
        />
        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#11161A] via-[#11161A]/60 to-[#11161A]/20" />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-40 sm:pb-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Category */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#3E7CB1]" />
            <span className="text-[13px] font-medium uppercase tracking-wide text-white/70">
              {project.categoryType}
            </span>
          </div>

          {/* Title */}
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          {/* Short description */}
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
            {project.shortDescription}
          </p>

          {/* Meta row */}
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6">
            <span className="flex items-center gap-2 text-[14px] text-white/80">
              <FiMapPin size={15} className="text-[#3E7CB1]" />
              {project.location}
            </span>
            <span className="flex items-center gap-2 text-[14px] text-white/80">
              <FiCalendar size={15} className="text-[#3E7CB1]" />
              {project.year}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}