'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiMapPin } from 'react-icons/fi';

const projects = [
  {
    name: 'Meridian Business Park',
    location: 'Hyderabad, India',
    category: 'Civil & Architectural',
    image: 'https://images.unsplash.com/photo-1609867271967-a82f85c48531?q=80&w=1600&auto=format&fit=crop',
    href: '/projects',
  },
  {
    name: 'Orion Manufacturing Unit',
    location: 'Pune, India',
    category: 'Mechanical Engineering',
    image: 'https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?q=80&w=1600&auto=format&fit=crop',
    href: '/projects',
  },
  {
    name: 'Crestview Corporate Tower',
    location: 'Bengaluru, India',
    category: 'Civil & Architectural',
    image: 'https://images.unsplash.com/photo-1763251177167-85a9ca1966a8?q=80&w=1600&auto=format&fit=crop',
    href: '/projects',
  },
  {
    name: 'Vantage Precision Plant',
    location: 'Nashik, India',
    category: 'Mechanical Engineering',
    image: 'https://images.unsplash.com/photo-1524514587686-e2909d726e9b?q=80&w=1600&auto=format&fit=crop',
    href: '/projects',
  },
];

function ProjectRow({ project, index }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageX = useTransform(scrollYProgress, [0, 1],
    [index % 2 === 0 ? 30 : -30, index % 2 === 0 ? -15 : 15]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-14 sm:py-20"
    >
      <Link href={project.href} className="block group">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center`}>

          {/* Image — 70% visual weight */}
          <motion.div
            style={{ x: imageX }}
            className={`lg:col-span-8 ${isEven ? '' : 'lg:col-start-5'}`}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200/80 shadow-xl">
              <img
                src={project.image}
                alt={project.name}
                className={`h-full w-full object-cover transition-all duration-[1.1s] ease-out ${
                  isHovered ? 'scale-105' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/18 to-transparent" />
              <div className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.1)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-600`} />
              {/* Bottom caption on image */}
              <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white">
                <FiMapPin size={12} className="text-sky-300" />
                <span className="text-xs font-mono tracking-wider text-white/80">{project.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Metadata panel */}
          <div className={`lg:col-span-4 flex flex-col justify-center home-content-panel rounded-2xl p-6 sm:p-8 ${
            isEven ? '' : 'lg:col-start-1 lg:row-start-1'
          }`}>
            <span className="home-editorial-tag text-[#2563EB] mb-5">{project.category}</span>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917] group-hover:text-[#2563EB] transition-colors leading-tight">
                {project.name}
              </h3>
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                isHovered ? 'scale-110 bg-[#2563EB] text-white border-[#2563EB] shadow-lg' : 'border-white/75 bg-white/40 backdrop-blur-md text-[#1C1917]'
              }`}>
                <FiArrowUpRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const giantX = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <section
      ref={sectionRef}
      data-home-chapter="projects"
      className="relative w-full home-section-light py-20 sm:py-28 overflow-hidden z-10 border-t border-[#E2DBCE]/60"
    >
      {/* Complete background sentence visible in one go - Distinct Animation 4: Panoramic Chroma Sway */}
      <div className="absolute inset-x-0 top-[4%] pointer-events-none select-none z-0 overflow-hidden px-2">
        <div className="home-bg-banner-line home-anim-chroma-sway">
          <span className="home-bg-text-full home-bg-size-md sm:home-bg-size-lg bg-gradient-to-r from-blue-700 via-indigo-800 to-amber-600 bg-clip-text text-transparent opacity-90 tracking-wide">
            PORTFOLIO &bull; LANDMARKS &bull; PROJECTS
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-14 max-w-2xl home-content-panel rounded-2xl p-8 sm:p-10"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#2563EB]" />
            <span className="home-editorial-tag text-[#2563EB]">Our Projects</span>
          </div>
          <h2 className="home-h2 text-[#1C1917]">
            Selected work across architecture, civil and mechanical engineering.
          </h2>
        </motion.div>

        <div className="divide-y divide-[#E2DBCE]/70">
          {projects.map((project, index) => (
            <ProjectRow key={project.name} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-16 flex justify-start"
        >
          <Link
            href="/projects"
            className="home-magnetic group inline-flex items-center gap-3 rounded-full border border-white/75 bg-white/45 px-8 py-4 text-sm font-bold text-[#1C1917] backdrop-blur-md hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white shadow-lg transition-all"
          >
            View All Projects
            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}