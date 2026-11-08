/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-search. Base: hero.
 * Source: https://preowned.ferrari.com/it-IT
 * Selector: [class*="SearchModelsBox__wrapper"]
 * Model (xwalk): hero-search -> image, text, link (+linkText collapsed), and one grouped
 *   search cell (search_modelPlaceholder, search_locationPlaceholder, search_countries,
 *   search_expandLabel). Four rows.
 */
export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(typeof n === 'string' ? document.createTextNode(n) : n));
    return frag;
  };

  const cells = [];

  // Row 1: background image
  // Live DOM renders it as a CSS background-image; cached HTML as an <img>.
  const bg = element.querySelector('[class*="SearchModelsBox__bg"]');
  let img = bg ? bg.querySelector('img') : null;
  if (!img && bg) {
    const styled = [bg, ...bg.querySelectorAll('[style*="background-image"]')]
      .find((el) => /url\(/.test(el.getAttribute('style') || ''));
    const m = styled && styled.getAttribute('style').match(/url\(\s*(?:&quot;|["'])?(.*?)(?:&quot;|["'])?\s*\)/);
    if (m && m[1]) {
      img = document.createElement('img');
      img.src = m[1];
      img.alt = '';
    }
  }
  cells.push([img ? hinted('image', img) : '']);

  // Row 2: heading + intro paragraph
  const form = element.querySelector('[class*="SearchModelsBox__form"]') || element;
  const h1 = form.querySelector('h1');
  const subtitle = form.querySelector('h2');
  const textNodes = [];
  if (h1 && clean(h1.textContent)) {
    const h = document.createElement('h1');
    h.textContent = clean(h1.textContent);
    textNodes.push(h);
  }
  if (subtitle && clean(subtitle.textContent)) {
    const p = document.createElement('p');
    p.textContent = clean(subtitle.textContent);
    textNodes.push(p);
  }
  cells.push([textNodes.length ? hinted('text', ...textNodes) : '']);

  // Rows 3-4: search input placeholders (model, location) in document order.
  // Source markup does not expose the placeholder text, so fall back to the site copy.
  const inputs = [...form.querySelectorAll('input')];
  const placeholder = (input, fallback) => clean(
    input && (input.getAttribute('placeholder') || input.getAttribute('aria-label')),
  ) || fallback;
  const modelPh = placeholder(inputs[0], 'Cerca per modello');
  const locationPh = placeholder(inputs[1], 'Città o Concessionaria');

  // Row 3: results page CTA
  const submit = form.querySelector('a[class*="style__submit"]') || form.querySelector('a[href]');
  if (submit) {
    const a = document.createElement('a');
    a.href = submit.getAttribute('href');
    a.textContent = clean(submit.textContent) || 'Visualizza i risultati';
    cells.push([hinted('link', a)]);
  } else {
    cells.push(['']);
  }

  // Row 4: the search form fields, grouped in one cell (search_*): model and location
  // placeholders, countries (comma-separated) and the expand-search label.
  const countrySelect = form.querySelector('[class*="style__countrySelect"]');
  const countries = countrySelect ? clean(countrySelect.textContent) : '';
  const expandBtn = form.querySelector('button[class*="countriesAltBtn"]');
  const expand = expandBtn ? clean(expandBtn.textContent) : '';
  const searchCell = document.createDocumentFragment();
  [
    ['search_modelPlaceholder', modelPh],
    ['search_locationPlaceholder', locationPh],
    ['search_countries', countries],
    ['search_expandLabel', expand],
  ].forEach(([name, value]) => { if (value) searchCell.appendChild(hinted(name, value)); });
  cells.push([searchCell.childNodes.length ? searchCell : '']);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-search', cells });
  element.replaceWith(block);
}
