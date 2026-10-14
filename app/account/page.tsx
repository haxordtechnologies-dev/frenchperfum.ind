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
          <div className="text-center max-w-sm bg-[#F7F4EC] p-8 rounded-3xl border border-[#E8E4DA]">
            <h2 className="text-xl font-serif text-black mb-2 font-normal">Please Sign In</h2>
            <p className="text-xs text-gray-500 mb-6 font-light">
              You must be logged in to view your orders and personal profile.
            </p>
            <Link
              href="/login"
              className="px-6 py-2.5 bg-[#153B27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl inline-block hover:bg-[#0D2619] transition-colors"
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
  const userOrders = orders;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EC]/40">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Profile Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E4DA] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#153B27] text-[#D5B85A] font-serif text-2xl flex items-center justify-center shadow-md border border-[#D5B85A]/40">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif text-black font-normal">{currentUser.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#153B27]/10 text-[#153B27] text-[10px] font-semibold uppercase tracking-wider">
                  Club Privé Patron
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
              className="px-4 py-2.5 bg-white border border-[#E8E4DA] text-gray-700 hover:text-red-600 hover:border-red-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-[#E8E4DA] pb-3 sm:pb-4 mb-6 sm:mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'orders'
                ? 'bg-[#153B27] text-[#D5B85A] shadow-xs'
                : 'bg-white text-gray-600 hover:text-black border border-[#E8E4DA]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'addresses'
                ? 'bg-[#153B27] text-[#D5B85A] shadow-xs'
                : 'bg-white text-gray-600 hover:text-black border border-[#E8E4DA]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>

          <Link
            href="/wishlist"
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-semibold bg-white text-gray-600 hover:text-black border border-[#E8E4DA] transition-all flex items-center gap-2 shrink-0"
          >
            <Heart className="w-4 h-4 text-[#153B27]" />
            <span>Saved Fragrances ({wishlist.length})</span>
          </Link>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {userOrders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E4DA] p-8">
                <Package className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <h3 className="font-serif text-lg text-black font-normal">No past orders found</h3>
                <p className="text-xs text-gray-500 mb-4 font-light">Start your journey with our signature fragrances.</p>
                <Link
                  href="/shop"
                  className="px-6 py-2.5 bg-[#153B27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl inline-block hover:bg-[#0D2619] transition-colors"
                >
                  Explore Fragrances
                </Link>
              </div>
            ) : (
              userOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl border border-[#E8E4DA] overflow-hidden shadow-xs hover:border-[#D5B85A] transition-colors"
                >
                  <div className="p-4 sm:p-6 bg-[#F7F4EC] border-b border-[#E8E4DA] flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-mono">Order Number</span>
                      <strong className="text-[#153B27] font-mono text-sm">{ord.orderNumber}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-mono">Date Placed</span>
                      <span className="text-gray-800">{formatDate(ord.date)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-mono">Total Value</span>
                      <strong className="text-[#153B27] text-sm">₹{ord.total.toLocaleString('en-IN')}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-mono">Status</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-[#153B27] bg-white px-2.5 py-0.5 rounded-full border border-[#E8E4DA]">
                        <Clock className="w-3 h-3 text-[#D5B85A]" />
                        <span>{ord.orderStatus}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 divide-y divide-gray-100">
                    {ord.items.map((item) => (
                      <div key={item.productId} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-14 bg-[#F7F4EC] rounded-lg overflow-hidden border border-[#E8E4DA] shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <Link href={`/product/${item.productId}`} className="text-xs font-serif font-medium text-black hover:text-[#153B27]">
                              {item.name}
                            </Link>
                            <span className="text-[10px] text-gray-400 block font-mono">
                              {item.selectedSize} · Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-[#153B27]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gray-50/50 border-t border-[#E8E4DA] flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-mono text-[11px]">
                      Tracking: {ord.trackingNumber || 'EXP-IN-90812'}
                    </span>
                    <Link
                      href={`/order-success/${ord.id}`}
                      className="text-[#153B27] hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>View Receipt &amp; Live Tracker</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#D5B85A]" />
                    </Link>
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
                className="bg-white p-6 rounded-3xl border border-[#E8E4DA] relative shadow-xs"
              >
                {addr.isDefault && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-[#153B27]/10 text-[#153B27] text-[10px] font-semibold uppercase tracking-wider">
                    Default Shipping
                  </span>
                )}
                <h4 className="font-serif text-base font-medium text-black mb-1">{addr.fullName}</h4>
                <p className="text-xs text-gray-600 leading-relaxed font-light">{addr.street}</p>
                <p className="text-xs text-gray-600 font-light">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="text-xs text-gray-400 mt-2 font-mono">Phone: {addr.phone}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
