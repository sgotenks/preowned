/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs. Base: tabs (EDS library block).
 * Source: https://preowned.ferrari.com/it-IT/favorites
 * Selector: [class*="Favorites__tabs"] (tab labels); the tab panels are the children of the
 *   sibling [class*="ContentSwitcher__wrapper"], read here and removed.
 * Structure (library convention): 2 columns, one row per tab:
 *   Tab Label (first cell) | Tab Content (second cell: the panel's text, e.g. the empty state
 *   "Nessun veicolo salvato.").
 * Model (xwalk): container tabs; item tabs-item -> title, content_* (grouped; content_richtext).
 * Saved vehicles and searches live in the source app's storage, so only the empty states migrate.
 */
export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(typeof n === 'string' ? document.createTextNode(n) : n));
    return frag;
  };

  const labels = [...element.querySelectorAll('li')].map((li) => clean(li.textContent)).filter(Boolean);
  const root = element.closest('[class*="Favorites__wrapper"]') || element.parentElement;
  const switcher = (root && root.parentElement && root.parentElement.querySelector('[class*="ContentSwitcher__wrapper"]'))
    || document.querySelector('[class*="ContentSwitcher__wrapper"]');
  const panels = switcher ? [...switcher.children] : [];

  // one row per tab: label | content
  const cells = labels.map((label, i) => {
    const panel = panels[i];
    const texts = panel
      ? [...panel.querySelectorAll('p, h1, h2, h3, h4')].map((el) => clean(el.textContent)).filter(Boolean)
      : [];
    const content = texts.map((t) => {
      const p = document.createElement('p');
      p.textContent = t;
      return p;
    });
    const labelCell = hinted('title', label);
    const contentCell = content.length ? hinted('content_richtext', ...content) : '';
    return [labelCell, contentCell];
  });

  if (switcher) switcher.remove();
  if (!cells.length) {
    element.remove();
    return;
  }
  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs', cells });
  element.replaceWith(block);
}
