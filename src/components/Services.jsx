import React, { useState } from 'react';
import { siteConfig } from '../data/config';
import { ServiceModal } from './ServiceModal';
import { Card3D } from './Card3D';
import {
  Smartphone, Globe, Server, Palette, Cloud, Cpu, Layers, ShieldCheck,
  ArrowLeft, ArrowRight, Code2, Sparkles
} from 'lucide-react';

const ACCENT_SETS = [
  { grad: 'linear-gradient(135deg,var(--c-indigo),var(--c-teal))', color: 'var(--c-indigo)', boxClass: 'icon-box--indigo' },
  { grad: 'linear-gradient(135deg,var(--c-teal),var(--c-indigo))',  color: 'var(--c-teal)',   boxClass: 'icon-box--teal'   },
  { grad: 'linear-gradient(135deg,var(--c-amber),var(--c-rose))',  color: 'var(--c-amber)',  boxClass: 'icon-box--amber'  },
  { grad: 'linear-gradient(135deg,var(--c-rose),var(--c-violet))',  color: 'var(--c-rose)',   boxClass: 'icon-box--rose'   },
  { grad: 'linear-gradient(135deg,var(--c-violet),var(--c-indigo))', color: 'var(--c-violet)', boxClass: 'icon-box--violet' },
  { grad: 'linear-gradient(135deg,var(--c-teal),var(--c-amber))',   color: 'var(--c-teal)',   boxClass: 'icon-box--teal'   },
  { grad: 'linear-gradient(135deg,var(--c-indigo),var(--c-amber))', color: 'var(--c-indigo)', boxClass: 'icon-box--indigo' },
];

const SERVICE_TECH_TAGS = {
  'mobile-apps': ['Flutter', 'Swift', 'React Native', 'iOS & Android'],
  'web-dev': ['Next.js', 'React', 'TypeScript', 'SEO 100%'],
  'platforms': ['Microservices', 'Distributed ERP', 'Multi-Tenant', 'Kubernetes'],
  'ui-ux': ['Design Systems', 'Figma Pro', 'Frictionless UX', 'WCAG 2.2 AA'],
  'cloud-solutions': ['AWS & Azure', 'Docker', 'Automated CI/CD', '99.99% SLA'],
  'custom-software': ['Applied AI', 'LLM Agents', 'Automation', 'Python / Go'],
  'api-integration': ['ZATCA Phase 2', 'Payment Gateways', 'REST / GraphQL', 'WebSockets'],
};

export const Services = ({ t, currentLang }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const isRTL = currentLang === 'ar';

  const categories = [
    { id: 'all', labelAr: 'جميع الحلول', labelEn: 'All Solutions' },
    { id: 'apps', labelAr: 'التطبيقات والويب', labelEn: 'Apps & Web' },
    { id: 'enterprise', labelAr: 'المنصات والسحابة', labelEn: 'Enterprise & Cloud' },
    { id: 'ai', labelAr: 'الذكاء الاصطناعي والتكامل', labelEn: 'AI & Integrations' },
  ];

  const getFilteredServices = () => {
    if (activeCategory === 'apps') {
      return siteConfig.services.filter(s => s.id === 'mobile-apps' || s.id === 'web-dev' || s.id === 'ui-ux');
    }
    if (activeCategory === 'enterprise') {
      return siteConfig.services.filter(s => s.id === 'platforms' || s.id === 'cloud-solutions');
    }
    if (activeCategory === 'ai') {
      return siteConfig.services.filter(s => s.id === 'custom-software' || s.id === 'api-integration');
    }
    return siteConfig.services;
  };

  const filteredServices = getFilteredServices();

  const getIcon = (iconName) => {
    const size = 26;
    switch (iconName) {
      case 'Smartphone':  return <Smartphone size={size} />;
      case 'Globe':       return <Globe size={size} />;
      case 'Server':      return <Server size={size} />;
      case 'Palette':     return <Palette size={size} />;
      case 'Cloud':       return <Cloud size={size} />;
      case 'Cpu':         return <Cpu size={size} />;
      case 'Layers':      return <Layers size={size} />;
      case 'ShieldCheck': return <ShieldCheck size={size} />;
      default:            return <Code2 size={size} />;
    }
  };

  return (
    <section id="services" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient Glows */}
      <div className="glow-orb glow-indigo animate-pulse-glow" style={{ top: '20%', insetInlineEnd: '-8%', width: '520px', height: '520px' }} />
      <div className="glow-orb glow-rose" style={{ bottom: '10%', insetInlineStart: '5%', width: '360px', height: '360px', opacity: 0.12 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBlockEnd: 'clamp(2.5rem, 4vw, 4rem)' }}>
          <div className="badge-tag">
            <Cpu size={15} />
            <span>{t.services.badge}</span>
          </div>
          <h2 className="section-title text-balance" style={{ maxWidth: '820px', marginInline: 'auto' }}>
            <span className="grad-text-brand">{isRTL ? 'منظومات هندسية متكاملة ' : 'Mission-Critical Engineering '}</span>
            {isRTL ? 'تصنع الفارق الحقيقي وتقود التوسع' : 'Designed to Dominate and Scale'}
          </h2>
          <p className="section-description text-balance" style={{ marginInline: 'auto' }}>
            {t.services.subtitle}
          </p>

          {/* Interactive Category Filter Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBlockStart: '1.5rem',
            flexWrap: 'wrap'
          }}>
            {categories.map(cat => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`glass-tab-btn ${isActive ? 'active' : ''}`}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <Sparkles size={13} style={{ opacity: isActive ? 1 : 0.6, flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'nowrap' }}>{isRTL ? cat.labelAr : cat.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid with 3D Spotlight Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.25rem)'
        }}>
          {filteredServices.map((service, i) => {
            const acc = ACCENT_SETS[i % ACCENT_SETS.length];
            const tags = SERVICE_TECH_TAGS[service.id] || ['Enterprise', 'Cloud-Ready'];
            return (
              <Card3D
                key={service.id}
                className="glass-card spotlight-card"
                maxTilt={5}
                scale={1.015}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: 'clamp(1.65rem, 3vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--r-lg)',
                  border: '1px solid var(--c-border-light)',
                  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.4)',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedService(service)}
                role="button"
                tabIndex={0}
                aria-label={isRTL ? `عرض تفاصيل خدمة ${service.titleAr}` : `View details for ${service.titleEn}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedService(service);
                  }
                }}
              >
                {/* Top Accent Gradient Bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '3px', background: acc.grad
                }} />

                {/* 3D Popping Number Badge */}
                <div style={{
                  position: 'absolute', top: '1.25rem',
                  insetInlineEnd: '1.25rem',
                  fontSize: '0.82rem', fontWeight: 900,
                  color: acc.color,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '1px',
                  transform: 'translateZ(25px)',
                  transition: 'transform 0.2s ease'
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
                  {/* 3D Floating Icon Box */}
                  <div
                    className={`icon-box icon-box--lg ${acc.boxClass}`}
                    style={{
                      marginBlockEnd: '1.5rem',
                      transform: 'translateZ(35px)',
                      transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.3)'
                    }}
                  >
                    {getIcon(service.icon)}
                  </div>

                  {/* 3D Elevated Title */}
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--c-text)',
                    marginBlockEnd: '0.75rem',
                    lineHeight: 1.3,
                    transform: 'translateZ(24px)'
                  }}>
                    {isRTL ? service.titleAr : service.titleEn}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.94rem',
                    color: 'var(--c-text-muted)',
                    lineHeight: 1.75,
                    marginBlockEnd: '1.5rem',
                    transform: 'translateZ(15px)'
                  }}>
                    {isRTL ? service.descAr : service.descEn}
                  </p>

                  {/* Tech Stack Chips on the Card */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBlockEnd: '1.75rem', transform: 'translateZ(20px)' }}>
                    {tags.map((tItem, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '4px',
                          background: 'var(--c-bg-2)',
                          color: 'var(--c-text-dim)',
                          border: '1px solid var(--c-border)'
                        }}
                      >
                        {tItem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3D Interactive Learn More Button */}
                <div style={{ transform: 'translateZ(30px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--c-border-light)', paddingBlockStart: '1rem' }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedService(service); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: acc.color,
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      padding: 0,
                      minHeight: '38px',
                      transition: 'gap 0.2s ease, transform 0.2s ease',
                      fontFamily: 'inherit'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.gap = '0.75rem'; }}
                    onMouseLeave={e => { e.currentTarget.style.gap = '0.5rem'; }}
                  >
                    <span>{t.services.learnMore}</span>
                    {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                  </button>

                  <span style={{ fontSize: '0.74rem', color: 'var(--c-text-ghost)', fontFamily: 'var(--font-mono)' }}>
                    ENTERPRISE READY
                  </span>
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          currentLang={currentLang}
          onClose={() => setSelectedService(null)}
          t={t}
        />
      )}
    </section>
  );
};
