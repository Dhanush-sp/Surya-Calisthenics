/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
// About content hardcoded per site defaults
import { Star, Globe, UserCheck, Link2, Play, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutProps {
  onCtaClick: () => void;
}

export default function About({ onCtaClick }: AboutProps) {
  const content = {
    coach_name: 'Coach Surya',
    coach_title: 'Elite Calisthenics Specialist & Founder',
    coach_photo: '/images/coach.jpeg',
    certification_photo: '/images/certificate.jpeg',
    bio_heading: 'Meet Your Coach',
    bio_paragraph_1: "Hey, I'm Surya. I spent over a decade perfecting bodyweight training to unlock movements most think are reserved for elite gymnasts. My mission is to demystify advanced calisthenics, turning complex skills into scientific, progressive training steps anyone can follow.",
    bio_paragraph_2: "Having coached over 500+ athletes worldwide through mobile-optimized virtual programs, I focus on building raw, functional strength, bulletproofing joints, and developing a shredded, high-performance physique without the need for heavy weights."
  };
  const highlights = [
    {
      icon: Star,
      title: '10+ Years Calisthenics Mastery',
      desc: 'A decade of training, learning, and perfecting the art of bodyweight strength.',
    },
    {
      icon: Globe,
      title: '500+ Athletes Coached Globally',
      desc: 'Helping athletes from different countries achieve their fitness and skill goals.',
    },
    {
      icon: UserCheck,
      title: 'Certified Bodyweight Specialist',
      desc: 'WSWCF Certified Personal Trainer with expertise in calisthenics & street workout.',
    },
    {
      icon: Link2,
      title: 'Expert in Gymnastic Rings',
      desc: 'Specialized in ring training, strength skills, and advanced movement progressions.',
    },
  ];

  const scrollToTransformations = () => {
    const el = document.getElementById('transformations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-brand-bg text-brand-text relative border-b border-brand-border" id="about">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Side: Premium Two-Image Layout */}
          <div className="lg:col-span-6 relative flex flex-row gap-4 sm:gap-6 justify-center items-center">
            <div className="relative w-[54%] shrink-0">
              <div className="relative aspect-[3/4] rounded-none overflow-hidden border border-brand-border shadow-2xl">
                <img
                  src={content.coach_photo}
                  alt={content.coach_name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[9px] font-mono tracking-[0.2em] text-white bg-brand-primary border border-brand-primary px-3 py-1 rounded-none uppercase font-bold">
                    LEAD COACH
                  </span>
                </div>
              </div>

              {/* <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-6 z-20 w-[92px] sm:w-[110px] bg-brand-card border border-brand-border p-2 sm:p-2.5 shadow-2xl flex flex-col justify-center items-center text-center">
                <div className="flex items-center justify-center gap-1 mb-1 bg-brand-primary/10 border border-brand-primary/20 px-1.5 py-0.5 text-brand-primary">
                  <Star className="h-2.5 w-2.5 fill-brand-primary text-brand-primary" />
                  <span className="text-[10px] font-mono font-black text-brand-text leading-none">4.9</span>
                </div>
                <h5 className="text-[6.5px] sm:text-[7px] font-mono font-black text-brand-text tracking-[0.15em] uppercase mb-0.5">
                  Credentials
                </h5>
                <p className="text-[6px] sm:text-[6.5px] text-brand-muted tracking-widest uppercase font-mono font-bold leading-normal">
                  500+ Reviews
                </p>
              </div> */}
            </div>

            <div className="relative w-[46%] shrink-0">
              <div className="relative aspect-[3/4] rounded-none overflow-hidden border border-brand-border shadow-2xl">
                <img
                  src={content.certification_photo}
                  alt={`${content.coach_name} certification`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Bio & Qualifications Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-brand-primary uppercase block mb-3">
              THE INTENSITY ARCHITECT
            </span>
            <h2 className="text-4xl md:text-6xl font-serif italic font-normal tracking-tight text-brand-text mb-2 leading-tight">
              Meet Coach <span className="text-brand-primary">Surya</span>
            </h2>
            <p className="text-brand-muted font-mono text-[10px] tracking-[0.2em] uppercase mb-8 font-bold">
              {content.coach_title}
            </p>

            <div className="space-y-6 text-brand-muted font-sans text-sm md:text-base leading-relaxed font-light">
              <h3 className="text-lg font-normal text-brand-text font-serif italic tracking-tight">
                {content.bio_heading}
              </h3>
              <p>{content.bio_paragraph_1}</p>
            </div>

            <div className="space-y-6 pt-8 text-brand-muted font-sans text-sm md:text-base leading-relaxed font-light">
              <p className="text-xl font-normal text-brand-text font-serif italic tracking-tight">
                <span className="text-brand-primary text-lg">"</span> Strength isn't built overnight.
                It's built through consistency, discipline, and the courage to begin.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights + CTA strip */}
        <div className="mt-14 md:mt-16 pt-10 border-t border-brand-border">
          {/* Highlights mini-grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8 mb-10">
            {highlights.map((h, idx) => {
              const Icon = h.icon;
              return (
                <div key={idx} className="flex flex-col items-start gap-2.5">
                  <div className="h-8 w-8 md:h-9 md:w-9 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary flex items-center justify-center shrink-0">
                    <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={2} />
                  </div>
                  <h5 className="text-[11px] md:text-xs font-bold text-brand-text leading-snug tracking-tight">
                    {h.title}
                  </h5>
                  <p className="text-[10px] md:text-[11px] text-brand-muted leading-relaxed font-light">
                    {h.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-brand-border">
            <motion.button
              onClick={onCtaClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 bg-brand-primary text-white pl-6 pr-2 py-2 rounded-full shadow-xl border border-brand-primary cursor-pointer transition-all duration-300"
            >
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] font-mono">
                Train With Surya
              </span>
              <span className="w-8 h-8 rounded-full bg-white text-brand-primary flex items-center justify-center shrink-0">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
            </motion.button>

            <button
              onClick={scrollToTransformations}
              className="inline-flex items-center gap-2.5 group cursor-pointer"
            >
              <span className="h-8 w-8 rounded-full border border-brand-text/20 flex items-center justify-center text-brand-text group-hover:border-brand-primary group-hover:text-brand-primary transition-colors shrink-0">
                <Play className="h-3 w-3 fill-current ml-0.5" />
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[9px] font-mono text-brand-muted uppercase tracking-widest">
                  My Client Page
                </span>
                <span className="text-[11px] md:text-xs font-mono font-bold uppercase tracking-widest text-brand-text group-hover:text-brand-primary transition-colors">
                  More Client Transformations
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}