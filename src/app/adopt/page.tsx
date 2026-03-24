import type { Metadata } from 'next';
import ComingSoonBanner from '@/components/shared/ComingSoonBanner';

export const metadata: Metadata = {
  title: 'Adopt the OTP - Open Trust Protocol',
};

export default function AdoptPage() {
  return (
    <ComingSoonBanner
      title="How to Adopt the OTP"
      description="A step-by-step guide for any SaaS company to self-assess, publish, and maintain an OTP Compliance Report. Free, no permission needed."
      phase={3}
    />
  );
}
