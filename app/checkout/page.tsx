'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { useStore } from '../../context/StoreContext';
import { Order, Address } from '../../types';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  Building,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    placeOrder,
    currentUser,
    showToast
  } = useStore();

  // Form fields
  const [fullName, setFullName] = useState(currentUser?.name || 'Rohit Vashisht');
  const [email, setEmail] = useState(currentUser?.email || 'rohit.vashisht@example.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98112 34567');
  const [street, setStreet] = useState(currentUser?.addresses[0]?.street || 'Villa 42, Palm Meadows, Whitefield');
  const [landmark, setLandmark] = useState('Near Forum Mall');
  const [city, setCity] = useState(currentUser?.addresses[0]?.city || 'Bengaluru');
  const [state, setState] = useState(currentUser?.addresses[0]?.state || 'Karnataka');
  const [pincode, setPincode] = useState(currentUser?.addresses[0]?.pincode || '560066');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md bg-[#FAF8F5] p-8 rounded-2xl border border-[#EEEBE6]">
            <ShoppingBag className="w-12 h-12 text-[#C5A880] mx-auto mb-3" />
            <h2 className="text-2xl font-serif text-black mb-2">No Items in Checkout</h2>
            <p className="text-xs text-gray-500 mb-6">
              Please add perfumes or a Discovery Coffret to your shopping bag before proceeding.
            </p>
            <Link
              href="/shop"
              className="px-6 py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl inline-block"
            >
              Explore Collections
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !street || !city || !pincode) {
      showToast('Please fill all mandatory shipping address fields');
      return;
    }

    setIsProcessing(true);

    const address: Address = {
      id: `addr-${Date.now()}`,
      fullName,
      phone,
      street,
      landmark,
      city,
      state,
      pincode,
      isDefault: true
    };

    setTimeout(() => {
      const placed = placeOrder(
        {
          name: fullName,
          email,
          phone,
          address
        },
        paymentMethod
      );

      setIsProcessing(false);
      router.push(`/order-success/${placed.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Streamlined Checkout Header */}
      <header className="bg-white border-b border-[#EEEBE6] py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-block">
            <span className="font-serif text-xl sm:text-2xl font-normal tracking-[0.2em] uppercase text-[#111111]">
              frenchperfume<span className="text-[#C5A880]">.ind</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Lock className="w-3.5 h-3.5 text-[#1E7B3A]" />
            <span className="hidden sm:inline">256-Bit SSL Encrypted Haute Concierge Checkout</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form: Shipping + Payment (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact & Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EEEBE6] shadow-xs">
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#EEEBE6]">
                <div className="w-7 h-7 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center font-serif">
                  1
                </div>
                <h2 className="text-lg font-serif font-medium text-black">
                  Shipping Destination
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-black text-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+91 98112 00000"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-black text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Email for GPS Tracking & Invoice *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@domain.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-black text-black"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Street Address & Apartment / Villa *
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                    placeholder="House/Flat No., Building Name, Street"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-black text-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      placeholder="Mumbai / Delhi"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-black text-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      placeholder="Maharashtra"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-black text-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                      placeholder="400001"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-black text-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EEEBE6] shadow-xs">
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#EEEBE6]">
                <div className="w-7 h-7 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center font-serif">
                  2
                </div>
                <h2 className="text-lg font-serif font-medium text-black">
                  Select Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <label
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-black bg-[#FAF8F5] shadow-xs'
                      : 'border-[#EEEBE6] hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="accent-black w-4 h-4"
                    />
                    <div className="flex items-center gap-2.5">
                      <QrCode className="w-5 h-5 text-[#C5A880]" />
                      <div>
                        <span className="text-xs font-semibold text-black block">
                          Instant UPI (GPay / PhonePe / Paytm / CRED)
                        </span>
                        <span className="text-[11px] text-[#1E7B3A] font-medium">
                          ⚡ Instant confirmation with zero gateway surcharge
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-black/5 rounded">
                    Popular
                  </span>
                </label>

                {/* Card Option */}
                <label
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'Credit/Debit Card'
                      ? 'border-black bg-[#FAF8F5] shadow-xs'
                      : 'border-[#EEEBE6] hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'Credit/Debit Card'}
                      onChange={() => setPaymentMethod('Credit/Debit Card')}
                      className="accent-black w-4 h-4"
                    />
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-5 h-5 text-gray-700" />
                      <div>
                        <span className="text-xs font-semibold text-black block">
                          Credit / Debit Card (Visa, MasterCard, Amex, RuPay)
                        </span>
                        <span className="text-[11px] text-gray-500">
                          Secure 3D-Secure authenticated checkout
                        </span>
                      </div>
                    </div>
                  </div>
                </label>

                {/* NetBanking */}
                <label
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'NetBanking'
                      ? 'border-black bg-[#FAF8F5] shadow-xs'
                      : 'border-[#EEEBE6] hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'NetBanking'}
                      onChange={() => setPaymentMethod('NetBanking')}
                      className="accent-black w-4 h-4"
                    />
                    <div className="flex items-center gap-2.5">
                      <Building className="w-5 h-5 text-gray-700" />
                      <div>
                        <span className="text-xs font-semibold text-black block">
                          Net Banking (50+ Indian Banks)
                        </span>
                        <span className="text-[11px] text-gray-500">
                          HDFC, ICICI, SBI, Axis, Kotak
                        </span>
                      </div>
                    </div>
                  </div>
                </label>

                {/* COD Option */}
                <label
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-black bg-[#FAF8F5] shadow-xs'
                      : 'border-[#EEEBE6] hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="accent-black w-4 h-4"
                    />
                    <div className="flex items-center gap-2.5">
                      <Truck className="w-5 h-5 text-gray-700" />
                      <div>
                        <span className="text-xs font-semibold text-black block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[11px] text-gray-500">
                          Pay upon delivery after inspecting outer packaging
                        </span>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Order Review (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EEEBE6] shadow-xs sticky top-28 space-y-6">
              <h3 className="font-serif text-xl text-black">Order Review</h3>

              {/* Items List */}
              <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={`${item.productId}-${item.selectedSize}`} className="py-3 flex items-center gap-3">
                    <div className="relative w-14 h-16 bg-[#FAF8F5] rounded-lg overflow-hidden border border-[#EEEBE6] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-serif font-medium text-black truncate">{item.name}</h4>
                      <p className="text-[11px] text-gray-500 italic truncate">{item.frenchName}</p>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {item.selectedSize} · Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-black">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-gray-600 border-t border-[#EEEBE6] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#1E7B3A]">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span>{cartShipping === 0 ? <strong className="text-[#1E7B3A]">FREE</strong> : `₹${cartShipping}`}</span>
                </div>
                <div className="flex justify-between text-xl font-serif font-bold text-black border-t border-[#EEEBE6] pt-3">
                  <span>Payable Total</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-[#111111] hover:bg-black text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Payment...</span>
                  </div>
                ) : (
                  <>
                    <span>Confirm & Place Order · ₹{cartTotal.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="space-y-1 text-center text-[11px] text-gray-400">
                <p>By placing this order you agree to frenchperfume.ind terms of service.</p>
                <p className="text-[#1E7B3A] font-medium">✓ Includes complimentary luxury fragrance vial</p>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
