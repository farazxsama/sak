import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import {
  createAsphaltTexture,
  createPlazaPaverTexture,
  createArchitecturalConcreteTexture,
  createPhotographicLeafTexture,
} from './realisticTextures';

/**
 * SAK WorldEngine â€” Photorealistic Real-Time 3D Cinematic Architectural & Engineering Engine
 * 
 * Upgraded Features:
 *  1. 360Â° Photorealistic Architectural Sky Panoramic Environment (high-resolution daylight, distant city skyline, golden sun rays)
 *  2. Ultra-realistic volumetric 3D cloud clusters using alpha-processed photographic cumulus texture
 *  3. Photorealistic modern architectural tower with double-glazed glass reflections, curtain wall grid, interior lighting & concrete formwork
 *  4. High-detail executive vehicles (aerodynamic sedans & SUVs with metallic paint, glass windows & LED lighting)
 *  5. Botanical landscaping with multi-branch deciduous trees, columnar cypress, and manicured hedges
 *  6. Asphalt boulevard with lane markings & granite plaza pavers
 *  7. Full Civil Structural Skeleton assembly & Mechanical MEP network with rotating cooling fans
 *  8. Continuous 60fps idle physics & 15-shot cinematic camera path with drag orbit inspection
 */

export class WorldEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.clientWidth || window.innerWidth;
    this.height = canvas.clientHeight || window.innerHeight;

    // Time & scroll tracking
    this.clock = new THREE.Clock();
    this.targetScroll = 0;
    this.currentScroll = 0;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.orbit = { currentX: 0, currentY: 0, targetX: 0, targetY: 0 };
    this.heroTime = 0;
    this.hasScrolled = false;
    this.isDisposed = false;

    // Animated subsystems registry
    this.fans = [];
    this.vehicles = [];
    this.trees = [];
    this.cloudParticles = [];
    this.mepPulses = [];

    // Structural & MEP animation controllers
    this.facadeGroup = new THREE.Group();
    this.structureGroup = new THREE.Group();
    this.bimGroup = new THREE.Group();
    this.mepGroup = new THREE.Group();
    this.environmentGroup = new THREE.Group();
    this.cloudsGroup = new THREE.Group();
    this.floorSlabs = [];

    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.initLights();
    this.initMaterials();
    this.initPostProcessing();

    this.buildAtmosphereAndClouds();
    this.buildCampusEnvironment();
    this.buildArchitecturalTower();
    this.buildStructuralSkeleton();
    this.buildBIMMode();
    this.buildMechanicalMEPSystems();

    this.setupCameraSpline();
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: true,  // required for GTAO
      depth: true,
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    // ACESFilmic tone-mapping is set on the OutputPass instead (postprocessing pipeline)
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  initPostProcessing() {
    this.composer = new EffectComposer(this.renderer);

    // 1. Base render
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // 2. GTAO ambient occlusion â€” adds contact shadows & depth
    //    This is the single biggest jump from 'CG' to 'photorealistic'
    try {
      this.gtaoPass = new GTAOPass(this.scene, this.camera, this.width, this.height);
      this.gtaoPass.output = GTAOPass.OUTPUT.Default;
      this.gtaoPass.blendIntensity = 1.0;
      if (this.gtaoPass.gtaoMaterial) {
        // Tight, detailed contact-shadow radius
        this.gtaoPass.gtaoMaterial.uniforms.radius.value = 0.18;
        this.gtaoPass.gtaoMaterial.uniforms.distanceExponent.value = 1.0;
      }
      this.composer.addPass(this.gtaoPass);
    } catch (e) {
      console.warn('GTAO not available:', e);
    }

    // 3. Bloom â€” minimal, overcast-style
    //    Overcast light has no harsh bright spots. Only interior window glow blooms.
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.width, this.height),
      0.18,   // Very low strength â€” overcast sky has no blown highlights
      0.35,   // Tight radius
      0.92    // Very high threshold â€” only interior lit windows glow
    );
    this.composer.addPass(this.bloomPass);

    // 4. Output â€” applies ACES filmic + gamma
    const outputPass = new OutputPass();
    outputPass.toneMappingExposure = 1.05;  // Slightly dimmer for overcast
    this.composer.addPass(outputPass);
  }

  initScene() {
    this.scene = new THREE.Scene();
    // Overcast grey-white sky fallback
    this.scene.background = new THREE.Color(0x8a9ba8);
    // Dense urban atmosphere fog â€” matches wet overcast street feel
    this.scene.fog = new THREE.Fog(0x8a9ba8, 120, 420);

    // Load the OVERCAST documentary sky photograph
    // Real storm/overcast cloud photo gives authentic urban atmosphere
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/img/overcast-sky.jpg', (skyTex) => {
      if (this.isDisposed) return;
      skyTex.mapping = THREE.EquirectangularReflectionMapping;
      skyTex.colorSpace = THREE.SRGBColorSpace;
      // Visible overcast sky background
      this.scene.background = skyTex;
      this.skyPhotoLoaded = true;
      // PMREM for reflections â€” overcast gives even silver reflections on glass
      try {
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        pmremGenerator.compileEquirectangularShader();
        this.envMap = pmremGenerator.fromEquirectangular(skyTex).texture;
        this.scene.environment = this.envMap;
        pmremGenerator.dispose();
      } catch (e) {
        console.warn('PMREM env failed:', e);
      }
    });
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(48, this.width / this.height, 0.1, 1400);
    this.camera.position.set(0, 92, 118);
    this.cameraTarget = new THREE.Vector3(0, 18, 0);
    this.cameraLookCurrent = new THREE.Vector3(0, 18, 0);
  }

  initLights() {
    // OVERCAST URBAN DOCUMENTARY LIGHTING
    // Overcast skies produce perfectly even, soft diffuse light with no hard shadows.
    // This is THE most realistic lighting for a street-level documentary photograph.

    // 1. Very soft 'sky' directional â€” no direct sun, just bright overcast diffuse
    //    Low intensity, extremely soft shadow radius (penumbra only)
    this.sunLight = new THREE.DirectionalLight(0xd8e4ec, 1.2);
    this.sunLight.position.set(10, 60, 30);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 4096;
    this.sunLight.shadow.mapSize.height = 4096;
    this.sunLight.shadow.camera.near = 2;
    this.sunLight.shadow.camera.far = 300;
    this.sunLight.shadow.camera.left = -80;
    this.sunLight.shadow.camera.right = 80;
    this.sunLight.shadow.camera.top = 80;
    this.sunLight.shadow.camera.bottom = -80;
    this.sunLight.shadow.radius = 8.0;  // Very soft shadow â€” typical of overcast
    this.sunLight.shadow.bias = -0.0004;
    this.scene.add(this.sunLight);

    // 2. Dominant overcast hemisphere â€” grey sky / wet concrete ground
    //    This is the main light source for overcast scenes
    this.hemiLight = new THREE.HemisphereLight(0xb8c8d4, 0x7a8a8a, 2.8);
    this.scene.add(this.hemiLight);

    // 3. Subtle backfill â€” prevents very dark back-faces, gives 3D read
    const fillLight1 = new THREE.DirectionalLight(0x9ab4c2, 0.45);
    fillLight1.position.set(-40, 30, -60);
    this.scene.add(fillLight1);

    // 4. Low-angle cool rim â€” replicates light bouncing off wet pavement
    const rimLight = new THREE.DirectionalLight(0xc2d4dc, 0.30);
    rimLight.position.set(50, 8, 50);
    this.scene.add(rimLight);
  }

  initMaterials() {
    // DOCUMENTARY PHOTOGRAPHIC MATERIALS
    // Weathered, muted, realistic urban materials
    const textureLoader = new THREE.TextureLoader();

    // --- FACADE TEXTURES ---
    // Photographic weathered red brick
    const brickTex = textureLoader.load('/img/brick.jpg');
    brickTex.wrapS = THREE.RepeatWrapping;
    brickTex.wrapT = THREE.RepeatWrapping;
    brickTex.repeat.set(3, 4); // Realistic brick size on a multi-storey facade
    brickTex.colorSpace = THREE.SRGBColorSpace;

    // Facade curtain wall (for glass panel areas)
    const curtainTex = textureLoader.load('/img/facade-curtainwall.jpg');
    curtainTex.wrapS = THREE.RepeatWrapping;
    curtainTex.wrapT = THREE.RepeatWrapping;
    curtainTex.repeat.set(2, 1);
    curtainTex.colorSpace = THREE.SRGBColorSpace;

    // --- GROUND TEXTURES ---
    // Wet cracked concrete sidewalk
    const sidewalkTex = textureLoader.load('/img/concrete-sidewalk.jpg');
    sidewalkTex.wrapS = THREE.RepeatWrapping;
    sidewalkTex.wrapT = THREE.RepeatWrapping;
    sidewalkTex.repeat.set(8, 8);
    sidewalkTex.colorSpace = THREE.SRGBColorSpace;

    // Wet asphalt road
    const asphaltTex = textureLoader.load('/img/wet-asphalt.jpg');
    asphaltTex.wrapS = THREE.RepeatWrapping;
    asphaltTex.wrapT = THREE.RepeatWrapping;
    asphaltTex.repeat.set(4, 12);
    asphaltTex.colorSpace = THREE.SRGBColorSpace;

    // Procedural textures
    const concreteTex = createArchitecturalConcreteTexture();
    const plazaTex = createPlazaPaverTexture();

    this.materials = {
      // Weathered brick facade â€” the main building skin
      // High roughness (0.92) = matte brick surface, not shiny
      curtainFacade: new THREE.MeshStandardMaterial({
        map: brickTex,
        roughness: 0.92,
        metalness: 0.0,
        envMapIntensity: 0.0,
      }),

      // Real glass â€” with the overcast sky env map these look like actual glass
      // Lower opacity = more realistic â€” you can see inside/through
      glass: new THREE.MeshStandardMaterial({
        color: 0x8aacb8,   // Cool slate-grey glass tint
        metalness: 0.55,
        roughness: 0.08,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
        envMapIntensity: 1.8,
      }),

      // X-Ray engineering glass
      glassXray: new THREE.MeshStandardMaterial({
        color: 0x8aacb8,
        metalness: 0.4,
        roughness: 0.15,
        transparent: true,
        opacity: 0.16,
        depthWrite: false,
      }),

      // Matte concrete panels â€” weathered, stained
      facadeConcrete: new THREE.MeshStandardMaterial({
        map: concreteTex,
        color: 0x7a7a76,  // Weathered grey-brown concrete
        roughness: 0.90,
        metalness: 0.0,
      }),

      // Dark aluminium window frames â€” anodized, matte
      mullion: new THREE.MeshStandardMaterial({
        color: 0x2a2a28,
        metalness: 0.70,
        roughness: 0.55,
        envMapIntensity: 0.6,
      }),

      // Minimal structural accent (dark steel, not gold)
      accentGold: new THREE.MeshStandardMaterial({
        color: 0x4a4a48,
        metalness: 0.75,
        roughness: 0.40,
        envMapIntensity: 0.8,
      }),

      // Reinforced concrete structure
      structuralConcrete: new THREE.MeshStandardMaterial({
        map: concreteTex,
        color: 0x888880,
        roughness: 0.85,
        metalness: 0.05,
      }),

      // Weathered structural steel
      structuralSteel: new THREE.MeshStandardMaterial({
        color: 0x3a3830,
        metalness: 0.80,
        roughness: 0.50,
        envMapIntensity: 0.5,
      }),

      // Dull rebar/flange
      steelBright: new THREE.MeshStandardMaterial({
        color: 0x606058,
        metalness: 0.82,
        roughness: 0.35,
        envMapIntensity: 0.6,
      }),

      // Interior fluorescent office light â€” subtle warm glow
      interiorLight: new THREE.MeshStandardMaterial({
        color: 0xfff8f0,
        emissive: new THREE.Color(0xffe4b5),
        emissiveIntensity: 0.8,
        roughness: 0.3,
      }),

      // Galvanized HVAC duct
      duct: new THREE.MeshStandardMaterial({
        color: 0xb0aba2,
        metalness: 0.78,
        roughness: 0.40,
        envMapIntensity: 0.5,
      }),

      // Pipe: chilled water (matte copper/bronze)
      pipeChilled: new THREE.MeshStandardMaterial({
        color: 0x7a6040,
        metalness: 0.65,
        roughness: 0.55,
      }),

      // Pipe: fire (dull red-orange)
      pipeFire: new THREE.MeshStandardMaterial({
        color: 0x8a3828,
        metalness: 0.55,
        roughness: 0.60,
      }),

      // Wet asphalt road â€” reflective from rain
      road: new THREE.MeshStandardMaterial({
        map: asphaltTex,
        roughness: 0.55,  // Lower roughness = wet sheen
        metalness: 0.18,  // Slight metalness = wet road reflections
        envMapIntensity: 0.8,
      }),

      // Wet cracked concrete sidewalk / plaza
      plazaPavers: new THREE.MeshStandardMaterial({
        map: sidewalkTex,
        roughness: 0.72,
        metalness: 0.08,
        envMapIntensity: 0.4,
      }),

      // Wet urban grass â€” darker, less saturated than tropical bright green
      grass: new THREE.MeshStandardMaterial({
        color: 0x3d5c3a,  // Dark muted green, urban grass in overcast
        roughness: 0.96,
        metalness: 0.0,
      }),

      // Dark urban soil
      soilMulch: new THREE.MeshStandardMaterial({
        color: 0x3c3028,
        roughness: 0.98,
      }),

      // Wet road puddle reflections â€” very reflective pool
      water: new THREE.MeshStandardMaterial({
        color: 0x1a2028,
        metalness: 0.98,
        roughness: 0.04,
        transparent: true,
        opacity: 0.88,
        envMapIntensity: 2.5,
      }),

      // Leaf foliage â€” realistic green, overcast-lit
      foliage: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        alphaTest: 0.35,
        side: THREE.DoubleSide,
        roughness: 0.80,
        metalness: 0.0,
      }),

      // Tree bark â€” dark, weathered
      wood: new THREE.MeshStandardMaterial({
        color: 0x2c1e14,
        roughness: 0.96,
      }),

      // BIM wireframe
      bimLine: new THREE.LineBasicMaterial({
        color: 0x8aacb8,
        transparent: true,
        opacity: 0.70,
      }),

      // Urban concrete bollards
      bollardSteel: new THREE.MeshStandardMaterial({
        color: 0x404040,
        metalness: 0.60,
        roughness: 0.65,
      }),

      ledBlue: new THREE.MeshBasicMaterial({
        color: 0x8aacb8,
      }),
    };

    // Load photographic leaf alpha texture
    createPhotographicLeafTexture('/img/tree-leaf.jpg', (leafTex) => {
      if (leafTex && this.materials.foliage) {
        this.materials.foliage.map = leafTex;
        this.materials.foliage.needsUpdate = true;
      }
    });
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 1. PHOTOREALISTIC ATMOSPHERE (PHOTO SKY + CLOUD SPRITES + HAZE)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  buildAtmosphereAndClouds() {
    this.scene.add(this.cloudsGroup);
    // The scene.background is the real photographic sky (realistic-sky.jpg)
    // loaded in initScene. The cloud sprites add 3D depth and parallax on top.

    // â”€â”€ A. PHOTOGRAPHIC CLOUD SPRITES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // realistic-cloud.jpg is a real cumulus photo. A luminance shader makes the
    // dark sky background transparent so only the white cloud puffs are visible.
    // Clouds are placed in 3 altitude bands to give real atmospheric layering.
    const cloudLoader = new THREE.TextureLoader();
    cloudLoader.load('/img/realistic-cloud.jpg', (cloudTex) => {
      if (this.isDisposed) return;
      cloudTex.colorSpace = THREE.SRGBColorSpace;
      cloudTex.wrapS = THREE.RepeatWrapping;
      cloudTex.wrapT = THREE.RepeatWrapping;

      const cloudVert = /* glsl */`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      // Luminance-based alpha: dark sky in the JPEG becomes transparent,
      // bright cloud puffs stay opaque. Radial vignette eliminates card edges.
      const makeCloudFrag = (tintR, tintG, tintB) => /* glsl */`
        uniform sampler2D cloudTex;
        uniform float opacity;
        varying vec2 vUv;
        void main() {
          vec4 tex = texture2D(cloudTex, vUv);
          float lum = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
          vec2 uv2 = vUv * 2.0 - 1.0;
          float edgeFade = 1.0 - smoothstep(0.50, 1.0, length(uv2));
          float alpha = smoothstep(0.20, 0.70, lum) * edgeFade * opacity;
          vec3 col = tex.rgb * vec3(${tintR.toFixed(2)}, ${tintG.toFixed(2)}, ${tintB.toFixed(2)});
          gl_FragColor = vec4(col, alpha);
        }
      `;

      // [count, yMin, yMax, scaleMin, scaleMax, radiusMin, radiusMax, baseOpacity, tR, tG, tB]
      const layers = [
        [12, 80, 130, 55, 110, 120, 340, 0.50, 0.93, 0.96, 1.00],  // High â€” cool-white cirrus
        [16,  44,  80, 28,  65,  70, 220, 0.75, 1.00, 0.99, 0.97],  // Mid  â€” main cumulus
        [ 8,  16,  44, 14,  36,  45, 130, 0.65, 1.00, 0.98, 0.94],  // Low  â€” warm ground scud
      ];

      layers.forEach(([count, yMin, yMax, sMin, sMax, rMin, rMax, baseOp, tR, tG, tB], li) => {
        for (let i = 0; i < count; i++) {
          const angle  = Math.random() * Math.PI * 2;
          const radius = rMin + Math.random() * (rMax - rMin);
          const px = Math.cos(angle) * radius;
          const pz = Math.sin(angle) * radius;
          const py = yMin + Math.random() * (yMax - yMin);
          const scale = sMin + Math.random() * (sMax - sMin);
          const aspect = 1.6 + Math.random() * 1.0;
          const geo = new THREE.PlaneGeometry(scale * aspect, scale * 0.52);
          const op = Math.min(baseOp * (0.85 + Math.random() * 0.30), 1.0);

          const mat = new THREE.ShaderMaterial({
            uniforms: {
              cloudTex: { value: cloudTex },
              opacity:  { value: op },
            },
            vertexShader: cloudVert,
            fragmentShader: makeCloudFrag(tR, tG, tB),
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            fog: false,
          });

          const cloud = new THREE.Mesh(geo, mat);
          cloud.position.set(px, py, pz);
          cloud.rotation.y = Math.random() * Math.PI * 2;
          cloud.rotation.x = (Math.random() - 0.5) * 0.14;

          this.cloudsGroup.add(cloud);
          this.cloudParticles.push({
            mesh: cloud, baseX: px, baseZ: pz, baseY: py,
            driftSpeed: 0.4 + Math.random() * 0.8,
            rotSpeed: (Math.random() - 0.5) * 0.005,
            layer: li,
          });
        }
      });
    });

    // â”€â”€ B. GROUND-LEVEL ATMOSPHERIC HAZE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Thin horizontal planes at rising altitudes give volumetric depth-of-field haze.
    const hazeMat = new THREE.MeshBasicMaterial({
      color: 0xbdd6e8,
      transparent: true,
      opacity: 0.055,
      depthWrite: false,
      fog: true,
    });
    [1.5, 4.5, 9, 16].forEach(hy => {
      const haze = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), hazeMat.clone());
      haze.rotation.x = -Math.PI / 2;
      haze.position.y = hy;
      haze.renderOrder = -5;
      this.scene.add(haze);
    });
  }


  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 2. REALISTIC CAMPUS ENVIRONMENT (ASPHALT ROAD, GRANITE PLAZA, POOL, REAL TREES)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  buildCampusEnvironment() {
    this.scene.add(this.environmentGroup);

    // 1. Base Landscape Lawn
    const groundGeo = new THREE.PlaneGeometry(360, 360);
    const groundMesh = new THREE.Mesh(groundGeo, this.materials.grass);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.05;
    groundMesh.receiveShadow = true;
    this.environmentGroup.add(groundMesh);

    // 2. Luxury Architectural Granite Plaza with stone paver texture
    const plazaGeo = new THREE.BoxGeometry(82, 0.28, 72);
    const plazaMesh = new THREE.Mesh(plazaGeo, this.materials.plazaPavers);
    plazaMesh.position.set(0, 0.14, 4);
    plazaMesh.receiveShadow = true;
    this.environmentGroup.add(plazaMesh);

    // 3. Photorealistic Asphalt Boulevard Road
    const roadGeo = new THREE.PlaneGeometry(260, 16);
    const roadMesh = new THREE.Mesh(roadGeo, this.materials.road);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.position.set(0, 0.02, 45);
    roadMesh.receiveShadow = true;
    this.environmentGroup.add(roadMesh);

    // Concrete Curbs with Chamfer
    const curbGeo = new THREE.BoxGeometry(260, 0.32, 0.5);
    const curbNorth = new THREE.Mesh(curbGeo, this.materials.facadeConcrete);
    curbNorth.position.set(0, 0.16, 36.8);
    const curbSouth = curbNorth.clone();
    curbSouth.position.z = 53.2;
    this.environmentGroup.add(curbNorth, curbSouth);

    // Thermoplastic Road Centerline & Crosswalk Markings
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xfbfcfe });
    const dashGeo = new THREE.PlaneGeometry(4.5, 0.35);
    for (let rx = -120; rx <= 120; rx += 11) {
      const dash = new THREE.Mesh(dashGeo, dashMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(rx, 0.04, 45);
      this.environmentGroup.add(dash);
    }

    // Zebra Crosswalk at Plaza Entrance
    const zebraGeo = new THREE.PlaneGeometry(0.8, 14);
    for (let zx = -4.5; zx <= 4.5; zx += 1.5) {
      const zebra = new THREE.Mesh(zebraGeo, dashMat);
      zebra.rotation.x = -Math.PI / 2;
      zebra.position.set(zx, 0.04, 45);
      this.environmentGroup.add(zebra);
    }

    // 4. Architectural Water Reflection Pool
    const poolBorderGeo = new THREE.BoxGeometry(28, 0.44, 15);
    const poolBorder = new THREE.Mesh(poolBorderGeo, this.materials.facadeConcrete);
    poolBorder.position.set(0, 0.22, 24);
    poolBorder.castShadow = true;
    this.environmentGroup.add(poolBorder);

    const waterGeo = new THREE.PlaneGeometry(26.6, 13.6);
    const waterMesh = new THREE.Mesh(waterGeo, this.materials.water);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, 0.40, 24);
    this.environmentGroup.add(waterMesh);

    // Stainless Steel LED Bollards along Plaza Edge
    const bollardGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.95, 12);
    const bollardRingGeo = new THREE.CylinderGeometry(0.095, 0.095, 0.06, 12);
    for (let bx = -36; bx <= 36; bx += 4.5) {
      const bollard = new THREE.Mesh(bollardGeo, this.materials.bollardSteel);
      bollard.position.set(bx, 0.48, 38);
      bollard.castShadow = true;

      const ring = new THREE.Mesh(bollardRingGeo, this.materials.ledBlue);
      ring.position.set(bx, 0.85, 38);

      this.environmentGroup.add(bollard, ring);
    }

    // 5. Realistic Botanical Trees with Branching Trunks & Leafy Canopies
    this.buildBotanicalTrees();

    // 6. Realistic Executive Vehicles (Sedans & SUVs with metallic paint & rims)
    this.buildRealisticVehicles();
  }

  buildBotanicalTrees() {
    // 1. Deciduous Architectural Shade Trees (Natural Branching + Photographic Leaf Clusters)
    const trunkGeo = new THREE.CylinderGeometry(0.22, 0.42, 5.2, 8);
    const branchGeo = new THREE.CylinderGeometry(0.10, 0.18, 3.2, 6);
    const leafClusterGeo = new THREE.PlaneGeometry(3.6, 3.6);

    const treeCoords = [
      [-32, 10], [-26, 20], [-28, 30], [-18, 33], [-10, 33],
      [32, 10], [26, 20], [28, 30], [18, 33], [10, 33],
      [-36, -8], [-30, -22], [36, -8], [30, -22],
      [-18, 18], [18, 18],
    ];

    treeCoords.forEach(([tx, tz], i) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(tx, 0, tz);

      // Raised Circular Planter Curb with Rich Mulch
      const planterCurb = new THREE.Mesh(
        new THREE.CylinderGeometry(3.2, 3.3, 0.28, 18),
        this.materials.facadeConcrete
      );
      planterCurb.position.y = 0.14;
      planterCurb.receiveShadow = true;
      treeGroup.add(planterCurb);

      const mulchMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(3.0, 3.0, 0.05, 18),
        this.materials.soilMulch
      );
      mulchMesh.position.y = 0.28;
      treeGroup.add(mulchMesh);

      // Main Trunk
      const trunk = new THREE.Mesh(trunkGeo, this.materials.wood);
      trunk.position.y = 2.6;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Organic Branches
      for (let b = 0; b < 3; b++) {
        const branch = new THREE.Mesh(branchGeo, this.materials.wood);
        const bAngle = (b * Math.PI * 2) / 3 + 0.2;
        branch.position.set(Math.cos(bAngle) * 0.45, 4.2, Math.sin(bAngle) * 0.45);
        branch.rotation.z = Math.cos(bAngle) * 0.58;
        branch.rotation.x = Math.sin(bAngle) * 0.58;
        treeGroup.add(branch);

        // Sub-branch quads with realistic photographic foliage
        const subBranchTips = [
          [Math.cos(bAngle) * 1.6, 5.4, Math.sin(bAngle) * 1.6],
          [Math.cos(bAngle + 0.4) * 1.8, 6.0, Math.sin(bAngle + 0.4) * 1.8],
        ];

        subBranchTips.forEach(([lx, ly, lz]) => {
          // Crossed quads for 3D volumetric leaf presence
          for (let q = 0; q < 3; q++) {
            const leafMesh = new THREE.Mesh(leafClusterGeo, this.materials.foliage);
            leafMesh.position.set(lx, ly, lz);
            leafMesh.rotation.y = (q * Math.PI) / 3;
            leafMesh.rotation.x = (Math.random() - 0.5) * 0.4;
            leafMesh.rotation.z = (Math.random() - 0.5) * 0.4;
            leafMesh.scale.setScalar(0.9 + Math.random() * 0.4);
            leafMesh.castShadow = true;
            treeGroup.add(leafMesh);
          }
        });
      }

      // Central Crown Foliage Cluster
      for (let c = 0; c < 4; c++) {
        const crownLeaf = new THREE.Mesh(leafClusterGeo, this.materials.foliage);
        crownLeaf.position.set(0, 6.2 + (c % 2) * 0.8, 0);
        crownLeaf.rotation.y = (c * Math.PI) / 2;
        crownLeaf.rotation.x = 0.2;
        crownLeaf.scale.setScalar(1.2);
        crownLeaf.castShadow = true;
        treeGroup.add(crownLeaf);
      }

      this.environmentGroup.add(treeGroup);
      this.trees.push({ group: treeGroup, phase: i * 0.5 });
    });

    // 2. Columnar Italian Cypress Trees (Photographic Leaf Alpha Panels)
    const cypressTrunkGeo = new THREE.CylinderGeometry(0.12, 0.18, 2.2, 6);
    const cypressLeafGeo = new THREE.PlaneGeometry(2.4, 7.8);
    const cypressPositions = [
      [-13, 16], [-13, 8], [-13, 0],
      [13, 16], [13, 8], [13, 0],
    ];

    cypressPositions.forEach(([cx, cz]) => {
      const cGroup = new THREE.Group();
      cGroup.position.set(cx, 0, cz);

      // Granite planter border
      const pCurb = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.7, 0.24, 14),
        this.materials.facadeConcrete
      );
      pCurb.position.y = 0.12;
      cGroup.add(pCurb);

      const ct = new THREE.Mesh(cypressTrunkGeo, this.materials.wood);
      ct.position.y = 1.1;
      cGroup.add(ct);

      // Dense 4-way intersecting botanical vertical foliage planes
      for (let p = 0; p < 4; p++) {
        const cLeaf = new THREE.Mesh(cypressLeafGeo, this.materials.foliage);
        cLeaf.position.y = 4.8;
        cLeaf.rotation.y = (p * Math.PI) / 4;
        cLeaf.castShadow = true;
        cGroup.add(cLeaf);
      }

      this.environmentGroup.add(cGroup);
    });

    // 3. Manicured Boxwood Hedges Along Building Base
    const hedgeGeo = new THREE.BoxGeometry(15, 1.2, 1.4);
    const hedgeLeft = new THREE.Mesh(hedgeGeo, this.materials.foliage);
    hedgeLeft.position.set(-15, 0.65, 13);
    const hedgeRight = hedgeLeft.clone();
    hedgeRight.position.x = 15;
    this.environmentGroup.add(hedgeLeft, hedgeRight);
  }

  buildRealisticVehicles() {
    const carPalettes = [
      { body: 0x24221e, type: 'sedan' }, // Warm graphite metallic
      { body: 0xd8c08a, type: 'suv' },   // Champagne gold metallic
      { body: 0x3d3226, type: 'sedan' }, // Deep architectural bronze
      { body: 0xfffdf8, type: 'suv' },   // Pearl warm white metallic
    ];

    carPalettes.forEach((config, i) => {
      const carGroup = new THREE.Group();
      const carMat = new THREE.MeshStandardMaterial({
        color: config.body,
        metalness: 0.94,
        roughness: 0.12,
        envMapIntensity: 2.5, // Glossy automotive clearcoat
      });

      const isSUV = config.type === 'suv';
      const bodyLen = isSUV ? 4.9 : 4.6;
      const bodyWid = isSUV ? 2.1 : 1.95;
      const bodyH = isSUV ? 1.05 : 0.85;

      // 1. Aerodynamic Lower Body Chassis
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(bodyLen, bodyH, bodyWid), carMat);
      chassis.position.y = bodyH / 2 + 0.35;
      chassis.castShadow = true;
      carGroup.add(chassis);

      // 2. Sloped Glass Greenhouse / Cabin
      const cabinLen = isSUV ? 2.8 : 2.5;
      const cabinH = isSUV ? 0.85 : 0.72;
      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(cabinLen, cabinH, bodyWid * 0.88),
        this.materials.glass
      );
      cabin.position.set(-0.25, chassis.position.y + bodyH / 2 + cabinH / 2, 0);
      cabin.castShadow = true;
      carGroup.add(cabin);

      // Cabin Roof Cap
      const roof = new THREE.Mesh(
        new THREE.BoxGeometry(cabinLen * 0.9, 0.08, bodyWid * 0.85),
        carMat
      );
      roof.position.set(-0.25, cabin.position.y + cabinH / 2 + 0.04, 0);
      carGroup.add(roof);

      // 3. Modern LED Daytime Running Lights & Projector Headlights
      const headlightGeo = new THREE.BoxGeometry(0.12, 0.16, 0.45);
      const headMat = new THREE.MeshBasicMaterial({ color: 0xfef9c3 });
      const hl1 = new THREE.Mesh(headlightGeo, headMat);
      hl1.position.set(bodyLen / 2 + 0.02, chassis.position.y + 0.15, bodyWid * 0.35);
      const hl2 = hl1.clone();
      hl2.position.z = -bodyWid * 0.35;
      carGroup.add(hl1, hl2);

      // 4. Red LED Taillight Bar across rear
      const taillightGeo = new THREE.BoxGeometry(0.1, 0.14, bodyWid * 0.88);
      const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const tailBar = new THREE.Mesh(taillightGeo, tailMat);
      tailBar.position.set(-bodyLen / 2 - 0.02, chassis.position.y + 0.18, 0);
      carGroup.add(tailBar);

      // 5. Detailed Multi-Spoke Alloy Wheels & Rubber Tires
      const tireGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.26, 16);
      const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.28, 12);
      const tireMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.88 });
      const wheelOffsets = [
        [bodyLen * 0.32, 0.38, bodyWid / 2 + 0.04],
        [bodyLen * 0.32, 0.38, -bodyWid / 2 - 0.04],
        [-bodyLen * 0.32, 0.38, bodyWid / 2 + 0.04],
        [-bodyLen * 0.32, 0.38, -bodyWid / 2 - 0.04],
      ];

      wheelOffsets.forEach(([wx, wy, wz]) => {
        const wheelGroup = new THREE.Group();
        wheelGroup.position.set(wx, wy, wz);

        const tire = new THREE.Mesh(tireGeo, tireMat);
        tire.rotation.x = Math.PI / 2;
        tire.castShadow = true;

        const rim = new THREE.Mesh(rimGeo, this.materials.steelBright);
        rim.rotation.x = Math.PI / 2;

        wheelGroup.add(tire, rim);
        carGroup.add(wheelGroup);
      });

      // Direction and boulevard lane assignment
      const dir = i % 2 === 0 ? 1 : -1;
      const zLane = dir === 1 ? 42.5 : 47.5;
      carGroup.position.set((i - 1.5) * 58, 0, zLane);
      if (dir === -1) carGroup.rotation.y = Math.PI;

      this.environmentGroup.add(carGroup);
      this.vehicles.push({ group: carGroup, speed: 22 * dir, minX: -130, maxX: 130 });
    });
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 3. PHOTOREALISTIC ARCHITECTURAL TOWER (GLASS CURTAIN WALL, FINS, CANOPY)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  buildArchitecturalTower() {
    this.scene.add(this.facadeGroup);

    const towerW = 34;
    const towerD = 22;
    const totalFloors = 9;
    const floorH = 3.8;
    const totalH = totalFloors * floorH;

    // 1. Architectural Granite Podium Base with Recessed Reveal
    const podiumGeo = new THREE.BoxGeometry(towerW + 2.5, 1.4, towerD + 2.5);
    const podium = new THREE.Mesh(podiumGeo, this.materials.facadeConcrete);
    podium.position.set(0, 0.7, 0);
    podium.receiveShadow = true;
    podium.castShadow = true;
    this.facadeGroup.add(podium);

    // 2. Double-Height Grand Entrance Canopy (Brushed Graphite Steel + Tension Cables + Downlights)
    // 2. Double-Height Grand Entrance Canopy (Cantilevered Glass & Refined Gold/Steel Trims)
    const canopyW = 18;
    const canopyD = 7.5;

    // Slender perimeter steel frame with refined champagne-gold fascia
    const frameGeo = new THREE.BoxGeometry(canopyW, 0.16, canopyD);
    const canopyFrame = new THREE.Mesh(frameGeo, this.materials.accentGold);
    canopyFrame.position.set(0, floorH * 1.5, towerD / 2 + 3.8);
    canopyFrame.castShadow = true;
    this.facadeGroup.add(canopyFrame);

    // Inset Laminated Structural Glass Roof Panels
    const canopyGlass = new THREE.Mesh(
      new THREE.BoxGeometry(canopyW - 0.8, 0.08, canopyD - 0.8),
      this.materials.glass
    );
    canopyGlass.position.set(0, floorH * 1.5 + 0.06, towerD / 2 + 3.8);
    this.facadeGroup.add(canopyGlass);

    // Recessed Warm LED Downlights in Canopy Soffit
    for (let lx = -6.5; lx <= 6.5; lx += 3.25) {
      const downlight = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 0.06, 12),
        this.materials.interiorLight
      );
      downlight.position.set(lx, floorH * 1.5 - 0.10, towerD / 2 + 3.8);
      this.facadeGroup.add(downlight);
    }

    // High-Tensile Stainless Steel Tie-Back Cable Stays
    const rodGeo = new THREE.CylinderGeometry(0.035, 0.035, 5.8, 8);
    const rod1 = new THREE.Mesh(rodGeo, this.materials.steelBright);
    rod1.position.set(-7.5, floorH * 2.1, towerD / 2 + 1.9);
    rod1.rotation.x = 0.52;
    const rod2 = rod1.clone();
    rod2.position.x = 7.5;
    this.facadeGroup.add(rod1, rod2);

    // 3. Double-Height Lobby Entrance & Structural Glass Vestibule
    const lobbyGlassGeo = new THREE.BoxGeometry(towerW * 0.95, floorH * 1.8, 0.1);
    const lobbyGlass = new THREE.Mesh(lobbyGlassGeo, this.materials.glass);
    lobbyGlass.position.set(0, floorH * 0.9 + 0.7, towerD / 2);
    this.facadeGroup.add(lobbyGlass);

    // Stainless Steel Revolving Entrance Doors
    const doorCylinderGeo = new THREE.CylinderGeometry(1.6, 1.6, 2.8, 16, 1, true);
    const revolvingDoor = new THREE.Mesh(doorCylinderGeo, this.materials.glass);
    revolvingDoor.position.set(0, 2.1, towerD / 2 + 0.1);
    this.facadeGroup.add(revolvingDoor);

    const doorDrumGeo = new THREE.CylinderGeometry(1.65, 1.65, 0.25, 16);
    const doorDrum = new THREE.Mesh(doorDrumGeo, this.materials.mullion);
    doorDrum.position.set(0, 3.6, towerD / 2 + 0.1);
    this.facadeGroup.add(doorDrum);

    // Interior Lobby Floor & Reception Desk
    const lobbyFloor = new THREE.Mesh(
      new THREE.BoxGeometry(towerW - 2, 0.1, towerD - 2),
      this.materials.plazaPavers
    );
    lobbyFloor.position.set(0, 0.75, 0);
    this.facadeGroup.add(lobbyFloor);

    // Backlit Onyx Reception Counter with Refined Gold Trim
    const desk = new THREE.Mesh(new THREE.BoxGeometry(7.2, 1.2, 1.6), this.materials.accentGold);
    desk.position.set(0, 1.35, 2.5);
    this.facadeGroup.add(desk);

    // 4. Multi-Story Curtain Wall Glass Facade with Photorealistic Reflection Panels
    this.glassPanels = [];
    this.interiorLights = [];

    for (let f = 2; f <= totalFloors; f++) {
      const fy = (f - 0.5) * floorH + 0.7;

      // Front Curtain-Wall Facade (Mapped with Photorealistic Double-Glazed Office Glass)
      const frontCurtain = new THREE.Mesh(
        new THREE.BoxGeometry(towerW * 0.94, floorH * 0.86, 0.1),
        this.materials.curtainFacade
      );
      frontCurtain.position.set(0, fy, towerD / 2);
      this.facadeGroup.add(frontCurtain);
      this.glassPanels.push(frontCurtain);

      // Back Curtain-Wall Facade
      const backCurtain = frontCurtain.clone();
      backCurtain.position.z = -towerD / 2;
      this.facadeGroup.add(backCurtain);
      this.glassPanels.push(backCurtain);

      // Left & Right Flank Glass Curtain Walls
      const sideGlassGeo = new THREE.BoxGeometry(0.1, floorH * 0.86, towerD * 0.92);
      const leftGlass = new THREE.Mesh(sideGlassGeo, this.materials.curtainFacade);
      leftGlass.position.set(-towerW / 2, fy, 0);
      const rightGlass = leftGlass.clone();
      rightGlass.position.x = towerW / 2;
      this.facadeGroup.add(leftGlass, rightGlass);
      this.glassPanels.push(leftGlass, rightGlass);

      // Interior Illuminated Ceiling Light Troffers (Visible through Glass)
      const lightStripGeo = new THREE.BoxGeometry(towerW * 0.72, 0.08, 0.45);
      const interiorLight = new THREE.Mesh(lightStripGeo, this.materials.interiorLight);
      interiorLight.position.set(0, f * floorH + 0.7 - 0.12, 0);
      this.facadeGroup.add(interiorLight);
      this.interiorLights.push(interiorLight);

      // Formwork Architectural Concrete Spandrel Bands
      const spandrel = new THREE.Mesh(
        new THREE.BoxGeometry(towerW + 0.6, 0.55, towerD + 0.6),
        this.materials.facadeConcrete
      );
      spandrel.position.set(0, f * floorH + 0.7, 0);
      spandrel.castShadow = true;
      this.facadeGroup.add(spandrel);

      // Vertical Aerofoil Sunshade Louvers (Fins) Projecting in Graphite & Gold Accent
      const finGeo = new THREE.BoxGeometry(0.14, floorH * 0.88, 0.45);
      for (let mx = -towerW / 2 + 2.5; mx <= towerW / 2 - 2.5; mx += 3.2) {
        // Accentuate alternate fins with refined gold cap
        const isAccent = Math.abs(mx) < 4;
        const fin = new THREE.Mesh(finGeo, isAccent ? this.materials.accentGold : this.materials.mullion);
        fin.position.set(mx, fy, towerD / 2 + 0.22);
        fin.castShadow = true;
        this.facadeGroup.add(fin);
      }
    }

    // 5. Floor 5 Landscaped Sky-Terrace / Executive Balcony with Glass Balustrades
    const terraceY = 5 * floorH + 0.7;
    const terraceDeck = new THREE.Mesh(
      new THREE.BoxGeometry(10, 0.15, 3.2),
      this.materials.facadeConcrete
    );
    terraceDeck.position.set(0, terraceY + 0.08, towerD / 2 + 1.6);
    this.facadeGroup.add(terraceDeck);

    // Glass Balustrade with Gold Handrail
    const balustradeGlass = new THREE.Mesh(
      new THREE.BoxGeometry(9.8, 1.1, 0.08),
      this.materials.glass
    );
    balustradeGlass.position.set(0, terraceY + 0.7, towerD / 2 + 3.1);
    this.facadeGroup.add(balustradeGlass);

    const handrail = new THREE.Mesh(
      new THREE.BoxGeometry(10, 0.08, 0.12),
      this.materials.accentGold
    );
    handrail.position.set(0, terraceY + 1.25, towerD / 2 + 3.1);
    this.facadeGroup.add(handrail);

    // 6. Sculpted Architectural Rooftop Crown & Mechanical Penthouse Screen
    const crownY = totalH + 0.7;
    const crownGeo = new THREE.BoxGeometry(towerW + 1.4, 2.8, towerD + 1.4);
    const crown = new THREE.Mesh(crownGeo, this.materials.mullion);
    crown.position.set(0, crownY + 1.4, 0);
    crown.castShadow = true;
    this.facadeGroup.add(crown);

    // Perimeter Glass Windscreen on Roof
    const roofWindscreen = new THREE.Mesh(
      new THREE.BoxGeometry(towerW + 0.8, 1.5, towerD + 0.8),
      this.materials.glass
    );
    roofWindscreen.position.set(0, crownY + 3.5, 0);
    this.facadeGroup.add(roofWindscreen);

    // Rooftop BMU (Building Maintenance Unit) Crane Track
    const bmuTrackGeo = new THREE.BoxGeometry(towerW * 0.7, 0.25, towerD * 0.6);
    const bmuTrack = new THREE.Mesh(bmuTrackGeo, this.materials.structuralSteel);
    bmuTrack.position.set(0, crownY + 2.9, 0);
    this.facadeGroup.add(bmuTrack);
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 4. STRUCTURAL SKELETON (CIVIL ENGINEERING LAYER: RCC & STEEL)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  buildStructuralSkeleton() {
    this.scene.add(this.structureGroup);

    const colsX = 6;
    const colsZ = 4;
    const spanX = 5.6;
    const spanZ = 5.8;
    const totalFloors = 9;
    const floorH = 3.8;
    const colSize = 0.68;
    const totalH = totalFloors * floorH;

    this.structuralColumns = [];
    this.structuralBeams = [];

    // 1. Heavy Reinforced Concrete Columns
    const colGeo = new THREE.BoxGeometry(colSize, totalH, colSize);
    for (let ix = 0; ix < colsX; ix++) {
      for (let iz = 0; iz < colsZ; iz++) {
        const cx = (ix - (colsX - 1) / 2) * spanX;
        const cz = (iz - (colsZ - 1) / 2) * spanZ;

        const col = new THREE.Mesh(colGeo, this.materials.structuralConcrete);
        col.position.set(cx, totalH / 2 + 0.6, cz);
        col.castShadow = true;
        col.receiveShadow = true;
        this.structureGroup.add(col);
        this.structuralColumns.push(col);

        // Rebar Dowel Starters
        for (let r = 0; r < 4; r++) {
          const rebar = new THREE.Mesh(
            new THREE.CylinderGeometry(0.018, 0.018, 1.3, 6),
            this.materials.steelBright
          );
          const rx = r % 2 === 0 ? 0.22 : -0.22;
          const rz = r >= 2 ? 0.22 : -0.22;
          rebar.position.set(cx + rx, totalH + 0.6 + 0.65, cz + rz);
          this.structureGroup.add(rebar);
        }
      }
    }

    // 2. Concrete Shear Wall Core (Elevator Shafts)
    const coreMesh = new THREE.Mesh(
      new THREE.BoxGeometry(6.8, totalH, 5.2),
      this.materials.structuralConcrete
    );
    coreMesh.position.set(0, totalH / 2 + 0.6, 0);
    coreMesh.castShadow = true;
    this.structureGroup.add(coreMesh);

    // 3. Reinforced Floor Slabs & Steel Transfer Beams
    const slabW = (colsX - 1) * spanX + 3.2;
    const slabD = (colsZ - 1) * spanZ + 3.2;

    for (let f = 1; f <= totalFloors; f++) {
      const fy = f * floorH + 0.6;

      const slabMesh = new THREE.Mesh(
        new THREE.BoxGeometry(slabW, 0.28, slabD),
        this.materials.structuralConcrete
      );
      slabMesh.position.set(0, fy, 0);
      slabMesh.castShadow = true;
      slabMesh.receiveShadow = true;
      this.structureGroup.add(slabMesh);
      this.floorSlabs.push({ mesh: slabMesh, baseY: fy });

      // Longitudinal Beams
      for (let iz = 0; iz < colsZ; iz++) {
        const cz = (iz - (colsZ - 1) / 2) * spanZ;
        for (let ix = 0; ix < colsX - 1; ix++) {
          const mx = (ix - (colsX - 1) / 2) * spanX + spanX / 2;
          const beam = new THREE.Mesh(
            new THREE.BoxGeometry(spanX - colSize, 0.48, colSize * 0.8),
            this.materials.structuralSteel
          );
          beam.position.set(mx, fy - 0.24, cz);
          beam.castShadow = true;
          this.structureGroup.add(beam);
          this.structuralBeams.push(beam);
        }
      }

      // Transverse Beams
      for (let ix = 0; ix < colsX; ix++) {
        const cx = (ix - (colsX - 1) / 2) * spanX;
        for (let iz = 0; iz < colsZ - 1; iz++) {
          const mz = (iz - (colsZ - 1) / 2) * spanZ + spanZ / 2;
          const beam = new THREE.Mesh(
            new THREE.BoxGeometry(colSize * 0.8, 0.48, spanZ - colSize),
            this.materials.structuralSteel
          );
          beam.position.set(cx, fy - 0.24, mz);
          beam.castShadow = true;
          this.structureGroup.add(beam);
          this.structuralBeams.push(beam);
        }
      }
    }
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 5. BIM / DIGITAL ENGINEERING MODE
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  buildBIMMode() {
    this.scene.add(this.bimGroup);
    this.bimGroup.visible = false;

    const wireGeo = new THREE.WireframeGeometry(new THREE.BoxGeometry(32, 34, 20));
    const bimWire = new THREE.LineSegments(wireGeo, this.materials.bimLine);
    bimWire.position.set(0, 17.6, 0);
    this.bimGroup.add(bimWire);

    for (let f = 1; f <= 8; f++) {
      const grid = new THREE.GridHelper(26, 12, 0x9f7b35, 0xd8c08a);
      grid.position.set(0, f * 3.8 + 0.6, 0);
      grid.material.transparent = true;
      grid.material.opacity = 0.5;
      this.bimGroup.add(grid);
    }
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 6. MECHANICAL & MEP SYSTEMS (HVAC DUCTS, PIPING, ROTATING FANS)
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  buildMechanicalMEPSystems() {
    this.scene.add(this.mepGroup);

    const totalFloors = 9;
    const floorH = 3.8;

    for (let f = 1; f <= totalFloors; f++) {
      const fy = f * floorH + 0.6 - 0.55;

      // Supply Air Galvanized Duct
      const duct = new THREE.Mesh(
        new THREE.BoxGeometry(26, 0.42, 0.7),
        this.materials.duct
      );
      duct.position.set(0, fy, 4);
      duct.castShadow = true;
      this.mepGroup.add(duct);

      // Return Air Duct
      const retDuct = new THREE.Mesh(
        new THREE.BoxGeometry(26, 0.35, 0.55),
        this.materials.duct
      );
      retDuct.position.set(0, fy, -4);
      retDuct.castShadow = true;
      this.mepGroup.add(retDuct);

      // Chilled Water Pipe (Blue)
      const pipeChilled = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.065, 26, 12),
        this.materials.pipeChilled
      );
      pipeChilled.rotation.z = Math.PI / 2;
      pipeChilled.position.set(0, fy + 0.22, 1.8);
      this.mepGroup.add(pipeChilled);

      // Fire Sprinkler Pipe (Red)
      const pipeFire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.045, 26, 12),
        this.materials.pipeFire
      );
      pipeFire.rotation.z = Math.PI / 2;
      pipeFire.position.set(0, fy + 0.22, -1.8);
      this.mepGroup.add(pipeFire);
    }

    // Continuous MEP Fluid Pulses
    const pulseCount = 35;
    const pulseGeo = new THREE.SphereGeometry(0.09, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xd8c08a });

    for (let p = 0; p < pulseCount; p++) {
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      const floor = 1 + (p % 8);
      const fy = floor * floorH + 0.6 - 0.55;
      const x = -13 + (p / pulseCount) * 26;
      pulse.position.set(x, fy, 1.8);
      this.mepGroup.add(pulse);
      this.mepPulses.push({ mesh: pulse, speed: 8.5 + (p % 4) * 2, minX: -13, maxX: 13 });
    }

    // Rooftop Industrial HVAC Cooling Towers with Rotating Fan Blades
    const roofY = totalFloors * floorH + 1.2;
    const chillerHousingGeo = new THREE.BoxGeometry(4.8, 2.2, 3.4);
    const fanBladeGeo = new THREE.BoxGeometry(1.6, 0.04, 0.22);
    const fanHubGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.2, 12);

    const coolingTowerPositions = [
      [-9, roofY + 1.1, -4],
      [-3, roofY + 1.1, -4],
      [3, roofY + 1.1, -4],
      [9, roofY + 1.1, -4],
    ];

    coolingTowerPositions.forEach(([tx, ty, tz], i) => {
      const chillerGroup = new THREE.Group();
      chillerGroup.position.set(tx, ty, tz);

      const housing = new THREE.Mesh(chillerHousingGeo, this.materials.duct);
      housing.castShadow = true;
      chillerGroup.add(housing);

      const cowl = new THREE.Mesh(
        new THREE.CylinderGeometry(0.95, 0.95, 0.35, 16, 1, true),
        this.materials.mullion
      );
      cowl.position.set(0, 1.25, 0);
      chillerGroup.add(cowl);

      const fanGroup = new THREE.Group();
      fanGroup.position.set(0, 1.25, 0);

      const hub = new THREE.Mesh(fanHubGeo, this.materials.mullion);
      fanGroup.add(hub);

      for (let b = 0; b < 4; b++) {
        const blade = new THREE.Mesh(fanBladeGeo, this.materials.steelBright);
        blade.rotation.y = (b * Math.PI) / 2;
        fanGroup.add(blade);
      }

      chillerGroup.add(fanGroup);
      this.mepGroup.add(chillerGroup);
      this.fans.push({ group: fanGroup, speed: 7.5 + i * 1.2 });
    });
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 7. 15-SHOT CINEMATIC CAMERA CHOREOGRAPHER
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  setupCameraSpline() {
    this.waypoints = [
      { scroll: 0.00, pos: new THREE.Vector3(0, 92, 118), target: new THREE.Vector3(0, 20, 0), fov: 48 },
      { scroll: 0.08, pos: new THREE.Vector3(-14, 62, 88), target: new THREE.Vector3(0, 18, 0), fov: 48 },
      { scroll: 0.16, pos: new THREE.Vector3(-28, 26, 58), target: new THREE.Vector3(0, 18, 0), fov: 50 },
      { scroll: 0.24, pos: new THREE.Vector3(-10, 4.2, 32), target: new THREE.Vector3(0, 6, 12), fov: 52 },
      { scroll: 0.32, pos: new THREE.Vector3(0, 2.6, 12), target: new THREE.Vector3(0, 2.6, -6), fov: 54 },
      { scroll: 0.40, pos: new THREE.Vector3(14, 8.5, 18), target: new THREE.Vector3(0, 10, 0), fov: 52 },
      { scroll: 0.48, pos: new THREE.Vector3(26, 18, 24), target: new THREE.Vector3(0, 16, 0), fov: 48 },
      { scroll: 0.56, pos: new THREE.Vector3(0, 24, 38), target: new THREE.Vector3(0, 18, 0), fov: 46 },
      { scroll: 0.64, pos: new THREE.Vector3(-8, 14, 12), target: new THREE.Vector3(0, 14, 0), fov: 50 },
      { scroll: 0.72, pos: new THREE.Vector3(8, 22, 14), target: new THREE.Vector3(0, 20, 0), fov: 48 },
      { scroll: 0.80, pos: new THREE.Vector3(-24, 28, 44), target: new THREE.Vector3(0, 18, 0), fov: 48 },
      { scroll: 0.86, pos: new THREE.Vector3(28, 22, 52), target: new THREE.Vector3(0, 18, 0), fov: 46 },
      { scroll: 0.91, pos: new THREE.Vector3(-18, 18, 42), target: new THREE.Vector3(0, 16, 0), fov: 48 },
      { scroll: 0.96, pos: new THREE.Vector3(12, 16, 38), target: new THREE.Vector3(0, 14, 0), fov: 50 },
      { scroll: 1.00, pos: new THREE.Vector3(0, 88, 98), target: new THREE.Vector3(0, 16, 0), fov: 52 },
    ];
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // 8. UPDATE LOOP & CONTINUOUS ALIVE PHYSICS
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  addOrbitDelta(dx, dy) {
    this.orbit.targetX += dx * 0.004;
    this.orbit.targetY = THREE.MathUtils.clamp(this.orbit.targetY - dy * 0.003, -0.5, 0.5);
  }

  update(scrollProgress, mouseX = 0, mouseY = 0) {
    if (this.isDisposed) return;

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Track hero intro time
    if (!this.heroTime) this.heroTime = 0;
    this.heroTime += delta;

    this.targetScroll = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    if (this.targetScroll > 0.01) {
      this.hasScrolled = true;
    }
    this.currentScroll += (this.targetScroll - this.currentScroll) * 0.075;
    const s = this.currentScroll;

    this.mouse.targetX = mouseX;
    this.mouse.targetY = mouseY;
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // 1. Continuous Idle Animations
    this.fans.forEach(({ group, speed }) => {
      group.rotation.y += speed * delta;
    });

    this.vehicles.forEach(v => {
      v.group.position.x += v.speed * delta;
      if (v.speed > 0 && v.group.position.x > v.maxX) v.group.position.x = v.minX;
      if (v.speed < 0 && v.group.position.x < v.minX) v.group.position.x = v.maxX;
    });

    this.trees.forEach(({ group, phase }) => {
      group.rotation.z = Math.sin(elapsedTime * 1.5 + phase) * 0.025;
    });

    // â”€â”€ Cloud 3D drift & hero parting physics â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const ht = this.heroTime;
    const isParting = ht >= 2.5 && ht <= 7.0 && !this.hasScrolled;
    const partProgress = isParting ? (ht - 2.5) / 4.5 : (ht > 7.0 ? 1 : 0);

    this.cloudParticles.forEach(c => {
      let partX = 0;
      let partY = 0;
      if (partProgress > 0) {
        // Mid-altitude clouds part outward to reveal the building
        if (c.layer === 1) {
          const side = c.baseX >= 0 ? 1 : -1;
          partX = side * partProgress * 45;
          partY = partProgress * 8; // rise slightly as they part
        }
        // Low scud clouds disperse downward and outward
        if (c.layer === 2) {
          const side = c.baseX >= 0 ? 1 : -1;
          partX = side * partProgress * 28;
          partY = -partProgress * 6;
        }
      }

      // Continuous slow drift (different speeds per layer â€” high clouds move faster)
      const driftMul = c.layer === 0 ? 1.4 : c.layer === 1 ? 1.0 : 0.65;
      c.mesh.position.x = c.baseX + partX + Math.sin(elapsedTime * 0.06 * c.driftSpeed * driftMul) * 12;
      c.mesh.position.z = c.baseZ + Math.cos(elapsedTime * 0.05 * c.driftSpeed * driftMul) * 12;
      c.mesh.position.y = c.baseY + partY + Math.sin(elapsedTime * 0.04 * c.driftSpeed) * 2.5;
      // Slow lazy rotation around Y axis â€” real clouds rotate slowly
      c.mesh.rotation.y += c.rotSpeed * delta * 0.5;
      // Always face the camera (spherical billboard) but keep the slow Y-rotation
      c.mesh.lookAt(this.camera.position);
      c.mesh.rotation.y += c.rotSpeed * elapsedTime * 0.5; // re-apply rotation post-lookAt
    });

    this.mepPulses.forEach(p => {
      p.mesh.position.x += p.speed * delta;
      if (p.mesh.position.x > p.maxX) p.mesh.position.x = p.minX;
    });

    // Cinematic sunrise illumination sweep during opening descent
    if (ht < 6.0 && !this.hasScrolled) {
      const sunT = Math.min(1, ht / 5.0);
      this.sunLight.intensity = THREE.MathUtils.lerp(1.6, 2.6, sunT);
      // Warm sunrise orange â†’ neutral daylight
      this.sunLight.color.lerpColors(
        new THREE.Color(0xff9e45),
        new THREE.Color(0xfff3de),
        sunT
      );
      // Hemi sky light brightens as sun rises
      if (this.hemiLight) {
        this.hemiLight.intensity = THREE.MathUtils.lerp(0.7, 1.25, sunT);
      }
    }

    // 2. Architectural Reveal States
    this.updateArchitecturalReveal(s, ht);

    // 3. Camera Choreography & Depth Orbit
    this.updateCamera(s, elapsedTime, ht);

    // 4. Render via EffectComposer (bloom + GTAO + ACES output)
    if (this.composer) {
      this.composer.render(delta);
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  updateArchitecturalReveal(s, ht) {
    // Check if in Hero intro sequence
    const inHeroIntro = !this.hasScrolled && s < 0.03;

    if (inHeroIntro) {
      // 0-3s: clouds thick
      // 3-6s: clouds part
      // 9-12s: X-ray structure reveal
      const isIntroXray = ht >= 8.5 && ht <= 12.0;

      if (isIntroXray) {
        this.materials.glass.opacity = 0.16;
        if (this.materials.curtainFacade) {
          this.materials.curtainFacade.transparent = true;
          this.materials.curtainFacade.opacity = 0.16;
        }
        this.materials.facadeConcrete.transparent = true;
        this.materials.facadeConcrete.opacity = 0.32;
        this.materials.pipeChilled.emissive = new THREE.Color(0xc6a15b);
        this.materials.pipeChilled.emissiveIntensity = 0.5;
        this.materials.pipeFire.emissive = new THREE.Color(0x9f7b35);
        this.materials.pipeFire.emissiveIntensity = 0.45;
      } else {
        this.materials.glass.opacity = 0.72;
        if (this.materials.curtainFacade) {
          this.materials.curtainFacade.transparent = false;
          this.materials.curtainFacade.opacity = 1.0;
        }
        this.materials.facadeConcrete.transparent = false;
        this.materials.facadeConcrete.opacity = 1.0;
        this.materials.pipeChilled.emissive = new THREE.Color(0x000000);
        this.materials.pipeChilled.emissiveIntensity = 0;
        this.materials.pipeFire.emissive = new THREE.Color(0x000000);
        this.materials.pipeFire.emissiveIntensity = 0;
      }

      // Gentle, non-blinding mist opacity during hero intro
      const cloudOpacity = ht < 3.0 ? 0.25 : THREE.MathUtils.lerp(0.25, 0.12, Math.min(1, (ht - 3.0) / 3.0));
      this.cloudsGroup.children.forEach(c => {
        if (c.material) c.material.opacity = cloudOpacity;
      });
      return;
    }

    // Standard scroll reveal logic for sections below hero
    if (s < 0.16) {
      const cloudAlpha = THREE.MathUtils.mapLinear(s, 0.0, 0.16, 0.20, 0.08);
      this.cloudsGroup.children.forEach(c => {
        if (c.material) c.material.opacity = cloudAlpha;
      });
    } else {
      this.cloudsGroup.children.forEach(c => {
        if (c.material) c.material.opacity = 0.08;
      });
    }

    const isStructurePhase = s >= 0.36 && s <= 0.54;
    const isMepPhase = s >= 0.60 && s <= 0.76;
    const isBimPhase = s >= 0.52 && s <= 0.60;

    if (isStructurePhase || isMepPhase) {
      this.materials.glass.opacity = 0.14;
      if (this.materials.curtainFacade) {
        this.materials.curtainFacade.transparent = true;
        this.materials.curtainFacade.opacity = 0.14;
      }
      this.materials.facadeConcrete.transparent = true;
      this.materials.facadeConcrete.opacity = 0.28;
    } else {
      this.materials.glass.opacity = 0.72;
      if (this.materials.curtainFacade) {
        this.materials.curtainFacade.transparent = false;
        this.materials.curtainFacade.opacity = 1.0;
      }
      this.materials.facadeConcrete.transparent = false;
      this.materials.facadeConcrete.opacity = 1.0;
    }

    this.bimGroup.visible = isBimPhase;

    if (s >= 0.40 && s <= 0.52) {
      const assembleT = THREE.MathUtils.clamp((s - 0.40) / 0.10, 0, 1);
      this.floorSlabs.forEach((slab, idx) => {
        const delay = idx / this.floorSlabs.length;
        const localT = THREE.MathUtils.clamp((assembleT - delay * 0.4) / 0.6, 0, 1);
        slab.mesh.position.y = slab.baseY + (1 - localT) * 12;
        slab.mesh.scale.setScalar(0.2 + localT * 0.8);
      });
    } else {
      this.floorSlabs.forEach(slab => {
        slab.mesh.position.y = slab.baseY;
        slab.mesh.scale.setScalar(1);
      });
    }

    if (isMepPhase) {
      this.materials.pipeChilled.emissive = new THREE.Color(0xc6a15b);
      this.materials.pipeChilled.emissiveIntensity = 0.45;
      this.materials.pipeFire.emissive = new THREE.Color(0x9f7b35);
      this.materials.pipeFire.emissiveIntensity = 0.4;
    } else {
      this.materials.pipeChilled.emissive = new THREE.Color(0x000000);
      this.materials.pipeChilled.emissiveIntensity = 0;
      this.materials.pipeFire.emissive = new THREE.Color(0x000000);
      this.materials.pipeFire.emissiveIntensity = 0;
    }
  }

  updateCamera(s, elapsedTime, ht) {
    let targetCamPos = new THREE.Vector3();
    let targetLookAt = new THREE.Vector3();
    let targetFov = 48;

    // Check if in Hero opening director sequence (0 to 15s, scroll < 0.04)
    const inHeroDirector = !this.hasScrolled && s < 0.04;

    if (inHeroDirector) {
      // 0-3s: Clouds & Troposphere Flight
      // 3-6s: Descend & Cloud Parting Reveal
      // 6-9s: Approach & Campus Fly-Through
      // 9-12s: Structure X-Ray Transformation
      // 12-15s+: Settle into Hero Master Angle (Building on RIGHT, Text space on LEFT)
      if (ht < 3.0) {
        const t = ht / 3.0;
        const ease = t * t * (3 - 2 * t);
        targetCamPos.lerpVectors(new THREE.Vector3(0, 68, 95), new THREE.Vector3(-8, 52, 82), ease);
        targetLookAt.lerpVectors(new THREE.Vector3(0, 42, 0), new THREE.Vector3(2, 28, 0), ease);
        targetFov = 48;
      } else if (ht < 6.0) {
        const t = (ht - 3.0) / 3.0;
        const ease = t * t * (3 - 2 * t);
        targetCamPos.lerpVectors(new THREE.Vector3(-8, 52, 82), new THREE.Vector3(-16, 26, 60), ease);
        targetLookAt.lerpVectors(new THREE.Vector3(2, 28, 0), new THREE.Vector3(4, 18, 0), ease);
        targetFov = 50;
      } else if (ht < 9.0) {
        const t = (ht - 6.0) / 3.0;
        const ease = t * t * (3 - 2 * t);
        targetCamPos.lerpVectors(new THREE.Vector3(-16, 26, 60), new THREE.Vector3(-14, 12, 38), ease);
        targetLookAt.lerpVectors(new THREE.Vector3(4, 18, 0), new THREE.Vector3(2, 10, 0), ease);
        targetFov = 52;
      } else if (ht < 12.0) {
        const t = (ht - 9.0) / 3.0;
        const ease = t * t * (3 - 2 * t);
        targetCamPos.lerpVectors(new THREE.Vector3(-14, 12, 38), new THREE.Vector3(8, 11, 26), ease);
        targetLookAt.lerpVectors(new THREE.Vector3(2, 10, 0), new THREE.Vector3(0, 10, 0), ease);
        targetFov = 52;
      } else {
        // 12-15s+: Settle into Master Hero Angle (Building positioned on RIGHT, text space on LEFT)
        const t = Math.min(1, (ht - 12.0) / 3.0);
        const ease = t * t * (3 - 2 * t);
        targetCamPos.lerpVectors(new THREE.Vector3(8, 11, 26), new THREE.Vector3(-24, 16, 50), ease);
        targetLookAt.lerpVectors(new THREE.Vector3(0, 10, 0), new THREE.Vector3(8, 14, 0), ease);
        targetFov = 48;
      }
    } else {
      // User is scrolling: interpolate across the 15-shot spline
      let p0 = this.waypoints[0];
      let p1 = this.waypoints[this.waypoints.length - 1];

      for (let i = 0; i < this.waypoints.length - 1; i++) {
        if (s >= this.waypoints[i].scroll && s <= this.waypoints[i + 1].scroll) {
          p0 = this.waypoints[i];
          p1 = this.waypoints[i + 1];
          break;
        }
      }

      const range = p1.scroll - p0.scroll || 1;
      const t = THREE.MathUtils.clamp((s - p0.scroll) / range, 0, 1);
      const easeT = t * t * (3 - 2 * t);

      targetCamPos.lerpVectors(p0.pos, p1.pos, easeT);
      targetLookAt.lerpVectors(p0.target, p1.target, easeT);
      targetFov = THREE.MathUtils.lerp(p0.fov, p1.fov, easeT);
    }

    const floatY = Math.sin(elapsedTime * 0.9) * 0.45;
    const floatX = Math.cos(elapsedTime * 0.7) * 0.35;

    if (!this.orbit) this.orbit = { currentX: 0, currentY: 0, targetX: 0, targetY: 0 };
    this.orbit.currentX += (this.orbit.targetX - this.orbit.currentX) * 0.08;
    this.orbit.currentY += (this.orbit.targetY - this.orbit.currentY) * 0.08;

    const dx = targetCamPos.x - targetLookAt.x;
    const dz = targetCamPos.z - targetLookAt.z;
    const radius = Math.hypot(dx, dz);
    const baseAngle = Math.atan2(dx, dz);
    const totalAngle = baseAngle + this.orbit.currentX + (this.mouse.x * 0.06);

    const camX = targetLookAt.x + Math.sin(totalAngle) * radius + floatX;
    const camZ = targetLookAt.z + Math.cos(totalAngle) * radius;
    const camY = targetCamPos.y + (this.orbit.currentY * 20) - (this.mouse.y * 2.0) + floatY;

    this.camera.position.set(camX, camY, camZ);
    this.cameraTarget.copy(targetLookAt);
    this.cameraLookCurrent.lerp(this.cameraTarget, 0.08);
    this.camera.lookAt(this.cameraLookCurrent);

    if (Math.abs(this.camera.fov - targetFov) > 0.05) {
      this.camera.fov = targetFov;
      this.camera.updateProjectionMatrix();
    }
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (this.composer) this.composer.setSize(width, height);
    if (this.bloomPass) this.bloomPass.resolution.set(width, height);
    if (this.gtaoPass) this.gtaoPass.setSize(width, height);
  }

  dispose() {
    this.isDisposed = true;
    if (this.envMap) this.envMap.dispose();
    if (this.composer) this.composer.dispose();
    this.renderer.dispose();
    this.scene.clear();
  }
}
