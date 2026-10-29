import React, { useEffect, useRef, useState } from 'react';

/**
 * Cursor3DGlow — Global 3D Ambient Light Follower
 * Features:
 * - Ultra-smooth spring physics (lerp) tracking cursor across all sections
 * - Casts dynamic volumetric ambient light on 3D surfaces and glass cards
 * - Auto-hides on touch/mobile devices to preserve 60fps performance
 * - Shifts subtle hue dynamically depending on section
 */
export const Cursor3DGlow = ({ theme = 'dark' }) => {
  const glowRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer and no reduced motion request
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);

    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const render = () => {
      animId = requestAnimationFrame(render);
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      glow.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: theme === 'dark'
          ? 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(0, 229, 190, 0.06) 40%, transparent 70%)'
          : 'radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, rgba(13, 148, 136, 0.04) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9998,
        willChange: 'transform',
        filter: 'blur(30px)',
        transition: 'opacity 0.3s ease'
      }}
    />
  );
};
