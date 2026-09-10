'use client';

import { motion } from 'framer-motion';

const team = [
  {
    name: 'Rahul Sharma',
    role: 'Lead Architect',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Aman Khan',
    role: 'Structural Engineer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Priya Rao',
    role: 'Mechanical Engineer',
    image: 'https://images.unsplash.com/photo-1627161683077-e34782c24d81?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Mohammed Farhan',
    role: 'Project Manager',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
  },
];

export default function OurTeam() {
  return (
    <section className="w-full py-16 sm:py-20" style={{ backgroundColor: '#ffffe4' }}>
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
            <span className="h-px w-8" style={{ backgroundColor: '#11161A' }} />
            <span className="text-[13px] font-medium" style={{ color: '#11161A99' }}>
              Our Team
            </span>
          </div>
          <h2
            className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: '#11161A' }}
          >
            People behind the projects.
          </h2>
          <p
            className="mt-5 max-w-md text-[15px] leading-relaxed"
            style={{ color: '#11161Ab3' }}
          >
            A team of engineers, architects and professionals working
            together to turn ideas into precise and practical solutions.
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.12,
              }}
              className="group"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>

              <div className="mt-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                <h3 className="text-[15px] font-semibold" style={{ color: '#11161A' }}>
                  {member.name}
                </h3>
                <p className="mt-1 text-[13.5px]" style={{ color: '#11161A99' }}>
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}