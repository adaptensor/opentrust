import type { Metadata } from 'next';
import ComingSoonBanner from '@/components/shared/ComingSoonBanner';

export const metadata: Metadata = {
  title: 'Published Reports - Open Trust Protocol',
};

export default function ReportsPage() {
  return (
    <ComingSoonBanner
      title="Published Reports"
      description="A directory of companies that have published OTP Compliance Reports. The first report — AdaptBooks — is coming soon."
      phase={2}
    />
  );
}
