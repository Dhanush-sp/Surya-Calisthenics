/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Users,
  BadgeCheck,
  UserCheck,
  CalendarDays,
  Dumbbell,
  PersonStanding,
  Soup,
  MessageCircle,
  Instagram,
  Youtube,
  Menu,
} from 'lucide-react';

const heroImage = new URL('../images/hero-image.png', import.meta.url).href;

// lucide-react has no TikTok glyph — minimal inline icon so the social row matches the reference exactly.
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
  </svg>
);

type StatIcon = 'users' | 'badge' | 'user' | 'calendar';
type FeatureIcon = 'muscle' | 'skill' | 'nutrition' | 'support';
type SocialPlatform = 'instagram' | 'youtube' | 'tiktok';

interface HeroStat {
  icon: StatIcon;
  value: string;
  label: string;
}

interface HeroFeature {
  icon: FeatureIcon;
  title: string;
  text: string;
}

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

interface HeroContentV2 {
  logoScript: string;
  logoBold: string;
  bgWord: string;
  headlineLine1: string;
  headlineBlackWord: string;
  headlineRedWord: string;
  subheadline: string;
  paragraph: string;
  image: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  stats: HeroStat[];
  features: HeroFeature[];
  followLabel: string;
  socials: SocialLink[];
  handle: string;
}

// Default copy/content — matches the reference mockup 1:1. Override via the `content` prop.
const DEFAULT_HERO: HeroContentV2 = {
  logoScript: 'Surya',
  logoBold: 'CALISTHENICS',
  bgWord: 'STRENGTH',
  headlineLine1: 'Build Strength.',
  headlineBlackWord: 'Master',
  headlineRedWord: 'Calisthenics.',
  subheadline: 'Personalized coaching. Real results. Stronger every day.',
  paragraph:
    'I help you build real strength, unlock elite skills, and transform your body through structured calisthenics training, nutrition guidance, and 1-on-1 support tailored to your goals.',
  image: heroImage,
  primaryCtaText: 'Start Your Transformation',
  secondaryCtaText: 'View Client Results',
  stats: [
    { icon: 'users', value: '125K+', label: 'Community on Instagram' },
    { icon: 'badge', value: 'WSWCF', label: 'Certified Calisthenics Coach' },
    { icon: 'user', value: '100+', label: 'Students Trained' },
    { icon: 'calendar', value: '5+', label: 'Years of Training Experience' },
  ],
  features: [
    { icon: 'muscle', title: 'Build Muscle & Strength', text: 'Gain lean muscle and functional strength with bodyweight training.' },
    { icon: 'skill', title: 'Master Advanced Skills', text: 'Muscle-ups, handstands, front lever, planche & more.' },
    { icon: 'nutrition', title: 'Nutrition Guidance', text: 'Personalized diet plans to fuel your goals and lifestyle.' },
    { icon: 'support', title: '1-on-1 Support', text: 'Direct coaching, regular feedback and full accountability.' },
  ],
  followLabel: 'Follow My Journey',
  socials: [
    { platform: 'instagram', url: 'https://instagram.com/calisthenicscoach' },
    { platform: 'youtube', url: 'https://www.youtube.com' },
    { platform: 'tiktok', url: 'https://www.tiktok.com' },
  ],
  handle: '/SURYA_CALISTHENICS',
};

const StatIconMap: Record<StatIcon, typeof Users> = {
  users: Users,
  badge: BadgeCheck,
  user: UserCheck,
  calendar: CalendarDays,
};

const FeatureIconMap: Record<FeatureIcon, typeof Dumbbell> = {
  muscle: Dumbbell,
  skill: PersonStanding,
  nutrition: Soup,
  support: MessageCircle,
};

const SocialIconMap: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: TikTokIcon,
};

interface HeroProps {
  onPrimaryCtaClick: () => void;
  onSecondaryCtaClick: () => void;
}

export default function Hero({ onPrimaryCtaClick, onSecondaryCtaClick }: HeroProps) {
  const c: HeroContentV2 = DEFAULT_HERO;

  return (
    <section className="relative w-full bg-white overflow-hidden" id="hero">

      {/* ============================================================ */}
      {/* MOBILE / TABLET LAYOUT (below lg) — matches the reference    */}
      {/* mockup: top nav bar, then image+stats row, then full-width   */}
      {/* headline/copy/CTAs stacked underneath.                       */}
      {/* ============================================================ */}
      <div className="lg:hidden">

        {/* Top nav bar: logo left, hamburger right */}
        <div className="flex items-center justify-between px-5 pt-5 pb-1">
          <div className="text-left leading-none">
            <span className="font-script block text-xl sm:text-2xl text-brand-primary leading-none">
              {c.logoScript}
            </span>
            <span className="block text-[9px] sm:text-[10px] font-extrabold tracking-[0.25em] text-brand-text mt-1">
              {c.logoBold}
            </span>
          </div>
          {/* Placeholder trigger only — wire this up to a mobile nav drawer if/when one exists */}
          {/* <button
            type="button"
            aria-label="Open menu"
            className="p-2 -mr-2 text-brand-text cursor-pointer"
          >
            <Menu className="h-6 w-6" strokeWidth={2} />
          </button> */}
        </div>

        {/* Image (left, bleeds to screen edge) + vertically-stacked stats (right) */}
        <div className="flex flex-row items-stretch mt-3">
          <div className="w-[62%] relative h-[380px] sm:h-[440px] overflow-hidden shrink-0 bg-neutral-50">
            <img
              src={c.image}
              alt="Athlete performing an explosive calisthenics bar exercise"
              referrerPolicy="no-referrer"
              className="relative w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center gap-4 sm:gap-5 pl-4 pr-5 min-w-0">
            {c.stats.map((stat, idx) => {
              const Icon = StatIconMap[stat.icon];
              const isLast = idx === c.stats.length - 1;
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 ${
                    isLast ? '' : 'pb-4 sm:pb-5 border-b border-brand-border'
                  }`}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-brand-primary shrink-0 mt-0.5" strokeWidth={1.6} />
                  <div className="leading-tight">
                    <div className="text-base sm:text-lg font-extrabold text-brand-text leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-brand-muted font-light leading-snug mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Headline + copy + CTAs — full width, below the image/stats row */}
        <div className="px-5 pt-7 pb-7">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-display uppercase text-brand-text text-4xl xs:text-5xl sm:text-6xl leading-[0.98] tracking-tight"
          >
            <span className="block">{c.headlineLine1}</span>
            <span className="block">
              {c.headlineBlackWord} <span className="text-brand-primary">{c.headlineRedWord}</span>
            </span>
          </motion.h1>

          <div className="h-1 w-12 bg-brand-primary mt-4 mb-4" />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-brand-muted font-bold uppercase tracking-[0.12em] text-xs sm:text-sm mb-3"
          >
            {c.subheadline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
            className="text-brand-muted text-sm leading-relaxed font-light mb-6"
          >
            {c.paragraph}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease: 'easeOut' }}
            className="flex flex-col gap-3"
          >
            <button
              onClick={onPrimaryCtaClick}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-lg transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <span>{c.primaryCtaText}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onSecondaryCtaClick}
              className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-brand-text font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-lg border-2 border-brand-text transition-all active:scale-95 cursor-pointer"
            >
              <span>{c.secondaryCtaText}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP LAYOUT (lg and up) — unchanged from the original      */}
      {/* ============================================================ */}
      <div className="hidden lg:block">
        <div className="absolute top-6 right-8 z-30 text-right bg-white/85 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
          <span className="font-script block text-2xl text-brand-primary leading-none">
            {c.logoScript}
          </span>
          <span className="block text-[10px] font-extrabold tracking-[0.35em] text-brand-text mt-1">
            {c.logoBold}
          </span>
        </div>

        <div className="max-w-[1600px] mx-auto grid grid-cols-12 items-stretch">
          <div className="relative col-span-5 h-auto min-h-[560px] overflow-hidden bg-neutral-50 pl-6">
            <span
              aria-hidden="true"
              className="block absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-center font-display text-[8rem] xl:text-[10rem] text-neutral-100 tracking-tight select-none whitespace-nowrap"
            >
              {c.bgWord}
            </span>
            <img
              src={c.image}
              alt="Athlete performing an explosive calisthenics bar exercise"
              referrerPolicy="no-referrer"
              className="relative w-full h-full object-cover object-center"
            />
          </div>

          <div className="col-span-7 flex flex-col justify-center px-16 py-6">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="font-display uppercase text-brand-text text-7xl leading-[0.95] tracking-tight"
            >
              <span className="block">{c.headlineLine1}</span>
              <span className="block">
                {c.headlineBlackWord} <span className="text-brand-primary">{c.headlineRedWord}</span>
              </span>
            </motion.h1>

            <div className="h-1 w-14 bg-brand-primary mt-4 mb-4" />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: 'easeOut' }}
              className="text-brand-muted font-bold uppercase tracking-[0.15em] text-sm mb-3"
            >
              {c.subheadline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: 'easeOut' }}
              className="text-brand-muted text-base leading-relaxed max-w-xl font-light mb-5"
            >
              {c.paragraph}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: 'easeOut' }}
              className="grid grid-cols-4 gap-y-4 gap-x-3 mb-5"
            >
              {c.stats.map((stat, idx) => {
                const Icon = StatIconMap[stat.icon];
                return (
                  <div key={idx} className="relative flex items-center gap-2">
                    {idx > 0 && (
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-px h-8 bg-brand-border" />
                    )}
                    <Icon className="h-6 w-6 text-brand-primary shrink-0" strokeWidth={1.75} />
                    <div className="leading-tight">
                      <div className="text-sm font-extrabold text-brand-text whitespace-nowrap">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-brand-muted font-light">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <div className="h-px w-full bg-brand-border mb-5" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52, ease: 'easeOut' }}
              className="flex items-center gap-4"
            >
              <button
                onClick={onPrimaryCtaClick}
                className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-lg transition-all active:scale-95 cursor-pointer shadow-lg"
              >
                <span>{c.primaryCtaText}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onSecondaryCtaClick}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-brand-text font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-lg border-2 border-brand-text transition-all active:scale-95 cursor-pointer"
              >
                <span>{c.secondaryCtaText}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dark features bar — shared across breakpoints, unchanged */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-zinc-950 text-white"
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 py-5 lg:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-white/10">
            {c.features.map((feature, idx) => {
              const Icon = FeatureIconMap[feature.icon];
              return (
                <div key={idx} className="flex items-start gap-3 lg:px-6 lg:first:pl-0">
                  <Icon className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" strokeWidth={1.75} />
                  <div>
                    <h4 className="text-xs md:text-sm font-extrabold uppercase tracking-wide mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-[11px] md:text-xs text-zinc-400 font-light leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-px w-full bg-white/10 my-5" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-zinc-400 uppercase">
              {c.followLabel}
            </span>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                {c.socials.map((social, idx) => {
                  const Icon = SocialIconMap[social.platform];
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.platform}
                      className="h-8 w-8 flex items-center justify-center bg-brand-primary/10 border border-brand-primary/30 hover:bg-brand-primary/20 rounded-md text-brand-primary transition-all"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  );
                })}
              </div>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="text-xs md:text-sm font-mono font-bold tracking-widest text-white">
                {c.handle}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}