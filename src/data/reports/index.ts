// OTP Report Registry
import type { ComplianceReport } from '../report-types';
import { adaptbooksReport } from './adaptbooks';

export const REPORTS: ComplianceReport[] = [
  adaptbooksReport,
];

export function getReportBySlug(slug: string): ComplianceReport | undefined {
  return REPORTS.find((r) => r.slug === slug);
}
