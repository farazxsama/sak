'use client';

import { useState } from 'react';

const images = [
  'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1609867271967-a82f85c48531?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1706074793638-da28b90ea8ae?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1781888688940-5730c3fd5baf?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1763251177167-85a9ca1966a8?q=80&w=900&auto=format&fit=crop',
];

export default function LifeAtSAK() {
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
            style={{ color: '#ffffe4' }}
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