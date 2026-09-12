'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useHomeScroll } from '../ScrollProvider';
import {
  createGroundAndFoundation,
  createBuildingFrame,
  createScaffolding,
  createTowerCrane,
  createSiteClutter,
  createWorkerSprites,
  createDustParticles,
  lerp,
  easeOutCubic,
  easeInOutCubic,
  easeOutQuart,
  clamp01,
} from './geometry';

const INTRO_DURATION = 5.2;

export default function ExperienceCanvas() {
  const containerRef = useRef(null);
  const { setIntroComplete, scrollProgress } = useHomeScroll();
  const [introPlaying, setIntroPlaying] = useState(true);
  const scrollRef = useRef(0);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── 1. Scene Setup (Light Creamish Architectural Atmosphere) ───────────────
    const scene = new THREE.Scene();
    // Warm alabaster cream atmospheric fog
    scene.fog = new THREE.FogExp2(0xf4efe6, isMobile ? 0.015 : 0.0095);
    scene.background = new THREE.Color(0xf9f6f0);

    const camera = new THREE.PerspectiveCamera(
      44,
      window.innerWidth / window.innerHeight,
      0.1,
      350
    );
    // Initial camera close-up position
    camera.position.set(0.4, 1.8, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0xf9f6f0, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.20;
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // ── 2. Realistic Luxury Morning Construction Site Lighting ─────────────────
    // Warm champagne sky to warm sandstone ground bounce
    const hemiLight = new THREE.HemisphereLight(0xfff9ee, 0xe5d9c5, 1.15);
    scene.add(hemiLight);

    // Warm radiant morning sun (casts crisp architectural shadows)
    const sunLight = new THREE.DirectionalLight(0xfff5dc, 4.2);
    sunLight.position.set(18, 32, 16);
    sunLight.castShadow = !isMobile;
    if (!isMobile) {
      sunLight.shadow.mapSize.width = 1024;
      sunLight.shadow.mapSize.height = 1024;
      sunLight.shadow.bias = -0.0002;
      sunLight.shadow.camera.near = 0.5;
      sunLight.shadow.camera.far = 95;
      sunLight.shadow.camera.left = -28;
      sunLight.shadow.camera.right = 28;
      sunLight.shadow.camera.top = 32;
      sunLight.shadow.camera.bottom = -10;
    }
    scene.add(sunLight);

    // Soft warm sky fill
    const fillLight = new THREE.DirectionalLight(0xbfe0f7, 0.85);
    fillLight.position.set(-16, 18, -10);
    scene.add(fillLight);

    // Soft ambient bounce
    const ambLight = new THREE.AmbientLight(0xfcf9f2, 0.5);
    scene.add(ambLight);

    // ── 3. Physically Based Luxury Materials ──────────────────────────────────
    const materials = {
      groundMat: new THREE.MeshStandardMaterial({
        color: 0x544c42, // Warm architectural crushed gravel / earth
        metalness: 0.05,
        roughness: 0.94,
      }),
      concreteMat: new THREE.MeshStandardMaterial({
        color: 0xe2dbce, // Smooth warm limestone travertine concrete
        metalness: 0.03,
        roughness: 0.82,
      }),
      steelMat: new THREE.MeshStandardMaterial({
        color: 0x1c1917, // Deep architectural obsidian graphite steel
        metalness: 0.88,
        roughness: 0.32,
      }),
      scaffoldMat: new THREE.MeshStandardMaterial({
        color: 0x64748b, // Galvanized structural steel
        metalness: 0.82,
        roughness: 0.48,
      }),
      craneYellowMat: new THREE.MeshStandardMaterial({
        color: 0xf59e0b, // Signature engineering golden amber
        metalness: 0.65,
        roughness: 0.45,
      }),
      craneDarkMat: new THREE.MeshStandardMaterial({
        color: 0x1c1917, // Obsidian counterweights & cab trim
        metalness: 0.85,
        roughness: 0.45,
      }),
      cableMat: new THREE.MeshStandardMaterial({
        color: 0x1c1917,
        metalness: 0.9,
        roughness: 0.5,
      }),
      glassMat: new THREE.MeshPhysicalMaterial({
        color: 0x0284c7, // Reflective architectural sapphire solar glass
        metalness: 0.15,
        roughness: 0.03,
        transmission: 0.84,
        transparent: true,
        opacity: 0.88,
      }),
      timberMat: new THREE.MeshStandardMaterial({
        color: 0x9a5b2d, // Rich warm hardwood / cedar timber
        metalness: 0.0,
        roughness: 0.92,
      }),
      rebarMat: new THREE.MeshStandardMaterial({
        color: 0x292524, // High-tensile ribbed dark steel
        metalness: 0.85,
        roughness: 0.45,
      }),
      safetyConeMat: new THREE.MeshStandardMaterial({
        color: 0xf97316,
        metalness: 0.08,
        roughness: 0.35,
      }),
      safetyNetMat: new THREE.MeshBasicMaterial({
        color: 0x16a34a,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
      }),
      ductMat: new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.85,
        roughness: 0.28,
      }),
      pipeMat: new THREE.MeshStandardMaterial({
        color: 0xd97706, // Polished copper/bronze MEP pipe
        metalness: 0.88,
        roughness: 0.26,
      }),
    };

    // ── 4. Build Construction Site World ─────────────────────────────────────
    const world = new THREE.Group();
    scene.add(world);

    // Ground & Foundation Pad
    const ground = createGroundAndFoundation(materials);
    world.add(ground);

    // Multi-story building frame
    const building = createBuildingFrame(materials);
    world.add(building);

    // Tube-and-coupler scaffolding on right
    const scaffolding = createScaffolding(materials);
    world.add(scaffolding);

    // Tower Crane
    const crane = createTowerCrane(materials);
    world.add(crane.group);

    // Site Clutter (rebar, precast slabs, cones, container)
    const siteClutter = createSiteClutter(materials);
    world.add(siteClutter);

    // Worker silhouettes
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/img/worker.jpg';
    img.onload = () => {
      const cvs = document.createElement('canvas');
      cvs.width = img.width;
      cvs.height = img.height;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        // Transparent cutout for white background
        if (data[i] > 230 && data[i + 1] > 230 && data[i + 2] > 230) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      const workerTex = new THREE.CanvasTexture(cvs);
      workerTex.needsUpdate = true;
      const workerSprites = createWorkerSprites(workerTex);
      world.add(workerSprites);
    };

    // Warm sunlit dust particles
    const dust = createDustParticles(1800, isMobile);
    scene.add(dust);

    // ── 5. Mouse Parallax ────────────────────────────────────────────────────
    let mouseX = 0, mouseY = 0, tMouseX = 0, tMouseY = 0;
    const onMouseMove = (e) => {
      tMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      tMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let startTime = performance.now();
    let animId;
    let introDone = false;

    // ── 6. Animation & Cinematic Camera Dolly Loop ────────────────────────────
    const animate = (now) => {
      animId = requestAnimationFrame(animate);
      const elapsed = (now - startTime) / 1000;

      // Intro progress (0 to 1 over 5.2 seconds)
      const introT = reducedMotion ? 1 : clamp01(elapsed / INTRO_DURATION);
      const introEased = easeInOutCubic(introT);

      if (introT >= 1 && !introDone) {
        introDone = true;
        setIntroPlaying(false);
        setIntroComplete(true);
      }

      // Smooth mouse
      mouseX = lerp(mouseX, tMouseX, 0.04);
      mouseY = lerp(mouseY, tMouseY, 0.04);

      // Crane gentle slewing rotation (feels alive)
      if (crane?.slewingGroup) {
        crane.slewingGroup.rotation.y = Math.sin(elapsed * 0.16) * 0.38 + 0.25;
      }

      // Upward floating dust drift
      if (dust?.geometry?.attributes?.position) {
        const pArr = dust.geometry.attributes.position.array;
        for (let i = 1; i < pArr.length; i += 3) {
          pArr[i] += 0.018;
          if (pArr[i] > 32) pArr[i] = 0.2;
        }
        dust.geometry.attributes.position.needsUpdate = true;
      }

      const scroll = scrollRef.current;

      // ── CAMERA PATH CHOREOGRAPHY ──────────────────────────────────────────
      const camPos = new THREE.Vector3();
      const lookAt = new THREE.Vector3();

      if (introT < 1) {
        // ── INTRO: Start close-up at column base → pull back to wide reveal
        const t = introEased;
        camPos.set(
          lerp(0.4, 2.5, t) + mouseX * lerp(0.05, 0.4, t),
          lerp(1.8, 8.8, t) + mouseY * lerp(0.05, 0.3, t),
          lerp(7.2, 29.0, t)
        );
        lookAt.set(
          lerp(0, 0, t),
          lerp(2.2, 7.8, t),
          lerp(4.2, 0, t)
        );
      } else {
        // ── SCROLL-DRIVEN CINEMATIC WAYPOINTS ────────────────────────────────
        const t = scroll;

        if (t < 0.15) {
          // Beat 0: Hero Establishing — wide view of active site
          const p = t / 0.15;
          camPos.set(
            lerp(2.5, 0.5, p) + mouseX * 0.5,
            lerp(8.8, 7.0, p) - mouseY * 0.35,
            lerp(29.0, 25.0, p)
          );
          lookAt.set(0, lerp(7.8, 6.8, p), 0);

        } else if (t < 0.32) {
          // Beat 1: CIVIL — descends to ground level, inspects foundation & columns
          const p = (t - 0.15) / 0.17;
          camPos.set(
            lerp(1.5, -6.0, easeInOutCubic(p)) + mouseX * 0.4,
            lerp(6.0, 3.2, p) - mouseY * 0.3,
            lerp(21.0, 16.0, p)
          );
          lookAt.set(lerp(0, -1.0, p), lerp(6.0, 3.5, p), 0);

        } else if (t < 0.50) {
          // Beat 2: ARCHITECTURE — rises alongside scaffolding, views facade taking form
          const p = (t - 0.32) / 0.18;
          camPos.set(
            lerp(-6.0, 11.5, easeInOutCubic(p)) + mouseX * 0.45,
            lerp(3.2, 9.8, easeInOutCubic(p)) - mouseY * 0.3,
            lerp(16.0, 8.5, p)
          );
          lookAt.set(lerp(-1.0, 3.0, p), lerp(3.5, 8.5, p), 0);

        } else if (t < 0.68) {
          // Beat 3: MECHANICAL — moves closer into building to reveal MEP ducts & piping
          const p = (t - 0.50) / 0.18;
          camPos.set(
            lerp(11.5, 2.0, easeInOutCubic(p)) + mouseX * 0.35,
            lerp(9.8, 5.8, easeInOutCubic(p)) - mouseY * 0.25,
            lerp(8.5, 6.5, p)
          );
          lookAt.set(lerp(3.0, 0, p), lerp(8.5, 5.2, p), 0.5);

        } else if (t < 0.84) {
          // Beat 4: INTEGRATION — high aerial overview, crane and all disciplines
          const p = (t - 0.68) / 0.16;
          camPos.set(
            lerp(2.0, -14.0, easeInOutCubic(p)) + mouseX * 0.6,
            lerp(5.8, 22.0, easeInOutCubic(p)) - mouseY * 0.4,
            lerp(6.5, 22.0, p)
          );
          lookAt.set(0, lerp(5.2, 8.0, p), 0);

        } else {
          // Beat 5: CTA FINALE — grand pulled-back view of the engineered structure
          const p = (t - 0.84) / 0.16;
          camPos.set(
            lerp(-14.0, 0, easeInOutCubic(p)) + mouseX * 0.7,
            lerp(22.0, 26.0, easeInOutCubic(p)) - mouseY * 0.4,
            lerp(22.0, 32.0, easeInOutCubic(p))
          );
          lookAt.set(0, lerp(8.0, 8.0, p), 0);
        }
      }

      // Smooth camera interpolation (cinematic dolly feel)
      camera.position.lerp(camPos, 0.055);
      const currentDir = new THREE.Vector3();
      camera.getWorldDirection(currentDir);
      const currentLookAt = currentDir.multiplyScalar(15).add(camera.position);
      currentLookAt.lerp(lookAt, 0.055);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
      Object.values(materials).forEach((m) => m.dispose());
      dust.geometry.dispose();
      dust.material.dispose();
    };
  }, [setIntroComplete]);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#F9F6F0]"
        aria-hidden="true"
      />
      {introPlaying && (
        <div className="fixed inset-0 z-[5] pointer-events-none flex flex-col justify-between p-6 sm:p-10">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2.5 bg-white/90 shadow-md backdrop-blur-md px-4 py-2 rounded-full border border-[#2563EB]/25">
              <span className="h-2 w-2 rounded-full bg-[#2563EB] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase font-bold text-[#1F2937]">
                SAK Engineering · Active 3D Site Simulation
              </span>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-1 text-[9px] font-mono text-slate-500 tracking-widest uppercase">
              <span>Civil · Architecture · Mechanical</span>
              <span>Site Survey Active · Daylight Camera</span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">
              Scale 1:1 · Real-time 3D Site
            </div>
            <div className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">
              Scroll to Explore ↓
            </div>
          </div>
        </div>
      )}
    </>
  );
}