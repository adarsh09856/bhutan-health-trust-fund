# Bhutan Health Trust Fund (BHTF) — Institutional Platform

## Project Overview & AI Engineering Context

**Organisation**: Bhutan Health Trust Fund (BHTF)
**Mandate**: Autonomous trust fund by Royal Charter — perpetual free healthcare for all Bhutanese citizens
**Tagline**: "Healthy People. Stronger Bhutan."
**Repo directory**: `e:\ai\bhutanprojects\deploy-ready-site-main`
**Deployment port**: `6060` (PM2 Cluster, Linux VPS)

---

## Purpose

Sovereign-grade digital institutional portal and secretariat CRM back-office. Covers:

- Public outreach and institutional communications
- Citizen donation/pledge collection with official reference tracking
- News, reports, and policy publishing
- Full executive admin management suite
- PostgreSQL persistence with in-memory fallback for offline/demo

---

## Tech Stack

| Layer         | Technology                                                         |
| ------------- | ------------------------------------------------------------------ |
| Frontend      | React 19 + TanStack Start (SSR) + TanStack Router + TanStack Query |
| Build/Server  | Vite 7 + Nitro SSR runtime                                         |
| Database      | PostgreSQL 15+ + Drizzle ORM                                       |
| Auth          | `jose` JWT + bcryptjs — roles: `SUPER_ADMIN`, `ADMIN`, `EDITOR`    |
| UI Components | Radix UI (full suite) + shadcn/ui patterns + Lucide icons          |
| Forms         | React Hook Form + Zod validation                                   |
| Charts        | Recharts                                                           |
| Styling       | Tailwind CSS v4 (OKLCH colour tokens)                              |
| Notifications | Sonner (toast)                                                     |
| Deployment    | PM2 Cluster + Linux VPS, port `6060`                               |

---

## Institutional Key Facts

```
Capital endowment:   > Nu. 3.24 Billion (ring-fenced autonomous fund)
Sovereign matching:  1:1 — Ministry of Finance doubles every donation
Coverage:            120+ essential medicines & routine childhood vaccines
Reach:               All 205 gewogs, BHUs & district hospitals across 20 Dzongkhags
Tax status:          100% deductible under Section 19(a), Income Tax Act of Bhutan
Donation reference:  BHTF-DON-XXXXXX (6-digit sequential tracking ID)
```

---

## Public Portal Routes

| Route             | Description                                                                     |
| ----------------- | ------------------------------------------------------------------------------- |
| `/`               | Home — Hero, KPIs (1.2M+ benefited, 120+ medicines, 20 Dzongkhags)              |
| `/about`          | Institutional about, Royal Charter, governance structure                        |
| `/our-work`       | 6 core commodity financing streams across all 20 Dzongkhags                     |
| `/news`           | Real-time searchable & categorized press release directory                      |
| `/news/$slug`     | Full article view — view counter, share, related stories                        |
| `/reports`        | Statutory annual reports, audit reports, publications (PDF + download tracking) |
| `/policies`       | Governance charters, procurement guidelines, whistleblower protocols            |
| `/get-involved`   | Pledge & donation generator — MBOB / BNB Pay / RMA / Bank Transfer / Card       |
| `/contact`        | Citizen inquiry form — persists to PostgreSQL with toast confirmation           |
| `/track-donation` | Track pledge/donation by reference number `BHTF-DON-XXXXXX`                     |

---

## Admin Suite (`/admin/*`)

| Route                | Module              | Key Features                                                           |
| -------------------- | ------------------- | ---------------------------------------------------------------------- |
| `/admin/login`       | Auth                | BHTF-branded login, cookie/JWT management                              |
| `/admin/dashboard`   | Executive Dashboard | 4 live KPI cards, Recharts monthly chart, recent donations & inquiries |
| `/admin/donations`   | Donations Ledger    | Search, status workflow (PENDING→VERIFIED→COMPLETED), CSV export       |
| `/admin/inquiries`   | Citizen Inbox       | Filter unread, read modal, internal notes, reply mailto                |
| `/admin/news`        | News Manager        | CRUD for press releases, draft/published toggle                        |
| `/admin/reports`     | Reports Catalog     | PDF catalog, categorize, download counter                              |
| `/admin/policies`    | Policies            | Bylaws, procurement rules, whistleblower guidelines CRUD               |
| `/admin/subscribers` | Subscribers         | Mailing list view + CSV export                                         |
| `/admin/programs`    | Health Programs     | Overview of financing streams across 20 Dzongkhags                     |

---

## Database Schema (Drizzle ORM — 8 tables)

| Table           | Purpose                                                                         |
| --------------- | ------------------------------------------------------------------------------- |
| `users`         | Admin auth — `SUPER_ADMIN`, `ADMIN`, `EDITOR` roles                             |
| `news_articles` | Slug, headline, markdown content, category, author, publish toggle, view count  |
| `reports`       | Annual/audit reports, research — file size, category, download counter          |
| `policies`      | Institutional charters, anti-corruption, procurement, whistleblower             |
| `donations`     | Donor records, `BHTF-DON-XXXXXX` reference, payment method, verification status |
| `inquiries`     | Citizen messages — `UNREAD → IN_PROGRESS → REPLIED → ARCHIVED` workflow         |
| `subscribers`   | Mailing list with active state                                                  |
| `programs`      | Core health commodity financing streams                                         |

---

## Server Functions API Layer

```
src/lib/api/
├── auth.functions.ts
│   adminLogin, verifyCurrentSession
│
├── public.functions.ts
│   submitContactInquiry, submitDonationPledge, subscribeNewsletter
│   getPublicNews, getPublicNewsBySlug, getPublicReports, trackReportDownload
│   getPublicPolicies, getPublicPrograms
│
└── admin.functions.ts
    getDashboardAnalytics
    CRUD: News, Reports, Policies, Donations, Inquiries, Subscribers
```

---

## Database Resilience

- **Primary**: PostgreSQL via `DATABASE_URL` env var (port 5432)
- **Fallback**: Automatic in-memory seed store — zero-downtime offline/demo mode
- **Seeder**: `src/lib/db/seed-data.ts` — admin account + authentic public health content
- **Schema**: `src/lib/db/schema.ts` (Drizzle)

---

## Demo Credentials

| Role         | Email           | Password         |
| ------------ | --------------- | ---------------- |
| Super Admin  | `admin@bhtf.bt` | `Admin@BHTF2026` |
| Media Editor | `media@bhtf.bt` | `Admin@BHTF2026` |

---

## Environment Variables (`.env`)

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/bhtf_db
JWT_SECRET=<secret>
NODE_ENV=development
PORT=6060
```

---

## Current Status

- Full public portal (10 routes) implemented
- Full admin suite (9 modules) with live DB-backed data
- PostgreSQL schema migrated and seeded
- In-memory fallback operational for offline demo
- TypeScript: `npx tsc --noEmit` → 0 errors
- Donation pledge with printable voucher + reference tracking
- CSV export for donations & subscribers
- Dynamic news routing (`/news/$slug`) with view counter
- PM2 cluster + Linux VPS deployment configured
