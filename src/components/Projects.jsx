import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/config';
import { ProjectModal } from './ProjectModal';
import {
  Trophy, ExternalLink, ShieldCheck, Compass, QrCode, Users,
  Sparkles, Layers, Eye, Globe, Building2, Maximize2, X
} from 'lucide-react';

export const Projects = ({ t, currentLang }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hwgPreviewIndex, setHwgPreviewIndex] = useState(0);
  const [sakaniPreviewIndex, setSakaniPreviewIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  const isRTL = currentLang === 'ar';
  const allProjects = siteConfig.projects || [];
  const herewegoProject = allProjects.find(p => p.id === 1) || allProjects[0];
  const sakaniProject = allProjects.find(p => p.id === 2);

  // Lightbox keyboard dismissal
  useEffect(() => {
    if (!lightboxImage) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  // Filter tabs definition
  const filterTabs = [
    { key: 'all', label: t.projects.filterAll, count: allProjects.length },
    { key: 'cloud', label: t.projects.filterCloud, count: allProjects.filter(p => p.categoryKey === 'cloud').length },
    { key: 'web', label: t.projects.filterWeb, count: allProjects.filter(p => p.categoryKey === 'web').length },
  ];

  const hwgScreenshots = herewegoProject?.screenshots || [];
  const currentHwgPreview = hwgScreenshots[hwgPreviewIndex] || hwgScreenshots[0];

  const sakaniScreenshots = sakaniProject?.screenshots || [
    {
      id: 'portal',
      titleAr: 'البوابة الرقمية الرئيسية',
      titleEn: 'Main Corporate Portal',
      image: sakaniProject?.image || '/showcase/sakani_portal.jpg',
      descAr: 'المنصة الرقمية الموحدة لقطاعات مجموعة سكني المثالي الأربعة'
    }
  ];
  const currentSakaniPreview = sakaniScreenshots[sakaniPreviewIndex] || sakaniScreenshots[0];

  // Core flagship highlight pillars for Here We Go
  const herewegoPillars = [
    {
      icon: ShieldCheck,
      titleAr: 'فوترة معتمدة ZATCA',
      titleEn: 'ZATCA E-Invoicing Phase 2',
      descAr: 'ربط وتكامل مع هيئة الزكاة والضريبة والجمارك',
      descEn: 'Direct clearance with ZATCA tax authority'
    },
    {
      icon: Compass,
      titleAr: 'تتبع حافلات ذكي GPS',
      titleEn: 'Smart Bus Fleet GPS',
      descAr: 'خرائط حية وتنبيهات لحظية لأولياء الأمور',
      descEn: 'Live GPS route tracking and arrival alerts'
    },
    {
      icon: QrCode,
      titleAr: 'تحضير ذكي برمز QR',
      titleEn: 'Contactless QR Attendance',
      descAr: 'مسح فوري للحضور والانصراف بدقة متناهية',
      descEn: 'Instant QR scanning for coaches and athletes'
    },
    {
      icon: Users,
      titleAr: '4 بوابات تشغيلية مخصصة',
      titleEn: '4 Dedicated Roles Hub',
      descAr: 'بوابات للإدارة، المدربين، الأولياء، واللاعبين',
      descEn: 'Portals for Admin, Coaches, Parents, & Players'
    }
  ];

  // Core highlight pillars for Sakani Al Mathali Group
  const sakaniPillars = [
    {
      icon: Layers,
      titleAr: '4 قطاعات متكاملة',
      titleEn: '4 Integrated Sectors',
      descAr: 'مقاولات، عقارات، توريدات، وتقنية',
      descEn: 'Contracting, Real Estate, Supply, Tech'
    },
    {
      icon: Globe,
      titleAr: 'دعم اللغتين (i18n)',
      titleEn: 'Bilingual Architecture',
      descAr: 'تبديل فوري وتجاوب كامل للشاشات',
      descEn: 'Instant toggle & responsive layout'
    },
    {
      icon: Building2,
      titleAr: 'استعراض المشاريع الكبرى',
      titleEn: 'Projects Showcase',
      descAr: 'المشرقية وبوابة الدرعية والحدائق',
      descEn: 'Diriyah & Al-Mashriqia showcase'
    },
    {
      icon: ShieldCheck,
      titleAr: 'تهيئة SEO معتمدة',
      titleEn: 'SEO & Schema.org',
      descAr: 'بيانات هيكلية وسرعة تصفح فائقة',
      descEn: 'Schema.org snippets & blazing speed'
    }
  ];

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient background glows */}
      <div className="glow-orb glow-teal animate-pulse-glow" style={{ top: '15%', insetInlineStart: '-5%', width: '480px', height: '480px' }} />
      <div className="glow-orb glow-indigo" style={{ bottom: '10%', insetInlineEnd: '-5%', width: '420px', height: '420px', opacity: 0.18 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Section Header ── */}
        <div style={{ textAlign: 'center', marginBlockEnd: '2.5rem' }}>
          <div className="badge-tag" style={{ marginInline: 'auto' }}>
            <Trophy size={15} />
            <span>{t.projects.badge}</span>
          </div>

          <h2 className="section-title" style={{ maxWidth: '820px', marginInline: 'auto' }}>
            {t.projects.title}
          </h2>

          <p className="section-description" style={{ marginInline: 'auto', maxWidth: '680px' }}>
            {t.projects.subtitle}
          </p>

          {/* ── Category Filter Tabs ── */}
          <div
            role="tablist"
            aria-label="Project Categories"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.4rem',
              marginBlockStart: '1.5rem',
              padding: '0.35rem',
              borderRadius: '999px',
              background: 'var(--c-bg-1)',
              border: '1px solid var(--c-border-light)'
            }}
          >
            {filterTabs.map(tab => {
              const isActive = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.key)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: isActive ? 'var(--c-teal)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--c-text-muted)',
                    boxShadow: isActive ? '0 4px 14px rgba(13, 148, 136, 0.35)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap' }}>{tab.label}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      opacity: isActive ? 0.9 : 0.65,
                      background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--c-bg-2)',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '999px'
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            PROJECT 1: HERE WE GO (FLAGSHIP CLOUD SAAS ECOSYSTEM)
            ══════════════════════════════════════════════════════════════ */}
        {(activeCategory === 'all' || activeCategory === 'cloud') && herewegoProject && (
          <div
            className="glass-card"
            style={{
              position: 'relative',
              borderRadius: 'var(--r-xl)',
              border: '1px solid var(--c-border-light)',
              padding: 'clamp(1.75rem, 3.5vw, 3rem)',
              boxShadow: 'var(--glass-shadow)',
              marginBlockEnd: '3rem',
              overflow: 'hidden'
            }}
          >
            {/* Top Brand Ambient Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                insetInline: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #0D9488 0%, #4F46E5 50%, #10B981 100%)'
              }}
            />

            {/* Top Bar: Status Badges */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBlockEnd: '2rem',
                paddingBlockEnd: '1.25rem',
                borderBottom: '1px solid var(--c-border-light)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span className="pill pill--teal" style={{ fontSize: '0.78rem', padding: '0.3rem 0.85rem' }}>
                  <Sparkles size={13} />
                  <span>{t.projects.flagshipBadge}</span>
                </span>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#10B981',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(16, 185, 129, 0.25)'
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#10B981',
                      boxShadow: '0 0 10px #10B981',
                      animation: 'pulseGlow 2s infinite'
                    }}
                  />
                  <span>{t.projects.liveInProd}</span>
                </div>
              </div>

              <a
                href={herewegoProject.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--c-text-muted)',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
                title={t.projects.visitLive}
              >
                <Layers size={15} style={{ color: 'var(--c-teal)' }} />
                <span>{isRTL ? 'المملكة العربية السعودية • almalaab.vercel.app' : 'Saudi Arabia • almalaab.vercel.app'}</span>
                <ExternalLink size={12} style={{ color: 'var(--c-teal)' }} />
              </a>
            </div>

            {/* 2-Column Split */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                gap: 'clamp(2rem, 3.5vw, 3.5rem)',
                alignItems: 'center'
              }}
            >
              {/* Column 1: Info & Features */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBlockEnd: '1.25rem' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--r-md)',
                      background: '#070B14',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      boxShadow: '0 10px 24px rgba(0,0,0,0.3)',
                      flexShrink: 0
                    }}
                  >
                    <img
                      src={herewegoProject.logo}
                      alt={isRTL ? herewegoProject.titleAr : herewegoProject.titleEn}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--c-teal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {isRTL ? herewegoProject.categoryAr : herewegoProject.categoryEn}
                    </span>
                    <h3
                      style={{
                        fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                        fontWeight: 900,
                        color: 'var(--c-text)',
                        lineHeight: 1.25,
                        marginBlockStart: '0.2rem'
                      }}
                    >
                      {isRTL ? herewegoProject.titleAr : herewegoProject.titleEn}
                    </h3>
                  </div>
                </div>

                <p
                  style={{
                    color: 'var(--c-text-muted)',
                    fontSize: '0.96rem',
                    lineHeight: 1.75,
                    marginBlockEnd: '1.75rem'
                  }}
                >
                  {isRTL ? herewegoProject.descAr : herewegoProject.descEn}
                </p>

                {/* 4 Feature Pillars (Interactive Cards) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.85rem',
                    marginBlockEnd: '2rem'
                  }}
                >
                  {herewegoPillars.map((p, idx) => {
                    const PillarIcon = p.icon;
                    return (
                      <a
                        key={idx}
                        href={herewegoProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          padding: '0.85rem 1rem',
                          borderRadius: 'var(--r-md)',
                          background: 'var(--c-bg-1)',
                          border: '1px solid var(--c-border-light)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = 'var(--c-teal)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'var(--c-border-light)';
                          e.currentTarget.style.transform = '';
                        }}
                        title={isRTL ? `زيارة المنصة الحية: ${p.titleAr}` : `Visit Live Platform: ${p.titleEn}`}
                      >
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: 'rgba(13, 148, 136, 0.12)',
                            color: 'var(--c-teal)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <PillarIcon size={16} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.35rem', marginBlockEnd: '0.2rem' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--c-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {isRTL ? p.titleAr : p.titleEn}
                            </span>
                            <ExternalLink size={12} style={{ color: 'var(--c-teal)', opacity: 0.7, flexShrink: 0 }} />
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--c-text-ghost)', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {isRTL ? p.descAr : p.descEn}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Tech Chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'nowrap', overflowX: 'auto', paddingBlock: '0.2rem', marginBlockEnd: '2rem' }}>
                  {herewegoProject.tech.map((tItem, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        background: 'var(--c-bg-2)',
                        color: 'var(--c-text)',
                        border: '1px solid var(--c-border)',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}
                    >
                      {tItem}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', position: 'relative', zIndex: 10 }}>
                  <a
                    href={herewegoProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn btn-primary"
                    style={{
                      background: 'linear-gradient(135deg, #0D9488 0%, #10B981 100%)',
                      boxShadow: '0 8px 24px rgba(13, 148, 136, 0.35)',
                      padding: '0.75rem 1.6rem',
                      cursor: 'pointer',
                      textDecoration: 'none'
                    }}
                  >
                    <span>{t.projects.visitLive}</span>
                    <ExternalLink size={16} />
                  </a>

                  <button
                    onClick={() => setSelectedProject(herewegoProject)}
                    className="btn btn-secondary"
                    style={{ padding: '0.75rem 1.4rem' }}
                  >
                    <Eye size={16} />
                    <span>{t.projects.viewProject}</span>
                  </button>
                </div>
              </div>

              {/* Column 2: Interactive macOS Browser Window Preview */}
              <div>
                <div
                  style={{
                    borderRadius: 'var(--r-lg)',
                    overflow: 'hidden',
                    background: '#0B1120',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {/* macOS Title Bar */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      background: '#0F172A',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#EF4444' }} />
                      <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#F59E0B' }} />
                      <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#10B981' }} />
                    </div>

                    <a
                      href={herewegoProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.74rem',
                        color: 'rgba(255, 255, 255, 0.85)',
                        background: 'rgba(255, 255, 255, 0.06)',
                        padding: '0.2rem 1.25rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontFamily: 'monospace',
                        textDecoration: 'none',
                        cursor: 'pointer'
                      }}
                      title={t.projects.visitLive}
                    >
                      <span style={{ color: '#10B981' }}>🔒</span>
                      <span>almalaab.vercel.app</span>
                      <ExternalLink size={10} style={{ opacity: 0.6 }} />
                    </a>

                    <div style={{ width: '40px' }} />
                  </div>

                  {/* Screenshot Switcher Tabs */}
                  {hwgScreenshots.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.5rem 0.75rem',
                        background: '#070B14',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                        overflowX: 'auto'
                      }}
                    >
                      {hwgScreenshots.map((s, idx) => {
                        const isCurrent = hwgPreviewIndex === idx;
                        return (
                          <button
                            key={s.id}
                            onClick={() => setHwgPreviewIndex(idx)}
                            style={{
                              padding: '0.4rem 0.85rem',
                              borderRadius: '6px',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              whiteSpace: 'nowrap',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              background: isCurrent ? 'rgba(13, 148, 136, 0.25)' : 'transparent',
                              color: isCurrent ? '#2DD4BF' : 'rgba(255, 255, 255, 0.6)'
                            }}
                          >
                            {isRTL ? s.titleAr : s.titleEn}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Main Display Frame */}
                  {currentHwgPreview && (
                    <div
                      style={{
                        position: 'relative',
                        aspectRatio: '16 / 10',
                        overflow: 'hidden',
                        background: '#030712',
                        cursor: 'zoom-in'
                      }}
                      onClick={() => setLightboxImage(currentHwgPreview.image)}
                      title={isRTL ? "اضغط لتكبير الصورة بدقة عالية" : "Click to view full resolution snapshot"}
                    >
                      <img
                        key={currentHwgPreview.image}
                        src={currentHwgPreview.image}
                        alt={isRTL ? currentHwgPreview.titleAr : currentHwgPreview.titleEn}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top center',
                          transition: 'opacity 0.3s ease, transform 0.4s ease'
                        }}
                      />

                      {/* Zoom Indicator Icon */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          insetInlineEnd: '1rem',
                          background: 'rgba(3, 7, 18, 0.75)',
                          backdropFilter: 'blur(8px)',
                          padding: '0.4rem 0.65rem',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          border: '1px solid rgba(255, 255, 255, 0.15)'
                        }}
                      >
                        <Maximize2 size={13} />
                        <span>{isRTL ? 'تكبير' : 'Expand'}</span>
                      </div>

                      {/* Bottom Info Bar */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          insetInline: 0,
                          padding: '1.25rem 1rem 0.75rem',
                          background: 'linear-gradient(to top, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.6) 60%, transparent 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          color: '#FFFFFF'
                        }}
                      >
                        <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                          {isRTL ? currentHwgPreview.descAr : currentHwgPreview.titleEn}
                        </div>
                        <div
                          style={{
                            fontSize: '0.72rem',
                            color: '#2DD4BF',
                            fontWeight: 700,
                            flexShrink: 0
                          }}
                        >
                          ● {isRTL ? 'معاينة مباشرة' : 'Live Snapshot'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            PROJECT 2: SAKANI AL MATHALI GROUP (ENTERPRISE CORPORATE PORTAL)
            ══════════════════════════════════════════════════════════════ */}
        {(activeCategory === 'all' || activeCategory === 'web') && sakaniProject && (
          <div
            className="glass-card"
            style={{
              position: 'relative',
              borderRadius: 'var(--r-xl)',
              border: '1px solid var(--c-border-light)',
              padding: 'clamp(1.75rem, 3.5vw, 3rem)',
              boxShadow: 'var(--glass-shadow)',
              overflow: 'hidden'
            }}
          >
            {/* Top Gold/Amber Accent Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                insetInline: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #D97706 0%, #B45309 50%, #E11D48 100%)'
              }}
            />

            {/* Top Bar: Status Badges */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBlockEnd: '2rem',
                paddingBlockEnd: '1.25rem',
                borderBottom: '1px solid var(--c-border-light)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span className="pill pill--amber" style={{ fontSize: '0.78rem', padding: '0.3rem 0.85rem' }}>
                  <Building2 size={13} />
                  <span>{isRTL ? 'صرح وطني معتمد' : 'National Corporate Portal'}</span>
                </span>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#10B981',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(16, 185, 129, 0.25)'
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#10B981',
                      boxShadow: '0 0 10px #10B981',
                      animation: 'pulseGlow 2s infinite'
                    }}
                  />
                  <span>{t.projects.liveInProd}</span>
                </div>
              </div>

              <a
                href={sakaniProject.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--c-text-muted)',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
                title={t.projects.visitLive}
              >
                <Globe size={15} style={{ color: 'var(--c-amber)' }} />
                <span>{isRTL ? 'المملكة العربية السعودية • sakaniltd.com' : 'Saudi Arabia • sakaniltd.com'}</span>
                <ExternalLink size={12} style={{ color: 'var(--c-amber)' }} />
              </a>
            </div>

            {/* 2-Column Split */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                gap: 'clamp(2rem, 3.5vw, 3.5rem)',
                alignItems: 'center'
              }}
            >
              {/* Column 1: Info & Features */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBlockEnd: '1.25rem' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--r-md)',
                      background: '#FFFFFF',
                      border: '1px solid rgba(15, 23, 42, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                      padding: '4px',
                      flexShrink: 0
                    }}
                  >
                    <img
                      src={sakaniProject.logo}
                      alt={isRTL ? sakaniProject.titleAr : sakaniProject.titleEn}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--c-amber)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {isRTL ? sakaniProject.categoryAr : sakaniProject.categoryEn}
                    </span>
                    <h3
                      style={{
                        fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                        fontWeight: 900,
                        color: 'var(--c-text)',
                        lineHeight: 1.25,
                        marginBlockStart: '0.2rem'
                      }}
                    >
                      {isRTL ? sakaniProject.titleAr : sakaniProject.titleEn}
                    </h3>
                  </div>
                </div>

                <p
                  style={{
                    color: 'var(--c-text-muted)',
                    fontSize: '0.96rem',
                    lineHeight: 1.75,
                    marginBlockEnd: '1.75rem'
                  }}
                >
                  {isRTL ? sakaniProject.descAr : sakaniProject.descEn}
                </p>

                {/* 4 Feature Pillars (Interactive Cards) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.85rem',
                    marginBlockEnd: '2rem'
                  }}
                >
                  {sakaniPillars.map((p, idx) => {
                    const PillarIcon = p.icon;
                    return (
                      <a
                        key={idx}
                        href={sakaniProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          padding: '0.85rem 1rem',
                          borderRadius: 'var(--r-md)',
                          background: 'var(--c-bg-1)',
                          border: '1px solid var(--c-border-light)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = 'var(--c-amber)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'var(--c-border-light)';
                          e.currentTarget.style.transform = '';
                        }}
                        title={isRTL ? `زيارة المنصة الحية: ${p.titleAr}` : `Visit Official Portal: ${p.titleEn}`}
                      >
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: 'rgba(217, 119, 6, 0.12)',
                            color: 'var(--c-amber)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <PillarIcon size={16} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.35rem', marginBlockEnd: '0.2rem' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--c-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {isRTL ? p.titleAr : p.titleEn}
                            </span>
                            <ExternalLink size={12} style={{ color: 'var(--c-amber)', opacity: 0.7, flexShrink: 0 }} />
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--c-text-ghost)', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {isRTL ? p.descAr : p.descEn}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Tech Chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'nowrap', overflowX: 'auto', paddingBlock: '0.2rem', marginBlockEnd: '2rem' }}>
                  {sakaniProject.tech.map((tItem, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        background: 'var(--c-bg-2)',
                        color: 'var(--c-text)',
                        border: '1px solid var(--c-border)',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}
                    >
                      {tItem}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', position: 'relative', zIndex: 10 }}>
                  <a
                    href={sakaniProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn btn-primary"
                    style={{
                      background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                      boxShadow: '0 8px 24px rgba(217, 119, 6, 0.35)',
                      padding: '0.75rem 1.6rem',
                      cursor: 'pointer',
                      textDecoration: 'none'
                    }}
                  >
                    <span>{t.projects.visitLive}</span>
                    <ExternalLink size={16} />
                  </a>

                  <button
                    onClick={() => setSelectedProject(sakaniProject)}
                    className="btn btn-secondary"
                    style={{ padding: '0.75rem 1.4rem' }}
                  >
                    <Eye size={16} />
                    <span>{t.projects.viewProject}</span>
                  </button>
                </div>
              </div>

              {/* Column 2: macOS Browser Window Preview with Switcher */}
              <div>
                <div
                  style={{
                    borderRadius: 'var(--r-lg)',
                    overflow: 'hidden',
                    background: '#0B1120',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {/* macOS Title Bar */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      background: '#0F172A',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#EF4444' }} />
                      <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#F59E0B' }} />
                      <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#10B981' }} />
                    </div>

                    <a
                      href={sakaniProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.74rem',
                        color: 'rgba(255, 255, 255, 0.85)',
                        background: 'rgba(255, 255, 255, 0.06)',
                        padding: '0.2rem 1.25rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontFamily: 'monospace',
                        textDecoration: 'none',
                        cursor: 'pointer'
                      }}
                      title={t.projects.visitLive}
                    >
                      <span style={{ color: '#10B981' }}>🔒</span>
                      <span>sakaniltd.com</span>
                      <ExternalLink size={10} style={{ opacity: 0.6 }} />
                    </a>

                    <div style={{ width: '40px' }} />
                  </div>

                  {/* Screenshot Switcher Tabs */}
                  {sakaniScreenshots.length > 1 && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.5rem 0.75rem',
                        background: '#070B14',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                        overflowX: 'auto'
                      }}
                    >
                      {sakaniScreenshots.map((s, idx) => {
                        const isCurrent = sakaniPreviewIndex === idx;
                        return (
                          <button
                            key={s.id}
                            onClick={() => setSakaniPreviewIndex(idx)}
                            style={{
                              padding: '0.4rem 0.85rem',
                              borderRadius: '6px',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              whiteSpace: 'nowrap',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              background: isCurrent ? 'rgba(217, 119, 6, 0.25)' : 'transparent',
                              color: isCurrent ? '#FBBF24' : 'rgba(255, 255, 255, 0.6)'
                            }}
                          >
                            {isRTL ? s.titleAr : s.titleEn}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Main Display Frame */}
                  {currentSakaniPreview && (
                    <div
                      style={{
                        position: 'relative',
                        aspectRatio: '16 / 10',
                        overflow: 'hidden',
                        background: '#030712',
                        cursor: 'zoom-in'
                      }}
                      onClick={() => setLightboxImage(currentSakaniPreview.image)}
                      title={isRTL ? "اضغط لتكبير الصورة بدقة عالية" : "Click to view full resolution snapshot"}
                    >
                      <img
                        key={currentSakaniPreview.image}
                        src={currentSakaniPreview.image}
                        alt={isRTL ? currentSakaniPreview.titleAr : currentSakaniPreview.titleEn}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top center',
                          transition: 'transform 0.4s ease'
                        }}
                      />

                      {/* Zoom Indicator Icon */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          insetInlineEnd: '1rem',
                          background: 'rgba(3, 7, 18, 0.75)',
                          backdropFilter: 'blur(8px)',
                          padding: '0.4rem 0.65rem',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          border: '1px solid rgba(255, 255, 255, 0.15)'
                        }}
                      >
                        <Maximize2 size={13} />
                        <span>{isRTL ? 'تكبير' : 'Expand'}</span>
                      </div>

                      {/* Bottom Info Bar */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          insetInline: 0,
                          padding: '1.25rem 1rem 0.75rem',
                          background: 'linear-gradient(to top, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.6) 60%, transparent 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          color: '#FFFFFF'
                        }}
                      >
                        <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                          {isRTL ? currentSakaniPreview.descAr : currentSakaniPreview.titleEn}
                        </div>
                        <div
                          style={{
                            fontSize: '0.72rem',
                            color: '#F59E0B',
                            fontWeight: 700,
                            flexShrink: 0
                          }}
                        >
                          ● {isRTL ? 'معاينة حية للمنصة' : 'Live Snapshot'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* High-Resolution Screenshot Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(3, 7, 18, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1rem, 4vw, 2.5rem)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <button
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              insetInlineEnd: '1.5rem',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 310,
              transition: 'transform 0.2s ease'
            }}
            aria-label="Close Preview"
          >
            <X size={22} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '1200px',
              maxHeight: '90vh',
              overflow: 'hidden',
              borderRadius: 'var(--r-lg)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: '#0B1120'
            }}
          >
            <img
              src={lightboxImage}
              alt="High Resolution Screenshot Preview"
              style={{
                width: '100%',
                maxHeight: '88vh',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        t={t}
        currentLang={currentLang}
      />
    </section>
  );
};
