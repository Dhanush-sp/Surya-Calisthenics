/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface ReviewsProps {}

export default function Reviews(_: ReviewsProps) {
  const items = [
    {
      text: "Able to gain some shape in shoulder and chest, I realized an increase in hand power and can do 1 to 2 pullups now; before starting I could not do even one. I also saw strength gains in my thighs, though my core still needs work. Overall, visible improvement in some parts; I need to stay consistent 5 days a week to see more positives.",
      author: 'Basker (42yr old)'
    },
    {
      text: "It's been 3 months of a great journey into the calisthenics world with you. I was skeptical about online coaching at first, but now I feel very happy with the decision. You analyzed my workouts and tailored every exercise, making me comfortable and confident. Thank you for pushing my limits and helping me unlock new skills.",
      author: 'Sidharth (32yr old)'
    },
    {
      text: "These two months with coach Surya have been amazing. My endurance, flexibility, and strength improved a lot, and I learned the correct form for every exercise plus calisthenics basics like frog pose. This journey is already amazing and there is a long way to go.",
      author: 'Yasin (30yr old)'
    },
    {
      text: "Intha two months ennaku nalla challenge ah irunthuchi. Everyday pain feel panna atha enjoy panna, every midnight ennoda kai semma pain tharum but I will not stop. Naa strong ah irukken nu feel pandren. I can feel my body shape changing and my blood sugar is under control. Totally I feel so happy.",
      author: 'Pooja (19yr old)'
    },
    {
      text: "Overall, nice experience for the first 3 months bro. I saw better changes than a year at gym without taking protein supplements. Weekly workout variation made it more interesting and motivating. Calisthenics became a stress buster while I handle study pressure, and I am renewing for another 3 months.",
      author: 'Kumar (28yr old)'
    },
    {
      text: "After just 12 classes, I cannot thank Surya enough for the incredible change I’ve experienced. I was unsure of my strength and flexibility at first, but his expertise, patience, and motivation changed my perspective on fitness. Moves that once seemed impossible, like pull-ups, now feel within reach.",
      author: 'Anonymous (35yr old)'
    }
  ];

  const total = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragStartXRef = useRef<number | null>(null);

  const goTo = (index: number) => {
    setCurrentIndex(((index % total) + total) % total);
  };

  const handlePrev = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);

  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  // Simple threshold-based swipe: measure start/end X on pointerdown/pointerup.
  // No setPointerCapture here on purpose — capturing the pointer would retarget
  // pointerup away from the mini-card buttons and silently break their onClick.
  const handleSwipeStart = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartXRef.current = e.clientX;
  };

  const handleSwipeEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    const delta = e.clientX - dragStartXRef.current;
    dragStartXRef.current = null;

    if (Math.abs(delta) < 50) return; // treat as a click/tap, not a swipe
    if (delta > 0) handlePrev();
    else handleNext();
  };

  const renderStars = (size: string) => (
    <div className="flex text-brand-primary gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${size} fill-current`} />
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-brand-card overflow-hidden relative border-t border-b border-brand-border" id="reviews">

      {/* Section Header */}
      <div className="max-w-3xl mx-auto px-6 mb-16 text-center">
        <span className="text-[11px] md:text-xs font-mono font-bold tracking-[0.4em] text-brand-primary uppercase block mb-4">
          Testimonials
        </span>
        <h2 className="text-4xl md:text-6xl font-serif italic tracking-tight text-brand-text mb-5">
          What My Athletes Say
        </h2>
        <p className="text-brand-muted text-sm md:text-base font-sans font-light leading-relaxed max-w-xl mx-auto">
          Every review reflects a journey of consistency, discipline, and progress. Hear directly from athletes who transformed their strength, confidence, and performance through personalized coaching.
        </p>
      </div>

      {/* Spotlight Carousel */}
      <div className="relative max-w-6xl mx-auto px-4">

        {/* Nav Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-white text-brand-primary shadow-xl transition-transform hover:scale-105 cursor-pointer"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-white text-brand-primary shadow-xl transition-transform hover:scale-105 cursor-pointer"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>

        {/* Three-slot row: muted prev — spotlighted current — muted next */}
        <div
          onPointerDown={handleSwipeStart}
          onPointerUp={handleSwipeEnd}
          className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10 touch-pan-y select-none py-6"
          style={{ touchAction: 'pan-y' }}
        >
          {/* Prev (muted) card */}
          <AnimatePresence initial={false}>
            <motion.button
              key={`prev-${prevIndex}`}
              type="button"
              onClick={handlePrev}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileHover={{ opacity: 0.75 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="hidden sm:flex relative flex-col text-left w-[200px] md:w-[250px] shrink-0 bg-brand-card border border-brand-border/60 rounded-none p-5 md:p-6 mt-8 opacity-50 scale-[0.92] shadow-sm cursor-pointer"
              aria-label={`View testimonial from ${items[prevIndex].author}`}
            >
              <Quote className="absolute right-4 top-4 h-7 w-7 text-brand-primary/5 pointer-events-none" />
              <div className="mb-3">{renderStars('h-2.5 w-2.5')}</div>
              <p className="text-brand-text text-xs leading-relaxed italic font-light line-clamp-5 mb-4">
                "{items[prevIndex].text}"
              </p>
              <div className="flex items-center gap-2 border-t border-brand-border pt-3 mt-auto">
                <div className="h-6 w-6 flex items-center justify-center bg-brand-primary text-white text-[9px] font-bold font-mono uppercase">
                  {items[prevIndex].author.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-[11px] font-bold text-brand-text">{items[prevIndex].author}</span>
              </div>
            </motion.button>
          </AnimatePresence>

          {/* Active (spotlighted) card */}
          <AnimatePresence initial={false}>
            <motion.div
              key={`current-${currentIndex}`}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -10 }}
              transition={{ duration: 0.42, ease: 'easeOut' }}
              className="relative z-20 w-[280px] xs:w-[320px] sm:w-[380px] md:w-[440px] shrink-0 bg-white border border-brand-border rounded-none p-7 md:p-9 shadow-2xl flex flex-col"
            >
              <Quote className="absolute right-6 top-6 md:right-7 md:top-7 h-10 w-10 md:h-12 md:w-12 text-brand-primary/5 pointer-events-none" />
              <div className="mb-5">{renderStars('h-4 w-4 md:h-[18px] md:w-[18px]')}</div>
              <p className="text-brand-text text-sm md:text-base leading-relaxed italic font-sans font-light mb-8">
                "{items[currentIndex].text}"
              </p>
              <div className="flex items-center gap-3 border-t border-brand-border pt-5 mt-auto">
                <div className="h-9 w-9 flex items-center justify-center bg-brand-primary text-white text-xs font-bold font-mono uppercase">
                  {items[currentIndex].author.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-sm font-sans font-semibold text-brand-text">{items[currentIndex].author}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next (muted) card */}
          <AnimatePresence initial={false}>
            <motion.button
              key={`next-${nextIndex}`}
              type="button"
              onClick={handleNext}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileHover={{ opacity: 0.75 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="hidden sm:flex relative flex-col text-left w-[200px] md:w-[250px] shrink-0 bg-brand-card border border-brand-border/60 rounded-none p-5 md:p-6 mt-8 opacity-50 scale-[0.92] shadow-sm cursor-pointer"
              aria-label={`View testimonial from ${items[nextIndex].author}`}
            >
              <Quote className="absolute right-4 top-4 h-7 w-7 text-brand-primary/5 pointer-events-none" />
              <div className="mb-3">{renderStars('h-2.5 w-2.5')}</div>
              <p className="text-brand-text text-xs leading-relaxed italic font-light line-clamp-5 mb-4">
                "{items[nextIndex].text}"
              </p>
              <div className="flex items-center gap-2 border-t border-brand-border pt-3 mt-auto">
                <div className="h-6 w-6 flex items-center justify-center bg-brand-primary text-white text-[9px] font-bold font-mono uppercase">
                  {items[nextIndex].author.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-[11px] font-bold text-brand-text">{items[nextIndex].author}</span>
              </div>
            </motion.button>
          </AnimatePresence>
        </div>

        {/* Dot Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2 w-2 rounded-full transition-colors duration-300 cursor-pointer ${
                index === currentIndex ? 'bg-brand-primary' : 'bg-brand-border'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-brand-muted">
        <span>{currentIndex + 1} / {total}</span>
        <span>Swipe or use arrows to browse.</span>
      </div>
    </section>
  );
}