'use client';

import { motion } from 'framer-motion';
import {
  FiTrendingUp,
  FiLayers,
  FiBookOpen,
  FiTool,
  FiUsers,
  FiTrendingUp as FiGrowth,
} from 'react-icons/fi';

const benefits = [
  {
    number: '01',
    icon: FiTrendingUp,
    title: 'Learn Revenue-Driven Design',
    description:
      'Work on practical projects where design decisions are connected to real business, functional and project requirements.',
  },
  {
    number: '02',
    icon: FiLayers,
    title: 'Range of Work',
    description:
      'Gain exposure to diverse architectural, civil, structural, BIM, interior, visualization and mechanical engineering projects.',
  },
  {
    number: '03',
    icon: FiBookOpen,
    title: 'Learn & Grow',
    description:
      'Develop your technical knowledge and professional skills by working alongside experienced professionals.',
  },
  {
    number: '04',
    icon: FiTool,
    title: 'Real Project Experience',
    description:
      'Work on real-world projects and understand how ideas move from planning and design through to execution.',
  },
  {
    number: '05',
    icon: FiUsers,
    title: 'Collaborative Environment',
    description:
      'Work with architects, engineers and designers across different disciplines to solve complex project requirements.',
  },
  {
    number: '06',
    icon: FiGrowth,
    title: 'Build Your Career',
    description:
      'Take on meaningful responsibilities, develop your expertise and build a strong foundation for your professional career.',
  },
];

export default function WhyWorkWithUs() {
  return (
    <section className="w-full py-16 sm:py-20" style={{ backgroundColor: '#ffffe4' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-2xl lg:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: '#11161A' }} />
            <span className="text-[13px] font-medium" style={{ color: '#11161A99' }}>
              Careers
            </span>
          </div>
          <h2
            className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: '#11161A' }}
          >
            Why Work With Us
          </h2>
          <p
            className="mt-5 max-w-xl text-[15px] leading-relaxed"
            style={{ color: '#11161Ab3' }}
          >
            At SAK, we believe great projects are built by great people. We
            provide an environment where professionals can develop their
            skills, work across diverse projects and contribute to
            meaningful engineering and architectural solutions.
          </p>
        </motion.div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (index % 3) * 0.12,
                }}
                className="group flex h-full flex-col border p-8 transition-colors duration-300"
                style={{ borderColor: '#11161A1a' }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 group-hover:bg-[#11161A]"
                  style={{ borderColor: '#11161A33', color: '#11161A' }}
                >
                  <Icon size={20} className="transition-colors duration-300 group-hover:text-[#ffffe4]" />
                </div>

                <h3
                  className="mt-6 text-lg font-semibold tracking-tight"
                  style={{ color: '#11161A' }}
                >
                  {benefit.title}
                </h3>

                <p
                  className="mt-3 text-[14.5px] leading-relaxed"
                  style={{ color: '#11161A99' }}
                >
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}