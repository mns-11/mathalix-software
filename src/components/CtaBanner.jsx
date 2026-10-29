import React from 'react';
import { Card3D } from './Card3D';
import { ArrowLeft, ArrowRight, Rocket, MessageCircle, FileText, Shield, Clock, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/config';

export const CtaBanner = ({ t, currentLang }) => {
  const isRTL = currentLang === 'ar';

  return (
    <section style={{ position: 'relative', paddingBlock: 'clamp(2.5rem, 5vw, 4.5rem)', overflow: 'hidden' }}>
      <div className="container">
        <Card3D 
          className="glass-card glass-card--indigo border-beam-card"
          maxTilt={3}
          scale={1.005}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'var(--r-xl)',
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3.5rem)',
            textAlign: 'center',
            border: '1px solid var(--c-border-light)',
            boxShadow: '0 30px 70px -15px rgba(99, 102, 241, 0.35)'
          }}
        >
          {/* Ambient Glow Orbs inside Banner */}
          <div className="glow-orb glow-indigo animate-pulse-glow" style={{ top: '-40%', insetInlineEnd: '5%', width: '420px', height: '420px', opacity: 0.28 }} />
          <div className="glow-orb glow-teal" style={{ bottom: '-40%', insetInlineStart: '5%', width: '360px', height: '360px', opacity: 0.22 }} />

          {/* Content with 3D Depth */}
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '840px', marginInline: 'auto', transform: 'translateZ(25px)' }}>
            
            {/* Launch Badge */}
            <div 
              className="badge-tag"
              style={{
                marginBlockEnd: '1.75rem',
                transform: 'translateZ(30px)'
              }}
            >
              <Rocket size={16} />
              <span>{isRTL ? 'تحول رقمي سيادي يبدأ الآن' : 'Sovereign Digital Transformation Starts Now'}</span>
            </div>

            {/* Headline */}
            <h2 className="text-balance" style={{
              fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
              fontWeight: 900,
              color: 'var(--c-text)',
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              marginBlockEnd: '1.25rem',
              transform: 'translateZ(25px)'
            }}>
              {isRTL ? (
                <>جاهز لامتلاك السيادة الرقمية؟ <span className="grad-text-brand">دعنا نهندس منتجك ليقود السوق</span></>
              ) : (
                <>Ready for Digital Sovereignty? <span className="grad-text-brand">Let's Engineer Your Next Market Leader</span></>
              )}
            </h2>

            {/* Subtitle */}
            <p className="text-balance" style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: 'var(--c-text-muted)',
              fontWeight: 500,
              lineHeight: 1.8,
              marginBlockEnd: '2.5rem',
              maxWidth: '680px',
              marginInline: 'auto',
              transform: 'translateZ(15px)'
            }}>
              {t.ctaBanner.subtitle}
            </p>

            {/* High-Converting CTA Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBlockEnd: '2.5rem',
              transform: 'translateZ(35px)'
            }}>
              {/* Primary Direct WhatsApp VIP Consultation */}
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  padding: '0.95rem 2.25rem',
                  fontSize: '1rem',
                  minHeight: '52px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  boxShadow: '0 8px 30px rgba(16, 185, 129, 0.45)',
                  textDecoration: 'none'
                }}
              >
                <MessageCircle size={18} />
                <span>{isRTL ? 'استشارة فورية عبر واتساب' : 'Instant WhatsApp VIP Chat'}</span>
              </a>

              {/* Secondary Submit Project Brief Form */}
              <a
                href="#contact"
                className="btn btn-secondary"
                style={{
                  padding: '0.95rem 2rem',
                  fontSize: '0.96rem',
                  minHeight: '52px',
                  textDecoration: 'none'
                }}
              >
                <FileText size={17} />
                <span>{isRTL ? 'طلب عرض سعر مفصل' : 'Request Detailed Proposal'}</span>
                {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </a>
            </div>

            {/* Enterprise Assurance Badges */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(1rem, 3vw, 2.5rem)',
              flexWrap: 'wrap',
              borderTop: '1px solid var(--c-border-light)',
              paddingBlockStart: '1.75rem',
              transform: 'translateZ(18px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--c-text-muted)', fontSize: '0.82rem', fontWeight: 600 }}>
                <Shield size={15} style={{ color: '#10B981' }} />
                <span>{isRTL ? 'اتفاقية سرية معلومات (NDA) فورية' : 'Instant Mutual NDA Protection'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--c-text-muted)', fontSize: '0.82rem', fontWeight: 600 }}>
                <Clock size={15} style={{ color: '#F59E0B' }} />
                <span>{isRTL ? 'دراسة فنية وتسعير خلال 24 ساعة' : 'Technical Scoping in 24 Hours'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--c-text-muted)', fontSize: '0.82rem', fontWeight: 600 }}>
                <CheckCircle2 size={15} style={{ color: '#818CF8' }} />
                <span>{isRTL ? 'فريق هندسي متخصص بالرياض' : 'Dedicated Riyadh Engineering Team'}</span>
              </div>
            </div>

          </div>
        </Card3D>
      </div>
    </section>
  );
};
