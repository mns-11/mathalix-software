import React from 'react';
import { Card3D } from './Card3D';
import { Building2, Cpu, Layers, Award, Shield, CheckCircle2, Zap, ExternalLink, HardHat, Warehouse, Code2 } from 'lucide-react';

const PILLARS = [
  {
    icon: <Layers size={22} />,
    boxClass: 'icon-box--indigo',
    titleKey: 'keyPoint1Title',
    descKey: 'keyPoint1Desc',
    decorLine: 'var(--c-indigo)',
    tags: ['Domain-Driven Design', 'Zero-Downtime', 'Clean Code']
  },
  {
    icon: <Cpu size={22} />,
    boxClass: 'icon-box--teal',
    titleKey: 'keyPoint2Title',
    descKey: 'keyPoint2Desc',
    decorLine: 'var(--c-teal)',
    tags: ['Distributed Kubernetes', 'Applied AI', 'Cloud-Native']
  },
  {
    icon: <Award size={22} />,
    boxClass: 'icon-box--amber',
    titleKey: 'keyPoint3Title',
    descKey: 'keyPoint3Desc',
    decorLine: 'var(--c-amber)',
    tags: ['Saudi Vision 2030', 'Enterprise ROI', '24/7 SLA']
  },
];

const CONGLOMERATE_SECTORS = [
  { icon: HardHat, titleAr: 'المقاولات العامة', titleEn: 'General Contracting', color: '#F59E0B' },
  { icon: Building2, titleAr: 'التطوير والاستثمار العقاري', titleEn: 'Real Estate Development', color: '#10B981' },
  { icon: Warehouse, titleAr: 'التوريدات واللوجستيات', titleEn: 'Supply & Logistics', color: '#818CF8' },
  { icon: Code2, titleAr: 'الحلول البرمجية (مثالي إكس)', titleEn: 'Mathalix Digital Solutions', color: '#2DD4BF' },
];

const CHECKLIST = [
  { ar: 'معمارية سحابية سيادية Cloud-Native فائقة الصمود', en: 'Sovereign Cloud-Native Architecture Built for Scale' },
  { ar: 'حصانة سيبرانية معتمدة وفق أعلى معايير ISO 27001', en: 'Certified ISO-27001 Enterprise Cybersecurity' },
  { ar: 'امتثال مالي كامل وربط فوري بهيئة الزكاة ZATCA المرحلة 2', en: 'ZATCA Phase 2 Real-Time Cryptographic Clearance' },
  { ar: 'حراسة هندسية ودعم تشغيلي استباقي على مدار الساعة 24/7', en: '24/7 Dedicated Senior Engineering Monitoring SLA' },
];

export const About = ({ t, currentLang }) => {
  const isRTL = currentLang === 'ar';

  return (
    <section id="about" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient Glow Orbs */}
      <div className="glow-orb glow-violet animate-pulse-glow" style={{ top: '10%', insetInlineStart: '-12%', width: '500px', height: '500px' }} />
      <div className="glow-orb glow-teal" style={{ bottom: '5%', insetInlineEnd: '-5%', width: '380px', height: '380px', opacity: 0.15 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBlockEnd: 'clamp(3rem, 5vw, 5rem)' }}>
          <div className="badge-tag">
            <Building2 size={15} />
            <span>{t.about.badge}</span>
          </div>
          <h2 className="section-title text-balance" style={{ maxWidth: '840px', marginInline: 'auto' }}>
            {isRTL
              ? <><span className="grad-text-brand">{t.about.title.split(' ').slice(0, 2).join(' ')}</span>{' '}{t.about.title.split(' ').slice(2).join(' ')}</>
              : <><span className="grad-text-brand">Digital Innovation</span>{' & Engineering Excellence Without Compromise'}</>
            }
          </h2>
          <p className="section-description text-balance" style={{ marginInline: 'auto' }}>
            {t.about.description}
          </p>
        </div>

        {/* Main Two-Col Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(2rem, 4vw, 3.5rem)',
          alignItems: 'start'
        }}>

          {/* ── Column 1: Engineering Pillars with Specular 3D & Tech Tags ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {PILLARS.map((p, i) => (
              <Card3D
                key={i}
                className="glass-card spotlight-card"
                maxTilt={4}
                scale={1.01}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start',
                  padding: 'clamp(1.35rem, 2.5vw, 1.85rem)',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 'var(--r-md)',
                  border: '1px solid var(--c-border-light)'
                }}
              >
                {/* Accent line on inline-start */}
                <div style={{
                  position: 'absolute',
                  top: 0, bottom: 0,
                  insetInlineStart: 0,
                  width: '4px',
                  background: p.decorLine,
                  borderRadius: '0 3px 3px 0'
                }} />

                <div
                  className={`icon-box icon-box--md ${p.boxClass}`}
                  style={{
                    transform: 'translateZ(26px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                    flexShrink: 0
                  }}
                >
                  {p.icon}
                </div>

                <div style={{ flex: 1, transform: 'translateZ(18px)' }}>
                  <h3 style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--c-text)', marginBlockEnd: '0.45rem' }}>
                    {t.about[p.titleKey]}
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: 'var(--c-text-muted)', lineHeight: 1.7, marginBlockEnd: '0.85rem' }}>
                    {t.about[p.descKey]}
                  </p>

                  {/* Micro Tech Tags */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {p.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          padding: '0.15rem 0.55rem',
                          borderRadius: '4px',
                          background: 'var(--c-bg-2)',
                          color: 'var(--c-text-dim)',
                          border: '1px solid var(--c-border)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card3D>
            ))}
          </div>

          {/* ── Column 2: Sakani Group Showcase 3D Card with Conglomerate Sectors ── */}
          <Card3D 
            className="glass-card glass-card--amber border-beam-card"
            maxTilt={4}
            scale={1.008}
            style={{
              padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 'var(--r-xl)',
              border: '1px solid var(--c-border-light)',
              boxShadow: '0 25px 60px -15px rgba(217, 119, 6, 0.2)'
            }}
          >
            {/* Background 3D Holographic Orbit Gyroscope */}
            <div style={{
              position: 'absolute',
              top: '-15%',
              insetInlineEnd: '-15%',
              width: '280px',
              height: '280px',
              pointerEvents: 'none',
              opacity: 0.16,
              transform: 'perspective(600px) rotateX(60deg) rotateZ(20deg)',
              transformStyle: 'preserve-3d'
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                border: '2px dashed var(--c-amber)',
                borderRadius: '50%',
                animation: 'spinOrbit 20s linear infinite'
              }} />
              <div style={{
                position: 'absolute', inset: '18%',
                border: '1px solid var(--c-teal)',
                borderRadius: '50%',
                animation: 'spinOrbit 14s linear infinite reverse'
              }} />
              <div style={{
                position: 'absolute', inset: '38%',
                border: '2px dotted var(--c-indigo)',
                borderRadius: '50%',
                animation: 'spinOrbit 8s linear infinite'
              }} />
            </div>

            <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(25px)' }}>
              {/* Sakani Group Badge */}
              <div className="pill pill--amber" style={{ marginBlockEnd: '1.5rem', transform: 'translateZ(30px)' }}>
                <Shield size={14} />
                <span>SAKANI AL MATHALI GROUP</span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)',
                color: 'var(--c-text)',
                fontWeight: 900,
                lineHeight: 1.25,
                marginBlockEnd: '1rem',
                transform: 'translateZ(25px)'
              }}>
                {isRTL
                  ? 'الذراع التقني المتخصص لمجموعة سكني المثالي'
                  : 'The Dedicated Tech Arm of Sakani Al Mathali Group'}
              </h3>

              {/* Description */}
              <p style={{
                color: 'var(--c-text-muted)',
                fontSize: '0.96rem',
                lineHeight: 1.8,
                marginBlockEnd: '1.75rem',
                transform: 'translateZ(15px)'
              }}>
                {t.about.parentRelationDesc || t.about.description}
              </p>

              {/* Conglomerate 4 Strategic Sectors Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                marginBlockEnd: '1.75rem',
                transform: 'translateZ(20px)'
              }}>
                {CONGLOMERATE_SECTORS.map((sec, sIdx) => {
                  const SecIcon = sec.icon;
                  return (
                    <div
                      key={sIdx}
                      style={{
                        padding: '0.75rem 0.85rem',
                        borderRadius: 'var(--r-sm)',
                        background: 'var(--c-bg-2)',
                        border: '1px solid var(--c-border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                      }}
                    >
                      <SecIcon size={16} style={{ color: sec.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--c-text)', lineHeight: 1.3 }}>
                        {isRTL ? sec.titleAr : sec.titleEn}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Checklist with Elevated 3D Tokens */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBlockEnd: '2rem', transform: 'translateZ(22px)' }}>
                {CHECKLIST.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="icon-box icon-box--sm icon-box--teal" style={{ width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0 }}>
                      <CheckCircle2 size={13} />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--c-text)' }}>
                      {isRTL ? item.ar : item.en}
                    </span>
                  </div>
                ))}
              </div>

              {/* Direct Portal CTA */}
              <div style={{ marginBlockEnd: '1.5rem', transform: 'translateZ(24px)' }}>
                <a
                  href="https://sakaniltd.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    minHeight: '44px',
                    padding: '0.55rem 1.35rem',
                    border: '1px solid rgba(217, 119, 6, 0.4)',
                    color: 'var(--c-amber-warm)',
                    background: 'rgba(217, 119, 6, 0.08)',
                    textDecoration: 'none',
                    borderRadius: 'var(--r-sm)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(217, 119, 6, 0.16)';
                    e.currentTarget.style.borderColor = 'var(--c-amber)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(217, 119, 6, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(217, 119, 6, 0.4)';
                  }}
                >
                  <span>{isRTL ? 'زيارة البوابة الرسمية للمجموعة (sakaniltd.com)' : 'Visit Sakani Group Portal (sakaniltd.com)'}</span>
                  <ExternalLink size={15} />
                </a>
              </div>

              {/* Bottom Divider Footer with 3D Pop */}
              <div style={{
                paddingBlockStart: '1.25rem',
                borderTop: '1px solid var(--c-border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
                transform: 'translateZ(20px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Zap size={14} style={{ color: 'var(--c-teal)' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--c-indigo)', letterSpacing: '1px' }}>
                    MATHALIX DIGITAL SOLUTIONS
                  </span>
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--c-amber)', letterSpacing: '0.5px' }}>
                  SAKANI AL MATHALI GROUP
                </span>
              </div>
            </div>
          </Card3D>

        </div>
      </div>
    </section>
  );
};
