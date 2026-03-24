import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-surface-3/50 bg-surface-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Protocol */}
          <div>
            <h3 className="font-display text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
              Protocol
            </h3>
            <ul className="space-y-2">
              <li><Link href="/specification" className="text-sm text-text-secondary hover:text-brand-gold transition-colors">Specification v1.0</Link></li>
              <li><Link href="/manifesto" className="text-sm text-text-secondary hover:text-brand-gold transition-colors">Manifesto</Link></li>
              <li><Link href="/soc2-comparison" className="text-sm text-text-secondary hover:text-brand-gold transition-colors">SOC 2 Comparison</Link></li>
            </ul>
          </div>

          {/* Adopt */}
          <div>
            <h3 className="font-display text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
              Adopt
            </h3>
            <ul className="space-y-2">
              <li><Link href="/adopt" className="text-sm text-text-secondary hover:text-brand-gold transition-colors">How to Adopt</Link></li>
              <li><Link href="/reports" className="text-sm text-text-secondary hover:text-brand-gold transition-colors">Published Reports</Link></li>
              <li><Link href="/verify" className="text-sm text-text-secondary hover:text-brand-gold transition-colors">Verify a Report</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-display text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
              About
            </h3>
            <ul className="space-y-2">
              <li><a href="https://adaptensor.com" target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-brand-gold transition-colors">Adaptensor</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-3/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              The Open Trust Protocol v1.0 — Created by Adaptensor Inc. Published for everyone.
            </p>
            <p className="text-xs text-text-muted">
              No license fee. No certification body. No NDA. Just proof.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
