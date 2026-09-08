# Events Serve Website — Agent Context

Auto-loaded by Claude Code. Read this first, every session.

## What this project is

A marketing website for **Events Serve** (eventsserve.co.za), a South African event
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
| Forms | Web3Forms → `info@eventsserve.co.za`. A build with `CONTEXT=production` **fails** without `PUBLIC_WEB3FORMS_KEY`; local, deploy-preview and branch-deploy builds run keyless and render the form disabled. **The key currently returns 400 — see PROJECT.md open issues** |
| Package manager | npm |
| Hosting | **Netlify.** Build `npm run build`, publish `dist`, config in `netlify.toml`. Was Afrihost cPanel/FTPS until 2026-09-08 |
| Staging | Netlify deploy previews on pull requests. See "Deploying" below |
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
- `--c-crimson` `#931E2E` — fills only: buttons, bars, the star glyph
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

**Deploying — Netlify, and auto-publishing is LOCKED.** The production branch
is `main`. A push to `main` triggers a build, but **that build does not go
live**: auto-publishing is turned off in the Netlify UI, and promoting a
successful build to production is a deliberate manual step someone takes in
the dashboard.

This is the safety property that the old workflow got from being
`workflow_dispatch` only. It is now a Netlify setting rather than a line in a
YAML file, which means **it cannot be enforced by anything in this repo** —
if someone re-enables auto-publish, every push to `main` goes straight to the
client's only web presence. Do not turn it on. If you are asked to, say what
it costs first.

Pull requests get deploy previews. Netlify serves those with
`X-Robots-Tag: noindex` by default (verified 2026-09-08), so a preview will
not be indexed as a duplicate of the live site.

`PUBLIC_WEB3FORMS_KEY` is set in the Netlify site environment variables for
all contexts, not in the repo.

**The FTPS/cPanel pipeline is gone.** `.github/workflows/deploy.yml`,
`public/.htaccess`, the `_deploytest` target and the SSH investigation before
it were all removed on 2026-09-08. Do not reintroduce any of it, and do not
add a GitHub Actions deploy workflow — Netlify builds from the repo itself.

**Never touch DNS or MX records.** `info@eventsserve.co.za` is a mailbox on the
**Afrihost** hosting, which still handles mail for the domain even though the
website now builds on Netlify. Moving the site did not move the mail. Mail
routing is out of scope for every sprint.

**Ask before installing a dependency** that isn't already in `package.json`.

## Verified facts that contradict older documents

These were established by audit. Trust them over anything else in the repo:

- The old contact form **never worked**. It used Netlify Forms while the site
  was hosted on Afrihost cPanel. No submission has ever been delivered.
- The contact form has failed silently **twice**. After the Web3Forms port it
  spent four days serving an enabled form with an empty `access_key`, which
  returns HTTP 200 and delivers nothing — the visitor sees a success banner.
  This is why `ContactForm.astro` keeps a fail-closed CI backstop alongside
  the `CONTEXT` check. Do not simplify that logic away.
- Deploy is Netlify, building from `main`, with **auto-publish off**. It was
  Afrihost cPanel over FTPS until 2026-09-08; SSH was tried on that package
  and was unavailable. None of that applies any more.
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
