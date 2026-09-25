"use client";

import { motion } from "framer-motion";
import {
  FiTarget,
  FiZap,
  FiAward,
  FiShield,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

const values = [
  {
    number: "01",
    icon: FiTarget,
    title: "Precision",
    description:
      "Accurate, deliberate and technically responsible decisions.",
  },
  {
    number: "02",
    icon: FiZap,
    title: "Innovation",
    description:
      "Exploring new technologies and smarter design approaches.",
  },
  {
    number: "03",
    icon: FiAward,
    title: "Quality",
    description:
      "High standards across every stage of design and documentation.",
  },
  {
    number: "04",
    icon: FiShield,
    title: "Integrity",
    description:
      "Transparency, professionalism and responsibility in every relationship.",
  },
  {
    number: "05",
    icon: FiUsers,
    title: "Collaboration",
    description:
      "Bringing disciplines together to create better outcomes.",
  },
  {
    number: "06",
    icon: FiTrendingUp,
    title: "Client Success",
    description:
      "Creating meaningful value and outcomes for our clients.",
  },
];

export default function CoreValues() {
  return (
    <section
      className="w-full overflow-hidden"
      style={{ backgroundColor: "#11151A" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-10 lg:py-36">

        {/* Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[25%_75%]">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{ backgroundColor: "#FAFAF9" }}
              />

              <span
                className="text-[12px] font-medium uppercase tracking-[0.25em]"
                style={{ color: "#FAFAF999" }}
              >
                Our Core Values
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
          >
            <h2
              className="max-w-3xl text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: "#FAFAF9" }}
            >
              Principles that guide
              <br />
              <span style={{ color: "#FAFAF966" }}>
                everything we do.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mt-16 grid grid-cols-1 border-l border-t border-[#FAFAF91A] sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">

          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative min-h-[240px] border-b border-r border-[#FAFAF91A] p-7 transition-colors duration-300 hover:bg-[#FAFAF9] sm:p-8"
              >

                {/* Top */}
                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FAFAF926] transition-colors duration-300 group-hover:border-[#11151A1A]">
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#FAFAF9] transition-colors duration-300 group-hover:text-[#11151A]"
                    />
                  </div>

                  <span className="text-[11px] tracking-wider text-[#FAFAF955] transition-colors duration-300 group-hover:text-[#11151A55]">
                    {value.number}
                  </span>

                </div>

                {/* Content */}
                <div className="mt-12">

                  <h3 className="text-xl font-medium tracking-tight text-[#FAFAF9] transition-colors duration-300 group-hover:text-[#11151A]">
                    {value.title}
                  </h3>

                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#FAFAF966] transition-colors duration-300 group-hover:text-[#11151A88]">
                    {value.description}
                  </p>

                </div>

                {/* Bottom */}
                <div className="absolute bottom-7 left-7 flex items-center gap-2 sm:left-8">

                  <span className="h-px w-5 bg-[#FAFAF933] transition-all duration-300 group-hover:w-10 group-hover:bg-[#11151A33]" />

                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#FAFAF944] transition-colors duration-300 group-hover:text-[#11151A55]">
                    SAK E&A
                  </span>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}