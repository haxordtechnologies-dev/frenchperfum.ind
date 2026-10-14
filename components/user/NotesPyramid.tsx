'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Wind, Droplets, Flame, ArrowRight } from 'lucide-react';

const noteLayers = [
  {
    tier: 'Top Notes / Notes de Tête',
    timing: 'Initial 15 - 30 Minutes',
    icon: Wind,
    description: 'The luminous opening that greets the senses upon first mist. Shimmering Sicilian citrus, pink peppercorns, and sparkling aromatics.',
    ingredients: ['Calabrian Bergamot', 'Sicilian Lemon', 'Blood Orange', 'French Cardamom', 'Pink Peppercorn'],
    badge: 'Stage 01'
  },
  {
    tier: 'Heart Notes / Notes de Cœur',
    timing: 'Hours 2 to 6',
    icon: Droplets,
    description: 'The emotional soul of the perfume. Hand-harvested Centifolia rose, Grasse jasmine, Parisian iris, and Mediterranean fruits.',
    ingredients: ['Grasse Centifolia Rose', 'Mediterranean Fruit Basket', 'Riviera Neroli', 'French Iris Butter', 'Mysore Sandalwood'],
    badge: 'Stage 02'
  },
  {
    tier: 'Base Notes / Notes de Fond',
    timing: 'Hours 6 to 18+',
    icon: Flame,
    description: 'The enduring foundation that clings to skin and fabric throughout the evening. Baltic amber, aged woods, and Madagascar vanilla.',
    ingredients: ['Baltic Amber', 'Madagascar Bourbon Vanilla', 'Haitian Vetiver', 'Cambodian Agarwood', 'Warm Cashmere Musk'],
    badge: 'Stage 03'
  }
];

export default function NotesPyramid() {
  const [activeTier, setActiveTier] = useState(1);

  return (
    <section className="py-12 sm:py-20 bg-[#F7F4EC]/50 border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#153B27]/10 border border-[#153B27]/20 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-[#153B27] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D5B85A]" />
            <span>The Science of Olfaction</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#101310] leading-tight font-normal">
            The Three-Tiered Olfactory Architecture
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2.5 sm:mt-3 leading-relaxed">
            Every French Perfume formulation evolves dynamically on your pulse points over hours, revealing sequential harmonies of noble essences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {noteLayers.map((layer, idx) => {
            const Icon = layer.icon;
            const isSelected = activeTier === idx;
            return (
              <div
                key={layer.tier}
                onClick={() => setActiveTier(idx)}
                className={`cursor-pointer rounded-2xl p-6 sm:p-8 border transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#153B27] bg-white shadow-xl md:scale-[1.02]'
                    : 'border-[#E8E4DA] bg-white hover:border-[#D5B85A]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[#153B27] uppercase px-2.5 py-1 bg-[#F7F4EC] border border-[#E8E4DA] rounded-md font-medium">
                      {layer.timing}
                    </span>
                    <div className="p-2.5 rounded-full bg-[#153B27] text-[#D5B85A] shadow-xs">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif text-[#101310] mb-2 font-normal">
                    {layer.tier}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed mb-6 font-light">
                    {layer.description}
                  </p>

                  <div>
                    <h4 className="text-[10px] sm:text-[11px] font-semibold text-[#89977B] uppercase tracking-widest mb-2.5">
                      Characteristic Ingredients:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.ingredients.map((ing) => (
                        <span
                          key={ing}
                          className="text-xs px-2.5 py-1 bg-[#F7F4EC] border border-[#E8E4DA] rounded-lg text-[#101310] font-medium"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8E4DA] flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">{layer.badge} Evolution</span>
                  <span className="text-[#153B27] font-semibold">Distilled in Grasse</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Discovery Box Promotion Bar in Forest Green */}
        <div className="mt-12 bg-[#153B27] text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-[#D5B85A]/30">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs text-[#D5B85A] uppercase tracking-[0.2em] font-semibold">
              Sample the entire pyramid before committing
            </span>
            <h3 className="text-xl sm:text-3xl font-serif font-light text-[#F7F4EC]">
              The Discovery Coffret (5 x 10 ml)
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F4EC]/85 max-w-xl font-light">
              Experience all three olfactory stages on your skin at home. Includes an exclusive ₹1,000 voucher redeemable against your first full 100ml bottle.
            </p>
          </div>
          <Link
            href="/product/fp-08"
            className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#D5B85A] hover:bg-[#C5A543] text-[#153B27] text-xs font-bold uppercase tracking-[0.16em] rounded-xl transition-all shadow-xl hover:scale-[1.02] shrink-0 flex items-center gap-2"
          >
            <span>Order Discovery Box · ₹1,899</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
