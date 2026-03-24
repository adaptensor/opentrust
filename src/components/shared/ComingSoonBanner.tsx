import Link from 'next/link';
import { Construction } from 'lucide-react';

interface ComingSoonBannerProps {
  title: string;
  description: string;
  phase: number;
}

export default function ComingSoonBanner({ title, description, phase }: ComingSoonBannerProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center border border-brand-gold/20 rounded-2xl bg-surface-1/50 p-8 sm:p-12">
        <Construction size={48} className="mx-auto mb-6 text-brand-gold" />
        <h1 className="font-display text-2xl font-bold text-text-primary mb-3">
          {title}
        </h1>
        <p className="text-text-secondary mb-6">
          {description}
        </p>
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-surface-2 text-text-muted rounded-full mb-8">
          Phase {phase}
        </span>
        <div>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 text-sm font-semibold bg-brand-gold text-brand-black rounded-lg hover:bg-brand-gold-dark transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
