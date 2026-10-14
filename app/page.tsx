'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/user/Navbar';
import Footer from '../components/user/Footer';
import HeroBanner from '../components/user/HeroBanner';
import CategoryStrip from '../components/user/CategoryStrip';
import ProductCard from '../components/user/ProductCard';
import SignatureCampaign from '../components/user/SignatureCampaign';
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
        {/* 1. Hero Multi-card Banner Slider with French Perfume Campaigns */}
        <HeroBanner />

        {/* 2. Collection Discovery Cards Strip */}
        <CategoryStrip />

        {/* 3. Featured & Best-Selling Perfumes */}
        <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#153B27] mb-1.5 sm:mb-2 font-mono">
                <Flame className="w-3.5 h-3.5 text-[#D5B85A] fill-[#D5B85A]" />
                <span>Icons of Distinction</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#101310] font-normal">
                Best-Selling Fragrances
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                { label: 'All Fragrances', value: 'all' },
                { label: 'Pour Homme (Men)', value: 'men' },
                { label: 'Pour Femme (Women)', value: 'women' },
                { label: 'Unisex', value: 'unisex' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value as any)}
                  className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all ${
                    activeTab === tab.value
                      ? 'bg-[#153B27] text-[#D5B85A] shadow-xs'
                      : 'bg-[#F7F4EC] text-[#101310] hover:bg-[#EAE4D5] border border-[#E8E4DA]'
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

          <div className="mt-10 sm:mt-14 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 border border-[#153B27] text-[#153B27] hover:bg-[#153B27] hover:text-[#F7F4EC] text-xs font-semibold tracking-[0.16em] uppercase rounded-xl transition-all shadow-xs"
            >
              <span>Explore All {products.length} Fragrances</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 4. Signature Fragrance Campaign: More Than a Fragrance. Your Signature. */}
        <SignatureCampaign />

        {/* 5. Luxury Discovery Coffret Feature Card */}
        <section className="py-12 sm:py-16 bg-[#F7F4EC]/60 border-b border-[#E8E4DA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#153B27] text-white rounded-3xl p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 border border-[#D5B85A]/30">
              <div className="max-w-xl z-10 space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D5B85A]/20 text-[#D5B85A] rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] border border-[#D5B85A]/40 backdrop-blur-xs">
                  <Gift className="w-3.5 h-3.5 text-[#D5B85A]" />
                  <span>Includes ₹1,000 Redeemable Voucher</span>
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-light text-[#F7F4EC] leading-tight">
                  The Discovery Coffret <br />
                  <span className="text-[#D5B85A] font-normal italic">(5 x 10 ml Set)</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#F7F4EC]/90 leading-relaxed font-light">
                  Cannot decide on just one? Experience our 5 signature Extrait de Parfum creations at your leisure. When you find your true signature scent, redeem the included ₹1,000 voucher toward any 100ml flacon.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Link
                    href="/product/fp-08"
                    className="px-7 sm:px-9 py-3.5 sm:py-4 bg-[#D5B85A] hover:bg-[#C5A543] text-[#153B27] text-xs font-bold tracking-[0.16em] uppercase rounded-xl transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <span>Order Discovery Box · ₹1,899</span>
                    <ArrowRight className="w-4 h-4 text-[#153B27]" />
                  </Link>
                  <Link
                    href="/shop"
                    className="px-6 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-[#F7F4EC] text-xs font-semibold tracking-[0.14em] uppercase rounded-xl border border-[#D5B85A]/40 transition-colors text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Discovery Set Visual */}
              <div className="relative w-64 sm:w-80 lg:w-96 aspect-square z-10 shrink-0">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-[#D5B85A]/40 relative">
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

        {/* 6. Olfactory Notes Architecture */}
        <NotesPyramid />

        {/* 7. New Additions & Seasonal Spotlight */}
        <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#153B27] block mb-1 font-mono">
                Fresh Harvest &amp; Master Batches
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#101310] font-normal">
                New Additions &amp; Seasonal Elixirs
              </h2>
            </div>
            <Link
              href="/shop?filter=new"
              className="text-xs font-semibold tracking-wider uppercase text-[#153B27] hover:text-[#0D2619] transition-colors underline underline-offset-4"
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

        {/* 8. Artisanal Heritage Story */}
        <HeritageStory />

        {/* 9. Patron Testimonials */}
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
}
