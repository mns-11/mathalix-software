import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import {
  ArrowLeft, ArrowRight, Terminal, Sparkles, Shield,
  Code2, Waves, Lock, Radio
} from 'lucide-react';
import { WaterBackground } from './WaterBackground';

// Multi-mode interactive console presets representing MATHALIX real engineering
const CONSOLE_TABS = [
  {
    id: 'engine',
    label: 'mathalix-engine.ts',
    icon: Terminal,
    statusText: 'RUNNING',
    statusColor: '#10B981',
    lines: [
      { tokens: [
        { t: 'import', c: '#C792EA' }, { t: ' { MathalixCore, CloudMesh }', c: '#E2E8F0' },
        { t: ' from ', c: '#C792EA' }, { t: "'@mathalix/enterprise'", c: '#C3E88D' }
      ]},
      { tokens: [] },
      { tokens: [
        { t: 'const ', c: '#C792EA' }, { t: 'cluster', c: '#82AAFF' },
        { t: ' = ', c: '#E2E8F0' }, { t: 'new ', c: '#C792EA' },
        { t: 'MathalixCore', c: '#FFCB6B' }, { t: '({', c: '#E2E8F0' }
      ]},
      { indent: 2, tokens: [
        { t: 'region: ', c: '#82AAFF' }, { t: "'me-central-1 (Riyadh)'", c: '#C3E88D' }, { t: ',', c: '#E2E8F0' }
      ]},
      { indent: 2, tokens: [
        { t: 'architecture: ', c: '#82AAFF' }, { t: "'Event-Driven Microservices'", c: '#C3E88D' }, { t: ',', c: '#E2E8F0' }
      ]},
      { indent: 2, tokens: [
        { t: 'concurrency: ', c: '#82AAFF' }, { t: "'50,000+ RPS Distributed'", c: '#C3E88D' }, { t: ',', c: '#E2E8F0' }
      ]},
      { indent: 2, tokens: [
        { t: 'security: ', c: '#82AAFF' }, { t: "'ISO-27001 / Zero-Trust'", c: '#C3E88D' }
      ]},
      { tokens: [{ t: '});', c: '#E2E8F0' }] },
      { tokens: [] },
      { tokens: [
        { t: 'await ', c: '#C792EA' }, { t: 'cluster', c: '#82AAFF' },
        { t: '.', c: '#E2E8F0' }, { t: 'deployAutonomousMesh', c: '#89DDFF' },
        { t: '()', c: '#E2E8F0' }, { t: '; // 🚀 High Availability 99.99%', c: '#546E7A' }
      ]}
    ],
    metrics: [
      { label: 'Latency', value: '< 34ms', color: '#2DD4BF' },
      { label: 'Uptime', value: '99.99%', color: '#818CF8' },
      { label: 'Nodes', value: '128 Pods', color: '#F59E0B' },
      { label: 'TPS', value: '18.4K/s', color: '#10B981' }
    ]
  },
  {
    id: 'zatca',
    label: 'zatca-phase2.json',
    icon: Shield,
    statusText: 'CLEARED',
    statusColor: '#2DD4BF',
    lines: [
      { tokens: [
        { t: '{', c: '#E2E8F0' }
      ]},
      { indent: 2, tokens: [
        { t: '"compliance": ', c: '#82AAFF' }, { t: '"ZATCA Phase 2 Clearance"', c: '#C3E88D' }, { t: ',', c: '#E2E8F0' }
      ]},
      { indent: 2, tokens: [
        { t: '"invoiceType": ', c: '#82AAFF' }, { t: '"Standard Tax Invoice (0100000)"', c: '#C3E88D' }, { t: ',', c: '#E2E8F0' }
      ]},
      { indent: 2, tokens: [
        { t: '"hashAlgorithm": ', c: '#82AAFF' }, { t: '"SHA-256 Cryptographic Signature"', c: '#C3E88D' }, { t: ',', c: '#E2E8F0' }
      ]},
      { indent: 2, tokens: [
        { t: '"digitalCertificate": ', c: '#82AAFF' }, { t: '"X.509 Cryptographic ECDSA"', c: '#C3E88D' }, { t: ',', c: '#E2E8F0' }
      ]},
      { indent: 2, tokens: [
        { t: '"qrValidationStatus": ', c: '#82AAFF' }, { t: '"VALIDATED_PASS_ZATCA"', c: '#FFCB6B' }, { t: ',', c: '#E2E8F0' }
      ]},
      { indent: 2, tokens: [
        { t: '"clearanceTimestamp": ', c: '#82AAFF' }, { t: '"2026-10-28T12:00:00Z"', c: '#C3E88D' }
      ]},
      { tokens: [{ t: '}', c: '#E2E8F0' }] }
    ],
    metrics: [
      { label: 'ZATCA', value: 'Phase 2', color: '#2DD4BF' },
      { label: 'Clearance', value: 'Instant', color: '#10B981' },
      { label: 'Signature', value: 'ECDSA', color: '#818CF8' },
      { label: 'Audit Trail', value: '100% Immutable', color: '#F59E0B' }
    ]
  },
  {
    id: 'telemetry',
    label: 'bus-gps-telemetry.log',
    icon: Radio,
    statusText: 'STREAMING',
    statusColor: '#F59E0B',
    lines: [
      { tokens: [
        { t: '[WS_STREAM] ', c: '#F59E0B' }, { t: 'Connected to Here We Go Fleet Dispatcher', c: '#C3E88D' }
      ]},
      { tokens: [
        { t: '[COORDINATES] ', c: '#82AAFF' }, { t: 'Fleet-09 (Riyadh Northern Ring): 24.7136° N, 46.6753° E', c: '#E2E8F0' }
      ]},
      { tokens: [
        { t: '[SPEED_TELEMETRY] ', c: '#2DD4BF' }, { t: 'Velocity: 58 km/h | Fuel: 82% | Route: Safe', c: '#E2E8F0' }
      ]},
      { tokens: [
        { t: '[ARRIVAL_ETA] ', c: '#FFCB6B' }, { t: 'Estimated School Arrival: 07:18 AM (On Schedule)', c: '#C3E88D' }
      ]},
      { tokens: [
        { t: '[PUSH_NOTIFY] ', c: '#C792EA' }, { t: 'Broadcasting push alerts to 42 enrolled parents...', c: '#82AAFF' }
      ]},
      { tokens: [
        { t: '[STATUS] ', c: '#10B981' }, { t: 'Real-time WebSocket Latency: 12ms ping', c: '#10B981' }
      ]}
    ],
    metrics: [
      { label: 'Live GPS', value: 'Active', color: '#10B981' },
      { label: 'Socket Ping', value: '12ms', color: '#2DD4BF' },
      { label: 'Accuracy', value: '± 1.2m', color: '#F59E0B' },
      { label: 'Fleet Sync', value: 'Realtime', color: '#818CF8' }
    ]
  },
  {
    id: 'security',
    label: 'security-shield.yml',
    icon: Lock,
    statusText: 'SECURED',
    statusColor: '#818CF8',
    lines: [
      { tokens: [{ t: 'securityPolicy:', c: '#82AAFF' }] },
      { indent: 2, tokens: [
        { t: 'standard: ', c: '#82AAFF' }, { t: "'ISO/IEC 27001:2022'", c: '#C3E88D' }
      ]},
      { indent: 2, tokens: [
        { t: 'encryptionAtRest: ', c: '#82AAFF' }, { t: "'AES-256-GCM'", c: '#C3E88D' }
      ]},
      { indent: 2, tokens: [
        { t: 'encryptionInTransit: ', c: '#82AAFF' }, { t: "'TLS 1.3 Strict Cipher'", c: '#C3E88D' }
      ]},
      { indent: 2, tokens: [
        { t: 'rateLimiter: ', c: '#82AAFF' }, { t: "'TokenBucket 100k/IP Distributed'", c: '#C3E88D' }
      ]},
      { indent: 2, tokens: [
        { t: 'wafProtection: ', c: '#82AAFF' }, { t: "'Active ML DDoS Mitigation (Cloudflare)'", c: '#C3E88D' }
      ]},
      { indent: 2, tokens: [
        { t: 'complianceScore: ', c: '#82AAFF' }, { t: "'99.8% Perfect Hardened'", c: '#FFCB6B' }
      ]}
    ],
    metrics: [
      { label: 'Cipher', value: 'AES-256', color: '#818CF8' },
      { label: 'WAF', value: 'Cloudflare', color: '#F59E0B' },
      { label: 'Threat Def', value: '0 Breaches', color: '#10B981' },
      { label: 'Audit', value: 'ISO-27001', color: '#2DD4BF' }
    ]
  }
];

export const Hero = ({ t, currentLang, theme = 'light' }) => {
  const [activeTabId, setActiveTabId] = useState('engine');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normX: 0, normY: 0 });

  const isRTL = currentLang === 'ar';
  const currentTab = CONSOLE_TABS.find(t => t.id === activeTabId) || CONSOLE_TABS[0];

  // ── GSAP Choreographed Entrance Timeline ──
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo('.hero-badge-group',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35 }
      )
      .fromTo('.hero-title',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45 },
        '-=0.2'
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.25'
      )
      .fromTo('.hero-cta-group',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35 },
        '-=0.2'
      )
      .fromTo('.hero-verbal-bar',
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        '-=0.15'
      )
      .fromTo('.hero-terminal-hud',
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        '-=0.35'
      );
    });

    return () => ctx.revert();
  }, []);

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({
      x,
      y,
      normX: (x / rect.width) * 2 - 1,
      normY: (y / rect.height) * 2 - 1
    });
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: 0, y: 0, normX: 0, normY: 0 });
  };

  // Marquee list of enterprise capability pillars
  const marqueePillars = isRTL ? [
    '⚡ جاهزية حوسبية مطلقة 99.99% SLA',
    '🛡️ فوترة ZATCA المرحلة الثانية معتمدة وربط فوري',
    '🏢 إرث راسخ بدعم مجموعة سكني المثالي الاستثمارية',
    '📱 تطبيقات جوال ساحرة تتصدر مؤشرات تفاعل المستخدمين',
    '🚀 معمارية Microservices سحابية موزعة فائقة التوسع',
    '🔒 حصانة أمن سيبراني مطابقة لمعايير ISO-27001',
    '🇸🇦 ريادة وطنية ترسخ مستهدفات رؤية السعودية 2030',
    '⚡ سرعة استجابة برمجية خاطفة أقل من 35ms',
    '🤖 نماذج ذكاء اصطناعي توليدي تصنع التفوق التنافسي'
  ] : [
    '⚡ 99.99% CLUSTER UPTIME SLA GUARANTEED',
    '🛡️ ZATCA PHASE 2 E-INVOICING CLEARANCE CERTIFIED',
    '🏢 BACKED BY SAKANI AL MATHALI ENTERPRISE CONGLOMERATE',
    '📱 TOP-TIER MOBILE APPS WITH UNMATCHED USER RETENTION',
    '🚀 EVENT-DRIVEN DISTRIBUTED CLOUD MICROSERVICES',
    '🔒 ISO-27001 HARDENED ENTERPRISE DEFENSE',
    '🇸🇦 CHAMPIONING SAUDI VISION 2030 DIGITAL SOVEREIGNTY',
    '⚡ ULTRA-LOW LATENCY EXECUTION SUB-35MS',
    '🤖 PROPRIETARY APPLIED AI & PREDICTIVE ENGINES'
  ];

  return (
    <section
      id="home"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      style={{
        position: 'relative',
        minHeight: 'calc(100dvh - 40px)',
        paddingBlockStart: 'clamp(5rem, 7.5vw, 6.75rem)',
        paddingBlockEnd: 'clamp(1.5rem, 3vw, 2.5rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden'
      }}
    >
      {/* ── Cinematic Anamorphic Lens Flare Line ── */}
      <div className="cinematic-anamorphic-flare" />

      {/* ── Dynamic Interactive Water & Waves Canvas ── */}
      <WaterBackground theme={theme} />

      {/* ── Dynamic Ambient Interactive Spotlight ── */}
      {mousePos.x > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            background: `radial-gradient(circle 650px at ${mousePos.x}px ${mousePos.y}px, ${
              theme === 'dark' ? 'rgba(99, 102, 241, 0.16)' : 'rgba(79, 70, 229, 0.08)'
            }, transparent 70%)`,
            transition: 'background 0.08s ease-out'
          }}
        />
      )}

      {/* Ambient Glow Orbs */}
      <div className="glow-orb glow-indigo animate-pulse-glow" style={{ top: '-5%', insetInlineEnd: '-5%', width: '600px', height: '600px', opacity: 0.22 }} />
      <div className="glow-orb glow-teal animate-pulse-glow" style={{ bottom: '15%', insetInlineStart: '-8%', width: '500px', height: '500px', animationDelay: '3s', opacity: 0.22 }} />
      <div className="glow-orb glow-violet" style={{ top: '40%', left: '35%', width: '350px', height: '350px', opacity: 0.14 }} />

      {/* Dot grid texture */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        opacity: theme === 'dark' ? 0.035 : 0.06,
        backgroundImage: `radial-gradient(circle, ${theme === 'dark' ? '#FFFFFF' : '#4F46E5'} 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            alignItems: 'center'
          }}
        >
          {/* ── Left Column: Editorial Value Proposition ── */}
          <div className="hero-text-col">

            {/* Live Status Pill with Multi-Ring Radar & Fluid Chip */}
            <div className="hero-badge-group" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBlockEnd: '1.25rem' }}>
              <div className="badge-tag hero-badge animate-float" style={{ boxShadow: '0 8px 28px rgba(99,102,241,0.32)', border: '1px solid rgba(45,212,191,0.4)' }}>
                {/* Radar Sonar Ping Wave */}
                <div className="radar-ping-wrapper">
                  <span className="radar-ping-ring" />
                  <span className="radar-ping-ring-delayed" />
                  <span className="radar-ping-center" />
                </div>
                <Sparkles size={14} style={{ color: 'var(--c-teal-light)', flexShrink: 0 }} />
                <span>{t.hero.badge}</span>
              </div>

              <div className="hero-fluid-chip" style={{ animation: 'pulseBorder 4s infinite ease-in-out' }}>
                <Waves size={13} />
                <span>{isRTL ? 'بيئة برمجية انسيابية حية' : 'Live Interactive Engine'}</span>
              </div>
            </div>

            {/* Cinematic Headline with Living Gradient */}
            <h1
              className="hero-title text-balance"
              style={{
                fontSize: 'var(--t-hero)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBlockEnd: '1.35rem'
              }}
            >
              {t.hero.titleStart}
              <span className="cinematic-living-gradient">{t.hero.titleHighlight}</span>
              {t.hero.titleEnd}
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-balance" style={{
              fontSize: 'var(--t-body)',
              color: 'var(--c-text-muted)',
              lineHeight: 1.8,
              maxWidth: '560px',
              marginBlockEnd: '2.5rem'
            }}>
              {t.hero.subtitle}
            </p>

            {/* CTA Group with Cinematic Glow */}
            <div className="hero-cta-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="#contact"
                className="btn btn-primary"
                style={{
                  boxShadow: '0 8px 30px rgba(99, 102, 241, 0.4), 0 0 20px rgba(45, 212, 191, 0.25)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  padding: '0.85rem 1.85rem',
                  fontSize: '0.98rem'
                }}
              >
                <span>{t.hero.ctaPrimary}</span>
                {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </a>
              <a
                href="#projects"
                className="btn btn-secondary"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(12px)',
                  padding: '0.85rem 1.7rem',
                  fontSize: '0.95rem'
                }}
              >
                <span>{isRTL ? 'استعراض المشاريع الحية' : 'Explore Live Showcase'}</span>
              </a>
            </div>

            {/* Brand Pedigree Bar */}
            <div className="hero-verbal-bar" style={{
              marginBlockStart: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              paddingBlockStart: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.08)'
            }}>
              <Code2 size={16} style={{ color: 'var(--c-teal)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', color: 'var(--c-amber-warm)', textTransform: 'uppercase' }}>
                {t.hero.verbalIdeaAr}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', color: 'var(--c-indigo-light)', textTransform: 'uppercase' }}>
                {t.hero.verbalIdeaEn}
              </span>
            </div>
          </div>

          {/* ── Right Column: 3D Perspective Interactive Architecture Console ── */}
          <div className="hero-terminal-hud" style={{ position: 'relative', width: '100%', perspective: '1200px' }}>
            
            {/* Satellite Floating Badge 1 (Top) */}
            <div
              className="animate-float-cinematic"
              style={{
                position: 'absolute',
                top: '-24px',
                insetInlineEnd: '-14px',
                zIndex: 10,
                background: 'rgba(15, 23, 42, 0.92)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(45, 212, 191, 0.4)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.5), 0 0 16px rgba(45,212,191,0.25)',
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--r-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#2DD4BF'
              }}
            >
              <Sparkles size={13} />
              <span>{isRTL ? '✦ ذكاء اصطناعي وتكامل سحابي' : '✦ AI & Cloud Architecture'}</span>
            </div>

            {/* Satellite Floating Badge 2 (Bottom) */}
            <div
              className="animate-float-cinematic"
              style={{
                position: 'absolute',
                bottom: '-20px',
                insetInlineStart: '-14px',
                zIndex: 10,
                animationDelay: '3.5s',
                background: 'rgba(15, 23, 42, 0.92)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.5), 0 0 16px rgba(245,158,11,0.25)',
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--r-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#F59E0B'
              }}
            >
              <Shield size={13} />
              <span>{isRTL ? '✦ معتمد ZATCA المرحلة 2' : '✦ ZATCA Phase 2 Cleared'}</span>
            </div>

            {/* Decorative volumetric glow behind terminal */}
            <div style={{
              position: 'absolute', inset: '-16px',
              background: 'radial-gradient(ellipse at center, rgba(80,70,228,0.28) 0%, rgba(45,212,191,0.15) 50%, transparent 75%)',
              borderRadius: 'var(--r-xl)', zIndex: 0, filter: 'blur(25px)'
            }} />

            {/* Terminal Container with Interactive 3D Physics */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: 'var(--r-lg)',
                overflow: 'hidden',
                border: '1px solid rgba(99, 102, 241, 0.45)',
                boxShadow: '0 35px 80px -15px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08), 0 0 35px rgba(99, 102, 241, 0.2)',
                background: '#060B18',
                transform: `perspective(1200px) rotateX(${-mousePos.normY * 2.5}deg) rotateY(${mousePos.normX * 2.5}deg) scale3d(1.005, 1.005, 1.005)`,
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Holographic Scanline Overlay */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}>
                <div
                  style={{
                    width: '100%',
                    height: '40px',
                    background: 'linear-gradient(180deg, transparent, rgba(45, 212, 191, 0.18), transparent)',
                    animation: 'scanlineSweep 6s ease-in-out infinite'
                  }}
                />
              </div>

              {/* Dynamic Glare Reflection Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  zIndex: 6,
                  background: `radial-gradient(circle 500px at ${50 + mousePos.normX * 35}% ${50 + mousePos.normY * 35}%, rgba(255,255,255,0.07), transparent 70%)`
                }}
              />

              {/* Window Chrome Header with macOS Dots & Status */}
              <div style={{
                background: '#0A1020',
                padding: '0.65rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                position: 'relative',
                zIndex: 2,
                direction: 'ltr',
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
                  {['#EF4444','#F59E0B','#10B981'].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, boxShadow: `0 0 6px ${c}66` }} />
                  ))}
                </div>

                {/* Active Tab Name */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {React.createElement(currentTab.icon, { size: 12, style: { color: currentTab.statusColor } })}
                  <span>{currentTab.label}</span>
                </div>

                {/* Status Indicator */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  background: 'rgba(16,185,129,0.12)', border: `1px solid ${currentTab.statusColor}44`,
                  padding: '0.15rem 0.5rem', borderRadius: 'var(--r-full)',
                  color: currentTab.statusColor, fontSize: '0.65rem', fontWeight: 800,
                  fontFamily: 'var(--font-mono)'
                }}>
                  <span className="live-signal-dot" style={{ width: 6, height: 6, background: currentTab.statusColor }} />
                  <span>{currentTab.statusText}</span>
                </div>
              </div>

              {/* Interactive Preset Switcher Tabs */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.65rem',
                background: '#040711',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                overflowX: 'auto',
                direction: 'ltr'
              }}>
                {CONSOLE_TABS.map(tab => {
                  const isActive = tab.id === activeTabId;
                  const IconComp = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabId(tab.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '6px',
                        border: 'none',
                        background: isActive ? 'rgba(99, 102, 241, 0.22)' : 'transparent',
                        color: isActive ? '#A5B4FC' : 'rgba(255, 255, 255, 0.5)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <IconComp size={12} style={{ color: isActive ? tab.statusColor : 'inherit' }} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Code Engine Interactive View Body */}
              <div style={{
                padding: 'clamp(1rem,2vw,1.4rem)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.76rem,0.88vw,0.84rem)',
                lineHeight: 1.65,
                minHeight: '290px',
                direction: 'ltr',
                textAlign: 'left',
                overflowX: 'auto',
                background: 'linear-gradient(180deg, #060B18 0%, #040810 100%)',
                position: 'relative',
                zIndex: 2
              }}>
                {currentTab.lines.map((line, li) => {
                  const indent = line.indent || 0;
                  return (
                    <div key={li} style={{ paddingLeft: `${indent * 0.75}rem`, minHeight: '1.45em' }}>
                      {line.tokens.map((tk, ti) => (
                        <span key={ti} style={{ color: tk.c }}>{tk.t}</span>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Metrics Bar for the Active Preset */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                background: '#05090F',
                position: 'relative',
                zIndex: 2,
                direction: 'ltr'
              }}>
                {currentTab.metrics.map((m, i) => (
                  <div key={i} style={{
                    padding: '0.65rem 0.5rem',
                    textAlign: 'center',
                    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem'
                  }}>
                    <span style={{ fontSize: '0.6rem', color: '#94A3B8', letterSpacing: '0.5px' }}>{m.label}</span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: m.color, fontFamily: 'var(--font-mono)' }}>{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── World-Class Infinite Capability Marquee Ribbon ── */}
      <div
        style={{
          marginBlockStart: 'clamp(3rem, 5vw, 4.5rem)',
          borderTop: '1px solid var(--c-border-light)',
          borderBottom: '1px solid var(--c-border-light)',
          background: 'rgba(11, 17, 32, 0.65)',
          backdropFilter: 'blur(16px)',
          paddingBlock: '0.85rem',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 3
        }}
      >
        <div className="marquee-track" style={{ gap: '2.5rem', alignItems: 'center' }}>
          {[...marqueePillars, ...marqueePillars].map((pillar, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: 'var(--c-text-muted)',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{pillar}</span>
              <span style={{ color: 'var(--c-indigo)', opacity: 0.6 }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .hero-grid {
            grid-template-columns: 1.08fr 0.92fr !important;
          }
        }
        @media (max-width: 959px) {
          .hero-grid      { text-align: center !important; }
          .hero-text-col  { display: flex !important; flex-direction: column !important; align-items: center !important; }
          .hero-badge     { margin-inline: auto !important; }
          .hero-title, .hero-subtitle { margin-inline: auto !important; text-align: center !important; }
          .hero-cta-group, .hero-verbal-bar { justify-content: center !important; width: 100% !important; }
        }
        @media (max-width: 540px) {
          .hero-cta-group a { width: 100% !important; }
        }
      `}</style>
    </section>
  );
};