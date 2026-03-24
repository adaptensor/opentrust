// SOC 2 Equivalency Mapping — Section 6 of OTP v1.0

export interface Soc2Mapping {
  domain: string;
  domainNumber: number;
  soc2Criteria: string;
  comparison: string;
}

export const SOC2_MAPPINGS: Soc2Mapping[] = [
  { domain: 'Authentication', domainNumber: 1, soc2Criteria: 'CC6.1, CC6.2, CC6.3', comparison: 'Full coverage. OTP adds delegation scoring that SOC 2 carves out.' },
  { domain: 'Data Protection', domainNumber: 2, soc2Criteria: 'CC6.1, CC6.7, CC8.1', comparison: 'Full coverage. OTP requires specific encryption standards.' },
  { domain: 'Input Validation', domainNumber: 3, soc2Criteria: 'CC7.1, CC7.2, CC8.1', comparison: 'OTP exceeds SOC 2 by requiring specific technical controls (ORM, Zod, CSP).' },
  { domain: 'Access Control', domainNumber: 4, soc2Criteria: 'CC6.1, CC6.2, CC6.3', comparison: 'Full coverage. OTP requires database-level enforcement, not just app-level.' },
  { domain: 'Financial Integrity', domainNumber: 5, soc2Criteria: 'CC8.1, PI1.1', comparison: 'OTP exceeds SOC 2 significantly. SOC 2 does not audit accounting logic.' },
  { domain: 'Infrastructure', domainNumber: 6, soc2Criteria: 'CC6.6, CC7.1, CC8.1', comparison: 'Full coverage. OTP adds build pipeline security requirements.' },
  { domain: 'Monitoring', domainNumber: 7, soc2Criteria: 'CC7.1, CC7.2, CC7.3', comparison: 'Full coverage. Equivalent scope.' },
  { domain: 'Availability', domainNumber: 8, soc2Criteria: 'A1.1, A1.2, A1.3', comparison: 'Full coverage. OTP adds offline capability as an availability control.' },
];

export const SOC2_SUMMARY = 'The OTP covers 100% of SOC 2 Trust Service Criteria and exceeds SOC 2 scope in three areas: financial integrity (accounting-specific controls), input validation (technical specificity), and availability (offline capability). The OTP\'s Delegation Principle also provides fairer treatment of modern SaaS architectures that SOC 2\'s carve-out model penalizes.';
