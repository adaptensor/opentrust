import type { Metadata } from 'next';
import ComingSoonBanner from '@/components/shared/ComingSoonBanner';

export const metadata: Metadata = {
  title: 'Verify a Report - Open Trust Protocol',
};

export default function VerifyPage() {
  return (
    <ComingSoonBanner
      title="Verification Tool"
      description="Compare a Claude Artifact with a signed report to verify they match. Tamper-evident dual-source verification."
      phase={3}
    />
  );
}
