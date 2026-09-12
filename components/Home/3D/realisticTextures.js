import * as THREE from 'three';

/**
 * Realistic Textures & Environment Utility for SAK 3D Architectural Engine
 * Warm Architectural Color Palette: Cream (#F6F1E7) + Warm White (#FFFDF8) + Refined Gold (#C6A15B) + Warm Graphite (#292722)
 */

// 1. Photorealistic Warm Architectural Sky Environment Map (for realistic reflections on glass & metal)
export function createRealisticSkyEnv(renderer) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Atmospheric daylight sky gradient with warm architectural horizon
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 512);
  skyGrad.addColorStop(0.0, '#24436b'); // Elegant zenith blue
  skyGrad.addColorStop(0.32, '#507aa8'); // Mid-sky soft blue
  skyGrad.addColorStop(0.62, '#a4c2de'); // Lower atmospheric blue
  skyGrad.addColorStop(0.84, '#f6f1e7'); // Warm architectural cream horizon haze
  skyGrad.addColorStop(1.0, '#fffdf8'); // Soft warm white ground bounce
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Warm Sun disc with refined champagne-gold corona bloom
  const sunX = 750;
  const sunY = 160;
  const sunCorona = ctx.createRadialGradient(sunX, sunY, 6, sunX, sunY, 190);
  sunCorona.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  sunCorona.addColorStop(0.08, 'rgba(255, 250, 235, 0.95)');
  sunCorona.addColorStop(0.24, 'rgba(216, 192, 138, 0.55)'); // Champagne gold #D8C08A
  sunCorona.addColorStop(0.55, 'rgba(198, 161, 91, 0.22)');  // Refined gold #C6A15B
  sunCorona.addColorStop(1.0, 'rgba(246, 241, 231, 0)');
  ctx.fillStyle = sunCorona;
  ctx.fillRect(0, 0, 1024, 512);

  // Distant wispy cirrus cloud layers in warm golden horizon
  ctx.fillStyle = 'rgba(255, 255, 255, 0.32)';
  for (let i = 0; i < 28; i++) {
    const cx = (i * 42) % 1024;
    const cy = 260 + Math.sin(i * 1.7) * 45;
    const cw = 120 + Math.cos(i * 0.9) * 60;
    const ch = 14 + Math.sin(i * 2.1) * 8;
    ctx.beginPath();
    ctx.ellipse(cx, cy, cw, ch, 0.05, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  pmremGenerator.dispose();
  texture.dispose();

  return envMap;
}

// 2. Photorealistic Warm Graphite Asphalt Road Texture with Aggregate & Surface Wear
export function createAsphaltTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base warm graphite asphalt (#292722)
  ctx.fillStyle = '#292722';
  ctx.fillRect(0, 0, 512, 512);

  // Micro aggregate stone granules with warm undertone
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 32;
    data[i]     = Math.min(255, Math.max(0, 41 + grain));
    data[i + 1] = Math.min(255, Math.max(0, 39 + grain));
    data[i + 2] = Math.min(255, Math.max(0, 34 + grain));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 4);
  return texture;
}

// 3. Photorealistic Warm Cream Granite / Travertine Plaza Paver Texture
export function createPlazaPaverTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base warm cream (#F6F1E7)
  ctx.fillStyle = '#f6f1e7';
  ctx.fillRect(0, 0, 512, 512);

  // 4x4 Grid of stone tiles with recessed champagne grout joints
  const tileSize = 128;
  for (let x = 0; x < 512; x += tileSize) {
    for (let y = 0; y < 512; y += tileSize) {
      // Subtle stone tone variation between slabs (warm cream & ivory)
      const tone = Math.floor(Math.random() * 12 - 6);
      ctx.fillStyle = `rgb(${248 + tone}, ${243 + tone}, ${233 + tone})`;
      ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

      // Fine stone grain
      ctx.fillStyle = 'rgba(198, 161, 91, 0.12)';
      for (let g = 0; g < 35; g++) {
        ctx.fillRect(
          x + Math.random() * tileSize,
          y + Math.random() * tileSize,
          Math.random() * 3,
          Math.random() * 3
        );
      }
    }
  }

  // Champagne-gold grout joint lines (subtle mortar)
  ctx.strokeStyle = 'rgba(216, 192, 138, 0.45)';
  ctx.lineWidth = 2.5;
  for (let p = 0; p <= 512; p += tileSize) {
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, p);
    ctx.lineTo(512, p);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  return texture;
}

// 4. Architectural Warm Ivory Formwork Concrete with Tie-Rod Holes & Seams
export function createArchitecturalConcreteTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Warm ivory concrete base (#EAE3D5)
  ctx.fillStyle = '#eae3d5';
  ctx.fillRect(0, 0, 512, 512);

  // Formwork board panels with soft champagne highlight gradients
  for (let y = 0; y < 512; y += 128) {
    const grad = ctx.createLinearGradient(0, y, 0, y + 128);
    grad.addColorStop(0, 'rgba(255, 253, 248, 0.45)');
    grad.addColorStop(0.5, 'rgba(234, 227, 213, 0.25)');
    grad.addColorStop(1, 'rgba(198, 161, 91, 0.18)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, 512, 128);

    // Tie-rod formwork holes with warm bronze rims
    [90, 256, 422].forEach(hx => {
      ctx.fillStyle = '#4a443a';
      ctx.beginPath();
      ctx.arc(hx, y + 64, 4, 0, Math.PI * 2);
      ctx.fill();

      // Hole bevel in soft gold
      ctx.strokeStyle = 'rgba(216, 192, 138, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(hx, y + 64, 5.5, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Seam shadow line in warm graphite
    ctx.strokeStyle = 'rgba(74, 68, 58, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

// 5. Botanical Leaf Texture Processing (Alpha Cutout from Photographic Branch)
export function createPhotographicLeafTexture(imagePath, callback) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imagePath;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Convert black background to transparent alpha
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Black background threshold
      const brightness = (r + g + b) / 3;
      if (brightness < 32) {
        data[i + 3] = 0;
      } else if (brightness < 60) {
        data[i + 3] = Math.floor(((brightness - 32) / 28) * 255);
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    if (callback) callback(texture);
  };
  img.onerror = (e) => {
    console.warn('Failed to load leaf image, fallback to procedural:', e);
    if (callback) callback(createBotanicalFoliageTexture());
  };
}

// 6. Photographic Cloud Texture Processing (Soft Alpha Transparency)
export function createPhotographicCloudTexture(imagePath, callback) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imagePath;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Luminance to alpha mapping for pure transparent cloud borders
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      // Soft thresholding
      if (lum < 18) {
        data[i + 3] = 0;
      } else {
        const a = Math.min(255, Math.pow((lum - 18) / 237, 1.3) * 255);
        data[i + 3] = Math.floor(a);
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    if (callback) callback(texture);
  };
  img.onerror = () => {
    if (callback) callback(null);
  };
}
