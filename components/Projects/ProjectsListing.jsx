'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import { projects } from '../../lib/project-data';

const categories = [
  'All',
  'Architectural',
  'Civil & Infrastructure',
  'Structural Engineering',
  'BIM & MEP',
  'Interior Design',
  '3D Visualization',
  'Walkthrough & Animation',
  'Industrial & Mechanical',
];

export default function ProjectsListing() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((project) => project.categoryType === activeCategory);
  }, [activeCategory]);

  return (
    <section className="w-full bg-[#FAFAF9] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-wrap justify-center gap-3 lg:mb-16"
        >
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2.5 text-[13.5px] font-medium transition-colors duration-200 ${
                  isActive
                    ? 'border-[#11161A] bg-[#11161A] text-white'
                    : 'border-[#11161A]/15 bg-transparent text-[#4B5860] hover:border-[#11161A]/40 hover:text-[#11161A]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </motion.div>

        {/* Project grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.06,
                  }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex h-full flex-col overflow-hidden border border-[#11161A]/10 bg-white transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(17,22,26,0.08)]"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#11161A]/5">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Gradient wash for badge legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />

                      {/* Category pill */}
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[12px] font-medium text-[#11161A] backdrop-blur-sm">
                        {project.categoryType}
                      </span>

                      {/* Floating arrow button */}
                      <div className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <FiArrowUpRight size={16} className="text-[#11161A]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-[18px] font-semibold leading-snug tracking-tight text-[#11161A]">
                        {project.title}
                      </h3>

                      <p className="mt-3 line-clamp-2 flex-1 text-[14px] leading-relaxed text-[#6B7780]">
                        {project.shortDescription}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-[#11161A]/10 pt-5">
                        <span className="flex items-center gap-1.5 text-[13px] text-[#6B7780]">
                          <FiMapPin size={13} className="text-[#3E7CB1]" />
                          {project.location.split(',')[0]}
                          <span className="text-[#11161A]/20">•</span>
                          {project.year}
                        </span>

                        <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#11161A] transition-colors duration-200 group-hover:text-[#3E7CB1]">
                          View
                          <FiArrowRight
                            size={13}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center border border-dashed border-[#11161A]/15 py-24 text-center"
          >
            <p className="text-[15px] text-[#6B7780]">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}