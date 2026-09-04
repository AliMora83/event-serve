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
 *   import stage from './hero/stage.jpg';
 *   import sasa  from './hero/sasa-image.jpeg';
 *
 *   export const heroImages = { stage, sasa } as const;
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
 */

export {};
