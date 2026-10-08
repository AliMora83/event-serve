Service icons for `ServiceGrid`. **Lordicon PRO assets**, downloaded from
lordicon.com on 2026-09-10 — the licence basis for using them without
attribution. Keep this line if the files are ever replaced.

**Interim mapping (8 Oct 2026).** The files were downloaded for the previous
eight services; the final copy has a different eight, so each key is reused for
the closest new service. The *Label* column below is the service that uses the
key now; the *Lordicon identifier* is what the artwork actually is (a
location pin under "Digital marketing", not the globe the design system's table
suggests). When the four dedicated
icons (`digital`, `design`, `social`, `partnerships`) are downloaded, repoint
those keys in `services.json`, move the four replaced files to
`legacy/icons-unused/`, and re-run `node scripts/render-icon-fallbacks.mjs`.
See the interim table in `DESIGN-SYSTEM.md`.

Each file is named for its `icon` key in `src/data/services.json`. Renaming
destroyed the only other trace of which Lordicon icon each one is, so the
mapping lives here.

A `.json` or `.svg` here whose name is not an `icon` key fails the build.
Otherwise a misnamed file is still bundled as a chunk that nothing loads, and
the build passes anyway.

| File | Label | Lordicon identifier | Downloaded as | Animation state |
|---|---|---|---|---|
| `production.json` | Event management & production | `wired-outline-1383-sphere` | `wired-outline-1383-sphere-hover-pinch.json` | hover-pinch |
| `virtual.json` | Digital marketing | `wired-outline-18-location-pin` | `wired-outline-18-location-pin-hover-jump.json` | hover-jump |
| `broadcast.json` | Technical production | `wired-outline-1736-smart-tv-layout-interface` | `wired-outline-1736-smart-tv-hover-pinch.json` | hover-pinch |
| `rsvp.json` | Sponsorships & partnerships | `wired-outline-981-consultation` | `wired-outline-981-avatars-chatting-hover-conversation.json` | hover-conversation |
| `activation.json` | Social media management | `wired-outline-20-love-heart` | `wired-outline-20-heart-hover-heartbeat.json` | hover-heartbeat |
| `multimedia.json` | Design services | `wired-outline-61-camera` | `wired-outline-61-camera-hover-flash.json` | hover-flash |
| `video.json` | Content creation | `wired-outline-62-film` | `wired-outline-62-film-play-hover-play.json` | hover-play |
| `pr.json` | Public relations | `wired-outline-478-computer-display` | `wired-outline-478-desktop-hover-angle.json` | hover-angle |

The identifier is the file's top-level `nm`. Lordicon's display names have
drifted since the old build (`heart`, `smart-tv`, `avatars-chatting`,
`desktop`), but the numbers match `legacy/src/assets/*.json`. Every state was
checked against the legacy file and has identical shape data — the same hover
the old site played, not just the same icon.

activation was first downloaded as `morph-two-hearts`, which ends on a
different shape from the one it starts on, so it has no single pose to rest
on. It was replaced with `hover-heartbeat` on 2026-09-10. When downloading a
replacement for any key, take the **hover** state the old site used, not a
morph.

**These are single-state files, retimed to start at frame 0.** The legacy
JSONs hold every state (reveal, hovers, morphs) on one long timeline, so frame
numbers taken from them — including the old site's rest frames — do not
transfer to these files.

## Rest frame

The last frame, `totalFrames - 1`, read from the file — no per-icon table. For
each icon both ends of the animation were rendered and compared visually: they
show the same pose, and the last frame is where a hover ends, so leaving after
one never jumps. A replacement whose first and last frames differ breaks that
assumption; check both ends before adding one.

## The .svg files are generated

Each `<key>.svg` is the rest frame rendered to a static SVG, inlined by
`ServiceGrid` so the icon shows with no JS, under reduced motion, on touch and
if the player fails to load. **Do not edit them.** After adding or replacing a
JSON, run:

    node scripts/render-icon-fallbacks.mjs

Each SVG records the sha256 of the JSON it came from, and the build fails if
they disagree — a stale fallback cannot ship. It also records the renderer
version from `scripts/icon-fallback-version.mjs`, and the build fails on any
other value, so a fallback left over from an older script cannot ship either.
Bump that version whenever a change to the script alters the SVG it writes.

## Colour

The artwork keeps Lordicon's export colours: `#aa2a3b` (the crimson superseded
on 7 Sep, which the player writes as `rgb(170,42,58)`) and white.
`ServiceGrid`'s CSS matches those two values and maps them to `currentColor`
(`--c-crimson-text`) and `--c-text`. The files themselves are not edited.

`#ff0000` appears in broadcast, video and pr, only as the fill of track-matte
shapes. Those render into `<defs>` as alpha masks, where colour has no effect,
so it is never visible and is deliberately not remapped.
