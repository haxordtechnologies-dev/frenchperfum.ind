'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Star, Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInWishlist, toggleWishlist, setQuickViewProduct } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]?.size || '50 ml');
  const [isHovered, setIsHovered] = useState(false);

  const isWish = isInWishlist(product.id);
  const sizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];
  const currentPrice = sizeObj ? sizeObj.price : product.price;
  const currentOriginalPrice = sizeObj ? sizeObj.originalPrice : product.originalPrice;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      className="group relative bg-white border border-[#E8E4DA] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#D5B85A]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Media / Thumbnail */}
      <div className="relative aspect-square w-full bg-[#F7F4EC]/60 overflow-hidden">
        <Link href={`/product/${product.id}`} className="block w-full h-full relative">
          <Image
            src={isHovered && product.images[1] ? product.images[1] : (product.thumbnail || product.images[0])}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Brand Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
            <span className="px-2.5 py-0.5 sm:py-1 bg-[#153B27] text-[#D5B85A] text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase rounded-md shadow-xs border border-[#D5B85A]/30">
              {product.badge}
            </span>
          </div>
        )}

        {/* Floating Actions: Wishlist & Quick View */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 flex flex-col gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
              isWish
                ? 'bg-white text-red-500'
                : 'bg-white/90 hover:bg-white text-gray-700 hover:text-[#153B27]'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWish ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleOpenQuickView}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-[#153B27] backdrop-blur-md transition-all shadow-xs opacity-0 group-hover:opacity-100 hidden sm:flex items-center justify-center"
            aria-label="Quick preview"
            title="Quick view"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Concentration tag overlay */}
        <div className="absolute bottom-2.5 left-2.5 sm:left-3 z-10">
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded text-[#153B27] font-medium border border-[#E8E4DA]">
            {product.concentration}
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Olfactory / Category note and Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#89977B] mb-1.5">
            <span className="truncate uppercase tracking-wider font-medium">{product.olfactoryFamily.split('&')[0]}</span>
            <div className="flex items-center gap-0.5 sm:gap-1 text-[#D5B85A] shrink-0">
              <Star className="w-3 h-3 fill-current text-[#D5B85A]" />
              <span className="text-[#101310] font-semibold text-[10px] sm:text-[11px]">{product.rating}</span>
            </div>
          </div>

          {/* Title and French name */}
          <Link href={`/product/${product.id}`} className="block group-hover:text-[#153B27] transition-colors">
            <h3 className="font-serif text-base sm:text-lg md:text-xl font-normal text-[#101310] leading-snug line-clamp-1">
              {product.name}
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-500 italic line-clamp-1 mt-0.5">
              {product.frenchName}
            </p>
          </Link>

          {/* Key Notes Highlights */}
          <div className="mt-1.5 text-[10px] sm:text-[11px] text-gray-600 line-clamp-1">
            <span className="text-gray-400 font-medium">Notes:</span> {product.notes.top[0]}, {product.notes.heart[0]}
          </div>

          {/* Price Section */}
          <div className="flex items-baseline gap-2 mt-2 sm:mt-2.5 flex-wrap">
            <span className="text-base sm:text-lg font-semibold text-[#153B27]">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            {currentOriginalPrice > currentPrice && (
              <>
                <span className="text-xs text-gray-400 line-through">
                  ₹{currentOriginalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 bg-[#153B27]/10 text-[#153B27] rounded-md">
                  {product.discountPercentage}% OFF
                </span>
              </>
            )}
          </div>
        </div>

        {/* Size Selection & Quick Add Button */}
        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#E8E4DA] flex flex-col gap-2">
          {product.sizes.length > 1 && (
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  type="button"
                  onClick={() => setSelectedSize(s.size)}
                  className={`text-[9px] sm:text-[10px] px-2 py-0.5 sm:py-1 rounded-md transition-all font-medium shrink-0 ${
                    selectedSize === s.size
                      ? 'bg-[#153B27] text-[#D5B85A] shadow-xs'
                      : 'bg-[#F7F4EC] text-gray-700 hover:bg-[#EAE4D5]'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-3 bg-[#153B27] hover:bg-[#0D2619] text-[#F7F4EC] text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow group/btn"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D5B85A] shrink-0" />
            <span className="truncate">Add to Bag · {selectedSize}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
