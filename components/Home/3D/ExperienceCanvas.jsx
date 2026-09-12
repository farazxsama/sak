'use client';

/**
 * ExperienceCanvas — Real-Time 3D Architectural Cinematic Canvas
 * 
 * Embeds SAK WorldEngine:
 *  - Real-time Three.js 3D world
 *  - Volumetric clouds, modern corporate tower, structural skeleton, and mechanical systems
 *  - 15-shot cinematic camera scrubber mapped to Lenis scroll
 *  - Minimal luxury HUD with live telemetry and chapter labels
 *  - Interactive depth inspection
 */

import { useEffect, useRef, useState } from 'react';
import { useHomeScroll } from '../ScrollProvider';
import { WorldEngine } from './WorldEngine';

export default function ExperienceCanvas() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const { scrollProgress } = useHomeScroll();
  const [isLoaded, setIsLoaded] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let engine = null;
    let animId = null;

    try {
      engine = new WorldEngine(canvas);
      engineRef.current = engine;
      setIsLoaded(true);
    } catch (err) {
      console.error('Failed to initialize 3D WorldEngine:', err);
      return;
    }

    // Continuous 60fps Animation Loop
    const renderLoop = () => {
      if (engine && !engine.isDisposed) {
        engine.update(
          engine.targetScroll,
          mouseRef.current.x,
          mouseRef.current.y
        );
      }
      animId = requestAnimationFrame(renderLoop);
    };
    animId = requestAnimationFrame(renderLoop);

    // Mouse movement & Dragging for interactive 3D inspection
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const handlePointerDown = (e) => {
      if (e.target && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON')) return;
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handlePointerMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (isDragging && engine && !engine.isDisposed) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        engine.addOrbitDelta(dx, dy);
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    // Window Resize Handler
    const handleResize = () => {
      if (engine && !engine.isDisposed) {
        engine.resize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (engine) {
        engine.dispose();
      }
    };
  }, []); // Run once on mount

  // Keep engine informed of scroll progress updates
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.targetScroll = scrollProgress;
    }
  }, [scrollProgress]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      {/* Real-time 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none pointer-events-auto cursor-grab active:cursor-grabbing"
      />

      {/* SAK Minimal Luxury Preloader */}
      <div
        className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#1B1916] transition-opacity duration-1000 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6A15B] animate-ping" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#D8C08A] font-bold">
              SAK ENGINEERING &amp; ARCHITECT
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-tight text-[#FFFDF8] uppercase font-mono">
            INITIALIZING 3D WORLD
          </div>
          <div className="font-mono text-[11px] text-[#77736B] tracking-[0.25em]">
            CIVIL &bull; ARCHITECTURE &bull; MECHANICAL
          </div>
        </div>
      </div>

    </div>
  );
}