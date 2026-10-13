'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, Coupon, CustomerReview, BannerSlide, StoreSettings, Address } from '../types';
import { initialProducts, initialCoupons, initialReviews, initialBannerSlides, initialStoreSettings, initialOrders } from '../data/mockData';

interface StoreContextType {
  // Store Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (
    customerInfo: { name: string; email: string; phone: string; address: Address },
    paymentMethod: Order['paymentMethod']
  ) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;

  // User / Auth
  currentUser: User | null;
  login: (email: string, role?: 'customer' | 'admin') => boolean;
  register: (name: string, email: string) => boolean;
  logout: () => void;
  switchUserRole: (role: 'customer' | 'admin') => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  toggleCouponActive: (id: string) => void;
  deleteCoupon: (id: string) => void;

  // Reviews
  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id' | 'date' | 'approved'>) => void;
  toggleReviewApproval: (id: string) => void;
  deleteReview: (id: string) => void;

  // Banners
  banners: BannerSlide[];
  updateBanner: (id: string, updated: Partial<BannerSlide>) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Store settings
  const [settings, setSettings] = useState<StoreSettings>(initialStoreSettings);

  // Products
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(['fp-01', 'fp-05']);

  // Orders
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  // Reviews
  const [reviews, setReviews] = useState<CustomerReview[]>(initialReviews);

  // Banners
  const [banners, setBanners] = useState<BannerSlide[]>(initialBannerSlides);

  // Quick view
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auth User
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'user-01',
    name: 'Antoine Delacroix',
    email: 'antoine@frenchperfume.ind',
    role: 'customer',
    phone: '+91 98200 45890',
    addresses: [
      {
        id: 'addr-default',
        fullName: 'Antoine Delacroix',
        phone: '+91 98200 45890',
        street: 'Penthouse 14, Oberoi Sky City, Borivali East',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400066',
        isDefault: true
      }
    ],
    wishlist: ['fp-01', 'fp-05'],
    orders: ['ord-8921'],
    createdAt: '2026-01-15'
  });

  // Load from localStorage if present on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('fp_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('fp_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedUser = localStorage.getItem('fp_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
    } catch {
      // fallback
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('fp_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('fp_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('fp_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('fp_user');
      }
    } catch {}
  }, [currentUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart operations
  const addToCart = (product: Product, size: string, quantity = 1) => {
    const sizeObj = product.sizes.find(s => s.size === size) || product.sizes[0];
    const unitPrice = sizeObj ? sizeObj.price : product.price;
    const originalPrice = sizeObj ? sizeObj.originalPrice : product.originalPrice;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.productId === product.id && item.selectedSize === size);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          frenchName: product.frenchName,
          image: product.thumbnail || product.images[0],
          selectedSize: size,
          price: unitPrice,
          originalPrice: originalPrice,
          quantity: quantity,
          concentration: product.concentration
        }
      ];
    });

    showToast(`Ajouté! "${product.name} (${size})" added to cart.`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.productId === productId && item.selectedSize === size)));
    showToast('Item removed from bag');
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.productId === productId && item.selectedSize === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cartDiscount = appliedCoupon
    ? Math.min(
        Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100),
        appliedCoupon.maxDiscount || Infinity
      )
    : 0;

  const cartShipping =
    cartSubtotal === 0 || cartSubtotal >= settings.freeShippingThreshold
      ? 0
      : settings.standardShippingFee;

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === normalized && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or inactive promotional code.' };
    }
    if (cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Code requires a minimum purchase of ₹${found.minSpend.toLocaleString('en-IN')}.`
      };
    }
    setAppliedCoupon(found);
    return {
      success: true,
      message: `Code ${found.code} applied! You saved ${found.discountPercent}%`
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promotional coupon removed');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your Wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your Wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Products CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `fp-${Date.now().toString().slice(-4)}`;
    const fullProd: Product = { ...newProd, id };
    setProducts(prev => [fullProd, ...prev]);
    showToast(`Fragrance "${fullProd.name}" added to catalog.`);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
    showToast('Product updated successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog.');
  };

  const getProductById = (id: string) => products.find(p => p.id === id);

  // Orders
  const placeOrder = (
    customerInfo: { name: string; email: string; phone: string; address: Address },
    paymentMethod: Order['paymentMethod']
  ) => {
    const orderNum = `FP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: new Date().toISOString(),
      customer: {
        id: currentUser?.id || `guest-${Date.now()}`,
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address
      },
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingCharge: cartShipping,
      total: cartTotal,
      couponCode: appliedCoupon?.code,
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      orderStatus: 'Placed',
      trackingNumber: `EXP-IN-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: '3 - 5 Business Days'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, orderStatus: status } : o)));
    showToast(`Order status updated to "${status}".`);
  };

  const updatePaymentStatus = (orderId: string, status: Order['paymentStatus']) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, paymentStatus: status } : o)));
    showToast(`Payment status updated to "${status}".`);
  };

  // Auth / Users
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email: email,
      role: role,
      addresses: currentUser?.addresses || [],
      wishlist: wishlist,
      orders: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newUser);
    showToast(`Welcome back, ${newUser.name}!`);
    return true;
  };

  const register = (name: string, email: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'customer',
      addresses: [],
      wishlist: [],
      orders: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newUser);
    showToast(`Bienvenue, ${name}! Your account has been created.`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been signed out.');
  };

  const switchUserRole = (role: 'customer' | 'admin') => {
    if (!currentUser) {
      login('admin@frenchperfume.ind', role);
      return;
    }
    setCurrentUser({ ...currentUser, role });
    showToast(`Switched active view to: ${role.toUpperCase()}`);
  };

  // Coupons
  const addCoupon = (newCoupon: Omit<Coupon, 'id'>) => {
    const full: Coupon = { ...newCoupon, id: `coup-${Date.now()}` };
    setCoupons(prev => [full, ...prev]);
    showToast(`Coupon ${full.code} created.`);
  };

  const toggleCouponActive = (id: string) => {
    setCoupons(prev => prev.map(c => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    showToast('Coupon removed.');
  };

  // Reviews
  const addReview = (rev: Omit<CustomerReview, 'id' | 'date' | 'approved'>) => {
    const full: CustomerReview = {
      ...rev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      approved: true // auto-approved for demo
    };
    setReviews(prev => [full, ...prev]);
    showToast('Merci! Your review has been submitted.');
  };

  const toggleReviewApproval = (id: string) => {
    setReviews(prev => prev.map(r => (r.id === id ? { ...r, approved: !r.approved } : r)));
    showToast('Review visibility updated.');
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    showToast('Review deleted.');
  };

  // Banners
  const updateBanner = (id: string, updated: Partial<BannerSlide>) => {
    setBanners(prev => prev.map(b => (b.id === id ? { ...b, ...updated } : b)));
    showToast('Banner slide updated.');
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Store settings saved.');
  };

  return (
    <StoreContext.Provider
      value={{
        settings,
        updateSettings,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        updatePaymentStatus,
        currentUser,
        login,
        register,
        logout,
        switchUserRole,
        coupons,
        addCoupon,
        toggleCouponActive,
        deleteCoupon,
        reviews,
        addReview,
        toggleReviewApproval,
        deleteReview,
        banners,
        updateBanner,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
