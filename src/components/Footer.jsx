import React from 'react';
import { Logo } from './Logo';
import { siteConfig } from '../data/config';
import { Shield, ArrowUp, Mail, MapPin, Phone, Clock, Sparkles, ExternalLink } from 'lucide-react';

const SocialLink = ({ href, label, className, svgPath, isFill }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`pill ${className}`}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      textDecoration: 'none',
      transition: 'all 0.25s var(--tr-spring)',
      flexShrink: 0,
      padding: 0
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = '';
    }}
  >
    {isFill
      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">{svgPath}</svg>
      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{svgPath}</svg>
    }
  </a>
);

export const Footer = ({ t, currentLang }) => {
  const isRTL = currentLang === 'ar';

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navLinks = [
    { id: 'home',     key: 'home'     },
    { id: 'about',    key: 'about'    },
    { id: 'services', key: 'services' },
    { id: 'why-us',   key: 'whyUs'   },
    { id: 'tech',     key: 'tech'     },
    { id: 'projects', key: 'projects' },
    { id: 'stats',    key: 'stats'    },
    { id: 'contact',  key: 'contact'  },
  ];

  return (
    <footer style={{
      background: 'var(--c-surface-2)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid var(--c-border-light)',
      paddingBlockStart: 'clamp(4rem,7vw,6rem)',
      paddingBlockEnd: 'clamp(2rem,4vw,3rem)',
      transition: 'background 0.35s ease'
    }}>

      {/* Top Brand Gradient Accent Line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, var(--c-indigo) 0%, var(--c-teal) 50%, var(--c-amber) 100%)'
      }} />

      {/* Ambient Glow */}
      <div className="glow-orb glow-indigo animate-pulse-glow" style={{ top: '-20%', insetInlineStart: '10%', width: '420px', height: '420px', opacity: 0.12 }} />
      <div className="glow-orb glow-teal" style={{ bottom: '-15%', insetInlineEnd: '5%', width: '350px', height: '350px', opacity: 0.1 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Main Grid ── */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,230px),1fr))',
            gap: 'clamp(2.5rem,5vw,4rem)',
            marginBlockEnd: 'clamp(3rem,5vw,4.5rem)'
          }}
        >

          {/* Column 1: Brand + Social */}
          <div className="footer-brand-col" style={{ gridColumn: 'span 2' }}>
            <div style={{ marginBlockEnd: '1.5rem' }}>
              <Logo size="medium" currentLang={currentLang} />
            </div>

            <p style={{ color: 'var(--c-text-muted)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '440px', marginBlockEnd: '1.75rem' }}>
              {t.footer.desc}
            </p>

            {/* Parent Group Badge with Direct Link */}
            <a
              href="https://sakaniltd.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill--amber"
              style={{
                marginBlockEnd: '2rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={isRTL ? 'زيارة الموقع الرسمي لمجموعة سكني المثالي' : 'Visit Official Sakani Al Mathali Group Portal'}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(217, 119, 6, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <Shield size={15} />
              <span>{t.footer.parentNotice}</span>
              <ExternalLink size={13} style={{ opacity: 0.8 }} />
            </a>

            {/* Social Links Row */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBlockEnd: '1rem' }}>
                <Sparkles size={14} style={{ color: 'var(--c-teal)' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--c-text)', fontWeight: 800, letterSpacing: '0.5px' }}>
                  {t.footer.socialTitle}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                {/* Instagram */}
                <SocialLink
                  href={siteConfig.social.instagram}
                  label="Instagram"
                  className="pill--rose"
                  isFill={false}
                  svgPath={<><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>}
                />
                {/* X / Twitter */}
                <SocialLink
                  href={siteConfig.social.twitter}
                  label="X (Twitter)"
                  className="pill--white"
                  isFill={true}
                  svgPath={<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>}
                />
                {/* TikTok */}
                <SocialLink
                  href={siteConfig.social.tiktok}
                  label="TikTok"
                  className="pill--teal"
                  isFill={true}
                  svgPath={<path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.37A6.388 6.388 0 0 0 3 15.658a6.34 6.34 0 0 0 10.82 4.492 6.275 6.275 0 0 0 1.847-4.478V8.916a8.163 8.163 0 0 0 4.77 1.524V6.993a4.85 4.85 0 0 1-1.3-.307z"/>}
                />
                {/* WhatsApp */}
                <SocialLink
                  href={siteConfig.contact.whatsappUrl}
                  label="WhatsApp"
                  className="pill--teal"
                  isFill={false}
                  svgPath={<><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></>}
                />
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: 'var(--c-text)', fontSize: '1.05rem', fontWeight: 800, marginBlockEnd: '1.35rem', letterSpacing: '-0.01em', paddingBlockEnd: '0.75rem', borderBottom: '1px solid var(--c-border-light)' }}>
              {t.footer.quickLinks}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    style={{ color: 'var(--c-text-muted)', textDecoration: 'none', fontSize: '0.93rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--c-indigo)'; e.currentTarget.style.paddingInlineStart = '4px'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--c-text-muted)'; e.currentTarget.style.paddingInlineStart = ''; }}
                  >
                    <span>{t.nav[link.key]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 style={{ color: 'var(--c-text)', fontSize: '1.05rem', fontWeight: 800, marginBlockEnd: '1.35rem', letterSpacing: '-0.01em', paddingBlockEnd: '0.75rem', borderBottom: '1px solid var(--c-border-light)' }}>
              {t.footer.servicesTitle}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {siteConfig.services.slice(0, 5).map(svc => (
                <li key={svc.id}>
                  <a
                    href="#services"
                    style={{ color: 'var(--c-text-muted)', textDecoration: 'none', fontSize: '0.93rem', fontWeight: 600, transition: 'all 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--c-teal)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--c-text-muted)'; }}
                  >
                    {isRTL ? svc.titleAr : svc.titleEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 style={{ color: 'var(--c-text)', fontSize: '1.05rem', fontWeight: 800, marginBlockEnd: '1.35rem', letterSpacing: '-0.01em', paddingBlockEnd: '0.75rem', borderBottom: '1px solid var(--c-border-light)' }}>
              {t.footer.contactTitle}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: 'var(--c-text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={16} style={{ color: 'var(--c-indigo)', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontWeight: 600, color: 'var(--c-text)' }}>{isRTL ? siteConfig.contact.addressAr : siteConfig.contact.addressEn}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={16} style={{ color: 'var(--c-teal)', flexShrink: 0 }} />
                <a href={`mailto:${siteConfig.contact.email}`} style={{ color: 'var(--c-teal)', textDecoration: 'none', fontWeight: 700 }}>
                  {siteConfig.contact.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={16} style={{ color: 'var(--c-amber)', flexShrink: 0 }} />
                <a href={`tel:${siteConfig.contact.phone}`} style={{ color: 'var(--c-text)', textDecoration: 'none', fontWeight: 800, direction: 'ltr' }}>
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--c-text-dim)', fontSize: '0.85rem', fontWeight: 600 }}>
                <Clock size={15} style={{ flexShrink: 0 }} />
                <span>{isRTL ? siteConfig.contact.hoursAr : siteConfig.contact.hoursEn}</span>
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="btn btn-secondary"
                style={{
                  marginBlockStart: '0.75rem',
                  padding: '0.55rem 1.15rem',
                  minHeight: '42px',
                  alignSelf: 'flex-start'
                }}
              >
                <ArrowUp size={15} />
                <span>{isRTL ? 'العودة للأعلى' : 'Back to Top'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div style={{
          borderTop: '1px solid var(--c-border-light)',
          paddingBlockStart: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--c-text-dim)'
        }}>
          <span style={{ fontWeight: 600 }}>{t.footer.copyright}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800 }}>
            <span style={{ color: 'var(--c-indigo)' }}>MATHALIX DIGITAL SOLUTIONS</span>
            <span style={{ color: 'var(--c-border-light)' }}>|</span>
            <span style={{ color: 'var(--c-amber)' }}>SAKANI AL MATHALI GROUP</span>
          </div>
        </div>

      </div>

      {/* Mobile Grid Fix */}
      <style>{`
        @media (max-width: 960px) {
          .footer-brand-col { grid-column: span 1 !important; }
        }
      `}</style>
    </footer>
  );
};
