import type { ScoreLevel } from '@/data/otp-spec';

const SCORE_STYLES: Record<ScoreLevel, string> = {
  ENFORCED: 'bg-score-enforced/15 text-score-enforced border-score-enforced/30',
  IMPLEMENTED: 'bg-score-implemented/15 text-score-implemented border-score-implemented/30',
  PARTIAL: 'bg-score-partial/15 text-score-partial border-score-partial/30',
  PLANNED: 'bg-score-planned/15 text-score-planned border-score-planned/30',
  MISSING: 'bg-score-missing/15 text-score-missing border-score-missing/30',
};

const SCORE_PERCENTAGES: Record<ScoreLevel, number> = {
  ENFORCED: 100,
  IMPLEMENTED: 75,
  PARTIAL: 50,
  PLANNED: 25,
  MISSING: 0,
};

interface ScoreBadgeProps {
  score: ScoreLevel;
  showPercentage?: boolean;
}

export default function ScoreBadge({ score, showPercentage = false }: ScoreBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border ${SCORE_STYLES[score]}`}>
      {score}
      {showPercentage && (
        <span className="opacity-70">({SCORE_PERCENTAGES[score]}%)</span>
      )}
    </span>
  );
}
