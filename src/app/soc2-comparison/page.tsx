import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, XCircle, AlertTriangle, Shield, DollarSign, Clock, Eye, Lock } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { DOMAINS } from '@/data/otp-spec';
import { SOC2_MAPPINGS, SOC2_SUMMARY } from '@/data/soc2-mapping';

export const metadata: Metadata = {
  title: 'SOC 2 Comparison - Open Trust Protocol',
  description: 'Side-by-side comparison of OTP v1.0 vs SOC 2 Type II. See how every OTP domain maps to SOC 2 Trust Service Criteria and where OTP exceeds SOC 2.',
};

interface ComparisonRow {
  feature: string;
  otp: string;
  otpStatus: 'yes' | 'better' | 'different';
  soc2: string;
  soc2Status: 'yes' | 'no' | 'partial' | 'different';
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Public accessibility',
    otp: 'Reports are public. No NDA, no login, no paywall.',
    otpStatus: 'better',
    soc2: 'Reports require NDA. Customers must request access.',
    soc2Status: 'no',
  },
  {
    feature: 'Cost to produce',
    otp: 'Free. Self-assessed against a public standard.',
    otpStatus: 'better',
    soc2: '$30,000 - $200,000+ for a Type II audit.',
    soc2Status: 'different',
  },
  {
    feature: 'Audit timeline',
    otp: 'Can be completed in days using automated tools.',
    otpStatus: 'better',
    soc2: '3-12 months observation period required.',
    soc2Status: 'different',
  },
  {
    feature: 'Authentication controls',
    otp: '7 specific controls: passwords, MFA, sessions, brute force, RBAC, deprovisioning, OAuth.',
    otpStatus: 'better',
    soc2: 'CC6.1-CC6.3 cover logical access generally.',
    soc2Status: 'partial',
  },
  {
    feature: 'Encryption requirements',
    otp: 'Specific: TLS in transit, AES-256 at rest, backup encryption, security headers.',
    otpStatus: 'better',
    soc2: 'General encryption requirement without technical specificity.',
    soc2Status: 'partial',
  },
  {
    feature: 'Injection prevention',
    otp: '6 controls: SQL injection, body validation, URL params, file uploads, XSS, CSRF.',
    otpStatus: 'better',
    soc2: 'CC7.1-CC7.2 cover monitoring but not specific attack vectors.',
    soc2Status: 'no',
  },
  {
    feature: 'Tenant data isolation',
    otp: 'Requires database-level enforcement (RLS), not just app-layer.',
    otpStatus: 'better',
    soc2: 'General access control. No multi-tenancy specific requirements.',
    soc2Status: 'no',
  },
  {
    feature: 'Financial integrity',
    otp: '6 controls: double-entry, immutable logs, void audit, reconciliation, tax, PCI isolation.',
    otpStatus: 'better',
    soc2: 'CC8.1/PI1.1 cover processing integrity generally. No accounting-specific controls.',
    soc2Status: 'no',
  },
  {
    feature: 'Delegation handling',
    otp: 'Delegation Principle: using certified providers is a strength, scored positively.',
    otpStatus: 'better',
    soc2: 'Subservice organization carve-out. Penalizes delegation.',
    soc2Status: 'different',
  },
  {
    feature: 'Gap disclosure',
    otp: 'Mandatory. Every non-100% control must disclose the gap and remediation plan.',
    otpStatus: 'better',
    soc2: 'Auditor discretion. Findings may not be publicly disclosed.',
    soc2Status: 'partial',
  },
  {
    feature: 'Scoring methodology',
    otp: 'Transparent 5-level scoring (0-100%). Anyone can recalculate.',
    otpStatus: 'better',
    soc2: 'Pass/fail with qualified/unqualified opinion. No granular scoring.',
    soc2Status: 'different',
  },
  {
    feature: 'Update frequency',
    otp: 'Quarterly or within 30 days of material change.',
    otpStatus: 'yes',
    soc2: 'Annual audit cycle.',
    soc2Status: 'yes',
  },
  {
    feature: 'Offline/degraded operation',
    otp: 'Specific control (8.1) for resilience during outages.',
    otpStatus: 'yes',
    soc2: 'A1.1 covers general availability.',
    soc2Status: 'partial',
  },
  {
    feature: 'Third-party verification',
    otp: 'Not required. Transparency is the enforcement mechanism.',
    otpStatus: 'different',
    soc2: 'Required. CPA firm or accredited auditor.',
    soc2Status: 'yes',
  },
  {
    feature: 'Legal weight',
    otp: 'No legal or regulatory recognition (yet).',
    otpStatus: 'different',
    soc2: 'Recognized by regulators, enterprise procurement, and insurance.',
    soc2Status: 'yes',
  },
];

export default function Soc2ComparisonPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Page header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-surface-3/50 text-xs text-text-muted mb-4">
          FRAMEWORK COMPARISON
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          OTP vs SOC 2
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl">
          A side-by-side comparison of the Open Trust Protocol and SOC 2 Type II.
          The OTP is not a replacement for SOC 2 — it is an alternative for companies
          that need transparency without the six-figure price tag.
        </p>
      </div>

      {/* Key differences summary */}
      <section className="mb-16">
        <SectionHeading id="key-differences">Key Differences</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: DollarSign, title: 'Cost', otp: 'Free', soc2: '$30K - $200K+', color: 'text-score-enforced' },
            { icon: Clock, title: 'Timeline', otp: 'Days', soc2: '3-12 months', color: 'text-score-implemented' },
            { icon: Eye, title: 'Accessibility', otp: 'Public', soc2: 'NDA required', color: 'text-brand-gold' },
            { icon: Lock, title: 'Delegation', otp: 'Rewarded', soc2: 'Penalized', color: 'text-score-partial' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-surface-1 border border-surface-3/50 p-5">
              <item.icon size={24} className={`mb-3 ${item.color}`} />
              <h3 className="font-display text-sm font-bold text-text-primary mb-3">{item.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-gold/10 text-brand-gold rounded">OTP</span>
                  <span className="text-sm text-text-primary">{item.otp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-surface-3/50 text-text-muted rounded">SOC2</span>
                  <span className="text-sm text-text-secondary">{item.soc2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Domain mapping */}
      <section className="mb-16">
        <SectionHeading id="domain-mapping">Domain-to-Criteria Mapping</SectionHeading>
        <p className="text-sm text-text-secondary mb-6">
          Every OTP domain maps to specific SOC 2 Trust Service Criteria.
          The OTP covers 100% of SOC 2 scope and exceeds it in three areas.
        </p>
        <div className="rounded-xl bg-surface-1 border border-surface-3/50 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-3/50">
                <th className="text-left py-3 px-4 font-display font-bold text-text-primary">OTP Domain</th>
                <th className="text-left py-3 px-4 font-display font-bold text-text-primary">Weight</th>
                <th className="text-left py-3 px-4 font-display font-bold text-text-primary">Controls</th>
                <th className="text-left py-3 px-4 font-display font-bold text-text-primary">SOC 2 Criteria</th>
                <th className="text-left py-3 px-4 font-display font-bold text-text-primary">Comparison</th>
              </tr>
            </thead>
            <tbody>
              {SOC2_MAPPINGS.map((m) => {
                const domain = DOMAINS.find((d) => d.number === m.domainNumber);
                const exceeds = m.comparison.toLowerCase().includes('exceeds');
                return (
                  <tr key={m.domainNumber} className="border-b border-surface-3/20 last:border-0">
                    <td className="py-3 px-4">
                      <span className="text-brand-gold font-semibold mr-1">{m.domainNumber}.</span>
                      <span className="text-text-primary font-semibold">{m.domain}</span>
                    </td>
                    <td className="py-3 px-4 text-text-muted font-mono">
                      {((domain?.weight ?? 0) * 100).toFixed(0)}%
                    </td>
                    <td className="py-3 px-4 text-text-muted font-mono">
                      {domain?.controlCount}
                    </td>
                    <td className="py-3 px-4 text-text-secondary font-mono">
                      {m.soc2Criteria}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        exceeds ? 'text-score-enforced' : 'text-score-implemented'
                      }`}>
                        {exceeds ? <ArrowRight size={12} /> : <CheckCircle size={12} />}
                        {m.comparison}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-4 rounded-xl bg-surface-1 border border-brand-gold/20">
          <p className="text-sm text-text-secondary leading-relaxed">
            <span className="font-semibold text-brand-gold">Summary:</span>{' '}
            {SOC2_SUMMARY}
          </p>
        </div>
      </section>

      {/* Feature-by-feature comparison */}
      <section className="mb-16">
        <SectionHeading id="feature-comparison">Feature-by-Feature Comparison</SectionHeading>
        <div className="rounded-xl bg-surface-1 border border-surface-3/50 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr,1fr,1fr] border-b border-surface-3/50">
            <div className="py-3 px-4 font-display text-sm font-bold text-text-primary">Feature</div>
            <div className="py-3 px-4 font-display text-sm font-bold text-brand-gold border-l border-surface-3/30">
              Open Trust Protocol
            </div>
            <div className="py-3 px-4 font-display text-sm font-bold text-text-secondary border-l border-surface-3/30">
              SOC 2 Type II
            </div>
          </div>

          {/* Rows */}
          {COMPARISON_ROWS.map((row) => (
            <div key={row.feature} className="grid grid-cols-[1fr,1fr,1fr] border-b border-surface-3/20 last:border-0">
              <div className="py-3 px-4 text-sm font-semibold text-text-primary flex items-start gap-2">
                <Shield size={14} className="text-text-muted mt-0.5 shrink-0" />
                {row.feature}
              </div>
              <div className="py-3 px-4 border-l border-surface-3/30">
                <div className="flex items-start gap-2">
                  {row.otpStatus === 'better' ? (
                    <CheckCircle size={14} className="text-score-enforced mt-0.5 shrink-0" />
                  ) : row.otpStatus === 'different' ? (
                    <AlertTriangle size={14} className="text-score-partial mt-0.5 shrink-0" />
                  ) : (
                    <CheckCircle size={14} className="text-score-implemented mt-0.5 shrink-0" />
                  )}
                  <span className="text-sm text-text-secondary">{row.otp}</span>
                </div>
              </div>
              <div className="py-3 px-4 border-l border-surface-3/30">
                <div className="flex items-start gap-2">
                  {row.soc2Status === 'yes' ? (
                    <CheckCircle size={14} className="text-score-implemented mt-0.5 shrink-0" />
                  ) : row.soc2Status === 'no' ? (
                    <XCircle size={14} className="text-score-missing mt-0.5 shrink-0" />
                  ) : row.soc2Status === 'partial' ? (
                    <AlertTriangle size={14} className="text-score-partial mt-0.5 shrink-0" />
                  ) : (
                    <AlertTriangle size={14} className="text-text-muted mt-0.5 shrink-0" />
                  )}
                  <span className="text-sm text-text-muted">{row.soc2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* When to use which */}
      <section className="mb-16">
        <SectionHeading id="when-to-use">When to Use Which</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl bg-surface-1 border border-brand-gold/20 p-6">
            <h3 className="font-display text-lg font-bold text-brand-gold mb-4">Use the OTP when:</h3>
            <ul className="space-y-3">
              {[
                'Your customers are small and mid-size businesses that cannot request SOC 2 reports',
                'Your budget cannot support a $30K-$200K audit',
                'You want to demonstrate security posture publicly and transparently',
                'Your platform delegates critical functions to certified providers (Clerk, Stripe, etc.)',
                'You handle financial data and need accounting-specific controls SOC 2 does not cover',
                'You want to ship a report in days, not months',
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-secondary">
                  <CheckCircle size={14} className="text-brand-gold mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-surface-1 border border-surface-3/50 p-6">
            <h3 className="font-display text-lg font-bold text-text-primary mb-4">Use SOC 2 when:</h3>
            <ul className="space-y-3">
              {[
                'Enterprise customers contractually require SOC 2 Type II certification',
                'Regulators in your industry mandate SOC 2 compliance',
                'You need insurance underwriters to accept your security posture',
                'Third-party validation (CPA audit) is a business requirement',
                'You want legal and regulatory recognition that OTP does not yet provide',
                'Both: You can publish an OTP report alongside SOC 2 for maximum transparency',
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-secondary">
                  <CheckCircle size={14} className="text-text-muted mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <div className="rounded-2xl bg-surface-1 border border-surface-3/50 p-8 sm:p-12">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-3">
            Ready to show your security posture?
          </h2>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto">
            The OTP is free to adopt. Score your 46 controls, publish your report,
            and let your customers see the proof.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/adopt"
              className="px-6 py-3 text-sm font-semibold bg-brand-gold text-brand-black rounded-lg hover:bg-brand-gold-dark transition-colors gold-glow"
            >
              Adopt the OTP
            </Link>
            <Link
              href="/reports"
              className="px-6 py-3 text-sm font-semibold border border-surface-3 text-text-primary rounded-lg hover:border-brand-gold/50 hover:text-brand-gold transition-colors"
            >
              View Published Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
