// OTP Compliance Report — AdaptBooks
// Audit Date: March 23, 2026
// Auditor: Claude Code (Automated Source Code Audit)
// OTP Version: v1.0

import type { ComplianceReport } from '../report-types';

export const adaptbooksReport: ComplianceReport = {
  slug: 'adaptbooks',
  companyName: 'Adaptensor Inc.',
  productName: 'AdaptBooks',
  productUrl: 'https://books.adaptensor.com',
  reportDate: 'March 23, 2026',
  otpVersion: 'v1.0',
  auditor: 'Claude Code',
  auditorDescription: 'Automated source code audit performed by Claude Code against the AdaptBooks production codebase (146 API route files, 85 database tables, 4 packages). This is a first-party audit — AdaptBooks is built by Adaptensor Inc., the creator of the OTP standard.',
  architectureSummary: 'AdaptBooks is a multi-tenant POS and accounting SaaS platform. The frontend is a Next.js 15 application deployed on Vercel. The API is an Express 5 server deployed on Railway. The database is Neon PostgreSQL with 85 tables managed by Prisma ORM. Authentication is delegated to Clerk (SOC 2 Type II). Payment processing is delegated to Stripe (PCI DSS Level 1). Email delivery is delegated to SendGrid. The codebase is a pnpm monorepo with 4 packages: web, api, db, and shared.',
  techStack: [
    'Next.js 15 (React 19) — Frontend',
    'Express 5 — API Server',
    'Prisma 6 ORM — Database Access',
    'Neon PostgreSQL — Database (SOC 2)',
    'Clerk — Authentication (SOC 2 Type II)',
    'Stripe — Payments (PCI DSS Level 1)',
    'Vercel — Frontend Hosting (SOC 2)',
    'Railway — API Hosting (SOC 2)',
    'SendGrid — Email (SOC 2)',
    'Helmet.js — Security Headers',
    'Zod — Input Validation',
    'pnpm — Package Management',
  ],

  // ──────────────────────────────────────────────
  // DOMAIN 1: Authentication & Identity (15%)
  // Domain Score: 96.4%
  // ──────────────────────────────────────────────
  domainScores: [
    {
      domainNumber: 1,
      domainScore: 96.43,
      controlScores: [
        {
          controlId: '1.1',
          score: 'ENFORCED',
          evidence: 'Authentication fully delegated to Clerk (SOC 2 Type II). Zero passwords stored in AdaptBooks database. Clerk uses bcrypt with adaptive cost factor. No password-related columns exist in the Prisma schema.',
          delegatedTo: 'Clerk',
        },
        {
          controlId: '1.2',
          score: 'ENFORCED',
          evidence: 'MFA available through Clerk with TOTP and SMS options. User-configurable per account. Enforced via Clerk dashboard policies. Platform stores zero MFA secrets.',
          delegatedTo: 'Clerk',
        },
        {
          controlId: '1.3',
          score: 'ENFORCED',
          evidence: 'Session management handled by Clerk JWT with automatic token rotation. Sessions expire on configurable timeout. Clerk invalidates all sessions on password change. Portal JWT tokens have 24-hour expiry with PORTAL_JWT_SECRET required at runtime (throws if missing).',
          delegatedTo: 'Clerk',
        },
        {
          controlId: '1.4',
          score: 'ENFORCED',
          evidence: 'Clerk provides built-in brute force protection with account lockout. Additionally, AdaptBooks implements 4-tier rate limiting via express-rate-limit: general (100 req/min), POS (200 req/min), uploads (5 req/min), and strict (10 req/min for registration and sensitive endpoints). IPv6 /64 subnet handling prevents bypass.',
          delegatedTo: 'Clerk',
        },
        {
          controlId: '1.5',
          score: 'ENFORCED',
          evidence: '11 distinct roles defined in ROLE_PERMISSIONS matrix: owner (wildcard), manager, cashier, inventory_clerk, technician, dispatcher, mechanic, inspector, server, stylist, accountant. Enforced via requireRole() middleware on every protected route. Owner role has wildcard (*) access. All other roles follow principle of least privilege with specific permission sets.',
        },
        {
          controlId: '1.6',
          score: 'IMPLEMENTED',
          evidence: 'Access can be revoked immediately via Clerk user management (delete user or revoke sessions). User deletion cascades through the tenant. However, there is no automated offboarding workflow — deprovisioning is a manual process initiated by tenant owner/manager.',
          gapDescription: 'No automated offboarding workflow. Deprovisioning requires manual action by tenant admin.',
          remediationPlan: 'Implement automated access revocation triggers when user role is changed to inactive or user is removed from Clerk organization.',
          targetDate: 'Q3 2026',
        },
        {
          controlId: '1.7',
          score: 'ENFORCED',
          evidence: 'Google OAuth configured through Clerk. Additional OAuth providers (Microsoft, Apple) available via Clerk configuration. SSO flows handled entirely by Clerk — no OAuth tokens stored in AdaptBooks.',
          delegatedTo: 'Clerk',
        },
      ],
    },

    // ──────────────────────────────────────────────
    // DOMAIN 2: Data Protection & Encryption (15%)
    // Domain Score: 91.7%
    // ──────────────────────────────────────────────
    {
      domainNumber: 2,
      domainScore: 91.67,
      controlScores: [
        {
          controlId: '2.1',
          score: 'ENFORCED',
          evidence: 'TLS 1.2+ enforced by all infrastructure providers (Vercel, Railway, Neon). HSTS configured via Helmet.js with maxAge 63,072,000 seconds (2 years), includeSubDomains: true, preload: true. No mixed content. All API-to-service calls (Stripe, Clerk, SendGrid) use HTTPS exclusively.',
        },
        {
          controlId: '2.2',
          score: 'ENFORCED',
          evidence: 'Neon PostgreSQL provides AES-256 encryption at rest as standard. All backups encrypted. Vercel and Railway use encrypted storage. No sensitive data stored outside managed providers.',
          delegatedTo: 'Neon',
        },
        {
          controlId: '2.3',
          score: 'IMPLEMENTED',
          evidence: 'Multi-tenant isolation enforced at the application layer. Tenant ID derived exclusively from Clerk userId (never from user input). injectTenant middleware queries User by clerkId and sets req.tenantId. All 146 route files scope queries by tenantId via Prisma. Prior security assessment (S22) found and fixed 7 missing tenant checks in DELETE operations, kitchen item mutations, and labor queries. However, no database-level RLS policies exist — isolation is application-layer only.',
          gapDescription: 'Tenant isolation relies entirely on application-layer enforcement via Prisma queries. No PostgreSQL Row Level Security (RLS) policies provide defense-in-depth at the database layer.',
          remediationPlan: 'Implement PostgreSQL RLS policies on all tenant-scoped tables as defense-in-depth. Application-layer isolation remains primary — RLS acts as a safety net.',
          targetDate: 'Q3 2026',
        },
        {
          controlId: '2.4',
          score: 'IMPLEMENTED',
          evidence: 'No credit card data stored (Stripe delegation). No passwords stored (Clerk delegation). No SSN stored (only EIN for 1099). Customer PII (names, emails, phones, addresses) stored encrypted at rest via Neon. Prior S22 assessment removed 23 instances of PII logging (SMS codes, phone numbers, Stripe method IDs). However, gift card PINs are stored in plaintext.',
          gapDescription: 'Gift card PINs stored in plaintext in the GiftCard table. No formal data classification policy document.',
          remediationPlan: 'Hash gift card PINs with bcrypt. Create formal data classification matrix documenting all PII fields and their protection levels.',
          targetDate: 'Q2 2026',
        },
        {
          controlId: '2.5',
          score: 'ENFORCED',
          evidence: 'Neon provides encrypted backups as standard. Continuous backups with point-in-time recovery (PITR). Backup encryption uses the same AES-256 keys as data at rest.',
          delegatedTo: 'Neon',
        },
        {
          controlId: '2.6',
          score: 'ENFORCED',
          evidence: 'Helmet.js configured with: HSTS (2 years, includeSubDomains, preload), X-Frame-Options: DENY (clickjacking prevention), X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin. Content-Security-Policy delegated to Next.js frontend (appropriate for API-only server).',
        },
      ],
    },

    // ──────────────────────────────────────────────
    // DOMAIN 3: Input Validation & Injection (15%)
    // Domain Score: 87.5%
    // ──────────────────────────────────────────────
    {
      domainNumber: 3,
      domainScore: 87.5,
      controlScores: [
        {
          controlId: '3.1',
          score: 'ENFORCED',
          evidence: 'All database access through Prisma ORM with parameterized queries. Zero instances of $queryRawUnsafe() or $executeRawUnsafe() in the codebase. The only raw SQL uses tagged template literals ($queryRaw) which are parameterized by default. No string concatenation in queries anywhere in the 146 route files.',
        },
        {
          controlId: '3.2',
          score: 'IMPLEMENTED',
          evidence: 'Zod validation middleware (validate() and validateQuery()) used on critical routes: POS, accounting, settings, sales, inventory. Middleware replaces req.body with parsed data (prevents mass assignment). However, some routes still use manual validation without Zod schemas.',
          gapDescription: 'Zod schema validation covers critical routes but not all 146 route files. Some routes rely on manual validation.',
          remediationPlan: 'Expand Zod schema coverage to all remaining routes. Priority: any route accepting user input for database mutations.',
          targetDate: 'Q3 2026',
        },
        {
          controlId: '3.3',
          score: 'IMPLEMENTED',
          evidence: 'URL parameters are type-checked through Prisma (invalid types cause query errors, not injection). Zod validateQuery() middleware used on routes with complex query parameters. However, not all req.params and req.query values are explicitly validated before use.',
          gapDescription: 'Not all URL parameters and query strings are validated via Zod schemas before reaching route handlers.',
          remediationPlan: 'Add validateQuery() middleware to all routes that consume req.params or req.query. Prisma type safety provides baseline protection.',
          targetDate: 'Q3 2026',
        },
        {
          controlId: '3.4',
          score: 'IMPLEMENTED',
          evidence: 'Upload rate limiter enforced (5 req/min). File size limits configured. File type validation present. However, no formal path traversal test suite or filename sanitization documentation.',
          gapDescription: 'File upload handling present but lacks documented filename sanitization and path traversal prevention verification.',
          remediationPlan: 'Add explicit filename sanitization utility and document file upload security controls. Add automated tests for path traversal attempts.',
          targetDate: 'Q3 2026',
        },
        {
          controlId: '3.5',
          score: 'ENFORCED',
          evidence: 'React 19 auto-escapes all rendered content by default. No instances of dangerouslySetInnerHTML found in the codebase. Helmet.js X-Content-Type-Options: nosniff prevents MIME-type sniffing. Framework-level protection eliminates XSS vectors.',
        },
        {
          controlId: '3.6',
          score: 'ENFORCED',
          evidence: 'Authentication uses Bearer JWT tokens (not cookies), which are inherently CSRF-proof. API requests require Authorization header — cross-site forms cannot attach Bearer tokens. Stripe webhook verification uses HMAC signatures. No cookie-based auth that could be exploited.',
        },
      ],
    },

    // ──────────────────────────────────────────────
    // DOMAIN 4: Access Control & Authorization (15%)
    // Domain Score: 90.0%
    // ──────────────────────────────────────────────
    {
      domainNumber: 4,
      domainScore: 90.0,
      controlScores: [
        {
          controlId: '4.1',
          score: 'IMPLEMENTED',
          evidence: 'Tenant isolation enforced at application layer via injectTenant middleware. Tenant ID derived from Clerk userId (never from user input). All Prisma queries scoped by tenantId. Prior S22 audit found and fixed 7 missing tenant checks. However, no database-level enforcement (RLS) exists below the application layer.',
          gapDescription: 'OTP spec requires enforcement "below the application layer." Current isolation is application-only via Prisma queries. No PostgreSQL RLS policies.',
          remediationPlan: 'Implement PostgreSQL RLS policies as defense-in-depth. See Domain 2, Control 2.3.',
          targetDate: 'Q3 2026',
        },
        {
          controlId: '4.2',
          score: 'ENFORCED',
          evidence: '11 roles with distinct permission sets defined in ROLE_PERMISSIONS constant. requireRole() middleware enforces permissions on every protected route with OR logic for multi-permission roles. Owner has wildcard access. S22 assessment found zero role escalation vulnerabilities.',
        },
        {
          controlId: '4.3',
          score: 'ENFORCED',
          evidence: 'requireAuth middleware applied to all non-public routes. Only health checks, Stripe webhooks, marketplace webhooks, and public portal endpoints are unauthenticated. Unauthenticated requests receive 401 JSON response. Portal routes use separate JWT-based auth with customer verification.',
        },
        {
          controlId: '4.4',
          score: 'IMPLEMENTED',
          evidence: 'Financial operations require accounting or owner role. Fiscal period locking prevents modification of closed periods. User management requires settings.users permission. However, no step-up authentication (re-enter password) for destructive operations like bulk deletes or role changes.',
          gapDescription: 'No re-authentication requirement for destructive operations. Relies on role-based authorization only.',
          remediationPlan: 'Implement step-up authentication via Clerk for sensitive actions: role changes, bulk deletes, fiscal period changes, and payment configuration changes.',
          targetDate: 'Q4 2026',
        },
        {
          controlId: '4.5',
          score: 'ENFORCED',
          evidence: 'Immutable AuditLog table captures all permission changes, role modifications, user creation/deletion, and settings changes. Each entry records tenantId, userId, action, resource, resourceId, before/after values (JSON), IP address, and timestamp. Audit log viewer available in admin UI.',
        },
      ],
    },

    // ──────────────────────────────────────────────
    // DOMAIN 5: Financial Integrity (15%)
    // Domain Score: 100.0%
    // ──────────────────────────────────────────────
    {
      domainNumber: 5,
      domainScore: 100.0,
      controlScores: [
        {
          controlId: '5.1',
          score: 'ENFORCED',
          evidence: 'Journal entries enforced with balanced debits and credits. The JournalEntry model requires at least two JournalLine records that sum to zero. Application validates balance before commit. Unbalanced entries are rejected with a 400 error.',
        },
        {
          controlId: '5.2',
          score: 'ENFORCED',
          evidence: 'Journal entries are immutable — no UPDATE or DELETE operations on JournalEntry or JournalLine. Corrections are made via reversing entries that create a new JournalEntry with opposite amounts. Original entries are preserved with full audit trail. Fiscal period locking prevents any modification to entries in closed periods.',
        },
        {
          controlId: '5.3',
          score: 'ENFORCED',
          evidence: 'AuditLog captures every void and refund with: userId (who), timestamp (when), reason (why), and approval chain. Void operations require manager or owner role. Refund operations create reversing journal entries with reference to original transaction. Complete paper trail from sale to void/refund.',
        },
        {
          controlId: '5.4',
          score: 'ENFORCED',
          evidence: 'Z-reports (end-of-day register reports) compare expected cash vs actual counted cash. Discrepancies are logged and visible to owner/manager. Register close-out workflow enforces reconciliation before new business day. Shift reports track per-cashier performance.',
        },
        {
          controlId: '5.5',
          score: 'ENFORCED',
          evidence: 'Tax rates configurable per jurisdiction (state, county, city). Automatic tax calculation on all taxable items. Tax liability tracking with separate GL accounts. Multi-jurisdiction support for businesses operating across tax boundaries. Tax-exempt customer flag with documentation.',
        },
        {
          controlId: '5.6',
          score: 'ENFORCED',
          evidence: 'All payment processing delegated to Stripe (PCI DSS Level 1). Stripe Terminal for in-person POS. Stripe Checkout for online payments. Stripe Billing for subscriptions. Zero cardholder data enters AdaptBooks servers. SAQ A compliant. Webhook signature verification via HMAC-SHA256.',
          delegatedTo: 'Stripe',
        },
      ],
    },

    // ──────────────────────────────────────────────
    // DOMAIN 6: Infrastructure & Deployment (10%)
    // Domain Score: 91.7%
    // ──────────────────────────────────────────────
    {
      domainNumber: 6,
      domainScore: 91.67,
      controlScores: [
        {
          controlId: '6.1',
          score: 'ENFORCED',
          evidence: 'All hosting providers hold relevant certifications: Vercel (SOC 2 Type II), Railway (SOC 2 Type II), Neon (SOC 2 Type II), Clerk (SOC 2 Type II), Stripe (PCI DSS Level 1). No self-managed infrastructure.',
          delegatedTo: 'Vercel / Railway / Neon',
        },
        {
          controlId: '6.2',
          score: 'IMPLEMENTED',
          evidence: 'TypeScript strict mode enabled across all packages. Build errors fail deployment. ESLint configured. However, some TypeScript escape hatches (any types, type assertions) exist in the codebase for rapid development. No zero-warning policy enforced in CI.',
          gapDescription: 'Some TypeScript escape hatches (any types) present. No enforced zero-warning CI gate.',
          remediationPlan: 'Audit and replace remaining any types with proper types. Add CI check that fails on TypeScript warnings.',
          targetDate: 'Q3 2026',
        },
        {
          controlId: '6.3',
          score: 'ENFORCED',
          evidence: 'pnpm 9.15.9 with lockfile (pnpm-lock.yaml) committed to git. Known CVEs mitigated via pnpm overrides in root package.json (react-is, postcss, semver, minimatch, multer, fast-xml-parser, ajv). All direct dependencies on latest major versions. Zero known high/critical vulnerabilities.',
        },
        {
          controlId: '6.4',
          score: 'ENFORCED',
          evidence: 'All secrets stored in platform dashboards (Vercel env vars, Railway env vars). .env files gitignored. No secrets found in source code or git history (verified in S22 audit). PORTAL_JWT_SECRET enforced at runtime — server throws if missing. NEXT_PUBLIC_ prefix convention respected for client-safe vars only.',
        },
        {
          controlId: '6.5',
          score: 'ENFORCED',
          evidence: 'Dynamic CORS allowlist restricts origins to production domains: *.adaptensor.com, *.adaptensor.io, *.adaptbooks.io, adaptaero.io. No wildcard (*) in production. Localhost allowed only in development mode. Extensible via CORS_ORIGIN env var for additional domains.',
        },
        {
          controlId: '6.6',
          score: 'IMPLEMENTED',
          evidence: 'Auto-deploys on push to main branch (Vercel for frontend, Railway for API). Preview deployments for pull requests. GitHub repository with branch protection. However, no mandatory PR review gate — direct pushes to main are possible.',
          gapDescription: 'No mandatory code review requirement before production deployment. Direct pushes to main trigger auto-deploy.',
          remediationPlan: 'Enable GitHub branch protection rules requiring at least one approving review before merge to main.',
          targetDate: 'Q2 2026',
        },
      ],
    },

    // ──────────────────────────────────────────────
    // DOMAIN 7: Monitoring & Incident Response (10%)
    // Domain Score: 75.0%
    // ──────────────────────────────────────────────
    {
      domainNumber: 7,
      domainScore: 75.0,
      controlScores: [
        {
          controlId: '7.1',
          score: 'ENFORCED',
          evidence: 'Dedicated AuditLog table records all security-relevant actions: logins (via Clerk), permission changes, financial modifications, user CRUD, settings changes. Each entry includes tenantId, userId, action, resource, resourceId, before/after JSON, IP address, and timestamp. Morgan HTTP request logging in combined format for production.',
        },
        {
          controlId: '7.2',
          score: 'ENFORCED',
          evidence: 'Four-tier rate limiting via express-rate-limit: general (100/min), POS (200/min), uploads (5/min), reports (10/min), AI (15/min), strict (10/min). Key generator uses tenantId when authenticated, IPv6 /64 subnet when not. Trusts X-Forwarded-For from Railway proxy.',
        },
        {
          controlId: '7.3',
          score: 'IMPLEMENTED',
          evidence: 'Sentry SDK enabled on both API (@sentry/node v10.45.0) and frontend (@sentry/nextjs v10.45.0). API initializes Sentry with DSN from environment variable, 10% trace sampling, and release tagging. Express error handler wired via Sentry.setupExpressErrorHandler(). Frontend uses sentry.client.config.ts, sentry.server.config.ts, and sentry.edge.config.ts with Next.js instrumentation hook. CSP updated to allow Sentry ingest domains. Conditional initialization — gracefully skips if DSN not set.',
          gapDescription: 'Sentry code is enabled and deployed but alerting rules (e.g., error rate thresholds, assignment policies) must be configured in the Sentry dashboard after DSN provisioning.',
          remediationPlan: 'Create Sentry project, set SENTRY_DSN on Railway and NEXT_PUBLIC_SENTRY_DSN on Vercel. Configure alert rules for error rate > 10/min and new issue assignment.',
          targetDate: 'Q2 2026',
        },
        {
          controlId: '7.4',
          score: 'PLANNED',
          evidence: 'Health check endpoints exist at /health (basic DB check) and /platform-admin/health/checks (6-service deep check with 3-second timeouts). Railway uses /health for deployment health checks. However, no independent external uptime monitoring service is configured yet.',
          gapDescription: 'No external uptime monitoring service. Health endpoints exist but are not monitored by an independent third-party service.',
          remediationPlan: 'Configure UptimeRobot or Better Uptime to monitor books.adaptensor.com and api.adaptbooks.io/health with SMS/email alerting on downtime.',
          targetDate: 'Q2 2026',
        },
        {
          controlId: '7.5',
          score: 'IMPLEMENTED',
          evidence: 'Documented incident response plan published at docs/INCIDENT_RESPONSE.md. Defines 4 severity levels (P0-P3) with response time SLAs (15 min to 24 hours). Includes escalation matrix, communication channels, 4-phase response procedure (Detection, Containment, Resolution, Post-Incident), rollback procedures per service, post-incident review template, and external dependency contacts. Quarterly review cadence established.',
        },
      ],
    },

    // ──────────────────────────────────────────────
    // DOMAIN 8: Availability & Business Continuity (5%)
    // Domain Score: 55.0%
    // ──────────────────────────────────────────────
    {
      domainNumber: 8,
      domainScore: 55.0,
      controlScores: [
        {
          controlId: '8.1',
          score: 'PLANNED',
          evidence: 'No offline or degraded mode capability currently implemented. POS operations require active API connection. If the API is unreachable, the frontend cannot process sales.',
          gapDescription: 'No offline POS capability. Complete API dependency for all operations.',
          remediationPlan: 'Implement service worker-based offline queue for POS transactions. Cache critical data (products, prices, tax rates) locally. Sync queued transactions when connection restores.',
          targetDate: 'Q4 2026',
        },
        {
          controlId: '8.2',
          score: 'ENFORCED',
          evidence: 'Neon provides continuous backups with point-in-time recovery (PITR). Backups are encrypted at rest (AES-256). Recovery granularity to the second. Neon manages backup infrastructure entirely — no manual intervention required.',
          delegatedTo: 'Neon',
        },
        {
          controlId: '8.3',
          score: 'IMPLEMENTED',
          evidence: 'Vercel auto-scales the Next.js frontend with zero configuration (serverless edge functions). Railway API can scale horizontally but requires manual configuration for auto-scaling rules. Current single-instance API handles production load but has no automatic scale-out.',
          gapDescription: 'API auto-scaling not configured. Frontend auto-scales via Vercel. Single API instance handles current load but cannot auto-scale under traffic spikes.',
          remediationPlan: 'Configure Railway auto-scaling policies based on CPU/memory thresholds. Add load testing to verify scale-out behavior.',
          targetDate: 'Q3 2026',
        },
        {
          controlId: '8.4',
          score: 'IMPLEMENTED',
          evidence: 'Documented disaster recovery plan published at docs/DISASTER_RECOVERY.md. Defines RTO of 4 hours and RPO of 1 hour. Covers 5 disaster scenarios: database failure (Neon PITR recovery), API server failure (Railway rollback), frontend failure (Vercel promotion), authentication failure (Clerk SLA), and complete platform recovery. Includes environment variable recovery procedures, DR test procedure (semi-annual cadence, next test September 2026), success criteria, and communication plan during DR events.',
        },
        {
          controlId: '8.5',
          score: 'MISSING',
          evidence: 'Single-region deployment: Neon database in us-east-1, Railway API in us-east-1, Vercel frontend on edge (global CDN, but serverless functions in default region). No multi-region replication or failover. Acceptable for SMB target market but disclosed per OTP requirements.',
          gapDescription: 'Single-region deployment with no geographic redundancy. Vercel CDN provides global edge for static assets, but API and database are single-region.',
          remediationPlan: 'Evaluate multi-region requirements based on customer growth. For current SMB market, single-region with strong backup/recovery is appropriate. Multi-region planned for enterprise tier.',
          targetDate: 'When enterprise customers require it',
        },
      ],
    },
  ],

  // Weighted Platform Score: 89.26%
  // D1 (96.43 × 0.15) + D2 (91.67 × 0.15) + D3 (87.50 × 0.15) + D4 (90.00 × 0.15) +
  // D5 (100.0 × 0.15) + D6 (91.67 × 0.10) + D7 (75.00 × 0.10) + D8 (55.00 × 0.05)
  // = 14.46 + 13.75 + 13.13 + 13.50 + 15.00 + 9.17 + 7.50 + 2.75 = 89.26
  platformScore: 89.26,
  platformRating: 'SOLID',

  delegations: [
    {
      function: 'Authentication & Identity',
      provider: 'Clerk',
      certification: 'SOC 2 Type II',
      dataIsolation: 'Zero passwords, MFA secrets, or OAuth tokens stored in AdaptBooks. All authentication state managed by Clerk. Platform stores only Clerk user ID as foreign key.',
    },
    {
      function: 'Payment Processing',
      provider: 'Stripe',
      certification: 'PCI DSS Level 1',
      dataIsolation: 'Zero cardholder data enters AdaptBooks systems. Stripe Terminal for in-person POS, Stripe Checkout for online payments, Stripe Billing for subscriptions. Platform stores only Stripe customer ID and subscription ID as references.',
    },
    {
      function: 'Database Hosting',
      provider: 'Neon',
      certification: 'SOC 2 Type II',
      dataIsolation: 'Database encryption, backup management, PITR, and physical security managed entirely by Neon. AdaptBooks accesses database via encrypted connection string only.',
    },
    {
      function: 'Frontend Hosting',
      provider: 'Vercel',
      certification: 'SOC 2 Type II',
      dataIsolation: 'Static assets and serverless functions hosted on Vercel infrastructure. TLS termination, DDoS protection, and CDN managed by Vercel. No sensitive data cached at edge.',
    },
    {
      function: 'API Hosting',
      provider: 'Railway',
      certification: 'SOC 2 Type II',
      dataIsolation: 'Express.js server runs in Railway container. Secrets stored in Railway environment variables (encrypted at rest). Container isolation between tenants.',
    },
    {
      function: 'Email Delivery',
      provider: 'SendGrid',
      certification: 'SOC 2 Type II',
      dataIsolation: 'Email content and recipient addresses passed to SendGrid API via HTTPS. No email data stored in AdaptBooks beyond send status. SendGrid manages deliverability, anti-spam, and DKIM.',
    },
  ],

  versionHistory: [
    {
      version: '1.1',
      date: 'March 23, 2026',
      changes: 'Remediation pass: Enabled Sentry error tracking on API and frontend (D7.3 PARTIAL→IMPLEMENTED). Published incident response plan with P0-P3 severity classification, escalation matrix, and rollback procedures (D7.5 PLANNED→IMPLEMENTED). Published disaster recovery plan with RTO/RPO targets, 5 scenario runbooks, and semi-annual DR test schedule (D8.4 PLANNED→IMPLEMENTED). Platform score: 87.26% → 89.26%.',
    },
    {
      version: '1.0',
      date: 'March 23, 2026',
      changes: 'Initial OTP compliance report. First automated source code audit of AdaptBooks production codebase.',
    },
  ],
};
