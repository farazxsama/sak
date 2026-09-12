import * as THREE from 'three';

// ─── MATH HELPERS ────────────────────────────────────────────────────────────

export function lerp(a, b, t) { return a + (b - a) * t; }
export function clamp01(v) { return Math.min(1, Math.max(0, v)); }
export function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
export function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
export function mapRange(value, inMin, inMax, outMin, outMax) {
  return lerp(outMin, outMax, clamp01((value - inMin) / (inMax - inMin)));
}

// ─── GROUND & FOUNDATION PAD ─────────────────────────────────────────────────

export function createGroundAndFoundation(materials) {
  const group = new THREE.Group();
  const { groundMat, concreteMat, timberMat } = materials;

  // 1. Vast construction site earth / crushed gravel ground plane
  const groundGeo = new THREE.PlaneGeometry(160, 160, 32, 32);
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  group.add(ground);

  // 2. Subtle site survey grid / layout chalk lines
  const siteGrid = new THREE.GridHelper(90, 45, 0x475569, 0x94a3b8);
  siteGrid.position.y = 0.02;
  siteGrid.material.opacity = 0.35;
  siteGrid.material.transparent = true;
  group.add(siteGrid);

  // 3. Foundation concrete slab (pad) — 18m wide x 14m deep x 0.45m thick
  const padW = 18, padD = 14, padH = 0.45;
  const padGeo = new THREE.BoxGeometry(padW, padH, padD);
  const pad = new THREE.Mesh(padGeo, concreteMat);
  pad.position.set(0, padH / 2, 0);
  pad.receiveShadow = true;
  pad.castShadow = true;
  group.add(pad);

  // 4. Timber edge formwork boards around foundation pad perimeter
  const boardThick = 0.06;
  const boardH = padH + 0.08;

  // Front & Back timber formwork
  const fbGeo = new THREE.BoxGeometry(padW + 0.16, boardH, boardThick);
  const frontBoard = new THREE.Mesh(fbGeo, timberMat);
  frontBoard.position.set(0, boardH / 2, padD / 2 + boardThick / 2);
  frontBoard.castShadow = true;
  const backBoard = frontBoard.clone();
  backBoard.position.z = -padD / 2 - boardThick / 2;
  group.add(frontBoard, backBoard);

  // Left & Right timber formwork
  const lrGeo = new THREE.BoxGeometry(boardThick, boardH, padD + 0.16);
  const leftBoard = new THREE.Mesh(lrGeo, timberMat);
  leftBoard.position.set(-padW / 2 - boardThick / 2, boardH / 2, 0);
  leftBoard.castShadow = true;
  const rightBoard = leftBoard.clone();
  rightBoard.position.x = padW / 2 + boardThick / 2;
  group.add(leftBoard, rightBoard);

  // Timber stakes / formwork kickers
  const stakeGeo = new THREE.BoxGeometry(0.08, 0.65, 0.08);
  for (let x = -padW / 2 + 1.5; x <= padW / 2 - 1.5; x += 2.5) {
    const s1 = new THREE.Mesh(stakeGeo, timberMat);
    s1.position.set(x, 0.3, padD / 2 + 0.12);
    s1.rotation.x = 0.2;
    const s2 = s1.clone();
    s2.position.z = -padD / 2 - 0.12;
    s2.rotation.x = -0.2;
    group.add(s1, s2);
  }

  return group;
}

// ─── ACTIVE MULTI-STORY BUILDING FRAME ───────────────────────────────────────

export function createBuildingFrame(materials) {
  const group = new THREE.Group();
  const { concreteMat, steelMat, glassMat, rebarMat, ductMat, pipeMat } = materials;

  const colsX = 4;
  const colsZ = 3;
  const spanX = 4.2;  // spacing between columns in X
  const spanZ = 4.2;  // spacing between columns in Z
  const totalFloors = 7;
  const floorHeight = 2.7;
  const colW = 0.48; // column thickness

  const columnPositions = [];
  for (let ix = 0; ix < colsX; ix++) {
    for (let iz = 0; iz < colsZ; iz++) {
      const cx = (ix - (colsX - 1) / 2) * spanX;
      const cz = (iz - (colsZ - 1) / 2) * spanZ;
      columnPositions.push({ cx, cz, ix, iz });
    }
  }

  // 1. Reinforced Concrete Columns (Ground to Top Floor)
  const totalColHeight = totalFloors * floorHeight;
  const colGeo = new THREE.BoxGeometry(colW, totalColHeight, colW);

  columnPositions.forEach(({ cx, cz }) => {
    const col = new THREE.Mesh(colGeo, concreteMat);
    col.position.set(cx, totalColHeight / 2 + 0.45, cz);
    col.castShadow = true;
    col.receiveShadow = true;
    group.add(col);

    // Exposed rebar starter cage protruding from column top
    for (let rb = 0; rb < 4; rb++) {
      const rebar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.016, 0.016, 1.4, 6),
        rebarMat
      );
      const rox = (rb % 2 === 0 ? 0.14 : -0.14);
      const roz = (rb >= 2 ? 0.14 : -0.14);
      rebar.position.set(cx + rox, totalColHeight + 0.45 + 0.7, cz + roz);
      rebar.castShadow = true;
      group.add(rebar);
    }
  });

  // 2. Floor Slabs & Structural Beams for each level
  const slabW = (colsX - 1) * spanX + colW + 1.2;
  const slabD = (colsZ - 1) * spanZ + colW + 1.2;
  const slabThickness = 0.22;

  for (let f = 1; f <= totalFloors; f++) {
    const floorY = f * floorHeight + 0.45;

    // Longitudinal beams along X (connecting columns)
    for (let iz = 0; iz < colsZ; iz++) {
      const cz = (iz - (colsZ - 1) / 2) * spanZ;
      for (let ix = 0; ix < colsX - 1; ix++) {
        const mx = (ix - (colsX - 1) / 2) * spanX + spanX / 2;
        const bGeo = new THREE.BoxGeometry(spanX - colW + 0.04, 0.38, colW * 0.85);
        const beam = new THREE.Mesh(bGeo, concreteMat);
        beam.position.set(mx, floorY - 0.19, cz);
        beam.castShadow = true;
        group.add(beam);
      }
    }

    // Transverse beams along Z (connecting columns)
    for (let ix = 0; ix < colsX; ix++) {
      const cx = (ix - (colsX - 1) / 2) * spanX;
      for (let iz = 0; iz < colsZ - 1; iz++) {
        const mz = (iz - (colsZ - 1) / 2) * spanZ + spanZ / 2;
        const bGeo = new THREE.BoxGeometry(colW * 0.85, 0.38, spanZ - colW + 0.04);
        const beam = new THREE.Mesh(bGeo, concreteMat);
        beam.position.set(cx, floorY - 0.19, mz);
        beam.castShadow = true;
        group.add(beam);
      }
    }

    // Floor Slabs (Floors 1-4 are solid complete cast slabs)
    if (f <= 4) {
      const slabGeo = new THREE.BoxGeometry(slabW, slabThickness, slabD);
      const slab = new THREE.Mesh(slabGeo, concreteMat);
      slab.position.set(0, floorY + slabThickness / 2, 0);
      slab.castShadow = true;
      slab.receiveShadow = true;
      group.add(slab);
    } else if (f === 5) {
      // Floor 5: Partial slab with concrete pouring edge
      const partW = slabW * 0.65;
      const slabGeo = new THREE.BoxGeometry(partW, slabThickness, slabD);
      const slab = new THREE.Mesh(slabGeo, concreteMat);
      slab.position.set(-slabW / 2 + partW / 2, floorY + slabThickness / 2, 0);
      slab.castShadow = true;
      group.add(slab);

      // Exposed reinforcing rebar mesh on the unpoured section
      for (let rx = 0; rx < 8; rx++) {
        const rMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.012, 0.012, slabD - 0.6, 6),
          rebarMat
        );
        rMesh.rotation.x = Math.PI / 2;
        rMesh.position.set(partW / 2 - 1.5 + rx * 0.45, floorY + 0.05, 0);
        group.add(rMesh);
      }
    } else {
      // Floors 6 & 7: Open framework only (steel structural top floor beams)
      const steelTrussY = floorY;
      for (let ix = 0; ix < colsX - 1; ix++) {
        const mx = (ix - (colsX - 1) / 2) * spanX + spanX / 2;
        const iBeam = new THREE.Mesh(
          new THREE.BoxGeometry(spanX, 0.28, 0.16),
          steelMat
        );
        iBeam.position.set(mx, steelTrussY, 0);
        iBeam.castShadow = true;
        group.add(iBeam);
      }
    }

    // ARCHITECTURE: Modern Glass Facade Panels on completed floors (Floors 2 & 3)
    if (f === 2 || f === 3) {
      const facadeY = (f - 1) * floorHeight + 0.45 + floorHeight / 2;
      const glassH = floorHeight - slabThickness - 0.12;

      // Front elevation curtain wall glass
      const glassGeo = new THREE.BoxGeometry(spanX * 2.8, glassH, 0.05);
      const glassFront = new THREE.Mesh(glassGeo, glassMat);
      glassFront.position.set(0, facadeY, slabD / 2);
      glassFront.castShadow = true;
      group.add(glassFront);

      // Aluminum mullions
      for (let m = -3; m <= 3; m++) {
        const mullion = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, glassH + 0.08, 0.08),
          steelMat
        );
        mullion.position.set(m * 1.5, facadeY, slabD / 2 + 0.02);
        group.add(mullion);
      }

      // Horizontal transom bar
      const transom = new THREE.Mesh(
        new THREE.BoxGeometry(spanX * 2.8, 0.06, 0.08),
        steelMat
      );
      transom.position.set(0, facadeY, slabD / 2 + 0.02);
      group.add(transom);
    }

    // MECHANICAL: Interior MEP HVAC Ducts & Piping visible on Level 1 & 2
    if (f === 1 || f === 2) {
      const mepY = f * floorHeight + 0.45 - 0.42;

      // Main rectangular HVAC galvanized supply duct
      const ductGeo = new THREE.BoxGeometry(slabW * 0.75, 0.28, 0.45);
      const duct = new THREE.Mesh(ductGeo, ductMat);
      duct.position.set(0, mepY, 0.8);
      duct.castShadow = true;
      group.add(duct);

      // Chilled water & fire sprinkler pipes (copper and blue industrial pipes)
      const pipeGeo = new THREE.CylinderGeometry(0.045, 0.045, slabW * 0.8, 12);
      const pipe1 = new THREE.Mesh(pipeGeo, pipeMat);
      pipe1.rotation.z = Math.PI / 2;
      pipe1.position.set(0, mepY + 0.15, -0.6);
      group.add(pipe1);

      const pipe2 = pipe1.clone();
      pipe2.position.z = -0.85;
      group.add(pipe2);

      // Pipe hanger rods dropped from ceiling slab
      for (let px = -4; px <= 4; px += 2) {
        const hanger = new THREE.Mesh(
          new THREE.CylinderGeometry(0.008, 0.008, 0.45, 6),
          steelMat
        );
        hanger.position.set(px, mepY + 0.22, -0.6);
        group.add(hanger);
      }
    }
  }

  // Lift / Stair Core (Shear Wall in center-back)
  const coreW = 3.4, coreD = 3.0;
  const coreGeo = new THREE.BoxGeometry(coreW, totalColHeight, coreD);
  const core = new THREE.Mesh(coreGeo, concreteMat);
  core.position.set(0, totalColHeight / 2 + 0.45, -spanZ / 2);
  core.castShadow = true;
  core.receiveShadow = true;
  group.add(core);

  return group;
}

// ─── REALISTIC TUBE-AND-COUPLER SCAFFOLDING ──────────────────────────────────

export function createScaffolding(materials) {
  const group = new THREE.Group();
  const { scaffoldMat, timberMat, safetyNetMat } = materials;

  // Positioned along the right elevation of the building
  const startX = 7.4;
  const baysZ = 4;
  const baySpacingZ = 2.4;
  const bayWidthX = 1.4;
  const levels = 6;
  const levelH = 2.0;

  const rStandard = 0.032;
  const totalH = levels * levelH;

  // 1. Vertical Standards (Poles) with base jacks at ground
  const standardGeo = new THREE.CylinderGeometry(rStandard, rStandard, totalH, 8);
  const baseJackGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 8);

  for (let row = 0; row < 2; row++) {
    const x = startX + row * bayWidthX;
    for (let b = 0; b <= baysZ; b++) {
      const z = (b - baysZ / 2) * baySpacingZ;

      // Base plate on ground
      const base = new THREE.Mesh(baseJackGeo, scaffoldMat);
      base.position.set(x, 0.02, z);
      group.add(base);

      // Vertical tube
      const pole = new THREE.Mesh(standardGeo, scaffoldMat);
      pole.position.set(x, totalH / 2, z);
      pole.castShadow = true;
      group.add(pole);
    }
  }

  // 2. Horizontal Ledgers (along Z) and Transoms (along X) at each level
  const ledgerZGeo = new THREE.CylinderGeometry(0.025, 0.025, baysZ * baySpacingZ, 8);
  const transomXGeo = new THREE.CylinderGeometry(0.025, 0.025, bayWidthX, 8);

  for (let lvl = 1; lvl <= levels; lvl++) {
    const y = lvl * levelH;

    // Ledgers (Z direction)
    for (let row = 0; row < 2; row++) {
      const x = startX + row * bayWidthX;
      const ledger = new THREE.Mesh(ledgerZGeo, scaffoldMat);
      ledger.rotation.x = Math.PI / 2;
      ledger.position.set(x, y, 0);
      group.add(ledger);

      // Top guardrail (0.95m above deck)
      if (lvl >= 2 && lvl <= 5) {
        const rail = new THREE.Mesh(ledgerZGeo, scaffoldMat);
        rail.rotation.x = Math.PI / 2;
        rail.position.set(x, y + 0.95, 0);
        group.add(rail);
      }
    }

    // Transoms (X direction across the bay)
    for (let b = 0; b <= baysZ; b++) {
      const z = (b - baysZ / 2) * baySpacingZ;
      const transom = new THREE.Mesh(transomXGeo, scaffoldMat);
      transom.rotation.z = Math.PI / 2;
      transom.position.set(startX + bayWidthX / 2, y, z);
      group.add(transom);
    }

    // Timber walking boards (Levels 2, 4, 5)
    if (lvl === 2 || lvl === 4 || lvl === 5) {
      const deckGeo = new THREE.BoxGeometry(bayWidthX - 0.08, 0.05, baysZ * baySpacingZ);
      const deck = new THREE.Mesh(deckGeo, timberMat);
      deck.position.set(startX + bayWidthX / 2, y + 0.03, 0);
      deck.castShadow = true;
      deck.receiveShadow = true;
      group.add(deck);

      // Yellow/timber kickboard / toe board along outside edge
      const toeGeo = new THREE.BoxGeometry(0.02, 0.16, baysZ * baySpacingZ);
      const toe = new THREE.Mesh(toeGeo, timberMat);
      toe.position.set(startX + bayWidthX, y + 0.1, 0);
      group.add(toe);
    }
  }

  // 3. Diagonal Cross Bracing (X-struts for stability)
  const diagLen = Math.sqrt(baySpacingZ * baySpacingZ + levelH * levelH * 4);
  const diagAngle = Math.atan2(levelH * 2, baySpacingZ);
  const diagGeo = new THREE.CylinderGeometry(0.02, 0.02, diagLen, 6);

  for (let b = 0; b < baysZ; b += 2) {
    const mz = (b + 0.5 - baysZ / 2) * baySpacingZ;
    const brace1 = new THREE.Mesh(diagGeo, scaffoldMat);
    brace1.rotation.x = diagAngle;
    brace1.position.set(startX + bayWidthX + 0.02, levelH * 2, mz);
    const brace2 = new THREE.Mesh(diagGeo, scaffoldMat);
    brace2.rotation.x = -diagAngle;
    brace2.position.set(startX + bayWidthX + 0.02, levelH * 2, mz);
    group.add(brace1, brace2);
  }

  // 4. Safety Debris Netting screen on top working levels
  const netGeo = new THREE.PlaneGeometry(baysZ * baySpacingZ, levelH * 2.5);
  const net = new THREE.Mesh(netGeo, safetyNetMat);
  net.position.set(startX + bayWidthX + 0.04, levelH * 4, 0);
  net.rotation.y = Math.PI / 2;
  group.add(net);

  return group;
}

// ─── INDUSTRIAL YELLOW TOWER CRANE ───────────────────────────────────────────

export function createTowerCrane(materials) {
  const group = new THREE.Group();
  const { craneYellowMat, craneDarkMat, cableMat } = materials;

  // Located at far background-left of the construction site
  group.position.set(-13.5, 0, -11.0);

  const mastH = 29.0;
  const mastW = 1.35;

  // 1. Concrete foundation pad for crane
  const craneBaseGeo = new THREE.BoxGeometry(4.0, 0.6, 4.0);
  const craneBase = new THREE.Mesh(craneBaseGeo, materials.concreteMat);
  craneBase.position.y = 0.3;
  craneBase.castShadow = true;
  craneBase.receiveShadow = true;
  group.add(craneBase);

  // 2. Vertical Mast Lattice Tower (4 corner legs + horizontal & diagonal lacings)
  const legGeo = new THREE.BoxGeometry(0.12, mastH, 0.12);
  [-mastW / 2, mastW / 2].forEach(lx => {
    [-mastW / 2, mastW / 2].forEach(lz => {
      const leg = new THREE.Mesh(legGeo, craneYellowMat);
      leg.position.set(lx, mastH / 2 + 0.6, lz);
      leg.castShadow = true;
      group.add(leg);
    });
  });

  // Mast horizontal & diagonal cross lacings every 1.8m
  const lacingCount = Math.floor(mastH / 1.8);
  const lacingHorizX = new THREE.BoxGeometry(mastW, 0.06, 0.06);
  const lacingHorizZ = new THREE.BoxGeometry(0.06, 0.06, mastW);
  const lacingDiagLen = Math.sqrt(mastW * mastW + 1.8 * 1.8);
  const lacingDiagGeo = new THREE.CylinderGeometry(0.02, 0.02, lacingDiagLen, 6);
  const diagAngle = Math.atan2(1.8, mastW);

  for (let l = 1; l <= lacingCount; l++) {
    const ly = l * 1.8 + 0.6;
    // Horizontals
    const hx1 = new THREE.Mesh(lacingHorizX, craneYellowMat);
    hx1.position.set(0, ly, mastW / 2);
    const hx2 = hx1.clone();
    hx2.position.z = -mastW / 2;
    const hz1 = new THREE.Mesh(lacingHorizZ, craneYellowMat);
    hz1.position.set(mastW / 2, ly, 0);
    const hz2 = hz1.clone();
    hz2.position.x = -mastW / 2;
    group.add(hx1, hx2, hz1, hz2);

    // Front/back diagonal
    const dMesh = new THREE.Mesh(lacingDiagGeo, craneYellowMat);
    dMesh.rotation.z = (l % 2 === 0 ? 1 : -1) * diagAngle;
    dMesh.position.set(0, ly - 0.9, mastW / 2);
    group.add(dMesh);
  }

  // 3. Slewing Unit & Rotating Upper Assembly (Jib + Counter-jib)
  const slewingGroup = new THREE.Group();
  slewingGroup.position.set(0, mastH + 0.6, 0);

  // Slewing ring
  const slewRingGeo = new THREE.CylinderGeometry(mastW * 0.7, mastW * 0.7, 0.45, 16);
  const slewRing = new THREE.Mesh(slewRingGeo, craneDarkMat);
  slewRing.position.y = 0.22;
  slewingGroup.add(slewRing);

  // Operator Cabin on right side of tower
  const cabGeo = new THREE.BoxGeometry(1.2, 1.6, 1.4);
  const cab = new THREE.Mesh(cabGeo, craneYellowMat);
  cab.position.set(mastW * 0.9, 1.2, 0.3);
  cab.castShadow = true;
  slewingGroup.add(cab);

  // Cabin front window
  const cabWinGeo = new THREE.BoxGeometry(0.04, 0.9, 1.1);
  const cabWin = new THREE.Mesh(cabWinGeo, materials.glassMat);
  cabWin.position.set(mastW * 0.9 + 0.6, 1.3, 0.3);
  slewingGroup.add(cabWin);

  // A-frame tower apex (cathead) above slewing ring
  const apexH = 5.2;
  const apexLegGeo = new THREE.CylinderGeometry(0.06, 0.06, apexH, 8);
  const apexLeg1 = new THREE.Mesh(apexLegGeo, craneYellowMat);
  apexLeg1.position.set(0.4, apexH / 2 + 0.5, 0);
  apexLeg1.rotation.z = -0.15;
  const apexLeg2 = new THREE.Mesh(apexLegGeo, craneYellowMat);
  apexLeg2.position.set(-0.4, apexH / 2 + 0.5, 0);
  apexLeg2.rotation.z = 0.15;
  slewingGroup.add(apexLeg1, apexLeg2);

  // Main Working Jib (Reaching 25 meters across over the site!)
  const jibLen = 25.0;
  const jibGroup = new THREE.Group();
  jibGroup.position.set(0, 0.8, 0);

  // Triangular lattice boom bottom chords and top chord
  const chordGeo = new THREE.CylinderGeometry(0.045, 0.045, jibLen, 8);
  const topChord = new THREE.Mesh(chordGeo, craneYellowMat);
  topChord.rotation.z = -Math.PI / 2;
  topChord.position.set(jibLen / 2, 0.9, 0);
  topChord.castShadow = true;

  const botChord1 = new THREE.Mesh(chordGeo, craneYellowMat);
  botChord1.rotation.z = -Math.PI / 2;
  botChord1.position.set(jibLen / 2, 0, 0.5);

  const botChord2 = botChord1.clone();
  botChord2.position.z = -0.5;

  jibGroup.add(topChord, botChord1, botChord2);

  // Jib vertical lacings along length
  for (let jx = 1.5; jx < jibLen; jx += 1.8) {
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.9, 6),
      craneYellowMat
    );
    post.position.set(jx, 0.45, 0.5);
    const post2 = post.clone();
    post2.position.z = -0.5;
    jibGroup.add(post, post2);
  }

  // Counter-Jib (reaching back 8 meters)
  const cJibLen = 8.5;
  const cJibChord = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, cJibLen, 8),
    craneYellowMat
  );
  cJibChord.rotation.z = Math.PI / 2;
  cJibChord.position.set(-cJibLen / 2, 0.4, 0);
  jibGroup.add(cJibChord);

  // Concrete Counterweights at rear of counter-jib
  for (let cw = 0; cw < 3; cw++) {
    const weightGeo = new THREE.BoxGeometry(0.7, 1.4, 1.3);
    const weight = new THREE.Mesh(weightGeo, materials.concreteMat);
    weight.position.set(-cJibLen + 1.2 + cw * 0.85, 0.8, 0);
    weight.castShadow = true;
    jibGroup.add(weight);
  }

  // Pendant stay cables connecting A-frame apex to jib and counter-jib
  const pendant1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 17, 6),
    cableMat
  );
  pendant1.position.set(8.0, 2.8, 0);
  pendant1.rotation.z = -Math.atan2(apexH - 0.8, 16);
  slewingGroup.add(pendant1);

  const pendantBack = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 9.5, 6),
    cableMat
  );
  pendantBack.position.set(-4.0, 2.8, 0);
  pendantBack.rotation.z = Math.atan2(apexH - 0.8, 7.5);
  slewingGroup.add(pendantBack);

  // Hoist Trolley & Hook Block hanging down over the building
  const trolleyGeo = new THREE.BoxGeometry(0.8, 0.35, 0.9);
  const trolley = new THREE.Mesh(trolleyGeo, craneDarkMat);
  const trolleyDist = 14.0; // positioned right above active building zone
  trolley.position.set(trolleyDist, -0.15, 0);
  jibGroup.add(trolley);

  // Hoist steel wire ropes
  const hoistCableH = 14.0;
  const hoistCable = new THREE.Mesh(
    new THREE.CylinderGeometry(0.01, 0.01, hoistCableH, 6),
    cableMat
  );
  hoistCable.position.set(trolleyDist, -hoistCableH / 2 - 0.3, 0);
  jibGroup.add(hoistCable);

  // Crane Hook Block with yellow pulley box and steel hook
  const hookBlockGeo = new THREE.BoxGeometry(0.45, 0.65, 0.35);
  const hookBlock = new THREE.Mesh(hookBlockGeo, craneYellowMat);
  hookBlock.position.set(trolleyDist, -hoistCableH - 0.6, 0);
  hookBlock.castShadow = true;

  const hookTorus = new THREE.Mesh(
    new THREE.TorusGeometry(0.18, 0.04, 8, 16, Math.PI * 1.3),
    craneDarkMat
  );
  hookTorus.rotation.z = Math.PI / 2;
  hookTorus.position.set(trolleyDist, -hoistCableH - 1.05, 0);
  jibGroup.add(hookBlock, hookTorus);

  slewingGroup.add(jibGroup);
  group.add(slewingGroup);

  return { group, slewingGroup };
}

// ─── SITE CLUTTER (REBAR, PRECAST SLABS, CONES, TIMBER) ──────────────────────

export function createSiteClutter(materials) {
  const group = new THREE.Group();
  const { concreteMat, rebarMat, timberMat, safetyConeMat, steelMat } = materials;

  // 1. Rebar Bundles (stored on timber dunnage blocks at site edge)
  const rebarBundleGroup = new THREE.Group();
  rebarBundleGroup.position.set(-6.8, 0, 8.5);

  // Dunnage timbers
  for (let d = -1.2; d <= 1.2; d += 1.2) {
    const dunnage = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 2.8), timberMat);
    dunnage.position.set(d, 0.07, 0);
    rebarBundleGroup.add(dunnage);
  }

  // 24 bundled steel reinforcement bars
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      const bar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.022, 5.5, 6),
        rebarMat
      );
      bar.rotation.z = Math.PI / 2;
      bar.position.set(0, 0.18 + row * 0.05, (col - 3.5) * 0.06);
      bar.castShadow = true;
      rebarBundleGroup.add(bar);
    }
  }
  group.add(rebarBundleGroup);

  // 2. Precast Concrete Slabs stack (ready to be hoisted)
  const precastGroup = new THREE.Group();
  precastGroup.position.set(6.2, 0, 8.2);

  for (let s = 0; s < 4; s++) {
    const pcSlab = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.18, 1.8),
      concreteMat
    );
    pcSlab.position.set(0, 0.09 + s * 0.24, 0);
    pcSlab.castShadow = true;
    pcSlab.receiveShadow = true;
    precastGroup.add(pcSlab);

    // Spacers between slabs
    if (s < 3) {
      [-1.4, 1.4].forEach(sx => {
        const spacer = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 1.8), timberMat);
        spacer.position.set(sx, 0.21 + s * 0.24, 0);
        precastGroup.add(spacer);
      });
    }
  }
  group.add(precastGroup);

  // 3. Traffic / Safety Cones around the perimeter
  const conePositions = [
    [-8.5, 7.8], [-5.5, 9.2], [-2.0, 9.6], [2.0, 9.6], [5.5, 9.2], [8.5, 7.8],
    [9.8, 3.5], [9.8, -3.5], [-9.8, 3.5], [-9.8, -3.5],
  ];

  const coneGeo = new THREE.ConeGeometry(0.24, 0.72, 12);
  const coneBaseGeo = new THREE.BoxGeometry(0.52, 0.04, 0.52);
  const stripeGeo = new THREE.CylinderGeometry(0.17, 0.20, 0.18, 12);
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });

  conePositions.forEach(([cx, cz]) => {
    const coneG = new THREE.Group();
    coneG.position.set(cx, 0, cz);

    const base = new THREE.Mesh(coneBaseGeo, safetyConeMat);
    base.position.y = 0.02;
    const body = new THREE.Mesh(coneGeo, safetyConeMat);
    body.position.y = 0.38;
    body.castShadow = true;

    const stripe = new THREE.Mesh(stripeGeo, whiteMat);
    stripe.position.y = 0.35;

    coneG.add(base, body, stripe);
    group.add(coneG);
  });

  // 4. Site Equipment / Storage Container
  const containerGeo = new THREE.BoxGeometry(4.8, 2.4, 2.2);
  const containerMat = new THREE.MeshStandardMaterial({
    color: 0x1e3a8a, // Deep industrial blue
    metalness: 0.65,
    roughness: 0.45,
  });
  const siteContainer = new THREE.Mesh(containerGeo, containerMat);
  siteContainer.position.set(-11.5, 1.2, 5.5);
  siteContainer.rotation.y = 0.18;
  siteContainer.castShadow = true;
  siteContainer.receiveShadow = true;
  group.add(siteContainer);

  return group;
}

// ─── CONSTRUCTION WORKER BILLBOARDS ──────────────────────────────────────────

export function createWorkerSprites(workerTexture) {
  const group = new THREE.Group();

  // Create billboard sprites with human height (~1.82m)
  const workerH = 1.82;
  const workerW = 1.82;
  const planeGeo = new THREE.PlaneGeometry(workerW, workerH);

  const spriteMat = new THREE.MeshBasicMaterial({
    map: workerTexture,
    transparent: true,
    alphaTest: 0.25,
    side: THREE.DoubleSide,
  });

  const workerPositions = [
    { x: -3.2, y: 0.45 + workerH / 2, z: 6.2, ry: 0.3 },  // Near front-left column
    { x: 3.8, y: 0.45 + workerH / 2, z: 5.8, ry: -0.4 },  // Inspecting blueprints near right bay
    { x: -0.8, y: 0.45 + workerH / 2, z: 7.2, ry: 0.05 }, // Site surveyor
  ];

  workerPositions.forEach(p => {
    const worker = new THREE.Mesh(planeGeo, spriteMat);
    worker.position.set(p.x, p.y, p.z);
    worker.rotation.y = p.ry;
    group.add(worker);
  });

  return group;
}

// ─── WARM SUNLIT DUST PARTICLES ──────────────────────────────────────────────

export function createDustParticles(count, isMobile) {
  const n = isMobile ? 650 : count;
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);

  // Warm daylight golden & ambient atmospheric dust
  const colors = [
    new THREE.Color(0xfef08a), // warm sun speck
    new THREE.Color(0xfde047), // golden dust
    new THREE.Color(0xe2e8f0), // light chalk dust
    new THREE.Color(0xdbeafe), // sky bounce
  ];

  for (let i = 0; i < n; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 55;
    pos[i * 3 + 1] = Math.random() * 32;          // drifting above ground
    pos[i * 3 + 2] = (Math.random() - 0.5) * 45;

    const c = colors[Math.floor(Math.random() * colors.length)];
    col[i * 3]     = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

  return new THREE.Points(geo, new THREE.PointsMaterial({
    size: isMobile ? 0.12 : 0.18,
    transparent: true,
    opacity: 0.6,
    vertexColors: true,
    blending: THREE.NormalBlending,
    depthWrite: false,
  }));
}