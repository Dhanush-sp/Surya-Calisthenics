/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Film,
  Play,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-react';

const AUTO_SCROLL_SPEED = 0.55;

const DEFAULT_VIDEO_TESTIMONIALS = {
  section_eyebrow: 'Clients Progress Library',
  section_title: 'ATHLETE EVOLUTION',
  section_subtitle: 'Drag or swipe the video horizontally to slide through progress clips.',
  items: [
    {
      athlete: 'Janani',
      badge: 'CROW POSE + HANDSTAND',
      videoId: 'l-OZl7l3Cw4',
      videoDuration: '2:14',
      weekLabel: 'WEEK 12 • MUSCLE-UP PROGRESS',
      statHeadline: 'Handstand Unlocked',
      statSubtext: 'Age 22',
      desc: 'Demonstrating solid front lever control and explosive muscle-up strength after consistent progressions.'
    },
    {
      athlete: 'Sudarson',
      badge: 'FROG STAND',
      videoId: 'K19dK9baLPA',
      videoDuration: '2:14',
      weekLabel: 'WEEK 12 • MUSCLE-UP PROGRESS',
      statHeadline: 'Frogstand',
      statSubtext: '4 Months',
      desc: 'Demonstrating solid front lever control and explosive muscle-up strength after consistent progressions.'
    },
    
    {
      athlete: 'Nandha',
      badge: 'HEADSTAND',
      videoId: 'isNndbvS5SI',
      videoDuration: '1:58',
      weekLabel: 'WEEK 16 • HANDSTAND BREAKTHROUGH',
      statHeadline: 'Built Headstand Progress',
      statSubtext: 'age 28',
      desc: 'Achieving clean freestanding holds and tight body alignment through targeted shoulder work.'
    },
    {
      athlete: 'Maalya',
      badge: 'ELBOW LEVER + CROW POSE',
      videoId: '3za9WFSy560',
      videoDuration: '1:58',
      weekLabel: 'WEEK 16 • HANDSTAND BREAKTHROUGH',
      statHeadline: 'Built Elbow Lever Progress',
      statSubtext: 'age 23',
      desc: 'Achieving clean freestanding holds and tight body alignment through targeted shoulder work.'
    },
    {
      athlete: 'Ishal',
      badge: 'MUSCLE-UP',
      videoId: 'yyx9FUqmfV4',
      videoDuration: '2:05',
      weekLabel: '15 age',
      statHeadline: 'Muscle-Up Unlocked',
      statSubtext: '15 age',
      desc: 'Executing fluid ring muscle-up flows and stable support holds after systematic strength buildup.'
    },
    {
      athlete: 'Ishal',
      badge: 'Backlever',
      videoId: 'YxOOe6O8k44',
      videoDuration: '1:52',
      weekLabel: 'WEEK 8 • MOBILITY UPGRADE',
      statHeadline: 'Pain-free overhead range',
      statSubtext: '15 years old',
      desc: 'Restoring overhead movement quality and smooth press patterns through mobility-focused training.'
    },
    {
      athlete: 'FEMALE',
      badge: 'CROW POSE',
      videoId: 'WHal9XiGz0I',
      videoDuration: '1:52',
      weekLabel: 'PROGRESS • CROW POSE',
      statHeadline: 'PROGRESS • CROW POSE',
      statSubtext: 'Basics to Intermediate',
      desc: 'Restoring overhead movement quality and smooth press patterns through mobility-focused training.'
    },
    {
      athlete: 'From USA',
      badge: 'HAND STAND',
      videoId: 'iS2dAzsx2qo',
      videoDuration: '1:52',
      weekLabel: 'PROGRESS • HANDSTAND',
      statHeadline: 'PROGRESS • HANDSTAND',
      statSubtext: 'USA',
      desc: 'Restoring overhead movement quality and smooth press patterns through mobility-focused training.'
    },
   
    {
      athlete: 'Nithyan',
      badge: 'FROG STAND',
      videoId: 'pO3EWeTYedE',
      videoDuration: '1:52',
      weekLabel: 'PROGRESS • HANDSTAND',
      statHeadline: 'PROGRESS • FROGSTAND',
      statSubtext: 'age 38',
      desc: 'Restoring overhead movement quality and smooth press patterns through mobility-focused training.'
    },
    {
      athlete: 'Nivin',
      badge: 'L-SIT',
      videoId: 'c0kR05isrYE',
      videoDuration: '1:52',
      weekLabel: 'PROGRESS • HANDSTAND',
      statHeadline: 'PROGRESS • L-SIT',
      statSubtext: 'age 33',
      desc: 'Restoring overhead movement quality and smooth press patterns through mobility-focused training.'
    }
  ]
};

export default function VideoTestimonials() {
  const { items, section_eyebrow, section_title, section_subtitle } = DEFAULT_VIDEO_TESTIMONIALS;

  if (items.length === 0) {
    return null;
  }

  // ---- Horizontal preview row (unchanged) ----
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const isDraggingRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const dragStartTranslateRef = useRef(0);
  const currentXRef = useRef(0);
  const targetXRef = useRef(0);
  const setWidthRef = useRef(0);
  const cardAdvanceRef = useRef(260);
  const initializedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const pointerDownPositionRef = useRef<{ x: number; y: number } | null>(null);
  const clickedIndexRef = useRef<string | null>(null);
  const clickThreshold = 8;

  // ---- Full-screen "Shorts" popup feed ----
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const scrollRafRef = useRef<number | null>(null);

  const loopedItems = items.length > 0 ? [...items, ...items, ...items] : [];

  const applyTransform = useCallback((x: number) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
    }
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const measure = () => {
      if (!trackRef.current) return;
      const width = trackRef.current.scrollWidth / 3;
      setWidthRef.current = width;
      cardAdvanceRef.current = width / items.length;

      if (!initializedRef.current && width > 0) {
        initializedRef.current = true;
        currentXRef.current = -width;
        targetXRef.current = -width;
        applyTransform(-width);
      }
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    if (trackRef.current) resizeObserver.observe(trackRef.current);
    window.addEventListener('resize', measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [items.length, applyTransform]);

  useEffect(() => {
    if (items.length === 0) return;

    const tick = () => {
      const width = setWidthRef.current;
      if (width > 0) {
        if (isDraggingRef.current) {
          currentXRef.current = targetXRef.current;
        } else {
          const diff = targetXRef.current - currentXRef.current;
          if (Math.abs(diff) > 0.05) {
            currentXRef.current += diff * 0.12;
          } else {
            currentXRef.current -= AUTO_SCROLL_SPEED;
            targetXRef.current = currentXRef.current;
          }
        }

        if (currentXRef.current <= -2 * width) {
          currentXRef.current += width;
          targetXRef.current += width;
          dragStartTranslateRef.current += width;
        } else if (currentXRef.current > 0) {
          currentXRef.current -= width;
          targetXRef.current -= width;
          dragStartTranslateRef.current -= width;
        }

        applyTransform(currentXRef.current);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [items.length, applyTransform]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    pointerStartXRef.current = e.clientX;
    dragStartTranslateRef.current = currentXRef.current;
    pointerDownPositionRef.current = { x: e.clientX, y: e.clientY };
    clickedIndexRef.current = (e.target as HTMLElement)
      .closest('[data-card-index]')
      ?.getAttribute('data-card-index') ?? null;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const delta = (e.clientX - pointerStartXRef.current) * 1.4;
    targetXRef.current = dragStartTranslateRef.current + delta;
  };

  const endDrag = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    pointerDownPositionRef.current = null;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerDownPositionRef.current && clickedIndexRef.current !== null) {
      const dx = e.clientX - pointerDownPositionRef.current.x;
      const dy = e.clientY - pointerDownPositionRef.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance <= clickThreshold) {
        setActiveIndex(Number(clickedIndexRef.current) % items.length);
        setIsMuted(false);
        setIsExpanded(true);
      }
    }

    endDrag();
    clickedIndexRef.current = null;
  };

  const handlePointerCancel = () => {
    endDrag();
    clickedIndexRef.current = null;
  };

  const nudgeSlide = (direction: 'prev' | 'next') => {
    const advance = cardAdvanceRef.current || 260;
    targetXRef.current += direction === 'prev' ? advance : -advance;
  };

  const originParam =
    typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';

  // Jump the popup feed to a given slide (used by the chevrons + keyboard nav).
  const scrollToSlide = (index: number) => {
    const el = feedRef.current;
    if (!el) return;
    const clamped = Math.min(Math.max(index, 0), items.length - 1);
    el.scrollTo({ top: clamped * el.clientHeight, behavior: 'smooth' });
  };

  const goToPrevSlide = () => scrollToSlide(activeIndex - 1);
  const goToNextSlide = () => scrollToSlide(activeIndex + 1);

  // Track which slide is currently snapped into view as the user scrolls the feed.
  const handleFeedScroll = () => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      const el = feedRef.current;
      if (!el) return;
      const slideHeight = el.clientHeight;
      if (!slideHeight) return;
      const idx = Math.round(el.scrollTop / slideHeight);
      const clamped = Math.min(Math.max(idx, 0), items.length - 1);
      setActiveIndex((prev) => (prev === clamped ? prev : clamped));
    });
  };

  // On open: lock page scroll and snap the feed to whichever video was tapped.
  useEffect(() => {
    if (!isExpanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const raf = requestAnimationFrame(() => {
      const el = feedRef.current;
      if (el) {
        el.scrollTo({ top: activeIndex * el.clientHeight, behavior: 'auto' });
      }
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(raf);
    };
    // Only re-run when the popup opens/closes — activeIndex here is intentionally
    // read once (the index set at click-time), not tracked as a scroll trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  // Nudge playback/mute state on the active iframe once it reports ready.
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data !== 'string') return;
      let data;
      try {
        data = JSON.parse(e.data);
      } catch {
        return;
      }

      if (data.event === 'onReady' && iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: isMuted ? 'mute' : 'unMute', args: '' }),
          '*'
        );
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activeIndex, isMuted]);

  useEffect(() => {
    if (!isExpanded) return;

    const tryUnmute = () => {
      if (!iframeRef.current?.contentWindow) return;
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
          '*'
        );
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: isMuted ? 'mute' : 'unMute', args: '' }),
          '*'
        );
      } catch (err) {
        // ignore
      }
    };

    tryUnmute();
    const t = window.setTimeout(tryUnmute, 300);
    return () => clearTimeout(t);
  }, [isExpanded, isMuted, activeIndex]);

  // Escape closes the popup; arrow keys move between videos.
  useEffect(() => {
    if (!isExpanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        goToNextSlide();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        goToPrevSlide();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, activeIndex]);

  return (
    <section className="py-14 md:py-20 bg-brand-bg text-brand-text relative border-b border-brand-border overflow-hidden" id="video-testimonials">
      <div className="max-w-4xl mx-auto px-6 mb-8 text-center">
        <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-[0.3em] text-brand-primary uppercase mb-1.5">
          <Film className="h-3 w-3 text-brand-primary" /> {section_eyebrow}
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif italic font-normal tracking-tight text-brand-text leading-tight">
          {section_title}
        </h2>
        <p className="text-brand-muted text-[11px] md:text-sm max-w-sm mx-auto mt-4 font-light">
          {section_subtitle}
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerCancel}
          onPointerCancel={handlePointerCancel}
          className={`relative overflow-hidden px-6 md:px-12 py-4 touch-pan-y ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
          style={{ touchAction: 'pan-y' }}
        >
          <div ref={trackRef} className="flex gap-4 md:gap-6 will-change-transform">
            {loopedItems.map((item, idx) => {
              const originalIndex = idx % items.length;
              return (
                <button
                  key={`${item.videoId}-${idx}`}
                  type="button"
                  data-card-index={originalIndex}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(originalIndex);
                      setIsMuted(false);
                      setIsExpanded(true);
                    }
                  }}
                  className="shrink-0 w-[160px] xs:w-[180px] sm:w-[200px] md:w-[250px] lg:w-[280px] aspect-[9/16] rounded-none overflow-hidden border border-brand-border bg-brand-card shadow-xl relative text-left"
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                    alt={item.athlete}
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute top-3 left-3 z-10 rounded-none bg-black/70 border border-white/15 px-2 py-1 text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-white">
                    {item.badge}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-brand-primary flex items-center justify-center shadow-xl border border-white/20"
                    >
                      <Play className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </motion.div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-32 sm:h-36 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4 pt-24">
                    <h3 className="text-sm md:text-base font-bold text-white leading-tight">{item.athlete}</h3>
                    <div className="mt-3 flex items-start gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-brand-primary">
                        <TrendingUp className="h-3.5 w-3.5" />
                      </div>
                      <div className="space-y-1 text-white/90 text-[9px] md:text-[11px] leading-snug">
                        <p className="font-semibold text-white">{item.statHeadline}</p>
                        <p className="text-zinc-300">{item.statSubtext}</p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => nudgeSlide('prev')}
          className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/15 border border-white/10 p-2 text-white shadow-xl hover:bg-white/20 transition-colors"
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => nudgeSlide('next')}
          className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/15 border border-white/10 p-2 text-white shadow-xl hover:bg-white/20 transition-colors"
          aria-label="Next testimonials"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-8">
        <div className="flex items-center justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-6 bg-brand-primary' : 'w-2 bg-brand-border'}`}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* Full-screen "Shorts" style popup — vertical scroll-snap feed  */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] bg-black"
            role="dialog"
            aria-modal="true"
            aria-label="Client progress video"
          >
            {/* Scrollable, snap-locked feed. Native swipe/scroll/wheel moves between videos. */}
            <div
              ref={feedRef}
              onScroll={handleFeedScroll}
              className="relative h-[100dvh] w-full overflow-y-auto overscroll-contain snap-y snap-mandatory [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none' }}
            >
              {items.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={`${item.videoId}-${idx}`}
                    className="relative h-[100dvh] w-full snap-start snap-always flex items-center justify-center"
                  >
                    {/* Video card: full-bleed on mobile, phone-framed on larger screens */}
                    <div className="relative h-full w-full sm:h-[92dvh] sm:max-h-[880px] sm:w-auto sm:aspect-[9/16] mx-auto bg-black overflow-hidden sm:border sm:border-white/10 sm:shadow-2xl">
                      {isActive ? (
                        <iframe
                          key={`${item.videoId}-${isMuted ? 'm' : 'u'}`}
                          ref={iframeRef}
                          src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${item.videoId}&controls=1&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&enablejsapi=1&origin=${originParam}`}
                          title={`${item.athlete} progression`}
                          allow="autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                          className="absolute inset-0 w-full h-full"
                          style={{ border: 'none' }}
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      ) : (
                        <div className="absolute inset-0">
                          <img
                            src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                            alt={item.athlete}
                            className="absolute inset-0 h-full w-full object-cover"
                            draggable={false}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-14 w-14 rounded-full bg-black/50 border border-white/20 flex items-center justify-center">
                              <Play className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Scrims for legibility — text/controls sit ON the video, never below it */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

                      {/* Athlete name + stats overlay — always visible, any screen size */}
                      <div
                        className="absolute inset-x-0 bottom-0 z-20 px-5 sm:px-6 pt-10"
                        style={{ paddingBottom: 'max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))' }}
                      >
                        {/* <p className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-brand-primary mb-2">
                          {item.weekLabel}
                        </p> */}
                        <h3 className="text-xl sm:text-2xl font-serif italic font-normal text-white leading-tight mb-3">
                          {item.athlete}
                        </h3>
                        <div className="flex items-start gap-2.5">
                          <div className="h-9 w-9 shrink-0 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-brand-primary">
                            <TrendingUp className="h-4 w-4" />
                          </div>
                          <div className="space-y-0.5 text-white/90 text-xs sm:text-sm leading-snug">
                            <p className="font-semibold text-white">{item.statHeadline}</p>
                            <p className="text-zinc-300">{item.statSubtext}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fixed top bar: slide count + close button — safe-area aware, always reachable */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between px-4 sm:px-6"
              style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
            >
              <span className="pointer-events-auto rounded-full bg-black/55 border border-white/15 px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest text-white">
                {activeIndex + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                aria-label="Close video"
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-black/55 border border-white/15 text-white transition-colors hover:bg-black/75 active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mute toggle — fixed position, unaffected by scroll or overlay text length */}
            <button
              type="button"
              onClick={() => setIsMuted((prev) => !prev)}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              className="absolute right-4 sm:right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 border border-white/15 text-white transition-colors hover:bg-black/75"
              style={{ bottom: 'max(6.5rem, calc(env(safe-area-inset-bottom) + 6rem))' }}
            >
              {isMuted ? (
                <VolumeX className="h-4.5 w-4.5 text-rose-400" />
              ) : (
                <Volume2 className="h-4.5 w-4.5 text-emerald-400" />
              )}
            </button>

            {/* Prev/next chevrons — desktop-friendly alternative to swipe/scroll */}
            <div className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 z-30 -translate-y-1/2 flex-col gap-3">
              <button
                type="button"
                onClick={goToPrevSlide}
                disabled={activeIndex === 0}
                aria-label="Previous video"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 border border-white/10 text-white shadow-xl transition-colors hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/15"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goToNextSlide}
                disabled={activeIndex === items.length - 1}
                aria-label="Next video"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 border border-white/10 text-white shadow-xl transition-colors hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/15"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}