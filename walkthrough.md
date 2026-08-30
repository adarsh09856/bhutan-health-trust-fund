# Walkthrough: Complete End-to-End BHTF Institutional Platform & Admin Suite

We have transformed the **Bhutan Health Trust Fund (BHTF)** web application into a database-persisted institutional web portal with a secure, full-featured **Admin Panel**, **PostgreSQL database architecture**, **dynamic news routing**, **real public form pipelines**, and **pledge management**.

---

## 1. Database & Persistence Architecture (PostgreSQL + Drizzle ORM)

* **Schema Definition ([schema.ts](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/lib/db/schema.ts))**:
  * `users`: Authentication, administrator roles (`SUPER_ADMIN`, `ADMIN`, `EDITOR`), password hashes, and timestamps.
  * `news_articles`: Slugs, headlines, markdown content, categories, author desks, cover photos, publish toggles, and view counts.
  * `reports`: Statutory annual reports, audit reports, research papers, file sizes, categories, and download metrics.
  * `policies`: Institutional charters, anti-corruption policies, whistleblower guidelines, and procurement standards.
  * `donations`: Financial pledges, donor records, unique tracking numbers (`BHTF-DON-XXXXXX`), payment methods (MBOB, BNB Pay, RMA, Card, Bank Transfer), and verification statuses.
  * `inquiries`: Citizen & hospital messages, status workflows (`UNREAD`, `IN_PROGRESS`, `REPLIED`, `ARCHIVED`), and internal resolution notes.
  * `subscribers`: Audience mailing list with active states.
  * `programs`: Core public health commodity financing streams.
* **Auto-Seeder ([seed-data.ts](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/lib/db/seed-data.ts))**:
  * Default Admin Account: `admin@bhtf.bt` (Password: `Admin@BHTF2026`).
  * Authentic public health articles, annual reports, policies, and health programs across Bhutan's 20 Dzongkhags.
* **Resilient Engine ([db/index.ts](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/lib/db/index.ts))**:
  * Connects to PostgreSQL via `DATABASE_URL` with an automated zero-downtime memory/seed store fallback.

---

## 2. Server Functions API Layer

* **Authentication API ([auth.functions.ts](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/lib/api/auth.functions.ts))**:
  * `adminLogin`: Credential verification with tamper-proof signed session tokens.
  * `verifyCurrentSession`: Server-side session verification.
* **Public Ingestion API ([public.functions.ts](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/lib/api/public.functions.ts))**:
  * `submitContactInquiry`: Validates input with Zod, persists to DB, triggers confirmations.
  * `submitDonationPledge`: Generates official reference numbers and records pledges.
  * `subscribeNewsletter`: Adds subscriber email to the database.
  * `getPublicNews`, `getPublicNewsBySlug`, `getPublicReports`, `trackReportDownload`, `getPublicPolicies`, `getPublicPrograms`.
* **Admin Management API ([admin.functions.ts](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/lib/api/admin.functions.ts))**:
  * `getDashboardAnalytics`: Aggregates live KPI metrics and monthly contribution trends for charts.
  * Complete CRUD endpoints for News, Reports, Policies, Donations, Inquiries, and Subscribers.

---

## 3. Full-Featured Admin Panel Suite (`/admin/*`)

| Module | Route | Key Features |
| :--- | :--- | :--- |
| **Admin Authentication** | [`/admin/login`](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/admin/login.tsx) | Clean BHTF branded login form, secure cookie/token management, error notifications. |
| **Executive Dashboard** | [`/admin/dashboard`](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/admin/dashboard.tsx) | 4 Live KPI Cards (Total Donations Nu., Unread Inquiries, Published News, Subscribers), Recharts Financial Trend Chart, Recent Inquiries Inbox, and Recent Donations Ledger. |
| **Donations Ledger** | [`/admin/donations`](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/admin/donations.tsx) | Search by donor/reference ID, status changer (`PENDING` -> `VERIFIED` -> `COMPLETED`), and one-click **CSV Export**. |
| **Inquiries Inbox** | [`/admin/inquiries`](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/admin/inquiries.tsx) | Filter by unread status, read full inquiry modal, write internal secretariat resolution notes, direct reply mailto trigger. |
| **News & Media Manager** | [`/admin/news`](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/admin/news.tsx) | Create, edit, delete, and toggle draft/published status for public news articles. |
| **Reports Catalog** | [`/admin/reports`](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/admin/reports.tsx) | Catalog PDF documents, categorize by year and topic, track citizen download counters. |
| **Policies & Charters** | [`/admin/policies`](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/admin/policies.tsx) | Manage institutional bylaws, procurement rules, and whistleblower guidelines. |
| **Audience Subscribers** | [`/admin/subscribers`](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/admin/subscribers.tsx) | View mailing list audience with one-click **CSV Export** for email campaigns. |
| **Health Programs** | [`/admin/programs`](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/admin/programs.tsx) | Overview of financing streams across all 20 Dzongkhags. |

---

## 4. Frontend Dynamic Routing & Public Page Upgrades

* **Dynamic Single News Page ([news/$slug.tsx](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/news/$slug.tsx))**:
  * Full article view, cover image display, view counter, category badge, copy-link share button, and related stories sidebar.
* **Filterable News Directory ([news.tsx](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/news.tsx))**:
  * Real-time search by headline/excerpt and category filtering.
* **Searchable Reports & Publications ([reports.tsx](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/reports.tsx))**:
  * Search, category filtering, and working "Download PDF" buttons with download tracking.
* **Functional Contact Form ([contact.tsx](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/contact.tsx))**:
  * Direct submission to PostgreSQL with loading state, instant toast notification, and inquiry logging.
* **Pledge & Donation Generator ([get-involved.tsx](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/routes/get-involved.tsx))**:
  * Preset amounts + custom input, multi-channel payment method selection (MBOB, BNB Pay, RMA Gateway, Bank Transfer, Card), anonymous option, and official printable pledge voucher with reference tracking.
* **Global Navigation Header ([site-header.tsx](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/components/site-header.tsx))**:
  * Connected "Portal Login" directly to `/admin/login`, automatically displaying "Admin Panel" when authenticated.
* **Global Footer ([site-footer.tsx](file:///e:/ai/bhutanprojects/deploy-ready-site-main/src/components/site-footer.tsx))**:
  * Working newsletter subscription form saving directly to the database with Sonner toast feedback.

---

## 5. Verification Results

1. **TypeScript Type Safety**: `npx tsc --noEmit` completed with **0 errors**.
2. **Component Integration**: All Radix, Tailwind CSS v4, Lucide Icons, and Recharts components verified.
3. **Admin Authentication**: Verified with default credentials (`admin@bhtf.bt` / `Admin@BHTF2026`).
