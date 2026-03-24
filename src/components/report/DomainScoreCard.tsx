'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { DomainScore } from '@/data/report-types';
import { DOMAINS } from '@/data/otp-spec';
import ScoreBadge from './ScoreBadge';

interface DomainScoreCardProps {
  domainScore: DomainScore;
}

function getScoreColor(score: number): string {
  if (score >= 95) return 'text-score-enforced';
  if (score >= 85) return 'text-score-implemented';
  if (score >= 70) return 'text-score-partial';
  if (score >= 50) return 'text-score-planned';
  return 'text-score-missing';
}

function getBarColor(score: number): string {
  if (score >= 95) return 'bg-score-enforced';
  if (score >= 85) return 'bg-score-implemented';
  if (score >= 70) return 'bg-score-partial';
  if (score >= 50) return 'bg-score-planned';
  return 'bg-score-missing';
}

export default function DomainScoreCard({ domainScore }: DomainScoreCardProps) {
  const [expanded, setExpanded] = useState(false);
  const domain = DOMAINS.find((d) => d.number === domainScore.domainNumber);
  if (!domain) return null;

  const gapCount = domainScore.controlScores.filter((c) => c.gapDescription).length;

  return (
    <div id={`domain-${domain.number}`} className="scroll-mt-24 rounded-xl bg-surface-1 border border-surface-3/50 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface-2/30 transition-colors"
      >
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-2 font-display text-lg font-bold text-brand-gold shrink-0">
          {domain.number}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-bold text-text-primary">
            {domain.name}
          </h3>
          {/* Score bar */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 h-2 bg-surface-3/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${getBarColor(domainScore.domainScore)}`}
                style={{ width: `${domainScore.domainScore}%` }}
              />
            </div>
            <span className={`font-display text-sm font-bold shrink-0 ${getScoreColor(domainScore.domainScore)}`}>
              {domainScore.domainScore.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {gapCount > 0 && (
            <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-mono bg-score-partial/10 text-score-partial rounded-md">
              {gapCount} gap{gapCount !== 1 ? 's' : ''}
            </span>
          )}
          <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-mono bg-surface-2 text-brand-gold rounded-md">
            {(domain.weight * 100).toFixed(0)}% weight
          </span>
          {expanded ? (
            <ChevronDown size={20} className="text-text-muted" />
          ) : (
            <ChevronRight size={20} className="text-text-muted" />
          )}
        </div>
      </button>

      {/* Expanded: Control details */}
      {expanded && (
        <div className="border-t border-surface-3/50">
          {domainScore.controlScores.map((cs) => {
            const control = domain.controls.find((c) => c.id === cs.controlId);
            if (!control) return null;

            return (
              <div key={cs.controlId} className="border-b border-surface-3/20 last:border-0">
                {/* Control header */}
                <div className="flex items-start gap-3 px-5 py-4">
                  <span className="font-mono text-xs text-text-muted mt-1 shrink-0 w-8">
                    {cs.controlId}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-sm font-semibold text-text-primary">{control.name}</span>
                      <ScoreBadge score={cs.score} showPercentage />
                      {cs.delegatedTo && (
                        <span className="px-2 py-0.5 text-xs bg-brand-gold/10 text-brand-gold border border-brand-gold/20 rounded-md">
                          Delegated: {cs.delegatedTo}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{cs.evidence}</p>

                    {/* Gap disclosure */}
                    {cs.gapDescription && (
                      <div className="mt-3 p-3 rounded-lg bg-score-partial/5 border border-score-partial/20">
                        <div className="text-xs font-semibold text-score-partial uppercase tracking-wider mb-1">Gap Disclosure</div>
                        <p className="text-sm text-text-secondary mb-2">{cs.gapDescription}</p>
                        {cs.remediationPlan && (
                          <p className="text-sm text-text-muted">
                            <span className="font-semibold text-text-secondary">Remediation:</span> {cs.remediationPlan}
                          </p>
                        )}
                        {cs.targetDate && (
                          <p className="text-xs text-text-muted mt-1">
                            Target: <span className="text-text-secondary">{cs.targetDate}</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
