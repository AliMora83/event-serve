# 🤖 AI Changelog — EventServe

> Append-only history. Newest entries first. One entry per sprint.
>
> Previously auto-maintained by `.github/workflows/update-master-date.yml`.
> That workflow was disabled on 2026-09-03 — see the entry below — so this file
> is now maintained by hand.

---

## v0.1 — 2026-09-04 — Sprint 1.1, Foundation

Astro 5 installed and running at the repo root; the old Vite/React build is
preserved in `legacy/`. Four routes build clean. Nothing is deployed.

### Decision A — Tailwind dropped, vanilla CSS custom properties

Four colours and a font name is not a migration. Contrast ratios were
re-derived independently rather than accepted from the brief, and every figure
reproduced exactly:

| Token | Value | On `#0F0E0E` | Verdict |
|---|---|---|---|
| `--c-crimson` | `#AA2A3B` | **2.85:1** | Fails body AND large text. Fills only |
| `--c-crimson-hover` | `#C4374A` | 3.66:1 | Hover states only |
| `--c-crimson-text` | `#E8657A` | 6.03:1 | Passes. All crimson type |
| `--c-text` | `#F3F4F6` | 17.51:1 | Passes |
| `--c-text-muted` | `#B0ADAD` | 8.65:1 | Passes |
| `--c-text-faint` | `#8A8686` | 5.36:1 | Passes |
| `--c-error-text` | `#F0798C` | 7.18:1 | Passes |
| White on `#AA2A3B` | `#FFFFFF` | 6.77:1 | Buttons pass |

`bgLight: #f2f2f2` had **zero** occurrences in the old build. No token needed.

**A fourth token was added.** `--c-hairline` `#2C2929` measures 1.26:1 against
`--c-surface`, and the contact form's fields were identifiable *only* by that
border — a WCAG 1.4.11 failure, since the field fill is itself 1.06:1 against
the page. `--c-field-border` `#6B6767` (3.26:1) now carries any border that is
the sole affordance of a control. `--c-hairline` stays for decorative rules,
which convey nothing and are exempt.

### Decision B — superseded before implementation

`Master.md` stays, rewritten. Handled in `DOC-CLEANUP.md`.

### The form finding, carried forward into a build-time guard

The old form never delivered a message (see v2.0.0). The replacement is
Web3Forms, and the failure mode is now structurally impossible to ship
quietly: a `DEPLOY_ENV=production` build **fails** without
`PUBLIC_WEB3FORMS_KEY`, with CI as a fail-closed backstop. Local and
`deploytest` builds run keyless and render the form **visibly disabled** — no
`access_key` field, every control disabled, a notice pointing at the email
address and phone numbers. What never renders under any configuration is a
form that posts an empty `access_key`, which Web3Forms answers with a 200
while delivering nothing.

**Sprint 1 does not close until a test enquiry physically arrives.** It has
not. The key requires the client to confirm an activation email.

### Findings that changed the plan

- **"Keep the gallery subfolder copies only" would have deleted the live
  imagery.** `gallery/1.png`–`10.png` are not duplicates, and the old
  `WorkHighlightsSection.jsx` globbed `assets/gallery/*.png` *non-recursively* —
  those ten are exactly what visitors saw. The 50 subfolder images were never
  displayed. Only 9 byte-identical files were dropped, verified by md5.
- **The "corrupt" screenshot is a 94-byte HTML 403 page** saved with a `.jpg`
  extension. A download that failed silently. Some intended image was never
  obtained.
- **"86 source images" = 82 photographs + 3 unreferenced GIFs + Vite's default
  `react.svg`.** 72 were staged after de-duplication.
- **Only 2 of 72 images can back a full-bleed band** (3600×2401 and 1920×1320;
  49 are 900×500 web exports). The design wanted three parallax bands. **The
  budget was cut to two** — `/partnerships` uses a solid crimson treatment with
  the star motif. A knowingly soft photograph reads as an oversight; a solid
  band reads as a choice.
- **The old hero was `show_jan.mp4`**, not a photograph — 29MB of SD video
  autoplaying on the homepage.
- **`favicon.svg` was referenced but did not exist**, 404ing on every page.

### Also

- View Transitions dropped: 15.4KB of client JS for a cosmetic fade. The build
  now emits **zero** `.js` files; client JS is 2.4KB of inlined `motion.js`.
- `@astrojs/sitemap` added (approved). Four routes, 404 filtered.
- `.htaccess`, `robots.txt`, `404.astro`, `og-default.jpg`, `favicon.svg`.
- Deploy is `workflow_dispatch` **only**. eventserve.co.za is live and is the
  client's only web presence, so the first production deploy replaces it. Until
  cutover the only permitted target is `deploytest`, which is blocked outright
  by `.htaccess` and verified over SSH rather than HTTP.
- Whole site builds to 2.2MB with no broken image references.

### Not done — all blocked on external access, not on work

Web3Forms key and a delivered test enquiry; SSH secrets and the deploy test;
the production cutover. Hyundai and African Bank logos, vector brand artwork,
original-resolution photography and the gallery-to-event mapping for alt text
are all requested from the client.

---

## v2.0.0 — 2026-09-04 — Document cleanup (pre-Sprint 1)

Documentation and repo hygiene only. No application code changed. The Astro
scaffold under `eventserve/` is staged but **not** installed; that is Sprint 1.

### Three findings that must not be rediscovered the hard way

**1. `Master.md` described a completely different product.** Every version of
this file up to 2026-09-03 documented "Event Serve — Mobile Check-in & Passes":
QR scanning, PDF ticket generation via PDF.js, staff authentication, offline
check-in queues, and real-time sync with EventSaaS. Phase 1 was marked complete
and Phase 2 half-done. **None of that has ever existed in this repository.**
The metadata arrived from another project.

`Master.md` has been rewritten to describe the actual product and **stays** in
the repo; MACP is the workspace convention and namka-control expects the file.

**2. The contact form has never delivered a single message.** The old build
used Netlify Forms (`data-netlify="true"` plus a hidden blueprint form in
`index.html`) while the site is hosted on **HostAfrica shared cPanel**. Netlify
Forms only functions on Netlify. Compounding it, the React `handleSubmit` never
called `preventDefault()` and set the success state unconditionally, so every
visitor who submitted an enquiry since January saw "Thank you for contacting
us!" while nothing was sent anywhere. The honeypot was inert too — the blueprint
declared `netlify-honeypot="bot-field"` but the live form had no such field.

Replacement is Web3Forms to `info@eventserve.co.za`. Sprint 1 does not close
until a test enquiry has physically arrived.

**3. Three wrong-product documents have now surfaced in this repo.** All three
are archived together, outside every project folder, at:

```
~/dev/AntiG/_archive/events-website-strays/
```

| File | What it actually was |
|---|---|
| `Master.recovered-from-events-website.md` | The pre-rewrite `Master.md`. Recovered via `git show 6f3ad3b:Master.md`, byte-identical to `origin/main:Master.md` |
| `Progress_16Jun.md` | An **EventSaaS** progress snapshot — `eventsaas.namka.cloud`, React 19 / Firebase / Gemini, nine modules. Arrived via commit `657beaa` |
| `README.md` (overwritten in place) | The **Atlas Conference** project's links table |

The first two are parked, not merged into anything. Whoever owns those projects
decides whether they are live status or abandoned thinking. If a fourth
wrong-product document appears, something in the workspace is copying files
between projects and that is the thing to fix.

### Workflows disabled

All three automations bot-committed or auto-pushed to `main`, and would have
fought every sprint-closing push. Each is renamed with a header giving the
reason and the revisit condition.

| Was | Now | Why |
|---|---|---|
| `.github/workflows/generate-project-sync.yml` | `.yml.disabled` | Hardcoded `pass.namka.org`, a `PDF.js` stack and repo `AliMora83/Events-Website` (actual remote: `AliMora83/event-serve`) — all describing the non-existent check-in app |
| `.github/workflows/update-master-date.yml` | `.yml.disabled` | Rewrote `Master.md` and prepended to this file automatically. Never ran — it was uncommitted, and would have `exit 1`'d on the old `Master.md` anyway |
| `.agent/workflows/commit.md` | `.md.disabled` | `git add .` → generic commit message → `git push origin main`, several steps marked `// turbo`. Its `npm run lint` target does not exist in the Astro scaffold |

`.agent/` contained nothing else — one file, no sync mechanism, and it was
first tracked by this cleanup. `PROJECT-SYNC.json`, the first workflow's
output, is deleted. Removal is deliberately *not* permanent: nobody has yet
confirmed whether namka-control reads `PROJECT-SYNC.json` or `Master.md`, and
deleting the wrong one drops this project off the dashboard silently. Revisit
after v1.0.

### Scope changes landing with the v3 scaffold

- **Four routes, not five.** Home, About, Partnerships, Contact. Services is a
  homepage section at `/#services`, out of the nav, because the copy to justify
  a page does not exist. `src/pages/services.astro` deleted;
  `src/data/services.json` stays keyed by slug so `/services/[slug]` remains a
  cheap v1.1 addition. This is the main SEO cost of the current shape
- **No JS framework.** React and `lottie-react` dropped entirely. The 14 Lottie
  animations become static SVG. Nothing hydrates — the scaffold's only
  dependencies are `astro` and `sharp`
- **Founder is Romeo Leko.** Company founded 2020; his 15+ years is personal
  experience, not company age. The About page framing depends on that distinction
- **Logo permissions approved** for Hyundai, SASA, African Bank and MTN

### Also changed

- `CLAUDE.md` added at repo root, replacing `AGENT-ONBOARDING.md` (deleted)
- `PROJECT.md` added — now a 15-working-day, six-sprint plan. Canonical for scope
- `SPRINT-1.1.md`, `DOC-CLEANUP.md` added
- `README.md` replaced
- `.env.example` added (`PUBLIC_WEB3FORMS_KEY`, empty)
- `.gitignore` gained `.astro/`, `.env` and `.env.production`
- `yarn.lock` deleted — both lockfiles were present; `package-lock.json` is
  newer and matches the installed tree, so npm is the de-facto package manager
- Stale Feb-2026 `dist/` (43MB) deleted
- Scaffold gained `src/assets/README.md`; its `public/images/` stubs are gone

### Recovered during this cleanup

The `v1.0.0` entry below was **silently dropped** by an uncommitted rewrite of
this file — the same class of content loss that truncated `Master.md`. It has
been restored from `git show 6f3ad3b:AI_CHANGELOG.md`.

---

## v1.0.1 — 2026-04-01
- Infrastructure standardization: MACP v2.0 deployment
- Initialized automated AI_CHANGELOG.md
- Configured real-time sync with Namka Control
- Automated versioning workflows

## v1.0.0 — 2026-03-24
- Initial project scaffolding with Vite, Tailwind, and PDF.js
- *(Recorded under the previous table format as: "Initial project scaffolding
  with Vite, Tailwind, and PDF.js." / `initial-setup`. Note the PDF.js
  reference — this entry predates the discovery that the check-in-app metadata
  did not belong to this repo.)*
