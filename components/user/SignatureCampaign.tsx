'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Clock, ShieldCheck, Flame } from 'lucide-react';

export default function SignatureCampaign() {
  return (
    <section className="py-14 sm:py-24 bg-[#153B27] text-white relative overflow-hidden border-y border-[#0D2619]">
      {/* Background Ambient Botanical Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D5B85A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0D2619] rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Visual Showcase (5 Cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-4/5 w-full rounded-3xl overflow-hidden shadow-2xl border border-[#D5B85A]/30 group">
              <Image
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=85&w=1000"
                alt="French Perfume Signature Bottle"
                fill
                className="object-cover transition-transform duration-7000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2619] via-transparent to-black/20" />
              
              {/* Floating Signature Plaque */}
              <div className="absolute bottom-6 inset-x-6 bg-[#101310]/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#D5B85A]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#D5B85A] block">
                      Haute Parfumerie
                    </span>
                    <h4 className="font-serif text-base sm:text-lg text-[#F7F4EC] mt-0.5 font-normal">
                      Erba Gold & Santal Impérial
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#153B27] text-[#D5B85A] text-[10px] font-bold tracking-wider uppercase border border-[#D5B85A]/40">
                    Extrait
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Content (7 Cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D5B85A]/15 border border-[#D5B85A]/30 text-[#D5B85A] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D5B85A]" />
              <span>THE FRENCH PERFUME CAMPAIGN</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#F7F4EC] leading-[1.1] font-light">
              More Than a Fragrance. <br />
              <span className="text-[#D5B85A] font-normal italic">Your Signature.</span>
            </h2>

            <p className="text-xs sm:text-base text-[#F7F4EC]/90 leading-relaxed font-light max-w-xl">
              We believe a truly iconic scent should not be a fleeting accessory—it is an aura that precedes you and lingers as an unforgettable memory. Distilled in the historic hillside ateliers of Grasse, each creation unites noble botanicals, royal resins, and creamy woods in high-concentration extraits designed to command presence.
            </p>

            {/* Signature Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 py-3 border-y border-[#D5B85A]/20">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[#D5B85A] text-xs font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>14+ Hours</span>
                </div>
                <span className="text-[10px] text-gray-300 block font-light">Verified Skin & Fabric Sillage</span>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[#D5B85A] text-xs font-semibold">
                  <Flame className="w-4 h-4" />
                  <span>32% Pure Oil</span>
                </div>
                <span className="text-[10px] text-gray-300 block font-light">Genuine Extrait de Parfum</span>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[#D5B85A] text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Grasse Origin</span>
                </div>
                <span className="text-[10px] text-gray-300 block font-light">Centuries of French Alchemy</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#D5B85A] hover:bg-[#C5A543] text-[#153B27] text-xs font-bold tracking-[0.16em] uppercase rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] group"
              >
                <span>EXPLORE SIGNATURE SCENTS</span>
                <ArrowRight className="w-4 h-4 text-[#153B27] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/product/fp-08"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-[#F7F4EC] text-xs font-semibold tracking-[0.14em] uppercase rounded-xl border border-[#D5B85A]/40 transition-all hover:border-[#D5B85A]"
              >
                <span>DISCOVERY BOX (₹1,899)</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
