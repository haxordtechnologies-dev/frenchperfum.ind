'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import ProductCard from '../../components/user/ProductCard';
import { useStore } from '../../context/StoreContext';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Search, Sparkles } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const { products } = useStore();

  const initialGender = searchParams.get('gender') || 'all';
  const initialCategory = searchParams.get('category') || 'all';
  const initialFilter = searchParams.get('filter') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [selectedGender, setSelectedGender] = useState<string>(initialGender);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedConcentration, setSelectedConcentration] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(8000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchFilter, setSearchFilter] = useState<string>(initialQuery);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync state if url params change
  React.useEffect(() => {
    if (searchParams.get('gender')) setSelectedGender(searchParams.get('gender')!);
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category')!);
    if (searchParams.get('q')) setSearchFilter(searchParams.get('q')!);
  }, [searchParams]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (!p.active) return false;
        if (selectedGender !== 'all' && p.gender !== selectedGender) return false;
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (selectedConcentration !== 'all' && p.concentration !== selectedConcentration) return false;
        if (p.price > priceMax) return false;
        if (onlyInStock && !p.inStock) return false;
        if (initialFilter === 'bestseller' && !p.isBestSeller) return false;
        if (initialFilter === 'new' && !p.isNewArrival) return false;
        if (searchFilter.trim()) {
          const q = searchFilter.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchFrench = p.frenchName.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchNotes =
            p.notes.top.some((n) => n.toLowerCase().includes(q)) ||
            p.notes.heart.some((n) => n.toLowerCase().includes(q)) ||
            p.notes.base.some((n) => n.toLowerCase().includes(q));
          if (!matchName && !matchFrench && !matchCat && !matchNotes) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // featured default
      });
  }, [
    products,
    selectedGender,
    selectedCategory,
    selectedConcentration,
    priceMax,
    onlyInStock,
    initialFilter,
    searchFilter,
    sortBy
  ]);

  const clearAllFilters = () => {
    setSelectedGender('all');
    setSelectedCategory('all');
    setSelectedConcentration('all');
    setPriceMax(8000);
    setSearchFilter('');
    setOnlyInStock(false);
  };

  const hasActiveFilters =
    selectedGender !== 'all' ||
    selectedCategory !== 'all' ||
    selectedConcentration !== 'all' ||
    priceMax < 8000 ||
    searchFilter.length > 0 ||
    onlyInStock;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Banner Header */}
        <div className="bg-[#FAF8F5] border-b border-[#EEEBE6] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A880] block mb-2 font-mono">
              The French Fragrance Treasury
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#111111]">
              Artisanal Perfume Collections
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto mt-3">
              Formulated in Grasse ateliers with rare botanicals, royal resins, and rich sandalwood. Extraits de Parfum concentrated for all-day sillage.
            </p>
          </div>
        </div>

        {/* Catalog Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EEEBE6] gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2 border border-[#EEEBE6] rounded-lg text-xs font-medium text-black bg-[#FAF8F5]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
              <span className="text-xs text-gray-500">
                Showing <strong className="text-black font-semibold">{filteredProducts.length}</strong> fragrances
              </span>
            </div>

            {/* Sort & Search */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-60">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter by note or name..."
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-[#EEEBE6] bg-[#FAF8F5] focus:outline-none focus:border-black"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                {searchFilter && (
                  <button
                    onClick={() => setSearchFilter('')}
                    className="absolute right-2.5 top-2 text-gray-400 hover:text-black"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="relative flex items-center gap-1.5 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort fragrances by"
                  className="text-xs py-2 pl-2 pr-6 rounded-lg border border-[#EEEBE6] bg-[#FAF8F5] text-black font-medium focus:outline-none cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <span className="text-xs text-gray-500 font-medium">Active filters:</span>
              {selectedGender !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF8F5] border border-[#EEEBE6] rounded-full text-xs text-black">
                  Gender: {selectedGender}
                  <button onClick={() => setSelectedGender('all')}>
                    <X className="w-3 h-3 text-gray-400 hover:text-black" />
                  </button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF8F5] border border-[#EEEBE6] rounded-full text-xs text-black">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')}>
                    <X className="w-3 h-3 text-gray-400 hover:text-black" />
                  </button>
                </span>
              )}
              {priceMax < 8000 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF8F5] border border-[#EEEBE6] rounded-full text-xs text-black">
                  Under ₹{priceMax}
                  <button onClick={() => setPriceMax(8000)}>
                    <X className="w-3 h-3 text-gray-400 hover:text-black" />
                  </button>
                </span>
              )}
              {onlyInStock && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF8F5] border border-[#EEEBE6] rounded-full text-xs text-black">
                  In Stock Only
                  <button onClick={() => setOnlyInStock(false)}>
                    <X className="w-3 h-3 text-gray-400 hover:text-black" />
                  </button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#111111] font-semibold underline hover:text-[#C5A880] ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Main Layout: Sidebar Filters + Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8 items-start">
            {/* Desktop Filters Sidebar */}
            <aside
              className={`lg:block ${
                isMobileFilterOpen
                  ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto block'
                  : 'hidden'
              } space-y-6 lg:border-r lg:border-[#EEEBE6] lg:pr-6`}
            >
              {isMobileFilterOpen && (
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 lg:hidden">
                  <h3 className="font-serif text-lg font-medium">Filter Fragrances</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-full text-gray-500 hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Gender Filter */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-black mb-3">
                  Gender / Pour
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'All Genders', value: 'all' },
                    { label: 'Pour Homme (Men)', value: 'men' },
                    { label: 'Pour Femme (Women)', value: 'women' },
                    { label: 'Unisex Haute Parfumerie', value: 'unisex' },
                  ].map((g) => (
                    <label key={g.value} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black">
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === g.value}
                        onChange={() => setSelectedGender(g.value)}
                        className="accent-[#4A0E17] w-3.5 h-3.5"
                      />
                      <span>{g.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fragrance Families Filter */}
              <div className="pt-4 border-t border-[#EEEBE6]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-black mb-3">
                  Olfactory Family
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'All Families', value: 'all' },
                    { label: 'Woody & Royal Oud', value: 'woody-oud' },
                    { label: 'Floral & Centifolia Rose', value: 'floral-fresh' },
                    { label: 'Oriental & Amber', value: 'oriental-amber' },
                    { label: 'Citrus & Aromatic', value: 'citrus-aromatic' },
                    { label: 'Gourmand & Vanilla', value: 'gourmand' },
                    { label: 'Discovery Sets', value: 'discovery-sets' },
                  ].map((cat) => (
                    <label key={cat.value} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.value}
                        onChange={() => setSelectedCategory(cat.value)}
                        className="accent-[#4A0E17] w-3.5 h-3.5"
                      />
                      <span>{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Concentration Filter */}
              <div className="pt-4 border-t border-[#EEEBE6]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-black mb-3">
                  Concentration
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'All Concentrations', value: 'all' },
                    { label: 'Extrait de Parfum (32%+ Oil)', value: 'Extrait de Parfum' },
                    { label: 'Eau de Parfum (20% Oil)', value: 'Eau de Parfum' },
                  ].map((c) => (
                    <label key={c.value} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black">
                      <input
                        type="radio"
                        name="concentration"
                        checked={selectedConcentration === c.value}
                        onChange={() => setSelectedConcentration(c.value)}
                        className="accent-[#4A0E17] w-3.5 h-3.5"
                      />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter Slider */}
              <div className="pt-4 border-t border-[#EEEBE6]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-black">
                    Max Price
                  </h4>
                  <span className="text-xs font-bold text-black font-mono">
                    ₹{priceMax.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="8000"
                  step="250"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>₹1,500</span>
                  <span>₹8,000</span>
                </div>
              </div>

              {/* Availability */}
              <div className="pt-4 border-t border-[#EEEBE6]">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-800">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="accent-black w-3.5 h-3.5 rounded"
                  />
                  <span>Show in-stock only</span>
                </label>
              </div>

              {isMobileFilterOpen && (
                <div className="pt-4 lg:hidden">
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full py-3 bg-black text-white text-xs font-semibold uppercase tracking-widest rounded-xl"
                  >
                    Apply Filters ({filteredProducts.length})
                  </button>
                </div>
              )}
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-[#FAF8F5] rounded-2xl border border-[#EEEBE6] p-8">
                  <h3 className="text-xl font-serif text-black mb-2">
                    No fragrances match your criteria
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
                    Try loosening your filters or clear search keywords to discover our broader Parisian collection.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ShopContent />
    </Suspense>
  );
}
