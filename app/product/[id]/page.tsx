'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';
import ProductCard from '../../../components/user/ProductCard';
import { useStore } from '../../../context/StoreContext';
import {
  Star,
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Clock,
  Wind,
  Droplets,
  Flame,
  ChevronDown,
  ArrowRight,
  Send
} from 'lucide-react';

function ProductDetailContent() {
  const routeParams = useParams();
  const id = typeof routeParams?.id === 'string' ? routeParams.id : '';
  const router = useRouter();
  const {
    getProductById,
    addToCart,
    isInWishlist,
    toggleWishlist,
    products,
    reviews,
    addReview,
    showToast
  } = useStore();

  const product = getProductById(id) || products[0];

  // Gallery state
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || product.thumbnail);
  // Size selection state
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]?.size || '50 ml');
  // Quantity state
  const [quantity, setQuantity] = useState(1);
  // Accordion active sections
  const [activeAccordion, setActiveAccordion] = useState<string | null>('notes');

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Price calculations based on selected size
  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];
  const activePrice = currentSizeObj ? currentSizeObj.price : product.price;
  const activeOriginalPrice = currentSizeObj ? currentSizeObj.originalPrice : product.originalPrice;
  const isWish = isInWishlist(product.id);

  // Reviews matching this product
  const productReviews = reviews.filter((r) => r.productId === product.id && r.approved);
  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    router.push('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    addReview({
      productId: product.id,
      productName: product.name,
      author: reviewName,
      rating: reviewRating,
      title: reviewTitle || 'Exceptional Fragrance',
      comment: reviewComment,
      verifiedPurchase: true,
      featured: false
    });
    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#EEEBE6] text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-black">Collections</Link>
            <span>/</span>
            <span className="text-black font-medium">{product.name}</span>
          </div>
        </div>

        {/* Top Product Presentation */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Gallery Left (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-3 sm:gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-2 sm:gap-3 overflow-x-auto md:overflow-visible shrink-0 pb-1 md:pb-0 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all bg-[#FAF8F5] shrink-0 ${
                      selectedImage === img
                        ? 'border-black ring-1 ring-black shadow-md'
                        : 'border-[#EEEBE6] hover:border-gray-400 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image View */}
              <div className="flex-1 relative aspect-4/5 md:aspect-square bg-[#FAF8F5] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EEEBE6] shadow-lg">
                <Image
                  src={selectedImage || product.thumbnail}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10">
                    <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#111111] text-[#FAF8F5] text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-md shadow-md">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Wishlist floating toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full backdrop-blur-md transition-all shadow-md z-10 ${
                    isWish
                      ? 'bg-white text-red-500'
                      : 'bg-white/80 hover:bg-white text-gray-700 hover:text-black'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWish ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Product Configuration Details (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Brand & Concentration */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="uppercase tracking-[0.2em] font-semibold text-[#C5A880]">
                    {product.concentration} · Grasse
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold text-black">{product.rating}</span>
                    <span className="text-gray-400">({product.reviewCount} Reviews)</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif text-[#111111] font-normal leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500 italic mt-1 font-serif">
                  {product.frenchName}
                </p>

                {/* Pricing & Offer */}
                <div className="flex items-baseline gap-3 my-4 pb-4 border-b border-[#EEEBE6]">
                  <span className="text-3xl font-semibold text-[#111111]">
                    ₹{activePrice.toLocaleString('en-IN')}
                  </span>
                  {activeOriginalPrice > activePrice && (
                    <>
                      <span className="text-base text-gray-400 line-through">
                        ₹{activeOriginalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 bg-[#E6F4EA] text-[#1E7B3A] rounded">
                        SAVE {product.discountPercentage}%
                      </span>
                    </>
                  )}
                </div>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-6 font-light">
                  {product.tagline}
                </p>

                {/* Flacon Size Variants */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black">
                      Flacon Size: <span className="font-bold text-[#C5A880]">{selectedSize}</span>
                    </label>
                    <span className="text-[11px] text-[#1E7B3A] font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> In Stock & Ready to Ship
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {product.sizes.map((s) => (
                      <button
                        key={s.size}
                        type="button"
                        onClick={() => setSelectedSize(s.size)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          selectedSize === s.size
                            ? 'border-[#4A0E17] bg-[#4A0E17] text-white shadow-md'
                            : 'border-[#EEEBE6] bg-[#FAF8F5] text-gray-800 hover:border-gray-400'
                        }`}
                      >
                        <span className="block text-xs font-semibold">{s.size}</span>
                        <span className="block text-[11px] opacity-80 mt-0.5 font-mono">
                          ₹{s.price.toLocaleString('en-IN')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sillage & Longevity Meters */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-[#FAF8F5] rounded-2xl border border-[#EEEBE6] mb-6 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#D84A26] shrink-0" />
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Longevity</span>
                      <span className="font-semibold text-black">{product.longevity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#D84A26] shrink-0" />
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Projection & Sillage</span>
                      <span className="font-semibold text-black">{product.sillage}</span>
                    </div>
                  </div>
                </div>

                {/* Quantity & CTA Buttons */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#EEEBE6] rounded-xl overflow-hidden bg-[#FAF8F5]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3.5 text-gray-600 hover:text-black hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-black">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-3.5 text-gray-600 hover:text-black hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-4 px-6 bg-[#4A0E17] hover:bg-[#360910] text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · ₹{(activePrice * quantity).toLocaleString('en-IN')}</span>
                    </button>
                  </div>

                  {/* Buy Now Button */}
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-6 bg-[#D84A26] hover:bg-[#bf3e1d] text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Instant Checkout (Buy Now)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#EEEBE6] text-[11px] text-gray-500 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#1E7B3A]" />
                    <span>100% Genuine Grasse Essence</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-[#C5A880]" />
                    <span>Free Express Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-gray-400" />
                    <span>Tamper-Proof Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Accordions: Olfactory Architecture, Story, Application, Ingredients */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="border-t border-[#EEEBE6] pt-12">
            <h2 className="text-2xl font-serif text-[#111111] mb-8 text-center">
              The Alchemy of {product.name}
            </h2>

            <div className="max-w-4xl mx-auto divide-y divide-[#EEEBE6] border border-[#EEEBE6] rounded-2xl overflow-hidden bg-white shadow-xs">
              {/* Accordion 1: Fragrance Notes Pyramid */}
              <div>
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'notes' ? null : 'notes')}
                  className="w-full p-5 flex items-center justify-between text-left font-serif text-lg font-medium text-black hover:bg-[#FAF8F5] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#C5A880]" />
                    <span>Olfactory Notes Breakdown (Top, Heart & Base)</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      activeAccordion === 'notes' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'notes' && (
                  <div className="p-6 bg-[#FAF8F5] border-t border-[#EEEBE6] animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-5 rounded-xl border border-[#EEEBE6]">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          <Wind className="w-4 h-4 text-amber-500" /> Top Notes
                        </div>
                        <ul className="space-y-1.5 text-xs text-black font-medium">
                          {product.notes.top.map((n) => (
                            <li key={n}>• {n}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-[#EEEBE6]">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          <Droplets className="w-4 h-4 text-rose-500" /> Heart Notes
                        </div>
                        <ul className="space-y-1.5 text-xs text-black font-medium">
                          {product.notes.heart.map((n) => (
                            <li key={n}>• {n}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-[#EEEBE6]">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          <Flame className="w-4 h-4 text-orange-600" /> Base Notes
                        </div>
                        <ul className="space-y-1.5 text-xs text-black font-medium">
                          {product.notes.base.map((n) => (
                            <li key={n}>• {n}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: The Parisian Atelier Story */}
              <div>
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'story' ? null : 'story')}
                  className="w-full p-5 flex items-center justify-between text-left font-serif text-lg font-medium text-black hover:bg-[#FAF8F5] transition-colors"
                >
                  <span>The Artisan&apos;s Journal & Provenance</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      activeAccordion === 'story' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'story' && (
                  <div className="p-6 bg-[#FAF8F5] border-t border-[#EEEBE6] text-xs sm:text-sm text-gray-700 leading-relaxed space-y-3 animate-fade-in">
                    <p>{product.description}</p>
                    <p className="italic text-gray-500 border-l-2 border-[#C5A880] pl-3">
                      &ldquo;{product.story}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: How to Apply & Longevity Tips */}
              <div>
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'apply' ? null : 'apply')}
                  className="w-full p-5 flex items-center justify-between text-left font-serif text-lg font-medium text-black hover:bg-[#FAF8F5] transition-colors"
                >
                  <span>Ritual of Application & Layering</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      activeAccordion === 'apply' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'apply' && (
                  <div className="p-6 bg-[#FAF8F5] border-t border-[#EEEBE6] text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2 animate-fade-in">
                    <p>
                      1. Spray from a distance of 6-8 inches directly onto warm pulse points: the base of the neck, inner wrists, and behind the ears.
                    </p>
                    <p>
                      2. <em>Do not rub</em> your wrists together; friction crushes the delicate volatile top-note molecules, altering the intended scent evolution.
                    </p>
                    <p>
                      3. For maximum sillage, mist onto your wool overcoat, silk scarf, or suit lapel where natural essential oils slowly evaporate over 48 hours.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Ingredients & Safety */}
              <div>
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'ingredients' ? null : 'ingredients')}
                  className="w-full p-5 flex items-center justify-between text-left font-serif text-lg font-medium text-black hover:bg-[#FAF8F5] transition-colors"
                >
                  <span>Ingredients & IFRA Certification</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      activeAccordion === 'ingredients' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'ingredients' && (
                  <div className="p-6 bg-[#FAF8F5] border-t border-[#EEEBE6] text-xs text-gray-600 leading-relaxed animate-fade-in space-y-2">
                    <p><strong>INCI Formula:</strong> {product.ingredients}</p>
                    <p className="text-[11px] text-gray-500">
                      Formulated in compliance with International Fragrance Association (IFRA) safety standards. Cruelty-free, vegan certified, free from parabens and phthalates.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="border-t border-[#EEEBE6] pt-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-serif text-black">
                  Patron Reviews ({productReviews.length})
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{product.rating} Out of 5.0</span>
                </div>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-5 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#262626] transition-colors self-start sm:self-auto"
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>

            {/* Review Form Drawer */}
            {showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="mb-10 bg-[#FAF8F5] p-6 rounded-2xl border border-[#EEEBE6] max-w-2xl animate-fade-in space-y-4"
              >
                <h4 className="text-sm font-serif font-semibold text-black">
                  Share Your Experience with {product.name}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">Your Name</label>
                    <input
                      type="text"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required
                      placeholder="e.g. Vikramaditya"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#EEEBE6] bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">Rating</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#EEEBE6] bg-white"
                    >
                      <option value={5}>5 Stars - Perfection</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Satisfactory</option>
                      <option value={2}>2 Stars - Below expectations</option>
                      <option value={1}>1 Star - Poor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Review Headline</label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. Masterpiece sandalwood that lasts all day"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-[#EEEBE6] bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">Your Review</label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                    rows={3}
                    placeholder="Describe the projection, sillage, compliments, or scent evolution..."
                    className="w-full text-xs px-3 py-2 rounded-lg border border-[#EEEBE6] bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </form>
            )}

            {/* List of Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productReviews.length === 0 ? (
                <div className="text-xs text-gray-500 py-6">
                  Be the first to review {product.name} and receive an exclusive ₹500 gratitude coupon!
                </div>
              ) : (
                productReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-xl border border-[#EEEBE6] bg-[#FAF8F5]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400">{rev.date}</span>
                    </div>
                    <h5 className="text-sm font-semibold text-black mb-1 font-serif">
                      {rev.title}
                    </h5>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">{rev.comment}</p>
                    <div className="text-[11px] font-medium text-gray-900 flex items-center gap-1">
                      <span>{rev.author}</span>
                      <Check className="w-3 h-3 text-[#1E7B3A]" />
                      <span className="text-gray-400 text-[10px]">• Verified French Perfume Patron</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Related Fragrances */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-12 sm:pt-20">
            <div className="border-t border-[#EEEBE6] pt-8 sm:pt-12">
              <h3 className="text-xl sm:text-2xl font-serif text-black mb-6 sm:mb-8 text-center sm:text-left">
                Complementary Olfactory Creations
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sticky Mobile Buy Bar */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#EEEBE6] px-4 py-2.5 z-30 flex items-center justify-between gap-3 shadow-2xl">
          <div className="min-w-0">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-mono truncate">
              {selectedSize} · {product.concentration}
            </span>
            <span className="text-base font-semibold text-[#111111] leading-tight block">
              ₹{activePrice.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleAddToCart}
              className="py-2.5 px-3.5 bg-[#4A0E17] hover:bg-[#360910] text-white text-[11px] font-semibold tracking-wider uppercase rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="py-2.5 px-4 bg-[#D84A26] hover:bg-[#bf3e1d] text-white text-[11px] font-semibold tracking-wider uppercase rounded-xl transition-colors shadow-sm"
            >
              Buy Now
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center font-serif text-[#4A0E17]">Chargement du parfum...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}
