import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import ClientWrapper from '../components/ClientWrapper';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'French Perfume — Authentic Luxury Fragrance | Signature Scents',
  description:
    'Discover long-lasting signature fragrances crafted with nature-inspired French luxury. Explore Erba Gold, Bold Citrus, Elegance, Vanilla Rose, and curated discovery sets.',
  keywords:
    'French Perfume, Erba Gold, Bold Citrus, Elegance, Vanilla Rose, luxury fragrance, signature scent, long lasting perfume, affordable luxury, extrait de parfum',
  openGraph: {
    title: 'French Perfume — Authentic Luxury Fragrance',
    description: 'A Signature Scent. An Unforgettable Impression.',
    siteName: 'French Perfume',
    images: [{ url: '/logo.jpeg' }],
  },
  icons: {
    icon: [
      { url: '/logo.jpeg', type: 'image/jpeg' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/logo.jpeg' },
    ],
    shortcut: ['/logo.jpeg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white text-[#101310] antialiased selection:bg-[#D5B85A]/30 selection:text-[#153B27]">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
