'use client';

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111111] text-white px-5 py-3.5 rounded-full shadow-2xl border border-white/10 animate-fade-in text-sm">
      <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0 animate-pulse" />
      <span className="font-medium tracking-wide">{toastMessage}</span>
    </div>
  );
}
