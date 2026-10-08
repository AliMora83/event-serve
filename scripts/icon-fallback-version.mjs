/**
 * Output-format version of scripts/render-icon-fallbacks.mjs. The script
 * stamps it into every fallback SVG, and ServiceGrid fails the build on any
 * other value.
 *
 * The source-sha256 in the same stamp only covers the JSON. A change to the
 * renderer that alters the SVG it writes for an unchanged JSON is invisible to
 * it, so without this every committed fallback would keep passing in the old
 * format. Bump it whenever such a change is made, then rerun the script: all
 * eight SVGs change, and that churn is the point.
 *
 *   1  never stamped: ids numbered across the whole render page
 *   2  ids numbered per icon
 */
export const RENDERER_VERSION = 2;
