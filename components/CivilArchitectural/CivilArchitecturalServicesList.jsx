'use client';

import { motion } from 'framer-motion';
import {
  FiAnchor,
  FiLayers,
  FiGrid,
  FiBox,
  FiPenTool,
  FiHome,
  FiFileText,
} from 'react-icons/fi';

const services = [
  {
    number: '01',
    icon: FiAnchor,
    title: 'Bridge & Dam Design',
    description:
      'Structural design for bridges and dams, engineered for long-term load performance and site-specific hydrological conditions.',
  },
  {
    number: '02',
    icon: FiHome,
    title: 'Building & Infrastructure Design',
    description:
      'End-to-end architectural and civil design for buildings and infrastructure, from concept through construction-ready drawings.',
  },
  {
    number: '03',
    icon: FiLayers,
    title: 'RCC Structural Design',
    description:
      'Reinforced concrete structural design covering slabs, beams, columns and foundations, engineered to relevant codes.',
  },
  {
    number: '04',
    icon: FiGrid,
    title: 'Steel Structural Design',
    description:
      'Steel structure design and detailing for industrial, commercial and infrastructure projects requiring long-span framing.',
  },
  {
    number: '05',
    icon: FiBox,
    title: 'BIM & Site Layouts',
    description:
      'Coordinated Building Information Modeling and site layout planning to resolve clashes before work begins on site.',
  },
  {
    number: '06',
    icon: FiPenTool,
    title: '3D Elevation & Interior Design',
    description:
      'Photorealistic 3D elevations and interior design visuals used for design approvals, marketing and client presentations.',
  },
  {
    number: '07',
    icon: FiFileText,
    title: '2D & 3D Floor Plans',
    description:
      'Detailed 2D and 3D floor plans for design development, approvals and on-site execution reference.',
  },
];

export default function CivilArchitecturalServicesList() {
  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-xl lg:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#3E7CB1]" />
            <span className="text-[13px] font-medium text-[#6B7780]">What We Offer</span>
          </div>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight text-[#11161A] sm:text-4xl">
            Every discipline needed to take a structure from plan to reality.
          </h2>
        </motion.div>

        {/* Services */}
        <div className="border-t border-[#E9ECEE]">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (index % 4) * 0.1,
                }}
                className="group flex flex-col gap-4 border-b border-[#E9ECEE] py-8 sm:flex-row sm:items-center sm:gap-10 sm:py-10"
              >
                <span className="text-sm font-medium text-[#D8DEE1] sm:w-10 sm:shrink-0">
                  {service.number}
                </span>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E9ECEE] text-[#3E7CB1] transition-colors duration-300 group-hover:border-[#3E7CB1] group-hover:bg-[#3E7CB1] group-hover:text-white">
                  <Icon size={18} />
                </div>

                <div className="sm:flex-1">
                  <h3 className="text-lg font-semibold tracking-tight text-[#11161A] sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-[#4B5860]">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}