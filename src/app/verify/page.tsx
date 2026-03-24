'use client';

import { useState } from 'react';
import { ShieldCheck, Calculator, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { REPORTS } from '@/data/reports';
import { DOMAINS, SCORE_DEFINITIONS } from '@/data/otp-spec';
import type { ComplianceReport } from '@/data/report-types';

const SCORE_PERCENTAGES: Record<string, number> = {
  ENFORCED: 100,
  IMPLEMENTED: 75,
  PARTIAL: 50,
  PLANNED: 25,
  MISSING: 0,
};

function recalculateDomainScore(controlScores: { score: string }[]): number {
  const sum = controlScores.reduce((acc, c) => acc + (SCORE_PERCENTAGES[c.score] ?? 0), 0);
  return sum / controlScores.length;
}

function recalculatePlatformScore(report: ComplianceReport): number {
  return report.domainScores.reduce((acc, ds) => {
    const domain = DOMAINS.find((d) => d.number === ds.domainNumber);
    const weight = domain?.weight ?? 0;
    const recalculated = recalculateDomainScore(ds.controlScores);
    return acc + recalculated * weight;
  }, 0);
}

function getTextColor(score: number): string {
  if (score >= 95) return 'text-score-enforced';
  if (score >= 85) return 'text-score-implemented';
  if (score >= 70) return 'text-score-partial';
  if (score >= 50) return 'text-score-planned';
  return 'text-score-missing';
}

interface CheckResult {
  label: string;
  passed: boolean;
  detail: string;
}

function verifyReport(report: ComplianceReport): CheckResult[] {
  const checks: CheckResult[] = [];

  // 1. All 8 domains present
  const domainNumbers = report.domainScores.map((d) => d.domainNumber).sort((a, b) => a - b);
  checks.push({
    label: 'All 8 domains present',
    passed: domainNumbers.length === 8 && domainNumbers.every((n, i) => n === i + 1),
    detail: `Found domains: ${domainNumbers.join(', ')}`,
  });

  // 2. All 46 controls scored
  const totalControls = report.domainScores.reduce((a, d) => a + d.controlScores.length, 0);
  checks.push({
    label: 'All 46 controls scored',
    passed: totalControls === 46,
    detail: `${totalControls} of 46 controls have scores`,
  });

  // 3. Domain scores match recalculated values
  let domainScoresMatch = true;
  const domainDetails: string[] = [];
  for (const ds of report.domainScores) {
    const recalc = recalculateDomainScore(ds.controlScores);
    const match = Math.abs(recalc - ds.domainScore) < 0.1;
    if (!match) domainScoresMatch = false;
    domainDetails.push(
      `D${ds.domainNumber}: reported ${ds.domainScore.toFixed(1)}% vs calculated ${recalc.toFixed(1)}% ${match ? 'OK' : 'MISMATCH'}`
    );
  }
  checks.push({
    label: 'Domain scores are arithmetic means of control scores',
    passed: domainScoresMatch,
    detail: domainDetails.join('\n'),
  });

  // 4. Platform score matches weighted calculation
  const recalcPlatform = recalculatePlatformScore(report);
  const platformMatch = Math.abs(recalcPlatform - report.platformScore) < 0.1;
  checks.push({
    label: 'Platform score matches weighted calculation',
    passed: platformMatch,
    detail: `Reported: ${report.platformScore.toFixed(2)}%, Recalculated: ${recalcPlatform.toFixed(2)}%`,
  });

  // 5. Rating tier matches score
  let expectedRating: string;
  if (recalcPlatform >= 95) expectedRating = 'STRONG';
  else if (recalcPlatform >= 85) expectedRating = 'SOLID';
  else if (recalcPlatform >= 70) expectedRating = 'DEVELOPING';
  else if (recalcPlatform >= 50) expectedRating = 'EARLY';
  else expectedRating = 'INSUFFICIENT';
  checks.push({
    label: 'Rating tier matches score range',
    passed: report.platformRating === expectedRating,
    detail: `Score ${recalcPlatform.toFixed(1)}% -> Expected: ${expectedRating}, Reported: ${report.platformRating}`,
  });

  // 6. All valid score levels
  const validLevels = new Set(SCORE_DEFINITIONS.map((s) => s.level));
  const allValid = report.domainScores.every((ds) =>
    ds.controlScores.every((cs) => validLevels.has(cs.score))
  );
  checks.push({
    label: 'All control scores use valid OTP levels',
    passed: allValid,
    detail: allValid ? 'All scores are ENFORCED, IMPLEMENTED, PARTIAL, PLANNED, or MISSING' : 'Invalid score levels detected',
  });

  // 7. Gap disclosures for non-ENFORCED controls
  let gapsMissing = 0;
  const nonEnforced = report.domainScores.flatMap((ds) =>
    ds.controlScores.filter((cs) => cs.score !== 'ENFORCED')
  );
  for (const cs of nonEnforced) {
    if (!cs.gapDescription) gapsMissing++;
  }
  checks.push({
    label: 'Gap disclosures for all non-ENFORCED controls',
    passed: gapsMissing === 0,
    detail: gapsMissing === 0
      ? `All ${nonEnforced.length} non-ENFORCED controls have gap disclosures`
      : `${gapsMissing} of ${nonEnforced.length} non-ENFORCED controls missing gap disclosures`,
  });

  // 8. Company identification present
  checks.push({
    label: 'Company identification complete',
    passed: !!(report.companyName && report.productName && report.reportDate && report.otpVersion),
    detail: `${report.companyName} / ${report.productName} / ${report.reportDate} / OTP ${report.otpVersion}`,
  });

  // 9. Architecture summary present
  checks.push({
    label: 'Architecture summary provided',
    passed: report.architectureSummary.length > 50,
    detail: `${report.architectureSummary.length} characters`,
  });

  // 10. Delegation declarations present
  checks.push({
    label: 'Delegation declarations provided',
    passed: report.delegations.length > 0,
    detail: `${report.delegations.length} delegation(s): ${report.delegations.map((d) => d.provider).join(', ')}`,
  });

  // 11. Version history present
  checks.push({
    label: 'Version history documented',
    passed: report.versionHistory.length > 0,
    detail: `${report.versionHistory.length} version(s), latest: ${report.versionHistory[0]?.version ?? 'none'}`,
  });

  return checks;
}

export default function VerifyPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [verifiedReport, setVerifiedReport] = useState<ComplianceReport | null>(null);

  const handleVerify = () => {
    const report = REPORTS.find((r) => r.slug === selectedSlug);
    if (!report) return;
    setVerifiedReport(report);
    setResults(verifyReport(report));
  };

  const passedCount = results?.filter((r) => r.passed).length ?? 0;
  const totalChecks = results?.length ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Page header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-surface-3/50 text-xs text-text-muted mb-4">
          VERIFICATION TOOL
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          Verify a Report
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl">
          Independently verify that an OTP Compliance Report meets protocol requirements.
          The tool recalculates all scores from raw control data and checks structural compliance
          with the OTP v1.0 specification.
        </p>
      </div>

      {/* How it works */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: FileText, title: 'Select Report', desc: 'Choose a published compliance report from the directory.' },
          { icon: Calculator, title: 'Recalculate', desc: 'All scores independently recomputed from raw control-level data.' },
          { icon: ShieldCheck, title: 'Verify Structure', desc: '11 checks confirm the report meets all OTP v1.0 requirements.' },
        ].map((step, i) => (
          <div key={i} className="rounded-xl bg-surface-1 border border-surface-3/50 p-5 text-center">
            <step.icon size={28} className="mx-auto mb-3 text-brand-gold" />
            <h3 className="font-display text-sm font-bold text-text-primary mb-1">{step.title}</h3>
            <p className="text-xs text-text-secondary">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Verification form */}
      <div className="rounded-2xl bg-surface-1 border border-surface-3/50 p-6 sm:p-8 mb-8">
        <h2 className="font-display text-xl font-bold text-text-primary mb-4">Select a Published Report</h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedSlug}
            onChange={(e) => { setSelectedSlug(e.target.value); setResults(null); }}
            className="flex-1 px-4 py-3 rounded-lg bg-surface-2 border border-surface-3/50 text-text-primary text-sm focus:outline-none focus:border-brand-gold/50"
          >
            <option value="">Choose a report...</option>
            {REPORTS.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.productName} — {r.companyName} ({r.reportDate})
              </option>
            ))}
          </select>
          <button
            onClick={handleVerify}
            disabled={!selectedSlug}
            className="px-8 py-3 text-sm font-semibold bg-brand-gold text-brand-black rounded-lg hover:bg-brand-gold-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed gold-glow"
          >
            Verify Report
          </button>
        </div>
      </div>

      {/* Results */}
      {results && verifiedReport && (
        <div className="space-y-6">
          {/* Summary */}
          <div className={`rounded-2xl border p-6 sm:p-8 ${
            passedCount === totalChecks
              ? 'bg-score-enforced/5 border-score-enforced/30'
              : 'bg-score-partial/5 border-score-partial/30'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              {passedCount === totalChecks ? (
                <CheckCircle size={32} className="text-score-enforced shrink-0" />
              ) : (
                <AlertTriangle size={32} className="text-score-partial shrink-0" />
              )}
              <div>
                <h2 className="font-display text-xl font-bold text-text-primary">
                  {passedCount === totalChecks ? 'All Checks Passed' : `${passedCount} of ${totalChecks} Checks Passed`}
                </h2>
                <p className="text-sm text-text-secondary">
                  {verifiedReport.productName} by {verifiedReport.companyName}
                </p>
              </div>
            </div>

            {/* Recalculated score */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-canvas/50">
              <div className="text-center">
                <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Reported Score</div>
                <div className={`font-display text-2xl font-bold ${getTextColor(verifiedReport.platformScore)}`}>
                  {verifiedReport.platformScore.toFixed(1)}%
                </div>
              </div>
              <div className="text-text-muted">=</div>
              <div className="text-center">
                <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Recalculated</div>
                <div className={`font-display text-2xl font-bold ${getTextColor(recalculatePlatformScore(verifiedReport))}`}>
                  {recalculatePlatformScore(verifiedReport).toFixed(1)}%
                </div>
              </div>
              <div className="ml-auto">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  Math.abs(recalculatePlatformScore(verifiedReport) - verifiedReport.platformScore) < 0.1
                    ? 'bg-score-enforced/10 text-score-enforced'
                    : 'bg-score-missing/10 text-score-missing'
                }`}>
                  {Math.abs(recalculatePlatformScore(verifiedReport) - verifiedReport.platformScore) < 0.1
                    ? 'MATCH' : 'MISMATCH'}
                </span>
              </div>
            </div>
          </div>

          {/* Individual checks */}
          <div className="rounded-2xl bg-surface-1 border border-surface-3/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-3/50">
              <h3 className="font-display text-lg font-bold text-text-primary">Verification Checks</h3>
            </div>
            <div>
              {results.map((check, i) => (
                <div key={i} className="flex items-start gap-3 px-6 py-4 border-b border-surface-3/20 last:border-0">
                  <div className="mt-0.5 shrink-0">
                    {check.passed ? (
                      <CheckCircle size={18} className="text-score-enforced" />
                    ) : (
                      <AlertTriangle size={18} className="text-score-partial" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-text-primary">{check.label}</div>
                    <pre className="text-xs text-text-muted mt-1 whitespace-pre-wrap font-mono">{check.detail}</pre>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 text-xs font-semibold rounded ${
                    check.passed
                      ? 'bg-score-enforced/10 text-score-enforced'
                      : 'bg-score-partial/10 text-score-partial'
                  }`}>
                    {check.passed ? 'PASS' : 'WARN'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Domain recalculation breakdown */}
          <div className="rounded-2xl bg-surface-1 border border-surface-3/50 overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-3/50">
              <h3 className="font-display text-lg font-bold text-text-primary">Score Recalculation Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-3/50">
                    <th className="text-left py-3 px-4 font-display text-text-primary">Domain</th>
                    <th className="text-right py-3 px-4 font-display text-text-primary">Reported</th>
                    <th className="text-right py-3 px-4 font-display text-text-primary">Recalculated</th>
                    <th className="text-right py-3 px-4 font-display text-text-primary">Weight</th>
                    <th className="text-right py-3 px-4 font-display text-text-primary">Contribution</th>
                    <th className="text-center py-3 px-4 font-display text-text-primary">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {verifiedReport.domainScores.map((ds) => {
                    const domain = DOMAINS.find((d) => d.number === ds.domainNumber);
                    const recalc = recalculateDomainScore(ds.controlScores);
                    const match = Math.abs(recalc - ds.domainScore) < 0.1;
                    return (
                      <tr key={ds.domainNumber} className="border-b border-surface-3/20 last:border-0">
                        <td className="py-3 px-4 text-text-secondary">
                          <span className="text-brand-gold font-semibold mr-2">{ds.domainNumber}.</span>
                          {domain?.name}
                        </td>
                        <td className={`py-3 px-4 text-right font-mono ${getTextColor(ds.domainScore)}`}>
                          {ds.domainScore.toFixed(1)}%
                        </td>
                        <td className={`py-3 px-4 text-right font-mono ${getTextColor(recalc)}`}>
                          {recalc.toFixed(1)}%
                        </td>
                        <td className="py-3 px-4 text-right text-text-muted font-mono">
                          {((domain?.weight ?? 0) * 100).toFixed(0)}%
                        </td>
                        <td className="py-3 px-4 text-right text-text-secondary font-mono">
                          {(recalc * (domain?.weight ?? 0)).toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                            match ? 'bg-score-enforced/10 text-score-enforced' : 'bg-score-missing/10 text-score-missing'
                          }`}>
                            {match ? 'OK' : 'DIFF'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t border-surface-3/50">
                    <td className="py-3 px-4 font-semibold text-text-primary">Weighted Total</td>
                    <td className={`py-3 px-4 text-right font-mono font-bold ${getTextColor(verifiedReport.platformScore)}`}>
                      {verifiedReport.platformScore.toFixed(1)}%
                    </td>
                    <td className={`py-3 px-4 text-right font-mono font-bold ${getTextColor(recalculatePlatformScore(verifiedReport))}`}>
                      {recalculatePlatformScore(verifiedReport).toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 text-right text-text-muted font-mono">100%</td>
                    <td className="py-3 px-4 text-right text-text-secondary font-mono font-bold">
                      {recalculatePlatformScore(verifiedReport).toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                        Math.abs(recalculatePlatformScore(verifiedReport) - verifiedReport.platformScore) < 0.1
                          ? 'bg-score-enforced/10 text-score-enforced'
                          : 'bg-score-missing/10 text-score-missing'
                      }`}>
                        {Math.abs(recalculatePlatformScore(verifiedReport) - verifiedReport.platformScore) < 0.1
                          ? 'MATCH' : 'MISMATCH'}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
