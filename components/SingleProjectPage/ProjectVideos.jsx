// components/SingleProjectPage/ProjectVideos.jsx
'use client';

import { motion } from 'framer-motion';

export default function ProjectVideos({ project }) {
  const videos = project.videos || [];

  // Don't render anything if there are no videos for this project.
  if (videos.length === 0) return null;

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
            <span className="text-[13px] font-medium text-white/50">Project Videos</span>
          </div>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight text-white sm:text-4xl">
            See the project in motion.
          </h2>
        </motion.div>

        {/* Video grid */}
        <div
          className={`grid grid-cols-1 gap-6 sm:gap-8 ${
            videos.length > 1 ? 'lg:grid-cols-2' : ''
          }`}
        >
          {videos.map((videoUrl, index) => (
            <motion.div
              key={videoUrl + index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1,
              }}
              className="relative aspect-video w-full overflow-hidden border border-white/10"
            >
              <iframe
                src={videoUrl}
                title={`${project.title} — video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}