'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function HeritageStory() {
  return (
    <section id="about" className="py-14 sm:py-24 bg-white border-b border-[#E8E4DA] overflow-hidden scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Image composition */}
          <div className="relative">
            <div className="relative aspect-4/5 w-full rounded-3xl overflow-hidden shadow-2xl border border-[#E8E4DA]">
              <Image
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=85&w=1000"
                alt="French Perfume Artisanal Creation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Floating Brand Mission Callout */}
            <div className="absolute -bottom-6 -right-4 sm:bottom-8 sm:-right-6 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-[#D5B85A]/40 shadow-xl max-w-xs hidden sm:block">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#153B27] font-semibold block mb-1">
                The Philosophy
              </span>
              <p className="text-xs text-gray-700 leading-snug font-light">
                &ldquo;Luxury should not be exclusive. A signature scent is personal poetry—accessible, enduring, and unforgettable.&rdquo;
              </p>
              <div className="mt-2 text-[10px] font-semibold text-[#153B27] uppercase tracking-wider">
                — French Perfume Ateliers
              </div>
            </div>
          </div>

          {/* Text narrative */}
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#153B27]/10 border border-[#153B27]/20 text-xs font-semibold uppercase tracking-[0.2em] text-[#153B27]">
              <Sparkles className="w-3.5 h-3.5 text-[#D5B85A]" />
              <span>About French Perfume · Accessible Luxury</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#101310] leading-[1.15] font-light">
              Crafted in Tradition. <br />
              <span className="text-[#153B27] font-normal italic">Formulated for Lasting Impressions.</span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
              At <strong>French Perfume</strong>, our mission is to redefine luxury fragrance. Inspired by time-honored French perfumery practices, we bridge artisanal refinement and everyday accessibility—ensuring you never have to choose between exceptional quality and honest value.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#153B27] text-[#D5B85A] flex items-center justify-center text-xs font-semibold shrink-0 shadow-xs">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-serif font-medium text-[#101310]">Signature Fragrance Identity</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5 font-light">
                    Every scent is sculpted to express individuality and leave a distinguished, lasting memory on everyone you meet.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#153B27] text-[#D5B85A] flex items-center justify-center text-xs font-semibold shrink-0 shadow-xs">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-serif font-medium text-[#101310]">Long-Lasting Performance (14+ Hours)</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5 font-light">
                    High concentration perfume oils ensure your fragrance persists effortlessly from dawn into deep twilight.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#153B27] text-[#D5B85A] flex items-center justify-center text-xs font-semibold shrink-0 shadow-xs">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-serif font-medium text-[#101310]">Accessible Luxury Without Compromise</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5 font-light">
                    Direct-to-consumer curation removes excessive middleman markups, placing world-class haute perfumery within reach.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#153B27] hover:bg-[#0D2619] text-[#F7F4EC] text-xs font-semibold tracking-[0.16em] uppercase rounded-xl transition-all shadow-md group"
              >
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight className="w-4 h-4 text-[#D5B85A] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
