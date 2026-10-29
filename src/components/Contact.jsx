import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { siteConfig } from '../data/config';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle2,
  Loader2, MessageCircle, Copy, Check, AlertCircle, ArrowUpRight, ExternalLink
} from 'lucide-react';

export const Contact = ({ t, currentLang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const isRTL = currentLang === 'ar';

  const copyToClipboard = (text, key, e) => {
    if (e) e.stopPropagation();
    if (!text) return;

    const setSuccess = () => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(setSuccess)
        .catch(() => fallbackCopy(text, setSuccess));
    } else {
      fallbackCopy(text, setSuccess);
    }
  };

  const fallbackCopy = (text, onSuccess) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.pointerEvents = 'none';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      document.execCommand('copy');
      document.body.removeChild(textarea);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.warn("Fallback clipboard copy failed", err);
      if (onSuccess) onSuccess();
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = isRTL ? 'يرجى كتابة الاسم بالكامل' : 'Please enter your full name';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = isRTL ? 'يرجى كتابة بريد إلكتروني صحيح' : 'Please enter a valid email address';
    }
    if (formData.phone.trim() && formData.phone.trim().length < 8) {
      errs.phone = isRTL ? 'رقم الهاتف قصير جداً' : 'Phone number is too short';
    }
    if (!formData.message.trim() || formData.message.trim().length < 8) {
      errs.message = isRTL ? 'يرجى كتابة تفاصيل مشروعك (8 أحرف على الأقل)' : 'Please provide some details about your project (at least 8 characters)';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const emailTarget = siteConfig.contact.email;
    const subject = `طلب مشروع جديد عبر الموقع - ${formData.name}`;
    const bodyText = `الاسم: ${formData.name}\nالبريد الإلكتروني: ${formData.email}\nرقم الجوال: ${formData.phone || 'غير محدد'}\nنوع الخدمة: ${formData.service || 'غير محدد'}\n\nتفاصيل الرسالة:\n${formData.message}`;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${emailTarget}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: subject,
          _template: "table",
          "اسم العميل": formData.name,
          "البريد الإلكتروني": formData.email,
          "رقم الجوال": formData.phone || "لم يحدد",
          "نوع الخدمة": formData.service || "عام",
          "تفاصيل الرسالة": formData.message
        })
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      console.warn("Direct API fetch notice, triggering mailto fallback", err);
      const mailtoUrl = `mailto:${emailTarget}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
      window.location.href = mailtoUrl;
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapsUrl = "https://maps.google.com/?q=Riyadh,Saudi+Arabia";

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      {/* Background Glow */}
      <div className="glow-orb glow-indigo" style={{ bottom: '5%', insetInlineEnd: '5%', width: '450px', height: '450px' }} />
      <div className="glow-orb glow-teal" style={{ top: '10%', insetInlineStart: '2%', width: '380px', height: '380px', opacity: 0.14 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBlockEnd: 'clamp(2.5rem, 4vw, 4rem)' }}>
          <div className="badge-tag">
            <Mail size={16} />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="section-title" style={{ maxWidth: '800px', marginInline: 'auto' }}>
            {t.contact.title}
          </h2>
          <p className="section-description" style={{ marginInline: 'auto' }}>
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact Fluid Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Interactive Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Direct WhatsApp High-Priority Card — Whole Card Clickable */}
            <Card3D
              className="glass-card"
              maxTilt={4}
              scale={1.01}
              onClick={() => window.open(siteConfig.contact.whatsappUrl, '_blank', 'noopener,noreferrer')}
              style={{
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 'var(--r-md)',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(13, 148, 136, 0.08) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                padding: '1.25rem 1.5rem',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: '#10B981',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
                    flexShrink: 0
                  }}
                >
                  <MessageCircle size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: 800, letterSpacing: '0.5px' }}>
                    {t.contact.whatsappTitle || (isRTL ? 'المحادثة المباشرة' : 'Instant WhatsApp')}
                  </div>
                  <div style={{ fontSize: '0.96rem', color: 'var(--c-text)', fontWeight: 700, marginBlockStart: '0.2rem' }}>
                    {t.contact.whatsappDesc || (isRTL ? 'تواصل فوري مع فريق الاستشارات' : 'Direct tech consultation')}
                  </div>
                </div>
              </div>

              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn btn-primary"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.84rem',
                  minHeight: '40px',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  boxShadow: '0 6px 18px rgba(16, 185, 129, 0.35)',
                  flexShrink: 0,
                  textDecoration: 'none',
                  position: 'relative',
                  zIndex: 10
                }}
              >
                <span>{isRTL ? 'بدء المحادثة' : 'Chat Now'}</span>
                <ArrowUpRight size={15} />
              </a>
            </Card3D>
            
            {/* Card 1: Address — Clickable to Google Maps */}
            <Card3D
              className="glass-card"
              maxTilt={4}
              scale={1.01}
              onClick={() => window.open(mapsUrl, '_blank', 'noopener,noreferrer')}
              style={{
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 'var(--r-md)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div className="icon-box icon-box--md icon-box--indigo" style={{ transform: 'translateZ(26px)', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <div style={{ transform: 'translateZ(18px)' }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--c-text-dim)', fontWeight: 600 }}>{t.contact.infoAddressTitle}</div>
                  <div style={{ fontSize: '0.98rem', color: 'var(--c-text)', fontWeight: 700, marginBlockStart: '0.2rem' }}>{t.contact.infoAddressVal}</div>
                </div>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'var(--c-bg-2)',
                  border: '1px solid var(--c-border-light)',
                  color: 'var(--c-text)',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--r-sm)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 10
                }}
                title={isRTL ? "فتح في خرائط جوجل" : "Open in Google Maps"}
              >
                <span>{isRTL ? 'الخريطة' : 'Maps'}</span>
                <ExternalLink size={13} />
              </a>
            </Card3D>

            {/* Card 2: Email with Direct Link and Copy Button */}
            <Card3D
              className="glass-card"
              maxTilt={4}
              scale={1.01}
              style={{
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 'var(--r-md)'
              }}
            >
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div className="icon-box icon-box--md icon-box--teal" style={{ transform: 'translateZ(26px)', flexShrink: 0 }}>
                  <Mail size={22} />
                </div>
                <div style={{ transform: 'translateZ(18px)' }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--c-text-dim)', fontWeight: 600 }}>{t.contact.infoEmailTitle}</div>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    style={{ fontSize: '0.98rem', color: 'var(--c-teal)', fontWeight: 700, textDecoration: 'none', marginBlockStart: '0.2rem', display: 'block', position: 'relative', zIndex: 10 }}
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => copyToClipboard(siteConfig.contact.email, 'email', e)}
                aria-label="Copy Email"
                title={copiedKey === 'email' ? (t.contact.copied || "Copied") : (t.contact.copy || "Copy")}
                style={{
                  background: copiedKey === 'email' ? 'rgba(16, 185, 129, 0.18)' : 'var(--c-bg-2)',
                  border: `1px solid ${copiedKey === 'email' ? '#10B981' : 'var(--c-border-light)'}`,
                  color: copiedKey === 'email' ? '#10B981' : 'var(--c-text)',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--r-sm)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 10
                }}
              >
                {copiedKey === 'email' ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                <span>{copiedKey === 'email' ? (t.contact.copied || 'تم النسخ!') : (t.contact.copy || 'نسخ')}</span>
              </button>
            </Card3D>

            {/* Card 3: Phone with Direct Call Link and Copy Button */}
            <Card3D
              className="glass-card"
              maxTilt={4}
              scale={1.01}
              style={{
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 'var(--r-md)'
              }}
            >
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div className="icon-box icon-box--md icon-box--amber" style={{ transform: 'translateZ(26px)', flexShrink: 0 }}>
                  <Phone size={22} />
                </div>
                <div style={{ transform: 'translateZ(18px)' }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--c-text-dim)', fontWeight: 600 }}>{t.contact.infoPhoneTitle}</div>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    style={{ fontSize: '0.98rem', color: 'var(--c-text)', fontWeight: 700, textDecoration: 'none', marginBlockStart: '0.2rem', display: 'block', direction: 'ltr', textAlign: 'start', position: 'relative', zIndex: 10 }}
                  >
                    {siteConfig.contact.phoneDisplay || siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => copyToClipboard(siteConfig.contact.phone, 'phone', e)}
                aria-label="Copy Phone"
                title={copiedKey === 'phone' ? (t.contact.copied || "Copied") : (t.contact.copy || "Copy")}
                style={{
                  background: copiedKey === 'phone' ? 'rgba(16, 185, 129, 0.18)' : 'var(--c-bg-2)',
                  border: `1px solid ${copiedKey === 'phone' ? '#10B981' : 'var(--c-border-light)'}`,
                  color: copiedKey === 'phone' ? '#10B981' : 'var(--c-text)',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--r-sm)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 10
                }}
              >
                {copiedKey === 'phone' ? <Check size={14} style={{ color: '#10B981' }} /> : <Copy size={14} />}
                <span>{copiedKey === 'phone' ? (t.contact.copied || 'تم النسخ!') : (t.contact.copy || 'نسخ')}</span>
              </button>
            </Card3D>

            {/* Card 4: Working Hours */}
            <Card3D className="glass-card" maxTilt={4} scale={1.01} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', borderRadius: 'var(--r-md)' }}>
              <div className="icon-box icon-box--md icon-box--rose" style={{ transform: 'translateZ(26px)', flexShrink: 0 }}>
                <Clock size={22} />
              </div>
              <div style={{ transform: 'translateZ(18px)' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--c-text-dim)', fontWeight: 600 }}>{t.contact.infoWorkingHoursTitle}</div>
                <div style={{ fontSize: '0.98rem', color: 'var(--c-text)', fontWeight: 700, marginBlockStart: '0.2rem' }}>{t.contact.infoWorkingHoursVal}</div>
              </div>
            </Card3D>

            {/* Card 5: Social Media Channels */}
            <Card3D className="glass-card" maxTilt={4} scale={1.01} style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--r-md)' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--c-text)', fontWeight: 700, marginBlockEnd: '0.85rem' }}>
                {t.footer.socialTitle || (isRTL ? 'شبكات التواصل الاجتماعي:' : 'Social Media Channels:')}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                
                {/* Instagram */}
                <a 
                  href={siteConfig.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="pill pill--rose"
                  style={{ textDecoration: 'none' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>Instagram</span>
                </a>

                {/* X */}
                <a 
                  href={siteConfig.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="pill pill--white"
                  style={{ textDecoration: 'none' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X</span>
                </a>

                {/* TikTok */}
                <a 
                  href={siteConfig.social.tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="pill pill--teal"
                  style={{ textDecoration: 'none' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.37A6.388 6.388 0 0 0 3 15.658a6.34 6.34 0 0 0 10.82 4.492 6.275 6.275 0 0 0 1.847-4.478V8.916a8.163 8.163 0 0 0 4.77 1.524V6.993a4.85 4.85 0 0 1-1.3-.307z"/>
                  </svg>
                  <span>TikTok</span>
                </a>

              </div>
            </Card3D>

          </div>

          {/* Right Column: 3D Interactive Contact Form */}
          <Card3D className="glass-card" maxTilt={4} scale={1.01} style={{ borderRadius: 'var(--r-xl)', boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5)', padding: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}>
            {isSubmitted ? (
              <div style={{ textAlign: 'center', paddingBlock: '2.5rem' }}>
                <div 
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10B981',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginInline: 'auto',
                    marginBlockEnd: '1.25rem'
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--c-text)', marginBlockEnd: '1rem', fontWeight: 800 }}>
                  {t.contact.successTitle}
                </h3>
                <p style={{ color: 'var(--c-text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBlockEnd: '2rem' }}>
                  {t.contact.successDesc}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => setIsSubmitted(false)} 
                    className="btn btn-secondary"
                  >
                    {isRTL ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                  </button>
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
                  >
                    <MessageCircle size={16} />
                    <span>{t.contact.whatsappCta || "Chat on WhatsApp"}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Full Name */}
                <div>
                  <label htmlFor="contact-name" style={{ display: 'flex', justifyContent: 'space-between', marginBlockEnd: '0.4rem', fontSize: '0.875rem', color: 'var(--c-text)', fontWeight: 700 }}>
                    <span>{t.contact.formName} *</span>
                  </label>
                  <input 
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.contact.formNamePlaceholder}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      minHeight: '48px',
                      borderRadius: 'var(--r-sm)',
                      background: 'var(--c-bg-2)',
                      border: `1px solid ${errors.name ? '#EF4444' : 'var(--c-border-light)'}`,
                      color: 'var(--c-text)',
                      fontSize: '16px',
                      outline: 'none',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s ease'
                    }}
                  />
                  {errors.name && (
                    <div id="name-error" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#EF4444', fontSize: '0.78rem', marginBlockStart: '0.35rem' }}>
                      <AlertCircle size={13} />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 170px), 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label htmlFor="contact-email" style={{ display: 'flex', justifyContent: 'space-between', marginBlockEnd: '0.4rem', fontSize: '0.875rem', color: 'var(--c-text)', fontWeight: 700 }}>
                      <span>{t.contact.formEmail} *</span>
                    </label>
                    <input 
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.formEmailPlaceholder}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        minHeight: '48px',
                        borderRadius: 'var(--r-sm)',
                        background: 'var(--c-bg-2)',
                        border: `1px solid ${errors.email ? '#EF4444' : 'var(--c-border-light)'}`,
                        color: 'var(--c-text)',
                        fontSize: '16px',
                        outline: 'none',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.2s ease'
                      }}
                    />
                    {errors.email && (
                      <div id="email-error" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#EF4444', fontSize: '0.78rem', marginBlockStart: '0.35rem' }}>
                        <AlertCircle size={13} />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" style={{ display: 'flex', justifyContent: 'space-between', marginBlockEnd: '0.4rem', fontSize: '0.875rem', color: 'var(--c-text)', fontWeight: 700 }}>
                      <span>{t.contact.formPhone}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--c-text-ghost)', fontWeight: 500 }}>
                        {t.contact.formOptional || (isRTL ? 'اختياري' : 'Optional')}
                      </span>
                    </label>
                    <input 
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.contact.formPhonePlaceholder}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        minHeight: '48px',
                        borderRadius: 'var(--r-sm)',
                        background: 'var(--c-bg-2)',
                        border: `1px solid ${errors.phone ? '#EF4444' : 'var(--c-border-light)'}`,
                        color: 'var(--c-text)',
                        fontSize: '16px',
                        outline: 'none',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.2s ease'
                      }}
                    />
                    {errors.phone && (
                      <div id="phone-error" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#EF4444', fontSize: '0.78rem', marginBlockStart: '0.35rem' }}>
                        <AlertCircle size={13} />
                        <span>{errors.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Dropdown */}
                <div>
                  <label htmlFor="contact-service" style={{ display: 'block', marginBlockEnd: '0.4rem', fontSize: '0.875rem', color: 'var(--c-text)', fontWeight: 700 }}>
                    {t.contact.formService}
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      minHeight: '48px',
                      borderRadius: 'var(--r-sm)',
                      background: 'var(--c-bg-2)',
                      border: '1px solid var(--c-border-light)',
                      color: formData.service ? 'var(--c-text)' : 'var(--c-text-dim)',
                      fontSize: '16px',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="" disabled>{t.contact.formServicePlaceholder}</option>
                    {siteConfig.services.map((svc) => (
                      <option key={svc.id} value={svc.id} style={{ background: '#0B1020', color: '#FFFFFF' }}>
                        {isRTL ? svc.titleAr : svc.titleEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" style={{ display: 'flex', justifyContent: 'space-between', marginBlockEnd: '0.4rem', fontSize: '0.875rem', color: 'var(--c-text)', fontWeight: 700 }}>
                    <span>{t.contact.formMessage} *</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contact.formMessagePlaceholder}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--r-sm)',
                      background: 'var(--c-bg-2)',
                      border: `1px solid ${errors.message ? '#EF4444' : 'var(--c-border-light)'}`,
                      color: 'var(--c-text)',
                      fontSize: '16px',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      transition: 'border-color 0.2s ease'
                    }}
                  />
                  {errors.message && (
                    <div id="message-error" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#EF4444', fontSize: '0.78rem', marginBlockStart: '0.35rem' }}>
                      <AlertCircle size={13} />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.85 : 1
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} style={{ animation: 'spinOrbit 1s linear infinite' }} />
                      <span>{t.contact.formSubmitting}</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>{t.contact.formSubmit}</span>
                    </>
                  )}
                </button>

              </form>
            )}
          </Card3D>

        </div>

      </div>
    </section>
  );
};
