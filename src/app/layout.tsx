import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "Open Trust Protocol - Trust isn't a badge you buy. It's a standard you publish.",
  description:
    'A public standard for SaaS security and compliance transparency. 8 domains, 47 controls, no NDA, no audit fee. Just proof.',
  openGraph: {
    title: "Open Trust Protocol",
    description:
      'A public standard for SaaS security and compliance transparency. 8 domains, 47 controls, no NDA, no audit fee. Just proof.',
    url: 'https://opentrust.adaptensor.com',
    siteName: 'Open Trust Protocol',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Trust Protocol',
    description: 'A public standard for SaaS security transparency. No NDA. No audit fee. Just proof.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="bg-canvas text-text-primary font-sans antialiased min-h-screen">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
