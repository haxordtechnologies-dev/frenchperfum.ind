import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import ClientWrapper from '../components/ClientWrapper';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'frenchperfume.ind — Haute Parfumerie Française | Luxury Fragrances',
  description:
    'Experience artisanal French perfumery distilled in Grasse. Explore handcrafted extraits de parfum, woody ouds, romantic florals, and curated discovery coffrets.',
  keywords:
    'french perfume, luxury fragrance, extrait de parfum, grasse rose, santal imperial, oud royal, discovery set, unisex perfume',
  openGraph: {
    title: 'frenchperfume.ind — Haute Parfumerie Française',
    description: 'Artisanal French fragrances distilled to perfection.',
    siteName: 'frenchperfume.ind',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white text-[#111111] antialiased selection:bg-[#C5A880]/30 selection:text-black">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
