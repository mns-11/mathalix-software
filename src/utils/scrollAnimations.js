import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * initScrollAnimations — Premium, accessible, and performant scroll reveals
 * Features:
 * - Full prefers-reduced-motion compliance
 * - One-time reveals (once: true) avoiding repeat jarring effects
 * - Staggered card float-ins and section header reveals
 * - Hardware-accelerated transform & opacity only
 */
export function initScrollAnimations() {
  // Clear any existing triggers on re-init to prevent leaks or duplicates
  ScrollTrigger.getAll().forEach((t) => t.kill());

  // ── 0. Accessibility Check: Respect prefers-reduced-motion ──
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Make sure all target elements are immediately visible without motion
    gsap.set('section:not(#home) .badge-tag, section:not(#home) .section-title, section:not(#home) .section-description, .card-3d-container, .glass-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      clearProps: 'all'
    });
    return;
  }

  // ── 1. Section Headers Reveal (Badge + Title + Description) ──
  const sections = document.querySelectorAll('section:not(#home)');
  sections.forEach((section) => {
    const badge = section.querySelector('.badge-tag');
    const title = section.querySelector('.section-title');
    const desc = section.querySelector('.section-description');

    const headerElements = [badge, title, desc].filter(Boolean);

    if (headerElements.length > 0) {
      gsap.fromTo(
        headerElements,
        {
          y: 32,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    }
  });

  // ── 2. About Section Pillars & Showcase Card ──
  const aboutCards = document.querySelectorAll('#about .card-3d-container, #about .glass-card');
  if (aboutCards.length > 0) {
    gsap.fromTo(
      aboutCards,
      {
        y: 40,
        opacity: 0,
        scale: 0.97,
      },
      {
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
          once: true,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );
  }

  // ── 3. Service Cards Staggered Reveal ──
  const serviceCards = document.querySelectorAll('#services .card-3d-container, #services .glass-card');
  if (serviceCards.length > 0) {
    gsap.fromTo(
      serviceCards,
      {
        y: 45,
        opacity: 0,
        scale: 0.95,
      },
      {
        scrollTrigger: {
          trigger: '#services',
          start: 'top 80%',
          once: true,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out'
      }
    );
  }

  // ── 4. WhyUs Bento Grid Feature Cards ──
  const whyCards = document.querySelectorAll('#why-us .card-3d-container, #why-us .glass-card');
  if (whyCards.length > 0) {
    gsap.fromTo(
      whyCards,
      {
        y: 38,
        opacity: 0,
        scale: 0.96,
      },
      {
        scrollTrigger: {
          trigger: '#why-us',
          start: 'top 80%',
          once: true,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out'
      }
    );
  }

  // ── 5. Tech Stack Tiles Cascade ──
  const techPills = document.querySelectorAll('#tech .card-3d-container, #tech .glass-card');
  if (techPills.length > 0) {
    gsap.fromTo(
      techPills,
      {
        scale: 0.88,
        opacity: 0,
        y: 20
      },
      {
        scrollTrigger: {
          trigger: '#tech',
          start: 'top 82%',
          once: true,
        },
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: 'back.out(1.2)'
      }
    );
  }

  // ── 6. Project Flagship Showcase Cards ──
  const projectCards = document.querySelectorAll('#projects .card-3d-container, #projects .glass-card');
  if (projectCards.length > 0) {
    gsap.fromTo(
      projectCards,
      {
        y: 50,
        opacity: 0,
        scale: 0.96,
      },
      {
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 78%',
          once: true,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.95,
        stagger: 0.15,
        ease: 'power3.out'
      }
    );
  }

  // ── 7. Stats Monuments Elevation ──
  const statCards = document.querySelectorAll('#stats .card-3d-container, #stats .glass-card');
  if (statCards.length > 0) {
    gsap.fromTo(
      statCards,
      {
        y: 35,
        opacity: 0,
        scale: 0.9,
      },
      {
        scrollTrigger: {
          trigger: '#stats',
          start: 'top 82%',
          once: true,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: 'back.out(1.3)'
      }
    );
  }

  // ── 8. Contact Cards & Form Reveal ──
  const contactCards = document.querySelectorAll('#contact .card-3d-container, #contact .glass-card');
  if (contactCards.length > 0) {
    gsap.fromTo(
      contactCards,
      {
        y: 40,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 80%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );
  }

  // ── 9. Interactive Dynamic Spotlight Mouse Tracker ──
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: coarse)').matches) {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }, { passive: true });
    });
  }

  // ── 10. Refresh ScrollTrigger when DOM is fully settled ──
  ScrollTrigger.refresh();
}
