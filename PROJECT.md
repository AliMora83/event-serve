# Events Serve Website Rebuild — Project Plan

**Client:** Events Serve (eventsserve.co.za)
**Stack:** Astro 5, static output, deployed to Netlify
**Build tools:** Claude Code (repo, terminal, refactors) + Antigravity IDE (UI work, browser-verified changes)
**Approach:** Port with fixes. Same structure and identity as the current site, corrected content, contrast and performance. Not a redesign.
**Timeline:** 15 working days, full-time. Launch target: 3 weeks from Sprint 1.
**No React.** Lottie animations are replaced with static SVG, so nothing hydrates.
**Routes:** Home, About, Partnerships, Contact. Services is a homepage section (`/#services`), not a route.
**Founder:** Romeo Leko

---

## Working agreements

**Push to the repo at the end of every sprint. No exceptions.**

Each sprint closes with a merge to `main` and a tagged commit. Six sprints, six tags. This is what makes a mid-project handover survivable and gives you a rollback point if a sprint turns out to have been a wrong turn.

```bash
git checkout -b sprint/<n>-<short-name>
# ... work ...
git add -A
git commit -m "sprint <n>: <what changed>"
git checkout main && git merge --no-ff sprint/<n>-<short-name>
git tag -a v0.<n> -m "Sprint <n> complete"
git push origin main --tags
```

Run the `diff-review-gate` skill before each sprint-closing commit. It's already in your Claude Code environment and this is exactly the case it's for.

### Tool split

| Work type | Tool | Why |
|---|---|---|
| Scaffolding, refactors, dependency and config changes | Claude Code | Repo-wide edits, terminal access, git |
| Component styling, layout, visual iteration | Antigravity IDE | Faster loop when you need to see the change |
| Motion tuning, scroll behaviour | Antigravity IDE | Needs a live browser to judge |
| Content wiring, JSON data, SEO metadata | Claude Code | Text-heavy, no visual feedback needed |
| Accessibility and performance audits | Either | Whichever has the browser open |

Keep one tool per branch at a time. Two agents editing the same working tree produces conflicts that are tedious to unpick.

---

# Phase 1 — Foundation and homepage

**Days 1–7.** Outcome: homepage complete and provable via `deploytest`, all images optimised, form delivering.

## Sprint 1 — Foundation *(day 1)*

Docs cleanup, scaffold installed, old build moved to `legacy/`, images staged.
Deploy pipeline and host config. Web3Forms wired and **verified by a delivered
message**.

*(Historical: this sprint built an FTPS/cPanel pipeline with a `deploytest`
target and an `.htaccess`. Both were removed on 2026-09-08 when the site moved
to Netlify. See "Deploy" above.)*
Confirm the new tree has no React: `@astrojs/react`, `lottie-react` and `gradflow`
live in the **old** build's `package.json`, which moves to `legacy/`. Nothing to
remove from the Astro scaffold — dependencies there are `astro` and `sharp` only.
Still worth checking what `gradflow` did, in case a component in the port relied on it.

**Done when:** a deploy preview builds clean, four routes resolve, and a test enquiry reaches the client's inbox. **Still open** — Web3Forms returns 400; see Open issues.
**Tag `v0.1`.**

### gradflow — reproduce in CSS, Sprint 3

`gradflow` was an animated gradient backdrop behind the work-highlights
carousel in the old build (`WorkHighlightsSection.jsx`), configured with three
dark-red stops. Nothing structural depended on it and it is not being ported as
a dependency. Sprint 3 reproduces the effect in CSS if it is still wanted; it
must respect the global `prefers-reduced-motion` block either way.

### Video — pending Vimeo upload

`show_jan.mp4` (29MB) is not deployed. It goes to Vimeo and the page embeds
from there.

    VIMEO_URL = TODO_VIMEO_URL

**The file stays at `legacy/public/show_jan.mp4` until that URL exists.** It is
the only findable copy and the client needs it to do the upload. Do not remove
it as part of any image or asset cleanup.

Sprint 2 stubs the embed with a poster frame.

### Deploy pipeline — configuration required

The site is hosted on **Netlify**, connected to this repo. There is no deploy
workflow in `.github/workflows/` and there should not be one — Netlify builds
from the repository itself.

| | |
|---|---|
| Production branch | `main` |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Config | `netlify.toml` at the repo root |
| Node | 22, pinned in `netlify.toml` rather than the dashboard |

**Auto-publishing is LOCKED.** A push to `main` builds, but the build does not
go live. Promoting it to production is a manual step in the Netlify UI.

This replaces the safety property the old workflow had from being
`workflow_dispatch` only, and it is worth being explicit about what changed:
that rule lived in a file in this repo and was reviewable in a diff. This one
is a toggle in a dashboard. Nothing in the repo can enforce it or even detect
that it has been changed. If auto-publish is ever switched on, every push to
`main` goes straight to the client's only web presence with no human step in
between.

**Deploy previews.** Pull requests get a preview build at a `*.netlify.app`
URL. Netlify serves these with `X-Robots-Tag: noindex` by default (verified
2026-09-08), so a preview is not indexable as a duplicate of the live site.
Note that `astro.config.mjs` sets `site: 'https://eventsserve.co.za'`, so
canonical URLs and the sitemap in a preview build still point at the live
domain. That is correct for the production build and harmless in a preview
that crawlers are told to ignore.

**Environment variables** (Netlify → Site configuration → Environment
variables):

| Variable | Scope | What it is |
|---|---|---|
| `PUBLIC_WEB3FORMS_KEY` | All contexts | Web3Forms access key. A build with `CONTEXT=production` **fails** without it |

Netlify sets `CONTEXT` itself, to `production`, `deploy-preview` or
`branch-deploy`. Nothing needs to set it, and nothing should.

**What the key gate does.** `src/components/ContactForm.astro` requires the key
when `CONTEXT=production`, and keeps a fail-closed backstop for a build in some
other CI where `CONTEXT` is absent. Local builds run keyless and render the
form visibly disabled with a note telling the visitor to email instead. The one
thing it will never do is render an enabled form with an empty `access_key` —
see the open issue below for why that matters.

### The FTPS pipeline, and what replaced each part of it

Removed on 2026-09-08. Recorded here so nobody rebuilds it:

| Old | Now |
|---|---|
| `.github/workflows/deploy.yml`, FTPS via `SamKirkland/FTP-Deploy-Action` | Netlify builds from `main` |
| `deploytest` target writing to `public_html/_deploytest/` | Netlify deploy previews on pull requests |
| `cleanup-deploytest` clean-slate wipe | Nothing to clean up |
| `workflow_dispatch` only, no push trigger | Auto-publish off in the Netlify UI |
| `public/.htaccess` — headers, caching, HTTPS, 404, compression | `netlify.toml` for headers and caching; Netlify does HTTPS, 404 and compression itself |
| lftp verification of the upload | Netlify's own build and deploy log |
| `DEPLOY_ENV=production` gating the form key | `CONTEXT=production` |
| Secrets `FTP_HOST` / `FTP_USER` / `FTP_PASSWORD`, vars `FTP_*_DIR` | Deleted from GitHub separately |

SSH was investigated on the Afrihost package before FTPS and was unavailable —
every port timed out while cPanel answered on 2083. That finding is now moot
and is recorded only so it is not re-investigated.

## Open issues

### Web3Forms returns 400 — the contact form does not deliver

**Unresolved as of 2026-09-08.** The access key is present and is a well-formed
UUID, but `POST https://api.web3forms.com/submit` returns **HTTP 400**. The
form therefore does not deliver, and the site should not be treated as having
a working contact path until this is fixed.

Suspected cause: the key was generated but never activated. Web3Forms sends an
activation email to the address the key was created against
(`info@eventsserve.co.za`) and the key does not work until someone clicks it.
The client controls that mailbox.

Next step is to confirm activation with the client before assuming anything is
wrong with the integration code.

This matters more than a normal open issue because of the history. The form has
now failed **silently** twice:

1. The original Netlify Forms setup ran for nine months on a host that was not
   Netlify. Every submission returned a success banner and went nowhere.
2. After the Web3Forms port, the live site spent four days serving an enabled
   form with an empty `access_key`. Web3Forms answers that with a **200** and
   delivers nothing — so again, a success banner and no enquiry.

Both failures looked like success from the outside. A 400 is at least loud.
Do not "fix" it by suppressing the error or by rendering the form as if it
worked; the gate in `ContactForm.astro` exists precisely to make a
non-delivering form visibly non-delivering.

## Sprint 2 — Shared components *(days 2–4)*

Port from `legacy/src/components/`: Navbar, Footer, Hero, Marquee, ExperienceStats,
WhatWeOffer grid, Clientele logos, Testimonials.

Fixes applied during the port, not after:
- Every colour through `tokens.css`. `#AA2A3B` measures 2.85:1 on `#0F0E0E` and is **fills only**
- Testimonials on dark cards — the white cards with grey text were the worst contrast failure
- Client logos normalised to one height, greyscale until hover
- Work Highlights gets visible scroll controls and keyboard access
- The 14 Lottie animations become static SVG icons
- Scroll reveals come free from the scaffold — no separate motion work

**Done when:** every shared component renders on a scratch route with real tokens.
**Tag `v0.2`.**

## Sprint 3 — Homepage and images *(days 5–7)*

Assemble the homepage. Stats read 150+ / 15+ years industry experience / 70% repeat clients.
Impact section removed — it becomes the Partnerships band linking to `/partnerships`.
`show_jan.mp4` embedded from Vimeo with a poster frame.

Image migration, all 86 files:
- Into `src/assets/`, served through `astro:assets`
- Drop the 9 byte-identical duplicates and the corrupt screenshot
- Real alt text on every one. This is the slow part — budget for it
- `sasa-image.jpeg` at full resolution for the partnerships band

**Done when:** the homepage matches the old one minus Impact, with no contrast failures and no unoptimised PNGs.
**Tag `v0.3`.**

---

# Phase 2 — Pages and launch

**Days 8–15.** Outcome: four routes live on the production domain.

## Sprint 4 — Partnerships *(days 8–9)*

Page hero, trimmed intro, partner cards, six approach points, image band, CTA.
Brand name normalised throughout the source copy. **Direction reversed on
7 Sep 2026:** this line originally read *"Events Serve" corrected to
"EventServe"*. The client's brand is the **two-word** form, which the logo
artwork itself sets as "Events" over "SERVE", so the rename ran the other way —
one word to two, 23 occurrences across `src/` and `public/`.

Ships with brand names as text if logo permissions haven't arrived.
Ships with two cards if African Bank still has no concrete fact.

**Done when:** the page reads as a pitch to brands, and every claim on it is defensible.
**Tag `v0.4`.**

## Sprint 5 — About and Contact *(days 10–11)*

About: existing copy, founder paragraph naming Romeo Leko, Impact section moved
here, cities served.
Contact: form, details, service-area line.

Shorter than planned — the Services route was cut, so this sprint has slack.
**Spend it on Sprint 3 overrun**, which is the likeliest place to lose time.

**Tag `v0.5`.**

## Sprint 6 — Polish *(days 12–13)*

Parallax tuned on two bands (budget cut from three in Sprint 1.1), tested on real iOS and Android.
Full pass with reduced motion enabled.
Lighthouse, target 90+ mobile.
Keyboard and screen reader walkthrough. Contrast audit against final content.
SEO: titles, descriptions, sitemap, robots.txt, structured data. 404 page. Analytics.

**Tag `v0.6`.**

## Days 14–15 — Review and cutover

**Not work days.** Client review, fixes, then publishing the build in the Netlify UI — auto-publish is off, so going live is an explicit action.

Do not touch DNS or MX records. `info@eventsserve.co.za` is a mailbox on the Afrihost hosting, which still handles mail for the domain even though the website has moved to Netlify.

Post-launch: verify the form on the production domain.
**Tag `v1.0`.**

---

## Content requests — send day 1

Every item degrades gracefully except the last, which blocks.

| Needed | Status |
|---|---|
| Founder's name | ✅ Romeo Leko |
| Logo permissions (Hyundai, SASA, African Bank, MTN) | ✅ Approved |
| Service descriptions | ✅ No longer needed — section renders on titles |
| One concrete African Bank fact | Pending. Two partner cards until it lands |
| Testimonial roles and organisations | Pending. Names only until they land |
| Confirmation 150+ is counted | Pending |
| **Web3Forms key activation** | **Blocks. Client must click the email** |

## Cut list, in order

If day 11 arrives and you're behind: count-up on the stats, then parallax down
to the hero only, then View Transitions. Agreed in advance so the decision is
calm rather than made at midnight.

## Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Remaining content arrives late | Partnerships ships with two cards | Fallbacks defined. Only the form key truly blocks |
| A fourth wrong-product doc appears | Time lost re-litigating | `.agent/` investigated and cleared — it syncs nothing. Antigravity's workspace config is the remaining suspect |
| Logo permissions refused | Partnerships page loses its proof | Ask in Sprint 1. Fall back to naming brands in text without logos |
| African Bank has no real story | Visibly empty third card | Two cards is the fallback, decided in Sprint 4 |
| Numbers change again | Credibility damage if collateral disagrees | Lock all three figures with the client in Sprint 2 and don't reopen |
| Parallax janks on mobile | Feels cheap on the majority of traffic | Test on real devices in Sprint 6, cut to hero only if needed |
| Client never received past enquiries | Lost business, awkward conversation | Raise immediately — the old form delivered nothing since January |

## Deferred beyond v1.0

- Services as real routes at `/services/[slug]` — cut from v1.0 for lack of copy. `services.json` is keyed by slug so this stays cheap. This is the main SEO cost of the current shape
- CMS (Decap or Tina) so the client can add events, logos and testimonials themselves
- Revisit whether the 14 dropped Lottie animations are missed
- Case studies as a content collection
