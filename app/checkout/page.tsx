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
          <div className="text-center max-w-md bg-[#F7F4EC] p-8 rounded-3xl border border-[#E8E4DA]">
            <ShoppingBag className="w-12 h-12 text-[#153B27] mx-auto mb-3" />
            <h2 className="text-2xl font-serif text-black mb-2 font-normal">No Items in Checkout</h2>
            <p className="text-xs text-gray-500 mb-6 font-light">
              Please add perfumes or a Discovery Coffret to your shopping bag before proceeding.
            </p>
            <Link
              href="/shop"
              className="px-6 py-3 bg-[#153B27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl inline-block hover:bg-[#0D2619] transition-colors"
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
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Header */}
        <div className="bg-[#F7F4EC] border-b border-[#E8E4DA] py-8 px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E8E4DA] rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-[#153B27] mb-2 font-mono">
            <Lock className="w-3.5 h-3.5 text-[#D5B85A]" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#101310] font-normal">
            Finalize Your Fragrance Order
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Shipping & Payment (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* 1. Shipping Address */}
              <div className="bg-white p-4 sm:p-8 rounded-3xl border border-[#E8E4DA] shadow-xs">
                <div className="flex items-center gap-2.5 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-[#E8E4DA]">
                  <div className="w-7 h-7 rounded-full bg-[#153B27] text-[#D5B85A] text-xs font-bold flex items-center justify-center font-serif">
                    1
                  </div>
                  <h2 className="text-base sm:text-lg font-serif font-medium text-black">
                    Delivery Address Details
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
                        placeholder="Your full name"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E4DA] bg-[#F7F4EC]/60 focus:outline-none focus:border-[#153B27] text-black"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="+91 98000 00000"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E4DA] bg-[#F7F4EC]/60 focus:outline-none focus:border-[#153B27] text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Email Address (for order tracking) *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your.email@example.com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E4DA] bg-[#F7F4EC]/60 focus:outline-none focus:border-[#153B27] text-black"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Street Address / House No. / Villa *
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                      placeholder="e.g. Flat 402, Royal Palms Apartment"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E4DA] bg-[#F7F4EC]/60 focus:outline-none focus:border-[#153B27] text-black"
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
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E4DA] bg-[#F7F4EC]/60 focus:outline-none focus:border-[#153B27] text-black"
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
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E4DA] bg-[#F7F4EC]/60 focus:outline-none focus:border-[#153B27] text-black"
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
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8E4DA] bg-[#F7F4EC]/60 focus:outline-none focus:border-[#153B27] text-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Payment Method Selector */}
              <div className="bg-white p-4 sm:p-8 rounded-3xl border border-[#E8E4DA] shadow-xs">
                <div className="flex items-center gap-2.5 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-[#E8E4DA]">
                  <div className="w-7 h-7 rounded-full bg-[#153B27] text-[#D5B85A] text-xs font-bold flex items-center justify-center font-serif">
                    2
                  </div>
                  <h2 className="text-base sm:text-lg font-serif font-medium text-black">
                    Select Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* UPI Option */}
                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-[#153B27] bg-[#F7F4EC] shadow-xs'
                        : 'border-[#E8E4DA] hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'UPI'}
                        onChange={() => setPaymentMethod('UPI')}
                        className="accent-[#153B27] w-4 h-4"
                      />
                      <div className="flex items-center gap-2.5">
                        <QrCode className="w-5 h-5 text-[#153B27]" />
                        <div>
                          <span className="text-xs font-semibold text-black block">
                            Instant UPI (GPay / PhonePe / Paytm / CRED)
                          </span>
                          <span className="text-[11px] text-[#153B27] font-medium">
                            ⚡ Instant confirmation with zero gateway surcharge
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#153B27]/10 text-[#153B27] font-semibold rounded">
                      Popular
                    </span>
                  </label>

                  {/* Card Option */}
                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'Credit/Debit Card'
                        ? 'border-[#153B27] bg-[#F7F4EC] shadow-xs'
                        : 'border-[#E8E4DA] hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'Credit/Debit Card'}
                        onChange={() => setPaymentMethod('Credit/Debit Card')}
                        className="accent-[#153B27] w-4 h-4"
                      />
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-5 h-5 text-[#153B27]" />
                        <div>
                          <span className="text-xs font-semibold text-black block">
                            Credit or Debit Card
                          </span>
                          <span className="text-[11px] text-gray-500 font-light">
                            Visa, MasterCard, RuPay, Amex accepted
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* NetBanking */}
                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'NetBanking'
                        ? 'border-[#153B27] bg-[#F7F4EC] shadow-xs'
                        : 'border-[#E8E4DA] hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'NetBanking'}
                        onChange={() => setPaymentMethod('NetBanking')}
                        className="accent-[#153B27] w-4 h-4"
                      />
                      <div className="flex items-center gap-2.5">
                        <Building className="w-5 h-5 text-[#153B27]" />
                        <div>
                          <span className="text-xs font-semibold text-black block">
                            NetBanking
                          </span>
                          <span className="text-[11px] text-gray-500 font-light">
                            All major Indian banks supported
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'border-[#153B27] bg-[#F7F4EC] shadow-xs'
                        : 'border-[#E8E4DA] hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'Cash on Delivery'}
                        onChange={() => setPaymentMethod('Cash on Delivery')}
                        className="accent-[#153B27] w-4 h-4"
                      />
                      <div className="flex items-center gap-2.5">
                        <Truck className="w-5 h-5 text-[#153B27]" />
                        <div>
                          <span className="text-xs font-semibold text-black block">
                            Cash on Delivery (COD)
                          </span>
                          <span className="text-[11px] text-gray-500 font-light">
                            Pay with cash or UPI upon delivery
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary (4 Cols) */}
            <div className="lg:col-span-4 bg-[#F7F4EC] p-6 sm:p-7 rounded-3xl border border-[#E8E4DA] space-y-6 sticky top-24 shadow-sm">
              <h3 className="font-serif text-xl font-medium text-black">
                Order Review ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>

              {/* Items List */}
              <div className="divide-y divide-gray-200/60 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={`${item.productId}-${item.selectedSize}`} className="py-3 flex items-center gap-3">
                    <div className="relative w-14 h-16 bg-white rounded-xl overflow-hidden border border-[#E8E4DA] shrink-0">
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
                    <span className="text-xs font-semibold text-[#153B27]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-gray-600 border-t border-[#E8E4DA] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#153B27] font-medium">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span>{cartShipping === 0 ? <strong className="text-[#153B27]">FREE</strong> : `₹${cartShipping}`}</span>
                </div>
                <div className="flex justify-between text-xl font-serif font-medium text-black border-t border-[#E8E4DA] pt-3">
                  <span>Payable Total</span>
                  <span className="text-[#153B27] font-semibold">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-[#153B27] hover:bg-[#0D2619] text-[#F7F4EC] text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Payment...</span>
                  </div>
                ) : (
                  <>
                    <span>Confirm &amp; Place Order · ₹{cartTotal.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4 text-[#D5B85A] group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="space-y-1 text-center text-[11px] text-gray-400">
                <p>By placing this order you agree to French Perfume terms of service.</p>
                <p className="text-[#153B27] font-medium">✓ Includes complimentary luxury fragrance vial</p>
              </div>
            </div>

          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
