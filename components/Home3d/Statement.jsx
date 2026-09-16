'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GRADIENT =
  'linear-gradient(135deg, #1a3a5c 0%, #2d6a9f 25%, #4a90c4 45%, #c8a882 65%, #b8865a 80%, #8b5e3c 100%)';

function Letter({ char, start, end, progress }) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [60, 0]);
  const scale = useTransform(progress, [start, end], [0.85, 1]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        scale,
        display: 'inline-block',
        backgroundImage: GRADIENT,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {char}
    </motion.span>
  );
}

export default function Statement() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const letters = [
    { char: 'F', start: 0.10, end: 0.25 },
    { char: 'I', start: 0.25, end: 0.40 },
    { char: 'N', start: 0.40, end: 0.55 },
    { char: 'D', start: 0.55, end: 0.70 },
  ];

  const subOpacity = useTransform(scrollYProgress, [0.72, 0.85], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.72, 0.85], [30, 0]);

  return (
    <section ref={ref} className="relative mt-32 h-[250vh] w-full bg-transparent">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center justify-center px-6 text-center">

          <h2
            className="font-black leading-none tracking-tighter"
            style={{ fontSize: 'clamp(5.5rem, 18vw, 13rem)' }}
          >
            {letters.map((l) => (
              <Letter
                key={l.char}
                char={l.char}
                start={l.start}
                end={l.end}
                progress={scrollYProgress}
              />
            ))}
          </h2>

          <motion.p
            style={{
              opacity: subOpacity,
              y: subY,
              fontSize: 'clamp(1.6rem, 4.8vw, 3.4rem)',
              letterSpacing: '0.12em',
              backgroundImage:
                'linear-gradient(135deg, #2d5a8e 0%, #4a7fb5 40%, #a07850 70%, #7a5535 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            className="mt-2 font-light"
          >
            Real Estate
          </motion.p>

        </div>
      </div>
    </section>
  );
}