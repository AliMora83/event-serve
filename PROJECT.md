# EventServe Website Rebuild — Project Plan

**Client:** EventServe (eventserve.co.za)
**Stack:** Astro 5, static output, deployed to HostAfrica shared cPanel
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

**Days 1–7.** Outcome: homepage complete on staging, all images optimised, form delivering.

## Sprint 1 — Foundation *(day 1)*

Docs cleanup, scaffold installed, old build moved to `legacy/`, images staged.
cPanel deploy pipeline, `staging.eventserve.co.za`, `.htaccess`.
Web3Forms wired and **verified by a delivered message**.
Remove `@astrojs/react` and `lottie-react`. Check what `gradflow` does before removing it.

**Done when:** staging loads, four routes resolve, a test enquiry reaches the client's inbox.
**Tag `v0.1`.**

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

**Days 8–15.** Outcome: five routes live on the production domain.

## Sprint 4 — Partnerships *(days 8–9)*

Page hero, trimmed intro, partner cards, six approach points, image band, CTA.
"Events Serve" corrected to "EventServe" throughout the source copy.

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

Parallax tuned on three bands, tested on real iOS and Android.
Full pass with reduced motion enabled.
Lighthouse, target 90+ mobile.
Keyboard and screen reader walkthrough. Contrast audit against final content.
SEO: titles, descriptions, sitemap, robots.txt, structured data. 404 page. Analytics.

**Tag `v0.6`.**

## Days 14–15 — Review and cutover

**Not work days.** Client review, fixes, then staging to `public_html/`.

Do not touch MX records. `info@eventserve.co.za` is a mailbox on the same hosting.

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
| A fourth wrong-product doc appears | Time lost re-litigating | Investigate what `.agent/` syncs before Sprint 2 |
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
