import React, { useRef, useEffect } from 'react';

/**
 * Card3D — Ultra-Smooth Physics-Based 3D Perspective Card
 * Features:
 * - Linear Interpolation (lerp) damping for a weighted, calm, luxurious feel
 * - Direct DOM manipulation via requestAnimationFrame (0 React re-renders on mousemove)
 * - Smooth specular light glare that calmly tracks the cursor
 * - Gentle ease-back to rest state on mouse leave (no abrupt snap)
 * - Full prefers-reduced-motion and touch device awareness
 */
export const Card3D = ({
  children,
  className = '',
  style = {},
  maxTilt = 6,
  scale = 1.015,
  onClick,
  glareColor = 'rgba(255, 255, 255, 0.12)',
  ...rest
}) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({
    currentRotX: 0,
    currentRotY: 0,
    currentScale: 1,
    targetRotX: 0,
    targetRotY: 0,
    targetScale: 1,
    currentGlareX: 50,
    currentGlareY: 50,
    currentGlareOpacity: 0,
    targetGlareX: 50,
    targetGlareY: 50,
    targetGlareOpacity: 0,
    isHovering: false,
  });

  const updatePhysics = () => {
    const s = stateRef.current;
    // Calm, smooth damping factor (0.06 provides smooth, cinematic glide)
    const lerpFactor = 0.06;

    // Interpolate rotations and scale smoothly
    s.currentRotX += (s.targetRotX - s.currentRotX) * lerpFactor;
    s.currentRotY += (s.targetRotY - s.currentRotY) * lerpFactor;
    s.currentScale += (s.targetScale - s.currentScale) * lerpFactor;

    // Interpolate specular glare
    s.currentGlareX += (s.targetGlareX - s.currentGlareX) * lerpFactor;
    s.currentGlareY += (s.targetGlareY - s.currentGlareY) * lerpFactor;
    s.currentGlareOpacity += (s.targetGlareOpacity - s.currentGlareOpacity) * lerpFactor;

    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(${s.currentRotX.toFixed(2)}deg) rotateY(${s.currentRotY.toFixed(2)}deg) scale3d(${s.currentScale.toFixed(3)}, ${s.currentScale.toFixed(3)}, ${s.currentScale.toFixed(3)})`;
    }

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle 320px at ${s.currentGlareX.toFixed(1)}% ${s.currentGlareY.toFixed(1)}%, ${glareColor}, transparent 70%)`;
      glareRef.current.style.opacity = s.currentGlareOpacity.toFixed(2);
    }

    // Continue loop if still hovering or if not yet settled back to resting state
    const isMoving =
      Math.abs(s.targetRotX - s.currentRotX) > 0.02 ||
      Math.abs(s.targetRotY - s.currentRotY) > 0.02 ||
      Math.abs(s.targetScale - s.currentScale) > 0.001 ||
      Math.abs(s.targetGlareOpacity - s.currentGlareOpacity) > 0.01;

    if (s.isHovering || isMoving) {
      animRef.current = requestAnimationFrame(updatePhysics);
    } else {
      // Settle gently to neutral rest
      s.currentRotX = 0;
      s.currentRotY = 0;
      s.currentScale = 1;
      s.currentGlareOpacity = 0;
      if (cardRef.current) {
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
      if (glareRef.current) {
        glareRef.current.style.opacity = '0';
      }
      animRef.current = null;
    }
  };

  const startLoop = () => {
    if (!animRef.current) {
      animRef.current = requestAnimationFrame(updatePhysics);
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    if (typeof window !== 'undefined') {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      if (isReduced || isCoarse) return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    const s = stateRef.current;
    s.isHovering = true;
    s.targetRotX = -normY * maxTilt;
    s.targetRotY = normX * maxTilt;
    s.targetScale = scale;
    s.targetGlareX = (x / rect.width) * 100;
    s.targetGlareY = (y / rect.height) * 100;
    s.targetGlareOpacity = 0.35;

    startLoop();
  };

  const handleMouseLeave = () => {
    const s = stateRef.current;
    s.isHovering = false;
    s.targetRotX = 0;
    s.targetRotY = 0;
    s.targetScale = 1;
    s.targetGlareOpacity = 0;

    startLoop();
  };

  useEffect(() => {
    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-3d-container ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'relative',
        ...style
      }}
    >
      {/* Specular Glare Reflection Layer */}
      <div
        ref={glareRef}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: `radial-gradient(circle 320px at 50% 50%, ${glareColor}, transparent 70%)`,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 8,
          transition: 'none'
        }}
      />
      {children}
    </div>
  );
};
