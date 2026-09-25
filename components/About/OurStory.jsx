"use client";

import { motion } from "framer-motion";
import { FiArrowDownRight } from "react-icons/fi";

export default function OurStory() {
  return (
    <section
      className="w-full overflow-hidden"
      style={{ backgroundColor: "#11151A" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-10 lg:py-36">

        {/* Top Row */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[25%_75%]">

          {/* Small Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-start"
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
                Our Story
              </span>
            </div>
          </motion.div>

          {/* Main Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
          >
            <p
              className="text-3xl font-light leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
              style={{ color: "#FAFAF9" }}
            >
              Built from{" "}
              <span style={{ color: "#FAFAF999" }}>Engineering.</span>
              <br />
              Driven by{" "}
              <span style={{ color: "#FAFAF9" }}>Vision.</span>
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
          className="mt-16 h-px origin-left sm:mt-20"
          style={{ backgroundColor: "#FAFAF91A" }}
        />

        {/* Story Content */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[25%_1fr] lg:gap-16">

          {/* Side Element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="hidden lg:block"
          >
            <div className="sticky top-32">
              <p
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: "#FAFAF966" }}
              >
                From Precision
              </p>

              <FiArrowDownRight
                className="mt-8"
                size={38}
                strokeWidth={1}
                style={{ color: "#FAFAF9" }}
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            className="max-w-3xl"
          >
            {/* Opening */}
            <p
              className="text-lg font-light leading-relaxed sm:text-xl"
              style={{ color: "#FAFAF9" }}
            >
              SAK Engineering &amp; Architect was established with a simple
              belief:
            </p>

            {/* Highlight Quote */}
            <div
              className="my-8 border-l-2 pl-6 sm:my-10 sm:pl-8"
              style={{ borderColor: "#FAFAF9" }}
            >
              <p
                className="text-2xl font-light leading-snug sm:text-3xl"
                style={{ color: "#FAFAF9" }}
              >
                Engineering should not only solve problems — it should create
                better possibilities.
              </p>
            </div>

            {/* Paragraphs */}
            <div
              className="space-y-6 text-[15px] leading-[1.8] sm:text-base"
              style={{ color: "#FAFAF9B3" }}
            >
              <p>
                The company began with the objective of bringing together
                engineering precision, architectural creativity, and modern
                digital design technologies under one platform.
              </p>

              <p>
                As the industry increasingly moves toward BIM, digital
                engineering, advanced visualization, multidisciplinary
                coordination, and technology-driven design, SAK E&amp;A has
                evolved to address these requirements through an integrated
                approach.
              </p>

              <p>
                Our journey has expanded from individual design services into
                a multidisciplinary practice capable of supporting projects
                across{" "}
                <span style={{ color: "#FAFAF9" }}>
                  interior &amp; architecture, civil engineering, structural
                  engineering, mechanical engineering, BIM and visualization.
                </span>
              </p>

              <p>
                Today, SAK E&amp;A continues to grow with an international
                outlook, working toward building long-term relationships with
                clients, consultants, contractors, developers, and
                organizations across different markets.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
          className="mt-20 border-t pt-8 sm:mt-28"
          style={{ borderColor: "#FAFAF91A" }}
        >
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <p
              className="max-w-xl text-sm leading-relaxed"
              style={{ color: "#FAFAF966" }}
            >
              From individual expertise to an integrated multidisciplinary
              practice.
            </p>

            <p
              className="text-xs font-medium uppercase tracking-[0.25em]"
              style={{ color: "#FAFAF9" }}
            >
              SAK E&amp;A
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}