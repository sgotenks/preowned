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
  '/a/europa/usato-ferrari/italia/gto-motors/812-gts/IljixbcgVnJGsKsQfDGsrpHUFx%2F7vEAuVIMGbLb8sD24YK%2FU3P5Vh8W9YLoU%2BSkLuIYTFSHG%2FxZEuEH%2BsfH5Ahy37ulmL38WaDWGFrxIGQ%3D%3D',
  '/a/europa/usato-ferrari/italia/gto-motors/812-superfast/IljixbcgVnJGsKsQfDGsrkiIVRSF276pjIQmXsLES1Di%2BINvHn8uHNCVXGmyL2VouIYTFCXG%2FxZEuEH%2Bs%2FH3CB637ulnL30YaD6HHLhNEw%3D%3D',
  '/a/europa/usato-ferrari/italia/gto-motors/ferrari-portofino/IljixbcgVnJGsKsQfDGsrr0PHybHs2emaMHOcg0rBWJrycRqjlroCNWMD4H7s1UauIYTFC%2FD4hZEuEH%2BsvT1CRy37ulnJXoeYD6DEbhJGA%3D%3D',
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

// Vehicle ads: source path (after /it-IT, as in the URL, ID still encoded) -> migrated page, named
// after the car's chassis number. Generated from migration-work/vehicle-detail/ads.json (ads-crawl.js).
// BEGIN ad-paths
const adPaths = {
  "/a/europa/usato-ferrari/italia/gto-motors/812-gts/IljixbcgVnJGsKsQfDGsrpHUFx%2F7vEAuVIMGbLb8sD24YK%2FU3P5Vh8W9YLoU%2BSkLuIYTFSHG%2FxZEuEH%2BsfH5Ahy37ulmL38WaDWGFrxIGQ%3D%3D": "/a/europa/usato-ferrari/italia/gto-motors/812-gts/264983",
  "/a/europa/usato-ferrari/italia/gto-motors/812-superfast/IljixbcgVnJGsKsQfDGsrkiIVRSF276pjIQmXsLES1Di%2BINvHn8uHNCVXGmyL2VouIYTFCXG%2FxZEuEH%2Bs%2FH3CB637ulnL30YaD6HHLhNEw%3D%3D": "/a/europa/usato-ferrari/italia/gto-motors/812-superfast/244721",
  "/a/europa/usato-ferrari/italia/gto-motors/ferrari-portofino/IljixbcgVnJGsKsQfDGsrr0PHybHs2emaMHOcg0rBWJrycRqjlroCNWMD4H7s1UauIYTFC%2FD4hZEuEH%2BsvT1CRy37ulnJXoeYD6DEbhJGA%3D%3D": "/a/europa/usato-ferrari/italia/gto-motors/ferrari-portofino/251533"
};
// END ad-paths

const SOURCE_HOST = 'preowned.ferrari.com';
const LOCALE_PREFIX = /^\/it-IT(?=\/|$)/i;
const MIGRATED = new Set(migratedPaths.map((p) => p.toLowerCase()));

// Same per-segment rule as WebImporter.FileUtils.sanitizeFilename, which names the imported
// pages: "/u-s-a-/rfc" is saved as "/u-s-a/rfc"
const sanitizeSegment = (s) => decodeURIComponent(s).toLowerCase().normalize('NFD')
  .replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const pagePath = (local) => (local === '/' ? '/' : `/${local.split('/').filter(Boolean).map(sanitizeSegment).join('/')}`);

function toMigratedPath(path) {
  const local = path.replace(LOCALE_PREFIX, '').replace(/\/$/, '') || '/';
  if (adPaths[local]) return adPaths[local];
  // Share deep links open a chapter of the Ferrari Approved page
  if (/^\/ferrari-approved\/share\//i.test(local)) return '/ferrari-approved';
  return MIGRATED.has(local.toLowerCase()) ? pagePath(local) : null;
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
    // data-keep-live: a search-app action (filters, next page, compare, save) only the live site has
    const keepLive = a.hasAttribute('data-keep-live');
    a.removeAttribute('data-keep-live');
    if (u.hostname !== SOURCE_HOST) return;
    // Relative source links ("ferrari-approved/share/...") resolve without the locale prefix
    const migrated = keepLive ? null : toMigratedPath(u.pathname);
    a.setAttribute('href', migrated ? `${migrated}${u.search}${u.hash}` : toLiveUrl(u));
  });
}
