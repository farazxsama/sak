"use client";

import { motion } from "framer-motion";

export default function WhoWeAre() {
  return (
    <section
      className="w-full py-16 sm:py-20"
      style={{ backgroundColor: "#FAFAF9" }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Label */}
          <div className="mb-5 flex items-center gap-3">
            <span
              className="h-px w-8"
              style={{ backgroundColor: "#11161A" }}
            />

            <span
              className="text-[13px] font-medium"
              style={{ color: "#11161A99" }}
            >
              About Us
            </span>
          </div>

          {/* Heading */}
          <h2
            className="max-w-md text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: "#11161A" }}
          >
            Engineering expertise. Thoughtful design. Global impact.
          </h2>

          {/* Description */}
          <div
            className="mt-6 flex max-w-lg flex-col gap-4 text-[15px] leading-relaxed"
            style={{ color: "#11161Ab3" }}
          >
            <p>
              <strong style={{ color: "#11161A" }}>
                SAK Engineering &amp; Architect
              </strong>{" "}
              is a multidisciplinary engineering and architectural design
              company established in <strong>2023</strong> and headquartered
              in Hyderabad, India.
            </p>

            <p>
              We bring together expertise in civil and structural engineering,
              architecture, BIM, MEP, mechanical design, infrastructure,
              industrial and interior design, and 3D visualization to deliver
              integrated, practical, and buildable solutions.
            </p>

            <p>
              Led by Founder &amp; CEO{" "}
              <strong style={{ color: "#11161A" }}>
                Mohammed Safwan Ali Khan
              </strong>
              , with 4+ years of professional experience, SAK E&amp;A has
              delivered <strong>200+ projects</strong> with a team of{" "}
              <strong>10+ professionals</strong> across India and international
              markets.
            </p>

            <p>
              From residential and commercial buildings to industrial
              facilities, infrastructure, and international engineering
              projects, we transform concepts into precise and efficient
              designs.
            </p>
          </div>

          {/* Company Highlights */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#11161A]/10 pt-6">
            <div>
              <p
                className="text-2xl font-semibold sm:text-3xl"
                style={{ color: "#11161A" }}
              >
                2023
              </p>
              <p
                className="mt-1 text-[11px] uppercase tracking-[0.15em]"
                style={{ color: "#11161A99" }}
              >
                Established
              </p>
            </div>

            <div>
              <p
                className="text-2xl font-semibold sm:text-3xl"
                style={{ color: "#11161A" }}
              >
                200+
              </p>
              <p
                className="mt-1 text-[11px] uppercase tracking-[0.15em]"
                style={{ color: "#11161A99" }}
              >
                Projects
              </p>
            </div>

            <div>
              <p
                className="text-2xl font-semibold sm:text-3xl"
                style={{ color: "#11161A" }}
              >
                10+
              </p>
              <p
                className="mt-1 text-[11px] uppercase tracking-[0.15em]"
                style={{ color: "#11161A99" }}
              >
                Professionals
              </p>
            </div>
          </div>

          {/* Tagline */}
          <p
            className="mt-7 text-sm font-medium italic tracking-wide"
            style={{ color: "#11161A" }}
          >
            “Our Services Are Our Identity.”
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.15,
          }}
          className="relative h-[320px] w-full lg:h-[460px]"
        >
          <img
            src="/img/sak-logo.png"
            alt="SAK engineers working on architectural drafts"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}