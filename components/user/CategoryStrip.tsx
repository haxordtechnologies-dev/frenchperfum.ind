'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categoryCircles = [
  {
    name: 'Men',
    link: '/shop?gender=men',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Women',
    link: '/shop?gender=women',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Unisex',
    link: '/shop?gender=unisex',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Niche',
    link: '/shop?category=oriental-amber',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Designer',
    link: '/shop?category=floral-fresh',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Arabic',
    link: '/shop?category=woody-oud',
    image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Oud',
    link: '/shop?category=woody-oud',
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Attar',
    link: '/shop?category=oriental-amber',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Discovery',
    link: '/product/fp-08',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Gift Sets',
    link: '/product/fp-08',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=300'
  }
];

export default function CategoryStrip() {
  return (
    <section className="py-6 sm:py-8 bg-white border-b border-[#EEEBE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal scroll on mobile, flex grid on desktop */}
        <div className="flex items-center justify-between gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
          {categoryCircles.map((cat) => (
            <Link
              key={cat.name}
              href={cat.link}
              className="flex flex-col items-center group shrink-0"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#4A0E17] transition-all duration-300 p-0.5 bg-[#F9F7F5] shadow-xs group-hover:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </div>
              <span className="mt-2 text-xs font-semibold text-gray-800 group-hover:text-[#4A0E17] transition-colors text-center tracking-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
