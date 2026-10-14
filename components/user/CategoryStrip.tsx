'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';

const featuredCollections = [
  {
    name: 'For Him',
    subtext: 'Woody & Bold Aromatics',
    link: '/shop?gender=men',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400',
    tag: 'Pour Homme'
  },
  {
    name: 'For Her',
    subtext: 'Luminous Velvet Florals',
    link: '/shop?gender=women',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=400',
    tag: 'Pour Femme'
  },
  {
    name: 'Signature Scents',
    subtext: 'Erba Gold & Santal',
    link: '/shop?filter=bestseller',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400',
    tag: 'Icons'
  },
  {
    name: 'Bestsellers',
    subtext: 'Most Coveted Flacons',
    link: '/shop?filter=bestseller',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=400',
    tag: 'Top Rated'
  },
  {
    name: 'New Arrivals',
    subtext: 'Seasonal Grasse Elixirs',
    link: '/shop?filter=new',
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=400',
    tag: '2026 Harvest'
  },
  {
    name: 'Discovery Sets',
    subtext: '5 x 10ml + ₹1,000 Voucher',
    link: '/product/fp-08',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400',
    tag: 'Gift-Worthy'
  }
];

export default function CategoryStrip() {
  return (
    <section className="py-8 sm:py-12 bg-[#F7F4EC]/40 border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#153B27] mb-1 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#D5B85A]" />
              <span>Curated Olfactory Realms</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#101310] font-normal">
              Featured Collections
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold tracking-wider uppercase text-[#153B27] hover:text-[#0D2619] transition-colors inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Collection Cards Grid / Horizontal Snap on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
          {featuredCollections.map((col) => (
            <Link
              key={col.name}
              href={col.link}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-[#E8E4DA] hover:border-[#D5B85A] transition-all duration-300 hover:shadow-lg shrink-0"
            >
              {/* Image Frame */}
              <div className="relative aspect-3/4 w-full overflow-hidden bg-[#F7F4EC]">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Badge Tag */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="px-2 py-0.5 rounded-full bg-[#153B27]/90 text-[#D5B85A] text-[9px] font-semibold uppercase tracking-wider backdrop-blur-xs border border-[#D5B85A]/30">
                    {col.tag}
                  </span>
                </div>

                {/* Bottom text inside image */}
                <div className="absolute bottom-2.5 inset-x-2.5 z-10 text-white">
                  <h3 className="font-serif text-sm sm:text-base font-normal leading-tight group-hover:text-[#D5B85A] transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-[10px] text-[#F7F4EC]/80 font-light truncate mt-0.5">
                    {col.subtext}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
