/* eslint-disable */
/* global WebImporter */

/**
 * Link rewriting for preowned.ferrari.com/it-IT.
 * The migrated site serves the Italian pages from its root, so "/it-IT/<path>" becomes "/<path>"
 * for pages that are migrated. Everything else on the source host (vehicle ads, search results
 * outside the catalog) stays an absolute link to the live site. Other hosts are left as they are.
 */
const SOURCE_HOST = 'preowned.ferrari.com';
const LOCALE_PREFIX = /^\/it-IT(?=\/|$)/i;

// Source pages that have (or will get) a migrated page, by their path after the locale prefix.
const MIGRATED = /^\/(|ferrari-approved(\/share\/.*)?|modelli-usato-ferrari|value-your-car|favorites|ad|r\/.+)$/i;

function toMigratedPath(path) {
  const local = path.replace(LOCALE_PREFIX, '').replace(/\/$/, '') || '/';
  if (!MIGRATED.test(local)) return null;
  // Share deep links open a chapter of the Ferrari Approved page
  if (/^\/ferrari-approved\/share\//i.test(local)) return '/ferrari-approved';
  return local.toLowerCase();
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
    a.setAttribute('href', migrated ? `${migrated}${u.search}${u.hash}` : u.href);
  });
}
