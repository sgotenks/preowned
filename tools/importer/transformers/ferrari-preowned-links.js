/* eslint-disable */
/* global WebImporter */

/**
 * Link rewriting for preowned.ferrari.com/it-IT.
 * The migrated site serves the Italian pages from its root, so "/it-IT/<path>" becomes "/<path>"
 * for pages that are migrated (the URLs listed in page-templates.json). Everything else on the
 * source host (vehicle ads, search results outside the catalog) stays an absolute link to the live
 * Italian site. Other hosts are left as they are.
 */

// Source paths (after /it-IT) with a migrated page. Generated from tools/importer/page-templates.json
// — regenerate this list when templates gain URLs.
// BEGIN migrated-paths
const migratedPaths = [
  '/',
  '/ad',
  '/favorites',
  '/ferrari-approved',
  '/modelli-usato-ferrari',
  '/r/asia-pacifico/usato-ferrari/giappone/rfc',
  '/r/europa/usato-ferrari/germania/rfc',
  '/r/europa/usato-ferrari/gran-bretagna/812-superfast/rfcm',
  '/r/europa/usato-ferrari/italia/296-gtb/rfcm',
  '/r/europa/usato-ferrari/italia/c-d-p-/rfcd',
  '/r/europa/usato-ferrari/italia/ferrari-modena/rfcd',
  '/r/europa/usato-ferrari/italia/ferrari-roma/rfcm',
  '/r/europa/usato-ferrari/italia/rfc',
  '/r/europa/usato-ferrari/italia/sf90-stradale/rfcm',
  '/r/nord-america/usato-ferrari/u-s-a-/cauley-ferrari-of-detroit/rfcd',
  '/r/nord-america/usato-ferrari/u-s-a-/rfc',
  '/value-your-car',
];
// END migrated-paths

const SOURCE_HOST = 'preowned.ferrari.com';
const LOCALE_PREFIX = /^\/it-IT(?=\/|$)/i;
const MIGRATED = new Set(migratedPaths.map((p) => p.toLowerCase()));

function toMigratedPath(path) {
  const local = path.replace(LOCALE_PREFIX, '').replace(/\/$/, '') || '/';
  // Share deep links open a chapter of the Ferrari Approved page
  if (/^\/ferrari-approved\/share\//i.test(local)) return '/ferrari-approved';
  return MIGRATED.has(local.toLowerCase()) ? local.toLowerCase() : null;
}

// Links that stay on the live site keep its Italian locale prefix
function toLiveUrl(u) {
  const live = new URL(u.href);
  if (!LOCALE_PREFIX.test(live.pathname)) live.pathname = `/it-IT${live.pathname === '/' ? '' : live.pathname}`;
  return live.href;
}

export default function transform(hookName, element, payload) {
  if (hookName !== 'afterTransform') return;
  const base = payload.params?.originalURL || payload.url;
  element.querySelectorAll('a[href]').forEach((a) => {
    const raw = (a.getAttribute('href') || '').trim();
    if (!raw || raw.startsWith('#') || /^(mailto|tel|javascript):/i.test(raw)) return;
    let u;
    try { u = new URL(raw, base); } catch (e) { return; }
    if (u.hostname !== SOURCE_HOST) return;
    // Relative source links ("ferrari-approved/share/...") resolve without the locale prefix
    const migrated = toMigratedPath(u.pathname);
    a.setAttribute('href', migrated ? `${migrated}${u.search}${u.hash}` : toLiveUrl(u));
  });
}
