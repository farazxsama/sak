'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';

const projects = [
  {
    name: 'Meridian Business Park',
    location: 'Hyderabad, India',
    category: 'Civil & Architectural',
    image: 'https://images.unsplash.com/photo-1609867271967-a82f85c48531?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Orion Manufacturing Unit',
    location: 'Pune, India',
    category: 'Mechanical Engineering',
    image: 'https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Crestview Corporate Tower',
    location: 'Bengaluru, India',
    category: 'Civil & Architectural',
    image: 'https://images.unsplash.com/photo-1763251177167-85a9ca1966a8?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Vantage Precision Plant',
    location: 'Nashik, India',
    category: 'Mechanical Engineering',
    image: 'https://images.unsplash.com/photo-1524514587686-e2909d726e9b?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function FeaturedProjects() {
  return (
    <section className="w-full bg-[#FAFAF9] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-xl lg:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#3E7CB1]" />
            <span className="text-[13px] font-medium text-[#6B7780]">Our Projects</span>
          </div>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight text-[#11161A] sm:text-4xl">
            Selected work across architecture, civil and mechanical engineering.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.2,
              }}
              className="group"
            >
              <Link href={`/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <FiArrowUpRight size={16} className="text-[#11161A]" />
                  </div>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#11161A]">{project.name}</h3>
                    <p className="mt-1 text-[14px] text-[#6B7780]">{project.location}</p>
                  </div>
                  <span className="mt-1 shrink-0 text-[13px] font-medium text-[#3E7CB1]">
                    {project.category}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-[#11161A] px-7 py-3 text-[14px] font-medium text-[#11161A] transition-colors duration-200 hover:bg-[#11161A] hover:text-white"
          >
            View All Projects
            <FiArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}