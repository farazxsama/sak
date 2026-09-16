"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
];

export default function ArrowImageSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /*
    Each arrow gets its own portion of the scroll progress.

    Arrow 1 → 0.15 - 0.30
    Arrow 2 → 0.28 - 0.43
    Arrow 3 → 0.41 - 0.56
    Arrow 4 → 0.54 - 0.69
  */

  const arrow1Opacity = useTransform(
    scrollYProgress,
    [0.12, 0.25],
    [0, 1]
  );

  const arrow2Opacity = useTransform(
    scrollYProgress,
    [0.27, 0.40],
    [0, 1]
  );

  const arrow3Opacity = useTransform(
    scrollYProgress,
    [0.42, 0.55],
    [0, 1]
  );

  const arrow4Opacity = useTransform(
    scrollYProgress,
    [0.57, 0.70],
    [0, 1]
  );

  const arrow1Scale = useTransform(
    scrollYProgress,
    [0.12, 0.25],
    [0.94, 1]
  );

  const arrow2Scale = useTransform(
    scrollYProgress,
    [0.27, 0.40],
    [0.94, 1]
  );

  const arrow3Scale = useTransform(
    scrollYProgress,
    [0.42, 0.55],
    [0.94, 1]
  );

  const arrow4Scale = useTransform(
    scrollYProgress,
    [0.57, 0.70],
    [0.94, 1]
  );

  const opacities = [
    arrow1Opacity,
    arrow2Opacity,
    arrow3Opacity,
    arrow4Opacity,
  ];

  const scales = [
    arrow1Scale,
    arrow2Scale,
    arrow3Scale,
    arrow4Scale,
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-[180vh] w-full"
      style={{ backgroundColor: "#ffffe4" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl px-6 lg:px-10">

          {/* Heading */}
          <motion.div
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0, 0.12],
                [0, 1]
              ),
            }}
            className="mb-14 text-center"
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#11161A]/60">
              Our Work
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#11161A] sm:text-5xl lg:text-6xl">
              Projects That Move Forward
            </h2>
          </motion.div>

          {/* Arrow Row */}
          <div className="flex w-full items-center justify-center">

            {images.map((image, index) => (
              <div
                key={image}
                className={`
                  relative
                  h-[180px]
                  w-[180px]
                  shrink-0
                  sm:h-[220px]
                  sm:w-[220px]
                  lg:h-[280px]
                  lg:w-[280px]
                  ${index !== 0 ? "-ml-[45px] sm:-ml-[55px] lg:-ml-[70px]" : ""}
                `}
                style={{
                  clipPath:
                    "polygon(0% 0%, 62% 0%, 100% 50%, 62% 100%, 0% 100%, 38% 50%)",
                  zIndex: images.length - index,
                }}
              >

                {/* Empty arrow */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: "#e8e8df",
                  }}
                />

                {/* Image inside arrow */}
                <motion.div
                  style={{
                    opacity: opacities[index],
                    scale: scales[index],
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="absolute inset-0"
                />

              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}