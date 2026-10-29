import React, { useEffect, useRef } from 'react';
import { X, Check, ArrowLeft, ArrowRight, Smartphone, Globe, Server, Palette, Cloud, Cpu, Layers, ShieldCheck, Code2 } from 'lucide-react';

export const ServiceModal = ({ service, onClose, t, currentLang }) => {
  const modalRef = useRef(null);
  const isRTL = currentLang === 'ar';

  // Body scroll lock & Escape key handling
  useEffect(() => {
    if (!service) return;

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
  }, [service, onClose]);

  if (!service) return null;

  const getIcon = (iconName) => {
    const size = 24;
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
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
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
          maxWidth: '620px',
          maxHeight: '88dvh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          background: 'var(--c-surface)',
          border: '1px solid var(--c-border-light)',
          borderRadius: 'var(--r-lg)',
          padding: 'clamp(1.5rem, 3vw, 2.25rem)',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          color: 'var(--c-text)',
          outline: 'none'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            insetInlineEnd: '1.25rem',
            background: 'var(--c-bg-2)',
            border: '1px solid var(--c-border-light)',
            color: 'var(--c-text)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          aria-label={t.services.closeModal || "Close modal"}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBlockEnd: '1.5rem', paddingInlineEnd: '2.5rem' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, var(--c-indigo) 0%, var(--c-teal) 100%)',
              width: '52px',
              height: '52px',
              borderRadius: 'var(--r-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              flexShrink: 0,
              boxShadow: '0 8px 20px var(--c-indigo-glow)'
            }}
          >
            {getIcon(service.icon)}
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--c-teal)', fontWeight: 700, letterSpacing: '1px' }}>
              MATHALIX SOLUTION
            </span>
            <h3
              id="service-modal-title"
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)', color: 'var(--c-text)', fontWeight: 800, lineHeight: 1.3 }}
            >
              {isRTL ? service.titleAr : service.titleEn}
            </h3>
          </div>
        </div>

        {/* Detailed Description */}
        <p style={{ color: 'var(--c-text-muted)', fontSize: '1rem', lineHeight: 1.75, marginBlockEnd: '1.5rem' }}>
          {isRTL ? service.detailsAr : service.detailsEn}
        </p>

        {/* Key Features List */}
        <div style={{ background: 'var(--c-bg-1)', padding: '1.25rem', borderRadius: 'var(--r-md)', border: '1px solid var(--c-border-light)', marginBlockEnd: '1.75rem' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--c-amber-warm)', marginBlockEnd: '0.85rem', fontWeight: 700 }}>
            {isRTL ? 'مميزات الخدمة في مثالي إكس:' : 'Key Service Capabilities:'}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--c-text)' }}>
              <Check size={16} style={{ color: 'var(--c-teal)', flexShrink: 0, marginTop: '3px' }} />
              <span>{isRTL ? 'تحليل معماري مخصص وهندسة أنظمة متقدمة تلائم احتياجات عملك' : 'Custom architectural analysis & advanced systems engineering tailored to your goals'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--c-text)' }}>
              <Check size={16} style={{ color: 'var(--c-teal)', flexShrink: 0, marginTop: '3px' }} />
              <span>{isRTL ? 'كود نظيف وآمن مع التزام تام بمعايير السرعة وسهولة التوسع' : 'Clean, secure code with strict adherence to speed and infinite scalability'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--c-text)' }}>
              <Check size={16} style={{ color: 'var(--c-teal)', flexShrink: 0, marginTop: '3px' }} />
              <span>{isRTL ? 'اختبارات جودة وأمان شاملة مع دعم فني مستمر واستقرار تشغيلي 99.9%' : 'End-to-end quality & security audits with 24/7 technical monitoring (99.9% uptime)'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.85rem', borderTop: '1px solid var(--c-border-light)', paddingBlockStart: '1.25rem', flexWrap: 'wrap' }}>
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
  );
};
