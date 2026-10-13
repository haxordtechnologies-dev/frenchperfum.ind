'use client';

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, CheckCircle, Quote, Sparkles } from 'lucide-react';

export default function TestimonialsSection() {
  const { reviews } = useStore();
  const approvedReviews = reviews.filter((r) => r.approved);

  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-[#EEEBE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Patron Experiences</span>
            </div>
            <h2 className="text-3xl font-serif text-[#111111]">
              Echoes of Elegance
            </h2>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-900">4.92 / 5.0</span>
            <span className="text-xs text-gray-500">• 850+ Verified Connoisseurs</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-[#EEEBE6] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                </div>

                <h4 className="text-sm font-serif font-semibold text-[#111111] mb-2">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-4 mb-4">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-medium text-black flex items-center gap-1">
                      {rev.author}
                      {rev.verifiedPurchase && (
                        <span title="Verified Buyer">
                          <CheckCircle className="w-3 h-3 text-[#1E7B3A]" />
                        </span>
                      )}
                    </h5>
                    {rev.authorLocation && (
                      <p className="text-[10px] text-gray-400">{rev.authorLocation}</p>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-[#C5A880] truncate max-w-[90px]">
                    {rev.productName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
