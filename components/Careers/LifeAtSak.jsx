'use client';

import { useState } from 'react';

const images = [
  '/img/life-at-sak/1.jpeg',
  '/img/life-at-sak/2.jpeg',
  '/img/life-at-sak/3.webp',
  '/img/life-at-sak/4.jpeg',
  '/img/life-at-sak/5.jpeg',
  '/img/life-at-sak/6.jpeg',
  '/img/life-at-sak/7.webp',
  '/img/life-at-sak/8.jpeg',
  '/img/life-at-sak/9.webp',

];

export default function LifeAtSak() {
  const [isPaused, setIsPaused] = useState(false);
  const track = [...images, ...images]; // duplicated for a seamless loop

  return (
    <section className="w-full py-16 sm:py-20" style={{ backgroundColor: '#11161A' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 max-w-2xl lg:mb-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#3E7CB1]" />
            <span className="text-[13px] font-medium" style={{ color: 'rgba(255,255,228,0.5)' }}>
              Life at SAK
            </span>
          </div>
          <h2
            className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: '#FAFAF9' }}
          >
            Life at SAK
          </h2>
          <p
            className="mt-5 max-w-xl text-[15px] leading-relaxed"
            style={{ color: 'rgba(255,255,228,0.65)' }}
          >
            Life at SAK is about collaboration, continuous learning and
            working together to turn ideas into practical solutions. Take a
            glimpse into our workplace, people and everyday environment.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="marquee-track flex w-max gap-6"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {track.map((src, i) => (
            <div
              key={i}
              className="h-56 w-80 shrink-0 overflow-hidden rounded-sm sm:h-64 sm:w-96"
            >
              <img
                src={src}
                alt="Life at SAK"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Edge fades so images don't hard-cut at the container edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24"
          style={{ background: 'linear-gradient(to right, #11161A, transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24"
          style={{ background: 'linear-gradient(to left, #11161A, transparent)' }}
        />
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 32s linear infinite;
        }

        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}