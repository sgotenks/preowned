/* eslint-disable */
/* global WebImporter */

/**
 * Parser for vehicle-specs. Base: table (container).
 * Source: vehicle ad pages, https://preowned.ferrari.com/it-IT/a/... ("Panoramica")
 * Selector: [class*="ADOverview__wrapper"] [class*="OverviewData__list"]
 * Model (xwalk): container vehicle-specs; item vehicle-spec -> label, value. One row per figure.
 * The "Panoramica" heading above the list stays page text.
 * Dates (e.g. "7 Years Maintenance") are formatted by the source in the visitor's time zone, so an
 * import run outside Italy can be a day off: they are taken from the page data (UTC) instead.
 */

// Next.js page data: the #__NEXT_DATA__ script, or window.__NEXT_DATA__ once the importer has stripped scripts
function nextData(document) {
  try {
    const s = document.getElementById('__NEXT_DATA__');
    if (s) return JSON.parse(s.textContent);
  } catch (e) { /* fall through */ }
  return (typeof window !== 'undefined' && window.__NEXT_DATA__) || {};
}

export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  const hinted = (name, text) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    frag.appendChild(document.createTextNode(text));
    return frag;
  };

  // dd/mm/yyyy of every ISO date in the ad's overview data, in UTC
  let utcDates = [];
  try {
    const ad = nextData(document).props.pageProps.initialProps.adDetailsData.ads[0];
    utcDates = (ad.overviewData || []).map((o) => String(o.value || '')).filter((v) => /^\d{4}-\d{2}-\d{2}T/.test(v))
      .map((v) => v.slice(0, 10).split('-').reverse().join('/'));
  } catch (e) { /* no page data */ }
  const dayOf = (dmy) => { const [d, m, y] = dmy.split('/').map(Number); return Date.UTC(y, m - 1, d) / 864e5; };
  const fixDate = (value) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value) || utcDates.includes(value)) return value;
    return utcDates.find((u) => Math.abs(dayOf(u) - dayOf(value)) === 1) || value;
  };

  const cells = [...element.querySelectorAll('[class*="OverviewData__item"]')].map((li) => {
    const label = clean(li.querySelector('[class*="OverviewData__label"]')?.textContent);
    const value = fixDate(clean(li.querySelector('[class*="OverviewData__value"]')?.textContent));
    return [label ? hinted('label', label) : '', value ? hinted('value', value) : ''];
  }).filter(([l, v]) => l || v);
  if (!cells.length) { element.remove(); return; }
  element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'vehicle-specs', cells }));
}
