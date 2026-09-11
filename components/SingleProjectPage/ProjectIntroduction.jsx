// components/SingleProjectPage/ProjectIntroduction.jsx
'use client';

import { motion } from 'framer-motion';

export default function ProjectIntroduction({ project }) {
  return (
    <section className="w-full bg-[#FAFAF9] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#3E7CB1]" />
              <span className="text-[13px] font-medium text-[#6B7780]">About the Project</span>
            </div>

            <p className="text-[15.5px] leading-relaxed text-[#2F3A40] sm:text-[16.5px]">
              {project.shortDescription}
            </p>

            <p className="mt-5 text-[15px] leading-relaxed text-[#4B5860]">
              Set in {project.location}, this {project.typology.toLowerCase()} project spans{' '}
              {project.area}{' '}
              {project.projectTimeline && (
                <>and was delivered over a timeline of {project.projectTimeline}. </>
              )}
              The scope covered {project.scope.length} core areas of work, including{' '}
              {project.scope.slice(0, 2).join(' and ').toLowerCase()}
              {project.scope.length > 2 ? ', among others' : ''}. The project is currently{' '}
              {project.projectStatus.toLowerCase()}.
            </p>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative aspect-[4/5] w-full overflow-hidden"
          >
            <img
              src={project.galleryImages[0]}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}