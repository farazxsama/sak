"use client";

import { motion } from "framer-motion";

const team = [
  {
    name: "Mohammed Safwan Ali Khan",
    role: "Founder & CEO",
    title: "Chief Engineering Designer",
    description:
      "Mohammed Safwan Ali Khan is the Founder and CEO of SAK Engineering & Architect, with 4+ years of professional experience in engineering and architectural design. His expertise spans civil engineering, structural design, architectural design, BIM, infrastructure planning, 3D visualization and multidisciplinary project coordination. He has been involved in the development and delivery of diverse projects ranging from residential and commercial buildings to industrial facilities, infrastructure developments and international engineering projects.",
    image:
      "/img/team/ceo.jpeg",
  },
  {
    name: "Mohammed Dayyan Ali Khan",
    role: "General Manager — Mechanical Engineering",
    title: "Mechanical Engineer | 4+ Years Experience",
    description:
      "Mohammed Dayyan Ali Khan serves as General Manager at SAK E&A, specializing in mechanical engineering and design. With experience in complex industrial and engineering environments, his project exposure includes work associated with Amaala, Saudi Arabia, Hitachi Energy and ABB. His role focuses on mechanical design coordination, engineering development and supporting multidisciplinary project delivery.",
    projects: ["Amaala — Saudi Arabia", "Hitachi Energy", "ABB"],
    image:
      "/img/team/general-manager.jpeg",
  },
  {
    name: "Mohammed Sadathullah Khan",
    role: "Managing Director & Chief Mechanical Designer",
    title: "Mechanical Engineer | 30+ Years Experience",
    description:
      "With more than 30 years of professional experience, Mohammed Sadathullah Khan brings extensive expertise in mechanical engineering and industrial project environments to SAK E&A.",
    image:
      "/img/team/managing-director.jpeg",
  },
];

export default function LeadershipTeam() {
  return (
    <section
      className="w-full overflow-hidden"
      style={{ backgroundColor: "#FAFAF9" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-10 lg:py-36">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 sm:mb-20 lg:mb-28"
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
              Leadership
            </span>
          </div>

          <h2
            className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: "#11151A" }}
          >
            The people behind
            <br />
            <span style={{ color: "#11151A66" }}>SAK E&amp;A.</span>
          </h2>
        </motion.div>

        {/* Team */}
        <div className="flex flex-col gap-20 sm:gap-28 lg:gap-36">
          {team.map((person, index) => {
            const imageLeft = index % 2 === 0;

            return (
              <div
                key={person.name}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20"
              >
                {/* Image */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: imageLeft ? -40 : 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative h-[400px] w-full sm:h-[500px] lg:h-[600px] ${
                    imageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: imageLeft ? 40 : -40,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`${
                    imageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {/* Number */}
                  <span
                    className="text-[11px] font-medium tracking-[0.2em]"
                    style={{ color: "#11151A55" }}
                  >
                    0{index + 1}
                  </span>

                  {/* Role */}
                  <p
                    className="mt-6 text-xs font-medium uppercase tracking-[0.2em]"
                    style={{ color: "#11151A88" }}
                  >
                    {person.role}
                  </p>

                  {/* Name */}
                  <h3
                    className="mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                    style={{ color: "#11151A" }}
                  >
                    {person.name}
                  </h3>

                  {/* Title */}
                  <p
                    className="mt-4 text-sm font-medium"
                    style={{ color: "#11151A99" }}
                  >
                    {person.title}
                  </p>

                  {/* Divider */}
                  <div
                    className="my-7 h-px w-16"
                    style={{ backgroundColor: "#11151A" }}
                  />

                  {/* Description */}
                  <p
                    className="max-w-lg text-[15px] leading-[1.8]"
                    style={{ color: "#11151Ab3" }}
                  >
                    {person.description}
                  </p>

                  {/* Selected Project Exposure */}
                  {person.projects && (
                    <div className="mt-8">
                      <p
                        className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em]"
                        style={{ color: "#11151A66" }}
                      >
                        Selected Project Exposure
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {person.projects.map((project) => (
                          <span
                            key={project}
                            className="border px-3 py-2 text-xs"
                            style={{
                              borderColor: "#11151A22",
                              color: "#11151Acc",
                            }}
                          >
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}