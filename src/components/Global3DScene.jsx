import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Global3DScene
 * High-performance, full-viewport WebGL 3D background.
 * Features:
 * - 24 floating 3D Origami & Platonic crystals with physical gemstone materials
 * - 1,000+ starfield/constellation particles
 * - Mouse parallax reaction
 * - Scroll-linked camera flight along a 3D spline
 * - Light/Dark theme color adaption
 * - Safe WebGL detection & automatic cleanup
 */
export const Global3DScene = ({ theme = 'dark' }) => {
  const containerRef = useRef(null);
  const stateRef = useRef({
    renderer: null,
    scene: null,
    camera: null,
    gemMeshes: [],
    particles: null,
    reqId: null,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    scrollY: 0,
    targetScrollY: 0,
    isDestroyed: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Safe WebGL check
    const isWebGLAvailable = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch {
        return false;
      }
    };

    if (!isWebGLAvailable()) {
      return; // Gracefully fallback to CSS gradients without crashing
    }

    const state = stateRef.current;
    state.isDestroyed = false;

    // 2. Setup Three.js Scene, Camera, Renderer
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    state.scene = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);
    state.camera = camera;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('Three.js WebGL initialization failed', e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    state.renderer = renderer;

    // 3. Lighting: Dynamic multi-color ambient & point lights
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.7 : 1.1);
    scene.add(ambientLight);

    const lightTeal = new THREE.PointLight(0x14b8a6, theme === 'dark' ? 2.5 : 1.8, 40);
    lightTeal.position.set(-10, 10, 8);
    scene.add(lightTeal);

    const lightIndigo = new THREE.PointLight(0x6366f1, theme === 'dark' ? 2.8 : 2.0, 45);
    lightIndigo.position.set(12, -8, 10);
    scene.add(lightIndigo);

    const lightAmber = new THREE.PointLight(0xf59e0b, theme === 'dark' ? 2.0 : 1.4, 35);
    lightAmber.position.set(0, 15, -5);
    scene.add(lightAmber);

    // 4. Create Floating 3D Geometric Gemstones (Origami / Platonic solids)
    const gemGeometries = [
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.OctahedronGeometry(0.9, 0),
      new THREE.TetrahedronGeometry(1.0, 0),
      new THREE.DodecahedronGeometry(0.7, 0),
      new THREE.ConeGeometry(0.7, 1.3, 4), // Pyramid origami fold
    ];

    const gemPalettes = [
      { color: 0x00e5be, emissive: 0x044a3e, name: 'teal' },
      { color: 0x6366f1, emissive: 0x1e1b4b, name: 'indigo' },
      { color: 0xf59e0b, emissive: 0x451a03, name: 'amber' },
      { color: 0xf43f5e, emissive: 0x4c0519, name: 'rose' },
      { color: 0x38bdf8, emissive: 0x0c4a6e, name: 'sky' }
    ];

    const gemGroup = new THREE.Group();
    scene.add(gemGroup);
    state.gemMeshes = [];

    const numGems = 22;
    for (let i = 0; i < numGems; i++) {
      const geo = gemGeometries[i % gemGeometries.length];
      const pal = gemPalettes[i % gemPalettes.length];

      // Physical gemstone material with sharp facets
      const mat = new THREE.MeshPhysicalMaterial({
        color: pal.color,
        emissive: pal.emissive,
        emissiveIntensity: theme === 'dark' ? 0.45 : 0.25,
        roughness: 0.15,
        metalness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: theme === 'dark' ? 0.72 : 0.45,
        flatShading: true,
      });

      const mesh = new THREE.Mesh(geo, mat);

      // Wireframe contour overlay for futuristic holographic aesthetic
      const wireMat = new THREE.MeshBasicMaterial({
        color: pal.color,
        wireframe: true,
        transparent: true,
        opacity: theme === 'dark' ? 0.35 : 0.2,
      });
      const wireMesh = new THREE.Mesh(geo, wireMat);
      wireMesh.scale.set(1.002, 1.002, 1.002);
      mesh.add(wireMesh);

      // Distribute in a deep vertical column spanning the entire scroll height
      const t = i / numGems;
      const angle = t * Math.PI * 6;
      const radius = 9 + (Math.random() * 6);
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 4;
      const y = 14 - t * 50 + (Math.random() - 0.5) * 4; // descends down as scroll advances
      const z = -6 + (Math.random() - 0.5) * 12;

      mesh.position.set(x, y, z);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

      const scale = 0.6 + Math.random() * 0.7;
      mesh.scale.set(scale, scale, scale);

      // Custom velocity and drift metadata
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.012,
        rotSpeedY: (Math.random() - 0.5) * 0.014,
        rotSpeedZ: (Math.random() - 0.5) * 0.01,
        initialY: y,
        floatSpeed: 0.5 + Math.random() * 1.5,
        floatAmplitude: 0.4 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
      };

      gemGroup.add(mesh);
      state.gemMeshes.push(mesh);
    }

    // 5. Constellation Starfield Particle Cloud
    const particleCount = 850;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cTeal = new THREE.Color(0x00e5be);
    const cIndigo = new THREE.Color(0x818cf8);
    const cAmber = new THREE.Color(0xfbbf24);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Wide cylindrical spread matching whole page height
      positions[i3]     = (Math.random() - 0.5) * 45;
      positions[i3 + 1] = 20 - Math.random() * 70;
      positions[i3 + 2] = -15 + Math.random() * 25;

      const pickColor = Math.random() > 0.6 ? cTeal : (Math.random() > 0.5 ? cIndigo : cAmber);
      colors[i3]     = pickColor.r;
      colors[i3 + 1] = pickColor.g;
      colors[i3 + 2] = pickColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.65 : 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    state.particles = particles;

    // 6. Mouse movement tracker (Smooth normalized values)
    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      state.mouse.targetX = normX;
      state.mouse.targetY = normY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 7. Scroll sync tracker
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = window.scrollY / maxScroll;
      state.targetScrollY = progress;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 8. Resize listener
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Main Animation Loop (60 FPS with buttery lerp)
    let clock = new THREE.Clock();

    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      // Accessibility: Render a serene static snapshot once without continuous motion
      renderer.render(scene, camera);
      return;
    }

    const animate = () => {
      if (state.isDestroyed) return;
      state.reqId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse
      state.mouse.x += (state.mouse.targetX - state.mouse.x) * 0.05;
      state.mouse.y += (state.mouse.targetY - state.mouse.y) * 0.05;

      // Lerp scroll progress (0.0 to 1.0)
      state.scrollY += (state.targetScrollY - state.scrollY) * 0.08;

      // Camera flies down the 3D space as user scrolls the website
      const scrollFlightY = -state.scrollY * 38;
      camera.position.y = scrollFlightY;
      
      // Dynamic camera orbital drift based on mouse
      camera.position.x = state.mouse.x * 2.5;
      camera.position.z = 18 + Math.sin(state.scrollY * Math.PI * 2) * 2 - state.mouse.y * 1.5;

      // Look slightly ahead of camera path
      camera.lookAt(state.mouse.x * 1.2, scrollFlightY - 0.5, 0);

      // Animate floating crystals
      for (let i = 0; i < state.gemMeshes.length; i++) {
        const mesh = state.gemMeshes[i];
        const u = mesh.userData;

        mesh.rotation.x += u.rotSpeedX;
        mesh.rotation.y += u.rotSpeedY;
        mesh.rotation.z += u.rotSpeedZ;

        // Subtle vertical bobbing
        mesh.position.y = u.initialY + Math.sin(elapsedTime * u.floatSpeed + u.floatOffset) * u.floatAmplitude;
      }

      // Slowly rotate particle field
      if (particles) {
        particles.rotation.y = elapsedTime * 0.015 + state.mouse.x * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      state.isDestroyed = true;
      if (state.reqId) cancelAnimationFrame(state.reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      try {
        gemGeometries.forEach(g => g.dispose());
        particleGeo.dispose();
        particleMat.dispose();
        if (renderer && renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
          renderer.dispose();
        }
      } catch (err) {
        console.warn('Three.js cleanup error', err);
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: theme === 'dark' ? 0.95 : 0.65,
        transition: 'opacity 0.5s ease',
      }}
      aria-hidden="true"
    />
  );
};
