'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import ProductCard from '../../components/user/ProductCard';
import { useStore } from '../../context/StoreContext';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, products } = useStore();
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pb-24">
        <div className="bg-[#F7F4EC] border-b border-[#E8E4DA] py-12 px-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#153B27] block mb-2 font-mono">
            Vos Parfums Favoris
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#101310] font-normal">
            My Fragrance Wishlist
          </h1>
          <p className="text-xs text-gray-500 mt-2 font-light">
            {wishlistedProducts.length} Signature creations preserved in your private collection
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {wishlistedProducts.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-20 bg-[#F7F4EC] rounded-3xl border border-[#E8E4DA] p-8">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 border border-[#E8E4DA]">
                <Heart className="w-8 h-8 text-[#153B27]" />
              </div>
              <h2 className="text-2xl font-serif text-black mb-2 font-normal">Your Wishlist is Empty</h2>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed font-light">
                Tap the heart icon on any perfume or discovery coffret to save it to your wishlist.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#153B27] hover:bg-[#0D2619] text-[#F7F4EC] text-xs font-semibold tracking-widest uppercase rounded-xl transition-colors shadow-md"
              >
                <span>Discover Creations</span>
                <ArrowRight className="w-4 h-4 text-[#D5B85A]" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {wishlistedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
