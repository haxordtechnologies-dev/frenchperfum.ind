'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { useStore } from '../../context/StoreContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function UserLoginPage() {
  const router = useRouter();
  const { login, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, 'customer');
    router.push('/account');
  };

  const handleQuickCustomer = () => {
    login('customer@frenchperfume.ind', 'customer');
    router.push('/account');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#EEEBE6] shadow-xl space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D84A26] font-semibold block">
              Espace Client Privé
            </span>
            <h1 className="text-3xl font-serif text-[#4A0E17] font-medium">
              Customer Sign In
            </h1>
            <p className="text-xs text-gray-500">
              Access your perfume order tracking, saved wishlist, and exclusive Le Club Privé privileges.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-[#4A0E17] text-black"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700">Password</label>
                <a href="#" className="text-[11px] text-[#D84A26] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-[#4A0E17] text-black"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#4A0E17] hover:bg-[#360910] text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Sign In to Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Demo Login */}
          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EEEBE6] text-center space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 block">
              Quick Customer Evaluation
            </span>
            <button
              type="button"
              onClick={handleQuickCustomer}
              className="w-full py-2.5 px-3 bg-white border border-[#EEEBE6] hover:border-[#4A0E17] rounded-xl text-xs font-semibold text-[#4A0E17] transition-colors shadow-xs"
            >
              1-Click Demo Customer Login
            </button>
          </div>

          {/* Links to Signup */}
          <div className="pt-2 border-t border-[#EEEBE6] text-center text-xs text-gray-500">
            <div>
              Don&apos;t have an account yet?{' '}
              <Link href="/signup" className="font-semibold text-[#4A0E17] underline hover:text-[#D84A26]">
                Create Customer Account
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
