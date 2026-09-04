Images live here, not in `public/`.

`public/` is a straight passthrough with no processing. Anything served from
here goes through `astro:assets`, which handles AVIF/WebP conversion and
responsive sizing. That is the single largest performance win available on
this project.

    import hero from '../assets/hero/sasa-image.jpeg';
    <Image src={hero} alt="..." widths={[640, 1024, 1920]} />

## What is here — staged in Sprint 1.1

72 images, 38MB, moved from the old build with `git mv` so history follows.

| Directory | Files | |
|---|---|---|
| `gallery/` | 10 | `1.png`–`10.png`. **These were the live carousel** — the old `WorkHighlightsSection.jsx` globbed `assets/gallery/*.png`, non-recursively, so only these root-level files ever reached a visitor |
| `gallery/Conferences_Setup/` | 10 | never displayed by the old build |
| `gallery/HB_Images/` | 6 | HollywoodBets |
| `gallery/Netball_World_Cup/` | 13 | |
| `gallery/Presidential_Gala/` | 6 | |
| `gallery/Stage_Setups/` | 15 | |
| `logos/` | 6 | Dept_sport, KUDU, Netball, SABC, SAFA, SASA |
| `brand/` | 4 | Events-white-01, EventsLogo, Events-01-06, Events-01-07 |
| `hero/` | 2 | `sasa-image.jpeg` (3600×2401, the SA Sport Awards shot — partnerships band background), `bg-01.jpg` |

## What was dropped

- **9 byte-identical duplicates** at `gallery/` root (~5.6MB), each a copy of a
  file in a subfolder. Verified by md5, not by filename
- `Screenshot-2025-10-16-at-16.53.31.jpg` — not corrupt as previously recorded.
  It is a 94-byte **HTML 403 page** saved with a `.jpg` extension: a download
  that failed and was never noticed. Whatever image was wanted here was never
  obtained

## What stayed in `legacy/src/assets/`

14 Lottie JSON files (Lottie is dropped), 3 unreferenced GIFs, and Vite's
default `react.svg`. None are referenced by the old build. The "86 source
images" figure in earlier documents counted these four alongside the 82
photographs: 82 + 3 + 1 = 86.

## Wiring status

**14 of 17 references are now live** through `images.ts`. Components import
`ImageMetadata` and render through `astro:assets`; no component points at
`public/images/` any more.

Remaining: the three `partners.json` logos. Two have no source file
(Hyundai, African Bank) and render as **no logo at all** rather than a broken
image — the partner name sits in an `<h3>` directly below, so nothing is lost
but the mark. SASA resolves to `logos/SASA.png`.

## Resolution ceiling — the constraint that shapes Sprint 3

Only **two** photographs here are wide enough for a full-bleed band:

    hero/sasa-image.jpeg   3600x2401
    hero/bg-01.jpg         1920x1320

49 of the 72 are 900x500 and 10 are 940x788 — web exports, not source
photography. They are fine in a card or a carousel slide and visibly soft
stretched across a viewport.

The design has **three** parallax bands and two adequate photographs. The
`/partnerships` band is knowingly under-resolved until the client supplies
originals. `astro:assets` downscales; it cannot invent detail.

## Alt text

Still outstanding, deliberately. It needs the client's gallery-to-event
mapping — placeholder alt text on a real photograph is worse than an honest
TODO, because it looks finished.
