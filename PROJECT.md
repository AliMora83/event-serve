# Events Serve Website Rebuild — Project Plan

**Client:** Events Serve (eventsserve.co.za)
**Stack:** Astro 5, static output, deployed to Afrihost shared cPanel over FTPS
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
cPanel deploy pipeline (manual trigger, `deploytest` target), `.htaccess`.
Web3Forms wired and **verified by a delivered message**.
Confirm the new tree has no React: `@astrojs/react`, `lottie-react` and `gradflow`
live in the **old** build's `package.json`, which moves to `legacy/`. Nothing to
remove from the Astro scaffold — dependencies there are `astro` and `sharp` only.
Still worth checking what `gradflow` did, in case a component in the port relied on it.

**Done when:** a `deploytest` run proves the transport and that `.htaccess` applies, four routes resolve, and a test enquiry reaches the client's inbox. The production deploy waits for cutover day.
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

`.github/workflows/deploy.yml` builds `dist/` and uploads it over **FTPS** to
cPanel.

**SSH is not available on this hosting package.** Every SSH port times out
while cPanel answers on 2083. This is a property of the Afrihost shared
package, not a misconfiguration. Do not try to restore an SSH/rsync deploy —
the site is a static build and never needed a shell.

**Manual trigger only. There is deliberately no push trigger.**
eventsserve.co.za is live and is the client's only web presence. There is no
staging subdomain, so the first production deploy REPLACES the existing site.
Deploying has to be a decision someone makes, never a side effect of merging.

**No production deploys until cutover day.** Until then use the `deploytest`
target, which writes to `public_html/_deploytest/` and cannot touch the live
site. The workflow refuses a `deploytest` directory that does not end in
`/_deploytest`, and a production run additionally requires typing
`REPLACE-LIVE-SITE` into the confirm field.

**Secrets** (Settings → Secrets and variables → Actions → Secrets):

| Secret | What it is |
|---|---|
| `FTP_HOST` | FTP hostname from cPanel → FTP Accounts → Configure FTP Client. Hostname only, no scheme and no path |
| `FTP_USER` | Full FTP username, usually `user@eventsserve.co.za` |
| `FTP_PASSWORD` | That FTP account's password. Create a **deploy-only** FTP account; do not reuse the cPanel login |
| `PUBLIC_WEB3FORMS_KEY` | Web3Forms access key. Required for `production`; `deploytest` builds without it |

`SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, `SSH_PORT` and `SSH_KNOWN_HOSTS`
are retired. Delete them — a stale private key in a repo secret is a liability
with no remaining use.

**Variables** (same page → Variables):

| Variable | Example |
|---|---|
| `FTP_DEPLOYTEST_DIR` | `public_html/_deploytest` |
| `DEPLOYTEST_URL` | `https://eventsserve.co.za/_deploytest` |
| `FTP_PROD_DIR` | `public_html` |
| `PROD_URL` | `https://eventsserve.co.za` |

`DEPLOYTEST_PATH` and `PROD_PATH` are retired. They were absolute filesystem
paths, which an FTP session has no concept of: an FTP directory is relative to
whatever the account's root happens to be. **Confirm that root before trusting
either value** — see below.

All three environments (`deploytest`, `cleanup-deploytest`, `production`)
should exist under Settings → Environments. Put a required reviewer on
`production`.

**Confirming the FTP root.** Do not guess it. An account created against the
domain may land in `public_html/`, in which case `FTP_PROD_DIR` is `.` and the
guards will reject it; an account created at the cPanel level lands in the
home directory, where `public_html` is a child. Log in once with any FTP
client and check what you see immediately after connecting:

- If the first listing shows `public_html`, `mail`, `etc`, `logs` — you are in
  the home directory. Use `public_html` and `public_html/_deploytest`.
- If the first listing shows `index.html`, `_astro`, `about` — you are already
  inside the document root. Make a new FTP account whose directory is the home
  directory instead; the workflow refuses to target the FTP root, deliberately.

**Proving the transport before cutover.** Run the workflow with target
`deploytest`.

`_deploytest/` is **blocked outright**, not merely noindexed — a rewrite rule
in `.htaccess` returns 403 for any `/_deploytest` URL, and the workflow appends
`Require all denied` to the copy that is uploaded there. It puts a complete
duplicate of the site on the live domain, and a noindex header still permits
the fetch during exactly the window that matters.

Because it is unreachable, **verification reads the remote directory over
FTPS** rather than fetching it: the workflow installs `lftp`, takes a recursive
listing, and asserts local vs remote file count and the presence of the key
files. Both are hard failures. The one HTTP call asserts a **403**, and fails
the run on a 200.

The old SSH verification also audited file and directory modes. That check is
gone: FTP listings do not report modes reliably, and asserting something we
cannot trust is worse than not asserting it. If modes are ever in question,
check them in cPanel's File Manager.

The header assertions (`X-Content-Type-Options`, `Referrer-Policy`,
`Cache-Control: immutable`) and the 404 check need a fetchable URL and a
document root, so they run for the first time at cutover, against production.

**Then clean up.** Run the workflow again with target `cleanup-deploytest`.
It skips the build entirely. `_deploytest` should not outlive the test it
exists for — it must not sit on the live domain for weeks.

The FTP action cannot delete a remote directory, so cleanup syncs an *empty*
local directory with `dangerous-clean-slate`, which deletes every file inside
`FTP_DEPLOYTEST_DIR`. The directory itself survives, empty; the parent
`.htaccess` still returns 403 for it. A dedicated pre-flight step re-asserts
the `/_deploytest` suffix immediately before that action runs — it is the only
step in the workflow that can destroy data, so the guard is deliberately
duplicated and deliberately outside the thing it guards.

**Safety notes.** `dangerous-clean-slate` is used on cleanup only and is
explicitly `false` for both deploys, so a production run never deletes ahead
of uploading. The upload additionally excludes `.well-known/` (deleting it
breaks AutoSSL renewal), `cgi-bin/`, `.htpasswd` and `_deploytest/`. The path
guards, rebased from the SSH version into FTP terms, reject an empty target,
an absolute path, anything containing `..`, and — for both deploytest targets —
anything not ending in `/_deploytest`.

The action keeps a sync-state file (`.ftp-deploy-sync-state.json`) in the
target directory and uses it to upload only what changed. Deleting it is not
dangerous, but it forces a full re-upload of the whole site next run.

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

**Not work days.** Client review, fixes, then the cutover deploy to `public_html/` — the first and only production run.

Do not touch MX records. `info@eventsserve.co.za` is a mailbox on the same hosting.

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
