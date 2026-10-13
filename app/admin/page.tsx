'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '../../context/StoreContext';
import { Product, Coupon, StoreSettings, Order } from '../../types';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Layers,
  Tag,
  Star,
  Image as ImageIcon,
  Settings,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  Search,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  X,
  Check,
  RotateCw,
  LogOut,
  Sparkles,
  ArrowLeft,
  Lock
} from 'lucide-react';
import { formatDate } from '../../lib/format';

export default function AdminPage() {
  const router = useRouter();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    updatePaymentStatus,
    coupons,
    addCoupon,
    toggleCouponActive,
    deleteCoupon,
    reviews,
    toggleReviewApproval,
    deleteReview,
    banners,
    updateBanner,
    settings,
    updateSettings,
    currentUser,
    switchUserRole,
    logout
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'orders' | 'inventory' | 'coupons' | 'reviews' | 'banners' | 'settings'
  >('dashboard');

  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for Product
  const [prodName, setProdName] = useState('');
  const [prodFrench, setProdFrench] = useState('');
  const [prodConcentration, setProdConcentration] = useState<Product['concentration']>('Extrait de Parfum');
  const [prodGender, setProdGender] = useState<Product['gender']>('unisex');
  const [prodCategory, setProdCategory] = useState<Product['category']>('woody-oud');
  const [prodPrice, setProdPrice] = useState(3499);
  const [prodOrigPrice, setProdOrigPrice] = useState(4999);
  const [prodStock, setProdStock] = useState(30);
  const [prodImage, setProdImage] = useState('');
  const [prodTopNotes, setProdTopNotes] = useState('');
  const [prodHeartNotes, setProdHeartNotes] = useState('');
  const [prodBaseNotes, setProdBaseNotes] = useState('');
  const [prodDescription, setProdDescription] = useState('');

  // Coupon form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponPercent, setNewCouponPercent] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(999);

  // Settings form
  const [editSettings, setEditSettings] = useState<StoreSettings>(settings);

  // Role Access Guard: Check if authorized as admin
  if (currentUser?.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] p-6 text-center">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#EEEBE6] shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#4A0E17] text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8 text-[#F3BA93]" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D84A26] font-semibold block">
              Restricted Area
            </span>
            <h1 className="text-2xl font-serif text-[#4A0E17] font-semibold mt-1">
              Admin Authorization Required
            </h1>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              The Atelier Operations Suite is strictly reserved for store managers. Please sign in via the dedicated admin login portal.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/admin/login"
              className="w-full py-3.5 px-4 bg-[#4A0E17] hover:bg-[#360910] text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Go to Admin Login Page</span>
              <ShieldCheck className="w-4 h-4" />
            </Link>

            <button
              onClick={() => switchUserRole('admin')}
              className="w-full py-2.5 px-4 bg-[#FAF8F5] hover:bg-gray-100 text-[#4A0E17] text-xs font-semibold rounded-xl border border-[#EEEBE6] transition-colors"
            >
              1-Click Demo Admin Override
            </button>

            <Link
              href="/"
              className="inline-block text-xs text-gray-500 hover:text-black pt-2 underline"
            >
              ← Back to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculations for dashboard
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const lowStockProducts = products.filter((p) => p.stockQuantity < 25);

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdFrench('');
    setProdConcentration('Extrait de Parfum');
    setProdGender('unisex');
    setProdCategory('woody-oud');
    setProdPrice(3499);
    setProdOrigPrice(4999);
    setProdStock(30);
    setProdImage('https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1000');
    setProdTopNotes('Bergamot, Pink Peppercorn');
    setProdHeartNotes('Mysore Sandalwood, Rose');
    setProdBaseNotes('Bourbon Vanilla, Amber');
    setProdDescription('Distilled in Grasse ateliers from rare botanicals and aged oak casks.');
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod: Product) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdFrench(prod.frenchName);
    setProdConcentration(prod.concentration);
    setProdGender(prod.gender);
    setProdCategory(prod.category);
    setProdPrice(prod.price);
    setProdOrigPrice(prod.originalPrice);
    setProdStock(prod.stockQuantity);
    setProdImage(prod.thumbnail || prod.images[0]);
    setProdTopNotes(prod.notes.top.join(', '));
    setProdHeartNotes(prod.notes.heart.join(', '));
    setProdBaseNotes(prod.notes.base.join(', '));
    setProdDescription(prod.description);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = Math.round(((prodOrigPrice - prodPrice) / prodOrigPrice) * 100);

    const payload = {
      name: prodName,
      frenchName: prodFrench,
      brand: 'frenchperfume.ind',
      concentration: prodConcentration,
      gender: prodGender,
      category: prodCategory,
      price: prodPrice,
      originalPrice: prodOrigPrice,
      discountPercentage: Math.max(0, discount),
      rating: editingProduct ? editingProduct.rating : 4.9,
      reviewCount: editingProduct ? editingProduct.reviewCount : 12,
      inStock: prodStock > 0,
      stockQuantity: prodStock,
      isBestSeller: editingProduct ? editingProduct.isBestSeller : false,
      isNewArrival: true,
      badge: editingProduct?.badge || 'New',
      sizes: [
        { size: '30 ml', price: Math.round(prodPrice * 0.65), originalPrice: Math.round(prodOrigPrice * 0.65), inStock: true, sku: 'FP-SKU-30' },
        { size: '50 ml', price: prodPrice, originalPrice: prodOrigPrice, inStock: true, sku: 'FP-SKU-50' },
        { size: '100 ml', price: Math.round(prodPrice * 1.8), originalPrice: Math.round(prodOrigPrice * 1.8), inStock: true, sku: 'FP-SKU-100' },
      ],
      images: [prodImage, 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1000'],
      thumbnail: prodImage,
      tagline: `Artisanal ${prodConcentration} crafted in Grasse.`,
      description: prodDescription,
      story: 'Distilled with ancestral Provençal techniques in historic hillside ateliers.',
      notes: {
        top: prodTopNotes.split(',').map((s) => s.trim()),
        heart: prodHeartNotes.split(',').map((s) => s.trim()),
        base: prodBaseNotes.split(',').map((s) => s.trim()),
      },
      olfactoryFamily: `${prodCategory} Excellence`,
      longevity: '14+ Hours',
      sillage: 'Radiant & Majestic',
      season: ['All Seasons'],
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Linalool.',
      active: true,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }

    setIsProductModalOpen(false);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    addCoupon({
      code: newCouponCode.toUpperCase(),
      discountPercent: newCouponPercent,
      minSpend: newCouponMin,
      maxDiscount: 2000,
      description: `${newCouponPercent}% discount on orders above ₹${newCouponMin}`,
      expiryDate: '2026-12-31',
      isActive: true,
      usageCount: 0,
    });
    setNewCouponCode('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(editSettings);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-900 flex flex-col font-sans">
      {/* Admin Top Navigation Header (Matching Customer Theme) */}
      <header className="h-16 bg-white border-b border-[#EEEBE6] px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#4A0E17] flex items-center justify-center font-serif font-bold text-white text-sm shadow-xs">
              FP
            </div>
            <div>
              <span className="font-serif text-base tracking-wider uppercase text-[#4A0E17] font-semibold block">
                frenchperfume<span className="text-[#D84A26]">.ind</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gray-500 font-mono block">
                Atelier Operations Console
              </span>
            </div>
          </Link>
          <span className="hidden md:inline text-xs text-[#1E7B3A] font-semibold pl-4 border-l border-[#EEEBE6] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#1E7B3A]" /> Admin Authorized
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-gray-100 text-xs text-gray-700 hover:text-black border border-[#EEEBE6] transition-colors"
          >
            <span>View Customer Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Admin Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar in Matching Luxury Theme */}
        <aside className="w-64 bg-white border-r border-[#EEEBE6] p-4 flex flex-col justify-between shrink-0 hidden md:flex shadow-xs">
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#D84A26] px-3 py-2 font-bold">
              Administration Modules
            </div>

            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'products', label: 'Fragrance Catalog', icon: Package, badge: products.length },
              { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingCart, badge: orders.length },
              { id: 'inventory', label: 'Inventory & Stock', icon: Layers, alert: lowStockProducts.length > 0 },
              { id: 'coupons', label: 'Offers & Coupons', icon: Tag, badge: coupons.length },
              { id: 'reviews', label: 'Review Moderation', icon: Star, badge: reviews.length },
              { id: 'banners', label: 'Hero Banners', icon: ImageIcon },
              { id: 'settings', label: 'Store Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#4A0E17] text-white font-semibold shadow-xs'
                      : 'text-gray-700 hover:text-black hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#FAF8F5] text-gray-600 border border-[#EEEBE6]'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                  {tab.alert && (
                    <span className="w-2 h-2 rounded-full bg-[#D84A26] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* User Signout footnote */}
          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#EEEBE6] text-xs space-y-2">
            <div>
              <span className="text-[10px] text-gray-400 block font-mono">Current Operator</span>
              <span className="font-semibold text-black truncate block">{currentUser.email}</span>
            </div>
            <button
              onClick={() => {
                logout();
                router.push('/admin/login');
              }}
              className="w-full py-1.5 px-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-red-600 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Admin Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Horizontal Tab Navigation */}
        <div className="md:hidden flex overflow-x-auto bg-white border-b border-[#EEEBE6] p-2 gap-1.5 shrink-0 shadow-xs">
          {[
            { id: 'dashboard', label: 'Overview' },
            { id: 'products', label: 'Catalog' },
            { id: 'orders', label: 'Orders' },
            { id: 'inventory', label: 'Stock' },
            { id: 'coupons', label: 'Coupons' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'banners', label: 'Banners' },
            { id: 'settings', label: 'Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                activeTab === tab.id ? 'bg-[#4A0E17] text-white font-semibold' : 'text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area in Customer-Matched Theme */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#FAF8F5]">
          {/* 1. Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D84A26] font-semibold block mb-1">
                  Atelier Executive Suite
                </span>
                <h1 className="text-3xl font-serif text-[#4A0E17] font-medium">Dashboard Overview</h1>
                <p className="text-xs text-gray-500 mt-1">
                  Real-time revenue, order fulfillment, and perfume bottle inventory metrics.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#EEEBE6] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Total Realized Revenue</span>
                    <TrendingUp className="w-4 h-4 text-[#1E7B3A]" />
                  </div>
                  <div className="text-2xl font-serif font-bold text-[#4A0E17]">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-[#1E7B3A] mt-2 flex items-center gap-1 font-medium">
                    <span>+24.5% vs previous month</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EEEBE6] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Dispatched Orders</span>
                    <ShoppingCart className="w-4 h-4 text-[#4A0E17]" />
                  </div>
                  <div className="text-2xl font-serif font-bold text-[#111111]">
                    {totalOrdersCount}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-2 font-mono">
                    All India BlueDart & Express delivery
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EEEBE6] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Fragrance Catalog</span>
                    <Package className="w-4 h-4 text-[#D84A26]" />
                  </div>
                  <div className="text-2xl font-serif font-bold text-[#111111]">
                    {products.length} Items
                  </div>
                  <div className="text-[11px] text-gray-500 mt-2">
                    {products.filter((p) => p.inStock).length} in stock
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#EEEBE6] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Low Stock Alert</span>
                    <AlertTriangle className="w-4 h-4 text-[#D84A26]" />
                  </div>
                  <div className="text-2xl font-serif font-bold text-[#D84A26]">
                    {lowStockProducts.length} Fragrances
                  </div>
                  <div className="text-[11px] text-gray-500 mt-2">
                    Fewer than 25 units available
                  </div>
                </div>
              </div>

              {/* Recent Orders table snippet */}
              <div className="bg-white rounded-2xl border border-[#EEEBE6] p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg text-[#4A0E17] font-medium">Recent Client Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-semibold text-[#D84A26] hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="text-gray-500 border-b border-[#EEEBE6] font-mono bg-[#FAF8F5]">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Items</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-[#FAF8F5]">
                          <td className="p-3 font-mono font-medium text-black">{o.orderNumber}</td>
                          <td className="p-3 text-gray-700">{o.customer.name}</td>
                          <td className="p-3 text-gray-500">{o.items.length} Fragrance(s)</td>
                          <td className="p-3 font-semibold text-black">₹{o.total.toLocaleString('en-IN')}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-[#E6F4EA] text-[#1E7B3A] font-semibold text-[10px]">
                              {o.paymentStatus}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-[#4A0E17]/10 text-[#4A0E17] font-semibold text-[10px]">
                              {o.orderStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. Products Management Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-serif text-[#4A0E17] font-medium">Fragrance Catalog Management</h1>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage bottle variants, pricing, fragrance notes, and stock levels.
                  </p>
                </div>
                <button
                  onClick={openNewProductModal}
                  className="px-4 py-2.5 bg-[#4A0E17] hover:bg-[#360910] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Fragrance</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-[#EEEBE6] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] text-gray-600 border-b border-[#EEEBE6] font-mono">
                      <tr>
                        <th className="p-4">Product</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Concentration</th>
                        <th className="p-4">Base Price</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">Rating</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-[#FAF8F5]">
                          <td className="p-4 flex items-center gap-3">
                            <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-[#EEEBE6]">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <span className="font-serif font-medium text-black block">{p.name}</span>
                              <span className="text-[10px] text-gray-500 italic block">{p.frenchName}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-600 uppercase tracking-wider text-[11px] font-mono">
                            {p.category}
                          </td>
                          <td className="p-4 text-[#4A0E17] font-semibold text-[11px]">{p.concentration}</td>
                          <td className="p-4 font-semibold text-black">₹{p.price.toLocaleString('en-IN')}</td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                                p.stockQuantity < 25
                                  ? 'bg-[#D84A26]/10 text-[#D84A26]'
                                  : 'bg-[#E6F4EA] text-[#1E7B3A]'
                              }`}
                            >
                              {p.stockQuantity} units
                            </span>
                          </td>
                          <td className="p-4 text-amber-500 font-semibold">★ {p.rating}</td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => openEditProductModal(p)}
                              className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:text-[#4A0E17] hover:bg-gray-200"
                              title="Edit product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:text-red-600 hover:bg-red-50"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. Orders Management Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h1 className="text-2xl font-serif text-[#4A0E17] font-medium">Client Orders & Shipments</h1>
                <p className="text-xs text-gray-500 mt-1">
                  Update fulfillment statuses, waybills, and payment verification.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#EEEBE6] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] text-gray-600 border-b border-[#EEEBE6] font-mono">
                      <tr>
                        <th className="p-4">Order ID & Date</th>
                        <th className="p-4">Customer & Phone</th>
                        <th className="p-4">Flacons Ordered</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Payment Status</th>
                        <th className="p-4">Order Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#FAF8F5]">
                          <td className="p-4">
                            <span className="font-mono font-bold text-black block">{ord.orderNumber}</span>
                            <span className="text-[10px] text-gray-500 font-mono" suppressHydrationWarning>
                              {formatDate(ord.date)}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-black font-medium block">{ord.customer.name}</span>
                            <span className="text-[11px] text-gray-600 font-mono">{ord.customer.phone}</span>
                            <span className="text-[10px] text-gray-400 block truncate max-w-xs">
                              {ord.customer.address.city}, {ord.customer.address.state}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              {ord.items.map((it, idx) => (
                                <span key={idx} className="block text-[11px] text-gray-700">
                                  {it.name} ({it.selectedSize}) × {it.quantity}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 font-bold text-black font-mono">
                            ₹{ord.total.toLocaleString('en-IN')}
                          </td>
                          <td className="p-4">
                            <select
                              value={ord.paymentStatus}
                              onChange={(e) => updatePaymentStatus(ord.id, e.target.value as any)}
                              className="bg-[#FAF8F5] border border-[#EEEBE6] rounded-lg px-2 py-1 text-xs text-black focus:outline-none cursor-pointer"
                            >
                              <option value="Paid">Paid</option>
                              <option value="Pending">Pending</option>
                              <option value="Failed">Failed</option>
                              <option value="Refunded">Refunded</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <select
                              value={ord.orderStatus}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                              className="bg-[#4A0E17]/10 border border-[#4A0E17]/30 rounded-lg px-2 py-1 text-xs text-[#4A0E17] font-semibold focus:outline-none cursor-pointer"
                            >
                              <option value="Placed">Placed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 4. Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-serif text-[#4A0E17] font-medium">Inventory & Stock Balances</h1>
                  <p className="text-xs text-gray-500 mt-1">
                    Live stock balances for all bottled French formulations.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl bg-white border border-[#EEEBE6] shadow-xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-[#EEEBE6]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-medium text-black">{p.name}</h4>
                        <span className="text-[10px] text-gray-500 font-mono">{p.concentration}</span>
                        <div className="mt-1">
                          <span
                            className={`text-xs font-mono font-bold ${
                              p.stockQuantity < 25 ? 'text-[#D84A26]' : 'text-[#1E7B3A]'
                            }`}
                          >
                            {p.stockQuantity} Bottles Left
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => updateProduct(p.id, { stockQuantity: p.stockQuantity + 25, inStock: true })}
                      className="px-3 py-1.5 bg-[#4A0E17]/10 hover:bg-[#4A0E17]/20 text-xs font-semibold text-[#4A0E17] rounded-lg border border-[#4A0E17]/20 transition-colors"
                    >
                      +25 Restock
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Offers & Coupons Tab */}
          {activeTab === 'coupons' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <h1 className="text-2xl font-serif text-[#4A0E17] font-medium">Coupons & Promotional Vouchers</h1>

              {/* Create coupon form */}
              <form
                onSubmit={handleCreateCoupon}
                className="p-5 bg-white rounded-2xl border border-[#EEEBE6] shadow-xs flex flex-wrap gap-4 items-end"
              >
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    required
                    placeholder="e.g. SUMMER25"
                    className="uppercase text-xs px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black focus:outline-none focus:border-[#4A0E17]"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Discount %</label>
                  <input
                    type="number"
                    value={newCouponPercent}
                    onChange={(e) => setNewCouponPercent(Number(e.target.value))}
                    min={5}
                    max={50}
                    className="text-xs px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black focus:outline-none focus:border-[#4A0E17] w-24"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Min Spend (₹)</label>
                  <input
                    type="number"
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    className="text-xs px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black focus:outline-none focus:border-[#4A0E17] w-28"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#4A0E17] hover:bg-[#360910] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-xs"
                >
                  Create Code
                </button>
              </form>

              {/* Coupons list */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {coupons.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 bg-white rounded-2xl border border-[#EEEBE6] shadow-xs space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-base font-bold text-[#4A0E17] px-2 py-0.5 bg-[#FAF8F5] rounded border border-[#EEEBE6]">
                        {c.code}
                      </span>
                      <button
                        onClick={() => toggleCouponActive(c.id)}
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                          c.isActive ? 'bg-[#E6F4EA] text-[#1E7B3A]' : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </div>
                    <p className="text-xs text-gray-600">{c.description}</p>
                    <div className="text-[11px] text-gray-500 font-mono">
                      Redeemed {c.usageCount} times · Min: ₹{c.minSpend}
                    </div>
                    <button
                      onClick={() => deleteCoupon(c.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove coupon
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Reviews Moderation */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <h1 className="text-2xl font-serif text-[#4A0E17] font-medium">Customer Reviews Moderation</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="p-5 bg-white rounded-2xl border border-[#EEEBE6] shadow-xs space-y-2.5"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#4A0E17] font-semibold">{r.productName}</span>
                      <span className="text-amber-500">★ {r.rating} / 5</span>
                    </div>
                    <h4 className="font-serif text-black font-medium text-sm">&ldquo;{r.title}&rdquo;</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.comment}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#EEEBE6] text-xs">
                      <span className="text-gray-500">By {r.author}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleReviewApproval(r.id)}
                          className={`px-3 py-1 rounded text-xs font-medium ${
                            r.approved
                              ? 'bg-[#E6F4EA] text-[#1E7B3A]'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {r.approved ? 'Approved' : 'Pending Approval'}
                        </button>
                        <button
                          onClick={() => deleteReview(r.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Banners Tab */}
          {activeTab === 'banners' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <h1 className="text-2xl font-serif text-[#4A0E17] font-medium">Homepage Hero Banners</h1>

              <div className="space-y-4">
                {banners.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 bg-white rounded-2xl border border-[#EEEBE6] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-[#EEEBE6]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#D84A26] uppercase tracking-wider block font-mono font-semibold">
                          {b.badge}
                        </span>
                        <h4 className="font-serif text-base text-black font-medium">{b.title}</h4>
                        <p className="text-xs text-gray-500">{b.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateBanner(b.id, { active: !b.active })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          b.active ? 'bg-[#E6F4EA] text-[#1E7B3A]' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {b.active ? 'Live on Store' : 'Hidden'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <h1 className="text-2xl font-serif text-[#4A0E17] font-medium">Storefront Configuration</h1>

              <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-2xl border border-[#EEEBE6] shadow-xs space-y-4">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={editSettings.storeName}
                    onChange={(e) => setEditSettings({ ...editSettings, storeName: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600 block mb-1">Brand Tagline</label>
                  <input
                    type="text"
                    value={editSettings.tagline}
                    onChange={(e) => setEditSettings({ ...editSettings, tagline: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Support Phone</label>
                    <input
                      type="text"
                      value={editSettings.supportPhone}
                      onChange={(e) => setEditSettings({ ...editSettings, supportPhone: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Free Shipping Min (₹)</label>
                    <input
                      type="number"
                      value={editSettings.freeShippingThreshold}
                      onChange={(e) => setEditSettings({ ...editSettings, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-600 block mb-1">Top Announcement Bar Text</label>
                  <input
                    type="text"
                    value={editSettings.announcementText}
                    onChange={(e) => setEditSettings({ ...editSettings, announcementText: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#4A0E17] hover:bg-[#360910] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-xs"
                >
                  Save Store Settings
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EEEBE6] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-gray-900 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EEEBE6]">
              <h3 className="font-serif text-xl text-[#4A0E17] font-medium">
                {editingProduct ? 'Edit Fragrance Details' : 'Introduce New Fragrance'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Fragrance Name</label>
                  <input
                    type="text"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">French Name</label>
                  <input
                    type="text"
                    value={prodFrench}
                    onChange={(e) => setProdFrench(e.target.value)}
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Concentration</label>
                  <select
                    value={prodConcentration}
                    onChange={(e) => setProdConcentration(e.target.value as any)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  >
                    <option value="Extrait de Parfum">Extrait de Parfum</option>
                    <option value="Eau de Parfum">Eau de Parfum</option>
                    <option value="Elixir">Elixir</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Gender</label>
                  <select
                    value={prodGender}
                    onChange={(e) => setProdGender(e.target.value as any)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  >
                    <option value="unisex">Unisex</option>
                    <option value="men">Pour Homme (Men)</option>
                    <option value="women">Pour Femme (Women)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Family</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value as any)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  >
                    <option value="woody-oud">Woody & Oud</option>
                    <option value="floral-fresh">Floral & Fresh</option>
                    <option value="oriental-amber">Oriental & Amber</option>
                    <option value="citrus-aromatic">Citrus & Aromatic</option>
                    <option value="gourmand">Gourmand</option>
                    <option value="discovery-sets">Discovery Sets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={prodOrigPrice}
                    onChange={(e) => setProdOrigPrice(Number(e.target.value))}
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-1">Image URL</label>
                <input
                  type="url"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  required
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Top Notes (comma-separated)</label>
                  <input
                    type="text"
                    value={prodTopNotes}
                    onChange={(e) => setProdTopNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Heart Notes</label>
                  <input
                    type="text"
                    value={prodHeartNotes}
                    onChange={(e) => setProdHeartNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Base Notes</label>
                  <input
                    type="text"
                    value={prodBaseNotes}
                    onChange={(e) => setProdBaseNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-1">Description</label>
                <textarea
                  value={prodDescription}
                  onChange={(e) => setProdDescription(e.target.value)}
                  rows={2}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EEEBE6] text-black"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#EEEBE6]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#4A0E17] hover:bg-[#360910] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-xs"
                >
                  Save Fragrance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
