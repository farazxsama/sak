'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas({ onIntroComplete = () => {} }) {
  const containerRef = useRef(null);
  const [introState, setIntroState] = useState('playing'); // playing | finished

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e11, 0.012);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Initial camera close-up position for cinematic intro
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x3e7cb1, 4.0);
    dirLight1.position.set(15, 25, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x60a5fa, 2.5);
    dirLight2.position.set(-15, -10, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x38bdf8, 4, 30);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // 3. Create Engineering 3D Geometries & Structures

    const mainAssembly = new THREE.Group();
    scene.add(mainAssembly);

    // --- Steel I-Beams & Structural Framework ---
    const beamsGroup = new THREE.Group();
    mainAssembly.add(beamsGroup);

    const beamMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.88,
      roughness: 0.25,
      wireframe: false,
    });

    const beamWireMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.6,
    });

    const beams = [];
    const beamCount = 14;

    for (let i = 0; i < beamCount; i++) {
      const beamGeo = new THREE.BoxGeometry(0.35, 7.5, 0.35);
      const beamMesh = new THREE.Mesh(beamGeo, beamMaterial);

      const wireGeo = new THREE.WireframeGeometry(beamGeo);
      const wireMesh = new THREE.LineSegments(wireGeo, beamWireMat);
      beamMesh.add(wireMesh);

      // Target assembled positions vs initial scattered positions for intro animation
      const targetX = (Math.cos((i / beamCount) * Math.PI * 2) * 4.2);
      const targetY = (Math.sin((i / beamCount) * Math.PI * 2) * 2.5);
      const targetZ = (i % 2 === 0 ? 1 : -1) * (i * 0.4 - 2.5);

      const startX = targetX * 4 + (Math.random() - 0.5) * 15;
      const startY = targetY * 4 + (Math.random() - 0.5) * 15;
      const startZ = targetZ * 4 + (Math.random() - 0.5) * 20;

      beamMesh.position.set(startX, startY, startZ);
      beamMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      beamsGroup.add(beamMesh);
      beams.push({
        mesh: beamMesh,
        startX,
        startY,
        startZ,
        targetX,
        targetY,
        targetZ,
        targetRotX: (i * Math.PI) / 6,
        targetRotY: (i * Math.PI) / 4,
        targetRotZ: 0,
      });
    }

    // --- Mechanical Gear & Ring Mechanism ---
    const mechanicalGroup = new THREE.Group();
    mainAssembly.add(mechanicalGroup);

    const gearGeo1 = new THREE.TorusGeometry(5.0, 0.12, 16, 80);
    const gearMat1 = new THREE.MeshStandardMaterial({
      color: 0x3e7cb1,
      metalness: 0.95,
      roughness: 0.15,
    });
    const gear1 = new THREE.Mesh(gearGeo1, gearMat1);
    mechanicalGroup.add(gear1);

    const gearGeo2 = new THREE.TorusGeometry(3.6, 0.08, 16, 60);
    const gearMat2 = new THREE.MeshPhysicalMaterial({
      color: 0x60a5fa,
      metalness: 0.7,
      roughness: 0.1,
      transmission: 0.4,
      transparent: true,
      opacity: 0.85,
    });
    const gear2 = new THREE.Mesh(gearGeo2, gearMat2);
    gear2.rotation.x = Math.PI / 3;
    mechanicalGroup.add(gear2);

    // --- Architectural BIM Facet Shell ---
    const bimShellGeo = new THREE.IcosahedronGeometry(4.0, 1);
    const bimWireGeo = new THREE.WireframeGeometry(bimShellGeo);
    const bimLineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });
    const bimShell = new THREE.LineSegments(bimWireGeo, bimLineMat);
    mainAssembly.add(bimShell);

    // --- Atmospheric Particle Field ---
    const particleCount = 2500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 70;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 140;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;
    }

    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.16,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. State & Controls
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 5. Animation Timeline (Intro -> Continuous Scroll)
    let startTime = performance.now();
    let animationFrameId;
    let introFinishedCalled = false;

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedSec = (currentTime - startTime) / 1000;
      // Progress of 6-second intro animation (0.0 to 1.0)
      const introProgress = Math.min(1.0, elapsedSec / 5.5);
      const easedIntro = 1 - Math.pow(1 - introProgress, 3); // Ease Out Cubic

      if (introProgress >= 1.0 && !introFinishedCalled) {
        introFinishedCalled = true;
        setIntroState('finished');
        if (onIntroComplete) onIntroComplete();
      }

      // Lerp mouse and scroll inputs
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.06;

      const maxScroll = Math.max(
        1,
        document.body.scrollHeight - window.innerHeight
      );
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // --- INTRO ANIMATION & ASSEMBLY ---
      beams.forEach((item) => {
        item.mesh.position.x =
          item.startX + (item.targetX - item.startX) * easedIntro;
        item.mesh.position.y =
          item.startY + (item.targetY - item.startY) * easedIntro;
        item.mesh.position.z =
          item.startZ + (item.targetZ - item.startZ) * easedIntro;

        item.mesh.rotation.x = item.targetRotX * easedIntro;
        item.mesh.rotation.y = item.targetRotY * easedIntro;
      });

      // Mechanical rotation
      gear1.rotation.z = elapsedSec * 0.3;
      gear2.rotation.z = -elapsedSec * 0.4;
      bimShell.rotation.y = elapsedSec * 0.15;
      bimShell.rotation.x = Math.sin(elapsedSec * 0.2) * 0.2;

      // Mouse Light follow
      pointLight.position.x = mouseX * 10;
      pointLight.position.y = -mouseY * 8;

      // --- CAMERA CINEMATIC MOTION ---
      if (introProgress < 1.0) {
        // Opening cinematic fly-through
        // Start close up -> Dolly out -> Position at center
        camera.position.z = 8 + (1 - easedIntro) * 12;
        camera.position.y = (1 - easedIntro) * 6;
        camera.rotation.z = (1 - easedIntro) * 0.4;
      } else {
        // Scroll-driven continuous 3D world journey
        const targetCamY = -scrollProgress * 50;
        const targetCamZ = 16 + Math.sin(scrollProgress * Math.PI * 2) * 6;
        const targetCamRotX = mouseY * 0.05 - scrollProgress * 0.15;
        const targetCamRotY = mouseX * 0.08 + Math.sin(scrollProgress * Math.PI) * 0.25;

        camera.position.y += (targetCamY - camera.position.y) * 0.08;
        camera.position.z += (targetCamZ - camera.position.z) * 0.08;
        camera.position.x += (mouseX * 3.0 - camera.position.x) * 0.05;

        camera.rotation.x += (targetCamRotX - camera.rotation.x) * 0.05;
        camera.rotation.y += (targetCamRotY - camera.rotation.y) * 0.05;

        // Assembly morphing during scroll
        mainAssembly.position.y = -scrollProgress * 30;
        mainAssembly.position.z = -scrollProgress * 20;
        mainAssembly.rotation.y = mouseX * 0.5 + scrollProgress * Math.PI;
        mainAssembly.rotation.x = mouseY * 0.3;
      }

      particles.rotation.y = elapsedSec * 0.03 + mouseX * 0.1;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 6. Resize Listener
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      beamMaterial.dispose();
      beamWireMat.dispose();
      gearMat1.dispose();
      gearMat2.dispose();
      bimLineMat.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <>
      {/* WebGL Canvas Overlay */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      />

      {/* Opening Cinematic HUD Telemetry Banner */}
      {introState === 'playing' && (
        <div className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-between p-8 sm:p-12 font-mono text-xs text-[#60A5FA]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 bg-[#0A0E11]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#3E7CB1]/40">
              <span className="h-2 w-2 rounded-full bg-[#60A5FA] animate-ping" />
              <span>3D ENGINEERING VISUALIZATION // INITIALIZING...</span>
            </div>
            <span className="text-slate-400">SAK ARCHITECTURE &amp; MECHANICAL</span>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-1 text-[11px] text-slate-400">
              <span>PARAMETRIC BEAMS: ASSEMBLED</span>
              <span>MECHANICAL GEARS: ENGAGED</span>
              <span>BIM WIREFRAME: LOADED</span>
            </div>
            <div className="animate-bounce text-[#60A5FA]">
              [ SCENARIO 01 / CINEMATIC INTRO ]
            </div>
          </div>
        </div>
      )}
    </>
  );
}
