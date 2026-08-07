/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
// Footer content hardcoded
import { Instagram, Mail, Phone, ArrowUp, ChevronRight, Activity, Youtube } from 'lucide-react';

interface FooterProps {
  onJoinCtaClick: () => void;
}

export default function Footer({ onJoinCtaClick }: FooterProps) {
  const content = {
    instagram_url: 'https://www.instagram.com/surya_calisthenics/',
    youtube_url: 'https://www.youtube.com/@suryacalisthenics',
    contact_email: 'contact@bodyweightathlete.com',
    contact_phone: '+1 (555) 019-3829',
    copyright: '© 2026 Surya Calisthenics. All rights reserved.',
    secondary_cta_text: 'Follow on Instagram',
    youtube_cta_text: 'Subscribe on YouTube'
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-bg text-brand-muted py-16 px-6 border-t border-brand-border font-sans relative" id="footer">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-brand-border">
          
          {/* Column 1: Brand & Logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-brand-text">
              <Activity className="h-4 w-4 text-brand-primary animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase">SURYA CALISTHENICS</span>
            </div>
            <p className="text-brand-muted text-xs md:text-sm max-w-sm leading-relaxed font-light">
              Scientific calisthenics progressions designed to unlock advanced bodyweight control, shredded muscle development, and joint longevity on the bars.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase">
              QUICK SECTIONS
            </h4>
            <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
              {[
                { label: 'Transformations', id: 'transformations' },
                { label: 'About Coach', id: 'about' },
                { label: 'Video Masterclass', id: 'video' },
                { label: 'Program details', id: 'program' }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(link.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-brand-primary transition-colors flex items-center gap-1 cursor-pointer text-brand-muted"
                  >
                    <ChevronRight className="h-3 w-3 text-brand-primary/40" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="md:col-span-4 space-y-4 text-xs">
            <h4 className="text-[10px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase">
              COACHING DISPATCH
            </h4>
            
            {/* <div className="space-y-2.5 font-mono">
              <a
                href={`mailto:${content.contact_email}`}
                className="flex items-center gap-2 hover:text-brand-primary transition-colors text-brand-muted"
              >
                <Mail className="h-4 w-4 text-brand-primary/60" />
                <span>{content.contact_email}</span>
              </a>
              <a
                href={`tel:${content.contact_phone}`}
                className="flex items-center gap-2 hover:text-brand-primary transition-colors text-brand-muted"
              >
                <Phone className="h-4 w-4 text-brand-primary/60" />
                <span>{content.contact_phone}</span>
              </a>
            </div> */}

            {/* Social CTAs */}
            <div className="pt-2 flex flex-col items-start gap-2.5">
              <a
                href={content.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-brand-primary/5 border border-brand-primary/20 hover:bg-brand-primary/10 text-brand-text rounded-none py-3 px-5 text-xs font-mono tracking-widest uppercase font-bold transition-all"
              >
                <Instagram className="h-3.5 w-3.5 text-brand-primary" />
                <span>{content.secondary_cta_text}</span>
              </a>
              <a
                href={content.youtube_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-brand-primary/5 border border-brand-primary/20 hover:bg-brand-primary/10 text-brand-text rounded-none py-3 px-5 text-xs font-mono tracking-widest uppercase font-bold transition-all"
              >
                <Youtube className="h-3.5 w-3.5 text-brand-primary" />
                <span>{content.youtube_cta_text}</span>
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 text-[11px] font-mono text-brand-muted">
          <span className="font-light">{content.copyright}</span>
          
          <div className="flex items-center gap-4 uppercase tracking-widest">
            <button
              onClick={onJoinCtaClick}
              className="text-brand-primary hover:text-brand-secondary transition-colors font-bold"
            >
              Apply to Program
            </button>
            <span className="text-brand-border">•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-brand-primary transition-colors cursor-pointer text-brand-muted font-bold"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5 text-brand-primary" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
