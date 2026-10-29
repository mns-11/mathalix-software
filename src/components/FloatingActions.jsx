import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/config';

export const FloatingActions = ({ currentLang, t }) => {
  const [visible, setVisible] = useState(false);
  const isRTL = currentLang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'clamp(1.25rem, 3vw, 2rem)',
        insetInlineEnd: 'clamp(1.25rem, 3vw, 2rem)',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.65rem',
        animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* WhatsApp Quick Action Pill */}
      <a
        href={siteConfig.contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.contact?.whatsappCta || "Chat on WhatsApp"}
        title={t.contact?.whatsappCta || "Chat on WhatsApp"}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          textDecoration: 'none'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.12) translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(16, 185, 129, 0.6)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.45)';
        }}
      >
        <MessageCircle size={24} />
      </a>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label={isRTL ? 'الرجوع إلى الأعلى' : 'Back to top'}
        title={isRTL ? 'الرجوع إلى الأعلى' : 'Back to top'}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'var(--c-surface)',
          color: 'var(--c-text)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
          border: '1px solid var(--c-border-light)',
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          backdropFilter: 'blur(12px)'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
          e.currentTarget.style.borderColor = 'var(--c-indigo)';
          e.currentTarget.style.color = 'var(--c-indigo)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.borderColor = 'var(--c-border-light)';
          e.currentTarget.style.color = 'var(--c-text)';
        }}
      >
        <ArrowUp size={20} />
      </button>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

