'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const {
    settings,
    cartCount,
    setIsCartDrawerOpen,
    wishlist,
    currentUser,
    switchUserRole,
    products
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.frenchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.notes.top.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.notes.heart.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EEEBE6] transition-all">
      {/* 1. Deep Wine Announcement Bar (Exact Olfacy Style) */}
      <div className="bg-[#4A0E17] text-white text-[11px] sm:text-xs py-2 px-4 border-b border-[#380A11]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Text & Promo Code Pill */}
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span>FLAT 15% OFF on your first order</span>
            <span className="text-white/60">|</span>
            <span>Use code:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#D84A26] text-white font-bold text-[10px] tracking-wider uppercase shadow-xs">
              FRENCH15
            </span>
          </div>

          {/* Right Help & Country Selector */}
          <div className="flex items-center gap-4 text-white/90">
            <div className="hidden sm:flex items-center gap-1.5 hover:text-white cursor-pointer text-xs">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
              <span>🇮🇳</span>
              <span>IN / INR</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Search Bar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-800 hover:text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo in Deep Wine Serif Typography */}
          <div className="shrink-0">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.18em] uppercase text-[#4A0E17] group-hover:opacity-90 transition-opacity">
                FRENCHPERFUME
              </span>
            </Link>
          </div>

          {/* Search Bar in center with light gray background */}
          <div className="flex-1 max-w-2xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search perfumes, brands, notes, occasions..."
                className="w-full text-xs pl-10 pr-8 py-2.5 rounded-lg bg-[#F4F4F4] hover:bg-[#EFEFEF] focus:bg-white border border-transparent focus:border-[#4A0E17] focus:outline-none text-black transition-colors"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-black absolute right-3 top-3"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Live Search dropdown */}
            {isSearchOpen && searchQuery && (
              <div className="absolute left-0 right-0 top-12 bg-white rounded-xl shadow-2xl border border-[#EEEBE6] p-3 z-50 animate-fade-in">
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/product/${item.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 py-2 px-2 hover:bg-[#FAF8F5] rounded-lg transition-colors group"
                      >
                        <div className="w-10 h-12 bg-gray-100 rounded overflow-hidden relative shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-serif font-medium text-black group-hover:text-[#4A0E17] truncate">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-gray-500 italic truncate">{item.frenchName}</p>
                          <span className="text-xs font-semibold text-black">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-xs text-gray-500">
                    No fragrances found matching &quot;{searchQuery}&quot;.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons (Sign In, Wishlist, Bag) */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {/* Sign In Button styled in deep wine */}
            <Link
              href={currentUser ? '/account' : '/login'}
              className="px-4 sm:px-5 py-2 rounded-lg bg-[#4A0E17] hover:bg-[#380A11] text-white text-xs font-semibold tracking-wide transition-colors shadow-xs"
            >
              {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-800 hover:text-[#4A0E17] transition-colors relative"
            >
              <Heart className="w-4 h-4 text-gray-800" />
              <span className="hidden sm:inline">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="bg-[#4A0E17] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Bag Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-800 hover:text-[#4A0E17] transition-colors relative"
            >
              <ShoppingBag className="w-4 h-4 text-gray-800" />
              <span>Bag ({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search perfumes, brands, notes..."
              className="w-full text-xs pl-9 pr-4 py-2 rounded-lg bg-[#F4F4F4] text-black focus:outline-none focus:border-[#4A0E17] border border-transparent"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          </form>
        </div>
      </div>

      {/* 3. Sub-Navigation Category Links (Exact Olfacy Category Links Bar) */}
      <div className="border-t border-[#EEEBE6] bg-white hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-gray-800 py-3">
            <Link href="/shop?filter=new" className="hover:text-[#4A0E17] transition-colors">
              NEW ARRIVALS
            </Link>
            <Link href="/shop?gender=men" className="hover:text-[#4A0E17] transition-colors">
              MEN
            </Link>
            <Link href="/shop?gender=women" className="hover:text-[#4A0E17] transition-colors">
              WOMEN
            </Link>
            <Link href="/shop?gender=unisex" className="hover:text-[#4A0E17] transition-colors">
              UNISEX
            </Link>
            <Link href="/shop?category=oriental-amber" className="hover:text-[#4A0E17] transition-colors">
              NICHE
            </Link>
            <Link href="/shop?filter=bestseller" className="hover:text-[#4A0E17] transition-colors">
              BEST SELLERS
            </Link>
            <Link href="/shop?category=woody-oud" className="hover:text-[#4A0E17] transition-colors">
              ARABIC & OUD
            </Link>
            <Link href="/product/fp-08" className="hover:text-[#4A0E17] transition-colors">
              DISCOVERY SETS
            </Link>
            <Link href="/shop" className="hover:text-[#4A0E17] transition-colors">
              GIFTING
            </Link>
            <Link href="/shop" className="hover:text-[#4A0E17] transition-colors flex items-center gap-1">
              <span>BRANDS</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </Link>
            <Link
              href="/shop?filter=sale"
              className="text-[#D84A26] font-bold hover:text-[#bf3e1d] transition-colors"
            >
              OFFERS
            </Link>
            <Link href="/shop" className="hover:text-[#4A0E17] transition-colors">
              CURATOR&apos;S PICKS
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EEEBE6] bg-white px-5 pt-3 pb-6 space-y-3 animate-fade-in text-xs font-semibold uppercase tracking-wider">
          <Link
            href="/shop?filter=new"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-gray-800 hover:text-[#4A0E17]"
          >
            New Arrivals
          </Link>
          <Link
            href="/shop?gender=men"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-gray-800 hover:text-[#4A0E17]"
          >
            Men
          </Link>
          <Link
            href="/shop?gender=women"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-gray-800 hover:text-[#4A0E17]"
          >
            Women
          </Link>
          <Link
            href="/shop?gender=unisex"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-gray-800 hover:text-[#4A0E17]"
          >
            Unisex
          </Link>
          <Link
            href="/shop?category=woody-oud"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-gray-800 hover:text-[#4A0E17]"
          >
            Arabic & Oud
          </Link>
          <Link
            href="/product/fp-08"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-gray-800 hover:text-[#4A0E17]"
          >
            Discovery Sets
          </Link>
          <Link
            href="/shop?filter=sale"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#D84A26] font-bold"
          >
            Offers (15% OFF)
          </Link>
        </div>
      )}
    </header>
  );
}
