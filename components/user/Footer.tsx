'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { Mail, ArrowRight, ShieldCheck, Clock, Award, Sparkles } from 'lucide-react';

export default function Footer() {
  const { settings, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Bienvenue au Club Privé! Use code FRENCH15 for 15% off.');
    setEmail('');
  };

  return (
    <footer className="bg-[#111111] text-[#FAF8F5] pt-12 sm:pt-16 pb-8 sm:pb-12 border-t border-black">
      {/* Brand Value Pillars / Perks Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#D84A26] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-medium tracking-wide text-white">
                Authentic Grasse Heritage
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Formulated exclusively with royal natural essences distilled in the historic ateliers of Provence.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#D84A26] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-medium tracking-wide text-white">
                14+ Hours Longevity
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                High 30%+ perfume oil concentration ensures radiant projection and day-to-night sillage.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#D84A26] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-medium tracking-wide text-white">
                Complimentary Discovery Vial
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Receive hand-picked luxury samples with every order above ₹999 to explore upcoming formulations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#D84A26] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-medium tracking-wide text-white">
                Express Pan-India Delivery
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Dispatched in tamper-proof insured velvet cartons with live GPS tracking across all pin codes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block group mb-3">
              <span className="font-serif text-2xl font-semibold tracking-[0.18em] uppercase text-white group-hover:text-[#F3BA93] transition-colors">
                FRENCHPERFUME<span className="text-[#D84A26]">.IND</span>
              </span>
              <span className="block text-[9px] tracking-[0.35em] uppercase text-gray-400 font-sans mt-0.5">
                Haute Parfumerie Française
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm mb-6">
              Dedicated to translating the refined grandeur of Parisian salons into timeless artisanal fragrances. Crafted for connoisseurs of discerning taste.
            </p>

            <div className="space-y-1 text-xs text-gray-400">
              <p><strong className="text-white">Concierge Desk:</strong> {settings.supportPhone}</p>
              <p><strong className="text-white">Email:</strong> {settings.supportEmail}</p>
              <p><strong className="text-white">Atelier:</strong> Rue de la Fontaine, Grasse / Nariman Point, Mumbai</p>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D84A26] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Fragrances
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=men" className="hover:text-white transition-colors">
                  Pour Homme
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=women" className="hover:text-white transition-colors">
                  Pour Femme
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=unisex" className="hover:text-white transition-colors">
                  Unisex Blends
                </Link>
              </li>
              <li>
                <Link href="/product/fp-08" className="hover:text-[#F3BA93] transition-colors font-medium">
                  Discovery Coffret (5 x 10 ml)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=woody-oud" className="hover:text-white transition-colors">
                  Royal Oud & Santal
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Care */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D84A26] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Orders & Tracking
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Saved Fragrances
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Fragrance Finder Quiz
                </Link>
              </li>
              <li>
                <span className="text-gray-400">Order Concierge & FAQs</span>
              </li>
              <li>
                <span className="text-gray-500">Shipping Policy (2-4 Days)</span>
              </li>
              <li>
                <span className="text-gray-500">Authenticity Certificate</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D84A26] mb-3">
              Le Club Privé
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Subscribe for private batch previews, master perfumer stories, and an instant 15% discount.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-white/10 border border-[#D84A26]/40 text-xs text-[#F3BA93]">
                Merci! Welcome to Le Club Privé. Code: <strong className="text-white">FRENCH15</strong>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#D84A26]"
                  />
                  <Mail className="w-4 h-4 text-gray-500 absolute right-3 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#D84A26] hover:bg-[#bf3e1d] text-white text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Join Le Club</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <div>
          © 2026 frenchperfume.ind. All Rights Reserved. Crafted with passion & French elegance.
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[11px] text-gray-400">100% Secure Checkout: UPI • Cards • COD • NetBanking</span>
        </div>
      </div>
    </footer>
  );
}
