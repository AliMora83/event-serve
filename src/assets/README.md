Images live here, not in `public/`.

`public/` is a straight passthrough with no processing. Anything served from
here goes through `astro:assets`, which handles AVIF/WebP conversion and
responsive sizing. With 86 source PNGs of photographs (~46MB), that is the
single largest performance win available on this project.

    import hero from '../assets/hero/stage.jpg';
    <Image src={hero} alt="..." widths={[640, 1024, 1920]} />

Migrate from the old build's `src/assets/` in Sprint 1.1 Task 3. Keep the
gallery subfolder copies only — 9 root-level duplicates are byte-identical.
