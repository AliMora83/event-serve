/**
 * Central image map.
 *
 * Data files (`clients.json`, `partners.json`) can't hold ESM imports, and
 * `astro:assets` needs static imports to optimise anything. This module is the
 * bridge: JSON stores a key, this file maps the key to the imported asset.
 *
 *   import { Image } from 'astro:assets';
 *   import { clientLogos } from '@assets/images';
 *   <Image src={clientLogos[key]} alt={name} widths={[160, 320]} />
 *
 * ---------------------------------------------------------------------------
 * RESOLUTION CEILING — read before assigning any image to a full-bleed band.
 *
 * Of the 72 staged images, exactly TWO photographs are wide enough to back a
 * full-bleed band:
 *
 *   hero/sasa-image.jpeg   3600x2401
 *   hero/bg-01.jpg         1920x1320
 *
 * Everything else is a web export: 49 files at 900x500, 10 at 940x788, the
 * rest smaller. Those are fine inside a card or a carousel slide, and visibly
 * soft stretched across a viewport.
 *
 * The design has THREE parallax bands and two adequate photographs. The third
 * band (`/partnerships`) is knowingly under-resolved until the client supplies
 * originals. `astro:assets` will not rescue this — it downscales, it does not
 * invent detail.
 * ---------------------------------------------------------------------------
 */

import type { ImageMetadata } from 'astro';

/* --- Band and hero backgrounds ------------------------------------------ */

// The old hero was show_jan.mp4, not a photograph — see Hero.jsx in legacy/.
// The video is 848x480, so no poster frame from it can carry an 88vh band.
// bg-01.jpg is the widest photograph not already committed elsewhere.
import stage from './hero/bg-01.jpg';

// Confirmed in SPRINT-1.1: the SA Sport Awards shot, and the exact property
// named in the partnerships copy. Was the old ImpactSection background.
import sportAwards from './hero/sasa-image.jpeg';

// UNDER-RESOLVED at 900x500 behind a full-bleed band. Chosen from
// Presidential_Gala per ruling; replace when originals arrive.
import redCarpet from './gallery/Presidential_Gala/Presidential_Gala_1.png';

export const heroImages = {
  stage,
  'sport-awards': sportAwards,
  'red-carpet': redCarpet,
} as const;

export type HeroKey = keyof typeof heroImages;

/* --- Inline page imagery ------------------------------------------------- */

// Inline <img>, not full-bleed, so 900x500 is adequate here.
import partnershipsIntro from './gallery/Stage_Setups/Stage_Setup_1.png';

export const pageImages = {
  'partnerships-intro': partnershipsIntro,
} as const;

/* --- Work highlights ------------------------------------------------------
 * gallery/1-10.png are the images the OLD SITE ACTUALLY SHOWED — the previous
 * WorkHighlightsSection globbed 'assets/gallery/*.png' non-recursively, so the
 * 50 subfolder images never reached a visitor. 940x788, fine for a slide.
 * Alt text is written in Sprint 3 once the client returns the event mapping.
 * -------------------------------------------------------------------------- */

import work01 from './gallery/1.png';
import work02 from './gallery/2.png';
import work03 from './gallery/3.png';
import work04 from './gallery/4.png';

export const workImages: ImageMetadata[] = [work01, work02, work03, work04];

/* --- Brand ----------------------------------------------------------------
 * PLACEHOLDER, same basis as public/favicon.svg: no vector logo exists in this
 * repo, and a PNG cannot honestly be traced to SVG. Events-white-01.png is
 * what the old Navbar used, so this is the faithful port, not a guess.
 * Swap for real SVG artwork when the client supplies it.
 * -------------------------------------------------------------------------- */

import logo from './brand/Events-white-01.png';

export const brand = { logo } as const;

/* --- Client logos ---------------------------------------------------------
 * These six are the real clientele row. Verified, not assumed: the old
 * ClienteleSection.jsx imported exactly these six files and nothing else.
 * -------------------------------------------------------------------------- */

import deptSport from './logos/Dept_sport.png';
import kudu from './logos/KUDU.png';
import netball from './logos/Netball.png';
import sabc from './logos/SABC.png';
import safa from './logos/SAFA.png';
import sasa from './logos/SASA.png';

export const clientLogos = {
  'dept-sport': deptSport,
  kudu,
  netball,
  sabc,
  safa,
  sasa,
} as const;

export type ClientLogoKey = keyof typeof clientLogos;

/* --- Still unresolved -----------------------------------------------------
 * partners.json wants three brand logos and the repo holds one of them:
 *
 *   hyundai        no source
 *   african-bank   no source
 *   sasa           logos/SASA.png exists, as raster not vector
 *
 * Requested from the client. Until they arrive, ClientLogos and the partners
 * grid must tolerate a missing logo rather than render a broken image.
 * -------------------------------------------------------------------------- */
