import type { ComplianceReport } from '@/data/report-types';
import { DOMAINS } from '@/data/otp-spec';

interface ScoreOverviewProps {
  report: ComplianceReport;
}

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

export default function ScoreOverview({ report }: ScoreOverviewProps) {
  const totalGaps = report.domainScores.reduce(
    (acc, ds) => acc + ds.controlScores.filter((c) => c.gapDescription).length,
    0
  );
  const totalDelegated = report.domainScores.reduce(
    (acc, ds) => acc + ds.controlScores.filter((c) => c.delegatedTo).length,
    0
  );
  const totalEnforced = report.domainScores.reduce(
    (acc, ds) => acc + ds.controlScores.filter((c) => c.score === 'ENFORCED').length,
    0
  );
  const totalControls = report.domainScores.reduce(
    (acc, ds) => acc + ds.controlScores.length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Controls Evaluated', value: totalControls, color: 'text-text-primary' },
          { label: 'Enforced (100%)', value: totalEnforced, color: 'text-score-enforced' },
          { label: 'Delegated', value: totalDelegated, color: 'text-brand-gold' },
          { label: 'Gaps Disclosed', value: totalGaps, color: 'text-score-partial' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-surface-1 border border-surface-3/50 p-4 text-center">
            <div className={`font-display text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-text-muted mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Domain score bars */}
      <div className="rounded-xl bg-surface-1 border border-surface-3/50 overflow-hidden">
        <div className="px-5 py-3 border-b border-surface-3/50">
          <h3 className="font-display text-sm font-bold text-text-primary">Domain Scores at a Glance</h3>
        </div>
        <div className="p-5 space-y-3">
          {report.domainScores.map((ds) => {
            const domain = DOMAINS.find((d) => d.number === ds.domainNumber);
            return (
              <a key={ds.domainNumber} href={`#domain-${ds.domainNumber}`} className="flex items-center gap-3 group">
                <span className="w-6 text-xs font-mono text-text-muted text-right shrink-0">
                  {ds.domainNumber}
                </span>
                <span className="w-48 text-sm text-text-secondary truncate shrink-0 group-hover:text-text-primary transition-colors">
                  {domain?.name}
                </span>
                <div className="flex-1 h-3 bg-surface-3/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${getBarColor(ds.domainScore)}`}
                    style={{ width: `${ds.domainScore}%` }}
                  />
                </div>
                <span className={`w-14 text-right text-sm font-display font-bold shrink-0 ${getTextColor(ds.domainScore)}`}>
                  {ds.domainScore.toFixed(1)}%
                </span>
              </a>
            );
          })}
        </div>
        {/* Weighted total */}
        <div className="px-5 py-3 border-t border-surface-3/50 flex items-center gap-3">
          <span className="w-6 shrink-0" />
          <span className="w-48 text-sm font-semibold text-text-primary shrink-0">
            Weighted Platform Score
          </span>
          <div className="flex-1" />
          <span className={`w-14 text-right text-sm font-display font-bold shrink-0 ${getTextColor(report.platformScore)}`}>
            {report.platformScore.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
