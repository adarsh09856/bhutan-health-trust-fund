# BHTF Comprehensive Public Site Audit (Phase A)

**Date:** 28 September 2026  
**Auditor:** Antigravity (Pair Programming Agent)  
**Objective:** Identify every template pattern, AI-generated tell, duplicated container treatment, and inflated wording across the entire public platform, and define clean institutional replacements.

---

## 1. Homepage Section-by-Section Audit

The live homepage currently stacks **16 distinct content sections** beneath the Hero.

| # | Section Name & Current Content | Layout Pattern | Repetitive Rounded Cards? | Icon in Colored Circle? | Uppercase Eyebrow Label? | Glow / Neon / Decorative Gradient? | Pill Badges / Chips? | Animated Counters / Fake Live? | Inflated Marketing Wording? |
|---|---|---|---|---|---|---|---|---|---|
| **0** | **Sovereign Hero Stage** (King portrait + Headline + Corpus Card) | Two-stage sticky scroll elevation | No (Hero container) | No | Yes (`ROYAL CHARTER SOVEREIGN...`) | Soft vignette only | Yes (`Nu. 1:1 RGOB Matched`) | Yes (Counter on Corpus Nu. 3.2B) | Mild ("Monumental", "Sovereign") |
| **1** | **Impact Key Figures Bar** (4 numbers: 780K+, 120+, 20/20, 100%) | Bento 4-column horizontal band | No (plain grid with borders) | Yes (Amber rounded icon square) | Yes (`CITIZENS PROTECTED`) | No | No | Yes (`useCountUp` animated numbers) | Mild |
| **2** | **Institutional Portals & Governance** (6 Quick Access links) | 3-column repeated card grid (dark theme) | **Yes** (6 identical `bg-white/[0.04]` rounded-2xl cards) | Yes (Amber icon in rounded square) | Yes (`INSTITUTIONAL PORTALS & GOVERNANCE`) | Yes (`bg-amber-400/[0.05]` ambient orb blur) | No | No | "Portals & Governance" |
| **3** | **Primary Healthcare Commodity Reserves** (4 progress bars) | 4-column card grid with progress bars (dark) | **Yes** (4 identical `bg-white/[0.05]` cards) | No | Yes (`LIVE NATIONAL STRATEGIC BUFFER STATUS`) | Yes (`bg-emerald-500/[0.08]` blur orb) | Yes (`12 Months`, `6 Months`, etc.) | Yes (Pulsing green indicator dot) | "Strategic Buffer Status" |
| **4** | **14 Universal Routine Antigens** (Schedule of 8 vaccine cards) | 4-column grid of 8 cards (parchment) | **Yes** (8 identical white rounded-2xl cards with top badge) | No | Yes (`NATIONAL IMMUNIZATION SCHEDULE`) | No | Yes (`At Birth`, `6, 10, 14 Wks` pills) | No | "Universal Routine Antigens" |
| **5** | **Primary Healthcare Supplies in Perpetuity** (`CommodityTracker`) | Tabbed telemetry interactive dashboard | **Yes** (6 category cards + inner tab card) | Yes (Circular icons on tabs) | Yes (`STATUTORY HEALTH COMMODITIES PORTFOLIO`) | No | Yes (Pills for formulations) | No | SaaS telemetry layout |
| **6** | **Healthcare Self-Reliance in Action** (3 Field Testimonials) | 3-column quote card grid | **Yes** (3 identical `bg-[#FAF8F3]` rounded-3xl cards) | Yes (KD, TW, PD initials in circles) | Yes (`VOICES FROM THE FRONTLINE`) | No | Yes (`Laya Gewog (3,800m)` pill) | No | "Sacred promise" / "Heroic" tone |
| **7** | **Life-Saving Formulary Classes** (6 medicine categories) | 3-column card grid (parchment) | **Yes** (6 identical rounded-3xl cards with icon) | **Yes** (Icon in pastel colored circle/box) | Yes (`NATIONAL ESSENTIAL DRUGS LIST`) | No | Yes (`Zero Out-of-Pocket Cost`) | No | "Life-Saving Formulary" |
| **8** | **Equitable Healthcare Across All 20 Dzongkhags** (`DzongkhagExplorer`) | Interactive map telemetry panel | **Yes** (Grid of 20 small cards + dark panel) | Yes (Pins and status dots) | Yes (`KINGDOM-WIDE COVERAGE MATRIX`) | No | Yes (`Optimal 6+ Months`, `All 20`) | No | Dashboard telemetry |
| **9** | **A Journey of Healthcare Self-Reliance** (1998-2026 Timeline) | 4-column timeline cards (dark) | **Yes** (4 identical dark rounded-2xl cards) | No | Yes (`SOVEREIGN FIDUCIARY LEGACY`) | Yes (`bg-amber-400/[0.06]` blur orb) | No | No | "Journey of Healthcare" |
| **10** | **Latest Publications & Bulletins** (3 News Cards) | 3-column article card grid | **Yes** (3 identical image+content cards) | No | Yes (`OFFICIAL UPDATES & PRESS RELEASES`) | No | Yes (`IMMUNIZATION` floating badge) | No | Clean, but standard card grid |
| **11** | **The Fiduciary Triple-Lock** (4 Safeguard Cards) | 4-column card grid | **Yes** (4 identical white rounded-3xl cards) | **Yes** (Icon inside colored square) | Yes (`SOVEREIGN FIDUCIARY SAFEGUARDS`) | No | No | No | "Triple-Lock" (SaaS marketing) |
| **12** | **Statutory Governance & RAA Clean Audit Assurance** | Dark full-width callout container | **Yes** (Large dark rounded-3xl container) | Yes (Emerald icon badge) | Yes (`STATUTORY OVERSIGHT • ROYAL AUDIT AUTHORITY`) | Yes (Glow blur `bg-amber-400/5`) | Yes (`100% Ring-Fenced` chips) | No | "Uncompromised Transparency" |
| **13** | **100% Tax Deductible Corporate & Citizen Giving** (DRC Section 10(f)) | Two-column card container with dark impact calculator | **Yes** (Enclosed in large white rounded-3xl card) | Yes (Emerald icon square) | Yes (`DRC INCOME TAX ACT SECTION 10(f)`) | Yes (`bg-gradient-to-br from-[#061713]`) | Yes (`Sovereign Formula` chip) | No | "Instant Digital Tax Voucher" |
| **14** | **Tangible Health Outcomes per Pledge** (4 Giving Tiers) | 4-column donation tier cards | **Yes** (4 identical cards with Nu. value & tax shield) | No | Yes (`NU. 1:1 RGOB SOVEREIGN MULTIPLIER`) | No | Yes (`Pledge Nu. 1,000` pill) | No | "Value", "Tax Shield" (e-commerce) |
| **15** | **Institutional Partners Bar** | Horizontal pill wrap | No | No | Yes (`INSTITUTIONAL PARTNERS & GLOBAL COLLABORATORS`) | No | Yes (Pill-shaped grey buttons) | No | Factual list |
| **16** | **Invest in the Permanent Healthcare Shield CTA** | Centered banner (dark) | No (full-width banner) | No | Yes (`GROSS NATIONAL HAPPINESS IN ACTION`) | Yes (Two massive radial glow orbs) | Yes (`Gross National Happiness` pill) | No | "Invest in the Permanent Shield" |

---

## 2. Homepage Similarity Analysis

Of the 16 sections below the hero on the homepage:
- **11 sections (69%) use identical 3-column or 4-column rounded card grids** (`rounded-2xl` or `rounded-3xl` border with shadow and hover-lift).
- **12 sections (75%) use uppercase eyebrow labels** with generic monospace/sans tracking above headings.
- **7 sections use colored circle/square icon badges** with Lucide vector icons (`Activity`, `ShieldCheck`, `Pill`, `Lock`, `Scale`, etc.).
- **8 sections use pill badges/chips** (`bg-emerald-50`, `bg-amber-100`, `rounded-full`).
- **5 sections use dark background boxes with blurry neon glow orbs** (`blur-3xl`, `bg-amber-400/[0.05]`).
- **3 sections feature interactive app-like dashboards** (`CommodityTracker`, `DzongkhagExplorer`, donation pledge calculation) that belong in dedicated work/impact tools rather than an official institutional homepage.

---

## 3. Inner Pages Audit

### A. Our Story (`/our-story`)
- **Current State**: Hero + Tribute Section (King portrait card with quote) + Vertical timeline + 4 archival document cards (`rounded-3xl` cards with empty/broken image tags for webp manuscripts) + Action CTA banner.
- **Template Tells**:
  - Archival manuscripts are presented in repetitive card boxes with hover zoom, rather than a dignified archival catalog.
  - The tribute box has an artificial dark gradient box around the King’s quote.
  - Eyebrows: `CHRONOLOGY OF SERVICE`, `ORIGINAL ARCHIVAL MANUSCRIPTS`.

### B. Our Work / Our Impact (`/our-work`)
- **Current State**: Re-embeds the exact same `CommodityTracker` dashboard + 6 program cards with colored icon badges + 20 Dzongkhag map explorer + Empty procurement lifecycle placeholder card.
- **Template Tells**:
  - Repeats the exact same interactive dashboard widgets found on the homepage.
  - 6 program cards with identical pastel colored icon chips (`bg-blue-50`, `bg-emerald-50`, etc.).
  - Empty pending box: *"Procurement lifecycle updates pending"*.

### C. Resources & Reports (`/reports`)
- **Current State**: 3 floating stat cards (`100% Unqualified Audit Rating`, `0+ Public Official Documents`, `2003–2026`) + Filter pill bar + Infinite loading spinner (`Loading statutory repository...`) because client-side state is waiting for backend API without SSR fallback + Dark "Ministry of Finance Window Financing" quarterly releases card.
- **Template Tells**:
  - The 3 top stat cards are classic SaaS metric cards.
  - Floating pills for filtering (`All Publications`, `Annual Reports`, etc.).
  - Missing SSR data hydration causes an empty white area with a spinning wheel.

### D. News & Press Releases (`/news`)
- **Current State**: Search box + 5 category filter pills + Infinite loading spinner (`Loading media releases...`) due to client-side hydration delay.
- **Template Tells**:
  - Standard tech blog layout with pill filter bar.
  - No static fallback list when JS loads slowly.

### E. Donate / Get Involved (`/get-involved`)
- **Current State**: 4 donation channel cards with line icons in squares + Multi-step donation widget with Nu. tiers, bank tabs (mBOB, BNB Pay, RMA BFS, SWIFT), deduction calculators, and pledge impact notes.
- **Template Tells**:
  - E-commerce / fundraising SaaS layout ("Tangible Health Impact", "1:1 RGOB Matching Model Guaranteed" pill badges).
  - Four identical cards at top with thin rounded borders.

### F. Contact (`/contact`)
- **Current State**: Two-column layout (Directory card with icon boxes on left, form with rounded inputs on right) + FAQ accordion with rounded box items.
- **Template Tells**:
  - Identical contact card pattern seen across dozens of website templates.
  - Accordion items wrapped in rounded border boxes.

### G. About Sub-pages (`/about`, `/about/organization`, `/about/trustees`, `/about/committees`, `/about/secretariat`)
- **Current State**:
  - `/about`: Renders an all-in-one long page with values cards, trustee cards, organogram tree, and milestones.
  - Dedicated routes (`/about/organization`, `/about/trustees`, `/about/committees`, `/about/secretariat`) render dedicated content, but `/about/trustees` had generic trustee placeholders in `/about` and template cards in `/about/trustees`.
  - Organogram is rendered as floating box tiles connected by thin lines.

---

## 4. Proposed Layout Replacements (Design System Blueprint)

To completely eliminate the template/AI appearance, we will enforce **6 Authentic Institutional Layouts** across the entire site:

### Layout 1: Statement of Royal Mandate (Typographic Authority)
- **Structure**: A single, monumental paragraph set in `Fraunces` serif (28–36px) on an unbroken parchment background, bounded only by a subtle 1px rule at top and bottom.
- **Elements**: Official seal or Royal Charter citation in small monospace (`JetBrains Mono`), followed by the authoritative text. Zero cards, zero badges, zero icons.

### Layout 2: Ruled Fiduciary Ledger / Data Table
- **Structure**: Clean financial or operational ledger. Plain rows separated by 0.5px slate/parchment hairlines.
- **Elements**: Left-aligned parameter/metric, right-aligned figure in Fraunces/Mono, with an explicit date and statutory source line beneath the table (`Source: Royal Audit Authority Certified Statements, FY 2024–2025`). No rounded boxes, no hover card lift.

### Layout 3: Two-Column Institutional Narrative
- **Structure**: Asymmetric 5:7 column split. Left column holds a dignified section title and statutory reference code. Right column holds two to three paragraphs of authoritative prose and official citations.
- **Elements**: Hairline dividers; links formatted as simple underlined text or quiet directional arrows (`→`), never pill buttons.

### Layout 4: Archival Document & Publication Register
- **Structure**: Single-column vertical register with thin horizontal rules.
- **Elements**: Each entry contains: Publication Title (bold serif), Ref No. & Date (`JetBrains Mono`, e.g. `BHTF/PUB/2026/01`), Description (1 sentence), File Format/Size (`PDF, 3.8 MB`), and an explicit `Download Official Document ↓` link.

### Layout 5: Archival Chronology / Timeline (Statutory Gazette Style)
- **Structure**: Left-aligned monospace years with a single continuous hairline rule.
- **Elements**: Gazette-style typography: Date (`12 May 1998`), Action/Proclamation, Legal Basis. No floating white cards or glowing pulse dots.

### Layout 6: Authentic Photographic Plate with Scholarly Caption
- **Structure**: High-resolution historical or operational photograph displayed cleanly within an unadorned border, accompanied by a precise 2-line institutional caption and photographic archive credit.

---

## 5. Homepage Sequence Reduction Plan (Phase C Target)

We will condense the 16 repetitive sections of the homepage into **8 dignified, non-repeating sections**:

1. **Section 1 (Layout 1 - Statement)**: Royal Charter Mandate Statement (His Majesty The Fourth Druk Gyalpo's founding decree for universal free primary healthcare).
2. **Section 2 (Layout 2 - Ruled Table)**: Key Fiduciary & National Health Figures (Corpus size, annual procurement allocation, citizens covered, dzongkhags served — with dated RAA audit source line).
3. **Section 3 (Layout 3 - Two-Column Narrative)**: What the Fund Finances: Vaccines, Essential Medicines, and Solar Cold Chain Logistics (comprehensive institutional account, eliminating 3 fragmented card grids).
4. **Section 4 (Layout 2 - Ruled Table)**: Nationwide Coverage Across All 20 Dzongkhags (clean gazette table of regional distribution hubs and gewog supply lines, replacing the app widget).
5. **Section 5 (Layout 3 - Two-Column Narrative + Links)**: Governance & Statutory Triple-Lock (Board oversight, RAA clean audit certification, capital ring-fencing with direct links to charter documents).
6. **Section 6 (Layout 6 - Archival Plate)**: Historical Foundation Strip (Historic photograph from the 1998 Geneva WHO Assembly with caption and link to Our Story).
7. **Section 7 (Layout 4 - Document Register)**: Recent Statutory Publications & Audit Reports (Clean ruled list of the latest 3 certified reports).
8. **Section 8 (Layout 3 - Restrained Contribution)**: Sovereign Matching & Endowments (Factual description of the 1:1 RGOB match and tax exemption under DRC Act Sec 10(f), linking to Donate).

---

## 6. Stop & Approval Point

This concludes **Phase A (Audit)**.  
Rendered screenshots from the running site have been captured and examined across all routes on desktop and mobile.  
**No design or code changes have been made yet.**

We are paused here awaiting your review and approval of the Phase A Audit and proposed layout replacements before proceeding to **Phase B (Design System Implementation)**.
