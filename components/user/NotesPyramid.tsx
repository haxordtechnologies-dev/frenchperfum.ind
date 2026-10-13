'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Wind, Droplets, Flame, ArrowRight } from 'lucide-react';

const noteLayers = [
  {
    tier: 'Top Notes / Notes de Tête',
    timing: 'Initial 15 - 30 Minutes',
    icon: Wind,
    description: 'The luminous opening that greets the senses upon first mist. Shimmering citrus and aromatic spices.',
    ingredients: ['Calabrian Bergamot', 'Pink Peppercorn', 'French Cardamom', 'Lychee Sparkle', 'Bitter Orange'],
    bgColor: 'bg-amber-50/50',
    borderColor: 'border-amber-200/60'
  },
  {
    tier: 'Heart Notes / Notes de Cœur',
    timing: 'Hours 2 to 6',
    icon: Droplets,
    description: 'The emotional soul of the perfume. Rare botanical floras, Mysore sandalwood, and Damascena rose.',
    ingredients: ['Grasse Centifolia Rose', 'Mysore Sandalwood', 'Iris Butter', 'French Jasmine Sambac', 'Atlas Cedar'],
    bgColor: 'bg-rose-50/50',
    borderColor: 'border-rose-200/60'
  },
  {
    tier: 'Base Notes / Notes de Fond',
    timing: 'Hours 6 to 18+',
    icon: Flame,
    description: 'The enduring foundation that clings to cashmere, skin, and memories long into the twilight.',
    ingredients: ['Cambodian Agarwood', 'Baltic Amber', 'Madagascar Vanilla Pod', 'Smoked Leather', 'White Cashmeran'],
    bgColor: 'bg-orange-50/50',
    borderColor: 'border-orange-200/60'
  }
];

export default function NotesPyramid() {
  const [activeTier, setActiveTier] = useState(1);

  return (
    <section className="py-20 bg-white border-b border-[#EEEBE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5] border border-[#EEEBE6] rounded-full text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Science of Olfaction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] leading-tight">
            The Three-Tiered French Olfactory Pyramid
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed">
            Every bottle from frenchperfume.ind evolves dynamically on your skin over hours, revealing sequential layers of hand-extracted botanicals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {noteLayers.map((layer, idx) => {
            const Icon = layer.icon;
            const isSelected = activeTier === idx;
            return (
              <div
                key={layer.tier}
                onClick={() => setActiveTier(idx)}
                className={`cursor-pointer rounded-2xl p-6 sm:p-8 border transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-black bg-[#FAF8F5] shadow-xl scale-[1.02]'
                    : 'border-[#EEEBE6] bg-white hover:border-gray-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono tracking-wider text-gray-500 uppercase px-2.5 py-1 bg-white border border-[#EEEBE6] rounded-md">
                      {layer.timing}
                    </span>
                    <div className="p-2.5 rounded-full bg-white border border-[#EEEBE6] text-[#C5A880]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-serif text-[#111111] mb-2 font-medium">
                    {layer.tier}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    {layer.description}
                  </p>

                  <div>
                    <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                      Characteristic Ingredients:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.ingredients.map((ing) => (
                        <span
                          key={ing}
                          className="text-xs px-2.5 py-1 bg-white border border-[#EEEBE6] rounded-lg text-gray-800"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#EEEBE6] flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Stage 0{idx + 1} Evolution</span>
                  <span className="text-[#C5A880] font-semibold">Distilled in Grasse</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Discovery Box Promotion Bar */}
        <div className="mt-12 bg-[#111111] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs text-[#C5A880] uppercase tracking-widest font-semibold">
              Sample the entire pyramid in one box
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-light">
              Discovery Coffret (5 x 10 ml) with ₹1,000 Voucher
            </h3>
            <p className="text-xs text-gray-300 max-w-lg">
              Test each fragrance layer at home before committing to a full 100ml flacon. The purchase price is 100% redeemable.
            </p>
          </div>
          <Link
            href="/product/fp-08"
            className="px-6 py-3.5 bg-[#FAF8F5] text-black text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#C5A880] transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Order Discovery Set · ₹1,899</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
