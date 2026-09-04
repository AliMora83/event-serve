# 🤖 AI Changelog — EventServe

> Append-only history. Newest entries first. One entry per sprint.
>
> Previously auto-maintained by `.github/workflows/update-master-date.yml`.
> That workflow was disabled on 2026-09-03 — see the entry below — so this file
> is now maintained by hand.

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
