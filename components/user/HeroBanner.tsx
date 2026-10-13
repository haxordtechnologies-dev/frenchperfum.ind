'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

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
      className="relative w-full bg-[#111111] overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[600px] flex items-center shadow-lg"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25" />
            </div>

            {/* Banner Content Layout - Aligned inside Max Width Container */}
            <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center">
              <div className="w-full max-w-2xl text-white py-12 sm:py-16 pl-10 sm:pl-14 lg:pl-12 pr-4 space-y-4 sm:space-y-6">
                {/* Top Eyebrow Tag */}
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/15 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-white/95 border border-white/20 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#D84A26]" />
                    <span>{banner.brand}</span>
                  </span>
                  <span className="hidden xs:inline-block px-3 py-1 bg-[#D84A26] rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                    {banner.tag}
                  </span>
                </div>

                {/* Headline & Description */}
                <div className="space-y-3 sm:space-y-4">
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.08] drop-shadow-md">
                    {banner.headline}
                  </h1>

                  <p className="text-xs sm:text-base text-gray-200 max-w-lg lg:max-w-xl leading-relaxed font-light drop-shadow-sm">
                    {banner.subtitle}
                  </p>

                  <div className="text-[11px] font-mono tracking-wider text-white/70 uppercase pt-1">
                    Formula: <span className="text-white font-semibold">{banner.concentration}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href={banner.link}
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#D84A26] hover:bg-[#bf3e1d] text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] group"
                  >
                    <span>{banner.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-semibold tracking-wider uppercase rounded-xl border border-white/25 transition-all"
                  >
                    <span>View All Fragrances</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Left Navigation Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 shadow-xl"
        aria-label="Previous fragrance banner"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 shadow-xl"
        aria-label="Next fragrance banner"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}
