'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi';

const projects = [
  {
    number: '01',
    name: 'Meridian Business Park',
    location: 'Hyderabad, India',
    category: 'Civil & Architectural',
    scene: 'SCENE 06 // PORTFOLIO 01',
    href: '/projects',
  },
  {
    number: '02',
    name: 'Orion Manufacturing Unit',
    location: 'Pune, India',
    category: 'Mechanical Engineering',
    scene: 'SCENE 07 // PORTFOLIO 02',
    href: '/projects',
  },
  {
    number: '03',
    name: 'Crestview Corporate Tower',
    location: 'Bengaluru, India',
    category: 'Civil & Architectural',
    scene: 'SCENE 08 // PORTFOLIO 03',
    href: '/projects',
  },
  {
    number: '04',
    name: 'Vantage Precision Plant',
    location: 'Nashik, India',
    category: 'Mechanical Engineering',
    scene: 'SCENE 09 // PORTFOLIO 04',
    href: '/projects',
  },
];

function ProjectSceneCard({ project, index }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const isEven = index % 2 === 0;
  const y = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.28, 0.72, 0.9], [0, 1, 1, 0]);

  return (
    <section
      ref={cardRef}
      data-home-chapter={`project-${project.number}`}
      className={`relative w-full min-h-[110vh] flex items-center ${
        isEven ? 'justify-start' : 'justify-end'
      } pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden`}
    >
      <div className={`relative z-10 mx-auto max-w-[1540px] px-6 lg:px-12 xl:px-16 w-full flex ${
        isEven ? 'justify-start' : 'justify-end'
      }`}>
        <motion.div
          style={{ y, opacity }}
          className="max-w-xl w-full bg-[#FFFDF8]/85 backdrop-blur-xl border border-[#D8C08A]/40 rounded-3xl p-8 sm:p-12 shadow-[0_25px_50px_rgba(41,39,34,0.06)]"
        >
          {/* Project Title Card Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-[#9F7B35]">
              {project.scene}
            </span>
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-[#F6F1E7] border border-[#D8C08A]/30 text-[#292722]">
              {project.category}
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#292722] leading-[1.12] mb-4">
            {project.name}
          </h3>

          <div className="flex items-center gap-2 text-[#77736B] font-medium text-sm sm:text-base mb-8">
            <FiMapPin className="text-[#9F7B35] shrink-0" size={16} />
            <span>{project.location}</span>
          </div>

          <Link
            href={project.href}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#292722] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#C6A15B] hover:text-[#292722] transition-all duration-200"
          >
            View Project Details
            <FiArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function FeaturedProjects() {
  return (
    <div className="relative w-full z-10">
      {projects.map((project, index) => (
        <ProjectSceneCard key={project.name} project={project} index={index} />
      ))}
    </div>
  );
}