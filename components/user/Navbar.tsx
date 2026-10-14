'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  ShieldCheck
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const {
    settings,
    cartCount,
    setIsCartDrawerOpen,
    wishlist,
    currentUser,
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
    <header className="sticky top-0 z-40 bg-white border-b border-[#E8E4DA] transition-all">
      {/* 1. Deep Forest Green Announcement Bar */}
      <div className="bg-[#153B27] text-[#F7F4EC] text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#0D2619]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left Text & Promo Code Pill */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-medium tracking-wide truncate">
            <span className="truncate">Affordable Luxury. Lasting Impressions.</span>
            <span className="text-[#D5B85A]/70 hidden xs:inline">|</span>
            <span className="hidden xs:inline text-[#F7F4EC]/85">Use Code:</span>
            <span className="px-2 py-0.5 rounded-full bg-[#D5B85A] text-[#153B27] font-bold text-[9px] sm:text-[10px] tracking-wider uppercase shadow-xs shrink-0">
              FRENCHLUXE
            </span>
          </div>

          {/* Right Help & Country Selector */}
          <div className="flex items-center gap-3 sm:gap-4 text-[#F7F4EC]/90 shrink-0 text-[10px] sm:text-xs">
            <div className="hidden md:flex items-center gap-1.5 text-[#D5B85A] text-[10px] tracking-wider uppercase font-medium">
              <Sparkles className="w-3 h-3 text-[#D5B85A]" />
              <span>Complimentary Discovery Vial on orders &gt; ₹999</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 hover:text-[#D5B85A] cursor-pointer transition-colors">
              <HelpCircle className="w-3.5 h-3.5 text-[#D5B85A]" />
              <span>Concierge</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 font-medium cursor-pointer">
              <span>🇮🇳</span>
              <span>IN / INR</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Search Bar Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-6">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-gray-800 hover:text-[#153B27] focus:outline-none -ml-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* Official French Perfume Brand Logo & Wordmark */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#D5B85A]/40 shadow-sm shrink-0 bg-[#153B27]">
                <Image
                  src="/logo.jpeg"
                  alt="French Perfume Official Logo"
                  fill
                  sizes="44px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-2xl md:text-[26px] font-medium tracking-[0.16em] uppercase text-[#153B27] group-hover:text-[#0D2619] transition-colors leading-none">
                  FRENCH PERFUME
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.32em] text-[#D5B85A] font-sans font-medium mt-0.5">
                  Haute Parfumerie
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar in center (Desktop) */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search Erba Gold, notes, woods, florals, collections..."
                className="w-full text-xs pl-10 pr-8 py-2.5 rounded-xl bg-[#F7F4EC]/70 hover:bg-[#F7F4EC] focus:bg-white border border-[#E8E4DA] focus:border-[#153B27] focus:ring-1 focus:ring-[#153B27]/20 focus:outline-none text-[#101310] transition-all"
              />
              <Search className="w-4 h-4 text-[#89977B] absolute left-3.5 top-3" />
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
              <div className="absolute left-0 right-0 top-12 bg-white rounded-2xl shadow-2xl border border-[#E8E4DA] p-3 z-50 animate-fade-in">
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/product/${item.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 py-2 px-2 hover:bg-[#F7F4EC] rounded-xl transition-colors group"
                      >
                        <div className="w-10 h-12 bg-gray-100 rounded-lg overflow-hidden relative shrink-0 border border-[#E8E4DA]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.thumbnail}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-serif font-medium text-black group-hover:text-[#153B27] truncate">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-[#89977B] italic truncate">{item.frenchName}</p>
                          <span className="text-xs font-semibold text-[#153B27]">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#153B27] group-hover:translate-x-0.5 transition-transform" />
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
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Sign In Button / Profile Avatar */}
            <Link
              href={currentUser ? '/account' : '/login'}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#153B27] hover:bg-[#0D2619] text-[#F7F4EC] text-xs font-medium tracking-wide transition-colors shadow-xs flex items-center gap-1.5 border border-[#153B27]"
            >
              <UserIcon className="w-3.5 h-3.5 text-[#D5B85A]" />
              <span className="hidden sm:inline">
                {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
              </span>
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-1.5 sm:p-0 flex items-center gap-1.5 text-xs font-medium text-gray-800 hover:text-[#153B27] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 text-gray-800 hover:text-[#153B27]" />
              <span className="hidden md:inline">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:static bg-[#153B27] text-[#D5B85A] text-[9px] sm:text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Bag Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-1.5 sm:p-0 flex items-center gap-1.5 text-xs font-medium text-gray-800 hover:text-[#153B27] transition-colors relative"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-gray-800 hover:text-[#153B27]" />
              <span className="hidden md:inline">Bag ({cartCount})</span>
              {cartCount > 0 && (
                <span className="md:hidden absolute -top-1.5 -right-1.5 bg-[#153B27] text-[#D5B85A] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search perfumes, notes, collections..."
              className="w-full text-xs pl-8 pr-7 py-2 rounded-xl bg-[#F7F4EC] text-[#101310] focus:outline-none focus:border-[#153B27] border border-[#E8E4DA]"
            />
            <Search className="w-3.5 h-3.5 text-[#89977B] absolute left-2.5 top-2.5" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-black absolute right-2.5 top-2.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Mobile Live Search Dropdown */}
          {isSearchOpen && searchQuery && (
            <div className="absolute left-0 right-0 top-11 bg-white rounded-2xl shadow-2xl border border-[#E8E4DA] p-2.5 z-50 animate-fade-in">
              {searchResults.length > 0 ? (
                <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.id}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-2.5 py-2 px-1 hover:bg-[#F7F4EC] rounded-xl transition-colors"
                    >
                      <div className="w-9 h-11 bg-gray-100 rounded-lg overflow-hidden relative shrink-0 border border-[#E8E4DA]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-serif font-medium text-black truncate">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-gray-500 italic truncate">{item.frenchName}</p>
                        <span className="text-xs font-semibold text-[#153B27]">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-3 text-center text-xs text-gray-500">
                  No fragrances found matching &quot;{searchQuery}&quot;.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Sub-Navigation Category Links (Desktop Bar) */}
      <div className="border-t border-[#E8E4DA] bg-white hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.12em] text-[#101310] py-2.5">
            <Link href="/" className="hover:text-[#153B27] transition-colors">
              HOME
            </Link>
            <Link href="/shop" className="hover:text-[#153B27] transition-colors">
              SHOP ALL
            </Link>
            <Link href="/shop?gender=men" className="hover:text-[#153B27] transition-colors">
              MEN&apos;S FRAGRANCES
            </Link>
            <Link href="/shop?gender=women" className="hover:text-[#153B27] transition-colors">
              WOMEN&apos;S FRAGRANCES
            </Link>
            <Link href="/shop?gender=unisex" className="hover:text-[#153B27] transition-colors">
              UNISEX
            </Link>
            <Link href="/shop?filter=bestseller" className="hover:text-[#153B27] transition-colors">
              BESTSELLERS
            </Link>
            <Link href="/shop?filter=new" className="hover:text-[#153B27] transition-colors">
              NEW ARRIVALS
            </Link>
            <Link href="/product/fp-erba-gold" className="hover:text-[#153B27] text-[#153B27] font-semibold transition-colors flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D5B85A]" />
              <span>ERBA GOLD</span>
            </Link>
            <Link href="/product/fp-08" className="hover:text-[#153B27] transition-colors">
              DISCOVERY SETS
            </Link>
            <Link
              href="/shop?filter=sale"
              className="text-[#153B27] bg-[#D5B85A]/20 px-2.5 py-0.5 rounded-full font-semibold hover:bg-[#D5B85A]/35 transition-colors"
            >
              OFFERS (15% OFF)
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E4DA] bg-white px-5 pt-4 pb-6 space-y-3 animate-fade-in text-xs font-medium uppercase tracking-wider max-h-[80vh] overflow-y-auto">
          {currentUser && (
            <div className="pb-3 border-b border-gray-100 flex items-center justify-between text-gray-500 normal-case font-normal">
              <span>Bonjour, <strong className="text-black font-semibold">{currentUser.name}</strong></span>
              <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="text-[#153B27] font-semibold text-xs">
                My Account →
              </Link>
            </div>
          )}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-gray-800 hover:text-[#153B27]"
          >
            Home
          </Link>
          <Link
            href="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-gray-800 hover:text-[#153B27]"
          >
            Shop All Fragrances
          </Link>
          <Link
            href="/shop?gender=men"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-gray-800 hover:text-[#153B27]"
          >
            Men&apos;s Fragrances
          </Link>
          <Link
            href="/shop?gender=women"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-gray-800 hover:text-[#153B27]"
          >
            Women&apos;s Fragrances
          </Link>
          <Link
            href="/shop?filter=bestseller"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-gray-800 hover:text-[#153B27]"
          >
            Bestsellers
          </Link>
          <Link
            href="/product/fp-erba-gold"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#153B27] font-semibold flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D5B85A]" />
            <span>Erba Gold Signature</span>
          </Link>
          <Link
            href="/product/fp-08"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-gray-800 hover:text-[#153B27]"
          >
            Discovery Coffrets
          </Link>
          <Link
            href="/shop?filter=sale"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-[#153B27] font-bold"
          >
            Offers (Use Code: FRENCHLUXE)
          </Link>
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-gray-500 normal-case font-normal text-xs">
            <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#153B27]" />
              <span>Wishlist ({wishlist.length})</span>
            </Link>
            <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-1.5">
              <UserIcon className="w-3.5 h-3.5 text-[#153B27]" />
              <span>Order Tracking</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
