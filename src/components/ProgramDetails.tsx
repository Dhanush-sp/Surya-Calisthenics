/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'motion/react';

const teamImage = new URL('../images/team.jpeg', import.meta.url).href;

interface ProgramDetailsProps {
  onCtaClick: () => void;
}

// Map string icon names to Lucide icons safely and elegantly
const getIconComponent = (iconName: string) => {
  const normalized = iconName.trim().toLowerCase();
  switch (normalized) {
    case 'users':
      return LucideIcons.Users;
    case 'flame':
      return LucideIcons.Flame;
    case 'shield':
      return LucideIcons.Shield;
    case 'zap':
      return LucideIcons.Zap;
    default:
      return LucideIcons.Target;
  }
};

export default function ProgramDetails({ onCtaClick }: ProgramDetailsProps) {
  const content = {
    eyebrow: 'COACHING THAT BUILDS MORE THAN MUSCLE',
    section_title: 'Inside the Coaching Experience',
    section_subtitle:
      'The people in the photo are my amazing students. We recently attended an event together, representing our discipline, our growth, and the strength of our community. Every session, every rep, and every step forward is a part of our journey to become stronger inside and out.',
    supporting_image: teamImage,
    points: [
      {
        icon: 'users',
        title: 'Personalized Coaching',
        text: 'Every student follows a personalized plan based on their goals, fitness level, and progress.'
      },
      {
        icon: 'Flame',
        title: 'Strength & Physique Development',
        text: 'We focus on building real strength, lean muscle, and athletic performance through proven methods.'
      },
      {
        icon: 'Shield',
        title: 'Mobility & Injury Prevention',
        text: 'Stay strong and pain-free with mobility training, injury prevention techniques, and recovery guidance.'
      },
      {
        icon: 'Zap',
        title: 'Community & Events',
        text: 'From workshops to live events, we grow, learn, and celebrate together as a community.'
      }
    ]
  };
  return (
    <section className="bg-white text-brand-text border-t border-brand-border" id="program">
      <div className="mx-auto max-w-[1240px] px-4 py-5 sm:py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
        <div className="overflow-hidden bg-white">
          <div className="relative aspect-[4/3] sm:aspect-[16/8] w-full bg-zinc-100">
            <img
              src={content.supporting_image}
              alt="Surya Calisthenics students at an event"
              referrerPolicy="no-referrer"
              loading="eager"
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="px-1 pb-2 pt-6 sm:pt-8 md:px-2 md:pt-10 lg:px-4 lg:pt-12">
            <div className="max-w-3xl">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-brand-primary">
                {content.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl md:text-6xl font-serif italic font-normal tracking-tight text-brand-text leading-tight">
                Inside the Coaching <span className='text-brand-primary'>Experience</span>
              </h2>
              <div className="mt-6 h-0.5 w-12 bg-[#ea1d1d]" />
              <div className="mt-6 max-w-3xl space-y-5 text-xs md:text-base leading-relaxed text-brand-muted font-sans font-light">
                <p>{content.section_subtitle}</p>
                <p>
                  Every session is designed to help you build measurable strength,
                  better movement, and the confidence to keep progressing long-term.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 xl:grid-cols-4 border-t border-l border-brand-border">
              {content.points.map((point, index) => {
                const IconComponent = getIconComponent(point.icon);

                return (
                  <motion.div
                    key={point.title}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="min-h-[185px] sm:min-h-[220px] border-r border-b border-brand-border px-4 py-5 sm:px-6 sm:py-8 md:px-7 md:py-9"
                  >
                    <div className="flex h-7 w-7 sm:h-11 sm:w-11 items-center justify-center text-brand-primary">
                      <IconComponent className="h-7 w-7 sm:h-10 sm:w-10 stroke-[1.8]" />
                    </div>
                    <h3 className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-serif italic font-normal tracking-tight text-brand-text leading-tight">
                      {point.title}
                    </h3>
                    <p className="mt-2 sm:mt-4 max-w-[250px] text-[11px] sm:text-xs md:text-sm leading-relaxed text-brand-muted font-sans font-light">
                      {point.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 sm:mt-12 rounded-[10px] border border-brand-border bg-white px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
              <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center text-brand-primary">
                    <LucideIcons.Users className="h-8 w-8 sm:h-10 sm:w-10 stroke-[1.8]" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif italic font-normal tracking-tight text-brand-text">
                      Join Our Community
                    </h3>
                    <p className="mt-2 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-brand-muted font-sans font-light">
                      Whether you&apos;re just starting or looking to level up, you&apos;ll
                      find the support, guidance, and community you need to succeed.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 sm:gap-4 lg:items-end">
                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="inline-flex items-center gap-3 sm:gap-4 rounded-[6px] bg-brand-primary px-5 sm:px-7 py-3.5 sm:py-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-brand-secondary"
                  >
                    Join Us Today
                    <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white text-brand-primary">
                      <LucideIcons.ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </span>
                  </button>
                  <p className="text-xs md:text-sm text-brand-muted font-sans font-light">
                    Train. Grow. Connect. Succeed-Together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
