import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, Clock, Server } from 'lucide-react';
import { getReportBySlug, REPORTS } from '@/data/reports';
import SectionHeading from '@/components/shared/SectionHeading';
import PlatformScoreHeader from '@/components/report/PlatformScoreHeader';
import ScoreOverview from '@/components/report/ScoreOverview';
import DomainScoreCard from '@/components/report/DomainScoreCard';
import GapSummaryTable from '@/components/report/GapSummaryTable';
import DelegationTable from '@/components/report/DelegationTable';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return REPORTS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = getReportBySlug(slug);
  if (!report) return { title: 'Report Not Found' };

  return {
    title: `${report.productName} OTP Compliance Report - Open Trust Protocol`,
    description: `OTP ${report.otpVersion} compliance report for ${report.productName} by ${report.companyName}. Platform score: ${report.platformScore.toFixed(1)}% (${report.platformRating}). 8 domains, 46 controls evaluated.`,
  };
}

export default async function ReportDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const report = getReportBySlug(slug);
  if (!report) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Back link */}
      <Link
        href="/reports"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-brand-gold transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        All Reports
      </Link>

      {/* Platform score header */}
      <PlatformScoreHeader
        score={report.platformScore}
        rating={report.platformRating}
        productName={report.productName}
        companyName={report.companyName}
        reportDate={report.reportDate}
        otpVersion={report.otpVersion}
        auditor={report.auditor}
        productUrl={report.productUrl}
      />

      {/* Auditor disclosure */}
      <div className="mt-6 p-4 rounded-xl bg-surface-1 border border-brand-gold/20">
        <p className="text-sm text-text-secondary leading-relaxed">
          <span className="font-semibold text-brand-gold">Disclosure:</span>{' '}
          {report.auditorDescription}
        </p>
      </div>

      {/* Main content */}
      <div className="mt-12 space-y-16">

        {/* Section 1: Architecture Summary */}
        <section>
          <SectionHeading id="architecture">1. Architecture Summary</SectionHeading>
          <div className="rounded-xl bg-surface-1 border border-surface-3/50 p-6">
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              {report.architectureSummary}
            </p>
            <div className="flex flex-wrap gap-2">
              {report.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-surface-2 text-text-secondary rounded-lg border border-surface-3/50"
                >
                  <Server size={12} className="text-text-muted" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Score Overview */}
        <section>
          <SectionHeading id="overview">2. Score Overview</SectionHeading>
          <ScoreOverview report={report} />
        </section>

        {/* Section 3: Domain-by-Domain Scoring */}
        <section>
          <SectionHeading id="domains">3. Domain-by-Domain Scoring</SectionHeading>
          <p className="text-sm text-text-secondary mb-6">
            Every control in every domain scored with evidence. Click a domain to expand and view
            individual control scores, evidence, delegation status, and gap disclosures.
          </p>
          <div className="space-y-4">
            {report.domainScores.map((ds) => (
              <DomainScoreCard key={ds.domainNumber} domainScore={ds} />
            ))}
          </div>
        </section>

        {/* Section 4: Gap Disclosures */}
        <section>
          <SectionHeading id="gaps">4. Gap Disclosures</SectionHeading>
          <p className="text-sm text-text-secondary mb-6">
            Per OTP requirements, every control scoring below 100% must disclose the specific gap,
            remediation plan, and target completion date. Transparency over perfection.
          </p>
          <GapSummaryTable report={report} />
        </section>

        {/* Section 5: Delegation Declarations */}
        <section>
          <SectionHeading id="delegations">5. Delegation Declarations</SectionHeading>
          <p className="text-sm text-text-secondary mb-6">
            Functions delegated to certified, specialized providers. Per the OTP Delegation Principle,
            each provider is certified, the attack surface is eliminated, and the integration is secured.
          </p>
          <DelegationTable delegations={report.delegations} />
        </section>

        {/* Section 6: Version History */}
        <section>
          <SectionHeading id="history">6. Version History</SectionHeading>
          <div className="space-y-3">
            {report.versionHistory.map((v) => (
              <div key={v.version} className="flex items-start gap-3 p-4 rounded-xl bg-surface-1 border border-surface-3/50">
                <Clock size={16} className="text-text-muted mt-0.5 shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-text-primary">Version {v.version}</span>
                    <span className="text-xs text-text-muted">{v.date}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{v.changes}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Honesty clause reminder */}
        <div className="p-6 rounded-xl bg-surface-1 border border-brand-gold/20">
          <h3 className="font-display text-lg font-bold text-brand-gold mb-3">
            The Honesty Clause
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            This report is published in accordance with the Open Trust Protocol&apos;s Honesty Clause.
            All scores reflect the actual state of the codebase as of the audit date. Gaps are
            disclosed openly with remediation plans. No controls have been omitted.
          </p>
          <p className="text-sm text-text-primary font-semibold italic">
            &ldquo;A low score honestly reported builds more trust than a high score dishonestly
            reported. That is the entire point.&rdquo;
          </p>
        </div>

        {/* Next review */}
        <div className="text-center text-sm text-text-muted">
          <p>
            This report will be updated quarterly or within 30 days of any material security change.
          </p>
          <p className="mt-1">
            Next scheduled review: <span className="text-text-secondary">June 23, 2026</span>
          </p>
        </div>
      </div>
    </div>
  );
}
