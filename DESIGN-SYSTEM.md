# Events Serve — Design System Audit & Extension

8 Oct 2026. Reads the working tree on `feat/section-updates`, including the uncommitted icon work. It covers the sections needed for the final website copy doc: Vision/Mission, Approach pillars, Expertise, Why Events Serve, the 8-service grid, the CTA block and the footer legal line.

Copy rules live in `BRAND-VOICE.md`. Doc copy is verbatim.

---

## Part 1 — Audit

**Score: 82/100.** Tokens are strong and well documented, with contrast verified in comments. The gaps are all in *patterns*: three things are hand-rolled per page that the new sections will need four more times.

### Token coverage

| Category | Status | Notes |
|---|---|---|
| Colour | ✅ | No hardcoded hex in components. The hits in ServiceGrid and Testimonials are inside comments. |
| Spacing | ✅ | `--space-1…7` used throughout |
| Type | ✅ | Scale complete. No token for a "statement" size, so Vision/Mission reuse `--fs-h3`. |
| Light-section foregrounds | ✅ | `-on-light` aliases exist and are verified |

### Pattern gaps (priority order)

| # | Gap | Where it's hand-rolled now | Fix |
|---|---|---|---|
| 1 | **No shared light-section class.** Each light section sets its own background and reaches into SectionHeading with `:global()`. | WorkHighlights, Testimonials, `.approach-section` on /partnerships | Add `.section--light` to base.css (spec below). The new sections add 2–3 more light grounds, which would make 5–6 copies. |
| 2 | **"Rule list" pattern is page-scoped.** Crimson left rule + h3 + body. | `.approach` on /partnerships | Promote to a `FeatureList.astro` component. It's needed by About pillars, Why Events Serve and Partnerships. |
| 3 | **CTA block duplicated.** | `.cta` on /partnerships, CTA section on /services | `CtaBlock.astro` |
| 4 | **services.json has one `summary` string.** Doc services are tagline + paragraphs + an optional kicker. | services.json | Schema change (below) |
| 5 | **ServiceGrid tiles can't link.** The 8th tile (Sponsorships & Partnerships) must go to /partnerships. | ServiceGrid | Optional `href` on a service |

---

## Part 2 — Foundations to add

### `.section--light` (base.css)
Global, so no `:global()` is needed. It replaces the per-component background rules in WorkHighlights, Testimonials and `.approach-section`.

```css
.section--light {
  background: var(--c-surface-light);
  color: var(--c-text-on-light);
}
.section--light .lede               { color: var(--c-text-on-light-muted); }
.section--light .heading-mark h2    { color: var(--c-text-on-light); }
.section--light .heading-mark__rule { background: var(--c-crimson-on-light); }
.section--light .heading-mark__star { color: var(--c-crimson-on-light); }
/* --c-text-muted (1.99:1) and --c-crimson-text (3.48:1) must never resolve
   inside this class. Dark cards (Testimonials) keep their own dark-ground
   tokens because the card is the dark surface, not the section. */
```

### Token additions
| Token | Value | Use |
|---|---|---|
| `--fs-statement` | `clamp(1.25rem, 2.2vw, 1.75rem)` | Vision statement, Approach tagline |
| `--measure-wide` | `78ch` | Two-column prose (Expertise, /services detailed) |

No new colours.

---

## Part 3 — New and changed components

### `FeatureList.astro` (new, extracted from /partnerships `.approach`)

| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | `{ title, kicker?, body: string \| string[] }[]` | — | |
| `columns` | `2 \| 3` | `3` | Explicit count. auto-fit landed 4+2 before (technical-learnings). |
| `tone` | `'dark' \| 'light'` | inherits | Reads tokens from `.section--light` when inside it |

- **Layout:** columns → 2 at 900px → 1 at 600px (same tiers as ServiceGrid detailed). Row gap `--space-7`, column gap `--space-6`.
- **Item:** 2px left rule in crimson (`--c-crimson` on dark is fills-only, which is fine for a rule; `--c-crimson-on-light` on light). Then h3, then kicker, then body.
- **Kicker:** `font-weight: 600`. Colour `--c-crimson-text` on dark, `--c-crimson-on-light` on light.
- **Uses:**
  - About → Our approach: 3 items, `columns=3`, with kickers.
  - Home → Why Events Serve: 6 items, 3+3.
  - /partnerships → More than sponsorship: 6 items, 3+3, replacing the page-scoped CSS.

### `ExpertiseGrid.astro` (new)
Four event types, each with an image. This also clears part of the alt-text blocker.

- Layout: **2×2** (not 4-up). Each card carries two paragraphs, and four columns would put prose near 25 CPL. Drops to one column at 768px.
- Card: image (4:3, `height:auto` with `aspect-ratio`, per technical-learnings), then h3, then kicker if present, then paragraphs.
- Image mapping (checked visually 8 Oct 2026):

| Expertise | Image | Alt text (draft) |
|---|---|---|
| Conferences | `Conferences_Setup/` (pick one) | "Conference room set for a plenary session" |
| Corporate events | `gallery/3.png` | "Branded entrance walkway at MTN's 30 Years celebration" |
| Awards and gala dinners | `HB_Images/HollywoodBet-4.png` | "Hosts on stage at the Hollywoodbets Super League Awards" |
| Festivals and concerts | `HB_Images/HollywoodBet-1.png` or `Stage_Setups/` | "Artist performing live on stage" (name the artist if known) |

`HB_Images` is the Hollywoodbets Super League Awards, so it fits Awards rather than Corporate events.

### `StatementPair.astro` (new): Vision / Mission
- Two columns on a light ground (one column at 768px).
- Eyebrow label ("Our vision" / "Our mission") in `--c-crimson-on-light`, weight 600, `--fs-small`.
- Statement in `--fs-statement`, weight 600. Mission's second paragraph uses body size, muted-on-light.

### `CtaBlock.astro` (new)
Props: `heading`, `lede` (string or string[]), `href`, `label`. Centred, dark. It replaces the /partnerships and /services CTAs. The doc's "Let's create something memorable" paragraph is the /services, /about and home CTA.

### `ServiceGrid.astro` (changed)
- **Schema:**
  ```json
  { "slug", "title", "icon", "tagline", "body": ["…", "…"], "kicker"?: "…", "href"?: "/partnerships" }
  ```
  - `tagline` is the doc's first line ("Great events deserve great content.").
  - `kicker` is the closing bold line ("We don't just manage events — we manage the experience.").
  - Inline mid-sentence bolds in the doc ("concept development to execution") are formatting, not text. Render them plain.
- **Homepage:** titles only. Unchanged, 4 columns: 4+4 with 8 tiles.
- **/services detailed:** change `columns={3}` to **`columns={2}`**. Three columns would orphan 8 tiles into 3+3+2. Two columns give 4 rows at about 60 CPL, inside `--measure-wide`.
  - Tile order: tagline (`--c-crimson-text`, weight 600), then body paragraphs, then kicker (weight 600).
- **`href`:** when present, the tile title becomes a link. Use it for Sponsorships & Partnerships only.
- **Icon mapping:**

| Service (doc) | Icon key | Status |
|---|---|---|
| Event management & production | `production` | have |
| Content creation | `multimedia` | have |
| Technical production | `broadcast` | have |
| Public relations | `pr` | have |
| Digital marketing | `digital` | **need from Lordicon** |
| Design services | `design` | **need** |
| Social media management | `social` | **need** |
| Sponsorships & partnerships | `partnerships` | **need** |

- **Orphan-check gotcha:** `virtual`, `rsvp`, `video` and `activation` (`.json` + `.svg`) will have no `icon` key, so the build fails by design. Move them to `legacy/icons-unused/`, outside `src/assets/icons/`. Don't delete them.
- **Interim, before the four new downloads exist:** the build can't pass with missing icons either. Ship the content change only once the four Lordicon files are in, or temporarily point the four at existing keys (not recommended: duplicate icons read as a mistake).

### `Footer.astro` (changed)
- Remove "Creating memorable events since {site.founded}". The brand column becomes the name alone.
- **Contact column:** add the address ("Regus – Southdowns Ridge Office Park, John Vorster Drive, Southdowns, Centurion, 0062").
- **Legal row:** "© {year} Events Serve (Pty) Ltd · Reg. 2016/524802/07".
- **site.json:**
  - Add `legalName`, `registration` and `address` (an array of lines).
  - Remove `founded`, and remove `founder` once About no longer uses it.

---

## Part 4 — Page compositions

Dark (D) and light (L) alternate. Never put two light sections back to back.

**Home**
1. Hero: parallax, D. h1 changes per brand-voice §7.
2. Marquee
3. Stats: D
4. We do events: D, two columns. Doc About paragraph 1 on the left; on the right, the **video facade**: a poster image plus a play button that loads `youtube-nocookie.com/embed/EhmIfUMwf68` on click.
   - Not the legacy autoplaying background iframe, which pulls about 1 MB of YouTube JS on page load.
   - Self-host the poster so nothing third-party loads until the click.
5. Work highlights: L
6. What we offer (8 tiles): D
7. **Why Events Serve (FeatureList 3+3): L**
8. Client logos: D
9. Testimonials: L
10. Partnerships parallax band: D

**About**
1. h1 + doc About (4 paragraphs): D. Drop the founder framing paragraph.
2. Vision / Mission (StatementPair): L
3. Our approach: D. "Your vision. Our expertise. One exceptional experience." as the sub-heading, the intro sentence, then FeatureList ×3.
4. Where we work: L, tight
5. CtaBlock: D
6. Impact: removed (decided 8 Oct 2026)

**Services**
1. h1 "Our services" + the doc Expertise intro paragraph as lede: D
2. Our expertise (ExpertiseGrid 2×2): L
3. Services (ServiceGrid detailed, 2 columns, 8 items): D
4. CtaBlock: L. Breaks the run of dark sections; the button stays crimson fill, which passes 8.52:1.

**Partnerships:** restore the verbatim doc copy (brand-voice §7) and swap `.approach` for FeatureList. Layout otherwise unchanged.

---

## Accessibility notes

- **Video facade:** a real `<button>` with the label "Play video: KB Motsilanyane — Rock Lefatshe, live at the SA Sports Awards 2025". The iframe gets a `title`. No autoplay before the click.
- **FeatureList:** use `<ul>`, with `h3` per item under the section `h2`.
- **ServiceGrid tiles:** a linked tile wraps only the title in `<a>`, not the whole tile, so the hover-icon behaviour and focus target stay simple.
- **Light sections:** only `-on-light` tokens. The `.section--light` comment states the two forbidden tokens.

## Decisions (8 Oct 2026)

- **Hero h1:** "Your vision. Our expertise. One exceptional experience."
- **Impact section:** dropped.
- **Video:** keep it for "We do events". The YouTube embed (`EhmIfUMwf68`) is the same video as `show_jan.mp4`, so the facade uses YouTube and **the Vimeo upload is no longer needed**. Update the PROJECT.md and CLAUDE.md notes about Vimeo accordingly. `legacy/public/show_jan.mp4` is no longer a blocker.
- **Icons:** Ali is getting the four new Lordicon files. **Until then, Phase B re-uses the existing eight files under their current keys**, so the orphan check stays green and nothing moves to `legacy/`:

| Service | Interim icon key | Replace with |
|---|---|---|
| Event management & production | `production` | keep |
| Content creation | `video` | keep |
| Technical production | `broadcast` | keep |
| Digital marketing | `virtual` (globe) | `digital` |
| Design services | `multimedia` | `design` |
| Social media management | `activation` (heart) | `social` |
| Public relations | `pr` | keep |
| Sponsorships & partnerships | `rsvp` | `partnerships` |

When the new files land: add them, repoint the four keys, move the four replaced files to `legacy/icons-unused/`, and re-run `node scripts/render-icon-fallbacks.mjs`.
