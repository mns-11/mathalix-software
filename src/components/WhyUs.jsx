import React from 'react';
import { Card3D } from './Card3D';
import { ShieldCheck, Sparkles, Zap, Clock, Code, Star, CheckCircle2, Cpu, Activity, Layout } from 'lucide-react';

export const WhyUs = ({ t, currentLang }) => {
  const isRTL = currentLang === 'ar';

  return (
    <section id="why-us" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="glow-orb glow-amber animate-pulse-glow" style={{ bottom: '0%', insetInlineStart: '5%', width: '480px', height: '480px', opacity: 0.18 }} />
      <div className="glow-orb glow-violet" style={{ top: '10%', insetInlineEnd: '-8%', width: '400px', height: '400px', opacity: 0.15 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBlockEnd: 'clamp(3rem, 5vw, 5rem)' }}>
          <div className="badge-tag">
            <Sparkles size={15} />
            <span>{t.whyUs.badge}</span>
          </div>
          <h2 className="section-title text-balance" style={{ maxWidth: '820px', marginInline: 'auto' }}>
            {isRTL
              ? t.whyUs.title
              : <><span className="grad-text-gold">Unrivaled Value </span>That Sets Us Apart in Tech</>
            }
          </h2>
          <p className="section-description text-balance" style={{ marginInline: 'auto' }}>
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="bento-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.25rem, 2.5vw, 2rem)'
          }}
        >
          {/* 1. Featured Wide 3D Card: Engineering Quality & Zero-Vuln Architecture */}
          <Card3D
            className="glass-card glass-card--indigo bento-main spotlight-card"
            maxTilt={4}
            scale={1.01}
            style={{
              gridColumn: 'span 2',
              padding: 'clamp(1.75rem,3.5vw,2.75rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--c-border-light)',
              boxShadow: '0 30px 60px -15px rgba(80,70,228,0.35)'
            }}
          >
            {/* Decorative background glow */}
            <div style={{
              position: 'absolute', top: '-30%', insetInlineEnd: '-10%',
              width: '280px', height: '280px',
              background: 'radial-gradient(circle, rgba(80,70,228,0.25) 0%, transparent 70%)',
              pointerEvents: 'none', zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(25px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlockEnd: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div className="icon-box icon-box--lg icon-box--indigo" style={{
                  boxShadow: '0 12px 30px rgba(80,70,228,0.4)',
                  transform: 'translateZ(35px)'
                }}>
                  <Code size={28} />
                </div>

                {/* Live Engineering Audit Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--r-full)',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  color: '#10B981',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)'
                }}>
                  <span className="live-signal-dot" style={{ width: 6, height: 6 }} />
                  <span>{isRTL ? 'معتمد ISO-27001 كود آمن 100%' : '100% HARDENED CLEAN CODE'}</span>
                </div>
              </div>

              <h3 style={{ fontSize: 'clamp(1.35rem,2.5vw,1.8rem)', color: 'var(--c-text)', fontWeight: 800, marginBlockEnd: '1rem', letterSpacing: '-0.02em' }}>
                {t.whyUs.card1Title}
              </h3>
              <p style={{ color: 'var(--c-text-muted)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '640px', marginBlockEnd: '1.5rem' }}>
                {t.whyUs.card1Desc}
              </p>
            </div>

            {/* Micro Feature Indicators */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', position: 'relative', zIndex: 1, transform: 'translateZ(20px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: 'var(--c-teal-light)', fontWeight: 700, fontSize: '0.86rem' }}>
                <ShieldCheck size={18} />
                <span>{isRTL ? 'أمان سيبراني خالٍ من الثغرات' : 'Zero-Vulnerability Architecture'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: 'var(--c-amber-warm)', fontWeight: 700, fontSize: '0.86rem' }}>
                <Zap size={18} />
                <span>{isRTL ? 'تحمل ضغط وتزامن فائق' : 'High-Concurrency Concurrency'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: 'var(--c-indigo-light)', fontWeight: 700, fontSize: '0.86rem' }}>
                <Cpu size={18} />
                <span>{isRTL ? 'اختبارات آلية شاملة CI/CD' : 'Comprehensive Automated Testing'}</span>
              </div>
            </div>
          </Card3D>

          {/* 2. Bento Card: UI/UX Excellence */}
          <Card3D
            className="glass-card glass-card--teal spotlight-card"
            maxTilt={5}
            scale={1.015}
            style={{
              padding: 'clamp(1.5rem,3vw,2.25rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--c-border-light)'
            }}
          >
            <div>
              <div className="icon-box icon-box--md icon-box--teal" style={{ marginBlockEnd: '1.25rem', transform: 'translateZ(30px)' }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--c-text)', fontWeight: 800, lineHeight: 1.3, marginBlockEnd: '0.75rem', transform: 'translateZ(20px)' }}>
                {t.whyUs.card2Title}
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--c-text-muted)', lineHeight: 1.75, transform: 'translateZ(12px)' }}>
                {t.whyUs.card2Desc}
              </p>
            </div>

            <div style={{ marginBlockStart: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transform: 'translateZ(18px)' }}>
              <Layout size={15} style={{ color: 'var(--c-teal)' }} />
              <span style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--c-teal)' }}>
                {isRTL ? 'معايير WCAG 2.2 وتجربة 60-120fps' : 'WCAG 2.2 AA & 60-120fps Fluid'}
              </span>
            </div>
          </Card3D>

          {/* 3. Bento Card: Infinite Scalability */}
          <Card3D
            className="glass-card spotlight-card"
            maxTilt={5}
            scale={1.015}
            style={{
              padding: 'clamp(1.5rem,3vw,2.25rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--c-border-light)'
            }}
          >
            <div>
              <div className="icon-box icon-box--md icon-box--amber" style={{ marginBlockEnd: '1.25rem', transform: 'translateZ(30px)' }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--c-text)', fontWeight: 800, lineHeight: 1.3, marginBlockEnd: '0.75rem', transform: 'translateZ(20px)' }}>
                {t.whyUs.card3Title}
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--c-text-muted)', lineHeight: 1.75, transform: 'translateZ(12px)' }}>
                {t.whyUs.card3Desc}
              </p>
            </div>

            <div style={{ marginBlockStart: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transform: 'translateZ(18px)' }}>
              <Activity size={15} style={{ color: 'var(--c-amber)' }} />
              <span style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--c-amber)' }}>
                {isRTL ? 'توسع تلقائي 1x إلى 64x Pods' : 'Auto-Scale 1x → 64x Cluster'}
              </span>
            </div>
          </Card3D>

          {/* 4. Bento Card: Transparency & On-Time SLA */}
          <Card3D
            className="glass-card glass-card--rose spotlight-card"
            maxTilt={5}
            scale={1.015}
            style={{
              padding: 'clamp(1.5rem,3vw,2.25rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--c-border-light)'
            }}
          >
            <div>
              <div className="icon-box icon-box--md icon-box--rose" style={{ marginBlockEnd: '1.25rem', transform: 'translateZ(30px)' }}>
                <Clock size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--c-text)', fontWeight: 800, lineHeight: 1.3, marginBlockEnd: '0.75rem', transform: 'translateZ(20px)' }}>
                {t.whyUs.card4Title}
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--c-text-muted)', lineHeight: 1.75, transform: 'translateZ(12px)' }}>
                {t.whyUs.card4Desc}
              </p>
            </div>

            <div style={{ marginBlockStart: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transform: 'translateZ(18px)' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--c-rose)' }} />
              <span style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--c-rose)' }}>
                {isRTL ? 'تسليم دقيق حسب الخطة الزمنية 100%' : '100% On-Time Sprint Milestones'}
              </span>
            </div>
          </Card3D>

          {/* 5. Bento Card: 100% Tailored, Zero Generic Templates */}
          <Card3D
            className="glass-card glass-card--violet spotlight-card"
            maxTilt={5}
            scale={1.015}
            style={{
              padding: 'clamp(1.5rem,3vw,2.25rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--c-border-light)'
            }}
          >
            <div>
              <div className="icon-box icon-box--md icon-box--violet" style={{ marginBlockEnd: '1.25rem', transform: 'translateZ(30px)' }}>
                <Star size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--c-text)', fontWeight: 800, lineHeight: 1.3, marginBlockEnd: '0.75rem', transform: 'translateZ(20px)' }}>
                {t.whyUs.card5Title}
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--c-text-muted)', lineHeight: 1.75, transform: 'translateZ(12px)' }}>
                {t.whyUs.card5Desc}
              </p>
            </div>

            <div style={{ marginBlockStart: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transform: 'translateZ(18px)' }}>
              <Sparkles size={15} style={{ color: 'var(--c-violet)' }} />
              <span style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--c-violet)' }}>
                {isRTL ? 'كود مفصّل خصيصاً بدون قوالب جاهزة' : '100% Bespoke Codebase'}
              </span>
            </div>
          </Card3D>
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) {
          .bento-main { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
};
