'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { useStore } from '../../context/StoreContext';
import {
  Package,
  MapPin,
  Heart,
  LogOut,
  ShieldAlert,
  Sparkles,
  Clock,
  CheckCircle,
  ExternalLink,
  Plus
} from 'lucide-react';
import { formatDate } from '../../lib/format';

export default function AccountPage() {
  const router = useRouter();
  const { currentUser, orders, wishlist, logout, switchUserRole } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-sm bg-[#FAF8F5] p-8 rounded-2xl border border-[#EEEBE6]">
            <h2 className="text-xl font-serif text-black mb-2">Please Sign In</h2>
            <p className="text-xs text-gray-500 mb-6">
              You must be logged in to view your orders and personal profile.
            </p>
            <Link
              href="/account/login"
              className="px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg inline-block"
            >
              Go to Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Filter orders for this user
  const userOrders = orders; // show all or user orders for paired testing

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Profile Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EEEBE6] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#111111] text-[#FAF8F5] font-serif text-2xl flex items-center justify-center shadow-md">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif text-black font-medium">{currentUser.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#1E7B3A] text-[10px] font-semibold uppercase tracking-wider">
                  Club Privé VIP
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{currentUser.email}</p>
              <div className="flex items-center gap-4 text-[11px] text-gray-400 mt-2 font-mono">
                <span>Member since {currentUser.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:text-red-600 hover:border-red-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-[#EEEBE6] pb-4 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-black text-white shadow-xs'
                : 'bg-white text-gray-600 hover:text-black border border-[#EEEBE6]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'addresses'
                ? 'bg-black text-white shadow-xs'
                : 'bg-white text-gray-600 hover:text-black border border-[#EEEBE6]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>

          <Link
            href="/wishlist"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white text-gray-600 hover:text-black border border-[#EEEBE6] transition-all flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-red-500" />
            <span>Saved Fragrances ({wishlist.length})</span>
          </Link>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {userOrders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#EEEBE6] p-8">
                <Package className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <h3 className="font-serif text-lg text-black">No past orders found</h3>
                <p className="text-xs text-gray-500 mb-4">Start your journey with our signature fragrances.</p>
                <Link
                  href="/shop"
                  className="px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg inline-block"
                >
                  Explore Catalog
                </Link>
              </div>
            ) : (
              userOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl border border-[#EEEBE6] overflow-hidden shadow-xs hover:border-gray-300 transition-colors"
                >
                  {/* Order Top Bar */}
                  <div className="p-5 sm:p-6 bg-[#FAF8F5] border-b border-[#EEEBE6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm text-black">
                          {ord.orderNumber}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            ord.orderStatus === 'Delivered'
                              ? 'bg-[#E6F4EA] text-[#1E7B3A]'
                              : ord.orderStatus === 'Out for Delivery'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {ord.orderStatus}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 font-mono" suppressHydrationWarning>
                        Placed on {formatDate(ord.date)} · Waybill: {ord.trackingNumber || 'EXP-DELHI-001'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block">Total Billed</span>
                        <span className="text-base font-semibold text-black">
                          ₹{ord.total.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <Link
                        href={`/order-success/${ord.id}`}
                        className="px-3.5 py-2 bg-white border border-[#EEEBE6] hover:bg-gray-50 rounded-xl text-xs font-semibold text-black transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="p-5 sm:p-6 divide-y divide-gray-100">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-14 h-16 bg-[#FAF8F5] rounded-lg overflow-hidden border border-[#EEEBE6] shrink-0">
                            <Image src={it.image} alt={it.name} fill className="object-cover" sizes="60px" />
                          </div>
                          <div>
                            <h4 className="font-serif text-sm font-medium text-black">{it.name}</h4>
                            <p className="text-xs text-gray-500 italic">{it.frenchName}</p>
                            <span className="text-[11px] text-gray-400 font-mono">
                              {it.selectedSize} · Quantity: {it.quantity}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-black">
                          ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentUser.addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-white p-6 rounded-3xl border border-[#EEEBE6] shadow-xs relative"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#EEEBE6] text-[10px] uppercase font-bold tracking-wider text-black">
                    Primary Residence
                  </span>
                  <span className="text-xs text-[#1E7B3A] font-semibold">Default</span>
                </div>
                <h4 className="font-semibold text-sm text-black mb-1">{addr.fullName}</h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">{addr.street}</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="text-xs text-gray-400 mt-2 font-mono">Phone: {addr.phone}</p>
              </div>
            ))}

            <div className="border-2 border-dashed border-[#EEEBE6] rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-black transition-colors bg-white/50 cursor-pointer min-h-[160px]">
              <Plus className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-xs font-semibold text-black">Add Secondary Address</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Office, Vacation Villa or Gifting</span>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
