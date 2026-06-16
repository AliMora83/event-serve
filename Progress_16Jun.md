# EventSaaS — Progress Snapshot
> **Date:** 16 June 2026  
> **Hosted at:** eventsaas.namka.cloud  
> **Built by:** Antigravity for Namka Events (South Africa)  
> **Session tool:** Claude Sonnet 4.6

---

## Current State Summary

Phase 1 is complete and live. All 9 core modules have been built and are functional as a high-fidelity HTML prototype (`eventsaas-mvp-app.html`) and Admin Panel (`admin-panel-demo.html`), with the React/TypeScript/Firebase codebase tracking the same structure.

---

## What's Built (Phase 1 — All ✅)

| Module | Route | Notes |
|--------|-------|-------|
| Login / Auth | `/login` | Email/Password + Google OAuth, auth guard via `AppLayout` |
| Dashboard | `/dashboard` | Stat cards, alerts, upcoming events, crew allocation, budget sparkline |
| Budget Hub | `/budget` | Line-item budgeting, ZAR + 15% VAT, vendor quotes table, AI estimator |
| Stock / Inventory | `/stock` | Equipment catalogue, condition tracking, conflict detection (Par64 double-booking shown) |
| Timeline & Crew | `/timeline` | Production Gantt chart, crew schedule with day rates, conflict badges |
| Proposals | `/proposals` | Per-event proposals, section-by-section sign-off status, proposal preview with digital sign-off CTA |
| Visual Engine (2D) | `/visual` | HTML5 Canvas floor-plan builder, click-to-place elements, AI layout prompt (Gemini), layout element list |
| Admin Panel | `/admin` | Role-gated; Firestore browser (8 collections), User management (RBAC), Audit log, Feature flags with tier control |
| Settings | `/settings` | Company profile, integrations panel (Firebase ✅, Xero ⬜, Gemini ✅, Vectorworks Phase 3) |

### Prototype Files
- `eventsaas-mvp-app.html` — Full MVP UI (all 6 production pages in one file, fully interactive nav + canvas)
- `admin-panel-demo.html` — Admin Panel with live Firestore browser, user management, audit log, feature flags

### Live Data in Prototype
- **3 active events:** Sunbird Festival (over budget, 2 500 pax), Cape Town Jazz Weekend (on track, 800 pax), Soweto Unplugged (pending sign-off, 1 200 pax)
- **6 crew members** with day rates and conflict detection (Naledi Phiri double-booked 14 Mar)
- **12 equipment items** with status (conflict on Par64 Cans)
- **Budget alerts:** Sunbird +18.9% over estimate (R684k vs R575k budget)
- **4 users:** admin (Ali Mora), 2 editors, 1 viewer/client

---

## Tech Stack (confirmed)

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript + Vite 7 |
| Styling | Tailwind CSS v4 (`@theme` tokens in `index.css`) |
| State | Zustand (auth, app, layout, AI stores) + TanStack React Query |
| Backend | Firebase Auth + Firestore (multi-tenant, org-scoped) |
| AI | Google Gemini API (`@google/generative-ai`) |
| PDF | `@react-pdf/renderer` + `jspdf` + `html2canvas` |
| Charts | Recharts |
| Canvas | HTML5 Canvas (2D floor-plan) |
| Icons | Lucide React |
| Routing | React Router DOM v7 |
| Currency | ZAR · VAT 15% |
| Hosting | VPS + Nginx + Docker · CI/CD via GitHub Actions |

---

## Design System (confirmed tokens)

| Token | Value |
|-------|-------|
| Font body | Plus Jakarta Sans |
| Font headings | Fraunces (serif, italic for page titles) |
| Brand | `#c2410c` |
| Background | `#f5f4f0` (warm cream) |
| Surface | `#ffffff` / `#faf9f7` |
| Ink | `#1c1917` / `#44403c` / `#78716c` / `#a8a29e` |
| Border | `#e2ddd8` / `#d4cec8` |
| Radii | `10px` default · `6px` small |
| Shadows | 3-tier warm-tinted (sm/md/lg) |

UI components in `src/components/ui/`: Alert, Avatar, Badge, Button, Card, ErrorBoundary, Input, Modal, ProgressBar, StatCard, Tabs (11 total).

---

## Firestore Data Model

```
/users/{uid}
/organisations/{orgId}
  /users/{userId}              ← RBAC: admin | editor | viewer
  /events/{eventId}
    /budgetLines/{lineId}
    /proposals/{propId}
  /budgetLines/{lineId}        ← top-level (cross-event queries)
  /equipment/{itemId}
  /crew/{memberId}
  /alerts/{alertId}
  /auditLog/{entryId}          ← immutable, append-only
  /featureFlags/{flagDoc}
```

---

## Next Steps — Phase 2

Priority order based on client value:

### 1. Client Portal & Proposal Sign-off (highest client impact)
- Shareable `/portal/:token` route — no login required for clients
- Section-by-section approval (Event Overview → Tech Spec → Budget → Floor Plan)
- Digital signature capture (draw or type)
- Status writes back to `proposals/{propId}` in Firestore
- Email notification on sign-off (links to Resend below)

### 2. Resend Email Automation
- Triggered emails: proposal sent, sign-off reminder, budget overrun alert, crew conflict alert
- Use Resend API (already referenced in feature flags UI)
- Firebase Cloud Functions or edge function to handle triggers
- Templates to match EventSaaS brand

### 3. PDF Export Polish
- Proposal PDF via `@react-pdf/renderer` — match proposal preview layout exactly
- Include: cover page, event summary, cost breakdown, floor plan image (canvas export), T&Cs
- Budget report PDF (line items + category totals)
- Floor plan export (canvas → PNG → PDF)

### 4. Xero Invoice Sync
- OAuth2 connect flow (already shown as "Connect" in Settings integrations)
- Push approved proposals → Xero draft invoices
- Sync budget actuals from Xero line items back to Firestore
- Map EventSaaS categories to Xero chart of accounts

### 5. 3D Preview (Three.js)
- Convert 2D canvas element positions → Three.js scene objects
- Realistic materials: stage deck, truss, LED wall panels
- Orbit controls for client walkthrough
- Export as MP4 or shareable 3D link
- Already flagged as "Phase 2" in Settings · Visual Engine tab exists

---

## Phase 3 Backlog (not started)

| Feature | Notes |
|---------|-------|
| Mobile PWA | Service worker, app manifest, offline-first |
| Offline mode | Firestore local persistence + sync queue |
| Advanced AI budgeting | Historical event data → cost predictions |
| Multi-org white-label | Custom domain, logo, colour per org |

---

## Key Conventions (must follow in every session)

1. All components: `.tsx`, Tailwind v4 `@theme` tokens only — no hardcoded hex
2. Firestore queries always scoped to `orgId` from `useAuthStore`
3. Zustand for UI/client state; TanStack Query for all Firestore reads/writes
4. Lucide React icons exclusively — no emoji in production components
5. Brand `#c2410c` as primary accent; warm-neutral palette throughout
6. `Fraunces` italic for page titles; `Plus Jakarta Sans` for all UI text
7. Admin routes must check `role === 'admin'` before rendering (already in `AppLayout`)
8. Audit log: every write operation must append an entry to `/auditLog`

---

## Open Questions / Decisions Needed

- [ ] **Xero vs QuickBooks** — client confirmed Xero? Double-check before building sync.
- [ ] **Client portal auth** — magic link (Resend) or public token URL? Token simpler for MVP.
- [ ] **3D preview delivery** — embedded in app or shareable link? Shareable preferred for client WOW factor.
- [ ] **VAT handling in proposals** — always 15%? Any zero-rated line items needed?
- [ ] **Multi-event conflict resolution UX** — currently just an alert; does the user want a booking calendar view?

---

## Files in This Project

| File | Purpose |
|------|---------|
| `eventsaas-mvp-app.html` | Full MVP prototype (all pages, interactive) |
| `admin-panel-demo.html` | Admin panel prototype (Firestore browser, users, audit, flags) |
| `EventSaaS_Master_Plan` | Architecture reference, data model, phase tracker |
| `Progress_16Jun.md` | This file — session snapshot for continuity |
