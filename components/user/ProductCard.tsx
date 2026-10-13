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
  const sizeObj = product.sizes.find(s => s.size === selectedSize) || product.sizes[0];
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
      className="group relative bg-white border border-[#EEEBE6] rounded-[8px] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#DCD7D0]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Media / Thumbnail */}
      <div className="relative aspect-square w-full bg-[#FAF8F5] overflow-hidden">
        <Link href={`/product/${product.id}`} className="block w-full h-full relative">
          <Image
            src={isHovered && product.images[1] ? product.images[1] : (product.thumbnail || product.images[0])}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#4A0E17] text-white text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase rounded-[4px] shadow-xs">
              {product.badge}
            </span>
          </div>
        )}

        {/* Floating Actions: Wishlist & Quick View */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex flex-col gap-1 sm:gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-1.5 sm:p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
              isWish
                ? 'bg-white text-red-500'
                : 'bg-white/80 hover:bg-white text-gray-600 hover:text-black'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWish ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleOpenQuickView}
            className="p-1.5 sm:p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-black backdrop-blur-xs transition-colors shadow-xs opacity-0 group-hover:opacity-100 hidden sm:flex"
            aria-label="Quick preview"
            title="Quick view"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Concentration tag overlay */}
        <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-3 z-10">
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider bg-white/90 backdrop-blur-xs px-1.5 sm:px-2 py-0.5 rounded text-gray-800 border border-black/5">
            {product.concentration}
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Olfactory / Category note */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-500 mb-1">
            <span className="truncate uppercase tracking-wider">{product.olfactoryFamily.split('&')[0]}</span>
            <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 shrink-0">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-gray-800 font-medium text-[10px] sm:text-[11px]">{product.rating}</span>
            </div>
          </div>

          {/* Title and French name */}
          <Link href={`/product/${product.id}`} className="block group-hover:text-[#4A0E17] transition-colors">
            <h3 className="font-serif text-sm sm:text-base md:text-lg font-medium text-[#111111] leading-tight line-clamp-1">
              {product.name}
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-400 italic line-clamp-1 mt-0.5">
              {product.frenchName}
            </p>
          </Link>

          {/* Key Notes Highlights */}
          <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-gray-600 line-clamp-1">
            <span className="text-gray-400">Notes:</span> {product.notes.top[0]}, {product.notes.heart[0]}
          </div>

          {/* Price Section */}
          <div className="flex items-baseline gap-1.5 sm:gap-2 mt-2 sm:mt-2.5 flex-wrap">
            <span className="text-sm sm:text-base font-semibold text-[#111111]">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            {currentOriginalPrice > currentPrice && (
              <>
                <span className="text-[11px] sm:text-xs text-gray-400 line-through">
                  ₹{currentOriginalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold px-1 sm:px-1.5 py-0.5 bg-[#E6F4EA] text-[#1E7B3A] rounded">
                  {product.discountPercentage}% OFF
                </span>
              </>
            )}
          </div>
        </div>

        {/* Size Selection & Quick Add Button (Matching Olfacy's Deep Wine button style) */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#EEEBE6]/80 flex flex-col gap-2">
          {product.sizes.length > 1 && (
            <div className="flex gap-1 sm:gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  type="button"
                  onClick={() => setSelectedSize(s.size)}
                  className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transition-all font-medium shrink-0 ${
                    selectedSize === s.size
                      ? 'bg-[#4A0E17] text-white'
                      : 'bg-[#FAF8F5] text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleQuickAdd}
            className="w-full py-2 sm:py-2.5 px-2 sm:px-3 bg-[#4A0E17] hover:bg-[#360910] text-white text-[10px] sm:text-[11px] font-medium tracking-wider uppercase rounded-[8px] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Add to Bag · {selectedSize}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
