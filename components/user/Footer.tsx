'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '../../context/StoreContext';
import { Mail, ArrowRight, ShieldCheck, Clock, Award, Sparkles, X, FileText } from 'lucide-react';

type PolicyType = 'shipping' | 'returns' | 'privacy' | 'terms' | null;

export default function Footer() {
  const { settings, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Bienvenue au Club Privé! Use code FRENCHLUXE for 15% off.');
    setEmail('');
  };

  const policyContent: Record<NonNullable<PolicyType>, { title: string; subtitle: string; content: React.ReactNode }> = {
    shipping: {
      title: 'Shipping & Delivery Policy',
      subtitle: 'Express Pan-India Logistics & White-Glove Packaging',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <p>
            At <strong>French Perfume</strong>, every flacon is treated as a delicate art piece. Orders are packaged in tamper-evident, cushioned presentation boxes to ensure pristine transit.
          </p>
          <div className="bg-[#153B27]/40 p-4 rounded-xl border border-[#D5B85A]/30">
            <h5 className="font-semibold text-white mb-1 text-xs uppercase tracking-wider text-[#D5B85A]">Dispatch Timelines</h5>
            <p className="text-xs">
              Orders placed before 2:00 PM IST are dispatched on the same business day. Standard delivery takes <strong>2 to 4 business days</strong> across metro cities and 3 to 6 business days for regional pin codes.
            </p>
          </div>
          <p>
            <strong>Free Shipping:</strong> Complimentary insured delivery is provided on all orders above <strong>₹999</strong>. Orders below ₹999 incur a standard nominal fee of ₹99.
          </p>
          <p>
            <strong>Tracking:</strong> A real-time SMS &amp; WhatsApp tracking link is triggered as soon as your parcel is scanned by our premium courier partners (Blue Dart, Delhivery, Xpressbees).
          </p>
        </div>
      ),
    },
    returns: {
      title: 'Returns & Exchange Policy',
      subtitle: 'Complimentary Discovery Sample Guarantee',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <p>
            Because fine fragrance interacts intimately with body chemistry and personal skin temperature, we provide our signature <strong>Discovery Sample Guarantee</strong> with every full-size bottle.
          </p>
          <div className="bg-[#153B27]/40 p-4 rounded-xl border border-[#D5B85A]/30">
            <h5 className="font-semibold text-white mb-1 text-xs uppercase tracking-wider text-[#D5B85A]">How It Works</h5>
            <p className="text-xs">
              Your 50ml or 100ml flacon arrives alongside a complimentary matching 2ml discovery vial. First, spray and experience the 2ml sample over 48 hours. If the fragrance does not perfectly resonate with you, you may return the unopened, sealed full-size flacon within <strong>7 days</strong> for a 100% refund or store credit.
            </p>
          </div>
          <p>
            <strong>Damaged or Defective In Transit:</strong> In the rare event of transit leakage or nozzle malfunction, notify our Concierge desk within 48 hours with photo proof, and a replacement will be dispatched without hassle.
          </p>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Commitment to Patron Discretion and Data Security',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <p>
            French Perfume values your trust and privacy above all. We only collect the minimal personal information necessary to fulfill your orders, process secure payments, and provide tailored concierge recommendations.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li>We do not sell, rent, or trade your personal email, phone number, or purchase history to third-party data brokers.</li>
            <li>All credit card, debit card, UPI, and banking transactions are processed through 256-bit bank-grade encrypted SSL gateways.</li>
            <li>You may unsubscribe from Le Club Privé emails or promotional communications at any time with one click.</li>
          </ul>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'Authentic Luxury Formulation Standards',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <p>
            Welcome to the official online boutique of <strong>French Perfume</strong>. By placing an order, you agree to our standard terms of service.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li><strong>Authenticity &amp; Formulation:</strong> All fragrances are compounded strictly with certified, skin-safe pure perfume oils in accordance with international safety guidelines.</li>
            <li><strong>Pricing &amp; Taxes:</strong> All listed prices are inclusive of all applicable GST taxes. Promotional discount codes (such as FRENCHLUXE) cannot be stacked with clearance items unless stated otherwise.</li>
            <li><strong>Product Presentation:</strong> Minor artisanal packaging updates may occur between release batches while preserving the exact Olfactory composition.</li>
          </ul>
        </div>
      ),
    },
  };

  return (
    <footer className="bg-[#101310] text-[#F7F4EC] pt-12 sm:pt-16 pb-8 sm:pb-12 border-t border-[#153B27]/40">
      {/* Brand Value Pillars / Perks Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#153B27]/60 border border-[#D5B85A]/30 text-[#D5B85A] shrink-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-medium tracking-wide text-white">
                Grasse Formulation Tradition
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">
                Composed with noble botanicals and royal resins rooted in historic French artisanal perfumery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#153B27]/60 border border-[#D5B85A]/30 text-[#D5B85A] shrink-0">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-medium tracking-wide text-white">
                14+ Hours Sillage
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">
                High 30%+ perfume oil concentration ensures radiant projection and day-to-night lasting power.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#153B27]/60 border border-[#D5B85A]/30 text-[#D5B85A] shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-medium tracking-wide text-white">
                Complimentary Discovery Vial
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">
                Receive hand-picked luxury discovery samples with all orders above ₹999.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#153B27]/60 border border-[#D5B85A]/30 text-[#D5B85A] shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-medium tracking-wide text-white">
                Express Pan-India Delivery
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed font-light">
                Dispatched in tamper-proof cushioned presentation boxes with live tracking.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          
          {/* Brand Info with Official Logo */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D5B85A]/40 shrink-0 bg-[#153B27]">
                <Image
                  src="/logo.jpeg"
                  alt="French Perfume Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-normal tracking-[0.16em] uppercase text-white group-hover:text-[#D5B85A] transition-colors leading-none">
                  FRENCH PERFUME
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.32em] text-[#D5B85A] font-sans font-medium mt-1">
                  Haute Parfumerie
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm mb-6 font-light">
              Dedicated to translating French high perfumery into accessible signature fragrances. Distilled with pure natural concentrates for unforgettable impressions.
            </p>

            <div className="space-y-1.5 text-xs text-gray-400">
              <p><strong className="text-white font-medium">Concierge Desk:</strong> {settings.supportPhone}</p>
              <p><strong className="text-white font-medium">Email:</strong> {settings.supportEmail}</p>
              <div className="pt-3 flex flex-wrap items-center gap-2.5">
                <a
                  href="https://www.instagram.com/frenchperfume.ind/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#153B27] hover:bg-[#1D4E34] text-[#D5B85A] border border-[#D5B85A]/30 text-xs transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span className="font-medium tracking-wide">@frenchperfume.ind</span>
                </a>

                <a
                  href={`https://wa.me/${settings.supportPhone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs transition-colors"
                >
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D5B85A] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shop All Fragrances
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=men" className="hover:text-white transition-colors">
                  Men&apos;s Fragrances
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=women" className="hover:text-white transition-colors">
                  Women&apos;s Fragrances
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=unisex" className="hover:text-white transition-colors">
                  Unisex Haute Line
                </Link>
              </li>
              <li>
                <Link href="/product/fp-erba-gold" className="hover:text-[#D5B85A] text-[#D5B85A] font-medium transition-colors">
                  Erba Gold (Signature)
                </Link>
              </li>
              <li>
                <Link href="/product/fp-08" className="hover:text-[#D5B85A] transition-colors">
                  Discovery Coffret (5 x 10 ml)
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About French Perfume
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Care & Policies */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D5B85A] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Orders &amp; Tracking
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Saved Fragrances
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicy('shipping')}
                  className="hover:text-white transition-colors text-left"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicy('returns')}
                  className="hover:text-white transition-colors text-left"
                >
                  Return &amp; Exchange Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicy('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicy('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D5B85A] mb-3">
              Le Club Privé
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed mb-4 font-light">
              Join for private release notifications, perfume masterclasses, and an instant 15% welcome discount.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#153B27] border border-[#D5B85A]/40 text-xs text-[#F7F4EC]">
                Merci! Welcome to Le Club Privé. Code: <strong className="text-[#D5B85A]">FRENCHLUXE</strong>
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
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#D5B85A]"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#D5B85A] hover:bg-[#C5A543] text-[#153B27] text-xs font-bold tracking-[0.14em] uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>JOIN LE CLUB · 15% OFF</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#153B27]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <div>
          © 2026 French Perfume. All Rights Reserved. A Signature Scent. An Unforgettable Impression.
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#D5B85A]">
          <button type="button" onClick={() => setActivePolicy('privacy')} className="hover:underline">
            Privacy
          </button>
          <span>•</span>
          <button type="button" onClick={() => setActivePolicy('terms')} className="hover:underline">
            Terms
          </button>
          <span>•</span>
          <button type="button" onClick={() => setActivePolicy('shipping')} className="hover:underline">
            Shipping
          </button>
          <span>•</span>
          <span>100% Secure Checkout: UPI • Cards • COD • NetBanking</span>
        </div>
      </div>

      {/* Policy Modal */}
      {activePolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#101310] border border-[#D5B85A]/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-[#F7F4EC] max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActivePolicy(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#153B27] text-[#D5B85A]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                  {policyContent[activePolicy].title}
                </h3>
                <p className="text-xs text-[#D5B85A] tracking-wider uppercase">
                  {policyContent[activePolicy].subtitle}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              {policyContent[activePolicy].content}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                className="px-5 py-2 rounded-xl bg-[#153B27] hover:bg-[#1D4E34] text-[#D5B85A] border border-[#D5B85A]/30 text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
