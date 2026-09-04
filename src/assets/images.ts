/**
 * Central image map.
 *
 * Data files (`clients.json`, `partners.json`) can't hold ESM imports, and
 * `astro:assets` needs static imports to optimise anything. This module is the
 * bridge: JSON stores a key, this file maps the key to the imported asset.
 *
 * SPRINT 3 fills this in during the image migration. Until then the scaffold
 * uses string paths, which render broken — that's expected, not a bug.
 *
 * Pattern:
 *
 *   import sasa   from './hero/sasa-image.jpeg';
 *   import bg01   from './hero/bg-01.jpg';
 *
 *   export const heroImages = { sasa, bg01 } as const;
 *   export type HeroKey = keyof typeof heroImages;
 *
 * Then in a component:
 *
 *   import { Image } from 'astro:assets';
 *   import { heroImages } from '../assets/images';
 *   <Image src={heroImages[key]} alt={alt} widths={[640, 1024, 1920]} />
 *
 * SPRINT 3 INVENTORY — 18 references across 7 files.
 *
 * Files that HOLD paths (these are the swaps):
 *   index.astro             2
 *   partnerships.astro      2
 *   WorkHighlights.astro    4
 *   Header.astro            1   logo
 *   BaseLayout.astro        1   og-default
 *   partners.json           3   logo paths
 *   clients.json            5   logo paths
 *
 * Files that hold NO paths but still need work — their props change type
 * from `string` to `ImageMetadata`:
 *   ParallaxBand.astro      receives `image`
 *   ClientLogos.astro       receives paths via clients.json
 *
 * ---------------------------------------------------------------------------
 * UPDATE, Sprint 1.1 image staging: 17 references across 6 files.
 *
 * BaseLayout's og-default drops off the list. It is now a real file at
 * public/og-default.jpg and correctly STAYS in public/ — an og:image must be a
 * plain, stable absolute URL that scrapers can fetch, which is exactly what
 * astro:assets is not for.
 *
 * ---------------------------------------------------------------------------
 * SOURCE GAP — most of the remaining 17 have nothing to point AT.
 *
 * 72 images are now staged in src/assets/, but the scaffold's placeholder
 * paths were written to a naming scheme the source files do not use. Sprint 3
 * cannot simply swap these; someone has to choose images, and in several cases
 * obtain them.
 *
 *   HAVE a source:
 *     hero/sport-awards.jpg  -> hero/sasa-image.jpeg (3600x2401, confirmed)
 *     work/01..04.jpg        -> pick 4 of gallery/1.png..10.png. These ten are
 *                               what the old carousel actually showed
 *
 *   NO source in the repo — needs a decision or the client:
 *     hero/stage.jpg              nothing named "stage". Closest is
 *                                 gallery/Stage_Setups/ (15 files) or
 *                                 hero/bg-01.jpg
 *     hero/red-carpet.jpg         nothing matching
 *     partnerships/intro.jpg      nothing matching
 *     logo.svg                    brand/ holds PNGs only. No vector logo
 *                                 exists in this repo (see public/favicon.svg)
 *     logos/hyundai.svg           not present
 *     logos/african-bank.svg      not present
 *     logos/mtn.svg               not present
 *     logos/client-1,2,4,5.svg    placeholders; the clients are not yet named
 *
 *   PARTIAL:
 *     logos/sasa.svg          -> logos/SASA.png exists, as raster not vector
 *
 * staged logos/ holds six: Dept_sport, KUDU, Netball, SABC, SAFA, SASA. Only
 * SASA overlaps what partners.json and clients.json ask for. This is the
 * "logo permissions" risk in PROJECT.md arriving early — worth raising with
 * the client now rather than in Sprint 4.
 */

export {};
