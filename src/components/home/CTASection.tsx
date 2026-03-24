import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-surface-1/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
          Security transparency should not be gated by ability to pay.
        </h2>
        <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
          Customers deserve to read the evidence, not just see the badge.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/specification"
            className="px-8 py-3 text-base font-semibold bg-brand-gold text-brand-black rounded-lg hover:bg-brand-gold-dark transition-colors gold-glow"
          >
            Read the Specification
          </Link>
          <Link
            href="/manifesto"
            className="px-8 py-3 text-base font-semibold border border-surface-3 text-text-primary rounded-lg hover:border-brand-gold/50 hover:text-brand-gold transition-colors"
          >
            Read the Manifesto
          </Link>
        </div>
      </div>
    </section>
  );
}
