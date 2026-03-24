import type { Metadata } from 'next';
import { MANIFESTO_STATEMENTS, MANIFESTO_CLOSING } from '@/data/manifesto';

export const metadata: Metadata = {
  title: 'Manifesto - Open Trust Protocol',
  description: 'The Open Trust Manifesto: five beliefs about security transparency, the cost of trust, and the right of every customer to read the evidence.',
};

export default function ManifestoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          The Open Trust Manifesto
        </h1>
        <p className="text-lg text-text-secondary">
          Five beliefs about security, transparency, and trust.
        </p>
      </div>

      {/* Preamble */}
      <div className="text-center mb-16">
        <span className="font-display text-2xl sm:text-3xl font-bold text-brand-gold">
          We believe:
        </span>
      </div>

      {/* Statements */}
      <div className="space-y-12">
        {MANIFESTO_STATEMENTS.map((statement) => (
          <div key={statement.id} className="flex gap-6 sm:gap-8">
            <span className="font-display text-4xl sm:text-5xl font-bold text-brand-gold/20 shrink-0 w-12 text-right">
              {statement.id}
            </span>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed pt-2">
              {statement.text}
            </p>
          </div>
        ))}
      </div>

      {/* Closing */}
      <div className="mt-20 pt-12 border-t border-surface-3/50">
        <p className="text-lg sm:text-xl text-text-primary font-semibold leading-relaxed text-center mb-12">
          {MANIFESTO_CLOSING}
        </p>
        <div className="text-center space-y-2">
          <p className="font-display text-sm text-text-muted uppercase tracking-wider">
            The Open Trust Protocol v1.0
          </p>
          <p className="text-sm text-text-muted">
            Created by Adaptensor Inc. — Published for everyone.
          </p>
          <p className="font-display text-base text-brand-gold font-semibold mt-4">
            Trust isn&apos;t a badge you buy. It&apos;s a standard you publish.
          </p>
        </div>
      </div>
    </div>
  );
}
