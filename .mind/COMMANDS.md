# BHTF — Dev Commands & Workflow

## Quick Start

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Configure environment
cp .env.example .env
# Edit DATABASE_URL and JWT_SECRET in .env

# 3. Generate Drizzle client
npm run db:generate

# 4. Push schema to PostgreSQL (or run migrations)
npm run db:push

# 5. Seed default data (admin user + content)
npm run db:seed

# 6. Start development server
npm run dev
# → http://localhost:3000 (or configured port)
```

## Build & Production

```bash
# TypeScript type check (must pass before deploy)
npx tsc --noEmit

# Production build
npm run build

# Start production server (Nitro SSR)
npm run start
# → http://localhost:6060

# Preview build locally
npm run preview
```

## Database Operations

```bash
# Generate Drizzle migrations from schema changes
npm run db:generate

# Push schema changes directly (dev shortcut)
npm run db:push

# Run migrations (production-safe)
npm run db:migrate

# Seed data
npm run db:seed

# Check DB connectivity
npm run db:check
```

## Code Quality

```bash
# Lint
npm run lint

# Format
npm run format
```

## PM2 (Production)

```bash
# Start cluster
pm2 start ecosystem.config.cjs

# Status
pm2 status

# Logs
pm2 logs bhtf-platform

# Zero-downtime reload
pm2 reload bhtf-platform
```

---

## Environment Variables Reference

| Variable       | Example                                         | Required                             |
| -------------- | ----------------------------------------------- | ------------------------------------ |
| `DATABASE_URL` | `postgresql://user:pass@localhost:5432/bhtf_db` | Yes (falls back to memory if absent) |
| `JWT_SECRET`   | `<random 64-char string>`                       | Yes                                  |
| `NODE_ENV`     | `development` / `production`                    | Yes                                  |
| `PORT`         | `6060`                                          | Yes (production)                     |

---

## Important Notes for AI Agents

1. **TanStack Router file-based** — adding a route means creating a file in `src/routes/`. The `routeTree.gen.ts` regenerates automatically on next dev start — never edit it manually.
2. **TypeScript strict** — all code must pass `npx tsc --noEmit` with 0 errors.
3. **Drizzle ORM only** — no raw SQL strings in application code. Use Drizzle query builder.
4. **Server functions** — data fetching happens in `src/lib/api/` server functions, not in REST endpoints. Import them directly into route loaders.
5. **In-memory fallback** — the DB layer gracefully falls back to seed data if PostgreSQL is unavailable. Don't remove this behaviour.
6. **Tailwind v4** — uses OKLCH colour space. Standard Tailwind v3 class names may differ. Check `src/styles.css` for custom tokens.
7. **Radix UI** — all interactive primitives (dialogs, dropdowns, tabs) come from `@radix-ui/*`. Do not add a second component library.
8. **Sonner toasts** — use `toast.success()` / `toast.error()` for all user feedback. Never use `alert()`.
9. **Donation references are immutable** — once `BHTF-DON-XXXXXX` is issued, it cannot be changed or deleted.
10. **Admin authentication** — always verify session in admin route loaders. Never trust client-side state alone.
11. **CSV exports** — donations and subscribers support CSV. Maintain this for any new data tables that admins manage.
