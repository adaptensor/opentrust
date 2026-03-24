// Open Trust Protocol v1.0 — Complete Specification Data
// Source: docs/docs/OTPv1.md (verbatim transcription)

export type ScoreLevel = 'ENFORCED' | 'IMPLEMENTED' | 'PARTIAL' | 'PLANNED' | 'MISSING';
export type RatingTier = 'STRONG' | 'SOLID' | 'DEVELOPING' | 'EARLY' | 'INSUFFICIENT';

export interface ScoreDefinition {
  level: ScoreLevel;
  percentage: number;
  label: string;
  definition: string;
  color: string;
}

export interface Control {
  id: string;
  name: string;
  requiredEvidence: string;
  notes: string;
}

export interface Domain {
  number: number;
  name: string;
  description: string;
  weight: number;
  controlCount: number;
  soc2Mapping: string;
  soc2Description: string;
  controls: Control[];
}

export interface RatingRange {
  tier: RatingTier;
  min: number;
  max: number;
  meaning: string;
  color: string;
}

export interface DelegationExample {
  function: string;
  providers: string;
  eliminates: string;
}

export const OTP_VERSION = 'v1.0';
export const OTP_PUBLISHED = 'February 28, 2026';
export const OTP_TAGLINE = "Trust isn't a badge you buy. It's a standard you publish.";

export const SCORE_DEFINITIONS: ScoreDefinition[] = [
  {
    level: 'ENFORCED',
    percentage: 100,
    label: 'Enforced',
    definition: 'Control is implemented, automated, and verified in production. Evidence is machine-generated or independently verifiable. No manual intervention required for the control to function.',
    color: 'var(--color-score-enforced)',
  },
  {
    level: 'IMPLEMENTED',
    percentage: 75,
    label: 'Implemented',
    definition: 'Control is implemented and operational but depends on manual processes, has not been independently verified, or covers the primary use case but not all edge cases.',
    color: 'var(--color-score-implemented)',
  },
  {
    level: 'PARTIAL',
    percentage: 50,
    label: 'Partial',
    definition: 'Control is partially implemented. Some attack vectors or failure modes are covered; others are not. The gap is documented.',
    color: 'var(--color-score-partial)',
  },
  {
    level: 'PLANNED',
    percentage: 25,
    label: 'Planned',
    definition: 'Control is designed and scheduled for implementation with a specific target date, but is not yet active in production.',
    color: 'var(--color-score-planned)',
  },
  {
    level: 'MISSING',
    percentage: 0,
    label: 'Missing',
    definition: 'Control does not exist and has no implementation plan. This must be disclosed explicitly. A missing control is not a failure — hiding a missing control is.',
    color: 'var(--color-score-missing)',
  },
];

export const DOMAINS: Domain[] = [
  {
    number: 1,
    name: 'Authentication & Identity',
    description: 'Governs how users prove their identity and how the platform manages credentials, sessions, and access provisioning.',
    weight: 0.15,
    controlCount: 7,
    soc2Mapping: 'CC6.1, CC6.2, CC6.3',
    soc2Description: 'Logical Access Security, User Authentication, Access Provisioning and Deprovisioning',
    controls: [
      { id: '1.1', name: 'Password storage security', requiredEvidence: 'Hash algorithm documentation OR delegation certificate', notes: 'If delegated: provider must be certified. Platform must store zero passwords.' },
      { id: '1.2', name: 'Multi-factor authentication', requiredEvidence: 'MFA configuration screenshot or delegation proof', notes: 'Must support at least one MFA method. TOTP preferred over SMS.' },
      { id: '1.3', name: 'Session management', requiredEvidence: 'Token rotation policy, session timeout config', notes: 'Sessions must expire. Tokens must rotate.' },
      { id: '1.4', name: 'Brute force protection', requiredEvidence: 'Rate limiting config or provider documentation', notes: 'Must limit failed attempts. Lockout or exponential backoff required.' },
      { id: '1.5', name: 'Role-based access control', requiredEvidence: 'Role definitions, permission matrix documentation', notes: 'Minimum 2 roles. Principle of least privilege.' },
      { id: '1.6', name: 'Account deprovisioning', requiredEvidence: 'Process for revoking access when employees leave', notes: 'Must be able to revoke access immediately.' },
      { id: '1.7', name: 'OAuth / SSO support', requiredEvidence: 'OAuth provider list, configuration', notes: 'Optional but recommended. Reduces password fatigue.' },
    ],
  },
  {
    number: 2,
    name: 'Data Protection & Encryption',
    description: 'Governs how data is protected at rest, in transit, and through its lifecycle.',
    weight: 0.15,
    controlCount: 6,
    soc2Mapping: 'CC6.1, CC6.7, CC8.1',
    soc2Description: 'Logical Access, Data Classification, Change Management',
    controls: [
      { id: '2.1', name: 'Encryption in transit (TLS)', requiredEvidence: 'SSL rating (A or A+), HSTS configuration', notes: 'All traffic must be encrypted. No mixed content.' },
      { id: '2.2', name: 'Encryption at rest', requiredEvidence: 'Provider encryption documentation or self-managed key docs', notes: 'AES-256 or equivalent. Key rotation policy.' },
      { id: '2.3', name: 'Multi-tenant data isolation', requiredEvidence: 'RLS policies, schema isolation, or equivalent proof', notes: 'One tenant must never access another tenant\'s data.' },
      { id: '2.4', name: 'Sensitive data handling', requiredEvidence: 'Data classification policy, PII inventory', notes: 'Platform must know what sensitive data it holds and where.' },
      { id: '2.5', name: 'Backup encryption', requiredEvidence: 'Backup policy, encryption verification', notes: 'Backups must be encrypted at rest.' },
      { id: '2.6', name: 'Security headers', requiredEvidence: 'Header audit (CSP, X-Frame, HSTS, etc.)', notes: 'Modern security headers must be configured.' },
    ],
  },
  {
    number: 3,
    name: 'Input Validation & Injection Prevention',
    description: 'Governs how the platform defends against malicious input — the most common attack vector for web applications.',
    weight: 0.15,
    controlCount: 6,
    soc2Mapping: 'CC7.1, CC7.2, CC8.1',
    soc2Description: 'System Monitoring, Anomaly Detection, Change Management',
    controls: [
      { id: '3.1', name: 'SQL injection prevention', requiredEvidence: 'ORM usage, parameterized query proof, no raw SQL', notes: 'Parameterized queries or ORM required. No string concatenation in queries.' },
      { id: '3.2', name: 'Request body validation', requiredEvidence: 'Schema validation framework (Zod, Joi, etc.) with endpoint coverage', notes: 'All API endpoints must validate input against a defined schema.' },
      { id: '3.3', name: 'URL parameter validation', requiredEvidence: 'Type checking on all req.params and req.query', notes: 'Must validate types and reject array injection.' },
      { id: '3.4', name: 'File upload sanitization', requiredEvidence: 'Filename sanitization, type validation, size limits', notes: 'Must prevent path traversal and executable upload.' },
      { id: '3.5', name: 'XSS prevention', requiredEvidence: 'Output encoding, CSP headers, no unsafe innerHTML', notes: 'Framework auto-escaping preferred. CSP must block inline scripts.' },
      { id: '3.6', name: 'CSRF protection', requiredEvidence: 'Token-based auth, SameSite cookies, or CSRF tokens', notes: 'Must prevent cross-site request forgery.' },
    ],
  },
  {
    number: 4,
    name: 'Access Control & Authorization',
    description: 'Governs how the platform enforces data boundaries and ensures users can only access what they are authorized to access.',
    weight: 0.15,
    controlCount: 5,
    soc2Mapping: 'CC6.1, CC6.2, CC6.3',
    soc2Description: 'Logical Access Security',
    controls: [
      { id: '4.1', name: 'Tenant data isolation', requiredEvidence: 'Database-level enforcement (RLS, schemas, separate DBs)', notes: 'Must be enforced below the application layer.' },
      { id: '4.2', name: 'Role-based permissions', requiredEvidence: 'Permission matrix, middleware enforcement code', notes: 'Different roles must have different capabilities.' },
      { id: '4.3', name: 'API authentication enforcement', requiredEvidence: 'Middleware that rejects unauthenticated requests', notes: 'No unauthenticated endpoints except health checks.' },
      { id: '4.4', name: 'Sensitive action authorization', requiredEvidence: 'Elevated auth for destructive/financial operations', notes: 'Deletions, payments, and permission changes must require elevated authorization.' },
      { id: '4.5', name: 'Audit trail for access changes', requiredEvidence: 'Logs showing who changed what permission when', notes: 'All permission changes must be logged.' },
    ],
  },
  {
    number: 5,
    name: 'Financial Integrity',
    description: 'Governs the accuracy, immutability, and auditability of financial data. This domain extends beyond SOC 2 Trust Service Criteria to cover accounting-specific controls critical for platforms that handle financial transactions.',
    weight: 0.15,
    controlCount: 6,
    soc2Mapping: 'CC8.1, PI1.1',
    soc2Description: 'Change Management, Processing Integrity',
    controls: [
      { id: '5.1', name: 'Double-entry enforcement', requiredEvidence: 'Database constraint preventing unbalanced entries', notes: 'Debits must equal credits. Enforced at DB level, not app level.' },
      { id: '5.2', name: 'Immutable transaction log', requiredEvidence: 'Proof that entries cannot be deleted or silently modified', notes: 'Corrections must create reversing entries. Original preserved.' },
      { id: '5.3', name: 'Void/refund audit trail', requiredEvidence: 'Log entries for every void and refund with approver', notes: 'Who voided, when, why, and who approved.' },
      { id: '5.4', name: 'Register reconciliation', requiredEvidence: 'End-of-day reporting comparing expected vs actual', notes: 'Cash discrepancies must be logged and visible to owner.' },
      { id: '5.5', name: 'Tax calculation accuracy', requiredEvidence: 'Tax rate configuration, automatic application, liability tracking', notes: 'Tax must be calculated automatically with per-jurisdiction rates.' },
      { id: '5.6', name: 'Payment card data isolation', requiredEvidence: 'Proof that no card data enters platform systems', notes: 'Must delegate to PCI DSS Level 1 certified processor.' },
    ],
  },
  {
    number: 6,
    name: 'Infrastructure & Deployment',
    description: 'Governs the security of the build pipeline, hosting environment, and deployment process.',
    weight: 0.10,
    controlCount: 6,
    soc2Mapping: 'CC6.6, CC7.1, CC8.1',
    soc2Description: 'System Boundaries, System Monitoring, Change Management',
    controls: [
      { id: '6.1', name: 'Hosting provider security', requiredEvidence: 'Provider certification (SOC 2, ISO 27001)', notes: 'Hosting provider must hold relevant certification.' },
      { id: '6.2', name: 'Strict compilation / linting', requiredEvidence: 'Build config showing zero-tolerance for errors/warnings', notes: 'No build escape hatches (e.g., tsc || true).' },
      { id: '6.3', name: 'Dependency management', requiredEvidence: 'Lockfile, audit schedule, vulnerability scanning', notes: 'Dependencies pinned. Regular audit cadence.' },
      { id: '6.4', name: 'Secret management', requiredEvidence: 'No secrets in codebase, .env gitignored, secure vault', notes: 'All secrets in environment variables or secret manager.' },
      { id: '6.5', name: 'CORS configuration', requiredEvidence: 'CORS policy restricting to production domains', notes: 'No wildcard origins in production.' },
      { id: '6.6', name: 'Deployment pipeline security', requiredEvidence: 'CI/CD config, branch protection, review requirements', notes: 'Production deployments must have review or approval gates.' },
    ],
  },
  {
    number: 7,
    name: 'Monitoring & Incident Response',
    description: "Governs the platform's ability to detect, respond to, and recover from security events.",
    weight: 0.10,
    controlCount: 5,
    soc2Mapping: 'CC7.1, CC7.2, CC7.3',
    soc2Description: 'System Monitoring, Anomaly Detection, Security Incident Response',
    controls: [
      { id: '7.1', name: 'Audit logging', requiredEvidence: 'Log entries for security-relevant actions', notes: 'Login, permission changes, financial modifications, admin actions.' },
      { id: '7.2', name: 'API rate limiting', requiredEvidence: 'Rate limit configuration on public endpoints', notes: 'Must prevent abuse beyond auth-level protection.' },
      { id: '7.3', name: 'Error monitoring', requiredEvidence: 'Structured error tracking service (Sentry, etc.)', notes: 'Errors must be captured, categorized, and alerted.' },
      { id: '7.4', name: 'Uptime monitoring', requiredEvidence: 'External monitoring service with alerting', notes: 'Must detect downtime independently of hosting provider.' },
      { id: '7.5', name: 'Incident response plan', requiredEvidence: 'Documented escalation, classification, and notification procedures', notes: 'Must define severity levels, response times, and customer communication.' },
    ],
  },
  {
    number: 8,
    name: 'Availability & Business Continuity',
    description: "Governs the platform's resilience to outages, data loss, and disaster scenarios.",
    weight: 0.05,
    controlCount: 5,
    soc2Mapping: 'A1.1, A1.2, A1.3',
    soc2Description: 'Availability',
    controls: [
      { id: '8.1', name: 'Offline / degraded operation', requiredEvidence: 'Documentation of offline capability or graceful degradation', notes: 'Platform should function in some capacity during outages.' },
      { id: '8.2', name: 'Database backups', requiredEvidence: 'Backup frequency, retention period, PITR capability', notes: 'Continuous or daily backups. Point-in-time recovery preferred.' },
      { id: '8.3', name: 'Auto-scaling', requiredEvidence: 'Scaling configuration or load testing results', notes: 'Platform should handle traffic spikes without manual intervention.' },
      { id: '8.4', name: 'Disaster recovery plan', requiredEvidence: 'Documented RTO/RPO targets, failover procedures, DR test results', notes: 'Must define how quickly service restores after disaster.' },
      { id: '8.5', name: 'Geographic redundancy', requiredEvidence: 'Multi-region deployment or replication documentation', notes: 'Recommended for enterprise. Single-region acceptable for SMB with disclosure.' },
    ],
  },
];

export const RATING_RANGES: RatingRange[] = [
  { tier: 'STRONG', min: 95, max: 100, meaning: 'All critical controls enforced. Remaining items are non-critical improvements.', color: 'var(--color-score-enforced)' },
  { tier: 'SOLID', min: 85, max: 94, meaning: 'Core controls in place. Some controls are implemented but not fully enforced or automated.', color: 'var(--color-score-implemented)' },
  { tier: 'DEVELOPING', min: 70, max: 84, meaning: 'Significant controls exist but material gaps remain. Active remediation required.', color: 'var(--color-score-partial)' },
  { tier: 'EARLY', min: 50, max: 69, meaning: 'Foundational security in place but many controls missing or incomplete.', color: 'var(--color-score-planned)' },
  { tier: 'INSUFFICIENT', min: 0, max: 49, meaning: 'Critical security gaps. Platform should not process sensitive data until remediated.', color: 'var(--color-score-missing)' },
];

export const DELEGATION_EXAMPLES: DelegationExample[] = [
  { function: 'Authentication', providers: 'Clerk, Auth0, Okta', eliminates: 'Password storage, session management, brute force protection, credential stuffing defense, MFA infrastructure' },
  { function: 'Payment Processing', providers: 'Stripe, Square, Adyen', eliminates: 'Card number storage, PCI DSS scope, chargeback handling, fraud detection' },
  { function: 'Database Hosting', providers: 'Neon, Supabase, PlanetScale', eliminates: 'Encryption at rest implementation, backup management, physical security, patching' },
  { function: 'Hosting / CDN', providers: 'Vercel, Cloudflare, AWS', eliminates: 'DDoS mitigation, TLS termination, physical infrastructure security' },
  { function: 'Email / SMS', providers: 'SendGrid, Twilio', eliminates: 'Email deliverability infrastructure, carrier compliance, anti-spam' },
];

export const DELEGATION_CRITERIA = [
  'The provider is certified. The delegated provider must hold its own security certification (SOC 2, ISO 27001, PCI DSS, or equivalent) relevant to the function it performs.',
  'The attack surface is eliminated. The delegating platform must not store, process, or cache the sensitive data that the provider handles. Delegation means the data never enters your system.',
  'The integration is secured. The connection between the platform and the provider must use secure authentication (API keys, JWT tokens, mTLS) with minimal permissions (principle of least privilege).',
];

export const TOTAL_CONTROLS = 46; // Sum of all domain controls
export const TOTAL_DOMAINS = 8;
