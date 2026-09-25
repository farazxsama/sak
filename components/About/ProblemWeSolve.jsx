"use client";

import { motion } from "framer-motion";
import {
  FiAlertCircle,
  FiLayers,
  FiMessageSquare,
  FiRefreshCw,
  FiClock,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";

const problems = [
  {
    icon: FiLayers,
    title: "Coordination Issues",
    description:
      "Multiple disciplines working independently can make coordination difficult.",
  },
  {
    icon: FiAlertCircle,
    title: "Design Conflicts",
    description:
      "Disconnected design decisions can create clashes between engineering disciplines.",
  },
  {
    icon: FiMessageSquare,
    title: "Communication Gaps",
    description:
      "Information spread across different teams can lead to misunderstandings and missed details.",
  },
  {
    icon: FiRefreshCw,
    title: "Rework",
    description:
      "Uncoordinated designs can result in revisions, repeated work and unnecessary effort.",
  },
  {
    icon: FiClock,
    title: "Project Delays",
    description:
      "Coordination problems can affect timelines and make execution more complicated.",
  },
];

const process = [
  "Concept",
  "Design",
  "Engineering",
  "BIM",
  "Visualization",
  "Construction Documentation",
];

export default function ProblemWeSolve() {
  return (
    <section
      className="w-full overflow-hidden"
      style={{ backgroundColor: "#FAFAF9" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-10 lg:py-36">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="mb-5 flex items-center gap-3">
            <span
              className="h-px w-8"
              style={{ backgroundColor: "#11151A" }}
            />

            <span
              className="text-[12px] font-medium uppercase tracking-[0.25em]"
              style={{ color: "#11151A99" }}
            >
              What Problem Do We Solve?
            </span>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h2
              className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: "#11151A" }}
            >
              Making complex projects
              <br />
              easier to coordinate.
            </h2>

            <p
              className="max-w-md text-sm leading-relaxed lg:pb-1"
              style={{ color: "#11151A99" }}
            >
              Modern projects require multiple disciplines to work together.
              We bring them closer through integrated design thinking.
            </p>
          </div>
        </motion.div>

        {/* Problem Cards */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">

          {problems.map((problem, index) => {
            const Icon = problem.icon;

            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative min-h-[220px] border border-[#11151A]/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#11151A]/20"
              >
                <div className="flex h-full flex-col justify-between">

                  <div>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full border"
                      style={{
                        borderColor: "#11151A1A",
                        color: "#11151A",
                      }}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>

                    <h3
                      className="mt-8 text-lg font-medium tracking-tight"
                      style={{ color: "#11151A" }}
                    >
                      {problem.title}
                    </h3>

                    <p
                      className="mt-3 text-sm leading-relaxed"
                      style={{ color: "#11151A99" }}
                    >
                      {problem.description}
                    </p>
                  </div>

                  <span
                    className="mt-8 text-[10px] font-medium uppercase tracking-[0.2em]"
                    style={{ color: "#11151A55" }}
                  >
                    0{index + 1}
                  </span>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-5 grid grid-cols-1 overflow-hidden bg-[#11151A] lg:grid-cols-[30%_70%]"
        >
          {/* Left */}
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">

            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#FAFAF999]">
                Our Approach
              </span>

              <h3 className="mt-5 max-w-xs text-3xl font-light leading-tight tracking-tight text-[#FAFAF9] sm:text-4xl">
                Integrated
                <br />
                Design Thinking
              </h3>
            </div>

            <div className="mt-10 flex items-center gap-2 text-[#FAFAF966]">
              <FiCheck size={15} />
              <span className="text-xs">
                One coordinated approach
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="border-t border-[#FAFAF91A] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">

            <p className="max-w-2xl text-base leading-relaxed text-[#FAFAF9B3] sm:text-lg">
              SAK E&amp;A brings multiple disciplines together to help clients
              move from concept to construction documentation with greater
              coordination, clarity and control.
            </p>

            {/* Process */}
            <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">

              {process.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="flex min-h-[100px] flex-col justify-between border border-[#FAFAF91A] p-4"
                >
                  <span className="text-[10px] text-[#FAFAF966]">
                    0{index + 1}
                  </span>

                  <span className="text-[12px] font-medium leading-snug text-[#FAFAF9]">
                    {item}
                  </span>

                  {index < process.length - 1 && (
                    <FiArrowRight
                      size={14}
                      className="hidden text-[#FAFAF955] sm:block"
                    />
                  )}
                </motion.div>
              ))}

            </div>
          </div>
        </motion.div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 flex flex-col gap-4 border-t border-[#11151A]/10 pt-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <p
            className="max-w-2xl text-sm leading-relaxed"
            style={{ color: "#11151A99" }}
          >
            Our objective is simple: reduce complexity while delivering
            designs that are technically sound, visually compelling and
            practical to execute.
          </p>

          <span
            className="text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: "#11151A" }}
          >
            One Team. Multiple Disciplines.
          </span>
        </motion.div>

      </div>
    </section>
  );
}