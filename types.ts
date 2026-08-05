/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HeroContent {
  headline: string;
  subheadline: string;
  background_gif: string;
  desktop_image: string;
  mobile_image: string;
  cta_text: string;
}

export interface FloatingCtaContent {
  button_text: string;
}

export interface TransformationItem {
  img: string;
  name: string;
  desc: string;
  stage?: string;
  duration?: string;
  program?: string;
}

export interface AboutContent {
  coach_name: string;
  coach_title: string;
  coach_photo: string;
  certification_photo: string;
  bio_heading: string;
  bio_paragraph_1: string;
  bio_paragraph_2: string;
}

export interface VideoContent {
  youtube_id: string;
  video_title: string;
}

export interface ReviewItem {
  text: string;
  author: string;
}

export interface ProgramBenefit {
  icon: string;
  title: string;
  text: string;
}

export interface ProgramContent {
  section_title: string;
  section_subtitle: string;
  supporting_image: string;
  points: ProgramBenefit[];
}

export interface FooterContent {
  instagram_url: string;
  youtube_url: string;
  contact_email: string;
  contact_phone: string;
  copyright: string;
  secondary_cta_text: string;
  youtube_cta_text: string;
}

export interface VideoTestimonialItem {
  athlete: string;
  badge: string;
  videoDuration: string;
  weekLabel: string;
  statHeadline: string;
  statSubtext: string;
  desc: string;
  videoId: string;
}

export interface VideoTestimonialsContent {
  section_eyebrow: string;
  section_title: string;
  section_subtitle: string;
  items: VideoTestimonialItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  section_eyebrow: string;
  section_title: string;
  section_subtitle: string;
  items: FaqItem[];
}

export interface WebsiteContent {
  hero: HeroContent;
  floating_cta: FloatingCtaContent;
  transformations: TransformationItem[];
  about: AboutContent;
  video: VideoContent;
  reviews: ReviewItem[];
  program: ProgramContent;
  footer: FooterContent;
  videoTestimonials: VideoTestimonialsContent;
  faq: FaqContent;
}