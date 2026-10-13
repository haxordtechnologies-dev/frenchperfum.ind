'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeritageStory() {
  return (
    <section className="py-12 sm:py-24 bg-white border-b border-[#EEEBE6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image composition */}
          <div className="relative">
            <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden shadow-2xl border border-[#EEEBE6]">
              <Image
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1000"
                alt="Grasse French Perfumery Atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating callout card */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:-right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-[#EEEBE6] shadow-xl max-w-xs hidden sm:block">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A880] block mb-1">
                Centuries of Alchemy
              </span>
              <p className="text-xs text-gray-700 leading-snug">
                &ldquo;True perfumery is not manufactured; it is composed like a symphony in quiet sunlit stone ateliers.&rdquo;
              </p>
              <div className="mt-2 text-[10px] font-semibold text-black uppercase tracking-wider">
                — Master Nez, Grasse
              </div>
            </div>
          </div>

          {/* Text narrative */}
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EEEBE6] text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisanal Heritage · Provençal Alchemy</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#111111] leading-[1.2]">
              Born in Grasse. Bottled for Discerning Connoisseurs.
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              Nestled between the rolling lavender plateaus and the Mediterranean Sea lies Grasse—the perfume capital of the world since the 17th century. At <strong>frenchperfume.ind</strong>, every formulation is born from this timeless French tradition.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#EEEBE6] flex items-center justify-center text-xs font-serif font-bold text-[#111111] shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-serif font-semibold text-black">Dawn Petal Harvesting</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                    Rose Centifolia and Jasmine Grandiflorum gathered exclusively before sunrise when aromatic sap reaches its zenith.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#EEEBE6] flex items-center justify-center text-xs font-serif font-bold text-[#111111] shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-serif font-semibold text-black">French Oak Barrel Maceration</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                    Every batch is aged undisturbed for 180 days in charred Limousin oak barrels to mature the woody base notes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#EEEBE6] flex items-center justify-center text-xs font-serif font-bold text-[#111111] shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-serif font-semibold text-black">Pure Extrait Concentration (32%+)</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                    We refuse to dilute. Our high oil ratio guarantees unforgettable all-day longevity on skin and fabric.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111111] hover:bg-[#262626] text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-colors shadow-md"
              >
                <span>Explore the Heritage Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
