# Bhutan Health Trust Fund (BHTF) — Official Platform & Management Suite

> **Healthy People. Stronger Bhutan.**  
> An autonomous trust fund established by Royal Charter to safeguard the sustainable financing of essential medicines, vaccines, and primary healthcare commodities for every citizen across the Kingdom of Bhutan.

---

## 🏛️ Project Overview

The **Bhutan Health Trust Fund (BHTF)** web platform is built with **TanStack Start (SSR via Vite & Nitro)**, **TanStack Router**, **TanStack Query**, **React 19**, and **Tailwind CSS v4** (OKLCH design system), backed by a persistent data store with **PostgreSQL + Drizzle ORM** schema.

---

## 🚀 Key Features

### 1. 🌐 Public Portal
- **Hero & Mission Section**: Overview of BHTF's Royal Mandate, key metrics (1.2M+ benefited, 120+ essential medicines, 20 Dzongkhags reached).
- **Dynamic News & Media (`/news` & `/news/$slug`)**: Real-time searchable and categorized press releases with reading view and social sharing.
- **Reports & Publications (`/reports`)**: Statutory annual reports, audit reports, research publications with download tracking.
- **Policies & Governance (`/policies`)**: Governance Charters, procurement guidelines, and anti-corruption/whistleblower protocols.
- **Healthcare Programs (`/our-work`)**: 6 core commodity financing streams across all 20 Dzongkhags.
- **Citizen Contact Pipeline (`/contact`)**: Instant inquiry logging into the Secretariat Inbox with validation and toast notifications.
- **Pledge & Donation Generator (`/get-involved`)**: Multi-channel payment options (MBOB, BNB Pay, RMA Gateway, Bank Transfer, International Card), anonymous toggle, and printable official donation vouchers with tracking references (`BHTF-DON-XXXXXX`).

### 2. 🛡️ Complete Executive Admin Suite (`/admin/*`)
- **Executive Dashboard (`/admin/dashboard`)**: KPI metric cards, Recharts monthly financial trends, recent donation ledger, and unread inquiry alerts.
- **Donation & Financial Ledger (`/admin/donations`)**: Verify mobile/bank payments, search by reference, and export ledger to **CSV**.
- **Inquiries Inbox (`/admin/inquiries`)**: Read citizen inquiries, manage resolution states (`UNREAD`, `IN_PROGRESS`, `REPLIED`, `ARCHIVED`), and add internal notes.
- **News Manager (`/admin/news`)**: Full CRUD editor for press releases with markdown support and live preview.
- **Reports Catalog (`/admin/reports`)**: Upload and manage PDF publications and monitor citizen download counts.
- **Policies Manager (`/admin/policies`)**: Maintain bylaws and procurement regulations.
- **Audience Subscribers (`/admin/subscribers`)**: Manage quarterly bulletin subscribers with **CSV export**.

---

## 🔑 Offline Demo Credentials

You can test the entire admin suite without connecting a live database using the built-in local store:

- **Login URL**: [`/admin/login`](http://localhost:3000/admin/login)
- **Super Admin**: `admin@bhtf.bt` / `Admin@BHTF2026` *(or click the 1-Click Demo Login button)*
- **Media Editor**: `media@bhtf.bt` / `Admin@BHTF2026`

---

## 🛠️ Quick Start Guide

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 📜 License & Royal Charter

© 2026 Bhutan Health Trust Fund. All Rights Reserved.  
*Transparency · Accountability · Sustainability*
