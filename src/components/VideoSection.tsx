/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
// VideoSection content hardcoded
import { Film, Volume2, VolumeX } from 'lucide-react';

interface VideoSectionProps {}

export default function VideoSection(_: VideoSectionProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const content = { youtube_id: '78zo1AeWSc8', video_title: 'Calisthenics Masterclass & Progression Secrets' };
  const sectionRef = useRef<HTMLDivElement>(null);

  // The user's *intent*: do they want sound on, if the video is visible?
  // Default to true so the video unmuted when the section scrolls into view.
  const [wantsSound, setWantsSound] = useState(true);
  // Whether the video player is actually visible in the viewport right now.
  const [isInView, setIsInView] = useState(false);

  // Construct a secure, looping, chromeless YouTube embed URL.
  // autoplay=0         -> playback is driven manually via the IFrame API once the
  //                       section scrolls into view, not as soon as the iframe loads
  // controls=0        -> no play/pause/progress bar
  // disablekb=1       -> no keyboard interaction (space to pause, arrows to seek, etc.)
  // fs=0               -> no fullscreen button
  // iv_load_policy=3   -> no annotations
  // modestbranding=1   -> minimal YouTube logo
  // rel=0 + loop=1 + playlist=<same id> -> loops the same video instead of
  //                     showing the end-screen "related videos" grid
  // showinfo=0         -> (legacy) no title/uploader info
  // enablejsapi=1       -> required so we can postMessage play/pause/mute commands
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const embedUrl = `https://www.youtube.com/embed/${content.youtube_id}?autoplay=0&mute=1&loop=1&playlist=${content.youtube_id}&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&showinfo=0&enablejsapi=1&origin=${origin}`;

  // Send a command to the embedded YouTube player via postMessage,
  // following the YouTube IFrame API protocol.
  const postCommand = useCallback((func: 'mute' | 'unMute' | 'playVideo' | 'pauseVideo') => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args: [] }),
      'https://www.youtube.com'
    );
  }, []);

  // Actual audio state = user wants sound AND the video is currently on screen.
  const isAudible = wantsSound && isInView;

  // Sync the player's mute state whenever intent or visibility changes.
  useEffect(() => {
    postCommand(isAudible ? 'unMute' : 'mute');
  }, [isAudible, postCommand]);

  // Play only while the section is actually visible; pause the instant it
  // scrolls out of view, and resume automatically when the user scrolls back.
  useEffect(() => {
    postCommand(isInView ? 'playVideo' : 'pauseVideo');
  }, [isInView, postCommand]);

  // Watch for the video entering/leaving the viewport.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Consider it "in view" once at least half the player is visible.
        setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.5);
      },
      { threshold: [0, 0.5, 1] }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    setWantsSound((prev) => !prev);
  };

  return (
    <section className="py-24 bg-brand-bg text-brand-text relative border-b border-brand-border" id="video">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

        {/* Section Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-[0.3em] text-brand-primary uppercase mb-3">
            <Film className="h-3.5 w-3.5 text-brand-primary" /> INSIDE MY COACHING SYSTEM
          </span>
          <h2 className="text-4xl md:text-6xl font-serif italic font-normal tracking-tight text-brand-text">
            Train smarter <span className="text-brand-primary">Progress faster</span>
          </h2>
          <p className="text-brand-muted text-sm md:text-sm max-w-xl mx-auto mt-4 font-sans font-light">
            {content.video_title} — Discover the proven training methods, progressions, and coaching strategies I use to help athletes build real strength, master Basic to  advanced calisthenics skills, and achieve consistent results—without wasting time on ineffective workouts.
          </p>
        </div>

        {/* Video Player Frame with Stark Border */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-none shadow-3xl group"
        >
          {/* Shifting Border replaced with stark flat border */}
          <div className="relative rounded-none p-[1px] bg-brand-border">

            {/* The Actual Landscape Aspect-Video Player */}
            <div className="relative aspect-video w-full rounded-none overflow-hidden bg-black">
              <iframe
                ref={iframeRef}
                src={embedUrl}
                title={content.video_title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="absolute top-0 left-0 w-full h-full border-0"
              />

              {/*
                Transparent interaction-blocking overlay.
                Sits above the iframe and intercepts all clicks/taps so the
                user can never trigger YouTube's title bar, pause button,
                progress scrubber, or any other native chrome — the video
                simply plays through untouched.
              */}
              <div
                className="absolute top-0 left-0 w-full h-full z-10 cursor-default pointer-events-auto"
                aria-hidden="true"
              />

              {/* Custom mute/unmute control — the only interactive element allowed */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={wantsSound ? 'Mute video' : 'Unmute video'}
                aria-pressed={wantsSound}
                className="absolute bottom-3 right-3 z-20 flex items-center justify-center h-9 w-9 rounded-none bg-black/70 border border-white/20 text-white hover:bg-black/90 transition-colors backdrop-blur-sm"
              >
                {isAudible ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}