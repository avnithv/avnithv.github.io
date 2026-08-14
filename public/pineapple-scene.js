// Metallic pineapple hero - procedural faceted pineapple (orange body, dark-green
// crown) under a painted equirectangular environment map, surrounded by metallic
// polygonal flecks (triangles / parallelograms) that spin individually and rotate
// together with the pineapple. Adapted from the Claude Design handoff so that the
// animation, placement and particle behavior are all driven by a config object -
// see DEFAULTS below and the CONFIG block in index.astro for the knobs.
//
// No three/examples modules required; Three is pulled from a CDN at runtime.

const THREE_URLS = [
  'https://unpkg.com/three@0.160.0/build/three.module.js',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
];

let _threePromise = null;
function loadThree() {
  if (_threePromise) return _threePromise;
  _threePromise = (async () => {
    let lastErr;
    for (const url of THREE_URLS) {
      try { return await import(url); } catch (e) { lastErr = e; }
    }
    throw lastErr;
  })();
  return _threePromise;
}

// ---- default config (everything tweakable lives here) ------------------------
const DEFAULTS = {
  variant: 'A',          // 'A' | 'B' - env tint + which rim-light color
  scale: 0.5,            // overall pineapple size
  baseX: 1.8,            // horizontal offset (+ = right, − = left)
  baseY: -0.3,           // vertical offset
  tilt: 0,               // static lean: + tilts the top to the right, − to the left
  rotationSpeed: 0,      // base spin per frame (radians); 0 = no rotation by default
  bobAmount: 0.06,       // vertical float distance
  bobSpeed: 0.0011,      // vertical float speed
  pointerParallax: true, // subtle camera/rotation drift toward the cursor
  particles: {
    count: 90,           // number of flecks (or pass a name via `particles` string)
    sizeMin: 0.025,      // smallest fleck scale
    sizeRange: 0.045,    // added random size on top of sizeMin
    driftMin: 0.6,       // upward drift speed (min) - bigger = faster
    driftRange: 1.6,     // added random drift
    spin: 0.004,         // individual fleck spin speed
    radiusMin: 2.3,      // inner radius of the fleck shell
    radiusRange: 2.7,    // shell thickness
  },
};

function mergeConfig(opts) {
  const cfg = { ...DEFAULTS, ...opts };
  cfg.particles = { ...DEFAULTS.particles, ...(opts.particles || {}) };
  // honor reduced-motion: freeze the scene but still draw a static pineapple
  if (typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cfg.rotationSpeed = 0;
    cfg.bobAmount = 0;
    cfg.pointerParallax = false;
    cfg.particles.driftMin = 0; cfg.particles.driftRange = 0; cfg.particles.spin = 0;
  }
  return cfg;
}

// ---- theme -------------------------------------------------------------------
const THEME = {
  orange: 0xff7a16,
  orangeDeep: 0xe24f0a,
  green: 0x1f6b2e,
  greenDeep: 0x123f1c,
  silver: 0xeef2f8,
};

// ---- painted equirectangular environment (silver studio + theme tint) --------
function makeEnvCanvas(variant) {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const x = c.getContext('2d');

  const g = x.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0.00, '#eef2f8');
  g.addColorStop(0.42, '#838b99');
  g.addColorStop(0.50, '#33373f');
  g.addColorStop(0.56, '#1b1e24');
  g.addColorStop(1.00, '#0a0b0e');
  x.fillStyle = g; x.fillRect(0, 0, 1024, 512);

  const blob = (cx, cy, r, col, a) => {
    const rg = x.createRadialGradient(cx, cy, 0, cx, cy, r);
    rg.addColorStop(0, col); rg.addColorStop(1, 'rgba(0,0,0,0)');
    x.globalAlpha = a; x.fillStyle = rg;
    x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill();
    x.globalAlpha = 1;
  };

  // bright silver key + fill lights -> metallic highlights
  blob(300, 110, 280, '#ffffff', 0.95);
  blob(720, 80, 200, '#ffffff', 0.72);
  blob(540, 160, 150, '#ffffff', 0.5);
  blob(150, 300, 260, '#05060a', 0.6);
  blob(880, 320, 240, '#05060a', 0.55);

  // theme tints (warm orange for A, green for B) - subtle, keeps silver dominant
  if (variant === 'B') {
    blob(80, 220, 220, 'rgba(60,170,90,0.5)', 0.55);
    blob(940, 150, 180, 'rgba(255,140,50,0.45)', 0.5);
  } else {
    blob(120, 230, 220, 'rgba(255,150,40,0.5)', 0.55);
    blob(930, 160, 180, 'rgba(70,180,100,0.4)', 0.45);
  }
  return c;
}

// ---- geometry helpers --------------------------------------------------------
function faceted(THREE, geo, amount, seed) {
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n = Math.sin(v.x * 5.1 + seed) * Math.cos(v.y * 4.3 - seed) * Math.sin(v.z * 6.2 + seed * 1.7);
    const k = 1 + n * amount;
    pos.setXYZ(i, v.x * k, v.y * k, v.z * k);
  }
  geo.computeVertexNormals();
  return geo;
}

function buildPineapple(THREE, variant) {
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({
    color: THEME.orange, metalness: 0.78, roughness: 0.34,
    emissive: 0x7a2e00, emissiveIntensity: 0.32,
    flatShading: true, envMapIntensity: 1.5,
  });
  const crownMat = new THREE.MeshStandardMaterial({
    color: THEME.green, metalness: 0.82, roughness: 0.32,
    emissive: 0x0a3318, emissiveIntensity: 0.3,
    flatShading: true, envMapIntensity: 1.25, side: THREE.DoubleSide,
  });

  // body: faceted ellipsoid
  let body = new THREE.IcosahedronGeometry(1.3, 3);
  body = faceted(THREE, body, 0.05, 12.34);
  body.scale(1, 1.32, 1);
  const bodyMesh = new THREE.Mesh(body, bodyMat);
  bodyMesh.position.y = -0.15;
  group.add(bodyMesh);

  // dark-green core cap over the top of the body - occludes the orange that would
  // otherwise peek between the crown blades, reading as the dense center of the crown
  const capMat = new THREE.MeshStandardMaterial({
    color: THEME.greenDeep, metalness: 0.8, roughness: 0.4,
    emissive: 0x05180c, emissiveIntensity: 0.25,
    flatShading: true, envMapIntensity: 1.1,
  });
  let cap = new THREE.IcosahedronGeometry(0.78, 2);
  cap = faceted(THREE, cap, 0.06, 7.7);
  cap.scale(1, 0.55, 1);          // flatten into a dome
  const capMesh = new THREE.Mesh(cap, capMat);
  capMesh.position.y = 1.17;      // sits at the crown base, just above the body top
  group.add(capMesh);

  // crown: long curved keeled blades that bend up then arc over and outwards
  const topY = 1.45;
  const rings = [
    { count: 1,  length: 3.0, width: 0.54, bend: 0.55, tilt: 0.00, radius: 0.00, drop: 0.00 },
    { count: 6,  length: 2.8, width: 0.50, bend: 1.30, tilt: 0.12, radius: 0.22, drop: 0.05 },
    { count: 8,  length: 2.5, width: 0.44, bend: 1.95, tilt: 0.26, radius: 0.42, drop: 0.18 },
    { count: 11, length: 2.0, width: 0.38, bend: 2.55, tilt: 0.42, radius: 0.60, drop: 0.34 },
  ];
  let seed = 1;
  for (const ring of rings) {
    for (let i = 0; i < ring.count; i++) {
      const jitter = 1 + Math.sin(seed * 2.1) * 0.1;
      const leaf = new THREE.Mesh(
        makeLeaf(THREE, { length: ring.length * jitter, width: ring.width, bend: ring.bend + Math.sin(seed * 3.7) * 0.12 }),
        crownMat,
      );
      const pivot = new THREE.Object3D();
      const theta = (i / ring.count) * Math.PI * 2 + ring.count * 0.7;
      pivot.position.set(0, topY - ring.drop, 0);
      pivot.rotation.y = theta;
      leaf.position.z = ring.radius;
      leaf.rotation.x = ring.tilt + Math.sin(seed * 3.3) * 0.05;
      leaf.rotation.z = Math.sin(seed * 1.7) * 0.06;
      seed += 1;
      pivot.add(leaf);
      group.add(pivot);
    }
  }

  return group;
}

// a tapered, keeled blade that grows up then bends over & outward (+Z)
function makeLeaf(THREE, { length, width, bend, segs = 14 }) {
  const pos = [];
  const L = [], C = [], R = [];
  let y = 0, z = 0;
  const ds = length / segs;
  for (let k = 0; k <= segs; k++) {
    const u = k / segs;
    const theta = bend * Math.pow(u, 1.25); // 0 = up, grows -> arcs over
    if (k > 0) { y += Math.cos(theta) * ds; z += Math.sin(theta) * ds; }
    const w = (width * 0.5) * Math.pow(1 - u, 0.5);
    const ridge = w * 0.9;
    const nY = -Math.sin(theta), nZ = Math.cos(theta); // curve normal in YZ
    L.push([-w, y, z]);
    R.push([w, y, z]);
    C.push([0, y + nY * ridge, z + nZ * ridge]);
  }
  const push = (a) => { pos.push(a[0], a[1], a[2]); };
  for (let k = 0; k < segs; k++) {
    // left panel
    push(L[k]); push(C[k]); push(L[k + 1]);
    push(C[k]); push(C[k + 1]); push(L[k + 1]);
    // right panel
    push(C[k]); push(R[k]); push(C[k + 1]);
    push(R[k]); push(R[k + 1]); push(C[k + 1]);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
  g.computeVertexNormals();
  return g;
}

// ---- metallic polygonal flecks ----------------------------------------------
function triGeo(THREE, s) {
  const g = new THREE.BufferGeometry();
  const v = new Float32Array([0, s, 0, -s * 0.92, -s * 0.72, 0, s * 0.92, -s * 0.72, 0]);
  g.setAttribute('position', new THREE.BufferAttribute(v, 3));
  g.computeVertexNormals();
  return g;
}
function paraGeo(THREE, s) {
  const sh = s * 0.55;
  const p = [-s + sh, s, 0, s + sh, s, 0, s - sh, -s, 0, -s - sh, -s, 0];
  const v = new Float32Array([
    p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8],
    p[0], p[1], p[2], p[6], p[7], p[8], p[9], p[10], p[11],
  ]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(v, 3));
  g.computeVertexNormals();
  return g;
}

function buildFlecks(THREE, p) {
  const group = new THREE.Group();
  const geos = [triGeo(THREE, 1), paraGeo(THREE, 0.85)];
  const mats = {
    silver: new THREE.MeshStandardMaterial({ color: THEME.silver, metalness: 1, roughness: 0.12, side: THREE.DoubleSide, envMapIntensity: 1.4 }),
    orange: new THREE.MeshStandardMaterial({ color: THEME.orange, metalness: 1, roughness: 0.2, side: THREE.DoubleSide, envMapIntensity: 1.2 }),
    green: new THREE.MeshStandardMaterial({ color: THEME.green, metalness: 1, roughness: 0.22, side: THREE.DoubleSide, envMapIntensity: 1.2 }),
  };
  const pick = (r) => (r < 0.72 ? mats.silver : r < 0.86 ? mats.orange : mats.green);
  const parts = [];
  for (let i = 0; i < p.count; i++) {
    const geo = geos[Math.random() < 0.55 ? 0 : 1];
    const mesh = new THREE.Mesh(geo, pick(Math.random()));
    const sc = p.sizeMin + Math.random() * p.sizeRange;
    mesh.scale.setScalar(sc);
    // spherical shell around the pineapple
    const ang = Math.random() * Math.PI * 2;
    const rad = p.radiusMin + Math.random() * p.radiusRange;
    mesh.position.set(Math.cos(ang) * rad, (Math.random() - 0.5) * 6, Math.sin(ang) * rad * 0.85);
    mesh.rotation.set(Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28);
    mesh.userData = {
      sx: (Math.random() - 0.5) * p.spin,
      sy: (Math.random() - 0.5) * p.spin,
      sz: (Math.random() - 0.5) * p.spin,
      vy: (p.driftMin + Math.random() * p.driftRange) / 700,
    };
    parts.push(mesh);
    group.add(mesh);
  }
  return { group, parts };
}

// ---- main --------------------------------------------------------------------
export async function createPineappleHero(canvas, opts = {}) {
  const THREE = await loadThree();
  const cfg = mergeConfig(opts);
  const variant = cfg.variant;
  const container = canvas.parentElement;

  // allow particles to be a named preset string for convenience
  if (typeof opts.particles === 'string') {
    const counts = { Subtle: 60, Medium: 90, Dense: 150 };
    cfg.particles.count = counts[opts.particles] ?? cfg.particles.count;
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = variant === 'B' ? 1.12 : 1.04;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.1, 6.1);

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envTex = new THREE.CanvasTexture(makeEnvCanvas(variant));
  envTex.mapping = THREE.EquirectangularReflectionMapping;
  envTex.colorSpace = THREE.SRGBColorSpace;
  const envRT = pmrem.fromEquirectangular(envTex);
  scene.environment = envRT.texture;
  envTex.dispose(); pmrem.dispose();

  const key = new THREE.DirectionalLight(0xffffff, 1.3); key.position.set(3, 5, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(variant === 'B' ? 0x49c46f : 0xff8a2c, 1.0);
  rim.position.set(-4, 1, -3); scene.add(rim);
  // warm fill from below to lift the underside of the body
  const underFill = new THREE.DirectionalLight(0xffae5c, 1.15);
  underFill.position.set(0.5, -4, 2.5); scene.add(underFill);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xff7a16, 0.55));
  scene.add(new THREE.AmbientLight(0xffffff, 0.2));

  const pineapple = buildPineapple(THREE, variant);
  pineapple.scale.setScalar(cfg.scale);
  pineapple.position.x = cfg.baseX;
  pineapple.rotation.z = -cfg.tilt; // + tilts the top to the right
  const baseY = cfg.baseY;
  scene.add(pineapple);

  const { group: fleckGroup, parts } = buildFlecks(THREE, cfg.particles);
  scene.add(fleckGroup);

  let active = true, raf = 0, t0 = performance.now();
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  function onMove(e) {
    const r = container.getBoundingClientRect();
    mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
  }
  if (cfg.pointerParallax) window.addEventListener('pointermove', onMove);

  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!active) return;
    const t = now - t0;
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    pineapple.rotation.y += cfg.rotationSpeed + (cfg.pointerParallax ? Math.abs(mouse.x) * 0.001 : 0);
    pineapple.rotation.x = -0.04 + mouse.y * 0.12;
    pineapple.position.y = baseY + Math.sin(t * cfg.bobSpeed) * cfg.bobAmount;

    // flecks rotate together with the pineapple, plus individual spin + drift
    fleckGroup.rotation.y = pineapple.rotation.y;
    fleckGroup.rotation.x = pineapple.rotation.x;
    for (const m of parts) {
      m.rotation.x += m.userData.sx;
      m.rotation.y += m.userData.sy;
      m.rotation.z += m.userData.sz;
      m.position.y += m.userData.vy;
      if (m.position.y > 3.4) m.position.y = -3.4;
    }

    camera.position.x += (mouse.x * 0.35 - camera.position.x) * 0.04;
    camera.lookAt(0, -0.1, 0);
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);

  return {
    setActive(v) { active = v; },
    setRotationSpeed(v) { cfg.rotationSpeed = v; },
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      ro.disconnect();
      renderer.dispose();
      envRT.dispose();
    },
  };
}
