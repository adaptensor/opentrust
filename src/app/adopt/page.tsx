import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, Search, Calculator, FileText, Globe, RefreshCw,
  CheckCircle, ArrowRight, Shield, AlertTriangle, Lightbulb,
} from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { DOMAINS, SCORE_DEFINITIONS, TOTAL_CONTROLS, TOTAL_DOMAINS } from '@/data/otp-spec';

export const metadata: Metadata = {
  title: 'Adopt the OTP - Open Trust Protocol',
  description: 'Step-by-step guide for any SaaS company to self-assess, publish, and maintain an OTP Compliance Report. Free, no permission needed.',
};

const STEPS = [
  {
    number: 1,
    icon: BookOpen,
    title: 'Read the Specification',
    time: '30 minutes',
    description: 'Familiarize yourself with the 8 trust domains, 46 controls, scoring methodology, and delegation principle.',
    details: [
      'Read the full specification at /specification',
      'Understand the 5 score levels: ENFORCED (100%), IMPLEMENTED (75%), PARTIAL (50%), PLANNED (25%), MISSING (0%)',
      'Review the delegation principle — using certified providers is a strength',
      'Note the honesty clause: transparency over perfection',
    ],
  },
  {
    number: 2,
    icon: Search,
    title: 'Audit Your Controls',
    time: '1-5 days',
    description: 'Evaluate each of the 46 controls against your production codebase and infrastructure. Document evidence for every score.',
    details: [
      'Walk through each domain and each control',
      'For each control, determine: What is the current state? What evidence proves it?',
      'Score honestly — a PARTIAL or PLANNED score with a remediation plan is better than inflating to ENFORCED',
      'Identify delegated functions (auth, payments, hosting) and document provider certifications',
      'Use automated tools where possible — Claude Code can audit source code directly',
    ],
  },
  {
    number: 3,
    icon: Calculator,
    title: 'Calculate Your Score',
    time: '15 minutes',
    description: 'Compute domain scores (arithmetic mean of controls) and the weighted platform score.',
    details: [
      'For each domain: sum all control percentages, divide by number of controls',
      'For the platform score: multiply each domain score by its weight, sum all 8',
      'Weights: Auth 15%, Data 15%, Input 15%, Access 15%, Financial 15%, Infra 10%, Monitoring 10%, Availability 5%',
      'Determine your rating: STRONG (95-100), SOLID (85-94), DEVELOPING (70-84), EARLY (50-69), INSUFFICIENT (0-49)',
    ],
  },
  {
    number: 4,
    icon: FileText,
    title: 'Write Your Report',
    time: '2-4 hours',
    description: 'Compile your scores, evidence, gap disclosures, and delegation declarations into the 7 required sections.',
    details: [
      '1. Company identification (legal name, product, date, OTP version)',
      '2. Architecture summary (tech stack, delegated services)',
      '3. Domain-by-domain scoring (all 46 controls with evidence)',
      '4. Overall platform score (weighted calculation)',
      '5. Gap disclosure (every control < 100%: gap, plan, target date)',
      '6. Delegation declarations (provider, certification, data isolation proof)',
      '7. Version history',
    ],
  },
  {
    number: 5,
    icon: Globe,
    title: 'Publish Publicly',
    time: '1 hour',
    description: 'Make your report publicly accessible. No NDA, no login, no paywall. This is the entire point.',
    details: [
      'Host on your website, documentation site, or dedicated trust page',
      'Ensure the URL is publicly accessible without authentication',
      'Include the OTP version you audited against',
      'Date the report and plan for quarterly updates',
      'Optional: Submit your report to the OTP directory at opentrust.adaptensor.com/reports',
    ],
  },
  {
    number: 6,
    icon: RefreshCw,
    title: 'Maintain & Update',
    time: 'Quarterly',
    description: 'Keep your report current. Update at least quarterly or within 30 days of any material security change.',
    details: [
      'Re-audit controls that have changed',
      'Update gap disclosures: close resolved gaps, add new ones',
      'Increment the version number and document changes',
      'Keep previous versions accessible',
      'A changing score is normal — a stale report erodes trust faster than a low score',
    ],
  },
];

export default function AdoptPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Page header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-surface-3/50 text-xs text-text-muted mb-4">
          ADOPTION GUIDE
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          How to Adopt the OTP
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl">
          Any SaaS company can adopt the Open Trust Protocol. No permission needed, no audit fee,
          no certification authority. Six steps from zero to published.
        </p>
      </div>

      {/* What you need */}
      <section className="mb-16">
        <SectionHeading id="prerequisites">What You Need</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Access to your codebase', desc: 'You need to evaluate 46 controls against your actual production code and infrastructure.' },
            { title: 'A public URL', desc: 'Your report must be hosted somewhere publicly accessible. Your website, docs site, or a dedicated trust page.' },
            { title: 'Honesty', desc: 'The protocol only works if you report honestly. A low score with a plan is better than an inflated score.' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-surface-1 border border-surface-3/50 p-5">
              <CheckCircle size={20} className="text-brand-gold mb-3" />
              <h3 className="font-display text-sm font-bold text-text-primary mb-2">{item.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The 6 steps */}
      <section className="mb-16">
        <SectionHeading id="steps">The 6 Steps</SectionHeading>
        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <div key={step.number} className="rounded-xl bg-surface-1 border border-surface-3/50 overflow-hidden">
              <div className="flex items-center gap-4 p-6 pb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 shrink-0">
                  <step.icon size={24} className="text-brand-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-display text-lg font-bold text-text-primary">
                      Step {step.number}: {step.title}
                    </h3>
                    <span className="px-2.5 py-0.5 text-xs font-mono bg-surface-2 text-text-muted rounded-md">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{step.description}</p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <ul className="space-y-2 ml-16">
                  {step.details.map((detail, j) => (
                    <li key={j} className="flex gap-2 text-sm text-text-secondary">
                      <ArrowRight size={12} className="text-brand-gold mt-1 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex justify-center py-0">
                  <div className="w-px h-4 bg-surface-3/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Quick reference: Domains & Controls */}
      <section className="mb-16">
        <SectionHeading id="controls-reference">Controls Quick Reference</SectionHeading>
        <p className="text-sm text-text-secondary mb-6">
          All {TOTAL_DOMAINS} domains and {TOTAL_CONTROLS} controls you need to evaluate.
          Click through to the{' '}
          <Link href="/specification#domains" className="text-brand-gold hover:underline">full specification</Link>{' '}
          for required evidence details.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DOMAINS.map((domain) => (
            <div key={domain.number} className="rounded-xl bg-surface-1 border border-surface-3/50 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-2 font-display text-sm font-bold text-brand-gold shrink-0">
                  {domain.number}
                </span>
                <div>
                  <h4 className="font-display text-sm font-bold text-text-primary">{domain.name}</h4>
                  <span className="text-xs text-text-muted">
                    {domain.controlCount} controls - {(domain.weight * 100).toFixed(0)}% weight
                  </span>
                </div>
              </div>
              <ul className="space-y-1">
                {domain.controls.map((c) => (
                  <li key={c.id} className="flex gap-2 text-xs text-text-secondary">
                    <span className="text-text-muted font-mono w-6 shrink-0">{c.id}</span>
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Score levels reference */}
      <section className="mb-16">
        <SectionHeading id="scoring-reference">Scoring Reference</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {SCORE_DEFINITIONS.map((sd) => (
            <div
              key={sd.level}
              className="rounded-xl border p-4"
              style={{
                backgroundColor: `color-mix(in srgb, ${sd.color} 8%, transparent)`,
                borderColor: `color-mix(in srgb, ${sd.color} 25%, transparent)`,
              }}
            >
              <div className="font-display text-sm font-bold mb-1" style={{ color: sd.color }}>
                {sd.label}
              </div>
              <div className="text-xs font-mono mb-2" style={{ color: sd.color }}>
                {sd.percentage}%
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{sd.definition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="mb-16">
        <SectionHeading id="tips">Tips for a Strong Report</SectionHeading>
        <div className="space-y-3">
          {[
            { tip: 'Be specific with evidence', detail: 'Link to code, configurations, or provider documentation. "We use encryption" is not evidence. "AES-256 at rest via Neon PostgreSQL (SOC 2 Type II)" is.' },
            { tip: 'Embrace delegation', detail: 'Using Clerk for auth, Stripe for payments, and Vercel for hosting is not a weakness. Under OTP, it is the strongest possible control — if the provider is certified and you store zero sensitive data.' },
            { tip: 'Disclose gaps proactively', detail: 'A PARTIAL score with a clear remediation plan and target date builds more trust than a suspicious ENFORCED score with vague evidence.' },
            { tip: 'Use automation', detail: 'Claude Code can audit your codebase directly — checking for SQL injection patterns, auth middleware coverage, rate limiting, and more. The AdaptBooks report was generated this way.' },
            { tip: 'Start with what you have', detail: 'You do not need to be 100% on all controls to publish. An honest DEVELOPING (70-84%) report is more valuable than no report at all.' },
            { tip: 'Plan your quarterly cadence', detail: 'Set a calendar reminder. Reports must be updated quarterly or within 30 days of a material change. A stale report erodes trust faster than a low score.' },
          ].map((item) => (
            <div key={item.tip} className="flex gap-3 p-4 rounded-xl bg-surface-1 border border-surface-3/50">
              <Lightbulb size={16} className="text-brand-gold mt-0.5 shrink-0" />
              <div>
                <span className="text-sm font-semibold text-text-primary">{item.tip}. </span>
                <span className="text-sm text-text-secondary">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Example report */}
      <section className="mb-16">
        <SectionHeading id="example">See a Live Example</SectionHeading>
        <Link
          href="/reports/adaptbooks"
          className="block rounded-xl bg-surface-1 border border-surface-3/50 hover:border-brand-gold/30 transition-all p-6 group"
        >
          <div className="flex items-center gap-4">
            <Shield size={32} className="text-brand-gold shrink-0" />
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-text-primary group-hover:text-brand-gold transition-colors">
                AdaptBooks OTP Compliance Report
              </h3>
              <p className="text-sm text-text-secondary">
                The first OTP report ever published. 46 controls scored, 11 gaps disclosed, 6 delegation declarations.
                Platform score: 87.3% (SOLID).
              </p>
            </div>
            <ArrowRight size={20} className="text-text-muted group-hover:text-brand-gold transition-colors shrink-0" />
          </div>
        </Link>
      </section>

      {/* Final CTA */}
      <div className="text-center">
        <div className="rounded-2xl bg-surface-1 border border-brand-gold/20 p-8 sm:p-12">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-3">
            Start your report today
          </h2>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto">
            The OTP requires no permission, no fee, and no auditor. Read the specification,
            evaluate your controls, and publish. Your customers deserve to see the proof.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/specification"
              className="px-6 py-3 text-sm font-semibold bg-brand-gold text-brand-black rounded-lg hover:bg-brand-gold-dark transition-colors gold-glow"
            >
              Read the Specification
            </Link>
            <Link
              href="/soc2-comparison"
              className="px-6 py-3 text-sm font-semibold border border-surface-3 text-text-primary rounded-lg hover:border-brand-gold/50 hover:text-brand-gold transition-colors"
            >
              Compare with SOC 2
            </Link>
          </div>
          <p className="mt-6 text-sm text-text-primary font-semibold italic">
            &ldquo;Trust isn&apos;t a badge you buy. It&apos;s a standard you publish.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
