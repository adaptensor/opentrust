import { BookOpen, FileText, AlertTriangle } from 'lucide-react';

const PILLARS = [
  {
    icon: BookOpen,
    title: 'Publish the Standard',
    description: 'The domains, controls, and scoring methodology are public. Anyone can read the rulebook.',
    color: 'text-score-enforced',
    borderColor: 'hover:border-score-enforced/30',
  },
  {
    icon: FileText,
    title: 'Publish the Evidence',
    description: 'Companies that adopt the OTP publish a Compliance Report showing their scores, their evidence, and their gaps. No NDA, no paywall.',
    color: 'text-score-implemented',
    borderColor: 'hover:border-score-implemented/30',
  },
  {
    icon: AlertTriangle,
    title: 'Disclose the Gaps',
    description: 'Perfection is not required. Honesty is. Every control not fully implemented must be disclosed with its current status and remediation plan.',
    color: 'text-brand-gold',
    borderColor: 'hover:border-brand-gold/30',
  },
];

export default function SolutionSection() {
  return (
    <section className="py-20 sm:py-28 bg-surface-1/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Trust by Transparency
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            The Open Trust Protocol operates on three principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`p-6 rounded-xl bg-surface-1 border border-surface-3/50 ${pillar.borderColor} transition-colors`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-2 text-sm font-display font-bold text-brand-gold">
                  {index + 1}
                </span>
                <pillar.icon size={24} className={pillar.color} />
              </div>
              <h3 className="font-display text-lg font-bold text-text-primary mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
