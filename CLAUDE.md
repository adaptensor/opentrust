# Open Trust Protocol — opentrust.adaptensor.com

## What This Is
Public-facing site for the Open Trust Protocol standard. Hosts the spec, compliance reports, and verification tools.

## Stack
- Next.js 16 App Router + TypeScript strict + Tailwind CSS v4
- NO Clerk (fully public, no auth)
- NO database (content as TypeScript constants + JSON)
- Deployed on Vercel (jamies-projects-b8b002f6 team)

## Domain
- Production: opentrust.adaptensor.com
- Dev: localhost:3000

## CMEM
- Brand Gold #FADC1A as primary accent
- Brand Black #0A0A0A
- Dark mode default (Canvas #020617)
- Typography: Inter + Space Grotesk
- Score colors: ENFORCED=#22C55E, IMPLEMENTED=#3B82F6, PARTIAL=#EAB308, PLANNED=#F97316, MISSING=#EF4444

## Key Data
- `src/data/otp-spec.ts` — All 8 domains, 47 controls, scoring methodology
- `src/data/manifesto.ts` — 5 manifesto statements
- `src/data/soc2-mapping.ts` — SOC 2 equivalency mapping

## Build Phases
- Phase 1 (OTP-1): Scaffold + Home + Specification + Manifesto (DONE)
- Phase 2 (OTP-2): Reports directory + report detail + AdaptBooks report
- Phase 3 (OTP-3): Verification tool + SOC 2 comparison + Adopt guide
- Phase 4 (OTP-4): First live Claude Code audit on AdaptBooks
