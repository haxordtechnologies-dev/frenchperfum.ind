'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { useStore } from '../../context/StoreContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, Sparkles } from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    settings
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setCouponCode('');
  };

  const remainingForFreeShipping = Math.max(0, settings.freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / settings.freeShippingThreshold) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Header */}
        <div className="bg-[#F7F4EC] border-b border-[#E8E4DA] py-12 px-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#153B27] block mb-2 font-mono">
            French Perfume Checkout
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#101310] font-normal">
            Your Fragrance Bag
          </h1>
          <p className="text-xs text-gray-500 mt-2 font-mono uppercase tracking-widest">
            {cart.reduce((s, i) => s + i.quantity, 0)} Items Selected for Delivery
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {cart.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-20 bg-[#F7F4EC] rounded-3xl border border-[#E8E4DA] p-8">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 border border-[#E8E4DA]">
                <ShoppingBag className="w-8 h-8 text-[#153B27]" />
              </div>
              <h2 className="text-2xl font-serif text-black mb-2 font-normal">Your Bag is Empty</h2>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed font-light">
                Discover our signature Extraits de Parfum like Erba Gold or explore the Discovery Coffret to find your personal signature scent.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#153B27] hover:bg-[#0D2619] text-[#F7F4EC] text-xs font-semibold tracking-widest uppercase rounded-xl transition-colors shadow-md"
              >
                <span>Browse Fragrances</span>
                <ArrowRight className="w-4 h-4 text-[#D5B85A]" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Items List (8 Cols) */}
              <div className="lg:col-span-8 space-y-4">
                {/* Free shipping bar */}
                <div className="p-4 bg-[#F7F4EC] rounded-2xl border border-[#E8E4DA]">
                  <div className="flex justify-between text-xs text-gray-700 font-medium mb-1.5">
                    <span>
                      {remainingForFreeShipping > 0 ? (
                        <>Add <strong className="text-[#153B27] font-semibold">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> for Complimentary Express Shipping</>
                      ) : (
                        <span className="text-[#153B27] font-semibold flex items-center gap-1">
                          <Sparkles className="w-4 h-4 text-[#D5B85A]" /> Congratulations! You unlocked FREE Insured Express Shipping.
                        </span>
                      )}
                    </span>
                    <span className="text-gray-400 font-mono">{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full bg-[#E5E0D8] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#153B27] h-full transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-[#E8E4DA] border border-[#E8E4DA] rounded-3xl overflow-hidden bg-white">
                  {cart.map((item) => (
                    <div
                      key={`${item.productId}-${item.selectedSize}`}
                      className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:bg-[#F7F4EC]/40 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                        <div className="relative w-16 h-20 sm:w-20 sm:h-24 bg-[#F7F4EC] rounded-2xl overflow-hidden border border-[#E8E4DA] shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/product/${item.productId}`}
                            className="text-sm sm:text-base font-serif font-medium text-black hover:text-[#153B27] transition-colors truncate block"
                          >
                            {item.name}
                          </Link>
                          <p className="text-[11px] sm:text-xs text-gray-500 italic truncate">{item.frenchName}</p>
                          <div className="mt-1 text-[11px] sm:text-xs text-gray-600 font-mono">
                            Flacon: <span className="font-semibold text-[#153B27]">{item.selectedSize}</span> · {item.concentration}
                          </div>
                          <div className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                            Unit Price: ₹{item.price.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Item Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-gray-100">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#E8E4DA] rounded-xl overflow-hidden bg-[#F7F4EC]">
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.selectedSize, item.quantity - 1)}
                            className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-gray-600 hover:text-black hover:bg-gray-200"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-black">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.selectedSize, item.quantity + 1)}
                            className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-gray-600 hover:text-black hover:bg-gray-200"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right min-w-[90px]">
                          <div className="text-base sm:text-lg font-semibold text-[#153B27]">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                          {item.originalPrice > item.price && (
                            <div className="text-xs text-gray-400 line-through">
                              ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                            </div>
                          )}
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.productId, item.selectedSize)}
                          className="text-gray-400 hover:text-red-600 p-1.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={clearCart}
                    className="text-xs text-gray-400 hover:text-red-600 underline font-medium"
                  >
                    Clear All Items
                  </button>
                  <Link
                    href="/shop"
                    className="text-xs text-[#153B27] hover:underline font-semibold"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary & Coupon (4 Cols) */}
              <div className="lg:col-span-4">
                <div className="bg-[#F7F4EC] rounded-3xl p-6 sm:p-7 border border-[#E8E4DA] space-y-6 sticky top-24 shadow-sm">
                  <h3 className="font-serif text-xl font-medium text-black">
                    Order Summary
                  </h3>

                  {/* Coupon Form */}
                  <div>
                    {appliedCoupon ? (
                      <div className="p-3 rounded-2xl bg-[#153B27]/10 border border-[#153B27]/30 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-[#153B27]">
                          <Tag className="w-4 h-4 text-[#D5B85A]" />
                          <div>
                            <span className="font-bold">{appliedCoupon.code}</span>
                            <span className="text-[11px] opacity-80 block">{appliedCoupon.discountPercent}% Discount saved</span>
                          </div>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-gray-600 hover:text-red-600 text-xs font-medium underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Coupon code (e.g. FRENCHLUXE)"
                            className="flex-1 uppercase text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E4DA] bg-white text-black focus:outline-none focus:border-[#153B27]"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2.5 bg-[#153B27] text-white text-xs font-semibold rounded-xl hover:bg-[#0D2619] transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        {couponMsg && (
                          <p className={`text-xs ${couponMsg.isError ? 'text-red-600' : 'text-[#153B27]'}`}>
                            {couponMsg.text}
                          </p>
                        )}
                        <div className="text-[11px] text-gray-500">
                          Try code <code className="bg-[#153B27]/10 px-1.5 py-0.5 rounded font-mono text-[#153B27] font-semibold">FRENCHLUXE</code> for 15% OFF!
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-2.5 text-xs text-gray-600 border-t border-[#E8E4DA] pt-4">
                    <div className="flex justify-between">
                      <span>Bag Subtotal</span>
                      <span className="font-medium text-black">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-[#153B27] font-medium">
                        <span>Promotional Discount</span>
                        <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Insured Express Shipping</span>
                      <span>{cartShipping === 0 ? <strong className="text-[#153B27]">FREE</strong> : `₹${cartShipping}`}</span>
                    </div>

                    <div className="flex justify-between text-lg font-serif font-medium text-black border-t border-[#E8E4DA] pt-3">
                      <span>Total Amount</span>
                      <span className="text-[#153B27] font-semibold">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 italic">Inclusive of all taxes across India</p>
                  </div>

                  {/* Checkout CTA */}
                  <Link
                    href="/checkout"
                    className="w-full py-4 px-6 bg-[#153B27] hover:bg-[#0D2619] text-[#F7F4EC] text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 text-[#D5B85A] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1">
                    <ShieldCheck className="w-4 h-4 text-[#153B27]" />
                    <span>Secure Encrypted Payment Gateway</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
