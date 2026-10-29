import React, { useState } from 'react';

export const Logo = ({ size = 'medium', currentLang = 'ar', className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const isArabic = currentLang === 'ar';

  // Dimension scaling map
  const scaleMap = {
    small: {
      emblemHeight: '28px',
      titleSize: '1.35rem',
      subSize: '0.62rem',
      gap: '0.65rem',
      imgHeight: '30px'
    },
    medium: {
      emblemHeight: '36px',
      titleSize: '1.65rem',
      subSize: '0.7rem',
      gap: '0.8rem',
      imgHeight: '38px'
    },
    large: {
      emblemHeight: '50px',
      titleSize: '2.25rem',
      subSize: '0.85rem',
      gap: '1.1rem',
      imgHeight: '52px'
    },
  };

  const current = scaleMap[size] || scaleMap.medium;

  // ══════════════════════════════════════════════════════════════
  // ARABIC CORPORATE BRAND LOGO:
  // [SMX Origami Emblem] + "مثالي إكس للبرمجيات والحلول الرقمية"
  // Using Reem Kufi typography: elegant flowing curves with distinct yaa dots (ي)
  // ══════════════════════════════════════════════════════════════
  if (isArabic) {
    return (
      <div
        className={`logo-corporate-brand ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: current.gap,
          userSelect: 'none',
          textDecoration: 'none',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.03)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {/* 1. Official Origami Ribbon Emblem with Cinematic Breathing Aura */}
        <div
          className="animate-logo-aura"
          style={{
            height: current.emblemHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <img
            src="/logo-transparent.png"
            alt="SMX Origami"
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        {/* 2. Sleek Vertical Divider Accent with Ambient Pulse */}
        <div
          style={{
            width: '2px',
            height: '24px',
            background: 'linear-gradient(to bottom, #DC2626 0%, #F59E0B 50%, #2563EB 100%)',
            opacity: 0.55,
            borderRadius: '999px',
            flexShrink: 0,
            boxShadow: '0 0 8px rgba(245, 158, 11, 0.4)'
          }}
        />

        {/* 3. Luxury Cinematic Typography: "مثالي إكس" */}
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, textAlign: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            {/* Word 1: مثالي (Living Ruby to Amber Gradient + Cinematic Glow) */}
            <span
              style={{
                fontFamily: "'Reem Kufi', 'Tajawal', sans-serif",
                fontWeight: 700,
                fontSize: current.titleSize,
                letterSpacing: '0.01em',
                background: 'linear-gradient(135deg, #DC2626 0%, #EA580C 35%, #F59E0B 75%, #FBBF24 100%)',
                backgroundSize: '220% 220%',
                animation: 'cinematicGradientFlow 6s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
                filter: 'drop-shadow(0 0 12px rgba(220, 38, 38, 0.35))'
              }}
            >
              مثالي
            </span>

            {/* Word 2: إكس (Living Royal Blue to Electric Teal Gradient + Cinematic Glow) */}
            <span
              style={{
                fontFamily: "'Reem Kufi', 'Tajawal', sans-serif",
                fontWeight: 700,
                fontSize: current.titleSize,
                letterSpacing: '0.01em',
                background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 30%, #06B6D4 70%, #00E5BE 100%)',
                backgroundSize: '220% 220%',
                animation: 'cinematicGradientFlow 6s ease infinite',
                animationDelay: '1.5s',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
                filter: 'drop-shadow(0 0 14px rgba(37, 99, 235, 0.4))'
              }}
            >
              إكس
            </span>
          </div>

          {/* Subtitle: للبرمجيات والحلول الرقمية */}
          <span
            style={{
              fontFamily: "'Tajawal', sans-serif",
              fontSize: current.subSize,
              fontWeight: 700,
              color: 'var(--c-text-muted)',
              letterSpacing: '0.04em',
              marginTop: '0.12rem',
              opacity: 0.9
            }}
          >
            للبرمجيات والحلول الرقمية
          </span>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // ENGLISH BRAND LOGO:
  // [SMX Origami Ribbon Emblem]
  // ══════════════════════════════════════════════════════════════
  return (
    <div
      className={`inline-flex items-center justify-center select-none animate-logo-aura ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {!imgError ? (
        <img
          src="/logo-transparent.png"
          alt="SMX Logo"
          onError={() => setImgError(true)}
          style={{
            height: current.imgHeight,
            width: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      ) : (
        <svg
          width={current.width || '105px'}
          height={current.imgHeight}
          viewBox="0 0 290 125"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, display: 'block' }}
        >
          <defs>
            <linearGradient id="smx-burgundy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8F2F3A" />
              <stop offset="100%" stopColor="#B83A4A" />
            </linearGradient>
            <linearGradient id="smx-amber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F2A33A" />
              <stop offset="100%" stopColor="#FFB854" />
            </linearGradient>
            <linearGradient id="smx-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <linearGradient id="smx-teal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#19BFA6" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>
          </defs>
          <path d="M 55,10 L 12,45 L 55,80 L 12,115 L 60,115 L 92,80 L 48,45 L 92,10 Z" fill="url(#smx-burgundy)" />
          <path d="M 98,115 L 98,10 L 138,60 L 178,10 L 178,115 L 148,115 L 148,55 L 138,70 L 128,55 L 128,115 Z" fill="url(#smx-amber)" />
          <path d="M 188,10 L 223,62 L 258,10 L 288,10 L 238,77 L 288,115 L 258,115 L 223,62 L 188,115 L 158,115 L 208,77 L 158,10 Z" fill="url(#smx-indigo)" />
          <polygon points="203,90 243,90 223,115" fill="url(#smx-teal)" />
        </svg>
      )}
    </div>
  );
};
