"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80",
];

const letters = ["S", "A", "K", "E", "&", "A"];

export default function BrandingSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] w-full"
    //   style={{ backgroundColor: "#FAFAF9" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl px-6 lg:px-10">

          {/* Letters */}
          <div className="flex items-center justify-center">

            {letters.map((letter, index) => {
              const start = 0.12 + index * 0.10;
              const end = start + 0.12;

              const opacity = useTransform(
                scrollYProgress,
                [start, end],
                [0, 1]
              );

              const scale = useTransform(
                scrollYProgress,
                [start, end],
                [0.92, 1]
              );

              return (
                <div
                  key={`${letter}-${index}`}
                  className={`
    relative shrink-0
    ${index === 3 ? "ml-3 sm:ml-8 lg:ml-12" : ""}
  `}
                  style={{
                    width: "clamp(55px, 14vw, 160px)",
                    height: "clamp(100px, 18vw, 220px)",
                  }}
                >
                  {/* Empty Letter */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      fontSize: "clamp(5rem, 17vw, 13rem)",
                      fontWeight: 900,
                      lineHeight: 0.8,
                      fontFamily: "Poppins, sans-serif",
                      color: "#e5e5dc",
                    }}
                  >
                    {letter}
                  </div>

                  {/* Image ONLY inside the letter */}
                  <motion.span
                    style={{
                      opacity,
                      scale,
                      fontSize: "clamp(5rem, 17vw, 13rem)",
                      fontWeight: 900,
                      lineHeight: 0.8,
                      fontFamily: "Poppins, sans-serif",

                      color: "transparent",

                      backgroundImage: `url(${images[index]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",

                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {letter}
                  </motion.span>
                </div>
              );
            })}
          </div>

          {/* Bottom Text */}
          <motion.div
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0.72, 0.85],
                [0, 1]
              ),
              y: useTransform(
                scrollYProgress,
                [0.72, 0.85],
                [30, 0]
              ),
            }}
            className="mt-8 text-center sm:mt-10"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#11161A]/60 sm:text-sm">
              Engineering and architecture
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}