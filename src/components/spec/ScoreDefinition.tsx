import { SCORE_DEFINITIONS } from '@/data/otp-spec';

const SCORE_COLORS: Record<string, string> = {
  ENFORCED: 'bg-score-enforced',
  IMPLEMENTED: 'bg-score-implemented',
  PARTIAL: 'bg-score-partial',
  PLANNED: 'bg-score-planned',
  MISSING: 'bg-score-missing',
};

const SCORE_BORDERS: Record<string, string> = {
  ENFORCED: 'border-score-enforced/30',
  IMPLEMENTED: 'border-score-implemented/30',
  PARTIAL: 'border-score-partial/30',
  PLANNED: 'border-score-planned/30',
  MISSING: 'border-score-missing/30',
};

export default function ScoreDefinitions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {SCORE_DEFINITIONS.map((score) => (
        <div
          key={score.level}
          className={`p-4 rounded-xl bg-surface-1 border ${SCORE_BORDERS[score.level]}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-3 h-3 rounded-full ${SCORE_COLORS[score.level]}`} />
            <span className="font-display text-sm font-bold text-text-primary">
              {score.percentage}%
            </span>
          </div>
          <h4 className="font-display text-sm font-bold text-text-primary mb-1">
            {score.label}
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            {score.definition}
          </p>
        </div>
      ))}
    </div>
  );
}
