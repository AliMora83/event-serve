# Events Serve

Marketing website for Events Serve (eventsserve.co.za). Astro 5, static output,
no client-side framework.

Four routes: Home, About, Partnerships, Contact. Services is a homepage
section at `/#services`.

> Replaces a README that belonged to the Atlas Conference project.

## Run

```bash
npm install
npm run dev      # localhost:4321
npm run build    # -> dist/
npm run preview  # serve the build locally
```

## Deploy

**Netlify**, connected to this repo. Production branch `main`, build
`npm run build`, publish `dist`. Host config lives in `netlify.toml` at the
repo root; there is no deploy workflow and there should not be one.

**Auto-publishing is off.** Pushing to `main` builds the site but does not put
it live — promoting a build to production is a manual step in the Netlify
dashboard. Leave it that way: eventsserve.co.za is the client's only web
presence.

Pull requests get deploy previews, which Netlify serves `noindex`.

`PUBLIC_WEB3FORMS_KEY` is set in the Netlify environment variables for all
contexts. A production build fails without it. See `PROJECT.md` for the full
deploy notes and the current open issue with the form.

The site was on Afrihost shared cPanel over FTPS until 2026-09-08. That
pipeline and its `.htaccess` have been removed.

Do not touch DNS or MX records — `info@eventsserve.co.za` is a mailbox on the
Afrihost hosting, which still handles mail for the domain.

## Structure

```
src/
  assets/       Images. Served through astro:assets for AVIF/WebP + responsive sizes
  data/         All copy as JSON. Edit these, not components
  styles/       tokens.css is the single source for colour, type and spacing
  scripts/      motion.js — reveal, parallax, count-up, nav. No dependencies
  components/   Reusable blocks
  layouts/      BaseLayout wraps every page
  pages/        One file per route
legacy/         The previous Vite/React build. Kept for reference during the port
```

## Environment

Copy `.env.example` to `.env`:

```
PUBLIC_WEB3FORMS_KEY=
```

The Web3Forms key is a public client-side identifier, not a secret, but keep it
out of the source anyway.

## Conventions

Colours, type and spacing come from `src/styles/tokens.css`. Nothing is
hardcoded.

`--c-crimson` is for fills. `--c-crimson-text` is for type on dark backgrounds.
They are not interchangeable — the fill crimson fails contrast as body text.

Reduced motion is handled globally. Don't bypass it.

## Documents

- `CLAUDE.md` — agent context, read automatically by Claude Code
- `PROJECT.md` — six-sprint delivery plan
- `Master.md` — MACP status file for the namka-control dashboard
- `AI_CHANGELOG.md` — append an entry every sprint
