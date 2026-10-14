'use client';

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, CheckCircle, Sparkles } from 'lucide-react';

export default function TestimonialsSection() {
  const { reviews } = useStore();
  const approvedReviews = reviews.filter((r) => r.approved);

  return (
    <section className="py-14 sm:py-20 bg-[#F7F4EC]/50 border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#153B27] mb-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#D5B85A]" />
              <span>Verified Patron Experiences</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#101310] font-normal">
              Impressions &amp; Stories
            </h2>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 mt-3 md:mt-0 flex-wrap">
            <div className="flex text-[#D5B85A]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-[#D5B85A]" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#153B27]">4.94 / 5.0 Rating</span>
            <span className="text-[11px] sm:text-xs text-gray-500">• 850+ Verified Connoisseurs</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8E4DA] shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#D5B85A] transition-all relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#D5B85A]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-[#D5B85A]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{rev.date}</span>
                </div>

                <h4 className="text-sm font-serif font-medium text-[#101310] mb-2 leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-4 mb-4 font-light">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E4DA]">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-medium text-black flex items-center gap-1">
                      {rev.author}
                      {rev.verifiedPurchase && (
                        <span title="Verified Buyer">
                          <CheckCircle className="w-3 h-3 text-[#153B27]" />
                        </span>
                      )}
                    </h5>
                    {rev.authorLocation && (
                      <p className="text-[10px] text-gray-400">{rev.authorLocation}</p>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-[#153B27] truncate max-w-[90px] bg-[#F7F4EC] px-1.5 py-0.5 rounded">
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
