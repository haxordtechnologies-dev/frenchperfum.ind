'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';
import { X, Star, Heart, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, isInWishlist, toggleWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0]?.size || '50 ml');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const currentSizeObj = quickViewProduct.sizes.find((s) => s.size === selectedSize) || quickViewProduct.sizes[0];
  const activePrice = currentSizeObj ? currentSizeObj.price : quickViewProduct.price;
  const activeOriginalPrice = currentSizeObj ? currentSizeObj.originalPrice : quickViewProduct.originalPrice;
  const isWish = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl z-10 animate-fade-in border border-[#E8E4DA]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black shadow-sm transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative bg-[#F7F4EC] p-4 sm:p-8 flex items-center justify-center min-h-[240px] sm:min-h-[360px]">
            <div className="relative w-full h-56 sm:h-80 rounded-2xl overflow-hidden shadow-inner border border-[#E8E4DA]">
              <Image
                src={quickViewProduct.thumbnail || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            {quickViewProduct.badge && (
              <span className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1 bg-[#153B27] text-[#D5B85A] text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase rounded-md shadow-md border border-[#D5B85A]/30">
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span className="uppercase tracking-[0.2em] text-[#153B27] font-semibold">
                  {quickViewProduct.concentration}
                </span>
                <div className="flex items-center gap-1 text-[#D5B85A]">
                  <Star className="w-3.5 h-3.5 fill-current text-[#D5B85A]" />
                  <span className="font-semibold text-gray-900">{quickViewProduct.rating}</span>
                  <span className="text-gray-400">({quickViewProduct.reviewCount})</span>
                </div>
              </div>

              <h2 className="text-2xl font-serif text-[#101310] font-normal leading-tight">
                {quickViewProduct.name}
              </h2>
              <p className="text-xs text-gray-500 italic mt-0.5">{quickViewProduct.frenchName}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-3">
                <span className="text-2xl font-semibold text-[#153B27]">
                  ₹{activePrice.toLocaleString('en-IN')}
                </span>
                {activeOriginalPrice > activePrice && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{activeOriginalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-[#153B27]/10 text-[#153B27] rounded-md">
                      {quickViewProduct.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4 font-light">
                {quickViewProduct.description}
              </p>

              {/* Fragrance Notes Highlights */}
              <div className="bg-[#F7F4EC] p-3 rounded-2xl border border-[#E8E4DA] mb-4 text-xs">
                <span className="font-semibold text-[#153B27] block mb-1">Notes Olfactives:</span>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-gray-600">
                  <div>
                    <span className="text-gray-400 block font-light">Top</span>
                    <span className="font-medium text-black truncate block">{quickViewProduct.notes.top[0]}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-light">Heart</span>
                    <span className="font-medium text-black truncate block">{quickViewProduct.notes.heart[0]}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-light">Base</span>
                    <span className="font-medium text-black truncate block">{quickViewProduct.notes.base[0]}</span>
                  </div>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-4">
                <label className="text-xs font-medium text-gray-700 block mb-2">
                  Select Flacon Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => setSelectedSize(s.size)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedSize === s.size
                          ? 'bg-[#153B27] text-[#D5B85A] border-[#153B27] shadow-xs'
                          : 'bg-white text-gray-700 border-[#E8E4DA] hover:border-gray-400'
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E8E4DA] rounded-xl overflow-hidden bg-[#F7F4EC]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-gray-600 hover:text-black"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2.5 text-gray-600 hover:text-black"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-[#153B27] hover:bg-[#0D2619] text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#D5B85A]" />
                  <span>Add to Bag · ₹{(activePrice * quantity).toLocaleString('en-IN')}</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-xl border border-[#E8E4DA] transition-colors ${
                    isWish ? 'text-red-500 bg-red-50/50' : 'text-gray-400 hover:text-red-500 bg-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWish ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E8E4DA]">
                <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#153B27]" />
                  <span>100% Genuine French Essence</span>
                </div>
                <Link
                  href={`/product/${quickViewProduct.id}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="text-xs font-semibold text-[#153B27] hover:underline inline-flex items-center gap-1 transition-colors"
                >
                  Full Details <ArrowRight className="w-3 h-3 text-[#D5B85A]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
