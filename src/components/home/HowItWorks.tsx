import { ScanSearch, FileCode, PenTool, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    icon: ScanSearch,
    title: 'AI Audit',
    description: 'Claude Code scans the actual codebase against all 47 OTP controls. No self-reporting — AI reads the code and scores it.',
    color: 'text-score-implemented',
  },
  {
    icon: FileCode,
    title: 'Artifact Published',
    description: 'The audit report is published as a Claude Artifact — immutable, timestamped, and hosted by Anthropic. Not the company being audited.',
    color: 'text-score-enforced',
  },
  {
    icon: PenTool,
    title: 'E-Signed',
    description: 'The same report is e-signed via AdaptDoc with cryptographic verification. Published on opentrust.adaptensor.com.',
    color: 'text-brand-gold',
  },
  {
    icon: ShieldCheck,
    title: 'Verified',
    description: 'Anyone can compare the artifact on claude.ai with the signed report on this site. Tamper-evident dual-source verification.',
    color: 'text-score-enforced',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Verified Trust Architecture
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            No single point of trust. No self-reporting. Tamper-evident by design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line (hidden on last item) */}
              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-surface-3/50" />
              )}

              <div className="text-center p-6">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-1 border border-surface-3/50 mb-4">
                  <step.icon size={28} className={step.color} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-gold text-brand-black text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
