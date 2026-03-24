import type { Metadata } from 'next';
import ComingSoonBanner from '@/components/shared/ComingSoonBanner';

export const metadata: Metadata = {
  title: 'SOC 2 Comparison - Open Trust Protocol',
};

export default function Soc2ComparisonPage() {
  return (
    <ComingSoonBanner
      title="SOC 2 Equivalency Mapping"
      description="A side-by-side comparison showing how every OTP domain maps to SOC 2 Trust Service Criteria — and where OTP exceeds SOC 2."
      phase={3}
    />
  );
}
