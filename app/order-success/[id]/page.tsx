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
    <div className="min-h-screen flex flex-col bg-[#F7F4EC]/40">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-3xl border border-[#E8E4DA] shadow-sm p-6 sm:p-10 space-y-8 animate-fade-in">
          {/* Top Success Header */}
          <div className="text-center space-y-3 pb-8 border-b border-[#E8E4DA]">
            <div className="w-16 h-16 bg-[#153B27]/10 rounded-full flex items-center justify-center mx-auto text-[#153B27] shadow-inner">
              <CheckCircle className="w-9 h-9" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#153B27] font-semibold block">
              Commande Confirmée · French Perfume
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#101310] font-normal">
              Thank You for Your Order
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-light">
              Your signature fragrance order has been accepted. A confirmation notification along with live courier tracking credentials has been sent to <strong>{order?.customer.email}</strong>.
            </p>
            <div className="inline-block bg-[#F7F4EC] px-4 py-2 rounded-full border border-[#E8E4DA] text-xs font-mono text-black mt-2">
              Order Reference: <strong className="font-bold text-[#153B27]">{order?.orderNumber}</strong>
            </div>
          </div>

          {/* Delivery & Tracking Timeline */}
          <div className="bg-[#F7F4EC] p-6 rounded-2xl border border-[#E8E4DA]">
            <div className="flex items-center justify-between text-xs mb-6">
              <span className="font-semibold text-black uppercase tracking-wider">
                Live Status Tracker
              </span>
              <span className="text-gray-500 font-mono">
                Tracking: <strong className="text-[#153B27]">{order?.trackingNumber || 'FP-EXP-890212'}</strong>
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs relative">
              {/* Step 1 */}
              <div className="space-y-1.5">
                <div className="w-7 h-7 mx-auto rounded-full bg-[#153B27] text-[#D5B85A] flex items-center justify-center text-xs font-bold shadow-xs">
                  ✓
                </div>
                <span className="font-semibold text-black block text-[11px]">Placed</span>
                <span className="text-[10px] text-gray-400 block">Today</span>
              </div>

              {/* Step 2 */}
              <div className="space-y-1.5">
                <div className="w-7 h-7 mx-auto rounded-full bg-[#153B27] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  2
                </div>
                <span className="font-semibold text-black block text-[11px]">Preparation</span>
                <span className="text-[10px] text-gray-400 block">In Atelier</span>
              </div>

              {/* Step 3 */}
              <div className="space-y-1.5 opacity-60">
                <div className="w-7 h-7 mx-auto rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <span className="font-semibold text-gray-700 block text-[11px]">Dispatched</span>
                <span className="text-[10px] text-gray-400 block">Express Courier</span>
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

          {/* Purchased Items */}
          <div>
            <h3 className="font-serif text-lg font-medium text-black mb-4">
              Items in Your Order ({order?.items.length})
            </h3>
            <div className="divide-y divide-[#E8E4DA] border border-[#E8E4DA] rounded-2xl overflow-hidden bg-white">
              {order?.items.map((item) => (
                <div key={item.productId} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-16 bg-[#F7F4EC] rounded-lg overflow-hidden border border-[#E8E4DA] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-medium text-black">{item.name}</h4>
                      <p className="text-[11px] text-gray-500 italic">{item.frenchName}</p>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {item.selectedSize} · Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-[#153B27]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address & Payment Recap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E8E4DA] text-xs">
            <div className="space-y-1">
              <span className="font-semibold uppercase text-gray-500 tracking-wider block text-[10px]">
                Delivering To
              </span>
              <p className="font-medium text-black">{order?.customer.name}</p>
              <p className="text-gray-600">{order?.customer.address.street}</p>
              <p className="text-gray-600">
                {order?.customer.address.city}, {order?.customer.address.state} - {order?.customer.address.pincode}
              </p>
              <p className="text-gray-600">Phone: {order?.customer.phone}</p>
            </div>

            <div className="space-y-1">
              <span className="font-semibold uppercase text-gray-500 tracking-wider block text-[10px]">
                Payment Breakdown
              </span>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{order?.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {order && order.discount > 0 && (
                <div className="flex justify-between text-[#153B27] font-medium">
                  <span>Discount</span>
                  <span>-₹{order.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between font-bold text-black border-t border-gray-100 pt-1 text-sm">
                <span>Total Amount</span>
                <span className="text-[#153B27]">₹{order?.total.toLocaleString('en-IN')}</span>
              </div>
              <div className="text-[11px] text-gray-400 pt-1">
                Method: <strong>{order?.paymentMethod}</strong> ({order?.paymentStatus})
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E8E4DA]">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-7 py-3 bg-[#153B27] hover:bg-[#0D2619] text-[#F7F4EC] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md text-center flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4 text-[#D5B85A]" />
            </Link>

            <Link
              href="/account"
              className="text-xs font-semibold text-[#153B27] hover:underline"
            >
              View Order in My Account →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
