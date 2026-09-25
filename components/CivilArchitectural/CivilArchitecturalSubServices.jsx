'use client';

import { motion } from 'framer-motion';

const services = [
  {
    number: '01',
    title: 'Bridge & Dam Design',
    description:
      'Engineering solutions for major infrastructure projects including bridges, dams and related civil structures. Our approach focuses on structural safety, functional requirements, durability and efficient planning.',
    capabilities: [
      'Bridge structural planning',
      'Dam and hydraulic structure design',
      'Structural analysis',
      'Load and stability considerations',
      'Infrastructure planning',
      'Detailed engineering documentation',
    ],
    image:
      'https://images.unsplash.com/photo-1633363961301-4f100a78e92d?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '02',
    title: 'Building & Infrastructure Design',
    description:
      'We develop practical and efficient building and infrastructure solutions that bring together architectural planning, engineering requirements and site considerations.',
    capabilities: [
      'Building planning',
      'Site development',
      'Infrastructure planning',
      'Architectural coordination',
      'Functional space planning',
      'Design documentation',
    ],
    image:
      'https://images.unsplash.com/photo-1763251177167-85a9ca1966a8?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '03',
    title: 'RCC Design',
    description:
      'Our RCC design services focus on safe, efficient and reliable reinforced concrete structures. Designs are developed with attention to structural performance, constructability and project requirements.',
    capabilities: [
      'RCC structural design',
      'Beam and slab design',
      'Column and footing design',
      'Structural analysis',
      'Reinforcement detailing',
      'Structural drawings',
    ],
    image:
      'https://images.unsplash.com/photo-1622109912940-2bddde35274d?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '04',
    title: 'Steel Structural Design',
    description:
      'We provide structural engineering solutions for steel buildings and structures, focusing on strength, stability, efficient material utilization and constructability.',
    capabilities: [
      'Steel structural design',
      'Structural framing',
      'Connection design',
      'Load analysis',
      'Steel detailing',
      'Fabrication drawings',
    ],
    image:
      'https://images.unsplash.com/photo-1509024368907-57294758cfc5?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '05',
    title: 'BIM & Site Layouts',
    description:
      'We use Building Information Modeling and digital coordination workflows to improve project visualization, documentation and collaboration between different disciplines.',
    capabilities: [
      'BIM modeling',
      'Site layouts',
      'Digital coordination',
      'Architectural modeling',
      'Engineering coordination',
      'Project visualization',
    ],
    image:
      'https://images.unsplash.com/photo-1781888688940-5730c3fd5baf?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '06',
    title: '3D Elevation & Interior Design',
    description:
      'We create detailed architectural elevations and interior concepts that translate design ideas into clear and realistic visual representations.',
    capabilities: [
      '3D building elevations',
      'Exterior visualization',
      'Interior design concepts',
      'Material and finish visualization',
      'Space planning',
      'Photorealistic rendering',
    ],
    image:
      'https://images.unsplash.com/photo-1621831337128-35676ca30868?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '07',
    title: '2D & 3D Floor Plans',
    description:
      'We develop clear and detailed 2D and 3D floor plans that help clients understand spatial arrangements, circulation and functionality before construction.',
    capabilities: [
      '2D floor plans',
      '3D floor plans',
      'Space planning',
      'Furniture layouts',
      'Architectural documentation',
      'Detailed room planning',
    ],
    image:
      'https://images.unsplash.com/photo-1721244654195-943615c56ac4?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function CivilArchitecturalSubServices() {
  return (
    <>
      {services.map((service, index) => {
        const isDark = index % 2 === 0; // 02, 04, 06 → dark
        const imageFirst = index % 2 === 0; // 01, 03, 05, 07 → image-left

        return (
          <section
            key={service.number}
            className="w-full py-16 sm:py-20"
            style={{ backgroundColor: isDark ? '#FAFAF9' : '#11161A' }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: imageFirst ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-sm ${
                    imageFirst ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className={imageFirst ? 'lg:order-2' : 'lg:order-1'}
                >
                  <span
                    className="text-sm font-medium"
                    // style={{ color: isDark ? 'rgba(255,255,228,0.4)' : '#11161A66' }}
                    style={{ color: isDark ? '#11161A66' : 'rgba(255,255,228,0.4)' }}

                  >
                    {service.number}
                  </span>

                  <h3
                    className="mt-4 text-2xl font-semibold leading-[1.2] tracking-tight sm:text-3xl"
                    style={{ color: isDark ? '#11161A' : '#FAFAF9' }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="mt-5 max-w-lg text-[15px] leading-relaxed"
                    // style={{ color: isDark ? 'rgba(255,255,228,0.65)' : '#11161Ab3' }}
                    style={{ color: isDark ? '#11161Ab3' : 'rgba(255,255,228,0.65)' }}

                  >
                    {service.description}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {service.capabilities.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-3 text-[14.5px]"
                        // style={{ color: isDark ? 'rgba(255,255,228,0.65)' : '#11161Ab3' }}
                        style={{ color: isDark ? '#11161Ab3' : 'rgba(255,255,228,0.65)' }}

                      >
                        <span
                          className="text-[13px]"
                          style={{ color: '#3E7CB1' }}
                        >
                          –
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}