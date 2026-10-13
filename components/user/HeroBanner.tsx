'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

const heroBanners = [
  {
    id: 'banner-1',
    brand: 'BLEU DE CHANEL · HAUTE PARFUMERIE',
    headline: 'BLEU DE CHANEL',
    subtitle: 'An iconic woody aromatic symphony composed for the discerning modern man. Distilled with sun-drenched Calabrian bergamot and royal cedarwood.',
    ctaText: 'SHOP COLLECTION',
    link: '/shop?gender=men',
    bgGradient: 'from-[#051329]/95 via-[#092244]/80 to-transparent',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=85&w=1920',
    tag: 'Best Seller',
    concentration: 'Extrait de Parfum (32%)'
  },
  {
    id: 'banner-2',
    brand: 'LANCÔME PARIS · COLLECTION PRIVÉE',
    headline: 'ICONIC BEAUTY SCENTS',
    subtitle: 'A radiant French floral bouquet composed around rare Grasse Centifolia Rose, noble Iris Pallida, and sensual Madagascar Bourbon vanilla.',
    ctaText: 'SHOP POUR FEMME',
    link: '/shop?gender=women',
    bgGradient: 'from-[#4A121D]/95 via-[#651D29]/80 to-transparent',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=85&w=1920',
    tag: 'Award Winner',
    concentration: 'Handcrafted Flacon'
  },
  {
    id: 'banner-3',
    brand: 'FRESH ARRIVALS · GRASSE ATELIERS',
    headline: 'NEW SEASONAL ELIXIRS',
    subtitle: 'Directly unbottled from quiet Provençal stone ateliers. Macerated undisturbed in charred Limousin oak casks for intense 18-hour sillage.',
    ctaText: 'EXPLORE NEW ARRIVALS',
    link: '/shop?filter=new',
    bgGradient: 'from-[#3B0E15]/95 via-[#5C1A24]/80 to-transparent',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=85&w=1920',
    tag: 'New Launch 2026',
    concentration: 'Limited Master Batch'
  },
  {
    id: 'banner-4',
    brand: 'YVES SAINT LAURENT · ORIENTAL LIBRE',
    headline: 'LIBRE & ROYAL OUD',
    subtitle: 'A passionate juxtaposition of burning Moroccan orange blossom, French Diva lavender, and rare Cambodian aged agarwood.',
    ctaText: 'SHOP PRIVATE SALON',
    link: '/shop?category=oriental-amber',
    bgGradient: 'from-[#1F130E]/95 via-[#3B2215]/80 to-transparent',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=85&w=1920',
    tag: 'Haute Niche',
    concentration: 'Unisex Masterpiece'
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
      className="relative w-full bg-[#111111] overflow-hidden min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex items-center shadow-lg"
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
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
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
              {/* Rich Gradient Vignette for Text Legibility */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            </div>

            {/* Banner Content Layout - Positioned on Down Side (Bottom-aligned) */}
            <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 flex items-end pb-12 sm:pb-14 lg:pb-16">
              <div className="w-full max-w-2xl text-white pt-6 pb-2 pl-1 sm:pl-8 lg:pl-10 pr-2 space-y-3 sm:space-y-5">
                
                {/* Headline & Description */}
                <div className="space-y-2 sm:space-y-4">
                  <h1 className="font-serif text-2xl sm:text-4xl lg:text-6xl font-normal tracking-tight text-white leading-tight drop-shadow-md">
                    {banner.headline}
                  </h1>

                  <p className="text-[11px] sm:text-base text-gray-200 max-w-md lg:max-w-xl leading-relaxed font-light drop-shadow-sm line-clamp-3 sm:line-clamp-none">
                    {banner.subtitle}
                  </p>

                  <div className="text-[10px] sm:text-[11px] font-mono tracking-wider text-white/70 uppercase pt-0.5 sm:pt-1">
                    Formula: <span className="text-white font-semibold">{banner.concentration}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-1.5 sm:pt-4 flex flex-wrap items-center gap-2.5 sm:gap-4">
                  <Link
                    href={banner.link}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-8 py-2.5 sm:py-4 bg-[#D84A26] hover:bg-[#bf3e1d] text-white text-[11px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase rounded-lg sm:rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] group"
                  >
                    <span>{banner.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2.5 sm:py-4 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase rounded-lg sm:rounded-xl border border-white/25 transition-all"
                  >
                    <span>View All Fragrances</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}



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
                  ? 'w-7 bg-[#D84A26] shadow-sm'
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

