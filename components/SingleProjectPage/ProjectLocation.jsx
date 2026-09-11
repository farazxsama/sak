// components/SingleProjectPage/ProjectLocation.jsx
'use client';

import { motion } from 'framer-motion';
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi';

export default function ProjectLocation({ project }) {
  return (
    <section className="w-full bg-[#FAFAF9] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start justify-between gap-8 border border-[#11161A]/10 px-8 py-10 sm:flex-row sm:items-center sm:px-12 sm:py-12"
        >
          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#11161A]/15">
              <FiMapPin size={18} className="text-[#3E7CB1]" />
            </div>

            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-[#3E7CB1]" />
                <span className="text-[13px] font-medium text-[#6B7780]">Location</span>
              </div>
              <p className="max-w-md text-xl font-semibold leading-snug tracking-tight text-[#11161A] sm:text-2xl">
                {project.location}
              </p>
            </div>
          </div>

          {project.googleMaps && (
            <a
              href={project.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[#11161A] px-7 py-3 text-[14px] font-medium text-[#11161A] transition-colors duration-200 hover:bg-[#11161A] hover:text-white"
            >
              View on Google Maps
              <FiArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}