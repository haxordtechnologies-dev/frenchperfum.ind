'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';
import { useStore } from '../../../context/StoreContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const isAdmin = email.toLowerCase().includes('admin');
    login(email, isAdmin ? 'admin' : 'customer');
    if (isAdmin) {
      router.push('/admin');
    } else {
      router.push('/account');
    }
  };

  const handleQuickCustomer = () => {
    login('antoine@frenchperfume.ind', 'customer');
    router.push('/account');
  };

  const handleQuickAdmin = () => {
    login('concierge@frenchperfume.ind', 'admin');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#EEEBE6] shadow-xl space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
              Espace Connoisseur
            </span>
            <h1 className="text-3xl font-serif text-black">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-gray-500">
              Access your bespoke fragrance order history, wishlist, and exclusive salon previews.
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
                  className="w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-black text-black"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700">Password</label>
                <a href="#" className="text-[11px] text-[#C5A880] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-black text-black"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#111111] hover:bg-black text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Logins for instant evaluation */}
          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EEEBE6] space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 block text-center">
              Quick Test Sign-In
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickCustomer}
                className="py-2 px-3 bg-white border border-[#EEEBE6] rounded-lg text-xs font-semibold text-black hover:bg-gray-50 transition-colors shadow-xs"
              >
                Customer Demo
              </button>
              <button
                type="button"
                onClick={handleQuickAdmin}
                className="py-2 px-3 bg-black text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors shadow-xs"
              >
                Admin Portal Demo
              </button>
            </div>
          </div>

          {/* Registration link */}
          <div className="text-center text-xs text-gray-500 pt-2 border-t border-[#EEEBE6]">
            New to frenchperfume.ind?{' '}
            <Link href="/account/register" className="font-semibold text-black underline hover:text-[#C5A880]">
              Create an Account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
