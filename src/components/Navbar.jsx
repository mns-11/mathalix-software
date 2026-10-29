import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, ArrowLeft, ArrowRight, Sun, Moon, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { siteConfig } from '../data/config';

export const Navbar = ({ t, currentLang, toggleLanguage, theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const isDark = theme === 'dark';
  const isRTL = currentLang === 'ar';

  // ── ScrollSpy & Navbar Scroll Background State ──
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // ScrollSpy: Determine active section across all sections
      const sectionIds = ['home', 'about', 'services', 'why-us', 'tech', 'projects', 'stats', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Mobile Drawer Body Scroll Lock & Escape Key Handler ──
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home',     label: t.nav.home,     href: '#home'     },
    { id: 'about',    label: t.nav.about,    href: '#about'    },
    { id: 'services', label: t.nav.services, href: '#services' },
    { id: 'why-us',   label: t.nav.whyUs,   href: '#why-us'   },
    { id: 'tech',     label: t.nav.tech,     href: '#tech'     },
    { id: 'projects', label: t.nav.projects, href: '#projects' },
    { id: 'stats',    label: t.nav.stats,    href: '#stats'    },
    { id: 'contact',  label: t.nav.contact,  href: '#contact'  },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        insetInline: 0,
        top: 0,
        zIndex: 100,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'var(--nav-bg-scroll)' : 'var(--nav-bg-top)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
        paddingBlock: scrolled ? '0.45rem' : '0.8rem',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.35), 0 0 20px rgba(99,102,241,0.08)' : 'none'
      }}
    >
      {/* Sleek bottom edge glow accent on scroll */}
      {scrolled && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.5) 25%, rgba(45,212,191,0.7) 50%, rgba(245,158,11,0.5) 75%, transparent 100%)',
            pointerEvents: 'none'
          }}
        />
      )}

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>

        {/* Brand Logo */}
        <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Logo size={scrolled ? 'small' : 'medium'} currentLang={currentLang} />
        </a>

        {/* Desktop Navigation */}
        <nav
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.35rem, 1.1vw, 1.2rem)', flexWrap: 'nowrap' }}
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{
                  color: isActive ? 'var(--c-indigo)' : 'var(--nav-link-color)',
                  textDecoration: 'none',
                  fontSize: 'clamp(0.825rem, 0.85vw, 0.925rem)',
                  fontWeight: isActive ? 700 : 600,
                  opacity: isActive ? 1 : 0.82,
                  padding: '0.35rem 0.45rem',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ whiteSpace: 'nowrap' }}>{link.label}</span>
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '0.4rem',
                      right: '0.4rem',
                      height: '2px',
                      background: 'var(--c-indigo)',
                      borderRadius: '999px',
                      boxShadow: '0 0 8px var(--c-indigo-glow)'
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>

          {/* Direct WhatsApp Consultation (Fast Track) */}
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-nav-btn desktop-only"
            aria-label={t.contact.whatsappCta || "Chat on WhatsApp"}
            title={t.contact.whatsappCta || "Chat on WhatsApp"}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10B981',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(16, 185, 129, 0.35)';
              e.currentTarget.style.background = 'rgba(16, 185, 129, 0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
              e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
            }}
          >
            <MessageCircle size={19} />
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDark ? (isRTL ? 'التحويل إلى الوضع المضيء' : 'Light Mode') : (isRTL ? 'التحويل إلى الوضع الداكن' : 'Dark Mode')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid var(--c-border-light)',
              background: isDark ? 'rgba(245,158,11,0.1)' : 'rgba(79,70,229,0.08)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: isDark ? '#FBBD23' : 'var(--c-indigo)',
              flexShrink: 0
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
              e.currentTarget.style.boxShadow = isDark
                ? '0 8px 20px rgba(245,158,11,0.35)'
                : '0 8px 20px rgba(79,70,229,0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="lang-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--glass-bg)',
              border: '1px solid var(--c-border-light)',
              color: 'var(--nav-link-color)',
              padding: '0.4rem 0.8rem',
              minHeight: '40px',
              borderRadius: 'var(--r-full)',
              cursor: 'pointer',
              fontSize: '0.825rem',
              fontWeight: 600,
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(12px)',
              fontFamily: 'inherit'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--c-indigo)';
              e.currentTarget.style.color = 'var(--c-indigo)';
              e.currentTarget.style.boxShadow = '0 4px 16px var(--c-indigo-glow)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--c-border-light)';
              e.currentTarget.style.color = 'var(--nav-link-color)';
              e.currentTarget.style.boxShadow = '';
            }}
            aria-label={currentLang === 'ar' ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
          >
            <Globe size={14} style={{ color: 'var(--c-teal)', flexShrink: 0 }} />
            <span>{currentLang === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          {/* Primary CTA — Desktop Only */}
          <a
            href="#contact"
            className="btn btn-primary desktop-only"
            style={{ padding: '0.45rem 1.15rem', fontSize: '0.875rem', minHeight: '40px' }}
          >
            {t.nav.startProject}
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--glass-bg)',
              border: '1px solid var(--c-border-light)',
              borderRadius: 'var(--r-sm)',
              color: 'var(--nav-link-color)',
              cursor: 'pointer',
              padding: '0.45rem 0.6rem',
              minHeight: '40px',
              minWidth: '40px',
              transition: 'all 0.2s ease'
            }}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 90
          }}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="navigation"
          aria-label="Mobile Navigation"
          style={{
            position: 'fixed',
            top: scrolled ? '56px' : '66px',
            insetInline: 0,
            background: 'var(--nav-drawer-bg)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid var(--c-border-light)',
            padding: 'clamp(1rem, 4vw, 1.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            maxHeight: 'calc(100dvh - 66px)',
            overflowY: 'auto',
            zIndex: 100
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: isActive ? 'var(--c-indigo)' : 'var(--nav-link-color)',
                  textDecoration: 'none',
                  fontSize: '0.98rem',
                  fontWeight: isActive ? 700 : 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBlock: '0.65rem',
                  paddingInline: '0.65rem',
                  borderRadius: 'var(--r-sm)',
                  background: isActive ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                  borderBottom: '1px solid var(--c-border)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{link.label}</span>
                {isRTL
                  ? <ArrowLeft size={16} style={{ color: isActive ? 'var(--c-indigo)' : 'var(--c-teal)', flexShrink: 0 }} />
                  : <ArrowRight size={16} style={{ color: isActive ? 'var(--c-indigo)' : 'var(--c-teal)', flexShrink: 0 }} />}
              </a>
            );
          })}

          {/* Mobile Theme Toggle */}
          <button
            onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: isDark ? 'rgba(245,158,11,0.1)' : 'rgba(79,70,229,0.08)',
              border: `1px solid ${isDark ? 'rgba(245,158,11,0.3)' : 'rgba(79,70,229,0.25)'}`,
              color: isDark ? '#FBBD23' : 'var(--c-indigo)',
              padding: '0.75rem 1rem',
              minHeight: '44px',
              borderRadius: 'var(--r-sm)',
              fontWeight: 600,
              fontSize: '0.925rem',
              cursor: 'pointer',
              marginBlockStart: '0.5rem',
              fontFamily: 'inherit',
              transition: 'all 0.25s ease'
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            <span>{isDark ? (isRTL ? 'التحويل للوضع المضيء' : 'Switch to Light Mode') : (isRTL ? 'التحويل للوضع الداكن' : 'Switch to Dark Mode')}</span>
          </button>

          {/* Mobile Language Switcher */}
          <button
            onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'var(--glass-bg)',
              border: '1px solid var(--c-border-light)',
              color: 'var(--nav-link-color)',
              padding: '0.75rem',
              minHeight: '44px',
              borderRadius: 'var(--r-sm)',
              fontWeight: 600,
              fontSize: '0.925rem',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            <Globe size={18} style={{ color: 'var(--c-teal)' }} />
            <span>{isRTL ? 'Switch to English' : 'التحويل إلى العربية'}</span>
          </button>

          {/* WhatsApp Direct Chat for Mobile */}
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#10B981',
              padding: '0.75rem',
              minHeight: '44px',
              borderRadius: 'var(--r-sm)',
              fontWeight: 700,
              fontSize: '0.925rem',
              textDecoration: 'none'
            }}
          >
            <MessageCircle size={18} />
            <span>{t.contact.whatsappCta || "Chat on WhatsApp"}</span>
          </a>

          {/* Mobile CTA */}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary"
            style={{ marginBlockStart: '0.25rem', textAlign: 'center' }}
          >
            {t.nav.startProject}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav  { display: none !important; }
          .desktop-only { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
};
