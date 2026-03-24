// OTP Compliance Report — Type Definitions
import type { ScoreLevel, RatingTier } from './otp-spec';

export interface ControlScore {
  controlId: string;
  score: ScoreLevel;
  evidence: string;
  delegatedTo?: string;
  gapDescription?: string;
  remediationPlan?: string;
  targetDate?: string;
}

export interface DomainScore {
  domainNumber: number;
  controlScores: ControlScore[];
  domainScore: number; // 0-100, arithmetic mean
}

export interface DelegationDeclaration {
  function: string;
  provider: string;
  certification: string;
  dataIsolation: string;
}

export interface ReportVersion {
  version: string;
  date: string;
  changes: string;
}

export interface ComplianceReport {
  slug: string;
  companyName: string;
  productName: string;
  productUrl: string;
  reportDate: string;
  otpVersion: string;
  auditor: string;
  auditorDescription: string;
  architectureSummary: string;
  techStack: string[];
  domainScores: DomainScore[];
  platformScore: number; // 0-100, weighted
  platformRating: RatingTier;
  delegations: DelegationDeclaration[];
  versionHistory: ReportVersion[];
}
