'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const heroBanners = [
  {
    id: 'banner-french-perfume',
    eyebrow: 'FRENCH PERFUME — AUTHENTIC LUXURY FRAGRANCE',
    headline: 'A Signature Scent. An Unforgettable Impression.',
    subtitle: 'Discover fragrances that express your personality, elevate your presence, and make every moment memorable. Nature-inspired French luxury with 14+ hours of lasting sillage.',
    primaryCtaText: 'SHOP THE COLLECTION',
    primaryLink: '/shop',
    secondaryCtaText: 'DISCOVER YOUR SCENT',
    secondaryLink: '/product/fp-08',
    bgGradient: 'from-[#0D2619]/95 via-[#153B27]/85 to-transparent',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=85&w=1920',
    tag: 'Affordable Luxury',
    concentration: 'Extrait de Parfum (32% Pure Oil)'
  },
  {
    id: 'banner-erba-gold',
    eyebrow: 'FRENCH PERFUME — SIGNATURE COLLECTION',
    headline: 'Erba Gold Impérial',
    subtitle: 'A golden symphony of sun-ripened Sicilian lemon, Calabrian bergamot, and velvety amber. Crafted to turn heads and leave an indelible lasting mark.',
    primaryCtaText: 'EXPLORE ERBA GOLD',
    primaryLink: '/product/fp-erba-gold',
    secondaryCtaText: 'VIEW CITRUS & WOODS',
    secondaryLink: '/shop?category=citrus-aromatic',
    bgGradient: 'from-[#0A1F14]/95 via-[#153B27]/80 to-transparent',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=85&w=1920',
    tag: 'Iconic Bestseller',
    concentration: 'Extrait de Parfum (16+ Hours Sillage)'
  },
  {
    id: 'banner-elegance-citrus',
    eyebrow: 'FRENCH PERFUME — DUO OF DISTINCTION',
    headline: 'Bold Citrus & Elegance',
    subtitle: 'From exhilarating blood orange and crushed juniper to timeless Provençal jasmine and soft cashmere woods. Affordable luxury crafted for confident impressions.',
    primaryCtaText: 'SHOP BESTSELLERS',
    primaryLink: '/shop?filter=bestseller',
    secondaryCtaText: 'DISCOVER FOR HER',
    secondaryLink: '/shop?gender=women',
    bgGradient: 'from-[#101310]/95 via-[#153B27]/80 to-transparent',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=85&w=1920',
    tag: 'Pure Haute Luxe',
    concentration: 'Handcrafted Flacons'
  },
  {
    id: 'banner-discovery-set',
    eyebrow: 'FRENCH PERFUME — AT-HOME WARDROBE',
    headline: 'The Discovery Coffret (5 x 10 ml)',
    subtitle: 'Experience our 5 signature Extrait de Parfum creations in luxury travel flacons. Includes an exclusive ₹1,000 voucher redeemable towards your full-sized bottle.',
    primaryCtaText: 'CLAIM DISCOVERY SET · ₹1,899',
    primaryLink: '/product/fp-08',
    secondaryCtaText: 'LEARN MORE',
    secondaryLink: '/shop',
    bgGradient: 'from-[#0D2619]/95 via-[#153B27]/80 to-transparent',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=85&w=1920',
    tag: 'Includes ₹1,000 Voucher',
    concentration: '5 Signature Extraits'
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Autoplay banner transition every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-full bg-[#101310] overflow-hidden min-h-[500px] sm:min-h-[560px] lg:min-h-[640px] flex items-center shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      {heroBanners.map((banner, index) => {
        const isActive = currentSlide === index;
        return (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Photograph - Edge-to-Edge */}
            <div className="absolute inset-0">
              <Image
                src={banner.image}
                alt={banner.headline}
                fill
                priority={index === 0}
                className={`object-cover transition-transform duration-7000 ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                sizes="100vw"
              />
              {/* Cinematic Forest Green Vignette for Text Legibility */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101310] via-black/40 to-transparent" />
            </div>

            {/* Banner Content Layout - Bottom-aligned for cinematic editorial impact */}
            <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 flex items-end pb-12 sm:pb-16 lg:pb-20">
              <div className="w-full max-w-2xl text-white pt-6 pb-2 pl-1 sm:pl-6 pr-2 space-y-3.5 sm:space-y-5">
                
                {/* Eyebrow & Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D5B85A]/20 border border-[#D5B85A]/40 text-[#D5B85A] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
                    <Sparkles className="w-3 h-3 text-[#D5B85A]" />
                    <span>{banner.eyebrow}</span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[#F7F4EC]/75 uppercase px-2 py-0.5 rounded bg-black/40 border border-white/10 hidden sm:inline-block">
                    {banner.tag}
                  </span>
                </div>

                {/* Headline & Description */}
                <div className="space-y-2 sm:space-y-3">
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1] drop-shadow-md">
                    {banner.headline}
                  </h1>

                  <p className="text-xs sm:text-base text-[#F7F4EC]/90 max-w-md lg:max-w-xl leading-relaxed font-light drop-shadow-sm line-clamp-3 sm:line-clamp-none">
                    {banner.subtitle}
                  </p>

                  <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[#D5B85A] uppercase pt-1">
                    Signature Formulation: <span className="text-white font-medium">{banner.concentration}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-2.5 sm:gap-4">
                  <Link
                    href={banner.primaryLink}
                    className="inline-flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-[#D5B85A] hover:bg-[#C5A543] text-[#153B27] text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] group"
                  >
                    <span>{banner.primaryCtaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#153B27] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={banner.secondaryLink}
                    className="inline-flex items-center gap-2 px-4 sm:px-7 py-3 sm:py-4 bg-[#153B27]/80 hover:bg-[#153B27] backdrop-blur-md text-[#F7F4EC] text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase rounded-xl border border-[#D5B85A]/40 transition-all hover:border-[#D5B85A]"
                  >
                    <span>{banner.secondaryCtaText}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Prev / Next Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/30 hover:bg-[#153B27] text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all hidden sm:flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/30 hover:bg-[#153B27] text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all hidden sm:flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Pagination Dots at bottom of banner */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {heroBanners.map((_, index) => {
          const isActive = currentSlide === index;
          return (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full h-2 ${
                isActive
                  ? 'w-8 bg-[#D5B85A] shadow-md'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
