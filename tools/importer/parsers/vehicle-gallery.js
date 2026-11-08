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
 * Parser for vehicle-gallery. Base: cards (container).
 * Source: vehicle ad pages, https://preowned.ferrari.com/it-IT/a/...
 * Selector: section[class*="HeroCarAD__wrapper"] [class*="GridImages__center-content"]
 * Model (xwalk): container vehicle-gallery; item vehicle-gallery-photo -> image (+imageAlt).
 * One row per photo, in the order of the source lightbox. The page renders only 5 photos; the full
 * list comes from the gallery playlist, crawled into the snapshot below (ads-crawl.js + gen-data.js).
 * Without a snapshot entry the rendered photos are used.
 */

// BEGIN vehicle-gallery-snapshot
// crawled 2026-11-08
const SNAPSHOT = {
  "IljixbcgVnJGsKsQfDGsrpHUFx%2F7vEAuVIMGbLb8sD24YK%2FU3P5Vh8W9YLoU%2BSkLuIYTFSHG%2FxZEuEH%2BsfH5Ahy37ulmL38WaDWGFrxIGQ%3D%3D": [
    "7cbf17a8-893b-4bc8-99f7-84ce3cfd94df",
    "ec167913-b2e1-4bfb-b2eb-8f2463e0edd9",
    "7f1d6cbe-f514-41c3-b229-b21d094faaf2",
    "4b6a87f9-d45a-436c-a1bb-1a02a57d0ec8",
    "c7c729ed-c54e-47e0-a1e9-c077401b919e",
    "92249f99-464f-45fc-a434-dda423616e2b",
    "7eff0c34-c7f0-4a32-8922-ed2a66771094",
    "fb5750b9-b755-4192-be1d-77f49d938c5f",
    "d27fd823-7dfe-4fd9-9da8-c0f0a6f215a2",
    "70500861-2919-4a2a-8235-ee09069cb2ed",
    "c0a37509-5346-4a07-afa9-c59d1b893a6a",
    "08b87493-e686-4c1c-ad73-6cee3bbd3310",
    "8b914ceb-7c81-43c3-b7b3-5f84d80a63bc"
  ],
  "IljixbcgVnJGsKsQfDGsrkiIVRSF276pjIQmXsLES1Di%2BINvHn8uHNCVXGmyL2VouIYTFCXG%2FxZEuEH%2Bs%2FH3CB637ulnL30YaD6HHLhNEw%3D%3D": [
    "36296a24-4bbb-4941-8457-5e68fe7f379d",
    "2c9e6918-4bc3-4950-ba71-4ecbda0a7746",
    "c63f217f-e1c8-408c-902c-26ef978115ef",
    "782ea3fa-b52e-4f5c-b734-cf3597918807",
    "fefb3fac-24d1-4d55-b902-ee62139f055d",
    "122321e6-3af9-4b30-8122-b15751b89ebb",
    "11b16cdc-36e3-4af0-b952-2d7ba4ce8d46",
    "b8907f31-3b54-4dc3-8829-65dcaf695a41",
    "9f4567e5-715c-4cfc-a761-f65b7265654b",
    "e431fe60-a365-4df8-8b4d-f004e81cd122",
    "69610ea7-6128-4025-a5aa-986535ef8aa6",
    "4d459499-0573-40de-a8b8-2594b999f6ad",
    "e0006d4c-55d8-4738-94c8-63c87c525eac"
  ],
  "IljixbcgVnJGsKsQfDGsrr0PHybHs2emaMHOcg0rBWJrycRqjlroCNWMD4H7s1UauIYTFC%2FD4hZEuEH%2BsvT1CRy37ulnJXoeYD6DEbhJGA%3D%3D": [
    "1a9a07b0-a35f-437f-bd43-3fb31253ed2f",
    "732d4108-aa85-4f6c-8c1d-d3c03024f216",
    "80e85edd-5bd9-4029-9523-7e3be0aa0931",
    "fc1ecf58-d9d4-4d96-92c0-904c903dbc79",
    "18d9d345-18da-4b8a-bb83-7422a1cee2af",
    "19f4318f-9897-4998-9c9a-962895418486",
    "90d44d91-cdfc-4f23-ba7e-f391c916dc3a",
    "11cc649e-a8b9-4d30-a15f-fc534f09c4a8",
    "752d7411-720b-4baf-ab9d-e74ff6dd3a36",
    "efb794aa-b834-454b-985a-ee920deaf44c",
    "6d406e75-4614-4e57-b596-ef7a00162635",
    "71bf67da-0f2f-46b0-be08-c55ac7239557"
  ]
};
// END vehicle-gallery-snapshot

const photoUrl = (id) => `https://ferrari-cdn.thron.com/delivery/public/image/ferrari/${id}/3zayf6/std/0x1000/2264556?quality=auto-high&format=auto`;

export default function parse(element, { document }) {
  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(n));
    return frag;
  };

  let ad = {};
  try {
    ad = nextData(document).props.pageProps.initialProps.adDetailsData.ads[0] || {};
  } catch (e) { /* no page data */ }
  const alt = (ad.carName || element.querySelector('img')?.getAttribute('alt') || '').trim();

  let srcs = (SNAPSHOT[ad.id] || []).map(photoUrl);
  if (!srcs.length) {
    // rendered photos, at the largest size the source requests
    srcs = [...new Set([...element.querySelectorAll('img')]
      .map((img) => (img.getAttribute('src') || '').replace(/^\/\//, 'https://').replace(/\/std\/0x\d+\//, '/std/0x1000/')))]
      .filter(Boolean);
  }

  const cells = srcs.map((src) => {
    const img = document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    return [hinted('image', img)];
  });
  if (!cells.length) { element.remove(); return; }
  element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'vehicle-gallery', cells }));
}
