'use client';

import { motion } from 'framer-motion';

const services = [
  {
    number: '01',
    title: 'Industrial Equipment Design',
    description:
      'We design industrial equipment engineered for reliable performance, efficient operation and straightforward manufacturability across a range of applications.',
    capabilities: [
      'Equipment design & modeling',
      'Component sizing',
      'Material selection',
      'Design for manufacturability',
      'Assembly planning',
      'Technical documentation',
    ],
    image:
      'https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '02',
    title: 'Automobile Design',
    description:
      'We provide automotive design support covering component modeling, layout and detailing for vehicle parts and assemblies from concept to production-ready drawings.',
    capabilities: [
      'Component & part design',
      'Assembly modeling',
      'Design iteration & review',
      'Fit and clearance checks',
      'Production-ready detailing',
      'Cross-functional coordination',
    ],
    image:
      'https://images.unsplash.com/photo-1567789884554-0b844b597180?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '03',
    title: 'Assembly & Manufacturing Drawings',
    description:
      'We prepare clear, accurate assembly and manufacturing drawings that give fabrication and production teams everything they need to build with confidence.',
    capabilities: [
      'Assembly drawings',
      'Manufacturing drawings',
      'Bill of materials',
      'Tolerance specification',
      'Dimensioning & detailing',
      'Fabrication-ready documentation',
    ],
    image:
      'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '04',
    title: 'Analysis & Simulation',
    description:
      'We run structural and mechanical analysis and simulation to validate designs against real-world loads before they ever reach the shop floor.',
    capabilities: [
      'Stress & load analysis',
      'Structural simulation',
      'Thermal analysis',
      'Failure mode evaluation',
      'Design validation',
      'Performance optimization',
    ],
    image:
      'https://images.unsplash.com/photo-1524514587686-e2909d726e9b?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '05',
    title: 'Revit MEP Design & Modeling',
    description:
      'We deliver coordinated Revit MEP models covering mechanical, electrical and plumbing systems, resolving clashes before they become site problems.',
    capabilities: [
      'Revit MEP modeling',
      'HVAC system design',
      'Piping & plumbing layouts',
      'Electrical system coordination',
      'Clash detection',
      'Coordinated documentation',
    ],
    image:
      'https://images.unsplash.com/photo-1620203853151-496c7228306c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    number: '06',
    title: 'CAD Modeling & Drafting',
    description:
      'We provide precise CAD modeling and drafting services, turning concepts and rough specifications into clean, production-ready technical drawings.',
    capabilities: [
      '2D & 3D CAD modeling',
      'Technical drafting',
      'Part & assembly drawings',
      'Design revisions',
      'Standard compliance',
      'File preparation for production',
    ],
    image:
      'https://images.unsplash.com/photo-1781888688940-5730c3fd5baf?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function MechanicalEngineeringSubServices() {
  return (
    <>
      {services.map((service, index) => {
        const isDark = index % 2 !== 0; // 02, 04, 06 → dark, 01, 03, 05 → light
        const imageFirst = index % 2 === 0; // 01, 03, 05 → image-left

        return (
          <section
            key={service.number}
            className="w-full py-16 sm:py-20"
            style={{ backgroundColor: isDark ? '#11161A' : '#ffffe4' }}
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
                    style={{ color: isDark ? 'rgba(255,255,228,0.4)' : '#11161A66' }}
                  >
                    {service.number}
                  </span>

                  <h3
                    className="mt-4 text-2xl font-semibold leading-[1.2] tracking-tight sm:text-3xl"
                    style={{ color: isDark ? '#ffffe4' : '#11161A' }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="mt-5 max-w-lg text-[15px] leading-relaxed"
                    style={{ color: isDark ? 'rgba(255,255,228,0.65)' : '#11161Ab3' }}
                  >
                    {service.description}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {service.capabilities.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-3 text-[14.5px]"
                        style={{ color: isDark ? 'rgba(255,255,228,0.65)' : '#11161Ab3' }}
                      >
                        <span className="text-[13px]" style={{ color: '#3E7CB1' }}>
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