import type { Metadata } from 'next';
import SectionHeading from '@/components/shared/SectionHeading';
import TableOfContents from '@/components/shared/TableOfContents';
import ScoreDefinitions from '@/components/spec/ScoreDefinition';
import DomainWeightTable from '@/components/spec/DomainWeightTable';
import DomainCard from '@/components/spec/DomainCard';
import { DOMAINS, RATING_RANGES, DELEGATION_CRITERIA, DELEGATION_EXAMPLES } from '@/data/otp-spec';

export const metadata: Metadata = {
  title: 'Specification - Open Trust Protocol v1.0',
  description: 'The complete OTP v1.0 specification: 8 domains, 47 controls, scoring methodology, delegation principle, and publication requirements.',
};

const SCORE_BADGE_COLORS: Record<string, string> = {
  STRONG: 'bg-score-enforced/10 text-score-enforced border-score-enforced/30',
  SOLID: 'bg-score-implemented/10 text-score-implemented border-score-implemented/30',
  DEVELOPING: 'bg-score-partial/10 text-score-partial border-score-partial/30',
  EARLY: 'bg-score-planned/10 text-score-planned border-score-planned/30',
  INSUFFICIENT: 'bg-score-missing/10 text-score-missing border-score-missing/30',
};

export default function SpecificationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Page header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-surface-3/50 text-xs text-text-muted mb-4">
          PUBLIC - v1.0
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          The Open Trust Protocol
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl">
          A public standard for SaaS security and compliance transparency.
          Published February 28, 2026 by Adaptensor Inc.
        </p>
      </div>

      <div className="flex gap-12">
        {/* Table of contents */}
        <TableOfContents />

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-16">

          {/* Section 1: Purpose */}
          <section>
            <SectionHeading id="purpose">1. Purpose</SectionHeading>
            <div className="prose-sm space-y-4 text-text-secondary leading-relaxed">
              <p>
                The Open Trust Protocol (OTP) is a public framework for evaluating and disclosing
                the security posture of software-as-a-service platforms. It is designed as a
                transparent alternative to closed certification models like SOC 2 Type II.
              </p>
              <p>
                Any software company can adopt the OTP. Any customer can read the results. There is
                no certification authority, no audit fee, and no NDA. The protocol provides the
                standard; the adopting company provides the evidence; the public provides the
                accountability.
              </p>
              <p>
                The OTP is designed for SaaS companies that serve small and mid-size businesses —
                companies whose customers cannot afford to request SOC 2 reports and whose budgets
                cannot afford to produce them. However, any software company of any size may adopt
                the OTP, either as a primary disclosure framework or as a supplement to existing
                certifications.
              </p>
              <p className="text-text-primary font-semibold">
                Adopting the OTP does not require permission from Adaptensor Inc. or any other entity.
                It requires only a commitment to transparency.
              </p>
            </div>
          </section>

          {/* Section 2: Scoring Methodology */}
          <section>
            <SectionHeading id="scoring">2. Scoring Methodology</SectionHeading>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg font-bold text-text-primary mb-4">
                  2.1 Control Scoring
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  Every control in the OTP is scored on a 5-point scale. The score reflects the
                  current state of implementation, not intent or roadmap.
                </p>
                <ScoreDefinitions />
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-text-primary mb-4">
                  2.2 Domain Scoring
                </h3>
                <p className="text-sm text-text-secondary">
                  Each domain score is the arithmetic mean of its control scores. If a domain has
                  6 controls scoring 100%, 100%, 100%, 100%, 75%, 75%, the domain score is 91.7%.
                </p>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-text-primary mb-4">
                  2.3 Platform Score & Weighting
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  The overall platform score is the weighted average of all 8 domain scores.
                  Domains are weighted by their security criticality.
                </p>
                <div className="rounded-xl bg-surface-1 border border-surface-3/50 overflow-hidden">
                  <DomainWeightTable />
                </div>
              </div>
            </div>
          </section>

          {/* Rating Tiers */}
          <section>
            <SectionHeading id="rating-tiers">2.4 Platform Rating</SectionHeading>
            <p className="text-sm text-text-secondary mb-6">
              The weighted platform score maps to an overall rating.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {RATING_RANGES.map((range) => (
                <div
                  key={range.tier}
                  className={`p-4 rounded-xl border ${SCORE_BADGE_COLORS[range.tier]}`}
                >
                  <div className="font-display text-sm font-bold mb-1">{range.tier}</div>
                  <div className="text-xs font-mono mb-2">
                    {range.min}% - {range.max}%
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed">{range.meaning}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Delegation Principle */}
          <section>
            <SectionHeading id="delegation">3. The Delegation Principle</SectionHeading>
            <div className="space-y-6">
              <p className="text-sm text-text-secondary leading-relaxed">
                Modern SaaS platforms are not monolithic. They are composed of specialized services.
                Under SOC 2, delegated functions create a &ldquo;subservice organization&rdquo; carve-out,
                penalizing platforms for making architecturally sound decisions.
              </p>
              <p className="text-sm text-text-primary font-semibold leading-relaxed">
                The Open Trust Protocol takes the opposite position. Delegating security-critical
                functions to certified, specialized providers is the strongest possible control —
                provided the delegation meets three criteria:
              </p>

              {/* Three criteria */}
              <div className="space-y-3">
                {DELEGATION_CRITERIA.map((criterion, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-surface-1 border border-surface-3/50">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-gold text-brand-black text-sm font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-text-secondary leading-relaxed">{criterion}</p>
                  </div>
                ))}
              </div>

              {/* Delegation examples table */}
              <div className="rounded-xl bg-surface-1 border border-surface-3/50 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-surface-3/50">
                      <th className="text-left py-3 px-4 font-display font-bold text-text-primary">Function</th>
                      <th className="text-left py-3 px-4 font-display font-bold text-text-primary">Example Providers</th>
                      <th className="text-left py-3 px-4 font-display font-bold text-text-primary">What Platform Eliminates</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DELEGATION_EXAMPLES.map((ex) => (
                      <tr key={ex.function} className="border-b border-surface-3/20 last:border-0">
                        <td className="py-3 px-4 text-text-primary font-semibold">{ex.function}</td>
                        <td className="py-3 px-4 text-brand-gold">{ex.providers}</td>
                        <td className="py-3 px-4 text-text-secondary">{ex.eliminates}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4: The Eight Trust Domains */}
          <section>
            <SectionHeading id="domains">4. The Eight Trust Domains</SectionHeading>
            <p className="text-sm text-text-secondary mb-6">
              Each domain defines a category of security controls. An adopting company must evaluate
              every control and publish their score with supporting evidence.
            </p>
            <div className="space-y-4">
              {DOMAINS.map((domain) => (
                <div key={domain.number} id={`domain-${domain.number}`} className="scroll-mt-24">
                  <DomainCard domain={domain} />
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Publishing */}
          <section>
            <SectionHeading id="publishing">5. Publishing a Compliance Report</SectionHeading>
            <div className="space-y-6">
              <p className="text-sm text-text-secondary leading-relaxed">
                Any company adopting the Open Trust Protocol must publish an OTP Compliance Report
                containing their specific scores, evidence, and gap disclosures.
              </p>

              <div>
                <h3 className="font-display text-lg font-bold text-text-primary mb-4">
                  Required Sections
                </h3>
                <ol className="space-y-3">
                  {[
                    { title: 'Company identification', desc: 'Legal name, product name, report date, OTP version audited against.' },
                    { title: 'Architecture summary', desc: 'High-level description of the platform\'s technology stack, including all delegated services and their certifications.' },
                    { title: 'Domain-by-domain scoring', desc: 'Every control in every domain must be scored with evidence. No controls may be omitted without explanation.' },
                    { title: 'Overall platform score', desc: 'Calculated using the weighted methodology defined in Section 2.' },
                    { title: 'Gap disclosure', desc: 'Every control scoring below 100% must include: current score, specific gap description, remediation plan, and target completion date.' },
                    { title: 'Delegation declarations', desc: 'Every delegated function must list: the provider, the provider\'s certification, and proof that the platform does not handle the delegated data.' },
                    { title: 'Version history', desc: 'Date and summary of changes since the previous report.' },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 p-4 rounded-xl bg-surface-1 border border-surface-3/50">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-surface-2 text-xs font-display font-bold text-brand-gold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <span className="text-sm font-semibold text-text-primary">{item.title}. </span>
                        <span className="text-sm text-text-secondary">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-text-primary mb-4">
                  Publication Requirements
                </h3>
                <ul className="space-y-2">
                  {[
                    'Public access: The report must be published on a publicly accessible URL. No NDA. No login required. No paywall.',
                    'Version control: Each report must be dated and versioned. Previous versions should remain accessible.',
                    'Update frequency: Reports must be updated at least quarterly, or within 30 days of any material security change.',
                    'Honesty requirement: Inflating scores, omitting controls, or misrepresenting evidence is a violation of the protocol.',
                  ].map((req, i) => (
                    <li key={i} className="flex gap-2 text-sm text-text-secondary">
                      <span className="text-brand-gold shrink-0">-</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-surface-1 border border-brand-gold/20">
                <h3 className="font-display text-lg font-bold text-brand-gold mb-3">
                  The Honesty Clause
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  The Open Trust Protocol has no enforcement authority. There is no auditor to certify
                  compliance, no body to revoke certification, and no legal mechanism to punish
                  dishonest reporting.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  The enforcement mechanism is transparency itself. Because the report is public,
                  anyone — customers, competitors, security researchers, journalists — can read it
                  and challenge any claim.
                </p>
                <p className="text-sm text-text-primary font-semibold italic">
                  &ldquo;A low score honestly reported builds more trust than a high score dishonestly
                  reported. That is the entire point.&rdquo;
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
