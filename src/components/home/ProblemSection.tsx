import { DollarSign, Lock, BadgeCheck } from 'lucide-react';

const PROBLEMS = [
  {
    icon: DollarSign,
    title: 'Cost Barrier',
    description: 'SOC 2 audits cost $50,000 to $150,000 per cycle. This prices out small and mid-size software companies, leaving their customers with no way to evaluate security.',
  },
  {
    icon: Lock,
    title: 'Confidentiality Wall',
    description: 'SOC 2 reports are classified as restricted-use documents, shared only under NDA. The public cannot read them. Customers see a logo, not evidence.',
  },
  {
    icon: BadgeCheck,
    title: 'Badge Without Proof',
    description: 'Customers cannot verify what was tested, what scored well, what scored poorly, or what was excluded. The badge says "trust us" without showing the work.',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            The Problem with Closed Certification
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            The dominant SaaS security certification operates on a model of trust by authority.
            The Open Trust Protocol rejects this model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS.map((problem) => (
            <div
              key={problem.title}
              className="p-6 rounded-xl bg-surface-1 border border-surface-3/50 hover:border-score-missing/30 transition-colors"
            >
              <problem.icon size={32} className="text-score-missing mb-4" />
              <h3 className="font-display text-lg font-bold text-text-primary mb-3">
                {problem.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
