'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/specification', label: 'Specification' },
  { href: '/reports', label: 'Reports' },
  { href: '/soc2-comparison', label: 'vs SOC 2' },
  { href: '/verify', label: 'Verify' },
  { href: '/manifesto', label: 'Manifesto' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-canvas/80 backdrop-blur-xl border-b border-surface-3/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/otp-logo.png"
            alt="Open Trust Protocol"
            width={36}
            height={36}
            className="rounded"
          />
          <span className="font-display text-lg font-bold transition-colors">
            <span className="text-otp-open">Open</span>{' '}
            <span className="text-otp-trust">Trust</span>{' '}
            <span className="text-otp-protocol">Protocol</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-surface-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/adopt"
            className="ml-3 px-4 py-2 text-sm font-semibold bg-brand-gold text-brand-black rounded-lg hover:bg-brand-gold-dark transition-colors gold-glow"
          >
            Adopt OTP
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-text-primary"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-surface-3/50 bg-canvas/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-1 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/adopt"
              onClick={() => setMobileOpen(false)}
              className="block mt-2 px-4 py-2 text-sm font-semibold bg-brand-gold text-brand-black rounded-lg text-center hover:bg-brand-gold-dark transition-colors"
            >
              Adopt OTP
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
