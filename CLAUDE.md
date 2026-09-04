# EventServe Website — Agent Context

Auto-loaded by Claude Code. Read this first, every session.

## What this project is

A marketing website for **EventServe** (eventserve.co.za), a South African event
management company working in Johannesburg, Cape Town, Durban and Bloemfontein.

Four routes: Home, About, Partnerships, Contact.

Services is a **section on the homepage** at `/#services`, not a route, and is
not in the nav. Decided deliberately — the copy to justify a page doesn't
exist. `src/data/services.json` stays keyed by slug so `/services/[slug]`
remains a cheap v1.1 addition.

Founder: **Romeo Leko**. Company founded 2020; his 15+ years is personal
experience, not company age — the About page framing depends on that
distinction.

**It is not** a QR check-in app, a pass generator, or a SaaS product. Earlier
versions of `Master.md` in this repo described a different product entirely.
That metadata was wrong and has been corrected. If you find references to
PDF.js, QR scanning, staff auth or `pass.namka.org` anywhere in this repo,
they are stale — flag them.

## Stack

| | |
|---|---|
| Framework | Astro 5, static output |
| Styling | Vanilla CSS custom properties (`src/styles/tokens.css`). **No Tailwind** |
| Fonts | Montserrat 400/600/700, loaded via `<link>` in `BaseLayout` |
| JS framework | **None.** No React, no View Transitions. The only client JS is `motion.js` |
| Images | `src/assets/` through `astro:assets`. **Not** `public/` |
| Forms | Web3Forms → `info@eventserve.co.za`. `DEPLOY_ENV=production` **fails to build** without `PUBLIC_WEB3FORMS_KEY`; local and `deploytest` builds run keyless and render the form disabled |
| Package manager | npm |
| Hosting | HostAfrica, shared cPanel, Apache/LiteSpeed |
| Staging | **None.** See "The live site" below |
| Repo | AliMora83/event-serve |

## Documents

| File | Purpose |
|---|---|
| `CLAUDE.md` | This file. Agent entry point |
| `PROJECT.md` | Six-sprint delivery plan. **Canonical for scope** |
| `SPRINT-*.md` | Per-sprint task prompts |
| `Master.md` | MACP status file, read by the namka-control dashboard |
| `AI_CHANGELOG.md` | Append-only history. Add an entry every sprint |
| `README.md` | Human-facing setup |

`PROJECT-SYNC.json` was deleted and its workflow disabled — it emitted hardcoded
data about a product that doesn't exist here. Do not recreate it by hand. If
namka-control turns out to read it, rebuild the workflow properly.

## Hard rules

**Never hardcode a colour, font size or spacing value.** Everything goes
through `src/styles/tokens.css`. The previous build's contrast failures came
from per-section values drifting apart.

**Borders have two tokens.** `--c-hairline` is decorative only. Anything that
is the sole visual affordance of a UI control — form field borders above all —
uses `--c-field-border`, which meets WCAG 1.4.11's 3:1 non-text threshold.

**Three crimsons, three jobs.** Using the wrong one is the specific bug being
fixed:
- `--c-crimson` `#AA2A3B` — fills only: buttons, bars, the star glyph
- `--c-crimson-hover` — hover states
- `--c-crimson-text` — crimson type on dark. The other two fail AA at 4.5:1

**Reduced motion is handled globally** at the foot of `src/styles/motion.css`
and checked in `src/scripts/motion.js`. Never add motion that bypasses it.

**Parallax budget is two bands site-wide**, both on the homepage: the hero
(`bg-01.jpg`) and the partnerships band (`sasa-image.jpeg`). A third makes it
read as decoration.

Cut from three in Sprint 1.1. Only two photographs in the library are wide
enough to back a full-bleed band — everything else is a 900x500 web export —
and the `/partnerships` band now uses `SolidBand.astro`, a solid crimson
treatment with the star motif. A knowingly soft photograph reads as an
oversight; a solid band reads as a choice. If original photography arrives,
restoring it is a one-line swap **and** a reopening of this budget, not just
a swap.

**The live site is the only environment.** eventserve.co.za is the client's
sole web presence and there is no staging subdomain. The first production
deploy REPLACES it, so it happens once, on cutover day, by hand. The deploy
workflow is `workflow_dispatch` only — **never add a push trigger** — and
until cutover the only permitted target is `deploytest`, which writes to
`public_html/_deploytest/`.

**Never touch DNS or MX records.** `info@eventserve.co.za` is a mailbox on the
same hosting. Mail routing is out of scope for every sprint.

**Ask before installing a dependency** that isn't already in `package.json`.

## Verified facts that contradict older documents

These were established by audit. Trust them over anything else in the repo:

- The old contact form **never worked**. It used Netlify Forms while the site
  was hosted on HostAfrica. No submission has ever been delivered.
- Deploy is **not** Cloudflare or Netlify auto-deploy. It's cPanel.
- The "86 source images" figure counted more than photographs. Actual: 82
  PNG/JPG photos, 3 unreferenced GIFs and Vite's default `react.svg`.
  Sprint 1.1 staged **72** of them to `src/assets/` (38MB) after dropping 9
  byte-identical duplicates and one file that turned out to be a 94-byte
  HTML 403 page saved with a `.jpg` extension. Images belong in
  `src/assets/`, never `public/` — the exceptions are `favicon.svg` and
  `og-default.jpg`, which must be plain static URLs.
- `show_jan.mp4` (29MB) is not deployed; it goes to Vimeo. Until that URL
  exists the file **stays at `legacy/public/show_jan.mp4`** — it is the only
  findable copy and the client needs it to do the upload.
- `.agent/` contains one file and syncs nothing. It is **not** the source of the
  stray documents — don't re-investigate it. Antigravity's workspace-level
  config is the remaining suspect.
- Three wrong-product documents have surfaced in this repo (`Master.md`,
  `README.md`, `Progress_16Jun.md`). If a fourth appears, flag it — something
  in the workspace copies docs between projects.

## Working style

Report findings before making large changes. If something in these documents
conflicts with what you find in the code, say so rather than working around
it — the audit that established the facts above did exactly that, and the
brief was wrong.

Run the `diff-review-gate` skill before any sprint-closing commit.
