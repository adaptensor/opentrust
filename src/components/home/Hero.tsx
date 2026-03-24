import Link from 'next/link';
import Image from 'next/image';
import { Shield, FileCheck, Eye } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-1 border border-surface-3/50 text-sm text-text-secondary mb-8">
            <span className="w-2 h-2 rounded-full bg-score-enforced" />
            Open Standard v1.0 — Free to adopt
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/otp-logo.png"
              alt="Open Trust Protocol"
              width={120}
              height={120}
              className="drop-shadow-2xl"
              priority
            />
          </div>

          {/* Tagline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
            Trust isn&apos;t a badge you buy.{' '}
            <span className="text-brand-gold">
              It&apos;s a standard you publish.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            The Open Trust Protocol is a public framework for evaluating and disclosing
            the security posture of SaaS platforms. No audit fee. No NDA. Just proof.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/specification"
              className="px-8 py-3 text-base font-semibold bg-brand-gold text-brand-black rounded-lg hover:bg-brand-gold-dark transition-colors gold-glow"
            >
              Read the Specification
            </Link>
            <Link
              href="/adopt"
              className="px-8 py-3 text-base font-semibold border border-surface-3 text-text-primary rounded-lg hover:border-brand-gold/50 hover:text-brand-gold transition-colors"
            >
              Adopt the OTP
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <Shield size={24} className="mx-auto mb-2 text-brand-gold" />
              <div className="font-display text-2xl font-bold text-text-primary">8</div>
              <div className="text-xs text-text-muted uppercase tracking-wider">Domains</div>
            </div>
            <div className="text-center">
              <FileCheck size={24} className="mx-auto mb-2 text-brand-gold" />
              <div className="font-display text-2xl font-bold text-text-primary">47</div>
              <div className="text-xs text-text-muted uppercase tracking-wider">Controls</div>
            </div>
            <div className="text-center">
              <Eye size={24} className="mx-auto mb-2 text-brand-gold" />
              <div className="font-display text-2xl font-bold text-text-primary">5</div>
              <div className="text-xs text-text-muted uppercase tracking-wider">Rating Tiers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
