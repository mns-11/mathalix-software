import React, { useEffect, useRef } from 'react';
import { X, CheckCircle2, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export const ProjectModal = ({ project, onClose, t, currentLang }) => {
  const modalRef = useRef(null);
  const isRTL = currentLang === 'ar';

  // Body scroll lock & Escape key handling
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 3vw, 2rem)',
        background: 'rgba(3, 7, 18, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '88dvh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          background: 'var(--c-surface)',
          border: '1px solid var(--c-border-light)',
          borderRadius: 'var(--r-lg)',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          padding: 0,
          color: 'var(--c-text)',
          outline: 'none'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            insetInlineEnd: '1rem',
            background: 'var(--c-bg-2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--c-border-light)',
            color: 'var(--c-text)',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 30,
            transition: 'all 0.2s ease'
          }}
          aria-label={t.services.closeModal || "Close modal"}
        >
          <X size={20} />
        </button>

        {/* Modal Header Banner with Logo */}
        <div
          style={{
            height: '180px',
            width: '100%',
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(13, 148, 136, 0.15) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid var(--c-border-light)',
            padding: '1.5rem'
          }}
        >
          <img
            src={project.logo}
            alt={isRTL ? project.titleAr : project.titleEn}
            style={{
              maxHeight: '120px',
              maxWidth: '80%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))'
            }}
          />
        </div>

        {/* Modal Body */}
        <div style={{ padding: 'clamp(1.25rem, 3vw, 2.25rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBlockEnd: '0.5rem' }}>
            <span className="pill pill--teal">
              {isRTL ? project.categoryAr : project.categoryEn}
            </span>
            {project.featured && (
              <span className="pill pill--amber" style={{ fontSize: '0.75rem' }}>
                {t.projects.flagshipBadge}
              </span>
            )}
          </div>

          <h3
            id="project-modal-title"
            style={{
              fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
              color: 'var(--c-text)',
              marginBlockEnd: '1rem',
              lineHeight: 1.3,
              fontWeight: 800
            }}
          >
            {isRTL ? project.titleAr : project.titleEn}
          </h3>

          <p style={{ color: 'var(--c-text-muted)', fontSize: '0.98rem', lineHeight: 1.75, marginBlockEnd: '1.5rem' }}>
            {isRTL ? project.descAr : project.descEn}
          </p>

          {/* Features List */}
          {project.featuresAr && (
            <div
              style={{
                background: 'var(--c-bg-1)',
                padding: '1.25rem',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--c-border-light)',
                marginBlockEnd: '1.5rem'
              }}
            >
              <h4 style={{ fontSize: '0.95rem', color: 'var(--c-amber-warm)', marginBlockEnd: '0.85rem', fontWeight: 700 }}>
                {isRTL ? 'الوظائف والخصائص الأساسية للمشروع:' : 'Core Platform Capabilities:'}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {(isRTL ? project.featuresAr : project.featuresEn).map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--c-text)', lineHeight: 1.5 }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--c-teal)', flexShrink: 0, marginTop: '3px' }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div style={{ marginBlockEnd: '1.75rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--c-text)', marginBlockEnd: '0.75rem', fontWeight: 700 }}>
              {isRTL ? 'التقنيات المستخدمة:' : 'Technologies Used:'}
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.tech.map((tItem, i) => (
                <span key={i} className="pill pill--indigo" style={{ fontSize: '0.78rem' }}>
                  {tItem}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.85rem',
              borderTop: '1px solid var(--c-border-light)',
              paddingBlockStart: '1.25rem',
              flexWrap: 'wrap'
            }}
          >
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  minHeight: '44px',
                  background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                  boxShadow: '0 6px 18px rgba(16,185,129,0.3)'
                }}
              >
                <span>{isRTL ? 'زيارة المنصة الحية ↗' : 'Visit Live Platform ↗'}</span>
                <ExternalLink size={16} />
              </a>
            )}
            <button onClick={onClose} className="btn btn-secondary" style={{ minHeight: '44px' }}>
              {t.services.closeModal}
            </button>
            <a href="#contact" onClick={onClose} className="btn btn-primary" style={{ minHeight: '44px' }}>
              <span>{t.nav.startProject}</span>
              {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
