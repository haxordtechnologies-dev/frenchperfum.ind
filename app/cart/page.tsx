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
        <div className="bg-[#FAF8F5] border-b border-[#EEEBE6] py-12 px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#111111]">
            Your Fragrance Bag
          </h1>
          <p className="text-xs text-gray-500 mt-2 font-mono uppercase tracking-widest">
            {cart.reduce((s, i) => s + i.quantity, 0)} Items Selected for Delivery
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {cart.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-20 bg-[#FAF8F5] rounded-3xl border border-[#EEEBE6] p-8">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 border border-[#EEEBE6]">
                <ShoppingBag className="w-8 h-8 text-[#C5A880]" />
              </div>
              <h2 className="text-2xl font-serif text-black mb-2">Your Bag is Empty</h2>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                Discover our hand-distilled French Extraits de Parfum or order the Discovery Coffret to find your bespoke signature scent.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] hover:bg-black text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-colors"
              >
                <span>Browse Fragrances</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Items List (8 Cols) */}
              <div className="lg:col-span-8 space-y-4">
                {/* Free shipping bar */}
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EEEBE6]">
                  <div className="flex justify-between text-xs text-gray-700 font-medium mb-1.5">
                    <span>
                      {remainingForFreeShipping > 0 ? (
                        <>Add <strong className="text-black font-semibold">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> for Complimentary Express Shipping</>
                      ) : (
                        <span className="text-[#1E7B3A] font-semibold flex items-center gap-1">
                          <Sparkles className="w-4 h-4" /> Congratulations! You unlocked FREE Insured Express Shipping.
                        </span>
                      )}
                    </span>
                    <span className="text-gray-400">{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full bg-[#E5E0D8] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-black h-full transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-[#EEEBE6] border border-[#EEEBE6] rounded-2xl overflow-hidden bg-white">
                  {cart.map((item) => (
                    <div
                      key={`${item.productId}-${item.selectedSize}`}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5]/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-24 bg-[#FAF8F5] rounded-xl overflow-hidden border border-[#EEEBE6] shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/product/${item.productId}`}
                            className="text-base font-serif font-medium text-black hover:text-[#C5A880] transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-gray-500 italic">{item.frenchName}</p>
                          <div className="mt-1 text-xs text-gray-600 font-mono">
                            Flacon: <span className="font-semibold text-black">{item.selectedSize}</span> · {item.concentration}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            Unit Price: ₹{item.price.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Item Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-gray-100">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#EEEBE6] rounded-xl overflow-hidden bg-white">
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.selectedSize, item.quantity - 1)}
                            className="px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.selectedSize, item.quantity + 1)}
                            className="px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right min-w-[90px]">
                          <span className="text-base font-semibold text-black">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>

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
                  <Link
                    href="/shop"
                    className="text-xs font-semibold text-black hover:text-[#C5A880] underline"
                  >
                    ← Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-xs text-gray-500 hover:text-red-600"
                  >
                    Clear Entire Bag
                  </button>
                </div>
              </div>

              {/* Order Summary Right (4 Cols) */}
              <div className="lg:col-span-4">
                <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#EEEBE6] space-y-6 sticky top-28 shadow-sm">
                  <h3 className="font-serif text-xl text-black">Summary of Order</h3>

                  {/* Coupon Code Section */}
                  <div>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-3 bg-[#E6F4EA] border border-[#1E7B3A]/30 rounded-xl text-xs">
                        <div className="flex items-center gap-2 text-[#1E7B3A]">
                          <Tag className="w-4 h-4" />
                          <div>
                            <span className="font-bold block">{appliedCoupon.code} Applied</span>
                            <span className="text-[11px] opacity-80">{appliedCoupon.discountPercent}% Discount saved</span>
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
                            className="flex-1 uppercase text-xs px-3.5 py-2.5 rounded-xl border border-[#EEEBE6] bg-white text-black focus:outline-none focus:border-black"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2.5 bg-black text-white text-xs font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        {couponMsg && (
                          <p className={`text-xs ${couponMsg.isError ? 'text-red-600' : 'text-[#1E7B3A]'}`}>
                            {couponMsg.text}
                          </p>
                        )}
                        <div className="text-[11px] text-gray-500">
                          Try code <code className="bg-gray-200 px-1 py-0.5 rounded font-mono text-black font-semibold">FRENCHLUXE</code> for 15% OFF!
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-2.5 text-xs text-gray-600 border-t border-[#EEEBE6] pt-4">
                    <div className="flex justify-between">
                      <span>Bag Subtotal</span>
                      <span className="font-medium text-black">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-[#1E7B3A]">
                        <span>Promotional Discount</span>
                        <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Insured Express Shipping</span>
                      <span>{cartShipping === 0 ? <strong className="text-[#1E7B3A]">FREE</strong> : `₹${cartShipping}`}</span>
                    </div>

                    <div className="flex justify-between text-lg font-serif font-bold text-black border-t border-[#EEEBE6] pt-3">
                      <span>Total Amount</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 italic">Inclusive of all taxes and import formulation duties</p>
                  </div>

                  {/* Checkout CTA */}
                  <Link
                    href="/checkout"
                    className="w-full py-4 px-6 bg-[#111111] hover:bg-black text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1">
                    <ShieldCheck className="w-4 h-4 text-[#1E7B3A]" />
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
