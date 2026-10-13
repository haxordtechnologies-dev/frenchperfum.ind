'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    settings
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = settings.freeShippingThreshold;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
          {/* Header */}
          <div className="p-5 border-b border-[#EEEBE6] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#4A0E17]" />
              <h2 className="text-lg font-serif tracking-wide text-[#4A0E17]">
                Your Fragrance Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 hover:text-black transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping & Perks Progress Bar */}
          <div className="bg-[#FAF8F5] px-5 py-3 border-b border-[#EEEBE6]">
            <div className="flex items-center justify-between text-xs font-medium text-gray-700 mb-1.5">
              <span>
                {remainingForFreeShipping > 0 ? (
                  <>Add <strong className="text-[#4A0E17] font-semibold">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> for Free Shipping & Discovery Vial</>
                ) : (
                  <span className="text-[#1E7B3A] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> You unlocked FREE Express Shipping & Gift Vial!
                  </span>
                )}
              </span>
              <span className="text-gray-400">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#E5E0D8] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#4A0E17] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] flex items-center justify-center mx-auto mb-4 border border-[#EEEBE6]">
                  <ShoppingBag className="w-8 h-8 text-[#4A0E17]" />
                </div>
                <h3 className="text-lg font-serif text-[#111111] mb-1">Your bag is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6">
                  Experience French artisanal perfumery with our signature collections or discovery coffrets.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="inline-flex items-center justify-center px-6 py-3 text-xs tracking-widest uppercase bg-[#4A0E17] text-white rounded-lg hover:bg-[#360910] transition-colors"
                >
                  Explore Fragrances
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedSize}`}
                  className="flex gap-4 p-3 rounded-xl border border-[#EEEBE6] bg-white hover:border-[#D4CFCE] transition-colors"
                >
                  <div className="relative w-20 h-24 bg-[#F8F6F2] rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.productId}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="text-sm font-serif font-medium text-[#111111] hover:text-[#4A0E17] transition-colors truncate"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.productId, item.selectedSize)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 italic truncate">{item.frenchName}</p>
                      <div className="inline-block mt-1 px-2 py-0.5 bg-[#FAF8F5] border border-[#EEEBE6] rounded text-[11px] text-gray-700">
                        {item.selectedSize} · {item.concentration}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed border-gray-100">
                      <div className="flex items-center border border-[#EEEBE6] rounded-md overflow-hidden bg-[#FAF8F5]">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.selectedSize, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:text-black hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.selectedSize, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:text-black hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-[#111111]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                        {item.originalPrice > item.price && (
                          <div className="text-[11px] text-gray-400 line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Coupon & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EEEBE6] bg-[#FAF8F5] space-y-4">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#E6F4EA] border border-[#1E7B3A]/30 px-3 py-2 rounded-lg text-xs">
                    <div className="flex items-center gap-2 text-[#1E7B3A]">
                      <Tag className="w-3.5 h-3.5" />
                      <span>
                        Code <strong className="font-semibold">{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-gray-500 hover:text-red-600 font-medium text-xs underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Promo code (e.g. FRENCH15)"
                        className="w-full uppercase text-xs px-3 py-2.5 rounded-lg border border-[#EEEBE6] bg-white focus:outline-none focus:border-[#4A0E17]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#4A0E17] hover:bg-[#360910] text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
              </div>

              {/* Order Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#1E7B3A]">
                    <span>Discount</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{cartShipping === 0 ? <strong className="text-[#1E7B3A]">FREE</strong> : `₹${cartShipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#111111] pt-2 border-t border-[#EEEBE6]">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-gray-400 italic">Inclusive of all duties & taxes across India</p>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#4A0E17] hover:bg-[#360910] text-white text-xs font-semibold tracking-widest uppercase rounded-xl shadow-md transition-all group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1E7B3A]" />
                  <span>Guaranteed Authentic & Safe Checkout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
