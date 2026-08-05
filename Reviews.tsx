/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';

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

  // Duplicate the list of reviews to create a seamless infinite loop visual effect
  const marqueeItems = [...items, ...items, ...items];

  return (
    <section className="py-24 bg-brand-bg overflow-hidden relative border-t border-b border-brand-border" id="reviews">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-brand-primary uppercase block mb-3">
          ATHLETE TESTIMONIALS
        </span>
        <h2 className="text-4xl md:text-6xl font-serif italic font-normal tracking-tight text-brand-text">
          What My Athletes Say
        </h2>
        <p className="text-brand-muted text-sm max-w-lg mx-auto mt-4 font-sans font-light">
          Every review reflects a journey of consistency, discipline, and progress. Hear directly from athletes who transformed their strength, confidence, and performance through personalized coaching.
        </p>
      </div>

      {/* Infinite Horizontal Marquee Container */}
      <div className="relative w-full overflow-hidden flex py-4 pointer-events-auto">
        
        {/* Soft edge gradients to fade out the marquee on left and right borders */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
          {marqueeItems.map((review, idx) => (
            <div
              key={idx}
              className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 bg-brand-card border border-brand-border rounded-none p-6 md:p-7 relative flex flex-col justify-between shadow-xl select-none whitespace-normal transition-all duration-300 hover:border-brand-primary/40"
            >
              {/* Background Quote Icon Accent */}
              <Quote className="absolute right-5 top-5 h-10 w-10 text-brand-primary/5 pointer-events-none" />

              {/* Red Star Rating */}
              <div className="flex text-brand-primary gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-brand-text font-sans text-sm md:text-base leading-relaxed mb-6 italic font-light">
                "{review.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-2.5 mt-auto border-t border-brand-border pt-4">
                <div className="h-7 w-7 rounded-none bg-brand-primary flex items-center justify-center text-[10px] font-bold text-white font-mono border border-brand-primary uppercase">
                  {review.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-text font-sans">
                    {review.author}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Embedded CSS for marquee animation and mask styling */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}
