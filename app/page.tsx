'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/user/Navbar';
import Footer from '../components/user/Footer';
import HeroBanner from '../components/user/HeroBanner';
import CategoryStrip from '../components/user/CategoryStrip';
import ProductCard from '../components/user/ProductCard';
import NotesPyramid from '../components/user/NotesPyramid';
import HeritageStory from '../components/user/HeritageStory';
import TestimonialsSection from '../components/user/TestimonialsSection';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, Flame, Gift } from 'lucide-react';

export default function HomePage() {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'men' | 'women' | 'unisex'>('all');

  // Filter for featured best sellers tab
  const tabFilteredProducts = products.filter((p) => {
    if (!p.active) return false;
    if (activeTab === 'all') return true;
    return p.gender === activeTab;
  });

  const bestSellers = tabFilteredProducts.slice(0, 8);
  const newArrivals = products.filter((p) => p.isNewArrival || p.isFeatured).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Multi-card Banner Slider (Exact Screenshot Style) */}
        <HeroBanner />

        {/* 2. Circular Avatar Category Strip (Men, Women, Unisex, Niche, Designer, Arabic, Oud, Attar, Discovery, Gift Sets) */}
        <CategoryStrip />

        {/* 3. Featured & Best-Selling Perfumes */}
        <section className="py-10 sm:py-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#D84A26] mb-1.5 sm:mb-2 font-mono">
                <Flame className="w-3.5 h-3.5 text-[#D84A26] fill-[#D84A26]" />
                <span>Icons of Distinction</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#111111]">
                Best-Selling Fragrances
              </h2>
            </div>

            {/* Filter Tabs matching Olfacy category buttons */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                { label: 'All', value: 'all' },
                { label: 'Pour Homme', value: 'men' },
                { label: 'Pour Femme', value: 'women' },
                { label: 'Unisex', value: 'unisex' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value as any)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all ${
                    activeTab === tab.value
                      ? 'bg-[#4A0E17] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-gray-700 hover:bg-gray-200 border border-[#EEEBE6]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid: 2 Columns on Mobile, 4 Columns on Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 border border-[#4A0E17] text-[#4A0E17] hover:bg-[#4A0E17] hover:text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all"
            >
              <span>Explore All {products.length} Fragrances</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 4. Luxury Discovery Coffret Feature Card */}
        <section className="py-10 sm:py-12 bg-[#FAF8F5] border-y border-[#EEEBE6]">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="bg-[#4A0E17] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
              <div className="max-w-xl z-10 space-y-3 sm:space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 text-white rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider border border-white/20">
                  <Gift className="w-3.5 h-3.5 text-[#F3BA93]" />
                  <span>Includes ₹1,000 Redeemable Voucher</span>
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif leading-tight">
                  The Discovery Coffret (5 x 10 ml)
                </h2>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light">
                  Cannot choose just one? Unbox our 5 iconic Extrait de Parfum creations in generous 10ml travel flacons. When you find your signature fragrance, redeem the included ₹1,000 voucher toward the 100ml full bottle.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Link
                    href="/product/fp-08"
                    className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#D84A26] text-white text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-[#bf3e1d] transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Order Discovery Box · ₹1,899</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/shop"
                    className="px-6 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white text-xs font-medium tracking-widest uppercase rounded-xl border border-white/20 transition-colors text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Discovery Set Visual */}
              <div className="relative w-60 sm:w-80 lg:w-96 aspect-square z-10 shrink-0">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"
                    alt="Discovery Box"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Olfactory Notes Education Architecture */}
        <NotesPyramid />

        {/* 6. New Arrivals & Seasonal Spotlight */}
        <section className="py-12 sm:py-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#D84A26] block mb-1 font-mono">
                Fresh From The Grasse Ateliers
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#111111]">
                New Additions & Seasonal Elixirs
              </h2>
            </div>
            <Link
              href="/shop?filter=new"
              className="text-xs font-semibold tracking-wider uppercase text-gray-800 hover:text-[#4A0E17] transition-colors underline underline-offset-4"
            >
              View All New →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {newArrivals.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>

        {/* 7. Artisanal Heritage Story */}
        <HeritageStory />

        {/* 8. Patron Testimonials */}
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
}
