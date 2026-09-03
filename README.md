# EventServe

Marketing website for EventServe (eventserve.co.za). Astro 5, static output,
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

HostAfrica shared cPanel. `dist/` is uploaded to `public_html/`.

Staging is `staging.eventserve.co.za`. Deploy there first, every time.

Do not touch DNS or MX records — `info@eventserve.co.za` is a mailbox on the
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
