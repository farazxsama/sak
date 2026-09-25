// components/SingleProjectPage/ProjectOverview.jsx
'use client';

import { motion } from 'framer-motion';

export default function ProjectOverview({ project }) {
  const details = [
    { label: 'Category', value: project.categoryType.join(", ") },
    { label: 'Year', value: project.year },
    { label: 'Location', value: project.location },
    // { label: 'Typology', value: project.typology },
    { label: 'Area', value: project.area },
    // { label: 'Project Timeline', value: project.projectTimeline },
    // { label: 'Capacity', value: project.capacity },
    // { label: 'Status', value: project.projectStatus },
  ];

  return (
    <section className="w-full bg-[#FAFAF9] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#3E7CB1]" />
              <span className="text-[13px] font-medium text-[#6B7780]">Project Details</span>
            </div>
            <h2 className="max-w-xs text-2xl font-semibold leading-[1.25] tracking-tight text-[#11161A] sm:text-3xl">
              An overview of the project scope and specifications.
            </h2>
          </motion.div>

          {/* Details grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2"
          >
            {details.map((detail, index) => (
              <div
                key={detail.label}
                className={`flex flex-col gap-1.5 border-t border-[#11161A]/10 py-5 sm:px-6 sm:py-6 ${
                  index === 0 ? 'sm:border-l-0' : ''
                } sm:border-l sm:border-[#11161A]/10`}
              >
                <span className="text-[12.5px] font-medium uppercase tracking-wide text-[#6B7780]">
                  {detail.label}
                </span>
                <span className="text-[15.5px] font-medium text-[#11161A]">
                  {detail.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}