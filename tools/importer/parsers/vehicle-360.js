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
 * Parser for vehicle-360. Base: embed (simple block).
 * Source: vehicle ad pages, https://preowned.ferrari.com/it-IT/a/... (THRON 360° player)
 * Selector: [class*="ADHotspotPlayer__wrapper"]
 * Model (xwalk): vehicle-360 -> image (+imageAlt), contentId, label. Three rows:
 *   image     - poster shown until the player loads (the 360° content's first frame)
 *   contentId - THRON xcontentId of the 360° content (the ad's thronDeliveryId gallery)
 *   label     - overlay label ("Click and Drag")
 */
export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  const hinted = (name, node) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    frag.appendChild(typeof node === 'string' ? document.createTextNode(node) : node);
    return frag;
  };

  let ad = {};
  try {
    ad = nextData(document).props.pageProps.initialProps.adDetailsData.ads[0] || {};
  } catch (e) { /* no page data */ }
  const contentId = ad.thronDeliveryId?.thronGalleryId || '';
  if (!contentId) { element.remove(); return; }

  const poster = element.querySelector('img.th-image, img[class*="th-image"]');
  let img = null;
  if (poster && /^https?:|^\/\//.test(poster.getAttribute('src') || '')) {
    img = document.createElement('img');
    img.setAttribute('src', poster.getAttribute('src').replace(/^\/\//, 'https://'));
    img.setAttribute('alt', ad.carName || '');
  }
  const label = clean(element.querySelector('[class*="BtnBigIcon__text"]')?.textContent);

  const cells = [
    [img ? hinted('image', img) : ''],
    [hinted('contentId', contentId)],
    [label ? hinted('label', label) : ''],
  ];
  element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'vehicle-360', cells }));
}
