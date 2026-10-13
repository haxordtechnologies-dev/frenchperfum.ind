export interface ProductSize {
  size: string; // e.g. "30 ml", "50 ml", "100 ml"
  price: number;
  originalPrice: number;
  inStock: boolean;
  sku: string;
}

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  frenchName: string;
  brand: string;
  concentration: 'Extrait de Parfum' | 'Eau de Parfum' | 'Parfum Cologne' | 'Elixir';
  gender: 'men' | 'women' | 'unisex';
  category: 'woody-oud' | 'floral-fresh' | 'oriental-amber' | 'citrus-aromatic' | 'gourmand' | 'discovery-sets';
  price: number; // default/base price (e.g. for default size)
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  badge?: string;
  sizes: ProductSize[];
  images: string[];
  thumbnail: string;
  tagline: string;
  description: string;
  story: string;
  notes: FragranceNotes;
  olfactoryFamily: string;
  longevity: string; // e.g. "12-14 Hours"
  sillage: string; // e.g. "Intense & Enveloping"
  season: string[];
  ingredients: string;
  active: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  frenchName: string;
  image: string;
  selectedSize: string;
  price: number;
  originalPrice: number;
  quantity: number;
  concentration: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: Address;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCharge: number;
  total: number;
  couponCode?: string;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Cash on Delivery' | 'NetBanking';
  paymentStatus: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  orderStatus: 'Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  addresses: Address[];
  wishlist: string[]; // product IDs
  orders: string[]; // order IDs
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  minSpend: number;
  maxDiscount?: number;
  description: string;
  expiryDate: string;
  isActive: boolean;
  usageCount: number;
}

export interface CustomerReview {
  id: string;
  productId: string;
  productName: string;
  author: string;
  authorLocation?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  approved: boolean;
  featured: boolean;
}

export interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  buttonText: string;
  link: string;
  imageUrl: string;
  active: boolean;
  displayOrder: number;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  currency: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  taxRatePercent: number;
  announcementText: string;
  showAnnouncement: boolean;
}
