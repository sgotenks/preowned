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
 * Parser for vehicle-summary. Base: hero (simple block).
 * Source: vehicle ad pages, https://preowned.ferrari.com/it-IT/a/...
 * Selector: section[class*="HeroCarAD__wrapper"] > [class*="HeroCarAD__content"]
 * Model (xwalk): vehicle-summary -> text, price, cta. Three rows:
 *   text  - h1 model name, list of year / mileage / dealer (link to the dealer card, #dealer)
 *   price - price text
 *   cta   - "Contattaci" (enquiry form link, set by the vehicle transformer), dealer phone link,
 *           "Foto" (#gallery) and "360°" (#vehicle-360) shortcuts
 */
// The enquiry form the source opens in its popup (same rule as the vehicle transformer)
function enquiryUrl(document) {
  const slug = 'new-enquiry-usato-preowned';
  let base = 'https://forms.ferrari.com/content/forms/af/ferrari/af/fcom/generic-r.html';
  try {
    const vars = nextData(document).props.pageProps.initialState.channelVariables;
    const v = vars.find((x) => x.id === slug);
    if (v?.content?.url) base = v.content.url.trim();
  } catch (e) { /* fallback */ }
  const lang = (document.documentElement.getAttribute('lang') || 'it').slice(0, 2).toLowerCase();
  const url = new URL(base.replace(/(\.[a-z]{2})?\.html$/, `.${lang}.html`));
  url.searchParams.set('form-slug', slug);
  return url.href;
}

export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(typeof n === 'string' ? document.createTextNode(n) : n));
    return frag;
  };
  const linkP = (href, text) => {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.textContent = text;
    p.append(a);
    return p;
  };

  // name + year / mileage / dealer
  const text = [];
  const name = clean(element.querySelector('[class*="HeroCarAD__name"]')?.textContent);
  if (name) { const h1 = document.createElement('h1'); h1.textContent = name; text.push(h1); }
  const ul = document.createElement('ul');
  // text nodes, not spans: the importer may already have unwrapped the spans ("17.002" + "km")
  const words = (node) => {
    const out = [];
    const walk = (n) => n.childNodes.forEach((c) => {
      if (c.nodeType === 3) { if (clean(c.textContent)) out.push(clean(c.textContent)); } else if (c.nodeName !== 'svg') walk(c);
    });
    walk(node);
    return out.join(' ');
  };
  element.querySelectorAll('ul[class*="HeroCarAD__listing"] > li').forEach((li) => {
    const value = words(li);
    if (!value) return;
    const item = document.createElement('li');
    if (/HeroCarAD__anchor/.test(li.className || '')) {
      const a = document.createElement('a');
      a.setAttribute('href', '#dealer');
      a.textContent = value;
      item.append(a);
    } else item.textContent = value;
    ul.append(item);
  });
  if (ul.children.length) text.push(ul);

  const price = clean(element.querySelector('[class*="HeroCarAD__price"] strong, [class*="HeroCarAD__price"]')?.textContent);

  // calls to action. "Contattaci" is a link once the vehicle transformer ran; a button otherwise.
  const cta = [];
  const contact = element.querySelector('[class*="HeroCarAD__buttons"] a[href], button[class*="HeroCarAD__enquire"]');
  if (contact) cta.push(linkP(contact.getAttribute('href') || enquiryUrl(document), clean(contact.textContent)));
  const phone = document.querySelector('[class*="DealerFullInfo"] a[href^="tel:"]');
  if (phone) cta.push(linkP(phone.getAttribute('href'), clean(phone.textContent)));
  element.querySelectorAll('[class*="Medias__btn"]').forEach((btn, i) => {
    const label = clean(btn.textContent);
    if (label) cta.push(linkP(/360/.test(label) ? '#vehicle-360' : '#gallery', label));
  });

  const cells = [
    [text.length ? hinted('text', ...text) : ''],
    [price ? hinted('price', price) : ''],
    [cta.length ? hinted('cta', ...cta) : ''],
  ];
  element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'vehicle-summary', cells }));
}
