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

Afrihost shared cPanel. `dist/` is uploaded to `public_html/` over **FTPS**
by `.github/workflows/deploy.yml`, which is manual-trigger only.

**SSH is not available on this hosting package** — every SSH port times out
while cPanel answers on 2083. That is how the package is sold, not a
misconfiguration, so don't sink time into retrying it. The site is a static
build and never needed a shell.

Configuration (secrets `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`; variables
`FTP_PROD_DIR`, `FTP_DEPLOYTEST_DIR`, `PROD_URL`, `DEPLOYTEST_URL`) is
documented in `PROJECT.md`, including how to confirm the FTP root before
trusting the directory values.

There is no staging environment, and there never has been. The live site is the
only one. Pre-cutover verification uses the deploy workflow's `deploytest`
target, which writes to `public_html/_deploytest/` and is blocked from public
view; the first production deploy REPLACES the live site and happens once, by
hand, on cutover day.

Do not touch DNS or MX records — `info@eventsserve.co.za` is a mailbox on the
same hosting.

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
