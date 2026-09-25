"use client";

import { motion } from "framer-motion";
import {
  FiLayers,
  FiPenTool,
  FiCpu,
  FiGlobe,
  FiUsers,
} from "react-icons/fi";

const differences = [
  {
    number: "01",
    icon: FiLayers,
    title: "Multidisciplinary Expertise",
    description:
      "Civil, architecture, mechanical, MEP, BIM and visualization under one team.",
  },
  {
    number: "02",
    icon: FiPenTool,
    title: "Engineering + Design",
    description:
      "Technical engineering combined with thoughtful architectural design.",
  },
  {
    number: "03",
    icon: FiCpu,
    title: "Technology Driven",
    description:
      "Modern CAD, BIM, analysis, simulation and visualization workflows.",
  },
  {
    number: "04",
    icon: FiGlobe,
    title: "International Perspective",
    description:
      "Project experience extending across local and international markets.",
  },
  {
    number: "05",
    icon: FiUsers,
    title: "Client-Centric Approach",
    description:
      "Solutions shaped around your requirements, objectives and constraints.",
  },
];

export default function WhatMakesUsDifferent() {
  return (
    <section
      className="w-full overflow-hidden"
      style={{ backgroundColor: "#FAFAF9" }}
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
                style={{ backgroundColor: "#11151A" }}
              />

              <span
                className="text-[12px] font-medium uppercase tracking-[0.25em]"
                style={{ color: "#11151A99" }}
              >
                What Makes Us Different?
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
              className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: "#11151A" }}
            >
              One team.
              <br />
              Multiple perspectives.
            </h2>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 border-l border-t border-[#11151A]/10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-5">

          {differences.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex min-h-[300px] flex-col justify-between border-b border-r border-[#11151A]/10 bg-[#FAFAF9] p-6 transition-all duration-300 hover:bg-[#11151A] sm:p-7 lg:min-h-[360px] lg:p-8"
              >
                {/* Top */}
                <div className="flex items-start justify-between">

                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300"
                    style={{
                      borderColor: "#11151A1A",
                    }}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className="text-[#11151A] transition-colors duration-300 group-hover:text-[#FAFAF9]"
                    />
                  </div>

                  <span
                    className="text-[11px] font-medium tracking-wider text-[#11151A55] transition-colors duration-300 group-hover:text-[#FAFAF966]"
                  >
                    {item.number}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-12">

                  <h3 className="text-xl font-medium leading-tight tracking-tight text-[#11151A] transition-colors duration-300 group-hover:text-[#FAFAF9]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[#11151A88] transition-colors duration-300 group-hover:text-[#FAFAF9B3]">
                    {item.description}
                  </p>

                </div>

                {/* Bottom Line */}
                <div className="mt-8 flex items-center gap-2">

                  <span className="h-px w-5 bg-[#11151A33] transition-all duration-300 group-hover:w-10 group-hover:bg-[#FAFAF966]" />

                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#11151A55] transition-colors duration-300 group-hover:text-[#FAFAF966]">
                    SAK E&A
                  </span>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p
            className="max-w-xl text-sm leading-relaxed"
            style={{ color: "#11151A88" }}
          >
            Integrated expertise, modern technology and a clear focus on
            delivering practical outcomes.
          </p>

          <span
            className="text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: "#11151A" }}
          >
            Built Different
          </span>
        </motion.div>

      </div>
    </section>
  );
}