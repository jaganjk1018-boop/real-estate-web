'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Box } from 'lucide-react';

export default function ThreeDFloorPlanViewer({
  level,
  activeRoomId,
  onSelectRoom,
  lightingMode = 'golden'
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const animFrameIdRef = useRef(null);
  const interactiveRoomsRef = useRef([]);

  const orbitState = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    angleX: 45,
    angleY: 35,
    targetAngleX: 45,
    targetAngleY: 35,
    distance: 280
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 360;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera (Isometric Orthographic or High-FOV Perspective)
    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    ambientLight.name = 'ambient';
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 1.8);
    dirLight.position.set(120, 200, 100);
    dirLight.castShadow = true;
    dirLight.name = 'sun';
    scene.add(dirLight);

    // 5. Build Level 3D Geometry
    const levelGroup = new THREE.Group();
    levelGroup.name = 'levelModel';
    scene.add(levelGroup);

    // Ground Podium
    const podiumGeo = new THREE.BoxGeometry(220, 4, 180);
    const podiumMat = new THREE.MeshStandardMaterial({ 
      color: 0x1E293B, 
      roughness: 0.5 
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.y = -2;
    podium.receiveShadow = true;
    levelGroup.add(podium);

    // Grid Floor Overlay
    const grid = new THREE.GridHelper(220, 22, 0xD4AF37, 0x475569);
    grid.position.y = 0.1;
    levelGroup.add(grid);

    // Room Meshes based on level.rooms
    const roomMeshes = [];
    const roomsList = level?.rooms || [];

    roomsList.forEach((r, idx) => {
      // Map SVG coords (0-100) to 3D world coords (-100 to 100)
      const svg = r.svgCoords || { x: 20 + idx * 25, y: 25, width: 25, height: 40 };
      const w = (svg.width / 100) * 180;
      const d = (svg.height / 100) * 140;
      const x = ((svg.x + svg.width / 2) / 100 - 0.5) * 180;
      const z = ((svg.y + svg.height / 2) / 100 - 0.5) * 140;

      const isSelected = r.id === activeRoomId;

      // Room Floor Slab
      const floorGeo = new THREE.BoxGeometry(w - 2, 2, d - 2);
      const floorColor = isSelected ? 0xD4AF37 : (idx % 2 === 0 ? 0xE2E8F0 : 0xCBD5E1);
      const floorMat = new THREE.MeshStandardMaterial({
        color: floorColor,
        roughness: 0.3,
        metalness: isSelected ? 0.4 : 0.1
      });
      const floorMesh = new THREE.Mesh(floorGeo, floorMat);
      floorMesh.position.set(x, 1, z);
      floorMesh.userData = { roomId: r.id, roomName: r.name };
      levelGroup.add(floorMesh);
      roomMeshes.push(floorMesh);

      // Low Architectural Walls (Cutaway Style)
      const wallMat = new THREE.MeshStandardMaterial({
        color: 0x0F172A,
        roughness: 0.4,
        metalness: 0.2
      });

      // Wall perimeter
      const wallHeight = 16;
      const wallThickness = 2.5;

      // North Wall
      const nGeo = new THREE.BoxGeometry(w, wallHeight, wallThickness);
      const nMesh = new THREE.Mesh(nGeo, wallMat);
      nMesh.position.set(x, wallHeight / 2 + 1, z - d / 2);
      levelGroup.add(nMesh);

      // West Wall
      const wGeo = new THREE.BoxGeometry(wallThickness, wallHeight, d);
      const wMesh = new THREE.Mesh(wGeo, wallMat);
      wMesh.position.set(x - w / 2, wallHeight / 2 + 1, z);
      levelGroup.add(wMesh);

      // Room Pin Beacon
      const pinGroup = new THREE.Group();
      pinGroup.position.set(x, wallHeight + 12, z);

      const markerGeo = new THREE.OctahedronGeometry(isSelected ? 4 : 3, 0);
      const markerMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0xD4AF37 : 0x94A3B8,
        emissive: isSelected ? 0xD4AF37 : 0x000000,
        emissiveIntensity: isSelected ? 0.6 : 0
      });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.name = 'roomMarker';
      pinGroup.add(marker);

      const stemGeo = new THREE.CylinderGeometry(0.3, 0.3, 12);
      const stemMat = new THREE.MeshBasicMaterial({ color: isSelected ? 0xD4AF37 : 0x64748B });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = -6;
      pinGroup.add(stem);

      levelGroup.add(pinGroup);
    });

    interactiveRoomsRef.current = roomMeshes;

    // 6. Animation Loop
    let lastTime = performance.now();
    const animate = (time) => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const state = orbitState.current;
      state.angleX += (state.targetAngleX - state.angleX) * 0.12;
      state.angleY += (state.targetAngleY - state.angleY) * 0.12;

      // Clamp vertical elevation
      state.angleY = Math.max(15, Math.min(80, state.angleY));

      const phi = THREE.MathUtils.degToRad(90 - state.angleY);
      const theta = THREE.MathUtils.degToRad(state.angleX);

      camera.position.x = state.distance * Math.sin(phi) * Math.cos(theta);
      camera.position.y = state.distance * Math.cos(phi);
      camera.position.z = state.distance * Math.sin(phi) * Math.sin(theta);
      camera.lookAt(0, 0, 0);

      // Rotate markers
      levelGroup.traverse((child) => {
        if (child.name === 'roomMarker') {
          child.rotation.y += 1.2 * delta;
        }
      });

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // 7. Resize Handler
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
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
      podiumGeo.dispose();
      podiumMat.dispose();
    };
  }, [level, activeRoomId]);

  // Lighting updates based on prop
  useEffect(() => {
    if (!sceneRef.current) return;
    const amb = sceneRef.current.getObjectByName('ambient');
    const sun = sceneRef.current.getObjectByName('sun');
    if (!amb || !sun) return;

    if (lightingMode === 'golden') {
      amb.color.setHex(0xFDE68A);
      amb.intensity = 1.2;
      sun.color.setHex(0xF59E0B);
      sun.intensity = 2.0;
    } else if (lightingMode === 'daylight') {
      amb.color.setHex(0xFFFFFF);
      amb.intensity = 1.4;
      sun.color.setHex(0xFFFBF0);
      sun.intensity = 1.6;
    } else if (lightingMode === 'night') {
      amb.color.setHex(0x1E293B);
      amb.intensity = 0.6;
      sun.color.setHex(0x38BDF8);
      sun.intensity = 0.9;
    }
  }, [lightingMode]);

  // Mouse Orbit Handlers
  const handlePointerDown = (e) => {
    orbitState.current.isDown = true;
    orbitState.current.startX = e.clientX;
    orbitState.current.startY = e.clientY;
  };

  const handlePointerMove = (e) => {
    if (!orbitState.current.isDown) return;
    const dx = e.clientX - orbitState.current.startX;
    const dy = e.clientY - orbitState.current.startY;
    orbitState.current.startX = e.clientX;
    orbitState.current.startY = e.clientY;

    orbitState.current.targetAngleX += dx * 0.4;
    orbitState.current.targetAngleY = Math.max(15, Math.min(80, orbitState.current.targetAngleY - dy * 0.4));
  };

  const handlePointerUp = () => {
    orbitState.current.isDown = false;
  };

  // Click on room floor to select room
  const handleClick = (e) => {
    if (!containerRef.current || !cameraRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(interactiveRoomsRef.current);

    if (intersects.length > 0) {
      const hitRoomId = intersects[0].object.userData?.roomId;
      if (hitRoomId) {
        onSelectRoom?.(hitRoomId);
      }
    }
  };

  // Zoom controls
  const handleZoom = (inOut) => {
    orbitState.current.distance = Math.max(160, Math.min(420, orbitState.current.distance + (inOut === 'in' ? -35 : 35)));
  };

  const handleResetOrbit = () => {
    orbitState.current.targetAngleX = 45;
    orbitState.current.targetAngleY = 35;
    orbitState.current.distance = 280;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[340px] bg-[#070c14] rounded-2xl overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={handleClick}
      />

      {/* 3D Model Badge */}
      <div className="absolute top-3 left-3 bg-[#0B1523]/90 border border-white/10 px-3 py-1 rounded-xl text-white text-[10px] font-bold flex items-center gap-1.5 backdrop-blur-md shadow-md">
        <Box className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Interactive 3D Isometric View • Click Room Floor</span>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#0B1523]/90 border border-white/10 p-1 rounded-xl backdrop-blur-md shadow-md">
        <button
          onClick={() => handleZoom('in')}
          className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleResetOrbit}
          className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          title="Reset View"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
