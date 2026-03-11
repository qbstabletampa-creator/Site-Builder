# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS v4

## The QB Stable Website

A high-performance quarterback training institution website. Brand: "technical lab meets high-end consulting firm."

### Design System
- **Colors**: Pure Black (#000000), Stark White (#FFFFFF), Vegas Gold (#C5B358)
- **Fonts**: Playfair Display (all headers/serif), Inter (body/data/sans-serif)
- **Visual Language**: 1px blueprint borders, HUD-style overlays, generous white space
- **Responsive**: Desktop = professional dossier, Mobile = fast single-column scroll

### Pages
- `/` — Homepage (Hero, Telemetry Bar with count-up, Alumni Ticker, Authority Statement, Services Grid, Stable Standard, Review Vault, FAQ + Intake Form)
- `/academy` — Elite Development service page with pricing layout
- `/exposure` — Collegiate Exposure service page with pricing layout
- `/consulting` — Strategic Consulting service page with pricing layout
- `/faq` — Institutional deep-dive FAQ page

### Key Components
- `src/components/Navbar.tsx` — Sticky nav with mobile hamburger menu
- `src/components/Footer.tsx` — Site-wide footer
- `src/components/home/HeroSection.tsx` — Full-screen hero with video/image background
- `src/components/home/TelemetryBar.tsx` — Animated count-up stats on scroll
- `src/components/home/AlumniTicker.tsx` — Auto-scrolling NFL team logo ticker with edge fades
- `src/components/home/AuthorityStatement.tsx` — Black section with gold authority text
- `src/components/home/ServicesGrid.tsx` — Three service cards with HUD-style image placeholders
- `src/components/home/StableStandard.tsx` — 2x2 differentiator grid with 1px borders
- `src/components/home/ReviewVault.tsx` — Testimonial placeholder section
- `src/components/home/FaqIntake.tsx` — FAQ accordion + intake application form

### SEO
- Primary targets: "Quarterback Training Tampa, FL", "Florida QB Academy"
- Secondary targets: "Quarterback Drills & Biomechanics", "Quarterback Highlights & Recruiting"
- Meta tags, OG tags, and proper heading hierarchy on all pages

### Pending (User Will Provide)
- Hero background video (currently using screenshot placeholder)
- NFL team logo images (currently using colored circles)
- Real testimonials for Review Vault
- Real training photos for service cards
- Contact/social media links

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── web/                # The QB Stable React + Vite frontend
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — only emit `.d.ts` files during typecheck
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/web` (`@workspace/web`)

The QB Stable React + Vite frontend. Routes: /, /academy, /exposure, /consulting, /faq

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/`.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

### `lib/api-spec` (`@workspace/api-spec`)

OpenAPI 3.1 spec and Orval codegen config. Run: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks from the OpenAPI spec.

### `scripts` (`@workspace/scripts`)

Utility scripts. Run via `pnpm --filter @workspace/scripts run <script>`.
