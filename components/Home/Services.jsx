'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const services = [
  {
    number: '01',
    title: 'Civil & Architectural Services',
    items: [
      'Building & Infrastructure',
      'RCC Structural Design',
      'Steel Structural Design',
      'BIM & Site Layouts',
      '3D Elevation & Interior Design',
    ],
    href: '/services/civil-architectural',
  },
  {
    number: '02',
    title: 'Mechanical Engineering Services',
    items: [
      'Industrial Equipment Design',
      'Automobile Design',
      'Manufacturing Drawings',
      'Analysis & Simulation',
      'REVIT MEP Design',
    ],
    href: '/services/mechanical-engineering',
  },
];

export default function Services() {
  return (
    <section className="w-full py-16 sm:py-20" style={{ backgroundColor: '#FAFAF9' }}>
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
            <span className="text-[13px] font-medium" style={{ color: '#11161A99' }}>
              Our Services
            </span>
          </div>
          <h2
            className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: '#11161A' }}
          >
            Two disciplines, one integrated approach.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
              className="flex flex-col justify-between p-8 sm:p-10"
              style={{ border: '1px solid #11161A1a' }}
            >
              <div>
                <span
                  className="text-sm font-medium"
                  style={{ color: '#11161A33' }}
                >
                  {service.number}
                </span>

                <h3
                  className="mt-4 max-w-[15ch] text-2xl font-semibold leading-[1.25] tracking-tight sm:text-[26px]"
                  style={{ color: '#11161A' }}
                >
                  {service.title}
                </h3>

                <ul className="mt-8 flex flex-col gap-3">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-[14.5px]"
                      style={{ color: '#11161Ab3' }}
                    >
                      <span className="text-[#3E7CB1]">–</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={service.href}
                className="group mt-10 inline-flex w-fit items-center gap-2 text-[14px] font-medium transition-colors duration-200"
                style={{ color: '#11161A' }}
              >
                Explore Services
                <FiArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}