import type { RatingTier } from '@/data/otp-spec';

const RATING_STYLES: Record<RatingTier, { ring: string; text: string; glow: string }> = {
  STRONG: { ring: 'border-score-enforced', text: 'text-score-enforced', glow: 'shadow-[0_0_40px_rgba(34,197,94,0.2)]' },
  SOLID: { ring: 'border-score-implemented', text: 'text-score-implemented', glow: 'shadow-[0_0_40px_rgba(59,130,246,0.2)]' },
  DEVELOPING: { ring: 'border-score-partial', text: 'text-score-partial', glow: 'shadow-[0_0_40px_rgba(234,179,8,0.2)]' },
  EARLY: { ring: 'border-score-planned', text: 'text-score-planned', glow: 'shadow-[0_0_40px_rgba(249,115,22,0.2)]' },
  INSUFFICIENT: { ring: 'border-score-missing', text: 'text-score-missing', glow: 'shadow-[0_0_40px_rgba(239,68,68,0.2)]' },
};

interface PlatformScoreHeaderProps {
  score: number;
  rating: RatingTier;
  productName: string;
  companyName: string;
  reportDate: string;
  otpVersion: string;
  auditor: string;
  productUrl: string;
}

export default function PlatformScoreHeader({
  score,
  rating,
  productName,
  companyName,
  reportDate,
  otpVersion,
  auditor,
  productUrl,
}: PlatformScoreHeaderProps) {
  const style = RATING_STYLES[rating];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface-1 border border-surface-3/50 p-8 sm:p-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/3 via-transparent to-transparent" />

      <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Score ring */}
        <div className={`relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 ${style.ring} ${style.glow} shrink-0`}>
          <div className="text-center">
            <div className={`font-display text-4xl sm:text-5xl font-bold ${style.text}`}>
              {score.toFixed(1)}
            </div>
            <div className="text-xs text-text-muted uppercase tracking-wider mt-1">
              out of 100
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="text-center lg:text-left flex-1">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-semibold mb-4 ${
            rating === 'STRONG' ? 'bg-score-enforced/10 text-score-enforced border-score-enforced/30' :
            rating === 'SOLID' ? 'bg-score-implemented/10 text-score-implemented border-score-implemented/30' :
            rating === 'DEVELOPING' ? 'bg-score-partial/10 text-score-partial border-score-partial/30' :
            rating === 'EARLY' ? 'bg-score-planned/10 text-score-planned border-score-planned/30' :
            'bg-score-missing/10 text-score-missing border-score-missing/30'
          }`}>
            {rating}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mb-2">
            {productName}
          </h1>
          <p className="text-lg text-text-secondary mb-4">
            OTP Compliance Report
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-text-muted">
            <span>Company: <span className="text-text-secondary">{companyName}</span></span>
            <span>Date: <span className="text-text-secondary">{reportDate}</span></span>
            <span>OTP: <span className="text-text-secondary">{otpVersion}</span></span>
            <span>Auditor: <span className="text-text-secondary">{auditor}</span></span>
            <span>URL: <a href={productUrl} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">{productUrl.replace('https://', '')}</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}
