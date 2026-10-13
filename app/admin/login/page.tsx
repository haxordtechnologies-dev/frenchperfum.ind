'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '../../../context/StoreContext';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Log in with role 'admin'
    login(email, 'admin');
    showToast('Admin authorized: Access granted to Atelier Console.');
    router.push('/admin');
  };

  const handleQuickAdminDemo = () => {
    login('concierge@frenchperfume.ind', 'admin');
    showToast('Demo Admin authorized. Welcome to the Operations Console.');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Admin Login Top Bar */}
      <header className="bg-white border-b border-[#EEEBE6] py-4 px-6 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.18em] uppercase text-[#4A0E17]">
            FRENCHPERFUME<span className="text-[#D84A26]">.IND</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono hidden sm:inline border-l border-gray-200 pl-3">
            Administration Portal
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#4A0E17] font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Customer Store</span>
        </Link>
      </header>

      {/* Center Modal Card */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#EEEBE6] shadow-xl space-y-8 animate-fade-in">
          {/* Admin Crest */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#4A0E17] text-white flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-8 h-8 text-[#F3BA93]" />
            </div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D84A26] font-semibold block pt-1">
              Atelier Executive Console
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#4A0E17] font-medium">
              Administrator Sign In
            </h1>
            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
              Restricted portal for managing perfume inventory, orders, customer shipments, and storefront content.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Admin Work Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@frenchperfume.ind"
                  className="w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-[#4A0E17] text-black font-mono"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Security Passkey / Code
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-[#4A0E17] text-black font-mono"
                />
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#4A0E17] hover:bg-[#360910] text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Unlock Admin Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Demo Admin Button */}
          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EEEBE6] space-y-2 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#D84A26] block">
              1-Click Admin Evaluation
            </span>
            <button
              type="button"
              onClick={handleQuickAdminDemo}
              className="w-full py-2.5 px-3 bg-[#4A0E17] text-white hover:bg-[#360910] rounded-xl text-xs font-semibold transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#F3BA93]" />
              <span>Sign In as Demo Administrator</span>
            </button>
          </div>

          {/* Security Notice */}
          <div className="text-center text-[11px] text-gray-400 pt-2 border-t border-[#EEEBE6] leading-relaxed">
            All administrative actions are logged with timestamp and origin IP. Non-admin visitors should use the{' '}
            <Link href="/login" className="text-[#4A0E17] font-semibold underline">
              Customer Sign In
            </Link>
            .
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-gray-400 border-t border-[#EEEBE6] bg-white">
        © 2026 frenchperfume.ind Operations Suite. Restricted Access.
      </footer>
    </div>
  );
}
