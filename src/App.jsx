import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScrollAnimations } from './utils/scrollAnimations';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { Stats } from './components/Stats';
import { CtaBanner } from './components/CtaBanner';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Cursor3DGlow } from './components/Cursor3DGlow';
import { FloatingActions } from './components/FloatingActions';

// Performance: Code-split Global 3D WebGL background
const Global3DScene = React.lazy(() => import('./components/Global3DScene').then(m => ({ default: m.Global3DScene })));

gsap.registerPlugin(ScrollTrigger);

// Safe localStorage helpers
function safeGetItem(key, fallback) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}
function safeSetItem(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

export default function App() {
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState(() => safeGetItem('smx-theme', 'dark'));

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const toggleLanguage = () => setLang(prev => (prev === 'ar' ? 'en' : 'ar'));

  // ── 1. Lenis Smooth Scrolling & GSAP Synchronization ──
  useEffect(() => {
    let lenisInstance;
    try {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false,
      });

      if (typeof window !== 'undefined') {
        window.__lenis = lenisInstance;
      }

      // Synchronize Lenis scroll position with ScrollTrigger
      lenisInstance.on('scroll', ScrollTrigger.update);

      const updateTicker = (time) => {
        lenisInstance.raf(time * 1000);
      };
      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      // Smooth handling for internal anchor hash links (#about, #services, etc.)
      const handleAnchorClick = (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenisInstance.scrollTo(target, { offset: -70, duration: 1.2 });
          }
        }
      };
      document.addEventListener('click', handleAnchorClick);

      // Initialize GSAP scroll-triggered animations
      const timer = setTimeout(() => {
        initScrollAnimations();
      }, 150);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleAnchorClick);
        gsap.ticker.remove(updateTicker);
        lenisInstance.destroy();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    } catch (err) {
      console.warn('Smooth scroll initialization fallback', err);
    }
  }, [lang]);

  // Apply theme to <html>
  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      safeSetItem('smx-theme', theme);
    } catch {}
  }, [theme]);

  // Apply lang/dir to <html>
  useEffect(() => {
    try {
      const html = document.documentElement;
      html.setAttribute('lang', lang);
      html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      setTimeout(() => ScrollTrigger.refresh(), 100);
    } catch {}
  }, [lang]);

  const t = translations[lang] || translations.ar;

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--c-bg)', color: 'var(--c-text)', position: 'relative' }}>
      {/* Subtle Analog Grain Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Whole-Site Interactive 3D WebGL Background Cosmos */}
      <React.Suspense fallback={null}>
        <Global3DScene theme={theme} />
      </React.Suspense>

      {/* Global 3D Ambient Cursor Light */}
      <Cursor3DGlow theme={theme} />

      <Navbar
        currentLang={lang}
        toggleLanguage={toggleLanguage}
        t={t}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main>
        <Hero      t={t} currentLang={lang} theme={theme} />
        <About     t={t} currentLang={lang} />
        <Services  t={t} currentLang={lang} />
        <WhyUs     t={t} currentLang={lang} />
        <TechStack t={t} currentLang={lang} />
        <Projects  t={t} currentLang={lang} />
        <Stats     t={t} currentLang={lang} />
        <CtaBanner t={t} currentLang={lang} />
        <Contact   t={t} currentLang={lang} />
      </main>
      <Footer t={t} currentLang={lang} />
      <FloatingActions currentLang={lang} t={t} />
    </div>
  );
}
