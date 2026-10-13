'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const heroCards = [
  {
    id: 'card-1',
    brand: 'BLEU DE CHANEL',
    headline: 'BLEU DE CHANEL',
    subtitle: 'A TIMELESS SCENT FOR THE MODERN MAN',
    ctaText: 'SHOP NOW',
    link: '/shop?gender=men',
    bgGradient: 'from-[#051329] via-[#092244] to-[#040D1A]',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
    accentColor: '#3B82F6'
  },
  {
    id: 'card-2',
    brand: 'LANCÔME PARIS',
    headline: 'ICONIC BEAUTY SCENTS',
    subtitle: 'Timeless fragrances for every you.',
    ctaText: 'SHOP COLLECTION',
    link: '/shop?gender=women',
    bgGradient: 'from-[#651D29] via-[#852737] to-[#4A121D]',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800',
    accentColor: '#F472B6'
  },
  {
    id: 'card-3',
    brand: 'NEW ARRIVALS',
    headline: 'NEW ARRIVALS',
    subtitle: 'Iconic launches. Timeless stories.',
    ctaText: 'SHOP NOW',
    link: '/shop?filter=new',
    bgGradient: 'from-[#7A2834] via-[#5C1A24] to-[#3B0E15]',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    accentColor: '#FB7185'
  },
  {
    id: 'card-4',
    brand: 'YVES SAINT LAURENT',
    headline: 'LIBRE',
    subtitle: 'A STATEMENT OF FREEDOM',
    ctaText: 'Shop Now',
    link: '/shop?category=oriental-amber',
    bgGradient: 'from-[#2B1B15] via-[#4A2D1F] to-[#1F130E]',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    accentColor: '#F59E0B'
  }
];

export default function HeroBanner() {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % heroCards.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + heroCards.length) % heroCards.length);
  };

  return (
    <div className="relative w-full bg-white py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-xl flex items-center justify-center border border-gray-200 transition-all hover:scale-105"
          aria-label="Previous banner"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-xl flex items-center justify-center border border-gray-200 transition-all hover:scale-105"
          aria-label="Next banner"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Multi-Card Banner Row (Showing cards in responsive view) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {heroCards.map((card, idx) => (
            <div
              key={card.id}
              className={`relative rounded-2xl overflow-hidden shadow-lg aspect-3/4 flex flex-col justify-between p-6 text-white bg-gradient-to-br ${card.bgGradient} transition-transform duration-500 hover:scale-[1.01]`}
            >
              {/* Background Product Photograph */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={card.image}
                  alt={card.headline}
                  fill
                  className="object-cover opacity-60 mix-blend-luminosity hover:opacity-75 transition-opacity duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Brand Top Tag */}
              <div className="relative z-10">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-white/80 block">
                  {card.brand}
                </span>
              </div>

              {/* Bottom Card Copy & CTA */}
              <div className="relative z-10 space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                  {card.headline}
                </h3>
                <p className="text-xs text-white/90 font-light leading-snug">
                  {card.subtitle}
                </p>
                <div className="pt-2">
                  <Link
                    href={card.link}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black text-[11px] font-bold uppercase tracking-wider rounded-md hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    <span>{card.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex justify-center items-center gap-1.5 mt-5">
          {heroCards.map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                startIndex === i ? 'w-6 bg-[#4A0E17]' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
