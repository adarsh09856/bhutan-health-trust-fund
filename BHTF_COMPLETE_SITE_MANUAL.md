# Bhutan Health Trust Fund (BHTF) — Complete Operations & Site Manual

## 1. System Architecture & Overview
The **Bhutan Health Trust Fund (BHTF)** platform is an institutional web portal and sovereign administrative CMS built with:
- **Framework**: TanStack Start (Full-stack React with SSR)
- **Styling**: Tailwind CSS v4, Plus Jakarta Sans, and Fraunces Editorial Serif
- **State & Routing**: TanStack Router & TanStack React Query
- **Data & Auth**: Drizzle ORM + PostgreSQL with Role-Based Access Control (RBAC)
- **Design Paradigm**: Deep spruce/forest green (`#061410`), Bhutanese Royal Ochre (`#d4a237`), and crisp alpine paper surfaces.

---

## 2. Public Portal Architecture & Features

### 2.1 Navigation & Global Shell
- **Floating Island Capsule**:
  - Automatically elevates with glassmorphism on scroll (`backdrop-blur-2xl`).
  - Contains institutional links: *About Us (Royal Mandate, Governance, Leadership)*, *Our Programs (Essential Medicines, Vaccines, Cold Chain)*, *Transparency (Audits, Tenders, Metrics)*, *News*, and *Contact*.
  - Sticky offset automatically accommodates the administrative bar when an admin is logged in, preventing any overlap.
- **Top Announcement Ribbon**:
  - Configurable via Admin Settings. Displays national emergency broadcasts, seasonal vaccination alerts, or matching campaigns.

### 2.2 Homepage Sections
1. **Monumental Royal Hero**:
   - Live status badges: Royal Charter mandate confirmation and active 1:1 RGOB Sovereign matching status.
   - Quick guarantee pills: Zero Stockout Guarantee, 205 Remote Gewogs, 100% Tax Exempt (DRC).
   - **Sovereign Health Corpus Card**: Real-time ticker calculating permanent health endowment yield and three primary supply allocations.
2. **Minimal Stat Numerals**:
   - 780,000+ Citizens Protected
   - 120+ Essential Medicines
   - 20 / 20 Dzongkhags Covered
   - 100% Routine Childhood Vaccines
3. **Institutional Directory**: Fast access to Royal Mandates, Formularies, RAA Audits, and Policies.
4. **Interactive Commodity Pipeline Tracker**: Visualizes the flow of pediatric vaccines, emergency drugs, and alpine solar cold chain equipment.
5. **Interactive 20 Dzongkhags Explorer**: Regional breakdown displaying distribution across Western, Central, Southern, and Eastern administrative zones.
6. **1:1 RGOB Matching Simulator**: Interactive donor calculator displaying how personal or corporate donations are doubled by the Royal Government of Bhutan.
7. **Official Publications & News Grid**: Press releases and media advisories.
8. **Statutory Governance & RAA Clean Audit**: Displays unqualified audit certificates issued by the Royal Audit Authority (RAA).
9. **Global Partners**: WHO, UNICEF, World Bank, Gavi, and Ministry of Health.

---

## 3. Super Admin Portal & CMS Manual

### 3.1 Access & Authentication
- **URL**: `/admin/login`
- **Role Hierarchy**:
  - `SUPER_ADMIN`: Full permissions (System settings, user management, audit logs, CRM, content).
  - `EDITOR`: Content management, press releases, reports, and citizen inquiries.
- **Live Toolbar (`AdminTopBar`)**:
  - Appears across the public portal when logged in.
  - Features quick jump to **⚡ Live Edit This Page**, **All Pages**, **Admin Panel**, and a **Minimize / Expand** button.

### 3.2 Modules Breakdown

#### A. Executive CRM & Donors
1. **Executive Dashboard (`/admin/dashboard`)**:
   - Real-time telemetry: Public pledges received, 1:1 RGOB statutory doubling amount, and total healthcare purchasing yield.
   - Monthly fiduciary revenue dual-area chart showing matching yields.
   - Quick action bar: Log offline pledge, post press release, publish tender, or field photo.
2. **Donors & Pledges CRM (`/admin/donations`)**:
   - Track online and offline contributions.
   - Verification workflow: Update status to *Verified* to trigger DRC tax exemption voucher generation.
3. **Citizen Inquiries & Ombudsman (`/admin/inquiries`)**:
   - Triage citizen requests, medical queries, and confidential whistleblower messages.
4. **Subscribers & Audiences (`/admin/subscribers`)**:
   - View public newsletter subscribers and export audience lists.

#### B. Commodities & Procurement
1. **Essential Medicines & Streams (`/admin/programs`)**:
   - Maintain the 6 core healthcare streams (Pediatric Vaccines, Primary Drugs, Alpine Cold Chain, Emergency Kits, Maternal Packs, Mental Health).
2. **Procurement Tenders & Steps (`/admin/procurement`)**:
   - Post international bids, statutory tenders, and logistics handover milestones.
3. **National Impact Statistics (`/admin/metrics`)**:
   - Edit homepage counter numbers (Citizens protected, formulary count, coverage %).

#### C. Institutional CMS & Media
1. **Pages & Live Visual Editor (`/admin/pages` & `/admin/page-editor`)**:
   - WordPress-style visual customizer with responsive preview (Desktop, Tablet, Mobile).
   - Real-time block editing: Hero banners, split text/image, card grids, stat counters, and CTAs.
2. **News & Press Releases (`/admin/news`)**:
   - Create, edit, and publish press releases with rich imagery and excerpts.
3. **Reports & RAA Audits (`/admin/reports`)**:
   - Upload official financial statements, annual reports, and independent audit PDFs.
4. **Policies & Royal Charters (`/admin/policies`)**:
   - Manage statutory trust documents, ethics policies, and Royal Charters.
5. **Field Operations Gallery & Videos (`/admin/gallery` & `/admin/videos`)**:
   - High-resolution field photography and official documentary broadcasts.

#### D. Sovereign Governance & RBAC
1. **Board of Trustees (`/admin/trustees`)**:
   - Update profiles of high-level fiduciary trustees and royal appointees.
2. **Historical Milestones (`/admin/milestones`)**:
   - Manage the institutional timeline dating back to the Royal Charter proclamation.
3. **Users & RBAC (`/admin/users`)**:
   - Provision staff accounts, change passwords, and assign roles.
4. **Security Audit Trail (`/admin/audit-logs`)**:
   - Immutable security log of all admin actions (logins, page edits, settings changes).
5. **Site Settings (`/admin/settings`)**:
   - Configure sovereign matching ratio (default 1:1), bank account details, announcement ribbon, and contact helplines.

---

## 4. Operational Best Practices
- **Verifying Donations**: Only verify donations after bank credit reconciliation. Verifying automatically generates official tax receipts.
- **Publishing Tenders**: Ensure PDF tender packages contain exact closing dates and eligibility criteria as mandated by statutory procurement rules.
- **Live Visual Customizer**: When editing pages, always use the responsive toggle to verify rendering on both mobile and desktop screens before publishing.
