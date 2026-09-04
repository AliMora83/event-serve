# Sprint 1.1 — Tasks 2 and 3

**Paste into the same Claude Code session that produced the audit.**

---

Audit accepted. Excellent work — several findings changed the plan. Answers to your blocking questions, then the decisions, then the build.

## Answers to your questions

1. **Hosting: HostAfrica, shared cPanel.** Not Netlify. This confirms your finding — **Netlify Forms has never worked** and no submission has ever been delivered. Every visitor who used that form since January saw a false success message. Treat this as confirmed, not suspected.
2. **The QR check-in app is not a real project here.** `Master.md` is wrong metadata that landed in this repo. It does not get merged and it does not get handed anywhere.
3. **Disable both GitHub Actions.** Yes.
4. **`AGENT-ONBOARDING.md`** — commit the deletion.
5. **Lottie** — React stays a dependency for now. Revisit in Sprint 5.

---

# Task 2 — Decisions

## Decision A: Drop Tailwind. Vanilla CSS custom properties.

Your reasoning holds — four colours and a font name isn't a migration.

**The scaffold's `tokens.css` has already been corrected** with the real values
from `tailwind.config.js`, and the contrast ratios are verified, not estimated:

| Token | Value | Ratio on `#0F0E0E` | Verdict |
|---|---|---|---|
| `--c-crimson` | `#AA2A3B` | **2.85:1** | Fails body AND large text. **Fills only** |
| `--c-crimson-hover` | `#C4374A` | 3.66:1 | Hover states only |
| `--c-crimson-text` | `#E8657A` | 6.03:1 | Passes. Use for all crimson type |
| `--c-text` | `#F3F4F6` | 17.51:1 | Passes |
| `--c-text-muted` | `#B0ADAD` | 8.65:1 | Passes |
| `--c-text-faint` | `#8A8686` | 5.36:1 | Passes |
| White on `#AA2A3B` | `#FFFFFF` | 6.77:1 | Buttons pass |

Note `#AA2A3B` at 2.85:1 fails even the 3:1 large-text threshold. Every place
the old build used `primary` as type was a contrast failure, not just the
Impact heading.

Font is Montserrat, loaded via `<link>` in `BaseLayout` — the old CSS `@import`
in `index.css` is a render-blocking waterfall and does not come across.

**Your job here is to verify, not re-derive.** Re-run the ratios independently
and report any disagreement. Then check whether `bgLight: #f2f2f2` is used
anywhere in the old build before deciding whether it needs a token.

## Decision B: SUPERSEDED — see DOC-CLEANUP.md

An earlier draft said `git rm Master.md`. **That is no longer the plan.**
`Master.md` stays, rewritten to describe the real product, because MACP is the
convention across this workspace and namka-control expects the file to exist.
`CLAUDE.md` is correct on this; this section was stale.

Both decisions are handled in `DOC-CLEANUP.md`, which runs before Task 3.
Skip to Task 3 below.

---

# Task 3 — Foundation

## 3.1 Repo hygiene

- [ ] `git pull` first — `main` is 3 commits behind `origin/main`
- [ ] Commit the `AGENT-ONBOARDING.md` deletion
- [ ] Disable both workflows: rename to `.yml.disabled`, or delete `generate-project-sync.yml` outright since its product doesn't exist
- [ ] Delete `yarn.lock` (npm is the de-facto manager per your audit)
- [ ] Delete the stale Feb-2026 `dist/`
- [ ] Replace `README.md` — it currently contains the Atlas Conference project's links table
- [ ] Confirm `.gitignore` covers `node_modules/`, `dist/`, `.astro/`, `.env`, `.DS_Store`

## 3.2 Preserve the old build

Move the existing Vite/React build to `legacy/` and commit it before installing Astro. Do not delete it. `src/components/` holds the section markup and copy we'll be porting through Sprints 2–4.

## 3.3 Install the scaffold

The scaffold is already extracted at `eventserve/`. Move its contents up to the
repo root **after** 3.2 — it collides with `src/`, `public/`, `package.json` and
`.gitignore`, which is why the old build moves to `legacy/` first.

`npm install`, then confirm both `npm run dev` and `npm run build` complete clean.

Dependencies are `astro` and `sharp` only. No React, no Lottie. If either appears,
something went wrong in the move.

## 3.4 Images — staging only, full migration is Sprint 3

The scaffold's components still reference `public/images/` in 18 places across
7 files. That is **known and expected** — the paths are placeholders and every
image renders broken until Sprint 3 rewires them.

`src/assets/images.ts` documents the pattern and lists all 18 references.

**In this sprint, only stage the files:**

- [ ] Move the old build's `src/assets/` galleries across, keeping the **subfolder copies only** — drop the 9 root-level duplicates (~5MB)
- [ ] Skip `Screenshot-2025-10-16-at-16.53.31.jpg` (corrupt, 4KB, no dimensions)
- [ ] Delete `public/vite.svg` and `public/.DS_Store`
- [ ] **`show_jan.mp4` (29MB) does not get deployed.** It moves to Vimeo. Remove it from the repo, note the pending Vimeo URL in `PROJECT.md`, and stub the embed with a poster frame for Sprint 2
- [ ] Generate `favicon.svg` and `og-default.jpg` from `Events-white-01` / `EventsLogo.png`
- [ ] `sasa-image.jpeg` at 3600×2401 is the SA Sport Awards shot — the partnerships band background. Keep at full resolution
- [ ] **Do not rewire components yet.** Populating `images.ts` and swapping the 18 references is Sprint 3, alongside writing alt text for all 86

## 3.5 Contact form — Web3Forms

**Already implemented in the scaffold's `ContactForm.astro`** — `preventDefault()`,
real response handling, `botcheck` honeypot, error state, details visible in both
states. Your job is the wiring and the proof:

- [ ] Generate an access key at web3forms.com against **info@eventserve.co.za** — the client needs to confirm the activation email. This is a public client-side key, but store it as `PUBLIC_WEB3FORMS_KEY` in `.env` for tidiness and add `.env.example`
- [ ] Remove the hidden Netlify blueprint form from `index.html` and all `data-netlify` attributes
- [ ] **Verify end to end.** Submit a real test and confirm it arrives in the client's inbox. This sprint does not close until a message is delivered

## 3.6 Deploy — shared cPanel

- [ ] Check whether the plan includes SSH. cPanel sidebar will show "Terminal" or "SSH Access"
  - **SSH available:** GitHub Action running rsync over SSH to `public_html/` on push to `main`. Store host, user and key as repo secrets
  - **No SSH:** FTP-based deploy Action, or document a manual upload procedure in `PROJECT.md`
- [ ] Set up **`staging.eventserve.co.za`** as a subdomain, deploy there, not to the live site. Every sprint should end with something the client can look at
- [ ] Add `.htaccess` for the Apache/LiteSpeed stack: HTTPS redirect, `Cache-Control` on hashed assets, gzip/brotli, custom 404
- [ ] Confirm all four routes resolve on staging. Astro's default directory output gives `/about/index.html`, which Apache serves correctly — verify rather than assume
- [ ] **Do not touch DNS or MX records.** `info@eventserve.co.za` is almost certainly a mailbox on this hosting. Nothing in this sprint should go near mail routing

## 3.7 Verify the motion foundation

- [ ] Confirm the `prefers-reduced-motion` block at the bottom of `src/styles/motion.css` is intact. No motion work happens in later sprints without it

---

## Constraints

- **No hardcoded colours.** Everything through `tokens.css`.
- **Ask before installing any dependency** not already in the scaffold's `package.json`.
- **Do not build any page content.** Empty routes are the correct output of this sprint.
- If anything here conflicts with what you find in the code, say so rather than working around it. Your audit was right about the form and the brief was wrong — same standard applies here.

## Definition of done

- Token contrast table reported, every pair passing
- Old build preserved in `legacy/`, Astro installed, `build` clean
- Images migrated to `src/assets/`, duplicates dropped, video removed
- **A test enquiry has actually arrived in the client's inbox**
- `staging.eventserve.co.za` live, all four routes resolving
- `Master.md` and `PROJECT.md` both present, each describing what it should

## Closing

Run `diff-review-gate` on the diff first.

```bash
git checkout -b sprint/1.1-foundation
git add -A
git commit -m "sprint 1.1: audit, drop Tailwind, Astro foundation, Web3Forms, cPanel deploy"
git checkout main && git merge --no-ff sprint/1.1-foundation
git tag -a v0.1.1 -m "Sprint 1.1 complete"
git push origin main --tags
```

Append a Sprint 1.1 entry to `AI_CHANGELOG.md`: what changed, both decisions with reasoning, the contrast table, and the form finding.

Then update `PROJECT.md` to correct Sprint 1's deploy step — it currently says Cloudflare/Netlify auto-deploy, which is now wrong.
