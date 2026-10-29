import React, { useEffect, useRef } from 'react';

/**
 * WaterBackground — Ultra-Luxury Interactive Fluid & Water Waves Canvas
 * Features:
 * - Multi-layered organic sinusoidal fluid waves with harmonic phase offsets
 * - Interactive mouse ripple disturbance & fluid displacement
 * - Bioluminescent floating water droplets/particles with gentle sway
 * - Caustics refraction light gradient
 * - Adaptive color palette for Dark & Light themes
 * - High-DPI Retina support & 60fps performance optimization
 */
export const WaterBackground = ({ theme = 'dark' }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, intensity: 0 });
  const animFrameId = useRef(null);
  const isVisible = useRef(true);

  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Tranquil, majestic fluid simulation parameters
    let time = 0;
    const waves = [
      { amplitude: 26, wavelength: 0.0022, speed: 0.007, phase: 0, opacity: isDark ? 0.22 : 0.16, color1: isDark ? '#06b6d4' : '#0284c7', color2: isDark ? '#3b82f6' : '#38bdf8' },
      { amplitude: 34, wavelength: 0.0018, speed: 0.005, phase: 2.1, opacity: isDark ? 0.25 : 0.18, color1: isDark ? '#14b8a6' : '#0d9488', color2: isDark ? '#6366f1' : '#60a5fa' },
      { amplitude: 22, wavelength: 0.0028, speed: 0.008, phase: 4.3, opacity: isDark ? 0.28 : 0.20, color1: isDark ? '#4338ca' : '#2563eb', color2: isDark ? '#06b6d4' : '#06b6d4' },
      { amplitude: 40, wavelength: 0.0015, speed: 0.004, phase: 1.2, opacity: isDark ? 0.35 : 0.25, color1: isDark ? '#080e1e' : '#bae6fd', color2: isDark ? '#111b38' : '#7dd3fc' },
    ];

    // Floating bioluminescent water droplets/bubbles (calm, subtle)
    const particleCount = 22;
    const particles = [];
    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * (width || window.innerWidth),
          y: Math.random() * (height || window.innerHeight),
          radius: Math.random() * 2.8 + 0.8,
          speedY: Math.random() * 0.45 + 0.15,
          speedX: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.6 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          phase: Math.random() * Math.PI * 2,
          color: isDark
            ? (i % 3 === 0 ? '#2DD4BF' : i % 3 === 1 ? '#818CF8' : '#38BDF8')
            : (i % 3 === 0 ? '#0D9488' : i % 3 === 1 ? '#4F46E5' : '#0284C7')
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      if (particles.length === 0) initParticles();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse movement interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.intensity = Math.min(mouseRef.current.intensity + 0.2, 1.2);
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    // Pause when offscreen for 60fps power efficiency
    const observer = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(parent);

    // Accessibility: Check prefers-reduced-motion
    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Main animation loop
    const render = () => {
      if (!isReduced) {
        animFrameId.current = requestAnimationFrame(render);
      }
      if (!isVisible.current || width === 0 || height === 0) return;

      time += 1;

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
      mouseRef.current.intensity *= 0.96; // fade ripple

      ctx.clearRect(0, 0, width, height);

      // ── 1. Deep Oceanic Liquid Base Gradient ──
      const baseGrad = ctx.createLinearGradient(0, 0, width * 0.5, height);
      if (isDark) {
        baseGrad.addColorStop(0, '#060B18');
        baseGrad.addColorStop(0.35, '#081226');
        baseGrad.addColorStop(0.7, '#071A33');
        baseGrad.addColorStop(1, '#050D1D');
      } else {
        baseGrad.addColorStop(0, '#F0F9FF');
        baseGrad.addColorStop(0.4, '#E0F2FE');
        baseGrad.addColorStop(0.8, '#BAE6FD');
        baseGrad.addColorStop(1, '#F8FAFC');
      }
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // ── 2. Underwater Caustics & Light Refraction Shimmer ──
      const causticsGrad = ctx.createRadialGradient(
        width * 0.35 + Math.sin(time * 0.008) * 120,
        height * 0.3 + Math.cos(time * 0.007) * 80,
        20,
        width * 0.4,
        height * 0.4,
        Math.max(width, height) * 0.8
      );
      if (isDark) {
        causticsGrad.addColorStop(0, 'rgba(45, 212, 191, 0.18)');
        causticsGrad.addColorStop(0.35, 'rgba(59, 130, 246, 0.12)');
        causticsGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.06)');
        causticsGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        causticsGrad.addColorStop(0, 'rgba(14, 165, 233, 0.20)');
        causticsGrad.addColorStop(0.35, 'rgba(45, 212, 191, 0.13)');
        causticsGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.06)');
        causticsGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = causticsGrad;
      ctx.fillRect(0, 0, width, height);

      // ── Volumetric Cinematic Light Shafts (God Rays) ──
      ctx.save();
      const rayCount = 3;
      for (let r = 0; r < rayCount; r++) {
        const rayAngle = Math.PI * 0.28 + Math.sin(time * 0.004 + r * 1.8) * 0.14;
        const originX = width * (0.22 + r * 0.28);
        const rayWidth = width * 0.18;
        const rayGrad = ctx.createLinearGradient(
          originX, 0,
          originX + Math.cos(rayAngle) * height * 1.1,
          height
        );
        const rayAlpha = isDark ? 0.055 : 0.04;
        rayGrad.addColorStop(0, r === 1 ? `rgba(245, 158, 11, ${rayAlpha * 1.3})` : `rgba(45, 212, 191, ${rayAlpha * 1.5})`);
        rayGrad.addColorStop(0.5, `rgba(99, 102, 241, ${rayAlpha})`);
        rayGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(originX - rayWidth * 0.15, 0);
        ctx.lineTo(originX + rayWidth * 0.15, 0);
        ctx.lineTo(originX + Math.cos(rayAngle) * height * 1.1 + rayWidth, height);
        ctx.lineTo(originX + Math.cos(rayAngle) * height * 1.1 - rayWidth, height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Mouse ripple glow
      if (mouseRef.current.intensity > 0.02) {
        const rippleGrad = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          5,
          mouseRef.current.x,
          mouseRef.current.y,
          280 * mouseRef.current.intensity
        );
        rippleGrad.addColorStop(0, isDark ? 'rgba(45, 212, 191, 0.26)' : 'rgba(14, 165, 233, 0.28)');
        rippleGrad.addColorStop(0.5, isDark ? 'rgba(99, 102, 241, 0.12)' : 'rgba(45, 212, 191, 0.14)');
        rippleGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = rippleGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // ── 3. Multi-Layer Sinusoidal Fluid Waves ──
      const waveBaseY = height * 0.72; // Waves undulate in the lower half
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseInt = mouseRef.current.intensity;

      waves.forEach((w, idx) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);

        const currentY = waveBaseY + (idx * 28);
        ctx.lineTo(0, currentY);

        // Step through x coordinates to calculate wave heights
        const step = 8;
        for (let x = 0; x <= width + step; x += step) {
          // Primary wave
          const baseSin = Math.sin(x * w.wavelength + time * w.speed + w.phase);
          // Harmonic wave for natural water texture
          const harmonicSin = Math.sin(x * w.wavelength * 2.3 - time * w.speed * 0.8) * 0.35;
          // Micro ripple
          const microSin = Math.cos(x * 0.015 + time * 0.04) * 0.15;

          let y = currentY + (baseSin + harmonicSin + microSin) * w.amplitude;

          // Mouse fluid repulsion/ripple interaction
          if (mouseInt > 0.01) {
            const dist = Math.abs(x - mouseX);
            if (dist < 220) {
              const falloff = Math.cos((dist / 220) * (Math.PI / 2));
              const mouseOffsetY = (mouseY - y) * 0.15;
              const rippleWave = Math.sin((dist * 0.05) - (time * 0.12)) * 18 * mouseInt * falloff;
              y += rippleWave + (mouseOffsetY * falloff * mouseInt);
            }
          }

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Wave gradient fill
        const waveGrad = ctx.createLinearGradient(0, currentY - w.amplitude, width, height);
        const hexToRgba = (hex, alpha) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        waveGrad.addColorStop(0, hexToRgba(w.color1, w.opacity));
        waveGrad.addColorStop(0.5, hexToRgba(w.color2, w.opacity * 0.7));
        waveGrad.addColorStop(1, hexToRgba(isDark ? '#060B18' : '#F0F9FF', w.opacity * 0.95));

        ctx.fillStyle = waveGrad;
        ctx.fill();

        // Water surface crest highlight line (shimmer crest)
        ctx.beginPath();
        for (let x = 0; x <= width + step; x += step) {
          const baseSin = Math.sin(x * w.wavelength + time * w.speed + w.phase);
          const harmonicSin = Math.sin(x * w.wavelength * 2.3 - time * w.speed * 0.8) * 0.35;
          let y = currentY + (baseSin + harmonicSin) * w.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = hexToRgba(isDark ? '#5EEAD4' : '#0284C7', isDark ? 0.38 : 0.28);
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.restore();
      });

      // ── 4. Bioluminescent Floating Droplets / Stardust with Mouse Repulsion ──
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(time * 0.02 + p.phase) * 0.35;
        p.phase += p.pulseSpeed;

        // Dynamic repulsion from mouse cursor
        if (mouseInt > 0.01) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 0) {
            const force = (1 - dist / 180) * 5 * mouseInt;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity = p.opacity * (0.65 + 0.35 * Math.sin(p.phase));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, currentOpacity));
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isDark ? 10 : 5;
        ctx.fill();
        ctx.restore();
      });
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isDark]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0
        }}
      />

      {/* Luxury Specular Overlay Grid / Ambient Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'radial-gradient(circle at 50% 10%, rgba(20, 184, 166, 0.08) 0%, rgba(6, 11, 24, 0.6) 75%, #060B18 100%)'
            : 'radial-gradient(circle at 50% 10%, rgba(14, 165, 233, 0.07) 0%, rgba(240, 249, 255, 0.4) 70%, #F8FAFC 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Bottom Wave Transition to smoothly connect to About section */}
      <div
        style={{
          position: 'absolute',
          bottom: -1,
          insetInline: 0,
          height: '70px',
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 1
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            fill: 'var(--c-bg)'
          }}
        >
          <path d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,58.7C672,43,768,21,864,21.3C960,21,1056,43,1152,53.3C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>
    </div>
  );
};
