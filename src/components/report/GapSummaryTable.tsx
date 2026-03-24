import type { ComplianceReport } from '@/data/report-types';
import { DOMAINS } from '@/data/otp-spec';
import ScoreBadge from './ScoreBadge';

interface GapSummaryTableProps {
  report: ComplianceReport;
}

export default function GapSummaryTable({ report }: GapSummaryTableProps) {
  const gaps = report.domainScores.flatMap((ds) =>
    ds.controlScores
      .filter((cs) => cs.gapDescription)
      .map((cs) => {
        const domain = DOMAINS.find((d) => d.number === ds.domainNumber);
        const control = domain?.controls.find((c) => c.id === cs.controlId);
        return {
          controlId: cs.controlId,
          controlName: control?.name ?? cs.controlId,
          domainName: domain?.name ?? `Domain ${ds.domainNumber}`,
          score: cs.score,
          gap: cs.gapDescription!,
          remediation: cs.remediationPlan,
          target: cs.targetDate,
        };
      })
  );

  if (gaps.length === 0) {
    return (
      <div className="rounded-xl bg-surface-1 border border-score-enforced/30 p-6 text-center">
        <p className="text-score-enforced font-semibold">All controls at 100%. No gaps to disclose.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {gaps.map((gap) => (
        <div key={gap.controlId} className="rounded-xl bg-surface-1 border border-surface-3/50 p-4">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-mono text-xs text-text-muted">{gap.controlId}</span>
            <span className="text-sm font-semibold text-text-primary">{gap.controlName}</span>
            <ScoreBadge score={gap.score} showPercentage />
          </div>
          <p className="text-sm text-text-secondary mb-2">{gap.gap}</p>
          {gap.remediation && (
            <p className="text-sm text-text-muted">
              <span className="font-semibold text-text-secondary">Plan:</span> {gap.remediation}
            </p>
          )}
          {gap.target && (
            <p className="text-xs text-text-muted mt-1">
              Target: <span className="text-text-secondary">{gap.target}</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
