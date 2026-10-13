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

  const currentSizeObj = quickViewProduct.sizes.find(s => s.size === selectedSize) || quickViewProduct.sizes[0];
  const activePrice = currentSizeObj ? currentSizeObj.price : quickViewProduct.price;
  const activeOriginalPrice = currentSizeObj ? currentSizeObj.originalPrice : quickViewProduct.originalPrice;
  const isWish = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 animate-fade-in border border-[#EEEBE6]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black shadow-sm transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative bg-[#F8F6F2] p-8 flex items-center justify-center min-h-[360px]">
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-inner">
              <Image
                src={quickViewProduct.thumbnail || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            {quickViewProduct.badge && (
              <span className="absolute top-6 left-6 px-3 py-1 bg-[#111111] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase rounded-full shadow-md">
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span className="uppercase tracking-widest text-[#C5A880] font-medium">
                  {quickViewProduct.concentration}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-semibold text-gray-800">{quickViewProduct.rating}</span>
                  <span className="text-gray-400">({quickViewProduct.reviewCount})</span>
                </div>
              </div>

              <h2 className="text-2xl font-serif text-[#111111] font-normal leading-tight">
                {quickViewProduct.name}
              </h2>
              <p className="text-xs text-gray-500 italic mt-0.5">{quickViewProduct.frenchName}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-3">
                <span className="text-2xl font-semibold text-[#111111]">
                  ₹{activePrice.toLocaleString('en-IN')}
                </span>
                {activeOriginalPrice > activePrice && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{activeOriginalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-[#E6F4EA] text-[#1E7B3A] rounded">
                      {quickViewProduct.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                {quickViewProduct.description}
              </p>

              {/* Fragrance Notes Highlights */}
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EEEBE6] mb-4 text-xs">
                <span className="font-semibold text-gray-800 block mb-1">Notes Olfactives:</span>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-gray-600">
                  <div>
                    <span className="text-gray-400 block">Top</span>
                    <span className="font-medium text-black truncate block">{quickViewProduct.notes.top[0]}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Heart</span>
                    <span className="font-medium text-black truncate block">{quickViewProduct.notes.heart[0]}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Base</span>
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
                          ? 'bg-[#4A0E17] text-white border-[#4A0E17] shadow-xs'
                          : 'bg-white text-gray-700 border-[#EEEBE6] hover:border-gray-400'
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
                <div className="flex items-center border border-[#EEEBE6] rounded-xl overflow-hidden bg-[#FAF8F5]">
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
                  className="flex-1 py-3 px-4 bg-[#4A0E17] hover:bg-[#360910] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#F3BA93]" />
                  <span>Add to Bag · ₹{(activePrice * quantity).toLocaleString('en-IN')}</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-xl border border-[#EEEBE6] transition-colors ${
                    isWish ? 'text-red-500 bg-red-50/50' : 'text-gray-400 hover:text-red-500 bg-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWish ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#EEEBE6]">
                <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1E7B3A]" />
                  <span>100% Original French Concentrate</span>
                </div>
                <Link
                  href={`/product/${quickViewProduct.id}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="text-xs font-semibold text-[#111111] hover:text-[#C5A880] inline-flex items-center gap-1 transition-colors"
                >
                  Full Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
