'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';
import { useStore } from '../../../context/StoreContext';
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Printer
} from 'lucide-react';

function OrderSuccessContent() {
  const routeParams = useParams();
  const id = typeof routeParams?.id === 'string' ? routeParams.id : '';
  const { orders } = useStore();

  const order = orders.find((o) => o.id === id) || orders[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-3xl border border-[#EEEBE6] shadow-sm p-6 sm:p-10 space-y-8 animate-fade-in">
          {/* Top Success Header */}
          <div className="text-center space-y-3 pb-8 border-b border-[#EEEBE6]">
            <div className="w-16 h-16 bg-[#E6F4EA] rounded-full flex items-center justify-center mx-auto text-[#1E7B3A] shadow-inner">
              <CheckCircle className="w-9 h-9" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880] font-semibold block">
              Commande Confirmée · Grasse Concierge
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-black">
              Thank You for Your Patronage
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              Your bespoke fragrance order has been accepted. A confirmation notification along with live courier tracking credentials has been sent to <strong>{order?.customer.email}</strong>.
            </p>
            <div className="inline-block bg-[#FAF8F5] px-4 py-2 rounded-full border border-[#EEEBE6] text-xs font-mono text-black mt-2">
              Order Reference: <strong className="font-bold">{order?.orderNumber}</strong>
            </div>
          </div>

          {/* Delivery & Tracking Timeline */}
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#EEEBE6]">
            <div className="flex items-center justify-between text-xs mb-6">
              <span className="font-semibold text-black uppercase tracking-wider">
                Live Status Tracker
              </span>
              <span className="text-gray-500 font-mono">
                Tracking: <strong className="text-black">{order?.trackingNumber || 'EXP-IN-890212'}</strong>
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs relative">
              {/* Step 1 */}
              <div className="space-y-1.5">
                <div className="w-7 h-7 mx-auto rounded-full bg-[#1E7B3A] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  ✓
                </div>
                <span className="font-semibold text-black block text-[11px]">Placed</span>
                <span className="text-[10px] text-gray-400 block">Today</span>
              </div>

              {/* Step 2 */}
              <div className="space-y-1.5">
                <div className="w-7 h-7 mx-auto rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  2
                </div>
                <span className="font-semibold text-black block text-[11px]">Hand-Bottling</span>
                <span className="text-[10px] text-gray-400 block">In Atelier</span>
              </div>

              {/* Step 3 */}
              <div className="space-y-1.5 opacity-60">
                <div className="w-7 h-7 mx-auto rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <span className="font-semibold text-gray-700 block text-[11px]">Shipped</span>
                <span className="text-[10px] text-gray-400 block">Via BlueDart</span>
              </div>

              {/* Step 4 */}
              <div className="space-y-1.5 opacity-60">
                <div className="w-7 h-7 mx-auto rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <span className="font-semibold text-gray-700 block text-[11px]">Delivered</span>
                <span className="text-[10px] text-gray-400 block">{order?.estimatedDelivery || '3-5 Days'}</span>
              </div>
            </div>
          </div>

          {/* Details Grid: Shipping Address & Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Address */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-black flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <span>Delivery Address</span>
              </h3>
              <div className="text-xs text-gray-600 bg-[#FAF8F5] p-4 rounded-xl border border-[#EEEBE6] space-y-1 leading-relaxed">
                <p className="font-semibold text-black">{order?.customer.name}</p>
                <p>{order?.customer.address.street}</p>
                <p>
                  {order?.customer.address.city}, {order?.customer.address.state} - {order?.customer.address.pincode}
                </p>
                <p className="pt-1 text-gray-500 font-mono">Contact: {order?.customer.phone}</p>
              </div>

              <div className="text-xs text-gray-600 bg-[#FAF8F5] p-4 rounded-xl border border-[#EEEBE6] space-y-1">
                <p>
                  <strong>Payment Method:</strong> {order?.paymentMethod}
                </p>
                <p className="flex items-center gap-1">
                  <strong>Payment Status:</strong>{' '}
                  <span className="px-2 py-0.5 rounded bg-[#E6F4EA] text-[#1E7B3A] font-semibold text-[11px]">
                    {order?.paymentStatus}
                  </span>
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-black flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#C5A880]" />
                <span>Items in Parcel</span>
              </h3>
              <div className="divide-y divide-gray-100 bg-[#FAF8F5] p-4 rounded-xl border border-[#EEEBE6] text-xs">
                {order?.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-10 h-12 bg-white rounded overflow-hidden shrink-0 border border-gray-200">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div className="truncate">
                        <span className="font-serif font-medium text-black truncate block">{item.name}</span>
                        <span className="text-[10px] text-gray-400">
                          {item.selectedSize} × {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-semibold text-black shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}

                <div className="pt-3 space-y-1 text-gray-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{order?.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {order?.discount && order.discount > 0 ? (
                    <div className="flex justify-between text-[#1E7B3A]">
                      <span>Discount ({order?.couponCode})</span>
                      <span>-₹{order?.discount.toLocaleString('en-IN')}</span>
                    </div>
                  ) : null}
                  <div className="flex justify-between">
                    <span>Express Insured Shipping</span>
                    <span>{order?.shippingCharge === 0 ? 'FREE' : `₹${order?.shippingCharge}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-black pt-2 border-t border-gray-200">
                    <span>Total Paid</span>
                    <span>₹{order?.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#EEEBE6]">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#EEEBE6] rounded-xl text-xs font-semibold text-gray-700 hover:text-black bg-white hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/account"
                className="flex-1 sm:flex-none px-6 py-3 border border-black text-black hover:bg-black hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider text-center transition-colors"
              >
                View Account & Orders
              </Link>
              <Link
                href="/shop"
                className="flex-1 sm:flex-none px-6 py-3 bg-black text-white hover:bg-[#262626] rounded-xl text-xs font-semibold uppercase tracking-wider text-center transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center font-serif text-[#4A0E17]">Chargement...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
