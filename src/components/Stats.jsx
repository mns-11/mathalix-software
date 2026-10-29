import React, { useEffect, useRef, useState } from 'react';
import { Card3D } from './Card3D';
import { siteConfig } from '../data/config';
import { TrendingUp, Award, CheckCircle, Users, Star, Quote, Building2 } from 'lucide-react';

const ICON_MAP = {
  CheckCircle: { el: <CheckCircle size={28} />, color: 'var(--c-teal)',        boxClass: 'icon-box--teal'   },
  Users:       { el: <Users       size={28} />, color: 'var(--c-indigo)',       boxClass: 'icon-box--indigo' },
  Award:       { el: <Award       size={28} />, color: 'var(--c-amber)',        boxClass: 'icon-box--amber'  },
  Star:        { el: <Star        size={28} />, color: 'var(--c-rose)',         boxClass: 'icon-box--rose'   },
  TrendingUp:  { el: <TrendingUp  size={28} />, color: 'var(--c-teal)',         boxClass: 'icon-box--teal'   },
};

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);
  const observed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true;
          const numStr = String(value).replace(/[^0-9.]/g, '');
          const suffix = String(value).replace(/[0-9.]/g, '');
          const num = parseFloat(numStr);
          if (isNaN(num)) { setDisplay(value); return; }
          const duration = 1800;
          const step = 16;
          const steps = duration / step;
          let count = 0;
          const timer = setInterval(() => {
            count++;
            const progress = count / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * num);
            setDisplay(current + suffix);
            if (count >= steps) { setDisplay(value); clearInterval(timer); }
          }, step);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export const Stats = ({ t, currentLang }) => {
  const isRTL = currentLang === 'ar';

  const testimonials = [
    {
      quoteAr: "مثالي إكس لم تكن مجرد شريك برمجي، بل المحرك الاستراتيجي الذي نقل منظومة Here We Go إلى ريادة السوق. صمموا معمارية تتحمل ضغط آلاف أولياء الأمور والمدربين يومياً بربط لحظي مع زاتكا وتتبع الأسطول بدون ثانية توقف واحدة.",
      quoteEn: "MATHALIX is not just a software partner, but the strategic growth engine that propelled Here We Go to market leadership. They engineered an architecture serving thousands daily with zero downtime, instant ZATCA clearance, and flawless fleet telemetry.",
      authorAr: "الإدارة التشغيلية — منظومة Here We Go الرياضية",
      authorEn: "Executive Operations — Here We Go Cloud Ecosystem",
      tag: "SAAS FLAGSHIP"
    },
    {
      quoteAr: "الاستقرار السيادي والعمق المعماري الذي تقدمه مثالي إكس جعل منها الذراع التكنولوجي الموثوق لمجموعتنا؛ برمجياتهم تنبض بالفخامة وتخدم قطاعاتنا الحيوية بأعلى كفاءة استثمارية رأيناها.",
      quoteEn: "The sovereign stability and architectural depth MATHALIX delivers made them the undisputed technology backbone of our group; their software combines enterprise luxury with maximized operational ROI.",
      authorAr: "مجلس الإدارة — مجموعة سكني المثالي",
      authorEn: "Board of Directors — Sakani Al Mathali Group",
      tag: "ENTERPRISE CONGLOMERATE"
    }
  ];

  return (
    <section id="stats" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="glow-orb glow-indigo animate-pulse-glow" style={{ top: '10%', insetInlineEnd: '-8%', width: '480px', height: '480px', opacity: 0.15 }} />
      <div className="glow-orb glow-teal" style={{ bottom: '5%', insetInlineStart: '-5%', width: '380px', height: '380px', opacity: 0.12 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBlockEnd: 'clamp(3rem,5vw,5rem)' }}>
          <div className="badge-tag">
            <TrendingUp size={15} />
            <span>{t.stats.badge}</span>
          </div>
          <h2 className="section-title text-balance" style={{ maxWidth: '820px', marginInline: 'auto' }}>
            {isRTL
              ? t.stats.title
              : <><span className="grad-text-indigo">Metrics </span>of Impact & Trust</>
            }
          </h2>
          <p className="section-description text-balance" style={{ marginInline: 'auto' }}>
            {t.stats.subtitle}
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,220px),1fr))',
          gap: 'clamp(1.25rem,2.5vw,2rem)',
          marginBlockEnd: 'clamp(3rem, 5vw, 4.5rem)'
        }}>
          {siteConfig.statistics.map((stat, i) => {
            const meta = ICON_MAP[stat.icon] || ICON_MAP['TrendingUp'];
            return (
              <Card3D
                key={i}
                className="glass-card spotlight-card"
                maxTilt={5}
                scale={1.015}
                style={{
                  padding: 'clamp(1.75rem,3.5vw,2.75rem) 1.5rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 'var(--r-lg)',
                  border: '1px solid var(--c-border-light)',
                  boxShadow: '0 20px 45px -15px rgba(0,0,0,0.4)',
                  cursor: 'pointer'
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  width: '60px', height: '3px',
                  background: meta.color,
                  borderRadius: '0 0 3px 3px'
                }} />

                {/* 3D Holographic Ring behind Icon */}
                <div style={{ position: 'relative', transform: 'translateZ(30px)' }}>
                  <div
                    style={{
                      position: 'absolute',
                      inset: '-10px',
                      borderRadius: '50%',
                      border: `1px dashed ${meta.color}`,
                      opacity: 0.45,
                      animation: 'spinOrbit 12s linear infinite'
                    }}
                  />
                  <div className={`icon-box icon-box--lg ${meta.boxClass}`} style={{ boxShadow: `0 8px 24px ${meta.color}33` }}>
                    {meta.el}
                  </div>
                </div>

                {/* Number with 3D Pop */}
                <div 
                  className="grad-text-brand"
                  style={{
                    fontSize: 'clamp(2.4rem,4vw,3.2rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    fontFamily: 'var(--font-en)',
                    transform: 'translateZ(35px)',
                    filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.2))'
                  }}
                >
                  <AnimatedNumber value={stat.value} />
                </div>

                {/* Label */}
                <p style={{
                  fontSize: '0.975rem',
                  color: 'var(--c-text)',
                  fontWeight: 700,
                  lineHeight: 1.4,
                  transform: 'translateZ(20px)'
                }}>
                  {isRTL ? stat.labelAr : stat.labelEn}
                </p>
              </Card3D>
            );
          })}
        </div>

        {/* Verifiable Executive Testimonials Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: '1.75rem'
        }}>
          {testimonials.map((tItem, tIdx) => (
            <Card3D
              key={tIdx}
              className="glass-card spotlight-card"
              maxTilt={4}
              scale={1.01}
              style={{
                padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                borderRadius: 'var(--r-lg)',
                border: '1px solid var(--c-border-light)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlockEnd: '1.25rem' }}>
                  <Quote size={28} style={{ color: 'var(--c-indigo)', opacity: 0.7 }} />
                  <span className="pill pill--teal" style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                    {tItem.tag}
                  </span>
                </div>

                <p style={{
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: 'var(--c-text)',
                  fontStyle: 'italic',
                  marginBlockEnd: '1.5rem'
                }}>
                  "{isRTL ? tItem.quoteAr : tItem.quoteEn}"
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderTop: '1px solid var(--c-border-light)',
                paddingBlockStart: '1rem'
              }}>
                <div className="icon-box icon-box--sm icon-box--amber" style={{ width: '32px', height: '32px', borderRadius: '50%' }}>
                  <Building2 size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--c-text)' }}>
                    {isRTL ? tItem.authorAr : tItem.authorEn}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--c-text-ghost)' }}>
                    {isRTL ? 'شريك استراتيجي معتمد' : 'Verified Enterprise Partner'}
                  </div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

      </div>
    </section>
  );
};
