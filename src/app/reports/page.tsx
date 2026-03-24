import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ExternalLink } from 'lucide-react';
import { REPORTS } from '@/data/reports';
import { DOMAINS } from '@/data/otp-spec';

export const metadata: Metadata = {
  title: 'Published Reports - Open Trust Protocol',
  description: 'A directory of companies that have published OTP Compliance Reports with full domain-by-domain scoring, evidence, and gap disclosures.',
};

const RATING_STYLES: Record<string, string> = {
  STRONG: 'bg-score-enforced/10 text-score-enforced border-score-enforced/30',
  SOLID: 'bg-score-implemented/10 text-score-implemented border-score-implemented/30',
  DEVELOPING: 'bg-score-partial/10 text-score-partial border-score-partial/30',
  EARLY: 'bg-score-planned/10 text-score-planned border-score-planned/30',
  INSUFFICIENT: 'bg-score-missing/10 text-score-missing border-score-missing/30',
};

function getBarColor(score: number): string {
  if (score >= 95) return 'bg-score-enforced';
  if (score >= 85) return 'bg-score-implemented';
  if (score >= 70) return 'bg-score-partial';
  if (score >= 50) return 'bg-score-planned';
  return 'bg-score-missing';
}

function getTextColor(score: number): string {
  if (score >= 95) return 'text-score-enforced';
  if (score >= 85) return 'text-score-implemented';
  if (score >= 70) return 'text-score-partial';
  if (score >= 50) return 'text-score-planned';
  return 'text-score-missing';
}

export default function ReportsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Page header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-surface-3/50 text-xs text-text-muted mb-4">
          {REPORTS.length} REPORT{REPORTS.length !== 1 ? 'S' : ''} PUBLISHED
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          Published Reports
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl">
          Companies that have adopted the Open Trust Protocol and published their compliance reports.
          Every report is public, versioned, and includes full evidence for all 46 controls.
        </p>
      </div>

      {/* Report cards */}
      <div className="space-y-6">
        {REPORTS.map((report) => {
          const totalControls = report.domainScores.reduce((a, d) => a + d.controlScores.length, 0);
          const enforcedCount = report.domainScores.reduce(
            (a, d) => a + d.controlScores.filter((c) => c.score === 'ENFORCED').length, 0
          );
          const gapCount = report.domainScores.reduce(
            (a, d) => a + d.controlScores.filter((c) => c.gapDescription).length, 0
          );

          return (
            <Link
              key={report.slug}
              href={`/reports/${report.slug}`}
              className="block rounded-2xl bg-surface-1 border border-surface-3/50 hover:border-brand-gold/30 transition-all p-6 sm:p-8 group"
            >
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Score circle */}
                <div className="flex items-center justify-center lg:justify-start shrink-0">
                  <div className={`flex items-center justify-center w-24 h-24 rounded-full border-3 ${
                    report.platformRating === 'STRONG' ? 'border-score-enforced' :
                    report.platformRating === 'SOLID' ? 'border-score-implemented' :
                    report.platformRating === 'DEVELOPING' ? 'border-score-partial' :
                    report.platformRating === 'EARLY' ? 'border-score-planned' :
                    'border-score-missing'
                  }`}>
                    <div className="text-center">
                      <div className={`font-display text-2xl font-bold ${getTextColor(report.platformScore)}`}>
                        {report.platformScore.toFixed(1)}
                      </div>
                      <div className="text-[10px] text-text-muted uppercase">Score</div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-text-primary group-hover:text-brand-gold transition-colors">
                      {report.productName}
                    </h2>
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${RATING_STYLES[report.platformRating]}`}>
                      {report.platformRating}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-4">
                    {report.companyName} - {report.reportDate} - OTP {report.otpVersion} - Audited by {report.auditor}
                  </p>

                  {/* Mini domain bars */}
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-4">
                    {report.domainScores.map((ds) => {
                      const domain = DOMAINS.find((d) => d.number === ds.domainNumber);
                      return (
                        <div key={ds.domainNumber} className="text-center">
                          <div className="h-2 bg-surface-3/30 rounded-full overflow-hidden mb-1">
                            <div
                              className={`h-full rounded-full ${getBarColor(ds.domainScore)}`}
                              style={{ width: `${ds.domainScore}%` }}
                            />
                          </div>
                          <div className="text-[10px] text-text-muted truncate" title={domain?.name}>
                            D{ds.domainNumber}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 text-xs text-text-muted">
                    <span><FileText size={12} className="inline mr-1" />{totalControls} controls evaluated</span>
                    <span className="text-score-enforced">{enforcedCount} enforced</span>
                    <span className="text-score-partial">{gapCount} gaps disclosed</span>
                    <span className="text-brand-gold">{report.delegations.length} delegations</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex items-center shrink-0">
                  <ExternalLink size={20} className="text-text-muted group-hover:text-brand-gold transition-colors" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Adopt CTA */}
      <div className="mt-16 text-center">
        <div className="rounded-2xl bg-surface-1 border border-surface-3/50 p-8 sm:p-12">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-3">
            Publish your own report
          </h2>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto">
            Any SaaS company can adopt the Open Trust Protocol. Score your 46 controls,
            disclose your gaps honestly, and publish. No audit fee. No permission needed.
          </p>
          <Link
            href="/adopt"
            className="inline-flex px-6 py-3 text-sm font-semibold bg-brand-gold text-brand-black rounded-lg hover:bg-brand-gold-dark transition-colors gold-glow"
          >
            How to Adopt the OTP
          </Link>
        </div>
      </div>
    </div>
  );
}
