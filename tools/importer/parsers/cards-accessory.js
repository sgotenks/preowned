/* eslint-disable */

// Next.js page data: the #__NEXT_DATA__ script, or window.__NEXT_DATA__ once the importer has stripped scripts
function nextData(document) {
  try {
    const s = document.getElementById('__NEXT_DATA__');
    if (s) return JSON.parse(s.textContent);
  } catch (e) { /* fall through */ }
  return (typeof window !== 'undefined' && window.__NEXT_DATA__) || {};
}
/* global WebImporter */

/**
 * Parser for cards-accessory. Base: cards (container), Cards convention: one row per card,
 * image | text (both cells always present).
 * Source: vehicle ad pages, https://preowned.ferrari.com/it-IT/a/... ("Accessori originali")
 * Selector: [class*="AccessoriesCarousel__wrapper"] [class*="SquareImgCarousel__wrapper"]
 * Model (xwalk): container cards-accessory; item cards-accessory-card -> image (+imageAlt), text
 * (category paragraph, name as h3 title). The carousel renders its tiles lazily, so the full list
 * comes from the page data (genuineAccessories); the rendered tiles are the fallback.
 */
// image ids contain "|" separators: encoded, as raw pipes break table cells in authored content
const imageUrl = (id) => `https://cdn.ferrari.com/cms/dws/media/ntw/img/resize/${id.replace(/\|/g, '%257C')}?bucket=genuine&width=500&height=500`;

export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(n));
    return frag;
  };
  const el = (tag, text) => { const e = document.createElement(tag); if (text != null) e.textContent = text; return e; };
  const card = (src, category, name) => {
    const img = el('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', name);
    const text = [];
    if (category) text.push(el('p', category));
    if (name) text.push(el('h3', name));
    return [hinted('image', img), text.length ? hinted('text', ...text) : ''];
  };

  let cells = [];
  try {
    const ad = nextData(document).props.pageProps.initialProps.adDetailsData.ads[0];
    cells = (ad.genuineAccessories || []).filter((a) => a.visible !== false && a.image?.landscapeBig?.id)
      .map((a) => card(imageUrl(a.image.landscapeBig.id), clean(a.category), clean(a.name)));
  } catch (e) { /* no page data */ }
  if (!cells.length) {
    cells = [...element.querySelectorAll('[class*="Tile__tile"]')].map((tile) => {
      const src = tile.querySelector('img')?.getAttribute('src');
      return src ? card(src.replace(/\|/g, '%257C'), clean(tile.querySelector('[class*="Tile__pre-title"]')?.textContent), clean(tile.querySelector('[class*="Tile__title"]')?.textContent)) : null;
    }).filter(Boolean);
  }
  if (!cells.length) { element.remove(); return; }
  element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'cards-accessory', cells }));
}
