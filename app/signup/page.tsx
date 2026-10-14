'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { useStore } from '../../context/StoreContext';
import { User, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function UserSignupPage() {
  const router = useRouter();
  const { register } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    register(name, email);
    router.push('/account');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EC]/40">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E4DA] shadow-xl space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#153B27] font-semibold block">
              Bienvenue au Club Privé
            </span>
            <h1 className="text-3xl font-serif text-[#101310] font-normal">
              Create Customer Account
            </h1>
            <p className="text-xs text-gray-500 font-light">
              Join our private salon to enjoy complimentary samples, early batch allocations, and live order tracking.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Antoine Delacroix"
                  className="w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border border-[#E8E4DA] bg-[#F7F4EC]/60 focus:outline-none focus:border-[#153B27] text-black"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border border-[#E8E4DA] bg-[#F7F4EC]/60 focus:outline-none focus:border-[#153B27] text-black"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a secure password"
                  className="w-full text-xs pl-9 pr-3.5 py-3 rounded-xl border border-[#E8E4DA] bg-[#F7F4EC]/60 focus:outline-none focus:border-[#153B27] text-black"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#153B27] hover:bg-[#0D2619] text-[#F7F4EC] text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4 text-[#D5B85A]" />
            </button>
          </form>

          <div className="text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-[#153B27] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
