"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

const services = [
  {
    title: "Civil & Architectural",
    description:
      "From planning and design to detailed architectural solutions, we create spaces that balance function, form and lasting value.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
    href: '/services/civil-architectural'
  },
  {
    title: "Mechanical Engineering",
    description:
      "Engineering reliable mechanical systems with precision, efficiency and performance at every stage.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1800&q=85",
    href: '/services/mechanical-engineering'
  },
];

export default function Services3d() {


  const [activeIndex, setActiveIndex] = useState(null);

  const router = useRouter();

  return (
    <section className="w-full bg-[#11161A] text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">

        {/* Top Heading */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[25%_75%]">

          {/* Small Label */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
              Services
            </p>
          </div>

          {/* Main Heading */}
          <div>
            <h2 className="max-w-3xl text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              How <span className="font-normal">SAK E&A</span>
              <br />
              Can Help You
            </h2>
          </div>
        </div>

        {/* Services */}
        <div className="mt-20 lg:mt-28">

          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={service.title}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className="cursor-pointer group relative overflow-hidden border-t border-white/20"
                onClick={()=>router.push(service.href)}
              >
                {/* Background Image */}
                <motion.div
                  initial={false}
                  animate={{
                    y: isActive ? "0%" : "100%",
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 z-0"
                >
                  <img
                    src={service.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/60" />
                </motion.div>

                {/* Service Row */}
                <div className="relative z-10 flex min-h-[220px] items-center px-2 py-10 sm:min-h-[280px] sm:px-6 lg:min-h-[330px] lg:px-10">

                  {/* Left Description */}
                  <div className="hidden w-[25%] lg:block">
                    <p
                      className={`
                        max-w-[230px]
                        text-xs
                        leading-relaxed
                        transition-colors
                        duration-300
                        ${
                          isActive
                            ? "text-white/90"
                            : "text-white/50"
                        }
                      `}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Service Title */}
                  <div className="flex flex-1 items-center justify-between gap-6">

                    <motion.h3
                      animate={{
                        x: isActive ? 15 : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        text-4xl
                        font-light
                        leading-none
                        tracking-tight
                        sm:text-6xl
                        lg:text-7xl
                        xl:text-8xl
                      "
                    >
                      {service.title}
                    </motion.h3>

                    {/* Arrow */}
                    <motion.div
                      animate={{
                        x: isActive ? 0 : -10,
                        opacity: isActive ? 1 : 0.5,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-16 sm:w-16"
                    >
                      <FiArrowUpRight
                        className="rotate-45"
                        size={40}
                        strokeWidth={1}
                      />
                    </motion.div>

                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom Border */}
          <div className="border-t border-white/20" />

        </div>
      </div>
    </section>
  );
}