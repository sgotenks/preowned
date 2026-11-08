/* eslint-disable */
/* global WebImporter */

/**
 * Parser for active-filters. Base: custom.
 * Source: https://preowned.ferrari.com/it-IT/r/... (model /rfcm and dealer /rfcd results)
 * Selector: [class*="SearchResults__resultsWrapper"]
 * Model (xwalk): active-filters -> label, filters (richtext list), link (+linkText).
 * Rows: "Filtri attivi:" | list of chips | "Salva la ricerca" link (live site: saving needs the
 * source app). Each chip links to the search without that filter (the country results page),
 * which is where removing the chip leads on the source.
 */
export default function parse(element, { document, url, params }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(typeof n === 'string' ? document.createTextNode(n) : n));
    return frag;
  };

  const pageUrl = (params && params.originalURL) || url
    || (document.defaultView && document.defaultView.location.href);
  // /it-IT/r/<region>/usato-ferrari/<country>/<filter>/rfcm -> /it-IT/r/<region>/usato-ferrari/<country>/rfc
  let broader = '';
  try {
    const u = new URL(pageUrl);
    const m = u.pathname.match(/^(.*\/r\/[^/]+\/[^/]+\/[^/]+)\/.+\/rfc[a-z]+\/?$/);
    if (m) broader = `${u.origin}${m[1]}/rfc`;
  } catch (e) { /* chips without a target */ }

  const label = clean(element.querySelector('[class*="SearchResults__label"]')?.textContent);
  const chips = [...element.querySelectorAll('[class*="FilterTag__text"]')].map((el) => clean(el.textContent)).filter(Boolean);
  const save = element.querySelector('[class*="SaveCurrentSearch"] button, [class*="SaveCurrentSearch"] a, [class*="saveBtn"] button');
  const saveText = clean(save?.textContent);

  if (!label && !chips.length && !saveText) {
    element.remove();
    return;
  }

  const ul = document.createElement('ul');
  chips.forEach((chip) => {
    const li = document.createElement('li');
    if (broader) {
      const a = document.createElement('a');
      a.setAttribute('href', broader);
      a.textContent = chip;
      li.append(a);
    } else {
      li.textContent = chip;
    }
    ul.append(li);
  });

  let saveCell = '';
  if (saveText) {
    const a = document.createElement('a');
    a.setAttribute('href', pageUrl);
    a.setAttribute('data-keep-live', 'true');
    a.textContent = saveText;
    saveCell = hinted('link', a);
  }

  const cells = [
    [label ? hinted('label', label) : ''],
    [chips.length ? hinted('filters', ul) : ''],
    [saveCell],
  ];
  const block = WebImporter.Blocks.createBlock(document, { name: 'active-filters', cells });
  element.replaceWith(block);
}
