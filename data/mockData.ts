import { Product, Coupon, CustomerReview, BannerSlide, StoreSettings, Order } from '../types';

export const initialStoreSettings: StoreSettings = {
  storeName: "French Perfume",
  tagline: "A Signature Scent. An Unforgettable Impression.",
  supportEmail: "concierge@frenchperfume.ind",
  supportPhone: "+91 98200 45890",
  currency: "INR",
  freeShippingThreshold: 999,
  standardShippingFee: 150,
  taxRatePercent: 0, // prices inclusive of GST
  announcementText: "✨ French Perfume: Complimentary Discovery Vial with orders above ₹999 | Code: FRENCHLUXE",
  showAnnouncement: true,
};

export const initialProducts: Product[] = [
  {
    id: "fp-erba-gold",
    name: "Erba Gold",
    frenchName: "Erba Gold Impérial",
    brand: "frenchperfume.ind",
    concentration: "Extrait de Parfum",
    gender: "unisex",
    category: "citrus-aromatic",
    price: 3499,
    originalPrice: 4899,
    discountPercentage: 28,
    rating: 4.97,
    reviewCount: 218,
    inStock: true,
    stockQuantity: 55,
    isBestSeller: true,
    isFeatured: true,
    badge: "Iconic Signature",
    sizes: [
      { size: "30 ml", price: 2299, originalPrice: 3199, inStock: true, sku: "FP-EG-30" },
      { size: "50 ml", price: 3499, originalPrice: 4899, inStock: true, sku: "FP-EG-50" },
      { size: "100 ml", price: 5999, originalPrice: 7899, inStock: true, sku: "FP-EG-100" }
    ],
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1000"
    ],
    thumbnail: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    tagline: "A golden symphony of sun-ripened Mediterranean citrus and velvety amber.",
    description: "Erba Gold is an intoxicating signature blend of sunny Calabrian bergamot, Sicilian lemon, and succulent fruits cascading into an opulent heart of warm amber, white musk, and Madagascar bourbon vanilla. Pure affordable luxury formulated for all-day projection.",
    story: "Composed under the warm Mediterranean sun, fusing rare Italian citrus essences with pure Parisian amber to craft an unforgettable signature sillage.",
    notes: {
      top: ["Calabrian Bergamot", "Sicilian Lemon", "Sun-Drenched Mandarin"],
      heart: ["Mediterranean Fruits Basket", "Spiced Cardamom", "Ginger Spark"],
      base: ["Baltic Amber", "Madagascar Bourbon Vanilla", "White Musk"]
    },
    olfactoryFamily: "Luminous Citrus Amber & Solar Fruits",
    longevity: "16+ Hours",
    sillage: "Enveloping & Radiant",
    season: ["Spring", "Summer", "All Year"],
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citral, Coumarin, Geraniol.",
    active: true
  },
  {
    id: "fp-bold-citrus",
    name: "Bold Citrus",
    frenchName: "Agrumes Audacieux de Grasse",
    brand: "frenchperfume.ind",
    concentration: "Extrait de Parfum",
    gender: "men",
    category: "citrus-aromatic",
    price: 3299,
    originalPrice: 4499,
    discountPercentage: 26,
    rating: 4.92,
    reviewCount: 147,
    inStock: true,
    stockQuantity: 42,
    isBestSeller: true,
    isFeatured: true,
    badge: "Bestseller",
    sizes: [
      { size: "30 ml", price: 2199, originalPrice: 2999, inStock: true, sku: "FP-BC-30" },
      { size: "50 ml", price: 3299, originalPrice: 4499, inStock: true, sku: "FP-BC-50" },
      { size: "100 ml", price: 5699, originalPrice: 7499, inStock: true, sku: "FP-BC-100" }
    ],
    images: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1000"
    ],
    thumbnail: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=600",
    tagline: "Electrifying blood orange and pink grapefruit anchored by smoky Haitian vetiver.",
    description: "Bold Citrus delivers an instant surge of commanding vitality. Sparkling citron zest and crushed pink peppercorn open with crisp drama before settling into a distinguished drydown of Haitian vetiver, cedar, and smoky ambergris.",
    story: "Designed for the modern gentleman who commands the room with effortless poise, leaving a wake of fresh distinction.",
    notes: {
      top: ["Blood Orange", "Pink Grapefruit", "Crushed Juniper Berry"],
      heart: ["Fresh Mint Leaves", "French Geranium", "Pink Peppercorn"],
      base: ["Haitian Vetiver", "Virginian Cedarwood", "Ambergris Accord"]
    },
    olfactoryFamily: "Crisp Citrus & Smoky Woody Aromatic",
    longevity: "14+ Hours",
    sillage: "Commanding & Sharp",
    season: ["Spring", "Summer", "Office & Evening"],
    ingredients: "Alcohol Denat., Aqua (Water), Parfum (Fragrance), Limonene, Citral, Linalool, Alpha-Isomethyl Ionone.",
    active: true
  },
  {
    id: "fp-elegance",
    name: "Elegance",
    frenchName: "Élégance Suprême",
    brand: "frenchperfume.ind",
    concentration: "Extrait de Parfum",
    gender: "women",
    category: "floral-fresh",
    price: 3699,
    originalPrice: 4999,
    discountPercentage: 26,
    rating: 4.95,
    reviewCount: 162,
    inStock: true,
    stockQuantity: 36,
    isBestSeller: true,
    isFeatured: true,
    badge: "Haute Luxe",
    sizes: [
      { size: "30 ml", price: 2399, originalPrice: 3299, inStock: true, sku: "FP-EL-30" },
      { size: "50 ml", price: 3699, originalPrice: 4999, inStock: true, sku: "FP-EL-50" },
      { size: "100 ml", price: 6299, originalPrice: 8299, inStock: true, sku: "FP-EL-100" }
    ],
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1000"
    ],
    thumbnail: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
    tagline: "Aristocratic French neroli and velvet iris layered with warm cashmere musks.",
    description: "Elegance epitomizes the timeless sophistication of French haute perfumery. Dew-kissed orange blossom and Grasse jasmine weave around powdery Parisian iris root and soft creamy sandalwood for an aura of regal poise.",
    story: "Created to celebrate graceful presence and feminine majesty, bottled in our classic gold-finished flacon.",
    notes: {
      top: ["Riviera Neroli", "White Peach", "Mandarin Blossom"],
      heart: ["Grasse Jasmine Sambac", "French Iris Butter", "White Magnolia"],
      base: ["Cashmere Musk", "Mysore Sandalwood", "Golden Amber"]
    },
    olfactoryFamily: "Velvet Floral & Powdery Cashmere",
    longevity: "15+ Hours",
    sillage: "Graceful & Hypnotic",
    season: ["All Seasons", "Special Occasions"],
    ingredients: "Alcohol Denat., Parfum, Geraniol, Citronellol, Eugenol, Benzyl Salicylate, Farnesol.",
    active: true
  },
  {
    id: "fp-vanilla-rose",
    name: "Vanilla Rose",
    frenchName: "Rose Vanillée de Grasse",
    brand: "frenchperfume.ind",
    concentration: "Extrait de Parfum",
    gender: "women",
    category: "gourmand",
    price: 3599,
    originalPrice: 4799,
    discountPercentage: 25,
    rating: 4.94,
    reviewCount: 139,
    inStock: true,
    stockQuantity: 30,
    isBestSeller: true,
    isFeatured: true,
    badge: "Trending",
    sizes: [
      { size: "30 ml", price: 2299, originalPrice: 2999, inStock: true, sku: "FP-VR-30" },
      { size: "50 ml", price: 3599, originalPrice: 4799, inStock: true, sku: "FP-VR-50" },
      { size: "100 ml", price: 6199, originalPrice: 7799, inStock: true, sku: "FP-VR-100" }
    ],
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&q=80&w=1000"
    ],
    thumbnail: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600",
    tagline: "Velvety Centifolia rose petals steeped in rich Madagascar bourbon vanilla.",
    description: "A decadent, addictive gourmand floral. Fresh morning May Rose is delicately caramelized with smoked Bourbon vanilla, roasted almond praline, and seductive white musk. Intensely romantic with legendary staying power.",
    story: "Hand-picked roses from Provençal fields swirled with aged vanilla beans in copper alembics.",
    notes: {
      top: ["Morning Dew Water", "Sweet Lemon", "Crushed Rose Petals"],
      heart: ["Grasse Centifolia Rose", "Turkish Rose Absolute", "Almond Praline"],
      base: ["Bourbon Vanilla Pod", "White Musk", "Cedarwood"]
    },
    olfactoryFamily: "Gourmand Floral & Sweet Amber",
    longevity: "16+ Hours",
    sillage: "Irresistible & Sweet",
    season: ["Autumn", "Winter", "Evenings"],
    ingredients: "Alcohol Denat., Parfum (Fragrance), Vanillin, Geraniol, Citronellol, Coumarin.",
    active: true
  },
  {
    id: "fp-01",
    name: "Santal Impérial",
    frenchName: "Santal Impérial de Grasse",
    brand: "frenchperfume.ind",
    concentration: "Extrait de Parfum",
    gender: "unisex",
    category: "woody-oud",
    price: 3499,
    originalPrice: 4999,
    discountPercentage: 30,
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockQuantity: 45,
    isBestSeller: true,
    isFeatured: true,
    badge: "Best Seller",
    sizes: [
      { size: "30 ml", price: 2199, originalPrice: 2999, inStock: true, sku: "FP-SI-30" },
      { size: "50 ml", price: 3499, originalPrice: 4999, inStock: true, sku: "FP-SI-50" },
      { size: "100 ml", price: 5999, originalPrice: 7999, inStock: true, sku: "FP-SI-100" }
    ],
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1000"
    ],
    thumbnail: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    tagline: "An aristocratic symposium of Mysore sandalwood and French cardamom.",
    description: "Santal Impérial is an opulent ode to French high perfumery. Distilled in the historic hillside ateliers of Grasse, this velvety composition opens with crisp bergamot and crackling pink peppercorns before plunging into a creamy, smoky heart of rare sandalwood, cedar, and smoky bourbon vanilla.",
    story: "Conceived during a golden autumn in Provence, our Master Nez blended aged Australian and Indian sandalwood chips with Parisian iris root. Aged in French oak casks for six months before bottling.",
    notes: {
      top: ["Calabrian Bergamot", "French Cardamom", "Pink Peppercorn"],
      heart: ["Mysore Sandalwood", "Iris Butter", "Atlas Cedarwood"],
      base: ["Smoked Amber", "Bourbon Vanilla", "White Musk"]
    },
    olfactoryFamily: "Woody Oriental & Creamy Amber",
    longevity: "14+ Hours",
    sillage: "Enveloping & Majestic",
    season: ["Autumn", "Winter", "Evening"],
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Alpha-Isomethyl Ionone, Coumarin, Citronellol, Geraniol.",
    active: true
  },
  {
    id: "fp-02",
    name: "Rose de Grasse Absolu",
    frenchName: "Rose Centifolia Sublime",
    brand: "frenchperfume.ind",
    concentration: "Extrait de Parfum",
    gender: "women",
    category: "floral-fresh",
    price: 3899,
    originalPrice: 5299,
    discountPercentage: 26,
    rating: 4.95,
    reviewCount: 98,
    inStock: true,
    stockQuantity: 32,
    isBestSeller: true,
    isFeatured: true,
    badge: "Haute Parfumerie",
    sizes: [
      { size: "30 ml", price: 2499, originalPrice: 3299, inStock: true, sku: "FP-RG-30" },
      { size: "50 ml", price: 3899, originalPrice: 5299, inStock: true, sku: "FP-RG-50" },
      { size: "100 ml", price: 6499, originalPrice: 8499, inStock: true, sku: "FP-RG-100" }
    ],
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1000"
    ],
    thumbnail: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600",
    tagline: "Over five thousand May Rose petals hand-harvested at dawn in Provence.",
    description: "Rose de Grasse Absolu captures the intoxicating aroma of blooming Rose Centifolia under the morning dew. Enhanced with shimmering Lychee, honeyed French peonie, and soft white cashmere musks, it is romantically hypnotic and timelessly chic.",
    story: "Hand-picked strictly between 6 AM and 9 AM in Grasse fields during the fleeting May harvest, when the petals retain their purest crystalline nectar.",
    notes: {
      top: ["Lychee Sparkle", "Mandarin Zest", "Morning Dew Accord"],
      heart: ["Grasse Centifolia Rose", "Damask Rose Essence", "French Peony"],
      base: ["White Cashmere", "Ambrette Seeds", "Cedar Essence"]
    },
    olfactoryFamily: "Luminous Velvet Floral",
    longevity: "12+ Hours",
    sillage: "Radiant & Elegant",
    season: ["Spring", "Summer", "All Year"],
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Geraniol, Citronellol, Eugenol, Benzyl Salicylate.",
    active: true
  },
  {
    id: "fp-03",
    name: "Nuit Parisienne",
    frenchName: "Nuit Étoilée sur la Seine",
    brand: "frenchperfume.ind",
    concentration: "Extrait de Parfum",
    gender: "men",
    category: "oriental-amber",
    price: 3699,
    originalPrice: 4899,
    discountPercentage: 24,
    rating: 4.88,
    reviewCount: 165,
    inStock: true,
    stockQuantity: 28,
    isBestSeller: true,
    isNewArrival: false,
    badge: "Trending",
    sizes: [
      { size: "30 ml", price: 2399, originalPrice: 3199, inStock: true, sku: "FP-NP-30" },
      { size: "50 ml", price: 3699, originalPrice: 4899, inStock: true, sku: "FP-NP-50" },
      { size: "100 ml", price: 6299, originalPrice: 7999, inStock: true, sku: "FP-NP-100" }
    ],
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1000"
    ],
    thumbnail: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600",
    tagline: "The magnetic allure of cobblestone streets in Saint-Germain after midnight.",
    description: "A dark, seductive blend of smoky French leather, golden amber, roasted tonka bean, and spiced rum. Nuit Parisienne exudes an air of mysterious Parisian sophistication, leaving an unforgettable trail wherever you tread.",
    story: "Inspired by candlelit jazz salons in 1920s Paris where writers, artists, and perfumers converged to drink espresso and debate the avant-garde.",
    notes: {
      top: ["Aged French Cognac", "Cinnamon Bark", "Bitter Orange"],
      heart: ["Smoked Leather", "Guaiac Wood", "Clary Sage"],
      base: ["Black Amber", "Tonka Bean", "Tobacco Leaf", "Madagascar Vanilla"]
    },
    olfactoryFamily: "Smoky Amber & Cognac Leather",
    longevity: "16+ Hours",
    sillage: "Magnetic & Seductive",
    season: ["Autumn", "Winter", "Night"],
    ingredients: "Alcohol Denat., Parfum (Fragrance), Coumarin, Cinnamal, Linalool, Isoeugenol.",
    active: true
  },
  {
    id: "fp-04",
    name: "Vétiver Céleste",
    frenchName: "Vétiver Céleste de Versailles",
    brand: "frenchperfume.ind",
    concentration: "Eau de Parfum",
    gender: "men",
    category: "citrus-aromatic",
    price: 2999,
    originalPrice: 3999,
    discountPercentage: 25,
    rating: 4.82,
    reviewCount: 76,
    inStock: true,
    stockQuantity: 50,
    isNewArrival: true,
    badge: "New Arrival",
    sizes: [
      { size: "30 ml", price: 1899, originalPrice: 2599, inStock: true, sku: "FP-VC-30" },
      { size: "50 ml", price: 2999, originalPrice: 3999, inStock: true, sku: "FP-VC-50" },
      { size: "100 ml", price: 4999, originalPrice: 6499, inStock: true, sku: "FP-VC-100" }
    ],
    images: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1000"
    ],
    thumbnail: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=600",
    tagline: "Crisp Haitian vetiver electrified with sparkling grapefruit and juniper.",
    description: "An invigorating splash of royal freshness. Crisp grapefruit and Sicilian citron awaken the senses before descending into mineral flint, green vetiver roots, and clean Haitian cedar.",
    story: "Echoing the pristine trimmed gardens of the Château de Versailles after a crisp morning downpour.",
    notes: {
      top: ["Ruby Grapefruit", "Sicilian Citron", "Crushed Mint"],
      heart: ["Juniper Berry", "Flint Mineral Accord", "Geranium Bourbon"],
      base: ["Haitian Vetiver", "Virginian Cedar", "Clean Musk"]
    },
    olfactoryFamily: "Woody Aromatic & Crisp Citrus",
    longevity: "10+ Hours",
    sillage: "Crisp & Professional",
    season: ["Spring", "Summer", "Office"],
    ingredients: "Alcohol Denat., Aqua (Water), Parfum (Fragrance), Limonene, Citral, Linalool.",
    active: true
  },
  {
    id: "fp-05",
    name: "Oud Royal de Versailles",
    frenchName: "Oud Souverain Noir",
    brand: "frenchperfume.ind",
    concentration: "Extrait de Parfum",
    gender: "unisex",
    category: "woody-oud",
    price: 4499,
    originalPrice: 6499,
    discountPercentage: 30,
    rating: 4.97,
    reviewCount: 210,
    inStock: true,
    stockQuantity: 18,
    isBestSeller: true,
    isFeatured: true,
    badge: "Exclusive",
    sizes: [
      { size: "30 ml", price: 2999, originalPrice: 3999, inStock: true, sku: "FP-OR-30" },
      { size: "50 ml", price: 4499, originalPrice: 6499, inStock: true, sku: "FP-OR-50" },
      { size: "100 ml", price: 7999, originalPrice: 10999, inStock: true, sku: "FP-OR-100" }
    ],
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1000"
    ],
    thumbnail: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600",
    tagline: "A monarchical confluence of vintage Cambodian oud and French Damascus rose.",
    description: "The crown jewel of our collection. Aged dark agarwood is sweetened by French damascena rose nectar, roasted saffron threads, and warm Baltic amber. Regal, unapologetic, and immensely long-lasting.",
    story: "Formulated using distilled resinous agarwood matured for 12 years in temperature-controlled glass amphorae.",
    notes: {
      top: ["Kashmiri Saffron", "Taif Rosewater", "Bergamot"],
      heart: ["Aged Cambodian Agarwood", "Smoked Labdanum", "Patchouli Heart"],
      base: ["Benzoin Tears", "Baltic Amber", "Castoreum Accord"]
    },
    olfactoryFamily: "Royal Oriental Oud & Smoky Balsam",
    longevity: "18+ Hours",
    sillage: "Monarchical & Unrivaled",
    season: ["Winter", "Special Occasions", "Evenings"],
    ingredients: "Alcohol Denat., Parfum, Farnesol, Eugenol, Benzyl Benzoate, Cinnamyl Alcohol.",
    active: true
  },
  {
    id: "fp-06",
    name: "Fleur d'Oranger Intense",
    frenchName: "Fleur d'Oranger de la Riviera",
    brand: "frenchperfume.ind",
    concentration: "Eau de Parfum",
    gender: "women",
    category: "floral-fresh",
    price: 3199,
    originalPrice: 4299,
    discountPercentage: 25,
    rating: 4.87,
    reviewCount: 64,
    inStock: true,
    stockQuantity: 40,
    isNewArrival: true,
    badge: "Riviera Collection",
    sizes: [
      { size: "30 ml", price: 1999, originalPrice: 2699, inStock: true, sku: "FP-FO-30" },
      { size: "50 ml", price: 3199, originalPrice: 4299, inStock: true, sku: "FP-FO-50" },
      { size: "100 ml", price: 5499, originalPrice: 6999, inStock: true, sku: "FP-FO-100" }
    ],
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1000"
    ],
    thumbnail: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
    tagline: "Sun-drenched Mediterranean neroli kissed with honey and petitgrain.",
    description: "Transport yourself to the sun-soaked cliffs of Cap d'Antibes. Orange blossom blossoms dance with bitter petitgrain, white jasmine, and creamy French honey for an exhilarating Mediterranean glow.",
    story: "Distilled from bitter orange groves blooming along the French Riviera each spring.",
    notes: {
      top: ["Bitter Petitgrain", "Neroli Bigarade", "Mandarin Leaf"],
      heart: ["French Orange Blossom", "Jasmine Sambac", "Provence Lavender"],
      base: ["Wild Thyme Honey", "Cedarwood", "Sun-warmed White Musks"]
    },
    olfactoryFamily: "Solar Floral & Mediterranean Citrus",
    longevity: "11+ Hours",
    sillage: "Warm & Sunlit",
    season: ["Spring", "Summer", "Daytime"],
    ingredients: "Alcohol Denat., Parfum, Linalool, Limonene, Geraniol, Hydroxycitronellal.",
    active: true
  },
  {
    id: "fp-07",
    name: "Vanille Bourbon Cacao",
    frenchName: "Gourmandise de Saint-Honoré",
    brand: "frenchperfume.ind",
    concentration: "Extrait de Parfum",
    gender: "unisex",
    category: "gourmand",
    price: 3599,
    originalPrice: 4799,
    discountPercentage: 25,
    rating: 4.93,
    reviewCount: 112,
    inStock: true,
    stockQuantity: 22,
    isBestSeller: true,
    badge: "Indulgent",
    sizes: [
      { size: "30 ml", price: 2299, originalPrice: 2999, inStock: true, sku: "FP-VB-30" },
      { size: "50 ml", price: 3599, originalPrice: 4799, inStock: true, sku: "FP-VB-50" },
      { size: "100 ml", price: 6199, originalPrice: 7799, inStock: true, sku: "FP-VB-100" }
    ],
    images: [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1000"
    ],
    thumbnail: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&q=80&w=600",
    tagline: "Pure Madagascar vanilla pod steeped with dark Venezuelan cacao and hazelnut.",
    description: "An irresistible gourmand dream reminiscent of high-end Parisian patisseries on Rue du Faubourg Saint-Honoré. Rich smoked cocoa, roasted hazelnuts, and black vanilla pod enveloped in caramelised benzoin.",
    story: "A collaboration with Parisian pastry master artisans to replicate the exact scent profile of warm caramelized pralines and bourbon vanilla.",
    notes: {
      top: ["Roasted Hazelnut", "Cacao Nibs", "Blood Orange"],
      heart: ["Black Vanilla Pod", "Salted Caramel", "Almond Blossom"],
      base: ["Siam Benzoin", "Sandalwood", "Warm Cashmeran"]
    },
    olfactoryFamily: "Dark Gourmand & Warm Amber",
    longevity: "15+ Hours",
    sillage: "Irresistibly Intoxicating",
    season: ["Autumn", "Winter", "Evenings"],
    ingredients: "Alcohol Denat., Parfum (Fragrance), Vanillin, Coumarin, Anise Alcohol.",
    active: true
  },
  {
    id: "fp-08",
    name: "Discovery Coffret (5 x 10 ml)",
    frenchName: "Coffret Découverte Haute Parfumerie",
    brand: "frenchperfume.ind",
    concentration: "Extrait de Parfum",
    gender: "unisex",
    category: "discovery-sets",
    price: 1899,
    originalPrice: 2999,
    discountPercentage: 36,
    rating: 4.98,
    reviewCount: 312,
    inStock: true,
    stockQuantity: 120,
    isBestSeller: true,
    isFeatured: true,
    badge: "Most Loved Kit",
    sizes: [
      { size: "5 x 10 ml Set", price: 1899, originalPrice: 2999, inStock: true, sku: "FP-SET-5X10" }
    ],
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1000"
    ],
    thumbnail: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
    tagline: "Experience the complete French perfume wardrobe with redeemable coupon inside.",
    description: "The ultimate introductory voyage. Contains 10ml travel atomizers of our five most iconic creations: Santal Impérial, Rose de Grasse, Nuit Parisienne, Oud Royal, and Vanille Bourbon. Each box includes an exclusive ₹1,000 voucher redeemable against your first full-size bottle purchase.",
    story: "Curated in a handcrafted ivory and gold presentation case, ideal for gifting or discovering your true French signature scent.",
    notes: {
      top: ["Bergamot, Saffron, Grapefruit, Petitgrain, Hazelnut"],
      heart: ["Centifolia Rose, Mysore Sandalwood, Agarwood, Amber"],
      base: ["Bourbon Vanilla, Cashmere, Smoked Woods, White Musk"]
    },
    olfactoryFamily: "Curated Luxury Wardrobe",
    longevity: "12-18 Hours per scent",
    sillage: "Diverse Sillage Range",
    season: ["All Seasons", "Perfect Gift"],
    ingredients: "Alcohol Denat., Parfum, Aqua (Water), assorted allergens corresponding to each fragrance.",
    active: true
  }
];

export const initialCoupons: Coupon[] = [
  {
    id: "coup-01",
    code: "FRENCHLUXE",
    discountPercent: 15,
    minSpend: 999,
    maxDiscount: 1500,
    description: "15% OFF on all premium French fragrances across the catalog",
    expiryDate: "2026-12-31",
    isActive: true,
    usageCount: 428
  },
  {
    id: "coup-02",
    code: "FIRST10",
    discountPercent: 10,
    minSpend: 0,
    maxDiscount: 500,
    description: "Welcome offer: 10% instant off on your first order",
    expiryDate: "2026-12-31",
    isActive: true,
    usageCount: 890
  },
  {
    id: "coup-03",
    code: "ROYAL20",
    discountPercent: 20,
    minSpend: 5000,
    maxDiscount: 2000,
    description: "Royal tier: 20% OFF on cart values above ₹5,000",
    expiryDate: "2026-12-31",
    isActive: true,
    usageCount: 156
  }
];

export const initialReviews: CustomerReview[] = [
  {
    id: "rev-01",
    productId: "fp-01",
    productName: "Santal Impérial",
    author: "Aditya Roy K.",
    authorLocation: "Mumbai, Maharashtra",
    rating: 5,
    date: "March 18, 2026",
    title: "Comparable to the finest niche houses of Paris!",
    comment: "I own bottles from Le Labo and Roja, but Santal Impérial from frenchperfume.ind surprised me completely. The dry down has this warm, creamy Mysore sandalwood that stays on my suit jacket for 2 days. Outstanding value.",
    verifiedPurchase: true,
    approved: true,
    featured: true
  },
  {
    id: "rev-02",
    productId: "fp-02",
    productName: "Rose de Grasse Absolu",
    author: "Pooja Malhotra",
    authorLocation: "New Delhi",
    rating: 5,
    date: "April 2, 2026",
    title: "Pure blooming May Rose in a bottle",
    comment: "This isn't an artificial synthetic rose—it smells like you are walking through the Grasse flower fields at 7 AM. Gentle lychee opening with an ultra-luxurious cashmere musk drydown. My new signature scent!",
    verifiedPurchase: true,
    approved: true,
    featured: true
  },
  {
    id: "rev-03",
    productId: "fp-05",
    productName: "Oud Royal de Versailles",
    author: "Vikramaditya S.",
    authorLocation: "Bengaluru, Karnataka",
    rating: 5,
    date: "April 8, 2026",
    title: "Regal, dark, and lasts forever",
    comment: "Wore this to an evening gala and received compliments throughout the night. The projection is enormous yet refined. You can clearly feel the high concentration of natural perfume oil.",
    verifiedPurchase: true,
    approved: true,
    featured: true
  },
  {
    id: "rev-04",
    productId: "fp-08",
    productName: "Discovery Coffret (5 x 10 ml)",
    author: "Dr. Ananya Sen",
    authorLocation: "Kolkata, West Bengal",
    rating: 5,
    date: "April 10, 2026",
    title: "Best purchase ever! The ₹1000 voucher is real",
    comment: "The packaging alone is worth the price. Heavy glass mini atomizers and each fragrance has its own identity. Ended up ordering Santal Impérial with the included voucher. Fast shipping too!",
    verifiedPurchase: true,
    approved: true,
    featured: true
  }
];

export const initialBannerSlides: BannerSlide[] = [
  {
    id: "ban-01",
    title: "The Art of Haute Parfumerie",
    subtitle: "HANDCRAFTED IN GRASSE, PROVENCE",
    description: "Immerse yourself in rare botanicals, royal oud, and velvety sandalwood distilled with centuries of French heritage.",
    badge: "New Spring / Summer Collection 2026",
    buttonText: "Shop Signature Fragrances",
    link: "/shop",
    imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1600",
    active: true,
    displayOrder: 1
  },
  {
    id: "ban-02",
    title: "Oud Royal de Versailles",
    subtitle: "IMPERIAL EXTRAIT DE PARFUM",
    description: "A monarchical blend of 12-year aged agarwood and Damascus rose nectar. Formulated for timeless distinction.",
    badge: "Exclusive Limited Harvest",
    buttonText: "Discover Oud Royal",
    link: "/product/fp-05",
    imageUrl: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1600",
    active: true,
    displayOrder: 2
  },
  {
    id: "ban-03",
    title: "The Discovery Coffret",
    subtitle: "EXPLORE BEFORE YOU COMMIT",
    description: "Five 10ml travel atomizers with a redeemable ₹1,000 voucher towards your full-sized French signature bottle.",
    badge: "Includes ₹1,000 Full-Bottle Voucher",
    buttonText: "Claim Your Discovery Set",
    link: "/product/fp-08",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1600",
    active: true,
    displayOrder: 3
  }
];

export const initialOrders: Order[] = [
  {
    id: "ord-8921",
    orderNumber: "FP-2026-8921",
    date: "2026-04-11T14:32:00Z",
    customer: {
      id: "cust-01",
      name: "Rohit Vashisht",
      email: "rohit.vashisht@example.com",
      phone: "+91 98112 34567",
      address: {
        id: "addr-01",
        fullName: "Rohit Vashisht",
        phone: "+91 98112 34567",
        street: "Villa 42, Palm Meadows, Whitefield",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560066",
        isDefault: true
      }
    },
    items: [
      {
        productId: "fp-01",
        name: "Santal Impérial",
        frenchName: "Santal Impérial de Grasse",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
        selectedSize: "50 ml",
        price: 3499,
        originalPrice: 4999,
        quantity: 1,
        concentration: "Extrait de Parfum"
      }
    ],
    subtotal: 3499,
    discount: 524,
    shippingCharge: 0,
    total: 2975,
    couponCode: "FRENCHLUXE",
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    orderStatus: "Out for Delivery",
    trackingNumber: "BLUE-DART-FP8921",
    estimatedDelivery: "Tomorrow by 2 PM"
  },
  {
    id: "ord-8919",
    orderNumber: "FP-2026-8919",
    date: "2026-04-10T09:15:00Z",
    customer: {
      id: "cust-02",
      name: "Meera Singhania",
      email: "meera.singh@example.com",
      phone: "+91 99201 87654",
      address: {
        id: "addr-02",
        fullName: "Meera Singhania",
        phone: "+91 99201 87654",
        street: "Flat 12B, Sea Face Towers, Worli",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400018",
        isDefault: true
      }
    },
    items: [
      {
        productId: "fp-02",
        name: "Rose de Grasse Absolu",
        frenchName: "Rose Centifolia Sublime",
        image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600",
        selectedSize: "100 ml",
        price: 6499,
        originalPrice: 8499,
        quantity: 1,
        concentration: "Extrait de Parfum"
      },
      {
        productId: "fp-08",
        name: "Discovery Coffret (5 x 10 ml)",
        frenchName: "Coffret Découverte Haute Parfumerie",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
        selectedSize: "5 x 10 ml Set",
        price: 1899,
        originalPrice: 2999,
        quantity: 1,
        concentration: "Extrait de Parfum"
      }
    ],
    subtotal: 8398,
    discount: 1679,
    shippingCharge: 0,
    total: 6719,
    couponCode: "ROYAL20",
    paymentMethod: "Credit/Debit Card",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    trackingNumber: "BLUE-DART-FP8919"
  }
];
