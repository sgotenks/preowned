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
 * Parser for dealer-card. Base: columns (simple block, image | text).
 * Source: vehicle ad pages, https://preowned.ferrari.com/it-IT/a/... (DealerFullInfo)
 * Selector: [class*="DealerFullInfo__container"]
 * Model (xwalk): dealer-card -> image (+imageAlt), text. One row: image | text, where text is
 *   type (paragraph), name (h2), "Contatti" (h3) + list of phone / address / website links,
 *   "orari di apertura" (h3) + list of "<strong>days</strong> hours", then the two links
 *   (dealer's listing, enquiry form).
 */
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
    nodes.forEach((n) => frag.appendChild(n));
    return frag;
  };
  const el = (tag, text) => { const e = document.createElement(tag); if (text != null) e.textContent = text; return e; };

  const photo = element.querySelector('[class*="DealerFullInfo__image"] img');
  let img = null;
  if (photo) {
    img = el('img');
    img.setAttribute('src', (photo.getAttribute('src') || '').replace(/^\/\//, 'https://'));
    img.setAttribute('alt', photo.getAttribute('alt') || '');
  }

  const text = [];
  const type = clean(element.querySelector('[class*="DealerFullInfo__type"]')?.textContent);
  if (type) text.push(el('p', type));
  const name = clean(element.querySelector('[class*="DealerFullInfo__name"]')?.textContent);
  if (name) text.push(el('h2', name));

  element.querySelectorAll('dl[class*="DealerFullInfo__list"]').forEach((dl) => {
    const title = clean(dl.querySelector('dt')?.textContent);
    if (title) text.push(el('h3', title));
    const ul = el('ul');
    dl.querySelectorAll('dd').forEach((dd) => {
      const li = el('li');
      const a = dd.querySelector('a[href]');
      const strong = dd.querySelector('strong');
      if (a) {
        const link = el('a', clean(a.textContent));
        link.setAttribute('href', a.getAttribute('href'));
        li.append(link);
      } else if (strong) {
        li.append(el('strong', clean(strong.textContent)));
        // everything but the <strong> (spans may already be unwrapped by the importer)
        const rest = clean([...dd.childNodes].filter((n) => n !== strong).map((n) => n.textContent).join(' '));
        if (rest) li.append(` ${rest}`);
      } else li.textContent = clean(dd.textContent);
      if (clean(li.textContent)) ul.append(li);
    });
    if (ul.children.length) text.push(ul);
  });

  element.querySelectorAll('[class*="DealerFullInfo__links"] li').forEach((li) => {
    const a = li.querySelector('a[href]');
    const button = li.querySelector('button');
    const label = clean((a || button)?.textContent);
    if (!label) return;
    const p = el('p');
    const link = el('a', label);
    link.setAttribute('href', a ? a.getAttribute('href') : enquiryUrl(document));
    p.append(link);
    text.push(p);
  });

  // simple (non-container) block: one row per field
  const cells = [[img ? hinted('image', img) : ''], [text.length ? hinted('text', ...text) : '']];
  element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'dealer-card', cells }));
}
