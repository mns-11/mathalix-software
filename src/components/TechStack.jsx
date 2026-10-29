import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { siteConfig } from '../data/config';
import { Layers, Code, Server, Smartphone, Cloud, Cpu, Database, Flame, Layout, Box, ShieldCheck, Zap, Globe } from 'lucide-react';

export const TechStack = ({ t, currentLang }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const isRTL = currentLang === 'ar';

  const categories = [
    { id: 'all', label: t.tech.categoryAll },
    { id: 'frontend', label: t.tech.categoryFrontend },
    { id: 'backend', label: t.tech.categoryBackend },
    { id: 'mobile', label: t.tech.categoryMobile },
    { id: 'cloudAI', label: t.tech.categoryCloudAI },
  ];

  const getTechIcon = (iconName) => {
    const size = 22;
    switch (iconName) {
      case 'Smartphone': return <Smartphone size={size} />;
      case 'Code': return <Code size={size} />;
      case 'Globe': return <Layers size={size} />;
      case 'Server': return <Server size={size} />;
      case 'Cpu': return <Cpu size={size} />;
      case 'Database': return <Database size={size} />;
      case 'Flame': return <Flame size={size} />;
      case 'Cloud': return <Cloud size={size} />;
      case 'Layout': return <Layout size={size} />;
      case 'Box': return <Box size={size} />;
      default: return <Code size={size} />;
    }
  };

  const filteredTech = activeCategory === 'all'
    ? siteConfig.technologies
    : siteConfig.technologies.filter(item => item.category === activeCategory);

  return (
    <section id="tech" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="glow-orb glow-teal animate-pulse-glow" style={{ top: '15%', insetInlineStart: '-6%', width: '450px', height: '450px', opacity: 0.14 }} />
      <div className="glow-orb glow-indigo" style={{ bottom: '10%', insetInlineEnd: '-6%', width: '400px', height: '400px', opacity: 0.16 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBlockEnd: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div className="badge-tag">
            <Layers size={16} />
            <span>{t.tech.badge}</span>
          </div>
          <h2 className="section-title text-balance" style={{ maxWidth: '800px', marginInline: 'auto' }}>
            {t.tech.title}
          </h2>
          <p className="section-description text-balance" style={{ marginInline: 'auto' }}>
            {t.tech.subtitle}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div 
          role="tablist"
          aria-label="Technology Stack Categories"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBlockEnd: '3rem',
            flexWrap: 'wrap'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`glass-tab-btn ${isActive ? 'active' : ''}`}
                style={{
                  padding: '0.6rem 1.4rem',
                  fontSize: '0.88rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Tech Grid with Real 3D Interactive Tiles */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 255px), 1fr))',
            gap: '1.25rem',
            marginBlockEnd: '3rem'
          }}
        >
          {filteredTech.map((tech, idx) => (
            <Card3D
              key={idx}
              className="glass-card spotlight-card"
              maxTilt={5}
              scale={1.015}
              style={{
                padding: '1.4rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--c-border-light)',
                background: 'var(--glass-bg)',
                cursor: 'pointer'
              }}
            >
              <div 
                className="icon-box icon-box--md icon-box--teal"
                style={{
                  flexShrink: 0,
                  transform: 'translateZ(26px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.25)'
                }}
              >
                {getTechIcon(tech.iconName)}
              </div>
              <div style={{ transform: 'translateZ(18px)', flex: 1, minWidth: 0 }}>
                <h4 style={{
                  fontSize: '0.98rem',
                  color: 'var(--c-text)',
                  fontWeight: 800,
                  marginBlockEnd: '0.35rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {tech.name}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span
                    className="pill pill--indigo"
                    style={{
                      fontSize: '0.72rem',
                      padding: '0.15rem 0.55rem',
                      whiteSpace: 'nowrap',
                      display: 'inline-block'
                    }}
                  >
                    {tech.badge}
                  </span>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--c-teal)', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
                    ENTERPRISE
                  </span>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        {/* Architecture Pedigree Ribbon */}
        <div style={{
          padding: '1.25rem 2rem',
          borderRadius: 'var(--r-lg)',
          background: 'var(--glass-bg)',
          border: '1px solid var(--c-border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Zap size={18} style={{ color: 'var(--c-teal)' }} />
            <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--c-text)' }}>
              {isRTL ? 'ضمان استجابة برمجية فائقة أقل من 35ms' : 'Sub-35ms API Latency Guarantee'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShieldCheck size={18} style={{ color: 'var(--c-amber)' }} />
            <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--c-text)' }}>
              {isRTL ? 'حصانة أمن سيبراني ومعايير ISO-27001' : 'ISO-27001 & Zero-Trust Certified'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Globe size={18} style={{ color: 'var(--c-indigo)' }} />
            <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--c-text)' }}>
              {isRTL ? 'بنية سحابية ذاتية التوسع بلا انقطاع' : 'Cloud-Native Auto-Scaling Mesh'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
