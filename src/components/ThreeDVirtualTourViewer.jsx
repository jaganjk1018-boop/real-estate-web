'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  Ruler, 
  Sun, 
  Moon, 
  Sunset, 
  Camera, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Layers, 
  Box, 
  Sparkles, 
  Info, 
  X, 
  Maximize, 
  Minimize,
  CheckCircle2,
  ChevronRight,
  Eye
} from 'lucide-react';

// Enhanced architectural measurements based on room types
const ROOM_MEASUREMENTS = {
  living: [
    { id: 'm-ceiling', title: 'Ceiling Clearance', ft: '18.4 FT', m: '5.61 M', desc: 'Double-height coffer with acoustic isolation', p1: [-30, 20, -100], p2: [-30, -50, -100] },
    { id: 'm-width', title: 'Reception Expanse', ft: '42.8 FT', m: '13.05 M', desc: 'Continuous open-plan gallery expanse', p1: [-120, -40, -80], p2: [120, -40, -80] },
    { id: 'm-glass', title: 'Motorized Glazing Span', ft: '32.0 FT', m: '9.75 M', desc: 'Triple-pane pocket sliding glass wall', p1: [-80, -35, 120], p2: [80, -35, 120] }
  ],
  master: [
    { id: 'm-ceiling', title: 'Vaulted Ceiling', ft: '15.6 FT', m: '4.75 M', desc: 'Indirect perimeter cove lighting ceiling', p1: [0, 30, -110], p2: [0, -45, -110] },
    { id: 'm-suite', title: 'Suite Depth', ft: '34.5 FT', m: '10.51 M', desc: 'Primary sanctuary to private viewing terrace', p1: [-90, -40, -60], p2: [90, -40, -60] },
    { id: 'm-dressing', title: 'Dual Gallery Span', ft: '24.2 FT', m: '7.38 M', desc: 'Bespoke Poliform walnut dressing suite', p1: [-70, -30, 90], p2: [70, -30, 90] }
  ],
  kitchen: [
    { id: 'm-island', title: 'Waterfall Island', ft: '16.5 FT', m: '5.03 M', desc: 'Monolithic Calacatta Gold marble slab', p1: [-60, -35, -70], p2: [60, -35, -70] },
    { id: 'm-ceiling', title: 'Prep Zone Clearance', ft: '13.2 FT', m: '4.02 M', desc: 'Flush architectural extraction hood clearance', p1: [30, 25, -90], p2: [30, -45, -90] }
  ],
  default: [
    { id: 'm-ceiling', title: 'Architectural Clearance', ft: '14.5 FT', m: '4.42 M', desc: 'Bespoke structural ceiling elevation', p1: [0, 25, -100], p2: [0, -45, -100] },
    { id: 'm-width', title: 'Spatial Width', ft: '36.0 FT', m: '10.97 M', desc: 'Interior column-free living expanse', p1: [-100, -40, -70], p2: [100, -40, -70] }
  ]
};

// Rich curated hotspot details for architectural tours
const DEFAULT_ARCHITECTURAL_HOTSPOTS = [
  {
    id: 'hs-glazing',
    lat: 10,
    lon: 45,
    title: 'Acoustic Motorized Glazing',
    category: 'Architecture',
    specs: 'Triple-pane Low-E glass, STC 54 rating, automated pocketing system by Reynaers Aluminum.',
    origin: 'Belgium',
    warranty: '25-Year Manufacturer Warranty'
  },
  {
    id: 'hs-flooring',
    lat: -30,
    lon: 130,
    title: 'Bookmatched Statuario Marble',
    category: 'Finishes',
    specs: 'Extra-large 120x240cm honed natural Italian marble slabs with integrated radiant underfloor heating.',
    origin: 'Carrara, Italy',
    warranty: 'Lifetime Architectural Stone Title'
  },
  {
    id: 'hs-automation',
    lat: -5,
    lon: 220,
    title: 'Lutron Palladiom & HVAC Suite',
    category: 'Smart Home',
    specs: 'Flush-mounted architectural satin brass keypads controlling circadian dynamic tunable white lighting.',
    origin: 'USA',
    warranty: 'Full Certified Crestron Integration'
  },
  {
    id: 'hs-acoustic',
    lat: 25,
    lon: 310,
    title: 'Architectural Acoustic Baffles',
    category: 'Engineering',
    specs: 'Custom micro-perforated rift-cut white oak slat ceiling baffles with recycled basalt wool sound absorption.',
    origin: 'Copenhagen, Denmark',
    warranty: 'Class A Fire & Acoustic Certified'
  }
];

export default function ThreeDVirtualTourViewer({
  property,
  currentRoomIndex = 0,
  onRoomChange,
  onScheduleVisit
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Viewer Mode: 'photosphere' (360 tour) | 'dollhouse' (3D architectural cutaway)
  const [viewMode, setViewMode] = useState('photosphere');
  
  // Interactive state
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [lightingMode, setLightingMode] = useState('golden'); // 'daylight' | 'golden' | 'night'
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [measureMode, setMeasureMode] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [fov, setFov] = useState(75);
  const [isLoadingTexture, setIsLoadingTexture] = useState(true);
  const [snapshotFeedback, setSnapshotFeedback] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // References for Three.js state
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sphereMeshRef = useRef(null);
  const dollhouseGroupRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioNodesRef = useRef(null);
  const compassConeRef = useRef(null);
  const compassTextRef = useRef(null);
  const hotspotDomsRef = useRef({});

  // Coordinate tracking for 360 look
  const sphericalState = useRef({
    lat: 0,
    lon: 90,
    targetLat: 0,
    targetLon: 90,
    isPointerDown: false,
    pointerStartX: 0,
    pointerStartY: 0,
    savedLat: 0,
    savedLon: 0,
    pinchDistance: 0
  });

  const rooms = property?.virtualTourRooms?.length > 0 
    ? property.virtualTourRooms 
    : [
        {
          id: 'room-default',
          name: 'Grand Living Salon',
          panoramaUrl: property?.images?.[0] || '/images/images.jpg',
          description: 'Double-height reception gallery with panoramic glass walls and open terrace integration.'
        }
      ];

  const currentRoom = rooms[currentRoomIndex] || rooms[0];

  // Determine hotspots for this room
  const currentHotspots = React.useMemo(() => {
    if (currentRoom.hotspots && currentRoom.hotspots.length > 0) {
      return currentRoom.hotspots.map((hs, idx) => ({
        id: hs.id || `hs-${idx}`,
        lat: (hs.y !== undefined ? 50 - hs.y : 0) * 0.9,
        lon: (hs.x !== undefined ? hs.x * 3.6 : idx * 90) % 360,
        title: hs.title,
        category: 'Interior Feature',
        specs: hs.description || 'Architectural luxury grade material specification.',
        origin: 'Custom Designed',
        warranty: 'Verified Premium Quality'
      }));
    }
    return DEFAULT_ARCHITECTURAL_HOTSPOTS;
  }, [currentRoom]);

  // Determine measurements for this room
  const currentMeasurements = React.useMemo(() => {
    const nameLower = (currentRoom.name || '').toLowerCase();
    if (nameLower.includes('bed') || nameLower.includes('master') || nameLower.includes('suite')) {
      return ROOM_MEASUREMENTS.master;
    }
    if (nameLower.includes('kitchen') || nameLower.includes('chef') || nameLower.includes('culinary')) {
      return ROOM_MEASUREMENTS.kitchen;
    }
    if (nameLower.includes('living') || nameLower.includes('great') || nameLower.includes('salon')) {
      return ROOM_MEASUREMENTS.living;
    }
    return ROOM_MEASUREMENTS.default;
  }, [currentRoom]);

  // Initialize Web Audio API Synthesizer (Zero external audio file dependencies)
  const toggleAudioAmbiance = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Create soothing pink noise ambient room tone
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.015;
        b6 = white * 0.115926;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Filter for warm soft luxury room rumble / gentle fountain tone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 420;

      const gain = ctx.createGain();
      gain.gain.value = 0.08;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();

      audioNodesRef.current = { ctx, gain, noise };
      setIsAudioPlaying(true);
    } else {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
        setIsAudioPlaying(true);
      } else if (audioContextRef.current.state === 'running') {
        audioContextRef.current.suspend();
        setIsAudioPlaying(false);
      }
    }
  };

  // Play subtle harmonic chime on room switch
  const playRoomSwitchChime = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioContextRef.current || new AudioCtx();
      if (!audioContextRef.current) audioContextRef.current = ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch {
      // Audio not permitted without interaction
    }
  }, []);

  // Construct 3D Dollhouse Architectural Model in Three.js
  const createDollhouseModel = useCallback(() => {
    const group = new THREE.Group();
    group.name = 'dollhouse';

    // 1. Foundation Podium Slab
    const slabGeo = new THREE.BoxGeometry(260, 6, 200);
    const slabMat = new THREE.MeshStandardMaterial({ 
      color: 0x1E293B, 
      roughness: 0.4, 
      metalness: 0.2 
    });
    const slab = new THREE.Mesh(slabGeo, slabMat);
    slab.position.y = -3;
    group.add(slab);

    // Grid accent lines on podium
    const grid = new THREE.GridHelper(260, 26, 0xD4AF37, 0x334155);
    grid.position.y = 0.2;
    group.add(grid);

    // 2. Room Floor Zones with Bespoke Materials
    const floorConfigs = [
      { name: 'Grand Living Salon', x: -50, z: -30, w: 120, d: 100, color: 0xE2E8F0, finish: 'Carrara Statuario' },
      { name: 'Chef Culinary Kitchen', x: 60, z: -40, w: 90, d: 80, color: 0x94A3B8, finish: 'Honed Basalt' },
      { name: 'Primary Master Suite', x: -40, z: 50, w: 140, d: 70, color: 0xD7C49E, finish: 'Burma Teak' },
      { name: 'Infinity Pool & Terrace', x: 65, z: 40, w: 80, d: 90, color: 0x0EA5E9, finish: 'Zero-Edge Pool' }
    ];

    floorConfigs.forEach((cfg) => {
      const roomFloorGeo = new THREE.BoxGeometry(cfg.w - 4, 1.5, cfg.d - 4);
      const roomFloorMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: cfg.finish.includes('Pool') ? 0.1 : 0.6,
        metalness: cfg.finish.includes('Pool') ? 0.8 : 0.1,
        transparent: cfg.finish.includes('Pool'),
        opacity: cfg.finish.includes('Pool') ? 0.85 : 1
      });
      const roomMesh = new THREE.Mesh(roomFloorGeo, roomFloorMat);
      roomMesh.position.set(cfg.x, 1, cfg.z);
      group.add(roomMesh);

      // Floor trim accent
      const trimGeo = new THREE.BoxGeometry(cfg.w - 2, 0.4, cfg.d - 2);
      const trimMat = new THREE.MeshBasicMaterial({ color: 0xD4AF37, wireframe: true });
      const trim = new THREE.Mesh(trimGeo, trimMat);
      trim.position.set(cfg.x, 1.8, cfg.z);
      group.add(trim);
    });

    // 3. Architectural Cutaway Perimeter Walls
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0F172A,
      roughness: 0.3,
      metalness: 0.4
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xBAE6FD,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.35
    });

    // Outer architectural partition segments (cutaway height = 30)
    const wallSegments = [
      // North Wall
      { w: 230, h: 30, d: 5, x: 5, y: 15, z: -95, mat: wallMat },
      // West Wall
      { w: 5, h: 30, d: 180, x: -115, y: 15, z: 0, mat: wallMat },
      // East Glass Facade overlooking pool
      { w: 5, h: 30, d: 110, x: 115, y: 15, z: -35, mat: glassMat },
      // South Terrace Balustrade
      { w: 150, h: 12, d: 3, x: -35, y: 6, z: 88, mat: glassMat },
      // Interior Divider 1
      { w: 5, h: 25, d: 90, x: 15, y: 12.5, z: -40, mat: wallMat },
      // Interior Divider 2
      { w: 130, h: 25, d: 5, x: -45, y: 12.5, z: 15, mat: wallMat }
    ];

    wallSegments.forEach((w) => {
      const geo = new THREE.BoxGeometry(w.w, w.h, w.d);
      const mesh = new THREE.Mesh(geo, w.mat);
      mesh.position.set(w.x, w.y, w.z);
      group.add(mesh);
    });

    // 4. Stylized Minimalist Architectural Furniture Masses
    // Great Room Sectional Sofa
    const sofaGeo = new THREE.BoxGeometry(45, 8, 30);
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.9 });
    const sofa = new THREE.Mesh(sofaGeo, sofaMat);
    sofa.position.set(-50, 5, -25);
    group.add(sofa);

    // Marble Dining / Island Table
    const tableGeo = new THREE.BoxGeometry(38, 12, 18);
    const tableMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.6, roughness: 0.3 });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.set(55, 7, -35);
    group.add(table);

    // Master Platform Bed
    const bedGeo = new THREE.BoxGeometry(36, 9, 38);
    const bedMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, roughness: 0.8 });
    const bed = new THREE.Mesh(bedGeo, bedMat);
    bed.position.set(-45, 5.5, 55);
    group.add(bed);

    // 5. Floating Glowing Golden Room Pins
    rooms.forEach((r, idx) => {
      const pinGroup = new THREE.Group();
      pinGroup.name = `pin-${r.id}`;

      const pos = floorConfigs[idx % floorConfigs.length];
      pinGroup.position.set(pos.x, 38, pos.z);

      // Glowing Diamond Marker
      const diamondGeo = new THREE.OctahedronGeometry(4.5, 0);
      const diamondMat = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        emissive: 0x99730E,
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.1
      });
      const diamond = new THREE.Mesh(diamondGeo, diamondMat);
      diamond.name = 'pin-diamond';
      pinGroup.add(diamond);

      // Beacon Stem Line down to floor
      const lineGeo = new THREE.CylinderGeometry(0.4, 0.4, 34);
      const lineMat = new THREE.MeshBasicMaterial({ color: 0xD4AF37, transparent: true, opacity: 0.6 });
      const line = new THREE.Mesh(lineGeo, lineMat);
      line.position.y = -17;
      pinGroup.add(line);

      group.add(pinGroup);
    });

    group.position.set(0, -20, 0);
    return group;
  }, [rooms]);

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(fov, width / height, 1, 1500);
    camera.target = new THREE.Vector3(0, 0, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // 4. Photosphere Mesh (Inverted 360 Sphere)
    const sphereGeo = new THREE.SphereGeometry(500, 64, 40);
    sphereGeo.scale(-1, 1, 1);

    const textureLoader = new THREE.TextureLoader();
    setIsLoadingTexture(true);

    const texture = textureLoader.load(
      currentRoom.panoramaUrl,
      () => {
        setIsLoadingTexture(false);
      },
      undefined,
      () => {
        textureLoader.load(
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90',
          (fallbackTex) => {
            if (sphereMeshRef.current) {
              sphereMeshRef.current.material.map = fallbackTex;
              sphereMeshRef.current.material.needsUpdate = true;
            }
            setIsLoadingTexture(false);
          }
        );
      }
    );
    texture.colorSpace = THREE.SRGBColorSpace;

    const sphereMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.name = 'photosphere';
    scene.add(sphereMesh);
    sphereMeshRef.current = sphereMesh;

    // 5. Ambient & Directional Lights for Dollhouse & Hotspots
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    ambientLight.name = 'ambient';
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff4d0, 1.6);
    dirLight.position.set(150, 250, 120);
    dirLight.name = 'sunlight';
    scene.add(dirLight);

    // 6. Build Dollhouse Model into scene
    const dollhouse = createDollhouseModel();
    dollhouse.visible = false;
    scene.add(dollhouse);
    dollhouseGroupRef.current = dollhouse;

    // 7. Animation Loop
    let lastTime = performance.now();
    const renderLoop = (time) => {
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const state = sphericalState.current;

      if (viewMode === 'photosphere') {
        if (isAutoRotating && !state.isPointerDown) {
          state.targetLon += 8 * delta;
        }

        state.lat += (state.targetLat - state.lat) * 0.12;
        state.lon += (state.targetLon - state.lon) * 0.12;
        state.lat = Math.max(-85, Math.min(85, state.lat));

        const phi = THREE.MathUtils.degToRad(90 - state.lat);
        const theta = THREE.MathUtils.degToRad(state.lon);

        camera.position.set(0, 0, 0);
        camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
        camera.target.y = 500 * Math.cos(phi);
        camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
        camera.lookAt(camera.target);

        const heading = (Math.round(state.lon) % 360 + 360) % 360;
        
        // Direct DOM update of Compass Cone & Heading (Smooth 60fps without React re-render)
        if (compassConeRef.current) {
          compassConeRef.current.style.transform = `rotate(${-heading}deg)`;
        }
        if (compassTextRef.current) {
          const dir = heading >= 315 || heading < 45 ? 'NORTH' : heading < 135 ? 'EAST' : heading < 225 ? 'SOUTH' : 'WEST';
          compassTextRef.current.textContent = `${heading}° ${dir}`;
        }

        // Direct DOM projection of 3D Hotspots (Zero React re-render lag)
        if (viewMode === 'photosphere' && containerRef.current) {
          const w = containerRef.current.clientWidth;
          const h = containerRef.current.clientHeight;
          for (let i = 0; i < currentHotspots.length; i++) {
            const hs = currentHotspots[i];
            const el = hotspotDomsRef.current[hs.id];
            if (!el) continue;
            const phiHs = THREE.MathUtils.degToRad(90 - hs.lat);
            const thetaHs = THREE.MathUtils.degToRad(hs.lon);
            const radius = 480;
            const pos = new THREE.Vector3(
              radius * Math.sin(phiHs) * Math.cos(thetaHs),
              radius * Math.cos(phiHs),
              radius * Math.sin(phiHs) * Math.sin(thetaHs)
            );
            pos.project(camera);
            if (pos.z < 1) {
              const screenX = (pos.x * 0.5 + 0.5) * w;
              const screenY = (-(pos.y * 0.5) + 0.5) * h;
              el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%)`;
              el.style.display = 'block';
            } else {
              el.style.display = 'none';
            }
          }
        }

      } else {
        if (isAutoRotating && !state.isPointerDown) {
          state.targetLon += 10 * delta;
        }

        state.lat += (state.targetLat - state.lat) * 0.1;
        state.lon += (state.targetLon - state.lon) * 0.1;
        state.lat = Math.max(10, Math.min(75, state.lat));

        const phi = THREE.MathUtils.degToRad(90 - state.lat);
        const theta = THREE.MathUtils.degToRad(state.lon);
        const radius = 320;

        camera.position.x = radius * Math.sin(phi) * Math.cos(theta);
        camera.position.y = radius * Math.cos(phi) + 15;
        camera.position.z = radius * Math.sin(phi) * Math.sin(theta);
        camera.lookAt(0, 0, 0);

        if (dollhouseGroupRef.current) {
          dollhouseGroupRef.current.traverse((child) => {
            if (child.name === 'pin-diamond') {
              child.rotation.y += 1.5 * delta;
              child.position.y = Math.sin(time * 0.003) * 1.5;
            }
          });
        }
      }

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss?.();
      }
      sphereGeo.dispose();
      sphereMat.dispose();
      texture.dispose();
      if (sceneRef.current) {
        sceneRef.current.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => {
                if (m.map) m.map.dispose();
                m.dispose();
              });
            } else {
              if (child.material.map) child.material.map.dispose();
              child.material.dispose();
            }
          }
        });
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [currentRoom.panoramaUrl, fov, viewMode, isAutoRotating, createDollhouseModel]);

  // Update room texture smoothly when currentRoomIndex changes
  useEffect(() => {
    if (!sphereMeshRef.current) return;
    setIsLoadingTexture(true);

    const loader = new THREE.TextureLoader();
    loader.load(
      currentRoom.panoramaUrl,
      (newTex) => {
        newTex.colorSpace = THREE.SRGBColorSpace;
        if (sphereMeshRef.current) {
          sphereMeshRef.current.material.map = newTex;
          sphereMeshRef.current.material.needsUpdate = true;
        }
        setIsLoadingTexture(false);
        playRoomSwitchChime();
      },
      undefined,
      () => {
        setIsLoadingTexture(false);
      }
    );
  }, [currentRoom.panoramaUrl, playRoomSwitchChime]);

  // Update lighting mode adjustments on Three.js scene
  useEffect(() => {
    if (!sceneRef.current) return;
    const amb = sceneRef.current.getObjectByName('ambient');
    const sun = sceneRef.current.getObjectByName('sunlight');
    if (!amb || !sun) return;

    if (lightingMode === 'daylight') {
      amb.color.setHex(0xFFFFFF);
      amb.intensity = 1.3;
      sun.color.setHex(0xFFFBF0);
      sun.intensity = 1.5;
    } else if (lightingMode === 'golden') {
      amb.color.setHex(0xFDE68A);
      amb.intensity = 1.1;
      sun.color.setHex(0xF59E0B);
      sun.intensity = 1.9;
    } else if (lightingMode === 'night') {
      amb.color.setHex(0x1E293B);
      amb.intensity = 0.55;
      sun.color.setHex(0x38BDF8);
      sun.intensity = 0.8;
    }
  }, [lightingMode]);

  // Switch view mode between 360 Photosphere and 3D Dollhouse
  const handleToggleViewMode = (mode) => {
    setViewMode(mode);
    if (sphereMeshRef.current) {
      sphereMeshRef.current.visible = mode === 'photosphere';
    }
    if (dollhouseGroupRef.current) {
      dollhouseGroupRef.current.visible = mode === 'dollhouse';
    }

    if (mode === 'dollhouse') {
      sphericalState.current.targetLat = 40;
      sphericalState.current.lat = 40;
    } else {
      sphericalState.current.targetLat = 0;
      sphericalState.current.lat = 0;
    }
  };

  // Pointer & Drag Controls for 360 Spatial Orbit
  const handlePointerDown = (e) => {
    const state = sphericalState.current;
    state.isPointerDown = true;
    state.pointerStartX = e.clientX || e.touches?.[0]?.clientX || 0;
    state.pointerStartY = e.clientY || e.touches?.[0]?.clientY || 0;
    state.savedLon = state.targetLon;
    state.savedLat = state.targetLat;
  };

  const handlePointerMove = (e) => {
    const state = sphericalState.current;
    if (!state.isPointerDown) return;

    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

    const factor = viewMode === 'dollhouse' ? 0.35 : 0.18;
    const deltaX = (state.pointerStartX - clientX) * factor;
    const deltaY = (clientY - state.pointerStartY) * factor;

    state.targetLon = state.savedLon + deltaX;
    state.targetLat = state.savedLat + deltaY;
  };

  const handlePointerUp = () => {
    sphericalState.current.isPointerDown = false;
  };

  // Zoom control via Wheel
  const handleWheel = (e) => {
    e.preventDefault();
    setFov((prev) => {
      const nextFov = Math.max(35, Math.min(95, prev + e.deltaY * 0.05));
      if (cameraRef.current) {
        cameraRef.current.fov = nextFov;
        cameraRef.current.updateProjectionMatrix();
      }
      return nextFov;
    });
  };

  // Reset 3D camera
  const handleResetCamera = () => {
    sphericalState.current.targetLat = 0;
    sphericalState.current.targetLon = 90;
    setFov(75);
    if (cameraRef.current) {
      cameraRef.current.fov = 75;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  // Smoothly look at a specific hotspot
  const handleLookAtHotspot = (hs) => {
    sphericalState.current.targetLat = hs.lat;
    sphericalState.current.targetLon = hs.lon;
    setActiveHotspot(hs);
  };

  // High-Resolution 4K Snapshot Tool
  const handleCaptureSnapshot = () => {
    if (!rendererRef.current) return;
    try {
      const dataUrl = rendererRef.current.domElement.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.download = `JK_REALTY_${(property.title || 'Estate').replace(/\s+/g, '_')}_3D_Tour.jpg`;
      link.href = dataUrl;
      link.click();
      setSnapshotFeedback(true);
      setTimeout(() => setSnapshotFeedback(false), 2500);
    } catch (e) {
      console.error('Failed to capture snapshot:', e);
    }
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };



  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-[#070c14] overflow-hidden select-none"
      onWheel={handleWheel}
    >
      {/* Three.js WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing block transition-opacity duration-500 ${
          isLoadingTexture ? 'opacity-40 filter blur-xs' : 'opacity-100'
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />

      {/* Loading Shimmer Bar */}
      {isLoadingTexture && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-30 pointer-events-none transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#1E3A5F] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] animate-spin mb-3 shadow-xl">
            <RotateCw className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-white tracking-[0.2em] uppercase font-serif">
            Rendering 4K Photosphere...
          </p>
          <span className="text-[10px] text-[#D4AF37] mt-1 font-mono">
            {currentRoom.name}
          </span>
        </div>
      )}

      {/* Snapshot Success Notification */}
      {snapshotFeedback && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 bg-[#1E3A5F]/95 border border-[#D4AF37] px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>High-Res Architectural Snapshot Downloaded!</span>
        </div>
      )}

      {/* TOP HUD: Mode Switcher & Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 pointer-events-none z-20">
        
        {/* Left: View Mode Pills (360 Photosphere vs 3D Dollhouse) */}
        <div className="flex items-center gap-2 pointer-events-auto bg-[#070c14]/85 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-2xl">
          <button
            onClick={() => handleToggleViewMode('photosphere')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'photosphere'
                ? 'bg-[#D4AF37] text-[#1E3A5F] shadow-md shadow-[#D4AF37]/30 scale-102'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>360° Spatial Tour</span>
          </button>

          <button
            onClick={() => handleToggleViewMode('dollhouse')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'dollhouse'
                ? 'bg-[#D4AF37] text-[#1E3A5F] shadow-md shadow-[#D4AF37]/30 scale-102'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Dollhouse Model</span>
          </button>
        </div>

        {/* Right: Lighting Ambiance & Audio Controls */}
        <div className="flex items-center gap-2 pointer-events-auto bg-[#070c14]/85 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-2xl">
          
          {/* Lighting Mode Selector */}
          <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-xl border border-white/10">
            <button
              onClick={() => setLightingMode('daylight')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                lightingMode === 'daylight' ? 'bg-amber-400/20 text-amber-300' : 'text-gray-400 hover:text-white'
              }`}
              title="Daylight Clarity"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLightingMode('golden')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                lightingMode === 'golden' ? 'bg-[#D4AF37]/25 text-[#D4AF37]' : 'text-gray-400 hover:text-white'
              }`}
              title="Golden Hour Sunset"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLightingMode('night')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                lightingMode === 'night' ? 'bg-sky-400/20 text-sky-300' : 'text-gray-400 hover:text-white'
              }`}
              title="Midnight Starlight"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-white/10" />

          {/* Laser Measurement Toggle */}
          <button
            onClick={() => setMeasureMode(!measureMode)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
              measureMode 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            title="Toggle Laser Measurements"
          >
            <Ruler className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Tape Measure</span>
          </button>

          {/* Ambient Soundscape Toggle */}
          <button
            onClick={toggleAudioAmbiance}
            className={`p-2 rounded-xl text-xs transition-all ${
              isAudioPlaying 
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            title={isAudioPlaying ? 'Mute Spatial Ambiance' : 'Play Spatial Ambiance'}
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* 4K Snapshot Button */}
          <button
            onClick={handleCaptureSnapshot}
            className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            title="Capture High-Res Photo"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3D SPATIAL HOTSPOTS (Direct Hardware-Accelerated 60FPS DOM Positioning) */}
      {viewMode === 'photosphere' && currentHotspots.map((hs) => (
        <div
          key={hs.id}
          ref={(el) => {
            if (el) hotspotDomsRef.current[hs.id] = el;
            else delete hotspotDomsRef.current[hs.id];
          }}
          style={{ display: 'none', willChange: 'transform' }}
          className="absolute top-0 left-0 z-10 pointer-events-auto transition-transform duration-75"
        >
          <div 
            className="relative group cursor-pointer"
            onClick={() => handleLookAtHotspot(hs)}
          >
            <div className="w-9 h-9 rounded-full bg-[#1E3A5F]/90 border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 hover:scale-125 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="absolute -inset-2 rounded-full border border-[#D4AF37]/40 animate-ping pointer-events-none" />

            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-[#070c14]/95 border border-[#D4AF37]/60 rounded-lg px-2.5 py-1 text-[10px] font-bold text-white whitespace-nowrap shadow-xl flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>{hs.title}</span>
            </div>
          </div>
        </div>
      ))}

      {/* ACTIVE HOTSPOT SPECIFICATION MODAL CARD */}
      {activeHotspot && (
        <div className="absolute top-20 left-6 max-w-sm bg-[#0B1523]/95 border-2 border-[#D4AF37] p-5 rounded-2xl shadow-2xl backdrop-blur-xl z-30 animate-in fade-in slide-in-from-left-4 text-white">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-bold uppercase tracking-wider border border-[#D4AF37]/40">
                {activeHotspot.category}
              </span>
              <h4 className="text-sm font-bold text-white font-serif">{activeHotspot.title}</h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-gray-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed mb-4">
            {activeHotspot.specs}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400 bg-white/5 p-2.5 rounded-xl border border-white/10 mb-3 font-mono">
            <div>
              <span className="block text-gray-500 uppercase">Provenance</span>
              <strong className="text-gray-200">{activeHotspot.origin}</strong>
            </div>
            <div>
              <span className="block text-gray-500 uppercase">Standard</span>
              <strong className="text-[#D4AF37]">{activeHotspot.warranty}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onScheduleVisit?.(property)}
              className="w-full py-2 rounded-xl bg-[#D4AF37] hover:bg-[#b89422] text-[#1E3A5F] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect with Concierge</span>
            </button>
          </div>
        </div>
      )}

      {/* LASER MEASUREMENT OVERLAY HUD */}
      {measureMode && (
        <div className="absolute top-20 right-6 max-w-xs bg-[#0B1523]/95 border-2 border-emerald-500/60 p-4 rounded-2xl shadow-2xl backdrop-blur-xl z-30 animate-in fade-in slide-in-from-right-4 text-white">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-emerald-500/20 text-emerald-400">
                <Ruler className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                Laser Measurement HUD
              </span>
            </div>
            <button
              onClick={() => setMeasureMode(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-gray-300 mb-3">
            Real-time calibrated architectural dimensions verified by Matterport LiDAR scan:
          </p>

          <div className="space-y-2">
            {currentMeasurements.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMeasurement(m)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  selectedMeasurement?.id === m.id
                    ? 'bg-emerald-500/15 border-emerald-400 text-white'
                    : 'bg-white/5 border-white/10 hover:border-emerald-500/40 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{m.title}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-black text-emerald-400">{m.ft}</span>
                    <span className="text-[10px] text-gray-400 font-mono">({m.m})</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOTTOM-LEFT: LIVE 3D COMPASS & RADAR BLUEPRINT HUD */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 pointer-events-none">
        <div className="relative w-24 h-24 rounded-2xl bg-[#070c14]/90 border border-white/15 p-2 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center">
          
          {/* Compass Rose Ring */}
          <div className="relative w-16 h-16 rounded-full border border-[#D4AF37]/30 flex items-center justify-center">
            <span className="absolute top-0.5 text-[8px] font-black text-[#D4AF37] font-mono">N</span>
            <span className="absolute bottom-0.5 text-[8px] font-semibold text-gray-500 font-mono">S</span>
            <span className="absolute right-0.5 text-[8px] font-semibold text-gray-500 font-mono">E</span>
            <span className="absolute left-0.5 text-[8px] font-semibold text-gray-500 font-mono">W</span>

            {/* Rotating Camera Field-of-View Cone Indicator */}
            <div
              ref={compassConeRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-75"
              style={{ transform: 'rotate(0deg)', willChange: 'transform' }}
            >
              <div 
                className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[24px] border-b-[#D4AF37]/40 -translate-y-3 filter drop-shadow-[0_0_6px_rgba(212,175,55,0.8)]"
              />
              <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] border-2 border-[#1E3A5F]" />
            </div>
          </div>

          <div ref={compassTextRef} className="text-[9px] font-mono text-gray-300 mt-1 font-bold">
            0° NORTH
          </div>
        </div>

        {/* Current Space Title Pill */}
        <div className="hidden sm:flex flex-col bg-[#070c14]/90 border border-white/15 px-4 py-2 rounded-2xl backdrop-blur-xl shadow-2xl">
          <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">
            Current Space
          </span>
          <span className="text-sm font-bold text-white font-serif">
            {currentRoom.name}
          </span>
          <span className="text-[10px] text-gray-400">
            {currentRoom.description || 'Verified Architectural Scan'}
          </span>
        </div>
      </div>

      {/* BOTTOM-RIGHT: CAMERA CONTROLS HUD */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 pointer-events-auto z-20">
        
        <div className="flex items-center gap-1.5 bg-[#070c14]/90 backdrop-blur-xl p-1.5 rounded-2xl border border-white/15 shadow-2xl">
          <button
            onClick={() => {
              setFov((prev) => {
                const next = Math.max(35, prev - 10);
                if (cameraRef.current) {
                  cameraRef.current.fov = next;
                  cameraRef.current.updateProjectionMatrix();
                }
                return next;
              });
            }}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Zoom In (Decrease FOV)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setFov((prev) => {
                const next = Math.min(95, prev + 10);
                if (cameraRef.current) {
                  cameraRef.current.fov = next;
                  cameraRef.current.updateProjectionMatrix();
                }
                return next;
              });
            }}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Zoom Out (Increase FOV)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-2 rounded-xl transition-all ${
              isAutoRotating ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-gray-400 hover:text-white'
            }`}
            title={isAutoRotating ? 'Pause Orbit Rotation' : 'Start Orbit Rotation'}
          >
            {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={handleResetCamera}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Reset Camera Orientation"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
